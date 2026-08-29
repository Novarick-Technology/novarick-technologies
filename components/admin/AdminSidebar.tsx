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

function isActive(pathname: string, link: (typeof links)[number]) {
  return link.exact ? pathname === link.href : pathname.startsWith(link.href);
}

/** lg+ only — the fixed 220px column. */
export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden h-full w-[220px] shrink-0 flex-col gap-1 border-r border-black/10 bg-white px-3 py-6 lg:flex">
      <Link href="/admin" className="mb-6 px-3">
        <Logo tone="black" className="h-[22px] w-auto" />
      </Link>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-pill px-4 py-2 font-heading text-[14px] transition-colors ${
            isActive(pathname, link) ? "bg-lime text-black" : "text-text-body hover:bg-black/5 hover:text-black"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

/** Below lg — logo + a horizontally-scrollable nav row instead of the fixed column. */
export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3 border-b border-black/10 bg-white px-4 py-4 lg:hidden">
      <Link href="/admin">
        <Logo tone="black" className="h-[20px] w-auto" />
      </Link>
      <div className="flex gap-2 overflow-x-auto">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-pill px-4 py-2 font-heading text-[14px] transition-colors ${
              isActive(pathname, link) ? "bg-lime text-black" : "border border-black/10 text-text-body"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
