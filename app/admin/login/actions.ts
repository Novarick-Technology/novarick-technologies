"use server";

import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE, createSessionToken } from "@/lib/adminSession";

export type LoginState = { status: "idle" | "error"; message?: string };

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  // Different lengths still run a comparison so this doesn't leak length via timing.
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const redirectTo = formData.get("redirectTo")?.toString() || "/admin";

  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.SESSION_SECRET;

  if (!expectedUser || !expectedPassword || !secret) {
    return { status: "error", message: "Admin auth is misconfigured." };
  }

  const validUser = timingSafeStringEqual(username, expectedUser);
  const validPassword = timingSafeStringEqual(password, expectedPassword);
  if (!validUser || !validPassword) {
    return { status: "error", message: "Incorrect username or password." };
  }

  const token = await createSessionToken(expectedUser, secret);
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({ name: ADMIN_SESSION_COOKIE, path: "/admin" });
  redirect("/admin/login");
}
