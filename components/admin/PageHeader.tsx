import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

export function PageHeader({
  title,
  action,
}: {
  title: string;
  action?: { label: string; href: string } | ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="font-heading text-[24px] font-medium text-black">{title}</h1>
      {action &&
        (typeof action === "object" && action !== null && "href" in action ? (
          <Button variant="primary" height="h-10" fullWidthMobile={false} href={action.href}>
            {action.label}
          </Button>
        ) : (
          action
        ))}
    </div>
  );
}
