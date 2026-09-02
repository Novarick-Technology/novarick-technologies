import type { Prisma } from "@/app/generated/prisma/client";

/** Shared between the list page and the CSV export route so "export the current filtered set" stays exact. */
export function buildSubmissionsWhere(searchParams: {
  filter?: string;
  q?: string;
}): Prisma.SubmissionWhereInput {
  const where: Prisma.SubmissionWhereInput = {};
  if (searchParams.filter === "unread") {
    where.read = false;
  }
  if (searchParams.q) {
    where.OR = [
      { fullName: { contains: searchParams.q, mode: "insensitive" } },
      { email: { contains: searchParams.q, mode: "insensitive" } },
      { need: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }
  return where;
}
