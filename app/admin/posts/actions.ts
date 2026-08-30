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
  const published = formData.get("published") === "true";

  const result = await safeMutate(() =>
    prisma.post.create({
      data: { ...data, published, publishedAt: published ? new Date() : null },
    }),
  );

  revalidatePath("/admin/posts");
  redirect(result.ok ? `/admin/posts/${result.data.id}` : "/admin/posts");
}

/**
 * The Visibility card (Shopify-style, replacing the old two-button
 * "Save" / "Save and publish" split, and the list page's inline toggle)
 * drives `published` directly from a single form field, so a plain Save
 * can now un-publish too. The publish date is preserved across re-saves
 * while a post stays visible, set once on the transition into visible,
 * and cleared on hide.
 */
export async function updatePost(id: string, formData: FormData) {
  const data = parsePostForm(formData);
  const published = formData.get("published") === "true";

  await safeMutate(async () => {
    const existing = await prisma.post.findUnique({ where: { id }, select: { publishedAt: true } });
    return prisma.post.update({
      where: { id },
      data: {
        ...data,
        published,
        publishedAt: published ? (existing?.publishedAt ?? new Date()) : null,
      },
    });
  });

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
