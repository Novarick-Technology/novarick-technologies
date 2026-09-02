import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "@/app/admin/(dashboard)/testimonials/TestimonialForm";

export default function NewTestimonial() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="New testimonial" />
      <TestimonialForm />
    </div>
  );
}
