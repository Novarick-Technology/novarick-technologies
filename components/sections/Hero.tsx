"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenuDrawer } from "@/components/ui/MobileMenuDrawer";
import { navLinks } from "@/components/ui/navLinks";

/**
 * Homepage-only. Unlike every other page, the Hero frame embeds its own
 * navbar overlay directly (absolute-positioned over the background image)
 * instead of stacking the generic Navbar component above it — confirmed
 * against both breakpoints (nodes 450:5410 desktop, 499:5 mobile).
 *
 * Note: the mobile primary CTA's literal copy is "Book a Strategy Call"
 * (uppercased via CSS, node 499:76) while desktop's is the literal string
 * "BUILD WITH US" (node 450:5485) — a real inconsistency in the source,
 * not normalized here.
 */
export function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-tone="dark"
      className="relative flex h-[620px] flex-col items-center justify-center overflow-hidden rounded-b-card bg-black px-4 py-6 lg:h-auto lg:px-0 lg:py-0"
    >
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/dark-texture.png"
          alt=""
          fill
          priority
          className="object-cover opacity-20"
        />
      </div>

      {/* Embedded navbar overlay. Needs an explicit z-index: this and the
       * hero copy block below it are both positioned elements with
       * z-index:auto, so without one, DOM order alone decides stacking —
       * the later copy block would paint (and catch clicks) above this,
       * even though its box is transparent outside the visible text,
       * silently swallowing every click on the nav links underneath it. */}
      <div className="absolute left-3 top-6 z-10 flex h-[52px] w-[361px] items-center justify-between rounded-pill border border-white/10 bg-white/[0.14] px-6 py-2 lg:left-1/2 lg:top-[42px] lg:h-auto lg:w-auto lg:-translate-x-1/2 lg:justify-start lg:gap-6 lg:py-2 lg:pl-5 lg:pr-2">
        <Link href="/" className="shrink-0">
          <Logo tone="white" className="h-[21.6px] w-auto lg:h-[26px]" />
        </Link>
        <ul className="hidden whitespace-nowrap font-body text-[15px] text-white lg:flex lg:items-center lg:gap-6">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex flex-col items-end gap-1.5 p-1 lg:hidden"
        >
          <span className="h-0.5 w-5 rounded-full bg-white" />
          <span className="h-0.5 w-[13px] rounded-full bg-white" />
        </button>
        {/* Button forces display:inline-flex in its own base classes, which
         * beats a "hidden" utility passed via className (same CSS property,
         * stylesheet order — not className order — decides). Toggle
         * visibility on a wrapper instead. */}
        <div className="hidden lg:block">
          <Button variant="dark" darkFill="black" knobSize={32} fullWidthMobile={false} href="/contact">
            Book a Strategy Call
          </Button>
        </div>
      </div>

      {/* Mobile: no padding here at all — Hero's own fixed 620px height
       * (node 499:5) plus its justify-center do the centering, matching
       * the source exactly (confirmed via get_metadata: Hero copy sits at
       * y=137 in a 620px frame, which is precisely padding-top(24) +
       * center-offset((620-48-346)/2), not an extra padding block).
       * Desktop uses true absolute-transform centering in Figma; py-220
       * approximates it and was already visually verified correct. */}
      <div className="relative flex w-full flex-col items-center gap-6 lg:w-[946px] lg:py-[220px]">
        <div className="flex w-full flex-col items-center gap-4 text-center text-white">
          <p className="font-heading text-[40px] font-medium leading-[44px] tracking-[-2.4px] lg:text-[80px] lg:leading-[90px] lg:tracking-[-4.8px]">
            Technology that powers what comes next
          </p>
          <p className="font-body text-[14px] leading-[22px] tracking-[-0.28px] lg:w-[586px] lg:text-[16px] lg:leading-6 lg:tracking-[-0.32px]">
            We build, deploy, host and operate durable technology for real
            businesses — from digital products and applications to the
            infrastructure that keeps them running.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-3 lg:w-auto lg:flex-row lg:items-center">
          {/* Literal copy differs by breakpoint in the source, not just
           * casing: mobile is "Book a Strategy Call" (uppercased via CSS,
           * node 499:76), desktop is the literal string "BUILD WITH US"
           * (node 450:5485). Visibility toggled on wrappers, not Button's
           * own className — see note above. */}
          <div className="w-full lg:hidden">
            <Button variant="primary" href="/contact" className="w-full uppercase">
              Book a Strategy Call
            </Button>
          </div>
          <div className="hidden lg:block">
            <Button variant="primary" href="/contact">
              BUILD WITH US
            </Button>
          </div>
          <Button variant="ghost" href="/portfolio" className="w-full lg:w-auto">
            EXPLORE OUR WORK
          </Button>
        </div>
      </div>

      {open && <MobileMenuDrawer onClose={() => setOpen(false)} />}
    </div>
  );
}
