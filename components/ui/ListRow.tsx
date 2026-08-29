export function ListRow({
  children,
  index,
  leading = "none",
  isLast = false,
  className = "",
}: {
  children: string;
  /** 1-based position, used to render the number when leading="number". */
  index?: number;
  leading?: "none" | "number" | "dot";
  isLast?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-start gap-3 border-t border-line-light-alt py-3 ${
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
      <span className="font-body text-[16px] leading-[normal] text-text-body-alt">
        {children}
      </span>
    </div>
  );
}
