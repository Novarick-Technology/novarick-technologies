import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { MarkReadButton } from "@/components/admin/MarkReadButton";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-black/10 py-4">
      <span className="font-heading text-[12px] font-medium text-text-body">{label}</span>
      <div className="font-heading text-[15px] text-black">{value}</div>
    </div>
  );
}

export default async function SubmissionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const submission = await prisma.submission.findUnique({ where: { id } });
  if (!submission) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={submission.fullName}
        action={<MarkReadButton id={submission.id} read={submission.read} />}
      />

      <div className="flex flex-col">
        <Row
          label="Email"
          value={
            <a href={`mailto:${submission.email}`} className="underline hover:text-text-body">
              {submission.email}
            </a>
          }
        />
        {submission.phone && (
          <Row
            label="Phone"
            value={
              <a href={`tel:${submission.phone}`} className="underline hover:text-text-body">
                {submission.phone}
              </a>
            }
          />
        )}
        <Row label="What do you need" value={submission.need} />
        <Row label="Details" value={<p className="whitespace-pre-wrap">{submission.details}</p>} />
        <Row label="Submitted" value={submission.createdAt.toLocaleString()} />
      </div>
    </div>
  );
}
