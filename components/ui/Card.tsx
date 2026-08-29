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
  darkTrackBorder = false,
  className = "",
  children,
}: {
  tone?: CardTone;
  radius?: CardRadius;
  /** The #4D4D4D border on the dark bullet-list Track card specifically —
   * its paragraph-variant sibling doesn't have it. Not a generic "add a
   * border" flag; for any other border (e.g. the black/10 on Project/
   * Article cards), add it via className instead. */
  darkTrackBorder?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-tone={tone === "dark" ? "dark" : undefined}
      className={`${toneClasses[tone]} ${radiusClasses[radius]} ${
        darkTrackBorder ? "border border-[#4d4d4d]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
