import type { Prisma } from "@/app/generated/prisma/client";

/** Shared between the list page and the dummy-data fallback so both filter identically. */
export function buildPostsWhere(searchParams: {
  filter?: string;
  q?: string;
}): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = {};
  if (searchParams.filter === "published") {
    where.published = true;
  } else if (searchParams.filter === "draft") {
    where.published = false;
  }
  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q, mode: "insensitive" } },
      { excerpt: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }
  return where;
}
