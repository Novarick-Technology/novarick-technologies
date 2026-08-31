import type { MetadataRoute } from "next";
import { projects } from "@/lib/data/projects";
import { blogPostSlugs } from "@/lib/data/blog";

/** Only projects with a real case study resolve at /portfolio/[slug] — the
 * rest 404 (see lib/data/projects.ts) and shouldn't be in the sitemap. */
function hasDetailPage(project: (typeof projects)[number]): boolean {
  return "aboutProject" in project;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/what-we-do",
    "/infrastructure",
    "/portfolio",
    "/blog",
    "/contact",
    "/pricing",
    "/book-call",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.filter(hasDetailPage).map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = blogPostSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
