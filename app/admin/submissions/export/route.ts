import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { toCsv } from "@/lib/admin/csv";
import { buildSubmissionsWhere } from "@/app/admin/submissions/query";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const where = buildSubmissionsWhere({
    filter: searchParams.get("filter") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });

  const submissions = await prisma.submission.findMany({ where, orderBy: { createdAt: "desc" } });

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
