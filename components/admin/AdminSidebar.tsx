"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/submissions", label: "Submissions" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-[220px] shrink-0 flex-col gap-1 border-r border-black/10 bg-white px-3 py-6">
      <Link href="/admin" className="mb-6 px-3">
        <Logo tone="black" className="h-[22px] w-auto" />
      </Link>
      {links.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-pill px-4 py-2 font-heading text-[14px] transition-colors ${
              active ? "bg-lime text-black" : "text-text-body hover:bg-black/5 hover:text-black"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
