import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { KVRow } from "@/components/ui/KVRow";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * "What we operate" 8-card grid (nodes 466:7829/8075/8103 desktop,
 * 530:8 mobile) — a sixth confirmed configuration: 20px titles (no
 * tracking), no large eyebrow-to-content gap (the source uses
 * justify-between with per-card fixed/self-stretch heights to align
 * rows; a CSS grid with its default equal-row-height behaviour produces
 * the same visual result without copying that mechanism 1:1). Page-local,
 * not the shared NumberedCard — a sixth genuinely different card config
 * confirms these grids are not safely reusable across pages.
 */
function OperateCard({
  tone,
  eyebrow,
  title,
  body,
}: {
  tone: "dark" | "light";
  eyebrow: string;
  title: string;
  body: string;
}) {
  const bg = tone === "dark" ? "bg-ink" : "bg-paper-muted";
  const eyebrowColor = tone === "dark" ? "text-text-dim-alt" : "text-text-body";
  const titleColor = tone === "dark" ? "text-white" : "text-black";
  const bodyColor = tone === "dark" ? "text-text-on-dark" : "text-text-body-alt";
  return (
    <div className={`flex h-full w-full flex-col justify-between gap-16 rounded-card p-6 ${bg}`}>
      <p className={`font-heading text-[16px] font-medium ${eyebrowColor}`}>{eyebrow}</p>
      <div className="flex flex-col gap-3 w-full">
        <p className={`font-heading text-[20px] font-medium ${titleColor}`}>{title}</p>
        <p className={`font-body text-[14px] leading-6 lg:text-[16px] ${bodyColor}`}>{body}</p>
      </div>
    </div>
  );
}

const operate = [
  {
    tone: "dark" as const,
    eyebrow: "01",
    title: "Server infrastructure",
    body: "Managed server environments for applications and business systems.",
  },
  {
    tone: "light" as const,
    eyebrow: "02",
    title: "Application hosting",
    body: "Deploy and operate websites, web applications and digital products.",
  },
  {
    tone: "light" as const,
    eyebrow: "03",
    title: "Database infrastructure",
    body: "Managed environments for structured business and application data.",
  },
  {
    tone: "light" as const,
    eyebrow: "04",
    title: "Cloud & VPS",
    body: "Scalable infrastructure for growing technology requirements.",
  },
  {
    tone: "light" as const,
    eyebrow: "05",
    title: "Monitoring & maintenance",
    body: "Visibility into system performance, uptime and operational health.",
  },
  {
    tone: "light" as const,
    eyebrow: "06",
    title: "Backups & recovery",
    body: "Automated backups and defined, tested recovery procedures.",
  },
  {
    tone: "light" as const,
    eyebrow: "07",
    title: "Security",
    body: "HTTPS, access controls, secure configuration and ongoing security management.",
  },
  {
    tone: "dark" as const,
    eyebrow: "08",
    title: "Domains & DNS",
    body: "Domain management, DNS, SSL and certificate renewal handled for you.",
  },
];

const detail = [
  {
    label: "Environments",
    value:
      "Separate production, staging and development stacks, so releases are tested somewhere that is not your live business.",
  },
  {
    label: "Domains, DNS & SSL",
    value: "Domain management, DNS records and HTTPS certificates configured and renewed by us.",
  },
  {
    label: "Monitoring & alerting",
    value:
      "Uptime, response time and error-rate monitoring, with incident alerts routed to the people who can act on them.",
  },
  {
    // Contains the second of the two "restore procedure...actually run"
    // lines CLAUDE.md flags — kept literal per the confirmed direction to
    // follow the Figma copy strictly.
    label: "Backups & recovery",
    value: "Automated backups on a defined schedule, plus a restore procedure we have actually run.",
  },
  {
    label: "Security",
    value:
      "HTTPS, secure authentication, role-based access control, secrets management and admin activity logging.",
  },
  {
    label: "Error logging",
    value:
      "Centralised logs across the systems we operate, so an incident is diagnosed from evidence rather than guesswork.",
  },
];

export default function Infrastructure() {
  return (
    <>
      <Navbar />

      <WhoWeAre
        headline="Design.Built. Hosted. Managed."
        headlineHighlight="Hosted. Managed."
        headlineBreakBeforeHighlight
        text="We provide and manage the infrastructure that keeps digital products running — server and hosting environments where business applications, databases and digital assets are securely deployed and operated."
      />

      <div className="w-full px-4 py-6 lg:px-20 lg:pb-20 lg:pt-6">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-7 lg:gap-10">
          <div className="flex w-full flex-col gap-3">
            <p className="font-heading text-[32px] font-medium leading-9 tracking-[-1.92px] text-black lg:text-[52px] lg:leading-[normal] lg:tracking-[-3.12px]">
              What we operate on your behalf
            </p>
            <p className="font-body text-[14px] leading-[22px] text-text-body lg:w-[693px] lg:text-[18px] lg:leading-6">
              We configure the environment, monitor it, and answer for it when
              something breaks — on infrastructure chosen to fit the workload.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {operate.map((o) => (
              <OperateCard key={o.title} tone={o.tone} eyebrow={o.eyebrow} title={o.title} body={o.body} />
            ))}
          </div>
        </div>
      </div>

      {/* Detail: value colour is text-body-deep at both breakpoints (nodes
       * 466:8208 / 530:56) — unlike What we do's Detail, where it splits
       * per breakpoint, and About Us's, where it stays text-body. */}
      {/* Mobile Detail wrapper (node 530:49) is pt-40 only, no bottom
       * padding — desktop (466:8190) is symmetric py-80. */}
      <div className="w-full bg-paper px-4 pt-10 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8">
          <div className="flex w-full flex-col items-center gap-3 text-center">
            <p className="font-heading text-[32px] font-medium tracking-[-1.92px] text-black lg:text-[52px] lg:tracking-[-3.12px]">
              Nothing <span className="text-green">goes live</span> without these
            </p>
            <p className="font-body text-[14px] leading-[22px] text-text-body lg:w-[534px] lg:text-[18px] lg:leading-6">
              Every system we host is stood up the same way, whether it
              belongs to a Group business or a client.
            </p>
          </div>
          <div className="flex w-full flex-col">
            {detail.map((row, i) => (
              <KVRow
                key={row.label}
                label={row.label}
                value={row.value}
                desktopValueColor="lg:text-text-body-deep"
                mobileValueColor="text-text-body-deep"
                isLast={i === detail.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      <Section>
        <FinalCTA />
      </Section>

      <Footer />
    </>
  );
}
