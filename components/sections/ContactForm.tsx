"use client";

import { useActionState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { type ContactFormState, submitContactForm } from "@/app/contact/actions";

const initialState: ContactFormState = { status: "idle", attempt: 0 };

const needOptions = [
  "Mobile application build",
  "Web application build",
  "SaaS tool",
  "Website design/redesign",
  "Infrastructure & hosting",
  "Technology strategy & consulting",
  "Other",
];

function SelectField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex w-full flex-1 flex-col gap-2">
      <label htmlFor={name} className="font-body text-[16px] font-medium text-black">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required
        defaultValue={defaultValue ?? ""}
        className="w-full appearance-none rounded-input border border-black/10 bg-white bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236E7A76%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[right_16px_center] bg-no-repeat px-4 py-[14px] font-body text-[14px] text-black focus:outline-none focus:ring-1 focus:ring-black/20 lg:text-[16px]"
      >
        <option value="" disabled>
          Select what you need
        </option>
        {needOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  defaultValue,
  type = "text",
  required = true,
  maxLength,
}: {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div className="flex w-full flex-1 flex-col gap-2">
      <label htmlFor={name} className="font-body text-[16px] font-medium text-black">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-input border border-black/10 bg-white px-4 py-[14px] font-body text-[14px] text-black placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-black/20 lg:text-[16px]"
      />
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <Card
        tone="light"
        radius="panel"
        className="flex w-full flex-col items-start gap-3 border border-black/5 px-4 py-16 text-center lg:items-center lg:px-6 min-[1300px]:w-[767px]"
      >
        <p className="w-full font-heading text-[24px] font-medium text-black">Message sent</p>
        <p className="w-full font-body text-[16px] text-text-body">
          Thanks for reaching out — we&rsquo;ll get back to you shortly.
        </p>
      </Card>
    );
  }

  return (
    <Card
      tone="light"
      radius="panel"
      className="flex w-full flex-col items-end gap-6 border border-black/5 px-4 py-6 lg:px-6 min-[1300px]:w-[767px]"
    >
      {/* Keyed on `attempt` so a re-render after a failed submission
       * remounts the (uncontrolled) inputs — React resets their values
       * once the form action completes, and remounting is what makes
       * `defaultValue` from the preserved `state.values` apply again.
       * See ContactFormState.attempt. */}
      <form key={state.attempt} action={formAction} className="flex w-full flex-col gap-6">
        {/* Honeypot — off-screen, not display:none (some bots detect that). */}
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Field
          label="Full name"
          name="fullName"
          placeholder="Your name"
          defaultValue={state.values?.fullName}
          maxLength={100}
        />

        <div className="flex w-full flex-col gap-6 lg:flex-row">
          <Field
            label="Email Address"
            name="email"
            type="email"
            placeholder="your email address"
            defaultValue={state.values?.email}
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+234"
            defaultValue={state.values?.phone}
            required={false}
            maxLength={20}
          />
        </div>

        <SelectField label="What do you need" name="need" defaultValue={state.values?.need} />

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="details" className="font-body text-[16px] font-medium text-black">
            Give us more details
          </label>
          <textarea
            id="details"
            name="details"
            required
            minLength={10}
            maxLength={2000}
            placeholder="How can we help? Please describe what you're looking for specifically..."
            defaultValue={state.values?.details}
            className="h-[140px] w-full resize-none rounded-input border border-black/10 bg-white px-4 py-[14px] font-body text-[14px] text-black placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-black/20 lg:text-[16px]"
          />
        </div>

        {state.status === "error" && state.message && (
          <p role="alert" className="w-full font-body text-[14px] text-red-600">
            {state.message}
          </p>
        )}

        <Button type="submit" variant="primary" className="w-full uppercase">
          {pending ? "Sending…" : "Book a Strategy Call"}
        </Button>
      </form>
    </Card>
  );
}
