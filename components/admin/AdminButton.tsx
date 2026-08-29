"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Variant = "primary" | "dark" | "danger" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "bg-lime text-black hover:brightness-95",
  dark: "bg-black text-white hover:brightness-125",
  danger: "bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white",
  ghost: "bg-white text-black border border-black/15 hover:bg-black/5",
};

/**
 * Plain admin control — not the marketing Button. Square-cornered (rounded
 * to --r-input, same as the form fields), Inter only, no knob/arrow.
 */
export function AdminButton({
  variant = "primary",
  className = "",
  children,
  pendingLabel,
  ...rest
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Shown instead of children while a parent <form>'s action is pending. */
  pendingLabel?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button
      {...rest}
      disabled={rest.disabled || pending}
      className={`inline-flex h-10 items-center justify-center whitespace-nowrap rounded-input px-4 font-heading text-[14px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}
