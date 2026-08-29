"use client";

import { useTransition } from "react";
import { markSubmissionRead } from "@/app/admin/submissions/actions";

export function MarkReadButton({ id, read }: { id: string; read: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => markSubmissionRead(id, !read))}
      className={`inline-flex h-10 items-center justify-center rounded-input px-4 font-heading text-[14px] font-medium disabled:opacity-60 ${
        read ? "border border-black/15 bg-white text-black hover:bg-black/5" : "bg-lime text-black hover:brightness-95"
      }`}
    >
      {read ? "Mark as unread" : "Mark as read"}
    </button>
  );
}
