"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { safeMutate } from "@/lib/safe-query";
import { toastQuery } from "@/lib/admin/toast";
import { slugify } from "@/lib/slugify";

const projectSchema = z.object({
  // Normalized rather than rejected — a slug typed (or inherited from
  // older data saved before this existed) with spaces/uppercase/etc.
  // just becomes URL-safe automatically instead of blocking the save.
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .transform(slugify)
    .refine((v) => v.length > 0, "Slug must contain at least one letter or number"),
  title: z.string().trim().min(1, "Title is required"),
  meta: z.string().trim().min(1, "Meta is required"),
  summary: z.string().trim().min(1, "Summary is required"),
  coverUrl: z.string().trim().min(1, "Cover image is required"),
  tags: z
    .string()
    .transform((v) => v.split(",").map((t) => t.trim()).filter(Boolean)),
  aboutProject: z.string().trim().min(1),
  challenge: z.string().trim().min(1),
  approach: z.string().trim().min(1),
  product: z.string().trim().min(1),
  technology: z.string().trim().min(1),
  infrastructure: z.string().trim().min(1),
  outcome: z.string().trim().min(1),
  productRole: z.string().trim().min(1),
  designRole: z.string().trim().min(1),
  engineeringRole: z.string().trim().min(1),
  infrastructureRole: z.string().trim().min(1),
});

function parseProjectForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  return projectSchema.parse(raw);
}

export type ProjectActionState = { status: "idle" | "saved" | "error" };

/**
 * create/delete genuinely navigate to a different page, so their toast
 * rides a `?created=1`-style query param on the redirect target (proven
 * reliable for that case). update deliberately does NOT redirect —
 * staying on the same edit page after Save is the actual intended UX,
 * and a Server Action redirecting to the exact pathname it's already on
 * doesn't reliably deliver a query param or cookie to the client (see
 * Toast.tsx and lib/admin/toast.ts). Returning state here instead, read
 * via useActionState in ProjectForm, sidesteps that entirely.
 */
export async function createProject(
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const data = parseProjectForm(formData);
  const published = formData.get("publish") === "true";

  const result = await safeMutate(() => prisma.project.create({ data: { ...data, published } }));

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${data.slug}`);
  revalidatePath("/");
  redirect(
    result.ok
      ? `/admin/projects/${result.data.id}?${toastQuery("created")}`
      : `/admin/projects?${toastQuery("error")}`,
  );
}

export async function updateProject(
  id: string,
  _prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> {
  const data = parseProjectForm(formData);
  const published = formData.get("publish") === "true" ? true : undefined;

  const result = await safeMutate(() =>
    prisma.project.update({
      where: { id },
      data: published !== undefined ? { ...data, published } : data,
    }),
  );

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${data.slug}`);
  revalidatePath("/");
  return { status: result.ok ? "saved" : "error" };
}

export async function deleteProject(id: string, slug: string) {
  const result = await safeMutate(() => prisma.project.delete({ where: { id } }));
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
  revalidatePath("/");
  redirect(`/admin/projects?${toastQuery(result.ok ? "deleted" : "error")}`);
}

export async function toggleProjectPublished(id: string, slug: string, published: boolean) {
  await safeMutate(() => prisma.project.update({ where: { id }, data: { published } }));
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
  revalidatePath("/");
}

export async function moveProject(id: string, direction: "up" | "down") {
  const result = await safeMutate(async () => {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= projects.length) return;

    const a = projects[index];
    const b = projects[swapIndex];
    await prisma.$transaction([
      prisma.project.update({ where: { id: a.id }, data: { order: b.order } }),
      prisma.project.update({ where: { id: b.id }, data: { order: a.order } }),
    ]);
  });
  if (!result.ok) return;

  revalidatePath("/admin/projects");
}
