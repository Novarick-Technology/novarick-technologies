import { Field } from "@/components/admin/form/Field";
import { TextAreaField } from "@/components/admin/form/TextAreaField";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { BlockEditor } from "@/components/admin/BlockEditor";
import { SaveBar } from "@/components/admin/SaveBar";
import { createPost, deletePost, updatePost } from "@/app/admin/posts/actions";
import { isRichTextBlockArray } from "@/lib/rich-text";
import type { Post } from "@/app/generated/prisma/client";

export function PostForm({ post }: { post?: Post }) {
  const action = post ? updatePost.bind(null, post.id) : createPost;
  const body = isRichTextBlockArray(post?.body) ? post.body : [];

  return (
    <form action={action} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" required defaultValue={post?.title} />
        <Field label="Slug" name="slug" required defaultValue={post?.slug} hint="Used in the URL, e.g. /blog/your-slug" />
      </div>
      <TextAreaField
        label="Excerpt"
        name="excerpt"
        required
        rows={3}
        recommendedMin={100}
        recommendedMax={140}
        defaultValue={post?.excerpt}
        hint="Card body — sits in a fixed-height card on Blog list."
      />
      <ImageUpload name="coverUrl" label="Cover image" defaultValue={post?.coverUrl} />

      <div className="flex flex-col gap-2">
        <span className="font-heading text-[13px] font-medium text-black">Body</span>
        <BlockEditor name="body" defaultValue={body} />
      </div>

      <SaveBar onDelete={post ? deletePost.bind(null, post.id) : undefined} deleteLabel="Delete post" />
    </form>
  );
}
