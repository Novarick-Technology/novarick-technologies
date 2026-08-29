import { PricingCard } from "@/components/cards/PricingCard";
import { plans } from "@/lib/data/pricing";

/**
 * The pricing block (Homepage node 488:4258, Pricing page desktop node
 * 488:4258 / mobile 539:76) — identical across the pages that use it per
 * CLAUDE.md, so built once here.
 *
 * The heading highlight is "four ways we charge" as one continuous green
 * phrase — "Four ways to engage, " is plain black. Desktop forces a break
 * between "four" and "ways" (node 486:3697, two separate <p> runs);
 * mobile has no such break and just wraps naturally at its own width
 * (node 539:74, a single text run) — confirmed as a real divergence, not
 * the same break hidden responsively.
 */
export function PricingPlans() {
  return (
    <div className="flex w-full flex-col gap-8 lg:gap-10">
      <div className="flex w-full flex-col gap-3">
        <p className="font-heading text-[32px] font-medium tracking-[-1.92px] text-black lg:text-[52px] lg:tracking-[-3.12px]">
          {"Four ways to engage, "}
          <span className="text-green">
            four <br aria-hidden className="hidden lg:block" />
            ways we charge
          </span>
        </p>
        <p className="font-body text-[14px] leading-[22px] text-text-body lg:w-[534px] lg:text-[18px] lg:leading-6">
          Most businesses start with a discovery sprint or a build project,
          then move onto a managed retainer once the system is live.
        </p>
      </div>
      <div className="flex w-full flex-col gap-3 lg:flex-row lg:gap-0">
        {plans.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>
    </div>
  );
}
