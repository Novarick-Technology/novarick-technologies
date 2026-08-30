"use client";

import { useState } from "react";

/**
 * Shopify's blog-post editor drives publish state from a Visible/Hidden
 * choice in the sidebar rather than a second submit button — this
 * replaces the old "Save" / "Save and publish" split for posts with a
 * single Save button (see SaveBar's showPublish={false} in PostForm) and
 * a hidden `published` field this card controls.
 *
 * Deliberately buttons, not native `<input type="radio" name=...>`:
 * grouped radios desynced from React's `checked` state after a Server
 * Action refresh (confirmed — the DOM's native radio-group mutual
 * exclusion patched `checked` behind React's back, leaving the visible
 * selection and the actual submitted hidden-input value disagreeing).
 * Buttons avoid the browser's own radio-grouping semantics entirely.
 */
export function VisibilityCard({
  defaultPublished,
  publishedAt,
}: {
  defaultPublished: boolean;
  publishedAt?: Date | null;
}) {
  const [published, setPublished] = useState(defaultPublished);

  return (
    <div className="flex flex-col gap-3 rounded-panel border border-black/10 bg-white p-4">
      <input type="hidden" name="published" value={published ? "true" : "false"} />
      <span className="font-heading text-[13px] font-medium text-black">Visibility</span>

      <div className="flex flex-col gap-2" role="radiogroup" aria-label="Visibility">
        {(
          [
            { value: true, label: "Visible", hint: "Live on the public blog" },
            { value: false, label: "Hidden", hint: "Saved as a draft" },
          ] as const
        ).map((option) => (
          <button
            key={option.label}
            type="button"
            role="radio"
            aria-checked={published === option.value}
            onClick={() => setPublished(option.value)}
            className={`flex items-start gap-3 rounded-input border px-3 py-2.5 text-left transition-colors ${
              published === option.value
                ? "border-black bg-paper-muted"
                : "border-black/10 hover:border-black/25"
            }`}
          >
            <span
              className={`mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border ${
                published === option.value ? "border-black" : "border-black/30"
              }`}
            >
              {published === option.value && <span className="size-2 rounded-full bg-black" />}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-heading text-[14px] font-medium text-black">{option.label}</span>
              <span className="font-body text-[12px] text-text-body">{option.hint}</span>
            </span>
          </button>
        ))}
      </div>

      {published && publishedAt && (
        <p className="font-body text-[12px] text-text-body">
          Published {publishedAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
      )}
    </div>
  );
}
