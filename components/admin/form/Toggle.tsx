"use client";

import { useId, useState } from "react";

export function Toggle({
  label,
  name,
  defaultChecked = false,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = useId();

  return (
    <div className="flex items-start justify-between gap-4 rounded-input border border-black/15 bg-white px-3.5 py-3">
      <div className="flex flex-col gap-0.5">
        <label htmlFor={id} className="font-heading text-[14px] font-medium text-black">
          {label}
        </label>
        {hint && <p className="font-heading text-[12px] text-text-body">{hint}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ${
          checked ? "bg-lime" : "bg-black/15"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-150 ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
      {/* Real checkbox for form submission — the button above is just the visual control. */}
      <input type="checkbox" name={name} checked={checked} onChange={() => {}} className="hidden" />
    </div>
  );
}
