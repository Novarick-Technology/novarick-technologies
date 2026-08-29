import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { getProjectDetail, projects } from "@/lib/data/projects";

/**
 * Case-study card (nodes 474:10293/10299 desktop, 532:70 mobile): the
 * first two rows (About Project, The challenge) have no top border —
 * only rows 3-7 do. A literal quirk of the source, not something the
 * shared KVRow (which always borders every row) can represent, so this
 * is bespoke to this page.
 */
function CaseStudyRow({
  label,
  value,
  bordered,
}: {
  label: string;
  value: string;
  bordered: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col gap-3 py-6 ${bordered ? "border-t border-line-light" : ""}`}
    >
      <p className="font-heading text-[20px] font-medium tracking-[-0.8px] text-black">{label}</p>
      {/* #323232 doesn't match any documented text token — kept literal. */}
      <p className="font-body text-[14px] leading-[22px] text-[#323232] lg:text-[18px] lg:leading-6">
        {value}
      </p>
    </div>
  );
}

function RoleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="font-heading text-[18px] text-lime">{label}</p>
      <p className="font-body text-[14px] leading-[22px] text-[#d4d4d4] lg:text-[16px] lg:leading-6">
        {value}
      </p>
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function PortfolioDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) notFound();

  const otherProjects = projects.filter((p) => p.slug !== slug).slice(0, 2);

  const caseStudyRows = [
    { label: "About Project", value: project.aboutProject, bordered: false },
    { label: "The challenge", value: project.challenge, bordered: false },
    { label: "The approach", value: project.approach, bordered: true },
    { label: "The product", value: project.product, bordered: true },
    { label: "The technology", value: project.technology, bordered: true },
    { label: "The infrastructure", value: project.infrastructure, bordered: true },
    { label: "The outcome", value: project.outcome, bordered: true },
  ];

  const roleRows = [
    { label: "Product Role", value: project.productRole },
    { label: "Design Role", value: project.designRole },
    { label: "Engineering Role", value: project.engineeringRole },
    { label: "Infrastructure Role", value: project.infrastructureRole },
  ];

  return (
    <>
      <Navbar />

      <div className="w-full px-4 py-10 lg:px-20 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 lg:gap-20">
          <div className="flex w-full flex-col gap-10">
            <p className="font-heading text-[32px] font-medium leading-[38px] tracking-[-1.92px] text-black lg:text-[52px] lg:leading-[normal]">
              {project.title}
            </p>

            <div className="relative h-[220px] w-full overflow-hidden rounded-panel lg:h-[500px]">
              <Image
                src={project.coverDetailUrl}
                alt=""
                fill
                sizes="(min-width: 1024px) 1280px, 100vw"
                className="object-cover"
              />
            </div>

            {/* Case study card is a literal fixed 854px at desktop, not
             * flex-1 — roles card takes the remaining space (node
             * 474:10299). Mobile stacks with roles card first (node
             * 532:67's child order: Roles, then Case study). */}
            <div className="flex w-full flex-col-reverse gap-6 lg:flex-row lg:items-start lg:gap-4">
              <div className="w-full rounded-panel bg-paper-muted px-4 py-2 lg:w-[854px] lg:px-6">
                {caseStudyRows.map((row) => (
                  <CaseStudyRow key={row.label} {...row} />
                ))}
              </div>
              <div className="flex w-full flex-col gap-7 rounded-panel bg-ink px-4 py-6 lg:flex-1">
                {roleRows.map((row) => (
                  <RoleRow key={row.label} {...row} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6">
            <p className="font-heading text-[28px] font-medium tracking-[-1.4px] text-black lg:text-[40px] lg:tracking-[-2.4px]">
              Other Projects
            </p>
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              {otherProjects.map((p) => (
                <ProjectCard
                  key={p.slug}
                  slug={p.slug}
                  coverUrl={p.coverUrl}
                  meta={p.meta}
                  title={p.title}
                  summary={p.summary}
                  tags={p.tags}
                />
              ))}
            </div>
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
