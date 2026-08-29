"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { safeMutate } from "@/lib/admin/safe-query";

/**
 * Never log submission contents — this table holds personal data
 * belonging to real people (ADMIN.md's Data protection section). Only
 * the record ID is safe to reference in logs/errors.
 */
export async function markSubmissionRead(id: string, read: boolean) {
  await safeMutate(() => prisma.submission.update({ where: { id }, data: { read } }));
  revalidatePath("/admin/submissions");
  revalidatePath(`/admin/submissions/${id}`);
}
