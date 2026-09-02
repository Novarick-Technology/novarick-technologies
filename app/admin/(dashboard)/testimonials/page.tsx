import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { PublishToggle } from "@/components/admin/PublishToggle";
import { ReorderButtons } from "@/components/admin/ReorderButtons";
import { DbNotice } from "@/components/admin/DbNotice";
import { safeQuery } from "@/lib/safe-query";
import { dummyTestimonials } from "@/lib/admin/dummy-data";
import {
  moveTestimonial,
  toggleTestimonialApproved,
  toggleTestimonialPublished,
} from "@/app/admin/(dashboard)/testimonials/actions";

export default async function TestimonialsList() {
  const { data: testimonials, connected } = await safeQuery(
    () => prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    dummyTestimonials,
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Testimonials" action={{ label: "New testimonial", href: "/admin/testimonials/new" }} />

      {!connected && <DbNotice />}

      <div className="flex flex-col divide-y divide-black/10 rounded-panel border border-black/10">
        {testimonials.length === 0 && (
          <p className="p-4 font-body text-[14px] text-text-body">No testimonials yet.</p>
        )}
        {testimonials.map((t, i) => (
          <div key={t.id} className="flex items-center gap-4 px-4 py-3">
            <ReorderButtons
              disableUp={i === 0}
              disableDown={i === testimonials.length - 1}
              onMove={moveTestimonial.bind(null, t.id)}
            />
            <Link href={`/admin/testimonials/${t.id}`} className="flex min-w-0 flex-1 flex-col gap-0.5 hover:underline">
              <span className="truncate font-heading text-[14px] font-medium text-black">{t.name}</span>
              <span className="truncate font-body text-[12px] text-text-body">{t.quote}</span>
            </Link>
            <PublishToggle
              published={t.approved}
              onToggle={toggleTestimonialApproved.bind(null, t.id)}
              onLabel="Approved"
              offLabel="Needs approval"
            />
            <PublishToggle published={t.published} onToggle={toggleTestimonialPublished.bind(null, t.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
