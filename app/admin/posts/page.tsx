import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { DbNotice } from "@/components/admin/DbNotice";
import { safeQuery } from "@/lib/admin/safe-query";
import { filterDummyPosts } from "@/lib/admin/dummy-data";
import { buildPostsWhere } from "@/app/admin/posts/query";

const filters = [
  { value: undefined, label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
] as const;

/**
 * Shopify's blog-posts index: a search + status-tab bar above a table of
 * rows (thumbnail, title/excerpt, status badge, date) rather than the
 * plain divided list every other admin section uses — this is
 * deliberately posts-only, not a shared list pattern.
 */
export default async function PostsList({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; q?: string }>;
}) {
  const params = await searchParams;
  const where = buildPostsWhere(params);
  const { data: posts, connected } = await safeQuery(
    () => prisma.post.findMany({ where, orderBy: { createdAt: "desc" } }),
    filterDummyPosts(params),
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Posts" action={{ label: "New post", href: "/admin/posts/new" }} />

      {!connected && <DbNotice />}

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-black/10">
          {filters.map((f) => {
            const active = (params.filter ?? undefined) === f.value;
            const href = f.value ? `/admin/posts?filter=${f.value}` : "/admin/posts";
            return (
              <Link
                key={f.label}
                href={href}
                className={`-mb-px border-b-2 px-1 py-2.5 font-heading text-[14px] font-medium transition-colors ${
                  active ? "border-black text-black" : "border-transparent text-text-body hover:text-black"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        <form className="flex items-center gap-3" action="/admin/posts">
          {params.filter && <input type="hidden" name="filter" value={params.filter} />}
          <input
            type="search"
            name="q"
            defaultValue={params.q}
            placeholder="Search posts…"
            className="w-full max-w-[320px] rounded-input border border-black/10 bg-white px-3.5 py-2 font-body text-[14px] text-black placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-black/20"
          />
          <Button type="submit" variant="dark" darkFill="ink-deep" height="h-10" fullWidthMobile={false}>
            Search
          </Button>
        </form>
      </div>

      <div className="w-full overflow-x-auto rounded-panel border border-black/10">
        <div className="flex min-w-[640px] flex-col divide-y divide-black/10">
          {posts.length === 0 && (
            <p className="p-4 font-body text-[14px] text-text-body">No posts match.</p>
          )}
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/admin/posts/${p.id}`}
              className="flex items-center gap-4 px-4 py-3 hover:bg-black/5"
            >
              <div className="relative aspect-video w-20 shrink-0 overflow-hidden rounded-input bg-paper-muted">
                {p.coverUrl && <Image src={p.coverUrl} alt="" fill sizes="80px" className="object-cover" />}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate font-heading text-[14px] font-medium text-black">{p.title}</span>
                <span className="truncate font-body text-[12px] text-text-body">{p.excerpt}</span>
              </div>
              <span
                className={`shrink-0 rounded-pill px-3 py-1.5 font-heading text-[12px] font-medium ${
                  p.published ? "bg-lime text-black" : "border border-black/10 bg-white text-text-body"
                }`}
              >
                {p.published ? "Published" : "Draft"}
              </span>
              <span className="hidden shrink-0 font-body text-[13px] text-text-body sm:block">
                {(p.publishedAt ?? p.createdAt).toLocaleDateString()}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
