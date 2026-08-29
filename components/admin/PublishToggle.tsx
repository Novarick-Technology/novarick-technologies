"use client";

import { useTransition } from "react";

export function PublishToggle({
  published,
  onToggle,
  onLabel = "Published",
  offLabel = "Draft",
}: {
  published: boolean;
  onToggle: (published: boolean) => void | Promise<void>;
  onLabel?: string;
  offLabel?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => onToggle(!published))}
      className={`shrink-0 rounded-input px-3 py-1.5 font-heading text-[12px] font-medium transition-colors disabled:opacity-60 ${
        published ? "bg-lime text-black" : "border border-black/15 bg-white text-text-body"
      }`}
    >
      {published ? onLabel : offLabel}
    </button>
  );
}
