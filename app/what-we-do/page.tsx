import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { KVRow } from "@/components/ui/KVRow";
import { Button } from "@/components/ui/Button";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * "What we do" 4-card grid (nodes 466:7661 desktop / 527:8 mobile) —
 * a distinct configuration from both Homepage's and About Us's paragraph
 * cards: eyebrow (16px) and title (28px, no tracking) sizes are constant
 * across breakpoints (not just the same numbers coincidentally — the
 * tone colours are also constant, unlike Homepage's card which shifts
 * dark-eyebrow colour and body-text token between breakpoints). Kept as
 * a page-local component rather than forced into the shared NumberedCard,
 * which already encodes two other real configurations.
 */
function CapabilityCard({
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
    <div className={`flex w-full flex-1 flex-col gap-20 rounded-card p-6 ${bg}`}>
      <p className={`font-heading text-[16px] font-medium ${eyebrowColor}`}>{eyebrow}</p>
      <div className="flex flex-col gap-3 w-full">
        <p className={`font-heading text-[28px] font-medium ${titleColor}`}>{title}</p>
        <p className={`font-body text-[14px] leading-[22px] lg:text-[16px] lg:leading-6 ${bodyColor}`}>
          {body}
        </p>
      </div>
    </div>
  );
}

/**
 * Services 6-card grid (nodes 458:7257 desktop / 528:4 mobile) — a fifth
 * confirmed configuration: 24px titles (not 26 or 28), tracking kept at
 * both breakpoints (unlike Homepage's card, which drops tracking at
 * desktop), colours constant across breakpoints (like About Us's compact
 * card, but with different sizes again).
 */
function ServiceCard({
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
  const eyebrowColor = tone === "dark" ? "text-lime" : "text-text-body";
  const titleColor = tone === "dark" ? "text-white" : "text-black";
  const bodyColor = tone === "dark" ? "text-text-on-dark-alt" : "text-text-body-soft";
  return (
    <div className={`flex w-full flex-col gap-8 rounded-card p-6 ${bg}`}>
      <p className={`font-heading text-[12px] font-medium ${eyebrowColor}`}>{eyebrow}</p>
      <div className="flex flex-col gap-2 w-full">
        <p className={`font-heading text-[24px] font-medium tracking-[-1.2px] ${titleColor}`}>
          {title}
        </p>
        <p className={`font-body text-[14px] leading-[22px] tracking-[-0.28px] lg:text-[16px] lg:tracking-[-0.32px] ${bodyColor}`}>
          {body}
        </p>
      </div>
    </div>
  );
}

const capabilities = [
  {
    tone: "dark" as const,
    eyebrow: "01",
    title: "Product",
    body: "We turn business problems into technology products. Discovery, strategy, requirements, roadmaps and product management.",
  },
  {
    tone: "light" as const,
    eyebrow: "02",
    title: "Design",
    body: "We design experiences people can actually use. UX research, UX/UI design, prototyping, design systems and customer journeys.",
  },
  {
    tone: "light" as const,
    eyebrow: "03",
    title: "Engineering",
    body: "We build the technology behind the product. Websites, web and mobile apps, APIs, integrations, databases and automation.",
  },
  {
    tone: "dark" as const,
    eyebrow: "04",
    title: "Infrastructure",
    body: "We keep technology running after it is built. Cloud, servers, hosting, domains, deployment, monitoring, security and backups.",
  },
];

const detail = [
  {
    label: "Mission",
    value:
      "To make technology a dependable operating capability for the businesses we serve  not a project that is delivered once and slowly decays. Every product we build, we are prepared to run.",
  },
  {
    label: "Vision",
    value:
      "To be the technology function behind a generation of African businesses: building the products they sell, operating the systems they run on, and hosting the infrastructure underneath both.",
  },
  {
    label: "Our approach",
    value:
      "We start with the business problem, not the brief. We count the manual steps, map the states, and design the system around how the work actually happens. Then we ship it, put it in an environment we control, and watch it.",
  },
  {
    label: "Why Novarick Technologies",
    value:
      "Our experience comes from building and operating technology inside the Group's own businesses. That gives us practical insight into the problems that appear long after launch.",
  },
];

const services = [
  {
    tone: "light" as const,
    eyebrow: "01",
    title: "Product discovery",
    body: "Build the right product from the start. We validate ideas through research and workshops before you invest in development.",
  },
  {
    tone: "light" as const,
    eyebrow: "02",
    title: "UX and UI design",
    body: "Intuitive, considered interfaces — from user research through to high-fidelity prototypes and a design system.",
  },
  {
    tone: "light" as const,
    eyebrow: "03",
    title: "Web and application development",
    body: "Custom websites and web apps built for performance, scalability and seamless user experiences.",
  },
  {
    tone: "light" as const,
    eyebrow: "04",
    title: "Mobile application development",
    body: "Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android.",
  },
  {
    tone: "light" as const,
    eyebrow: "05",
    title: "Hosting and infrastructure",
    body: "Server, database and application hosting in environments we configure, monitor and maintain for you.",
  },
  {
    tone: "dark" as const,
    eyebrow: "06",
    title: "Support and maintenance",
    body: "Ongoing support to keep your digital products running smoothly, securely and up to date.",
  },
];

export default function WhatWeDo() {
  return (
    <>
      <Navbar />

      <WhoWeAre
        headline="Product. Design. Engineering. Infrastructure."
        headlineHighlight="Engineering. Infrastructure."
        headlineBreakBeforeHighlight
        text="We turn business problems into technology products, design experiences people can actually use, build the systems behind them, and keep those systems running afterwards."
      />

      <div className="w-full px-4 py-10 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {capabilities.map((c) => (
            <CapabilityCard key={c.title} tone={c.tone} eyebrow={c.eyebrow} title={c.title} body={c.body} />
          ))}
        </div>
      </div>

      {/* Detail: value colour is text-body-deep on desktop, text-body on
       * mobile (nodes 458:7247 / 526:70) — a real per-breakpoint split,
       * not constant like About Us's Detail. */}
      <div className="w-full px-4 pb-10 lg:px-20 lg:pb-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col">
          {detail.map((row, i) => (
            <KVRow
              key={row.label}
              label={row.label}
              value={row.value}
              desktopValueColor="lg:text-text-body-deep"
              isLast={i === detail.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="w-full px-4 py-10 lg:px-20 lg:pb-20 lg:pt-10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 lg:gap-10">
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-5">
            <p className="font-heading text-[32px] font-medium leading-9 tracking-[-1.92px] text-black lg:w-[655px] lg:text-[52px] lg:leading-[normal] lg:tracking-[-3.12px]">
              Comprehensive delivery and managed infrastructure
            </p>
            <div className="flex w-full flex-col items-start gap-4 lg:w-auto">
              <p className="font-body text-[14px] leading-[22px] text-text-body lg:w-[387px] lg:text-[18px] lg:leading-6">
                From the first consultation to the infrastructure your product lives on.
              </p>
              <Button
                variant="primary"
                knobSize={32}
                href="/book-call"
                fullWidthMobile
                className="w-full lg:w-[222px]"
              >
                Book a Strategy Call
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {services.map((s) => (
              <ServiceCard key={s.title} tone={s.tone} eyebrow={s.eyebrow} title={s.title} body={s.body} />
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
