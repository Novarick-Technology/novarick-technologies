"use client";

import { useState, type TextareaHTMLAttributes } from "react";

/**
 * Live character count for summary/excerpt fields — ADMIN.md calls these
 * out specifically because they sit in fixed-height card layouts on the
 * live site and long values overflow the design.
 */
export function TextAreaField({
  label,
  name,
  hint,
  required,
  recommendedMin,
  recommendedMax,
  defaultValue,
  onValueChange,
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
  recommendedMin?: number;
  recommendedMax?: number;
  /** Separate from the native onChange (which this component already uses
   * internally for the character count) — for callers that want the
   * current value without fighting that internal handler. */
  onValueChange?: (value: string) => void;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [count, setCount] = useState(typeof defaultValue === "string" ? defaultValue.length : 0);
  const inRange =
    recommendedMin === undefined || recommendedMax === undefined
      ? true
      : count >= recommendedMin && count <= recommendedMax;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={name} className="font-heading text-[14px] font-medium text-black">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
        {recommendedMin !== undefined && recommendedMax !== undefined && (
          <span className={`font-body text-[13px] ${inRange ? "text-text-body" : "text-red-600"}`}>
            {count} chars (aim {recommendedMin}–{recommendedMax})
          </span>
        )}
      </div>
      <textarea
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        onChange={(e) => {
          setCount(e.target.value.length);
          onValueChange?.(e.target.value);
        }}
        {...rest}
        className="w-full resize-y rounded-input border border-black/10 bg-white px-4 py-[14px] font-body text-[15px] text-black placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-black/20"
      />
      {hint && <p className="font-body text-[13px] text-text-body">{hint}</p>}
    </div>
  );
}
