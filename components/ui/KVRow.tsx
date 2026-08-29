export function KVRow({
  label,
  value,
  isLast = false,
  className = "",
}: {
  label: string;
  value: string;
  /** Closes the list with a bottom divider — the last row in a KVRow list. */
  isLast?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full flex-col gap-3 border-t border-line-light py-8 md:flex-row md:items-center md:gap-8 ${
        isLast ? "border-b" : ""
      } ${className}`}
    >
      {/* 280px is the literal label-column width pulled from the source
       * (About Us Detail, node 450:6753). CLAUDE.md's prose gives a
       * 280–326px range, but only 280px was confirmed against an actual
       * instance — not inventing a second breakpoint for the unconfirmed
       * upper bound. */}
      <p className="w-full shrink-0 font-heading text-[24px] font-medium tracking-[-0.96px] text-black md:w-[280px]">
        {label}
      </p>
      <p className="flex-1 font-body text-[18px] leading-6 text-text-body">
        {value}
      </p>
    </div>
  );
}
