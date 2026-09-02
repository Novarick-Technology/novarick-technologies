import { pageMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { formatPostDate, getPublishedPosts } from "@/lib/queries/posts";

export const metadata = pageMetadata(
  "Insights",
  "Insights, lessons, and ideas from a team that designs, builds, and operates technology for real businesses."
);

export default async function BlogList() {
  const blogPosts = await getPublishedPosts();

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
        {blogPosts.length === 0 ? (
          <p className="font-body text-[16px] text-text-body">No posts published yet.</p>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <ArticleCard
                key={post.slug}
                slug={post.slug}
                coverUrl={post.coverUrl}
                date={post.publishedAt ? formatPostDate(post.publishedAt) : ""}
                title={post.title}
                excerpt={post.excerpt}
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
