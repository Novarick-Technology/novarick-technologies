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
      <label htmlFor={name} className="font-heading text-[14px] font-medium text-black">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        {...rest}
        className="w-full rounded-input border border-black/10 bg-white px-4 py-[14px] font-body text-[15px] text-black placeholder:text-text-body focus:outline-none focus:ring-1 focus:ring-black/20"
      />
      {hint && <p className="font-body text-[13px] text-text-body">{hint}</p>}
    </div>
  );
}
