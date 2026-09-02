import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe-query";

/** "12th August, 2026" — matches the literal Figma copy format. */
export function formatPostDate(date: Date): string {
  const day = date.getDate();
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  return `${day}${suffix} ${month}, ${date.getFullYear()}`;
}

export async function getPublishedPosts() {
  const { data } = await safeQuery(
    () => prisma.post.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } }),
    [],
  );
  return data;
}

export async function getPublishedPostBySlug(slug: string) {
  const { data } = await safeQuery(
    () => prisma.post.findFirst({ where: { slug, published: true } }),
    null,
  );
  return data;
}

export async function getPublishedPostSlugs() {
  const { data } = await safeQuery(
    () => prisma.post.findMany({ where: { published: true }, select: { slug: true } }),
    [],
  );
  return data;
}
