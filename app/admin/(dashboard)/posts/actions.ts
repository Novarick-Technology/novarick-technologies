"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { safeMutate } from "@/lib/safe-query";
import { toastQuery } from "@/lib/admin/toast";

const postSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required"),
  title: z.string().trim().min(1, "Title is required"),
  excerpt: z.string().trim().min(1, "Excerpt is required"),
  coverUrl: z.string().trim().min(1, "Cover image is required"),
  // HTML from the admin's WYSIWYG editor (components/admin/RichTextEditor.tsx) —
  // trusted, since only authenticated admin writers ever produce it.
  body: z.string().min(1, "Body is required"),
});

function parsePostForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  return postSchema.parse(raw);
}

export type PostActionState = { status: "idle" | "saved" | "error" };

/** See ProjectActionState's comment in the projects actions file for why
 * create/delete use a query-param redirect while update returns state
 * instead. */
export async function createPost(
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const data = parsePostForm(formData);
  const published = formData.get("published") === "true";

  const result = await safeMutate(() =>
    prisma.post.create({
      data: { ...data, published, publishedAt: published ? new Date() : null },
    }),
  );

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/");
  redirect(
    result.ok
      ? `/admin/posts/${result.data.id}?${toastQuery("created")}`
      : `/admin/posts?${toastQuery("error")}`,
  );
}

/**
 * The Visibility card (Shopify-style, replacing the old two-button
 * "Save" / "Save and publish" split, and the list page's inline toggle)
 * drives `published` directly from a single form field, so a plain Save
 * can now un-publish too. The publish date is preserved across re-saves
 * while a post stays visible, set once on the transition into visible,
 * and cleared on hide.
 */
export async function updatePost(
  id: string,
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const data = parsePostForm(formData);
  const published = formData.get("published") === "true";

  const result = await safeMutate(async () => {
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
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/");
  return { status: result.ok ? "saved" : "error" };
}

export async function deletePost(id: string, slug: string) {
  const result = await safeMutate(() => prisma.post.delete({ where: { id } }));
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect(`/admin/posts?${toastQuery(result.ok ? "deleted" : "error")}`);
}
