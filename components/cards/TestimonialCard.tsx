import { Card } from "@/components/ui/Card";

export function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    // Mobile (Homepage — Mobile, node 506:3013) has no fixed height — auto
    // height with a 32px gap. Desktop (node 437:4367) is a literal fixed
    // 240px with justify-between instead. Not the same layout, not just a
    // smaller version of it.
    <Card
      tone="light"
      className="flex flex-col gap-8 overflow-hidden px-4 py-6 lg:h-[240px] lg:justify-between lg:gap-6 lg:p-6"
    >
      {/* Quote uses Jost Medium — the source file's "Satoshi:Medium" label is
       * a leftover from an earlier draft per CLAUDE.md, not a real font. */}
      <p className="font-body text-[16px] font-medium leading-[22px] text-black lg:text-[18px] lg:leading-6">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex flex-col gap-0.5">
        <p className="font-heading text-[15px] font-medium tracking-[-0.3px] text-black">
          {name}
        </p>
        <p className="font-body text-[14px] text-text-body">{role}</p>
      </div>
    </Card>
  );
}
