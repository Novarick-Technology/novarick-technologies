/**
 * Every admin list/dashboard page reads live data on load — with no
 * database wired up yet (DATABASE_URL is a local placeholder pending a
 * new Supabase project), that meant a hard 500 on every page, blocking
 * navigation through the rest of the UI. Wrapping each Prisma call in
 * this instead degrades to an empty/zero state so the dashboard stays
 * fully click-through-able; DbNotice (components/admin/DbNotice.tsx)
 * surfaces the "not connected" state honestly rather than pretending
 * there's just no data.
 */
export async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<{ data: T; connected: boolean }> {
  try {
    const data = await fn();
    return { data, connected: true };
  } catch (error) {
    // Never log query results (ADMIN.md's data-protection note) — just
    // that the connection itself failed.
    console.error("Admin: database query failed —", error instanceof Error ? error.message : error);
    return { data: fallback, connected: false };
  }
}
