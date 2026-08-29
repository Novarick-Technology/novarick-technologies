import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "dark" | "ghost";

/**
 * Arrow glyph + circle sizing traced from the two knob sizes in the Figma
 * file (40px on primary/CTA buttons, 32px on navbar CTAs). The two sizes
 * use slightly different stroke weights in the source, not a linear scale,
 * so both are reproduced exactly rather than deriving one from the other.
 */
const knobGeometry = {
  40: { viewBox: "0 0 40 40", d: "M14 26L26 14M26 24.08V14H15.92", strokeWidth: 1.13333 },
  32: { viewBox: "0 0 32 32", d: "M11 21L21 11M21 19.3333V11H12.6667", strokeWidth: 1.33333 },
} as const;

function Knob({
  size,
  circleClassName,
  arrowClassName,
}: {
  size: 32 | 40;
  circleClassName: string;
  arrowClassName: string;
}) {
  const { viewBox, d, strokeWidth } = knobGeometry[size];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${circleClassName}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox={viewBox} width={size * 0.6} height={size * 0.6} fill="none">
        <path
          d={d}
          strokeWidth={strokeWidth}
          className={`motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 ${arrowClassName}`}
          stroke="currentColor"
        />
      </svg>
    </span>
  );
}

/**
 * "dark" fill is literally two different colours in the source file, not
 * one token: the navbar/Hero CTA ("Button / Start a Project", nodes
 * 450:5474 / 458:7025 / 482:523) is #000000, while the Pricing card CTA
 * ("Button / Primary", node 488:4253) is #0A0A0A. Kept as two literal
 * fills rather than merged into one, per instance.
 */
const darkFillClasses: Record<"black" | "ink-deep", string> = {
  black: "bg-black",
  "ink-deep": "bg-ink-deep",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-lime text-black pl-4 pr-1 py-1 hover:brightness-95",
  dark: "text-white pl-4 pr-1 py-1 hover:brightness-125",
  ghost:
    "bg-[rgba(18,40,53,0.25)] border border-white/50 text-white px-5 py-3 h-12 hover:bg-[rgba(18,40,53,0.4)] hover:border-white",
};

const knobColors: Record<Extract<ButtonVariant, "primary" | "dark">, { circle: string; arrow: string }> = {
  primary: { circle: "bg-ink", arrow: "text-white" },
  dark: { circle: "bg-lime", arrow: "text-black" },
};

export function Button({
  variant = "primary",
  darkFill = "ink-deep",
  knob = true,
  knobSize = 40,
  href,
  onClick,
  type = "button",
  fullWidthMobile = true,
  className = "",
  children,
}: {
  variant?: ButtonVariant;
  /** Required literal fill when variant="dark" — see darkFillClasses. */
  darkFill?: "black" | "ink-deep";
  knob?: boolean;
  knobSize?: 32 | 40;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidthMobile?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const showKnob = knob && variant !== "ghost";
  const content = (
    <>
      <span className="whitespace-nowrap text-[14px] font-medium font-heading">{children}</span>
      {showKnob && (
        <Knob
          size={knobSize}
          circleClassName={knobColors[variant as "primary" | "dark"].circle}
          arrowClassName={knobColors[variant as "primary" | "dark"].arrow}
        />
      )}
    </>
  );

  const classes = `group inline-flex items-center justify-center gap-2 rounded-pill transition-[filter,background-color,border-color] duration-200 ${
    fullWidthMobile ? "w-full sm:w-auto" : ""
  } ${variantClasses[variant]} ${variant === "dark" ? darkFillClasses[darkFill] : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
