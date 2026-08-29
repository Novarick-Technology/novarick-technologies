"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { safeMutate } from "@/lib/admin/safe-query";

const testimonialSchema = z.object({
  quote: z.string().trim().min(1, "Quote is required"),
  name: z.string().trim().min(1, "Name is required"),
  role: z.string().trim().min(1, "Role is required"),
});

function parseTestimonialForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  return testimonialSchema.parse(raw);
}

/** Nothing renders on the site unless both approved and published are true. */
const REVALIDATE_PATHS = ["/", "/about", "/contact"];

function revalidatePublicPaths() {
  for (const path of REVALIDATE_PATHS) revalidatePath(path);
}

export async function createTestimonial(formData: FormData) {
  const data = parseTestimonialForm(formData);
  const published = formData.get("publish") === "true";

  const result = await safeMutate(() => prisma.testimonial.create({ data: { ...data, published } }));

  revalidatePath("/admin/testimonials");
  redirect(result.ok ? `/admin/testimonials/${result.data.id}` : "/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const data = parseTestimonialForm(formData);
  const published = formData.get("publish") === "true" ? true : undefined;

  await safeMutate(() =>
    prisma.testimonial.update({
      where: { id },
      data: published !== undefined ? { ...data, published } : data,
    }),
  );

  revalidatePath("/admin/testimonials");
  revalidatePath(`/admin/testimonials/${id}`);
  revalidatePublicPaths();
}

export async function deleteTestimonial(id: string) {
  await safeMutate(() => prisma.testimonial.delete({ where: { id } }));
  revalidatePath("/admin/testimonials");
  revalidatePublicPaths();
  redirect("/admin/testimonials");
}

export async function toggleTestimonialPublished(id: string, published: boolean) {
  await safeMutate(() => prisma.testimonial.update({ where: { id }, data: { published } }));
  revalidatePath("/admin/testimonials");
  revalidatePublicPaths();
}

export async function toggleTestimonialApproved(id: string, approved: boolean) {
  await safeMutate(() => prisma.testimonial.update({ where: { id }, data: { approved } }));
  revalidatePath("/admin/testimonials");
  revalidatePublicPaths();
}

export async function moveTestimonial(id: string, direction: "up" | "down") {
  const result = await safeMutate(async () => {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    const index = testimonials.findIndex((t) => t.id === id);
    if (index === -1) return;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= testimonials.length) return;

    const a = testimonials[index];
    const b = testimonials[swapIndex];
    await prisma.$transaction([
      prisma.testimonial.update({ where: { id: a.id }, data: { order: b.order } }),
      prisma.testimonial.update({ where: { id: b.id }, data: { order: a.order } }),
    ]);
  });
  if (!result.ok) return;

  revalidatePath("/admin/testimonials");
}
