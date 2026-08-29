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
      className={`flex w-full flex-col gap-3 border-t border-line-light py-6 lg:flex-row lg:items-center lg:gap-8 lg:py-8 ${
        isLast ? "border-b" : ""
      } ${className}`}
    >
      {/* Label: 20px/-0.8px mobile, 24px/-0.96px desktop (About Us Detail,
       * nodes 524:71 mobile / 450:6753 desktop — CLAUDE.md's KV label role
       * table: 20/26 mobile, 24/26 desktop). 280px column width is the
       * literal desktop value; CLAUDE.md's prose gives a 280–326px range
       * but only 280px was confirmed against a real instance. */}
      <p className="w-full shrink-0 font-heading text-[20px] font-medium tracking-[-0.8px] text-black lg:w-[280px] lg:text-[24px] lg:tracking-[-0.96px]">
        {label}
      </p>
      {/* Value: 14px mobile, 18px desktop (same nodes). */}
      <p className="flex-1 font-body text-[14px] leading-[22px] text-text-body lg:text-[18px] lg:leading-6">
        {value}
      </p>
    </div>
  );
}
