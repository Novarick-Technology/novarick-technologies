import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { testimonials } from "@/lib/data/testimonials";

/**
 * Homepage (node 437:4367) and About Us (450:5966-ish) render just the
 * grid inside their own Section. Contact (482:531 desktop, 536:109
 * mobile) wraps the same grid with a heading and its own padding
 * (p-80 desktop, px-16 py-40 mobile, gap-40/gap-28) instead of Section's —
 * `heading` switches to that configuration.
 */
export function Testimonials({ heading }: { heading?: string }) {
  const grid = (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} quote={t.quote} name={t.name} role={t.role} />
      ))}
    </div>
  );

  if (!heading) return grid;

  return (
    <div className="flex w-full flex-col items-start gap-7 px-4 py-10 lg:gap-10 lg:p-20">
      <p className="w-full text-center font-heading text-[32px] font-medium leading-9 tracking-[-1.92px] text-black lg:text-[52px] lg:leading-[60px] lg:tracking-[-3.12px]">
        {heading}
      </p>
      {grid}
    </div>
  );
}
