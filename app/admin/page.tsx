import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/admin/StatCard";
import { PageHeader } from "@/components/admin/PageHeader";
import { DbNotice } from "@/components/admin/DbNotice";
import { safeQuery } from "@/lib/admin/safe-query";
import { dummyProjects, dummyPosts, dummyTestimonials, dummySubmissions } from "@/lib/admin/dummy-data";
import type { Submission } from "@/app/generated/prisma/client";

type DashboardData = {
  projectCount: number;
  postCount: number;
  testimonialCount: number;
  submissionCount: number;
  unreadCount: number;
  recentSubmissions: Submission[];
};

export default async function AdminDashboard() {
  const { data, connected } = await safeQuery<DashboardData>(
    async () => {
      const [projectCount, postCount, testimonialCount, submissionCount, unreadCount, recentSubmissions] =
        await Promise.all([
          prisma.project.count(),
          prisma.post.count(),
          prisma.testimonial.count(),
          prisma.submission.count(),
          prisma.submission.count({ where: { read: false } }),
          prisma.submission.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
        ]);
      return { projectCount, postCount, testimonialCount, submissionCount, unreadCount, recentSubmissions };
    },
    {
      projectCount: dummyProjects.length,
      postCount: dummyPosts.length,
      testimonialCount: dummyTestimonials.length,
      submissionCount: dummySubmissions.length,
      unreadCount: dummySubmissions.filter((s) => !s.read).length,
      recentSubmissions: dummySubmissions,
    },
  );
  const { projectCount, postCount, testimonialCount, submissionCount, unreadCount, recentSubmissions } = data;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Dashboard" />

      {!connected && <DbNotice />}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Projects" value={projectCount} href="/admin/projects" />
        <StatCard label="Posts" value={postCount} href="/admin/posts" />
        <StatCard label="Testimonials" value={testimonialCount} href="/admin/testimonials" />
        <StatCard label="Unread submissions" value={unreadCount} href="/admin/submissions?filter=unread" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-[16px] font-medium text-black">
            Recent submissions ({submissionCount} total)
          </h2>
          <Link href="/admin/submissions" className="font-body text-[13px] text-text-body hover:text-black">
            View all
          </Link>
        </div>
        <div className="flex flex-col divide-y divide-black/10 rounded-panel border border-black/10">
          {recentSubmissions.length === 0 && (
            <p className="p-4 font-body text-[14px] text-text-body">No submissions yet.</p>
          )}
          {recentSubmissions.map((s) => (
            <Link
              key={s.id}
              href={`/admin/submissions/${s.id}`}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-black/5"
            >
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className={`font-heading text-[14px] ${s.read ? "font-normal" : "font-semibold"} text-black`}>
                  {s.fullName}
                </span>
                <span className="truncate font-body text-[13px] text-text-body">{s.need}</span>
              </div>
              <span className="shrink-0 font-body text-[12px] text-text-body">
                {s.createdAt.toLocaleDateString()}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
