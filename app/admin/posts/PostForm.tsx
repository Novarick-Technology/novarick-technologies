"use client";

import { useState } from "react";
import { Field } from "@/components/admin/form/Field";
import { TextAreaField } from "@/components/admin/form/TextAreaField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { VisibilityCard } from "@/components/admin/VisibilityCard";
import { SaveBar } from "@/components/admin/SaveBar";
import { createPost, deletePost, updatePost } from "@/app/admin/posts/actions";
import type { Post } from "@/app/generated/prisma/client";

/**
 * Shopify-style blog post editor: a wide content column (title, body,
 * excerpt) next to a narrow sidebar of setting cards (Visibility,
 * Featured image, Search engine listing) instead of one long stacked
 * form. Title/slug/excerpt are lifted to local state purely so the SEO
 * card's preview updates as you type — nothing here is submitted any
 * differently than a plain field would be.
 */
export function PostForm({ post }: { post?: Post }) {
  const action = post ? updatePost.bind(null, post.id) : createPost;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full rounded-input border border-black/10 bg-white px-4 py-4 font-heading text-[22px] font-medium text-black placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-black/20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-heading text-[13px] font-medium text-black">Content</span>
            <RichTextEditor name="body" defaultValue={post?.body ?? ""} />
          </div>

          <TextAreaField
            label="Excerpt"
            name="excerpt"
            required
            rows={3}
            recommendedMin={100}
            recommendedMax={140}
            defaultValue={post?.excerpt}
            onValueChange={setExcerpt}
            hint="Card body — sits in a fixed-height card on Blog list."
          />
        </div>

        <div className="flex flex-col gap-4">
          <VisibilityCard defaultPublished={post?.published ?? false} publishedAt={post?.publishedAt} />

          <div className="flex flex-col gap-3 rounded-panel border border-black/10 bg-white p-4">
            <span className="font-heading text-[13px] font-medium text-black">Featured image</span>
            <ImageUpload name="coverUrl" label="16:9 cover" defaultValue={post?.coverUrl} />
          </div>

          <div className="flex flex-col gap-3 rounded-panel border border-black/10 bg-white p-4">
            <span className="font-heading text-[13px] font-medium text-black">Search engine listing</span>
            <div className="flex flex-col gap-1 rounded-input border border-black/10 bg-paper-muted p-3">
              <p className="truncate font-body text-[13px] text-[#1a0dab]">{title || "Post title"}</p>
              <p className="truncate font-body text-[12px] text-[#006621]">
                novarick.tech/blog/{slug || "post-slug"}
              </p>
              <p className="line-clamp-2 font-body text-[12px] text-text-body">
                {excerpt || "The excerpt will appear here as search-result body text."}
              </p>
            </div>
            <Field
              label="URL handle"
              name="slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              hint="Used in the URL, e.g. /blog/your-slug"
            />
          </div>
        </div>
      </div>

      <SaveBar
        onDelete={post ? deletePost.bind(null, post.id) : undefined}
        deleteLabel="Delete post"
        showPublish={false}
      />
    </form>
  );
}
