import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { blogPosts } from "@/lib/data/blog";

export default function BlogList() {
  return (
    <>
      <Navbar />

      <WhoWeAre
        headline="Beyond the Build"
        headlineHighlight="Build"
        gap="gap-[16px]"
        text="Insights, lessons, and ideas from a team that designs, builds, and operates technology for real businesses."
      />

      <Section continuation>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <ArticleCard
              key={i}
              slug={post.slug}
              coverUrl={post.coverUrl}
              date={post.date}
              title={post.title}
              excerpt={post.excerpt}
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
