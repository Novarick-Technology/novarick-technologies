import { Field } from "@/components/admin/form/Field";
import { TextAreaField } from "@/components/admin/form/TextAreaField";
import { SaveBar } from "@/components/admin/SaveBar";
import { createTestimonial, deleteTestimonial, updateTestimonial } from "@/app/admin/testimonials/actions";
import type { Testimonial } from "@/app/generated/prisma/client";

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const action = testimonial ? updateTestimonial.bind(null, testimonial.id) : createTestimonial;

  return (
    <form action={action} className="flex flex-col gap-6">
      {testimonial && !testimonial.approved && (
        <p className="rounded-panel bg-paper-muted px-4 py-3 font-body text-[13px] text-black">
          Not yet approved by the person quoted — won&rsquo;t render on the site even if published. Approve it
          from the list page.
        </p>
      )}
      <TextAreaField label="Quote" name="quote" required rows={3} defaultValue={testimonial?.quote} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name / title" name="name" required defaultValue={testimonial?.name} placeholder="Operations lead" />
        <Field label="Role / business" name="role" required defaultValue={testimonial?.role} placeholder="Novarick Group business" />
      </div>
      <SaveBar
        onDelete={testimonial ? deleteTestimonial.bind(null, testimonial.id) : undefined}
        deleteLabel="Delete testimonial"
      />
    </form>
  );
}
