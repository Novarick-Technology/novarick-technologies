import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe-query";

/** Nothing renders unless both approved and published are true (ADMIN.md). */
export async function getPublishedTestimonials() {
  const { data } = await safeQuery(
    () =>
      prisma.testimonial.findMany({
        where: { published: true, approved: true },
        orderBy: { order: "asc" },
      }),
    [],
  );
  return data;
}
