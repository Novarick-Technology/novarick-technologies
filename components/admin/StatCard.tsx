import Link from "next/link";

export function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-card bg-paper-muted p-5 transition-colors hover:bg-black/5"
    >
      <span className="font-body text-[13px] text-text-body">{label}</span>
      <span className="font-heading text-[32px] font-medium text-black">{value}</span>
    </Link>
  );
}
