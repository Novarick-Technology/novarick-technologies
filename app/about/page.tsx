import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { KVRow } from "@/components/ui/KVRow";
import { NumberedCard } from "@/components/ui/NumberedCard";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { InfrastructureInner } from "@/components/sections/InfrastructureInner";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

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

const functions = [
  {
    tone: "light" as const,
    eyebrow: "01",
    title: "Product",
    body: "Discovery, requirements, roadmaps and product management across Group and client work.",
  },
  {
    tone: "light" as const,
    eyebrow: "02",
    title: "Design",
    body: "Research, journeys, interface design and the design systems our products are built from.",
  },
  {
    tone: "light" as const,
    eyebrow: "03",
    title: "Engineering",
    body: "Web, mobile, APIs, integrations, databases and the automation behind business operations.",
  },
  {
    tone: "light" as const,
    eyebrow: "04",
    title: "Infrastructure",
    body: "Cloud and server environments, hosting, domains, deployment, monitoring and security.",
  },
  {
    tone: "light" as const,
    eyebrow: "05",
    title: "Operations",
    body: "Support, maintenance, incident response and the routines that keep live systems healthy.",
  },
  {
    tone: "dark" as const,
    eyebrow: "06",
    title: "How we build",
    body: "Discovery, then a defined scope, then design, then environments before code ships. Nothing reaches production without a test run.",
  },
];

export default function AboutUs() {
  return (
    <>
      <Navbar />

      <WhoWeAre
        headline="Technology built around real businesses"
        headlineHighlight="Technology"
        text="At Novarick Technologies, we design, build, and operate technology that powers real businesses, creating practical solutions that drive growth, improve operations, and deliver value beyond the businesses we serve."
        highlight="Novarick Technologies"
      />

      {/* Detail is a continuation of Who we are above it (0 top padding),
       * per CLAUDE.md. Literal padding from nodes 450:6751 (desktop) /
       * 524:69 (mobile) — asymmetric (no top padding), not the generic
       * Section wrapper's symmetric py. */}
      <div className="w-full px-4 pb-10 lg:px-20 lg:pb-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col">
          {detail.map((row, i) => (
            <KVRow key={row.label} label={row.label} value={row.value} isLast={i === detail.length - 1} />
          ))}
        </div>
      </div>

      {/* Literal asymmetric padding from node 450:5837 (desktop: px-80
       * pt-40 pb-80) / 524:82 (mobile: px-16 py-40, confirmed via
       * get_metadata) — not the generic Section wrapper. */}
      <div className="w-full px-4 py-10 lg:px-20 lg:pb-20 lg:pt-10">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 lg:gap-10">
          <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-5">
            <p className="font-heading text-[32px] font-medium leading-9 tracking-[-1.92px] text-black lg:w-[655px] lg:text-[52px] lg:leading-[normal] lg:tracking-[-3.12px]">
              <span className="text-green">Five functions,</span> one accountability line
            </p>
            <p className="font-body text-[14px] leading-[22px] text-text-body lg:w-[448px] lg:text-[18px] lg:leading-6">
              Work moves through them in sequence and comes back whenever a
              system needs to change.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {functions.map((f) => (
              <NumberedCard
                key={f.title}
                size="compact"
                tone={f.tone}
                eyebrow={f.eyebrow}
                title={f.title}
                body={f.body}
              />
            ))}
          </div>
        </div>
      </div>

      <Section>
        <InfrastructureInner />
      </Section>

      <Section>
        <Testimonials />
      </Section>

      <Section>
        <FinalCTA />
      </Section>

      <Footer />
    </>
  );
}
