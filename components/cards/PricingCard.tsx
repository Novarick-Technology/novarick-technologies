import { Button } from "@/components/ui/Button";
import { ListRow } from "@/components/ui/ListRow";

type Tone = "light" | "dark";

/**
 * Confirmed against two real instances (Pricing page node 488:4346 and
 * Homepage desktop node 488:4340): the plan cards are edge-sharing on
 * desktop (no gap, only outer corners rounded, hairline dividers between
 * cards) but fully standalone on mobile (own rounding, no border, gap-3
 * between them — Homepage mobile node 506:8). "dark" tone is the one
 * featured plan (Build project): dark card + lime primary CTA, where the
 * two light-tone plans use a dark ink-deep CTA.
 */
const cardToneClasses: Record<Tone, string> = {
  light: "bg-paper-muted",
  dark: "bg-ink-deep",
};

const titleClasses: Record<Tone, string> = {
  light: "text-black",
  dark: "text-white",
};

const priceClasses: Record<Tone, string> = {
  light: "text-black",
  dark: "text-white",
};

const descriptionClasses: Record<Tone, string> = {
  light: "text-text-body-alt",
  dark: "text-text-on-dark-hi",
};

const desktopRoundingClasses: Record<"left" | "none" | "right", string> = {
  left: "lg:rounded-none lg:rounded-tl-panel lg:rounded-bl-panel",
  none: "lg:rounded-none",
  right: "lg:rounded-none lg:rounded-tr-panel lg:rounded-br-panel",
};

export function PricingCard({
  tone = "light",
  desktopPosition = "left",
  title,
  price,
  period,
  description,
  features,
  ctaLabel = "Book a Strategy Call",
  ctaHref = "/book-call",
}: {
  tone?: Tone;
  /** Desktop-only edge-sharing position — ignored on mobile, where every
   * card is fully rounded and standalone. */
  desktopPosition?: "left" | "middle" | "right";
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const desktopRounding =
    desktopPosition === "left" ? "left" : desktopPosition === "right" ? "right" : "none";
  const desktopBorder =
    tone === "light" ? "lg:border-b lg:border-r lg:border-line-light-alt" : "";

  return (
    <div
      className={`flex w-full flex-col gap-6 rounded-panel p-4 lg:p-8 ${cardToneClasses[tone]} ${desktopRoundingClasses[desktopRounding]} ${desktopBorder}`}
    >
      <div className="flex w-full flex-col gap-4">
        <p className={`font-heading text-[24px] font-medium tracking-[-0.66px] ${titleClasses[tone]}`}>
          {title}
        </p>
        <div className="flex flex-col gap-1.5 pt-1">
          <p className="font-body text-[12px] uppercase text-text-meta">From</p>
          <p className={`font-heading text-[38px] font-medium tracking-[-1.216px] ${priceClasses[tone]}`}>
            {price}
          </p>
          <p className="font-body text-[12px] uppercase text-text-meta">{period}</p>
        </div>
        <p className={`font-body text-[16px] leading-[22px] ${descriptionClasses[tone]}`}>
          {description}
        </p>
        <div className="flex w-full flex-col">
          {features.map((feature, i) => (
            <ListRow key={feature} tone={tone} isLast={i === features.length - 1}>
              {feature}
            </ListRow>
          ))}
        </div>
      </div>
      {/* uppercase confirmed literal on this CTA specifically (all three
       * pulls: Pricing page 488:4254, Homepage desktop 488:4367/4392/4417,
       * Homepage mobile 506:2961/2984/3007) — unlike the navbar/Hero/
       * Infrastructure/Tracks CTAs, which don't have it. */}
      {tone === "dark" ? (
        <Button variant="primary" href={ctaHref} fullWidthMobile={false} className="w-full uppercase">
          {ctaLabel}
        </Button>
      ) : (
        <Button variant="dark" darkFill="ink-deep" href={ctaHref} fullWidthMobile={false} className="w-full uppercase">
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
