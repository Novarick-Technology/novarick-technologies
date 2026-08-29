import Link from "next/link";
import { type ReactNode } from "react";

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
        (typeof action === "object" && "href" in action ? (
          <Link
            href={action.href}
            className="inline-flex h-10 items-center justify-center rounded-input bg-lime px-4 font-heading text-[14px] font-medium text-black hover:brightness-95"
          >
            {action.label}
          </Link>
        ) : (
          action
        ))}
    </div>
  );
}
