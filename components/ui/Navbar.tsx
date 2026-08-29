"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blogs", href: "/blog" },
];

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
      {/* Desktop / tablet pill */}
      <nav
        className={`hidden items-center gap-6 rounded-pill border py-2 pl-5 pr-2 lg:flex ${pillClasses[tone]}`}
      >
        <Link href="/" className="shrink-0">
          <Logo tone={tone === "dark" ? "white" : "black"} />
        </Link>
        <ul className={`flex flex-1 items-center gap-6 font-body text-[15px] ${linkClasses[tone]}`}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <Button variant="dark" knobSize={32} fullWidthMobile={false} href="/book-call">
          Book a Strategy Call
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

      {/* Mobile drawer — not covered by the Figma design; built per CLAUDE.md's
       * guidance (full-screen black overlay, 24px Inter Medium links, lime
       * CTA, close top-right, fade + slide-up). Flag for design review. */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black p-6 motion-safe:animate-[fadeSlideUp_0.2s_ease-out]"
          data-tone="dark"
        >
          <div className="flex items-center justify-between">
            <Logo tone="white" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex size-10 items-center justify-center text-white"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-1 flex-col items-start justify-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-[24px] font-medium text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="primary" href="/book-call" onClick={() => setOpen(false)}>
            Book a Strategy Call
          </Button>
        </div>
      )}
    </div>
  );
}
