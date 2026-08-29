import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/lib/data/projects";

export default function PortfolioList() {
  return (
    <>
      <Navbar />

      <WhoWeAre
        headline="Problem. Execution. Infrastructure. Outcome."
        headlineHighlight={["Problem.", "Outcome."]}
        text="Every project here follows the same arc — what the business needed, what we designed and built, where it runs, and what changed afterwards."
      />

      <Section>
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
      </Section>

      <Section>
        <FinalCTA />
      </Section>

      <Footer />
    </>
  );
}
