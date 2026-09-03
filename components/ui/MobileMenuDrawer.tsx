import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/components/ui/navLinks";

/**
 * Not covered by the Figma design — CLAUDE.md gives explicit written
 * guidance for it (full-screen black overlay, 24px Inter Medium links,
 * lime CTA, close top-right, fade + slide-up). Flag for design review
 * rather than treating it as final. Shared by Navbar and Hero, the two
 * places a hamburger toggles it.
 */
export function MobileMenuDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black p-6 motion-safe:animate-[fadeSlideUp_0.2s_ease-out]"
      data-tone="dark"
    >
      <div className="flex items-center justify-between">
        <Logo tone="white" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex size-10 items-center justify-center text-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
      <ul className="flex flex-1 flex-col items-start justify-center gap-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onClose}
              className="font-heading text-[24px] font-medium text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Button variant="primary" href="/contact" onClick={onClose}>
        Start a project
      </Button>
    </div>
  );
}
