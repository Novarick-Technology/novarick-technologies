import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Capability",
    links: [
      { label: "Product", href: "/what-we-do" },
      { label: "Design", href: "/what-we-do" },
      { label: "Engineering", href: "/what-we-do" },
      { label: "Infrastructure & Ops", href: "/infrastructure" },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      { label: "Application hosting", href: "/infrastructure" },
      { label: "Servers & VPS", href: "/infrastructure" },
      { label: "Databases", href: "/infrastructure" },
      { label: "Monitoring & backups", href: "/infrastructure" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Novarick Group", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Insights", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <div className="w-full px-4 pb-4 lg:px-20 lg:pb-8">
      {/* Content stays capped at 1280px and centered, same as Section —
       * without this the columns stretch to fill any viewport wider than
       * 1280px instead of just gaining more page margin. */}
      <footer
        data-tone="dark"
        className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 rounded-none bg-ink px-4 py-10 lg:gap-12 lg:rounded-card lg:px-[68px] lg:py-[50px]"
      >
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-8">
          <div className="flex flex-1 flex-col gap-4">
            <Logo tone="white" />
            <p className="max-w-[296px] font-body text-[16px] leading-6 tracking-[-0.32px] text-text-dim">
              The technology delivery and infrastructure function of Novarick
              Group. We build it, deploy it, host it, manage it and scale it.
            </p>
          </div>
          <div className="grid flex-[3] grid-cols-2 gap-8 lg:flex lg:gap-8">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-1 flex-col gap-2.5">
                <p className="font-heading text-[16px] font-semibold tracking-[-0.32px] text-white">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-[16px] text-text-dim transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 border-t border-line-dark-alt pt-5 font-body text-[14px] text-text-dim sm:flex-row sm:items-start sm:justify-between">
          <p>© 2026 Novarick Technologies Limited</p>
          <p className="tracking-[-0.28px]">
            We build it. We deploy it. We host it. We manage it. We scale it.
          </p>
        </div>
      </footer>
    </div>
  );
}
