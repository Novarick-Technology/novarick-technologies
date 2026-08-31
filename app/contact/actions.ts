"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().min(1).email(),
  phone: z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z
      .string()
      .trim()
      .min(7)
      .max(20)
      .regex(/^[0-9+()\-\s]+$/)
      .optional(),
  ),
  need: z.string().trim().min(2).max(200),
  details: z.string().trim().min(10).max(2000),
  // Honeypot — a real visitor never fills this. See ContactForm's
  // off-screen wrapper (not display:none, which some bots detect).
  company: z.string().max(0).optional(),
});

export type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  need: string;
  details: string;
};

export type ContactFormState = {
  status: "idle" | "error";
  message?: string;
  /** Re-applied to the inputs on error so a failed submission doesn't
   * clear the form, per ADMIN.md — React resets uncontrolled fields once
   * a form action completes, so ContactForm re-keys the form from these. */
  values?: ContactFormValues;
  /** Bumped on every submission so ContactForm can key the form on it —
   * that forces a remount, which is what makes `values` above actually
   * take effect as `defaultValue`. */
  attempt: number;
};

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

/**
 * In-memory per-IP counter. Resets on redeploy and isn't shared across
 * serverless instances — good enough as a first line of defence; a real
 * multi-instance deployment would move this to Redis or similar.
 */
const submissionTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionTimestamps.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    submissionTimestamps.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissionTimestamps.set(ip, recent);
  return false;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const attempt = prevState.attempt + 1;
  const raw = {
    fullName: formData.get("fullName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    need: formData.get("need")?.toString() ?? "",
    details: formData.get("details")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
  };
  const values: ContactFormValues = {
    fullName: raw.fullName,
    email: raw.email,
    phone: raw.phone,
    need: raw.need,
    details: raw.details,
  };

  if (raw.company) {
    // Honeypot tripped — accept and silently discard, per ADMIN.md.
    redirect("/book-call");
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      values,
      attempt,
    };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Too many submissions — please try again in a while.",
      values,
      attempt,
    };
  }

  try {
    const submission = await prisma.submission.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        need: parsed.data.need,
        details: parsed.data.details,
      },
    });

    if (process.env.RESEND_API_KEY && process.env.CONTACT_NOTIFY_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      await resend.emails.send({
        from: "Novarick Technologies <notifications@novaricktech.com>",
        to: process.env.CONTACT_NOTIFY_EMAIL,
        subject: `New enquiry from ${parsed.data.fullName}`,
        text: [
          `${parsed.data.fullName} <${parsed.data.email}>${parsed.data.phone ? ` / ${parsed.data.phone}` : ""}`,
          "",
          `Need: ${parsed.data.need}`,
          "",
          parsed.data.details,
          "",
          `${siteUrl}/admin/submissions/${submission.id}`,
        ].join("\n"),
      });
    }

  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
      values,
      attempt,
    };
  }

  // Outside the try/catch — redirect() throws internally, and a catch
  // block above would otherwise swallow that as if the save had failed.
  redirect("/book-call");
}
