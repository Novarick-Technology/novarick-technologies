import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe-query";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const { data: projects } = await safeQuery(
    () =>
      prisma.project.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    [],
  );
  const { data: posts } = await safeQuery(
    () => prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    [],
  );

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified: project.updatedAt,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
