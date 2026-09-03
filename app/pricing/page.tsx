import { pageMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { KVRow } from "@/components/ui/KVRow";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { PricingPlans } from "@/components/sections/PricingPlans";

export const metadata = pageMetadata(
  "Pricing",
  "Final pricing follows a conversation with our team and a written scope. We would rather quote something we can stand behind than surprise you later."
);

const terms = [
  {
    label: "Fixed scope, fixed price",
    value:
      "Build projects are quoted against a written scope after discovery. The price does not move unless the scope does, and a scope change is agreed in writing before any work starts on it.",
  },
  {
    label: "Payment schedule",
    value:
      "Projects are billed in three parts: on signing, at an agreed midpoint, and on deployment. Retainers and consulting are billed monthly and per session.",
  },
  {
    label: "Server costs",
    value:
      "Hosting plans cover the management. Underlying server, storage and bandwidth capacity is provisioned to your workload and passed through at cost with no markup.",
  },
  {
    label: "Taking over an existing system",
    value:
      "Migrations and takeovers start with a paid audit at the consulting day rate. If you proceed to a retainer within 30 days, the audit fee comes off the first invoice.",
  },
  {
    label: "Currency and validity",
    value:
      "Naira pricing is primary. Dollar pricing is indicative for international clients and confirmed at the prevailing rate on the date of the proposal. Published rates are reviewed twice a year.",
  },
];

export default function Pricing() {
  return (
    <>
      <Navbar />

      <WhoWeAre
        headline="What it costs to build and run it"
        text={[
          "Final pricing follows a conversation with our team and a written scope.",
          "We would rather quote something we can stand behind than surprise you later.",
        ]}
      />

      <Section>
        <PricingPlans />
      </Section>

      {/* Terms Detail (nodes 486:3743 desktop, 539:146 mobile) — its own
       * distinct heading, not a repeat of the pricing block's. Value
       * colour is text-body-deep (#4F4F4F) both breakpoints, and the
       * label column is a real 326px, not the shared default 280px. */}
      <div className="w-full bg-paper px-4 py-10 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-7 lg:gap-8">
          <div className="flex w-full flex-col items-center gap-3 text-center">
            <p className="font-heading text-[32px] font-medium tracking-[-1.92px] text-black lg:text-[52px] lg:tracking-[-3.12px]">
              The terms behind the numbers
            </p>
            <p className="font-body text-[14px] leading-[22px] text-text-body lg:w-[534px] lg:text-[18px] lg:leading-6">
              No hidden mechanics. If something here does not fit your
              situation, raise it with our team.
            </p>
          </div>
          <div className="flex w-full flex-col">
            {terms.map((row, i) => (
              <KVRow
                key={row.label}
                label={row.label}
                value={row.value}
                labelWidth="lg:w-[326px]"
                desktopValueColor="lg:text-text-body-deep"
                mobileValueColor="text-text-body-deep"
                isLast={i === terms.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
