import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "dark" | "ghost";

/**
 * "dark" fill is literally two different colours in the source file, not
 * one token: the navbar/Hero CTA ("Button / Start a Project", nodes
 * 450:5474 / 458:7025 / 482:523) is #000000, while the Pricing card CTA
 * ("Button / Primary", node 488:4253) is #0A0A0A. Kept as two literal
 * fills rather than merged into one, per instance. Text colour now also
 * differs per fill since the redesign (see module note below): black
 * fill pairs with lime text, ink-deep fill keeps white text.
 */
const darkFillClasses: Record<"black" | "ink-deep", string> = {
  black: "bg-black text-lime",
  "ink-deep": "bg-ink-deep text-white",
};

/**
 * Redesign (checked across every instance — Navbar, Hero, Final CTA,
 * PricingCard, the Tracks/Infrastructure/What-we-do head CTAs): the knob
 * arrow circle is gone. Every button is now a plain pill; primary/dark
 * padding went from the knob-reserving pl-4/pr-1 split to a symmetric
 * px-4, and ghost's from px-5 to px-4. Confirmed on the desktop frames;
 * the mobile frames in Figma still show the old knobbed style (not yet
 * updated there), but per direction this same no-knob style applies to
 * mobile too — there is no breakpoint split left in this component.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-lime text-black px-4 py-1 hover:brightness-95",
  dark: "px-4 py-1 hover:brightness-125",
  ghost:
    "bg-[rgba(18,40,53,0.25)] border border-white/50 text-white px-4 py-3 hover:bg-[rgba(18,40,53,0.4)] hover:border-white",
};

export function Button({
  variant = "primary",
  darkFill = "ink-deep",
  height = "h-12",
  href,
  onClick,
  type = "button",
  fullWidthMobile = true,
  className = "",
  children,
  formAction,
  name,
  value,
  disabled,
}: {
  variant?: ButtonVariant;
  /** Required literal fill when variant="dark" — see darkFillClasses. */
  darkFill?: "black" | "ink-deep";
  /** Full literal class — Navbar/Hero's embedded CTA is a real 40px
   * (h-10) against every other instance's 48px (h-12) default. */
  height?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "button" | "submit";
  fullWidthMobile?: boolean;
  className?: string;
  children: ReactNode;
  /** Native <button> form-submission props — used when this Button is a
   * submit control routed to a specific Server Action within a form (the
   * admin's SaveBar), not a link. Ignored when `href` is set. */
  formAction?: (formData: FormData) => void;
  name?: string;
  value?: string;
  disabled?: boolean;
}) {
  const content = <span className="whitespace-nowrap text-[14px] font-medium font-heading">{children}</span>;

  const classes = `inline-flex items-center justify-center gap-2 rounded-pill transition-[filter,background-color,border-color] duration-200 ${height} ${
    fullWidthMobile ? "w-full sm:w-auto" : ""
  } ${variantClasses[variant]} ${variant === "dark" ? darkFillClasses[darkFill] : ""} ${
    disabled ? "cursor-not-allowed opacity-60" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      formAction={formAction}
      name={name}
      value={value}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}
