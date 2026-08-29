"use client";

import { useActionState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { type ContactFormState, submitContactForm } from "@/app/contact/actions";

const initialState: ContactFormState = { status: "idle", attempt: 0 };

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
        className="w-full rounded-input border border-black/10 bg-white px-4 py-[14px] font-body text-[14px] text-black placeholder:text-text-body focus:outline-none focus:ring-2 focus:ring-ink lg:text-[16px]"
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
        className="flex w-full flex-col items-start gap-3 border border-black/5 px-4 py-16 text-center lg:w-[767px] lg:items-center lg:px-6"
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
      className="flex w-full flex-col items-end gap-6 border border-black/5 px-4 py-6 lg:w-[767px] lg:px-6"
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

        <Field
          label="What do you need"
          name="need"
          placeholder="Mobile application, web application, SaaS tool, website, etc..."
          defaultValue={state.values?.need}
          maxLength={200}
        />

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
            className="h-[140px] w-full resize-none rounded-input border border-black/10 bg-white px-4 py-[14px] font-body text-[14px] text-black placeholder:text-text-body focus:outline-none focus:ring-2 focus:ring-ink lg:text-[16px]"
          />
        </div>

        {state.status === "error" && state.message && (
          <p role="alert" className="w-full font-body text-[14px] text-red-600">
            {state.message}
          </p>
        )}

        <Button type="submit" variant="primary" knob={false} className="h-12 w-full uppercase">
          {pending ? "Sending…" : "Book a Strategy Call"}
        </Button>
      </form>
    </Card>
  );
}
