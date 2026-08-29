"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { markSubmissionRead } from "@/app/admin/submissions/actions";

export function MarkReadButton({ id, read }: { id: string; read: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant={read ? "dark" : "primary"}
      darkFill="ink-deep"
      height="h-10"
      fullWidthMobile={false}
      disabled={pending}
      onClick={() => startTransition(() => markSubmissionRead(id, !read))}
    >
      {read ? "Mark as unread" : "Mark as read"}
    </Button>
  );
}
