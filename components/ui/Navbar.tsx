"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenuDrawer } from "@/components/ui/MobileMenuDrawer";
import { navLinks } from "@/components/ui/navLinks";

type NavbarTone = "light" | "dark";

const pillClasses: Record<NavbarTone, string> = {
  light: "bg-white/60 border-black/5",
  dark: "bg-white/[0.14] border-white/10",
};

const linkClasses: Record<NavbarTone, string> = {
  light: "text-black",
  dark: "text-white",
};

export function Navbar({ tone = "light" }: { tone?: NavbarTone }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full p-4 lg:px-20 lg:py-8">
      {/* Content stays capped at 1280px and centered, same as Section —
       * without this, the pill stretches to fill any viewport wider than
       * 1280px. Within that cap, the pill itself hugs its own content
       * width and centers (mx-auto lg:w-fit) rather than stretching to
       * fill 1280px — flex-1 on the ul previously made it do that, turning
       * the space before the button into one giant gap instead of the
       * pill just being as wide as its content, per the source. */}
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Desktop / tablet pill */}
        <nav
          className={`hidden items-center justify-between gap-6 rounded-pill border py-2 pl-5 pr-4 lg:mx-auto lg:flex lg:w-[clamp(700px,60vw,1200px)] 2xl:pl-8 2xl:pr-6 ${pillClasses[tone]}`}
        >
          <Link href="/" className="shrink-0">
            <Logo tone={tone === "dark" ? "white" : "black"} />
          </Link>
          <ul className={`flex items-center gap-6 whitespace-nowrap font-body text-[15px] ${linkClasses[tone]}`}>
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  className="transition-opacity duration-200 hover:opacity-60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="dark" darkFill="black" height="h-10" fullWidthMobile={false} href="/contact">
            Start a project
          </Button>
        </nav>

        {/* Mobile pill: logo + hamburger */}
        <div
          className={`flex h-[52px] items-center justify-between rounded-pill border px-6 py-2 lg:hidden ${pillClasses[tone]}`}
        >
          <Link href="/" className="shrink-0">
            <Logo tone={tone === "dark" ? "white" : "black"} className="h-[18.6px] w-auto" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex flex-col items-end gap-1.5 p-1"
          >
            <span className={`h-0.5 w-5 rounded-full ${tone === "dark" ? "bg-white" : "bg-black"}`} />
            <span className={`h-0.5 w-[13px] rounded-full ${tone === "dark" ? "bg-white" : "bg-black"}`} />
          </button>
        </div>
      </div>

      {open && <MobileMenuDrawer onClose={() => setOpen(false)} />}
    </div>
  );
}
