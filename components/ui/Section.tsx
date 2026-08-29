import { type ElementType, type ReactNode } from "react";

type SectionTone = "light" | "dark" | "image";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-paper text-text-body",
  dark: "bg-ink text-text-on-dark",
  image: "bg-ink text-white",
};

export function Section({
  as: Component = "section",
  tone = "light",
  continuation = false,
  className = "",
  innerClassName = "",
  children,
}: {
  as?: ElementType;
  tone?: SectionTone;
  /** Zero top padding — this block reads as part of the section above it. */
  continuation?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <Component
      data-tone={tone === "light" ? undefined : "dark"}
      className={`w-full px-4 py-10 lg:px-20 ${continuation ? "pt-0" : ""} ${toneClasses[tone]} ${className}`}
    >
      <div className={`mx-auto w-full max-w-[1280px] ${innerClassName}`}>
        {children}
      </div>
    </Component>
  );
}
