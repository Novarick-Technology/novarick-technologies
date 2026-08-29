"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const projectSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required"),
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

export async function createProject(formData: FormData) {
  const data = parseProjectForm(formData);
  const published = formData.get("publish") === "true";

  const project = await prisma.project.create({ data: { ...data, published } });

  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${project.id}`);
}

export async function updateProject(id: string, formData: FormData) {
  const data = parseProjectForm(formData);
  const published = formData.get("publish") === "true" ? true : undefined;

  await prisma.project.update({
    where: { id },
    data: published !== undefined ? { ...data, published } : data,
  });

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/portfolio");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}

export async function toggleProjectPublished(id: string, published: boolean) {
  await prisma.project.update({ where: { id }, data: { published } });
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
}

export async function moveProject(id: string, direction: "up" | "down") {
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

  revalidatePath("/admin/projects");
}
