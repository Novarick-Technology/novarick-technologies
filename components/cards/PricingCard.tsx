import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ListRow } from "@/components/ui/ListRow";

export function PricingCard({
  title,
  price,
  period = "per month",
  description,
  features,
  ctaLabel = "Book a Strategy Call",
  ctaHref = "/book-call",
}: {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <Card tone="light" border radius="panel" className="flex flex-col gap-6 p-8">
      <div className="flex w-full flex-col gap-4">
        <p className="font-heading text-[24px] font-medium tracking-[-0.66px] text-black">
          {title}
        </p>
        <div className="flex flex-col gap-2 pt-1">
          <p className="font-body text-[12px] uppercase text-text-meta">From</p>
          <p className="font-heading text-[38px] font-medium tracking-[-1.216px] text-black">
            {price}
          </p>
          <p className="font-body text-[12px] uppercase text-text-meta">{period}</p>
        </div>
        <p className="font-body text-[16px] leading-[22px] text-text-body-alt">
          {description}
        </p>
        <div className="flex w-full flex-col">
          {features.map((feature, i) => (
            <ListRow key={feature} isLast={i === features.length - 1}>
              {feature}
            </ListRow>
          ))}
        </div>
      </div>
      <Button variant="dark" darkFill="ink-deep" href={ctaHref} fullWidthMobile={false} className="w-full">
        {ctaLabel}
      </Button>
    </Card>
  );
}
