type Tone = "light" | "dark";

const borderClasses: Record<Tone, string> = {
  light: "border-line-light-alt",
  dark: "border-line-dark",
};

const textClasses: Record<Tone, string> = {
  light: "text-text-body-alt",
  dark: "text-text-on-dark-hi",
};

export function ListRow({
  children,
  index,
  leading = "none",
  tone = "light",
  isLast = false,
  className = "",
}: {
  children: string;
  /** 1-based position, used to render the number when leading="number". */
  index?: number;
  leading?: "none" | "number" | "dot";
  tone?: Tone;
  isLast?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-start gap-3 border-t py-3 ${borderClasses[tone]} ${
        isLast ? "border-b" : ""
      } ${className}`}
    >
      {leading === "number" && (
        <span className="shrink-0 font-body text-[12px] tracking-[0.1em] text-text-meta">
          {String(index ?? 0).padStart(2, "0")}
        </span>
      )}
      {leading === "dot" && (
        <span className="mt-2 size-[5px] shrink-0 rounded-full bg-text-body-deep" aria-hidden />
      )}
      {/* 20px literal line-height from the source (Pricing plan lists,
       * e.g. node 506:2951) — not "normal". */}
      <span className={`font-body text-[16px] leading-[20px] ${textClasses[tone]}`}>
        {children}
      </span>
    </div>
  );
}
