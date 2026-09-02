import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe-query";

export async function getPublishedProjects() {
  const { data } = await safeQuery(
    () => prisma.project.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    [],
  );
  return data;
}

export async function getPublishedProjectBySlug(slug: string) {
  const { data } = await safeQuery(
    () => prisma.project.findFirst({ where: { slug, published: true } }),
    null,
  );
  return data;
}

export async function getOtherPublishedProjects(excludeSlug: string, limit: number) {
  const { data } = await safeQuery(
    () =>
      prisma.project.findMany({
        where: { published: true, slug: { not: excludeSlug } },
        orderBy: { order: "asc" },
        take: limit,
      }),
    [],
  );
  return data;
}

export async function getPublishedProjectSlugs() {
  const { data } = await safeQuery(
    () => prisma.project.findMany({ where: { published: true }, select: { slug: true } }),
    [],
  );
  return data;
}
