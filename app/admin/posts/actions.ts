"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isRichTextBlockArray } from "@/lib/rich-text";
import { safeMutate } from "@/lib/admin/safe-query";

const postSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required"),
  title: z.string().trim().min(1, "Title is required"),
  excerpt: z.string().trim().min(1, "Excerpt is required"),
  coverUrl: z.string().trim().min(1, "Cover image is required"),
  body: z.string().transform((v, ctx) => {
    try {
      const parsed = JSON.parse(v);
      if (!isRichTextBlockArray(parsed)) throw new Error("invalid shape");
      return parsed;
    } catch {
      ctx.addIssue({ code: "custom", message: "Body could not be parsed." });
      return z.NEVER;
    }
  }),
});

function parsePostForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  return postSchema.parse(raw);
}

export async function createPost(formData: FormData) {
  const data = parsePostForm(formData);
  const published = formData.get("publish") === "true";

  const result = await safeMutate(() =>
    prisma.post.create({
      data: { ...data, published, publishedAt: published ? new Date() : null },
    }),
  );

  revalidatePath("/admin/posts");
  redirect(result.ok ? `/admin/posts/${result.data.id}` : "/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const data = parsePostForm(formData);
  const publish = formData.get("publish") === "true";

  await safeMutate(() =>
    prisma.post.update({
      where: { id },
      data: publish ? { ...data, published: true, publishedAt: new Date() } : data,
    }),
  );

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}`);
  revalidatePath("/blog");
}

export async function deletePost(id: string) {
  await safeMutate(() => prisma.post.delete({ where: { id } }));
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function togglePostPublished(id: string, published: boolean) {
  await safeMutate(() =>
    prisma.post.update({
      where: { id },
      data: { published, publishedAt: published ? new Date() : null },
    }),
  );
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
}
