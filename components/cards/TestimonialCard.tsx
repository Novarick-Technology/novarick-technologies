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
    <Card tone="light" className="flex min-h-[240px] flex-col justify-between gap-6 p-6">
      {/* Quote uses Jost Medium — the source file's "Satoshi:Medium" label is
       * a leftover from an earlier draft per CLAUDE.md, not a real font. */}
      <p className="font-body text-[18px] font-medium leading-6 text-black">
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
