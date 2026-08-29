"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";

/**
 * Sticky action bar every editor ends with — Save, Save and publish,
 * Delete (with confirmation), per ADMIN.md's Interface section. All three
 * are submit controls on the SAME form, routed to different bound Server
 * Actions via formAction — no nested forms needed. Reuses the marketing
 * Button component (on-brand: lime/dark pills) rather than an admin-only
 * button, per the decision to keep the dashboard on-brand throughout.
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
  const { pending } = useFormStatus();

  return (
    <div className="sticky bottom-0 -mx-6 mt-8 flex items-center justify-between gap-3 border-t border-black/10 bg-white/95 px-6 py-4 backdrop-blur">
      <div>
        {onDelete && (
          <button
            type="submit"
            formAction={onDelete}
            disabled={pending}
            onClick={(e) => {
              if (!confirm(`${deleteLabel}? This can't be undone.`)) {
                e.preventDefault();
              }
            }}
            className="font-body text-[14px] text-red-600 underline-offset-2 hover:underline disabled:opacity-60"
          >
            {deleteLabel}
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          variant="dark"
          darkFill="ink-deep"
          height="h-10"
          fullWidthMobile={false}
          disabled={pending}
        >
          {pending ? "Saving…" : "Save"}
        </Button>
        {showPublish && (
          <Button
            type="submit"
            name="publish"
            value="true"
            variant="primary"
            height="h-10"
            fullWidthMobile={false}
            disabled={pending}
          >
            {pending ? "Saving…" : "Save and publish"}
          </Button>
        )}
      </div>
    </div>
  );
}
