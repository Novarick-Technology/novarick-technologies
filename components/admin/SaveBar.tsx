"use client";

import { AdminButton } from "@/components/admin/AdminButton";

/**
 * Sticky action bar every editor ends with — Save, Save and publish,
 * Delete (with confirmation), per ADMIN.md's Interface section. All three
 * buttons are submit buttons on the SAME form, routed to different bound
 * Server Actions via formAction — no nested forms needed.
 */
export function SaveBar({
  onDelete,
  deleteLabel = "Delete",
  showPublish = true,
}: {
  onDelete?: (formData: FormData) => void;
  deleteLabel?: string;
  showPublish?: boolean;
}) {
  return (
    <div className="sticky bottom-0 -mx-6 mt-8 flex items-center justify-between gap-3 border-t border-black/10 bg-white/95 px-6 py-4 backdrop-blur">
      <div>
        {onDelete && (
          <AdminButton
            type="submit"
            formAction={onDelete}
            variant="danger"
            pendingLabel="Deleting…"
            onClick={(e) => {
              if (!confirm(`${deleteLabel}? This can't be undone.`)) {
                e.preventDefault();
              }
            }}
          >
            {deleteLabel}
          </AdminButton>
        )}
      </div>
      <div className="flex items-center gap-3">
        <AdminButton type="submit" variant="ghost" pendingLabel="Saving…">
          Save
        </AdminButton>
        {showPublish && (
          <AdminButton type="submit" name="publish" value="true" variant="primary" pendingLabel="Publishing…">
            Save and publish
          </AdminButton>
        )}
      </div>
    </div>
  );
}
