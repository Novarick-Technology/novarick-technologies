import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { DbNotice } from "@/components/admin/DbNotice";
import { safeQuery } from "@/lib/admin/safe-query";
import { buildSubmissionsWhere } from "@/app/admin/submissions/query";

export default async function SubmissionsList({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; q?: string }>;
}) {
  const params = await searchParams;
  const where = buildSubmissionsWhere(params);
  const { data: submissions, connected } = await safeQuery(
    () => prisma.submission.findMany({ where, orderBy: { createdAt: "desc" } }),
    [],
  );

  const exportHref = `/admin/submissions/export?${new URLSearchParams(
    Object.entries(params).filter((entry): entry is [string, string] => Boolean(entry[1])),
  ).toString()}`;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Submissions"
        action={
          <Button variant="dark" darkFill="ink-deep" height="h-10" fullWidthMobile={false} href={exportHref}>
            Export CSV
          </Button>
        }
      />

      {!connected && <DbNotice />}

      <form className="flex flex-wrap items-center gap-3" action="/admin/submissions">
        <input
          type="search"
          name="q"
          defaultValue={params.q}
          placeholder="Search name, email or need…"
          className="w-full max-w-[320px] rounded-input border border-black/10 bg-white px-3.5 py-2 font-body text-[14px] text-black placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-black/20"
        />
        <Button type="submit" variant="dark" darkFill="ink-deep" height="h-10" fullWidthMobile={false}>
          Search
        </Button>
        <Link
          href={params.filter === "unread" ? "/admin/submissions" : "/admin/submissions?filter=unread"}
          className={`inline-flex h-10 shrink-0 items-center justify-center rounded-pill px-4 font-heading text-[14px] font-medium ${
            params.filter === "unread" ? "bg-lime text-black" : "border border-black/10 bg-white text-black"
          }`}
        >
          Unread only
        </Link>
      </form>

      {/* Fixed-column grid needs its own scroll container below the
       * column widths' combined minimum — otherwise it forces the whole
       * page wider on a phone screen instead of just this table. */}
      <div className="w-full overflow-x-auto rounded-panel border border-black/10">
        <div className="flex min-w-[640px] flex-col divide-y divide-black/10">
          <div className="grid grid-cols-[100px_1fr_1fr_1fr_80px] gap-4 bg-paper-muted px-4 py-2 font-heading text-[12px] font-medium text-text-body">
            <span>Date</span>
            <span>Name</span>
            <span>Email</span>
            <span>Need</span>
            <span>State</span>
          </div>
          {submissions.length === 0 && (
            <p className="p-4 font-body text-[14px] text-text-body">No submissions match.</p>
          )}
          {submissions.map((s) => (
            <Link
              key={s.id}
              href={`/admin/submissions/${s.id}`}
              className="grid grid-cols-[100px_1fr_1fr_1fr_80px] items-center gap-4 px-4 py-3 hover:bg-black/5"
            >
              <span className="font-body text-[13px] text-text-body">
                {s.createdAt.toLocaleDateString()}
              </span>
              <span className={`truncate font-heading text-[14px] text-black ${s.read ? "" : "font-semibold"}`}>
                {s.fullName}
              </span>
              <span className="truncate font-body text-[13px] text-text-body">{s.email}</span>
              <span className="truncate font-body text-[13px] text-text-body">{s.need}</span>
              <span className="font-body text-[12px] text-text-body">{s.read ? "Read" : "Unread"}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
