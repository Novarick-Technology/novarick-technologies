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
      className="relative flex h-[620px] flex-col items-center justify-center overflow-hidden rounded-b-card bg-black px-4 py-6 min-[900px]:h-auto min-[900px]:px-0 min-[900px]:py-0"
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
      <div className="absolute left-3 top-6 z-10 flex h-[52px] w-[calc(100%-29px)] max-w-[361px] items-center justify-between rounded-pill border border-white/10 bg-white/[0.14] px-6 py-2 min-[900px]:left-1/2 min-[900px]:top-[42px] min-[900px]:h-auto min-[900px]:w-[clamp(700px,60vw,1200px)] min-[900px]:max-w-none min-[900px]:-translate-x-1/2 min-[900px]:justify-between min-[900px]:gap-6 min-[900px]:py-2 min-[900px]:pl-5 min-[900px]:pr-2 2xl:pl-8 2xl:pr-4">
        <Link href="/" className="shrink-0">
          <Logo tone="white" className="h-[21.6px] w-auto min-[900px]:h-[26px]" />
        </Link>
        <ul className="hidden whitespace-nowrap font-body text-[15px] text-white min-[900px]:flex min-[900px]:items-center min-[900px]:gap-6">
          {navLinks.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link href={link.href} className="transition-opacity duration-200 hover:opacity-60">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex flex-col items-end gap-1.5 p-1 min-[900px]:hidden"
        >
          <span className="h-0.5 w-5 rounded-full bg-white" />
          <span className="h-0.5 w-[13px] rounded-full bg-white" />
        </button>
        {/* Button forces display:inline-flex in its own base classes, which
         * beats a "hidden" utility passed via className (same CSS property,
         * stylesheet order — not className order — decides). Toggle
         * visibility on a wrapper instead. */}
        <div className="hidden min-[900px]:block">
          <Button variant="dark" darkFill="black" height="h-10" fullWidthMobile={false} href="/contact">
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
      <div className="relative flex w-full flex-col items-center gap-6 min-[900px]:w-full min-[900px]:max-w-[946px] min-[900px]:py-[220px] min-[900px]:px-6">
        <div className="flex w-full flex-col items-center gap-4 text-center text-white">
          <p className="font-heading text-[40px] font-medium leading-[44px] tracking-[-2.4px] min-[900px]:text-[80px] min-[900px]:leading-[90px] min-[900px]:tracking-[-4.8px]">
            Technology that powers what comes next
          </p>
          <p className="font-body text-[14px] leading-[22px] tracking-[-0.28px] min-[900px]:w-[586px] min-[900px]:text-[16px] min-[900px]:leading-6 min-[900px]:tracking-[-0.32px]">
            We build, deploy, host and operate durable technology for real
            businesses — from digital products and applications to the
            infrastructure that keeps them running.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-3 min-[900px]:w-auto min-[900px]:flex-row min-[900px]:items-center">
          {/* Literal copy differs by breakpoint in the source, not just
           * casing: mobile is "Book a Strategy Call" (uppercased via CSS,
           * node 499:76), desktop is the literal string "BUILD WITH US"
           * (node 450:5485). Visibility toggled on wrappers, not Button's
           * own className — see note above. */}
          <div className="w-full min-[900px]:hidden">
            <Button variant="primary" href="/contact" className="w-full uppercase">
              Book a Strategy Call
            </Button>
          </div>
          <div className="hidden min-[900px]:block">
            <Button variant="primary" href="/contact">
              BUILD WITH US
            </Button>
          </div>
          <Button variant="ghost" href="/portfolio" className="w-full min-[900px]:w-auto">
            EXPLORE OUR WORK
          </Button>
        </div>
      </div>

      {open && <MobileMenuDrawer onClose={() => setOpen(false)} />}
    </div>
  );
}
