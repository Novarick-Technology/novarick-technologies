import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "@/app/admin/testimonials/TestimonialForm";

export default async function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={testimonial.name} />
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
