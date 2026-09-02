import { pageMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { getPublishedProjects } from "@/lib/queries/projects";

export const metadata = pageMetadata(
  "Portfolio",
  "Every project here follows the same arc — what the business needed, what we designed and built, where it runs, and what changed."
);

export default async function PortfolioList() {
  const projects = await getPublishedProjects();

  return (
    <>
      <Navbar />

      <WhoWeAre
        headline="Problem. Execution. Infrastructure. Outcome."
        headlineHighlight={["Problem.", "Outcome."]}
        headlineBreakBeforeWord="Infrastructure."
        text="Every project here follows the same arc — what the business needed, what we designed and built, where it runs, and what changed afterwards."
      />

      <Section>
        {projects.length === 0 ? (
          <p className="font-body text-[16px] text-text-body">No projects published yet.</p>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            {projects.map((p) => (
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
        )}
      </Section>

      <Section>
        <FinalCTA />
      </Section>

      <Footer />
    </>
  );
}
