import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { PostForm } from "@/app/admin/posts/PostForm";
import { safeQuery } from "@/lib/admin/safe-query";
import { dummyPosts } from "@/lib/admin/dummy-data";

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: post } = await safeQuery(
    () => prisma.post.findUnique({ where: { id } }),
    dummyPosts.find((p) => p.id === id) ?? null,
  );
  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={post.title} />
      <PostForm post={post} />
    </div>
  );
}
