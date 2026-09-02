import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { toCsv } from "@/lib/admin/csv";
import { buildSubmissionsWhere } from "@/app/admin/(dashboard)/submissions/query";
import { safeQuery } from "@/lib/safe-query";
import { filterDummySubmissions } from "@/lib/admin/dummy-data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const params = {
    filter: searchParams.get("filter") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  };
  const where = buildSubmissionsWhere(params);

  const { data: submissions } = await safeQuery(
    () => prisma.submission.findMany({ where, orderBy: { createdAt: "desc" } }),
    filterDummySubmissions(params),
  );

  const csv = toCsv(
    submissions.map((s) => ({
      date: s.createdAt.toISOString(),
      fullName: s.fullName,
      email: s.email,
      phone: s.phone ?? "",
      need: s.need,
      details: s.details,
      read: s.read ? "yes" : "no",
    })),
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="submissions-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
