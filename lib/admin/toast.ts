/**
 * Query string for a toast-triggering redirect (see components/admin/
 * Toast.tsx) — used only by create/delete, which genuinely redirect to a
 * different page. update deliberately doesn't redirect at all anymore
 * (see ProjectForm/PostForm/TestimonialForm) — it stays on the same
 * page, which a same-pathname Server Action redirect can't reliably
 * carry a query param or cookie through, so it fires the shared Toast
 * directly instead once its useActionState result comes back.
 */
export function toastQuery(status: "created" | "deleted" | "error"): string {
  return `${status}=1`;
}
