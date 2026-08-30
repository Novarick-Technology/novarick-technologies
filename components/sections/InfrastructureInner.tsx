import Image from "next/image";
import { Button } from "@/components/ui/Button";

const process = ["Develop", "Deploy", "Host", "Monitor", "Maintain", "Scale"];

function ProcessCard({ index, label }: { index: number; label: string }) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-4 bg-white px-6 py-4">
      <p className="font-heading text-[16px] font-medium text-text-body">
        {String(index).padStart(2, "0")}
      </p>
      {/* Literal Inter Regular here, not Medium like most other 20px text. */}
      <p className="font-heading text-[20px] font-normal text-black">{label}</p>
    </div>
  );
}

/**
 * Reused across the pages that use it per CLAUDE.md ("Infrastructure
 * inner, Testimonials, Final CTA and the pricing block are identical
 * across the pages that use them. Build each once."). Copy hardcoded from
 * the confirmed Homepage instance (desktop node 445:4527, mobile node
 * 503:11). The feature-card grid (Hosting and environments / Deployment
 * and release / Monitoring and maintenance / Backups, recovery and
 * security) was removed from the Figma file everywhere this section
 * appears — Book a Strategy Call now follows straight after the process
 * strip.
 */
export function InfrastructureInner() {
  return (
    <div className="relative flex w-full flex-col items-center gap-6 overflow-hidden px-4 py-10 lg:rounded-card lg:p-20">
      <div aria-hidden className="absolute inset-0">
        <Image src="/images/dark-texture.png" alt="" fill className="object-cover" />
      </div>

      <div className="relative flex w-full flex-col gap-6 lg:gap-10">
        <div className="flex w-full flex-col gap-4 min-[1400px]:flex-row min-[1400px]:items-end min-[1400px]:gap-5">
          <p className="font-heading text-[30px] font-medium leading-9 tracking-[-1.8px] text-white lg:text-[52px] lg:leading-[60px] lg:tracking-[-3.12px] min-[1400px]:w-[760px]">
            More than software.{" "}
            <span className="text-lime">
              We manage the infrastructure behind it.
            </span>
          </p>
          <p className="font-body text-[14px] leading-[22px] tracking-[-0.28px] text-text-dim lg:text-[16px] lg:tracking-[-0.32px] min-[1400px]:flex-1">
            Novarick Technologies operates and manages server and hosting
            environments where business applications, databases and digital
            assets are securely deployed and operated.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-panel lg:flex lg:rounded-none lg:overflow-visible">
          {process.map((label, i) => (
            <div
              key={label}
              className={`lg:flex-1 ${
                i === 0
                  ? "lg:rounded-l-panel lg:overflow-hidden"
                  : i === process.length - 1
                    ? "lg:rounded-r-panel lg:overflow-hidden"
                    : ""
              }`}
            >
              <ProcessCard index={i + 1} label={label} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full lg:w-auto">
        <Button
          variant="primary"
          href="/contact"
          fullWidthMobile={false}
          className="w-full lg:w-[222px]"
        >
          Book a Strategy Call
        </Button>
      </div>
    </div>
  );
}
