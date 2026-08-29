import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "@/app/admin/testimonials/TestimonialForm";
import { safeQuery } from "@/lib/admin/safe-query";

export default async function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: testimonial } = await safeQuery(() => prisma.testimonial.findUnique({ where: { id } }), null);
  if (!testimonial) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={testimonial.name} />
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
