import { type ReactNode } from "react";

type CardTone = "light" | "dark" | "bordered";
type CardRadius = "card" | "panel";

const toneClasses: Record<CardTone, string> = {
  light: "bg-paper-muted",
  dark: "bg-ink",
  bordered: "bg-paper border border-black/10",
};

const radiusClasses: Record<CardRadius, string> = {
  card: "rounded-card",
  panel: "rounded-panel",
};

export function Card({
  tone = "light",
  radius = "card",
  border = false,
  className = "",
  children,
}: {
  tone?: CardTone;
  radius?: CardRadius;
  /** Extra border on top of the tone fill — used for the dark bullet-list
   * Track card, which gets a #4D4D4D border its paragraph-variant sibling
   * doesn't have. */
  border?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-tone={tone === "dark" ? "dark" : undefined}
      className={`${toneClasses[tone]} ${radiusClasses[radius]} ${
        border ? "border border-[#4d4d4d]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
