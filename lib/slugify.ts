/** Matches the server-side normalization in the project/post Server
 * Actions exactly (lib/admin/toast.ts's neighbors) — used client-side
 * only for the live auto-fill preview as you type a title. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
