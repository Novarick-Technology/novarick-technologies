import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { togglePostPublished } from "@/app/admin/posts/actions";

export default async function PostsList() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Posts" action={{ label: "New post", href: "/admin/posts/new" }} />

      <div className="flex flex-col divide-y divide-black/10 rounded-input border border-black/10">
        {posts.length === 0 && <p className="p-4 font-heading text-[14px] text-text-body">No posts yet.</p>}
        {posts.map((p) => (
          <div key={p.id} className="flex items-center gap-4 px-4 py-3">
            <Link href={`/admin/posts/${p.id}`} className="flex min-w-0 flex-1 flex-col gap-0.5 hover:underline">
              <span className="truncate font-heading text-[14px] font-medium text-black">{p.title}</span>
              <span className="truncate font-heading text-[12px] text-text-body">{p.excerpt}</span>
            </Link>
            <PublishToggle published={p.published} onToggle={togglePostPublished.bind(null, p.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
