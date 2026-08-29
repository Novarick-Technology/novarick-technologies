"use client";

import { useTransition } from "react";

export function ReorderButtons({
  disableUp,
  disableDown,
  onMove,
}: {
  disableUp: boolean;
  disableDown: boolean;
  onMove: (direction: "up" | "down") => void | Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex shrink-0 flex-col">
      <button
        type="button"
        disabled={pending || disableUp}
        onClick={() => startTransition(() => onMove("up"))}
        aria-label="Move up"
        className="font-heading text-[11px] leading-none text-text-body hover:text-black disabled:opacity-30"
      >
        ▲
      </button>
      <button
        type="button"
        disabled={pending || disableDown}
        onClick={() => startTransition(() => onMove("down"))}
        aria-label="Move down"
        className="font-heading text-[11px] leading-none text-text-body hover:text-black disabled:opacity-30"
      >
        ▼
      </button>
    </div>
  );
}
