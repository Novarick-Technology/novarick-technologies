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

type FeatureItem = string;

function FeatureCard({
  tone,
  title,
  description,
  items,
}: {
  tone: "dark" | "white-default" | "white-muted" | "light-muted";
  title: string;
  description: string;
  items: FeatureItem[];
}) {
  const bg =
    tone === "dark" ? "bg-ink-soft" : tone === "light-muted" ? "bg-paper-muted" : "bg-paper";
  const titleColor = tone === "dark" ? "text-white" : "text-black";
  const descColor =
    tone === "dark"
      ? "text-text-on-dark-lo"
      : tone === "white-default"
        ? "text-black"
        : "text-text-body";
  const itemNumberColor =
    tone === "dark" ? "text-white" : tone === "white-default" ? "text-black" : "text-text-body";
  const itemTextColor = tone === "dark" ? "text-text-on-dark-lo" : "text-black";
  const border = tone === "dark" ? "border-line-dark-alt" : "border-black/10";

  return (
    <div className={`flex w-full flex-1 flex-col gap-6 rounded-card px-4 py-6 lg:p-7 ${bg}`}>
      <div className="flex w-full flex-col gap-3">
        <p
          className={`font-heading text-[24px] font-medium tracking-[-1.2px] lg:text-[30px] lg:tracking-[-1.5px] ${titleColor}`}
        >
          {title}
        </p>
        <p className={`font-body text-[14px] leading-[22px] lg:text-[16px] ${descColor}`}>
          {description}
        </p>
      </div>
      <div className="flex w-full flex-col">
        {items.map((item, i) => (
          <div key={item} className={`flex w-full items-start gap-3.5 border-t py-3.5 ${border}`}>
            <p
              className={`shrink-0 font-heading text-[12px] tracking-[1.2px] ${itemNumberColor}`}
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className={`flex-1 font-body text-[14px] leading-5 lg:text-[16px] lg:leading-[22px] ${itemTextColor}`}>
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Reused across the pages that use it per CLAUDE.md ("Infrastructure
 * inner, Testimonials, Final CTA and the pricing block are identical
 * across the pages that use them. Build each once."). Copy hardcoded from
 * the confirmed Homepage instance (desktop node 445:4527, mobile node
 * 503:11).
 */
export function InfrastructureInner() {
  return (
    <div className="relative flex w-full flex-col items-center gap-6 overflow-hidden px-4 py-10 lg:rounded-card lg:p-20">
      <div aria-hidden className="absolute inset-0">
        <Image src="/images/dark-texture.png" alt="" fill className="object-cover" />
      </div>

      <div className="relative flex w-full flex-col gap-6 lg:gap-10">
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:gap-5">
          <p className="font-heading text-[30px] font-medium leading-9 tracking-[-1.8px] text-white lg:w-[760px] lg:text-[52px] lg:leading-[60px] lg:tracking-[-3.12px]">
            More than software.{" "}
            <span className="text-lime">
              We manage the infrastructure behind it.
            </span>
          </p>
          <p className="font-body text-[14px] leading-[22px] tracking-[-0.28px] text-text-dim lg:flex-1 lg:text-[16px] lg:tracking-[-0.32px]">
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

        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <FeatureCard
              tone="dark"
              title="Hosting and environments"
              description="Server and hosting environments where business applications, databases and digital assets are securely deployed and operated."
              items={[
                "Production, staging and development stacks kept separate",
                "Domains, DNS and SSL configured and renewed by us",
                "Managed databases, encrypted at rest",
                "Cloud and VPS that scales with the workload",
              ]}
            />
            <FeatureCard
              tone="white-default"
              title="Deployment and release"
              description="Nothing reaches production without a staging run and a rollback path. Releases are a routine, not an event the business braces for."
              items={[
                "Defined pipeline from development through to production",
                "Rollback available on every release",
                "Error logging centralised across every system",
                "Incident alerts routed to people who can act",
              ]}
            />
          </div>
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <FeatureCard
              tone="white-muted"
              title="Monitoring and maintenance"
              description="Visibility into system performance, uptime and operational health — so a problem is found by us, not reported by your customers."
              items={[
                "Uptime, response time and error-rate monitoring",
                "Dependency updates and technical maintenance",
                "Application management and technical support",
                "Performance management as the system grows",
              ]}
            />
            <FeatureCard
              tone="light-muted"
              title="Backups, recovery and security"
              description="Automated backups with a restore procedure we have actually run — and security treated as an engineering responsibility."
              items={[
                "Automated backups on a defined schedule",
                "Documented, tested recovery procedures",
                "HTTPS, secure authentication, role-based access",
                "Secrets management and admin activity logging",
              ]}
            />
          </div>
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
