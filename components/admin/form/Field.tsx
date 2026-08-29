import { type InputHTMLAttributes } from "react";

export function Field({
  label,
  name,
  hint,
  required,
  ...rest
}: {
  label: string;
  name: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={name} className="font-heading text-[13px] font-medium text-black">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        {...rest}
        className="w-full rounded-input border border-black/15 bg-white px-3.5 py-2.5 font-heading text-[14px] text-black placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-black/30"
      />
      {hint && <p className="font-heading text-[12px] text-text-body">{hint}</p>}
    </div>
  );
}
