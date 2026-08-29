import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { InfrastructureInner } from "@/components/sections/InfrastructureInner";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { NumberedCard } from "@/components/ui/NumberedCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ArticleCard } from "@/components/cards/ArticleCard";

// Placeholder project/post data — the real content is DB-driven per
// ADMIN.md (Project/Post models). This mirrors the Figma placeholders
// (which repeat the same handful of entries) until real records exist.
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

const projects = [
  {
    slug: "kolanut-africa",
    coverUrl: "https://placehold.co/1160x760/7a7a7a/7a7a7a.png",
    meta: "INSURANCE - 2026",
    title: "Kolanut Africa Web Application",
    summary:
      "An insurtech platform where customers buy insurance, manage policies and track claims — with underwriter integrations.",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
  },
  {
    slug: "buyback-web",
    coverUrl: "https://placehold.co/1160x760/7a7a7a/7a7a7a.png",
    meta: "REAL ESTATE - 2025",
    title: "Buyback Web Application",
    summary:
      "A web application where investors access the feature, start a transaction and follow every related activity in one place.",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
  },
  {
    slug: "buyback-mobile",
    coverUrl: "https://placehold.co/1160x760/7a7a7a/7a7a7a.png",
    meta: "REAL ESTATE - 2025",
    title: "Buyback Mobile Application",
    summary:
      "A cross-platform application for iOS and Android on the same API layer as the web product, with status updates pushed as they happen.",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
  },
  {
    slug: "novarick-homes",
    coverUrl: "https://placehold.co/1160x760/7a7a7a/7a7a7a.png",
    meta: "REAL ESTATE · MARKETING SITE · 2025",
    title: "Novarick Homes Website",
    summary:
      "A complete redesign — clearer property presentation, a stronger enquiry path, and a CMS the marketing team runs themselves.",
    tags: ["PRODUCT", "DESIGN", "ENGINEERING", "HOSTED BY US"],
    // Confirmed absent from the mobile Portfolio grid (504:8, 3 cards) but
    // present on desktop (437:4222, 4 cards) — a real content difference,
    // not an assumption.
    desktopOnly: true,
  },
];

const tracks = [
  {
    eyebrow: "TRACK 01",
    title: "Build",
    description: "Bring us the problem and we design and ship the system that solves it.",
    items: ["Websites and web applications", "Mobile applications", "APIs and integrations", "Business automation"],
  },
  {
    eyebrow: "TRACK 02",
    title: "Manage",
    description: "Keep the technology healthy after launch without hiring a team for it.",
    items: ["Product management", "Technical maintenance", "Application management", "Technical support"],
  },
  // TRACK 03 is genuinely skipped in the source (confirmed identically on
  // both desktop node 437:4291 and mobile node 505:13) — not a fetch gap.
  {
    eyebrow: "TRACK 04",
    title: "Consult",
    description: "Work out what should exist before anyone starts building it.",
    items: ["Technology strategy", "Product strategy", "Digital transformation", "Technology architecture"],
  },
];

const posts = [
  {
    slug: "why-good-technology-starts-with-understanding-the-business",
    coverUrl: "/images/blog-placeholder.png",
    date: "12th August, 2026",
    title: "Why good technology starts with understanding the business",
    excerpt:
      "Technology is easy to talk about. Building something that actually works for a business is a different challenge.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <WhoWeAre
        text="At Novarick Technologies, we design, build, and operate technology that powers real businesses, creating practical solutions that drive growth, improve operations, and deliver value beyond the businesses we serve."
        highlight="Novarick Technologies"
      />

      <Section>
        <div className="flex w-full flex-col gap-8 lg:gap-10">
          <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-5">
            <p className="font-heading text-[32px] font-medium leading-9 tracking-[-1.92px] text-black lg:w-[655px] lg:text-[52px] lg:leading-[normal] lg:tracking-[-3.12px]">
              <span className="text-green">Four capabilities,</span> one accountability line
            </p>
            <p className="font-body text-[14px] leading-[22px] text-text-body lg:w-[448px] lg:text-[18px] lg:leading-6">
              Not a generic IT services list. This is how the department is
              structured, and how work moves through it.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {capabilities.map((c) => (
              <NumberedCard key={c.title} tone={c.tone} eyebrow={c.eyebrow} title={c.title} body={c.body} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <InfrastructureInner />
      </Section>

      <Section>
        <div className="flex w-full flex-col items-center gap-8 lg:gap-10">
          <div className="flex w-full flex-col gap-3 text-center lg:gap-4">
            <p className="font-heading text-[32px] font-medium tracking-[-1.92px] text-black lg:text-[60px] lg:tracking-[-3.6px]">
              What we have delivered
            </p>
            <p className="mx-auto font-body text-[14px] leading-[22px] text-text-body lg:w-[560px] lg:text-[18px] lg:leading-6">
              Every project follows the same arc: the business problem, what
              we executed, the infrastructure it runs on, and what changed.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            {projects.map((p) => (
              <div key={p.slug} className={p.desktopOnly ? "hidden lg:block" : ""}>
                <ProjectCard
                  slug={p.slug}
                  coverUrl={p.coverUrl}
                  meta={p.meta}
                  title={p.title}
                  summary={p.summary}
                  tags={p.tags}
                />
              </div>
            ))}
          </div>
          {/* Same 40px mobile / 32px desktop knob split as the Tracks and
           * Infrastructure inner CTAs (nodes 504:79 / 450:5672). */}
          <div className="w-full lg:hidden">
            <Button variant="primary" href="/portfolio" className="w-full uppercase">
              View our portfolio
            </Button>
          </div>
          <div className="hidden lg:block">
            <Button variant="primary" knobSize={32} href="/portfolio" fullWidthMobile={false} className="h-12 uppercase">
              View our portfolio
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="flex w-full flex-col gap-6 lg:gap-10">
          <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-5">
            <p className="font-heading text-[32px] font-medium leading-[38px] tracking-[-1.92px] text-white lg:w-[656px] lg:text-[52px] lg:leading-[60px] lg:tracking-[-3.12px]">
              <span className="text-lime">Three ways </span>to work with the
              department
            </p>
            <div className="flex w-full flex-col items-start gap-3 lg:w-[401px]">
              <p className="font-body text-[14px] leading-[22px] text-white lg:text-[18px] lg:leading-6">
                Take one track or all four. Most businesses start with Build
                and stay for Host and Manage.
              </p>
              {/* Knob size (40 mobile / 32 desktop, nodes 505:11 / 488:4479)
               * and explicit height (48px both, node 505:9 / 488:4477 — the
               * desktop knob alone would only computed to 40px) both differ
               * by breakpoint. Button can't render two knob geometries
               * responsively via CSS alone, so two instances toggled on
               * wrapper visibility (not Button's own className — see the
               * Hero fix). */}
              <div className="w-full lg:hidden">
                <Button variant="primary" href="/contact" fullWidthMobile className="w-full">
                  Book a Strategy Call
                </Button>
              </div>
              <div className="hidden lg:block">
                <Button
                  variant="primary"
                  knobSize={32}
                  href="/contact"
                  fullWidthMobile={false}
                  className="h-12 w-[222px]"
                >
                  Book a Strategy Call
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {tracks.map((t) => (
              <NumberedCard
                key={t.eyebrow}
                variant="list"
                tone={t.eyebrow === "TRACK 01" ? "dark" : "light"}
                eyebrow={t.eyebrow}
                title={t.title}
                description={t.description}
                items={t.items}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <PricingPlans />
      </Section>

      <Section>
        <Testimonials />
      </Section>

      <Section>
        <div className="flex w-full flex-col gap-6 lg:gap-8">
          <p className="font-heading text-[32px] font-medium leading-9 tracking-[-1.92px] text-black lg:w-[656px] lg:text-[52px] lg:leading-[60px] lg:tracking-[-3.12px]">
            Latest thinking from the department
          </p>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
            {[...posts, ...posts, ...posts].map((post, i) => (
              <ArticleCard
                key={`${post.slug}-${i}`}
                slug={post.slug}
                coverUrl={post.coverUrl}
                date={post.date}
                title={post.title}
                excerpt={post.excerpt}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <FinalCTA />
      </Section>

      <Footer />
    </>
  );
}
