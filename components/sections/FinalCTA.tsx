import Image from "next/image";
import { Button } from "@/components/ui/Button";

/**
 * Reused across pages per CLAUDE.md. Copy hardcoded from the confirmed
 * Homepage instance (desktop node 437:4417, mobile node 506:3052).
 */
export function FinalCTA() {
  return (
    <div
      data-tone="dark"
      className="relative flex w-full flex-col items-center gap-5 overflow-hidden px-4 py-10 lg:rounded-card lg:px-20 lg:py-[104px]"
    >
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <Image src="/images/final-cta.png" alt="" fill className="object-cover opacity-30" />
      </div>

      <p className="relative text-center font-heading text-[34px] font-medium leading-[42px] tracking-[-2.04px] text-white lg:w-[934px] lg:text-[64px] lg:leading-[80px] lg:tracking-[-3.84px]">
        {"Tell us what the business needs to do. We will tell you what it takes to "}
        <span className="text-lime">build, host and run it.</span>
      </p>

      <div className="relative flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center">
        <Button variant="primary" href="/book-call" className="w-full lg:w-auto">
          BUILD WITH US
        </Button>
        <Button variant="ghost" href="/infrastructure" className="w-full lg:w-auto">
          EXPLORE INFRASTRUCTURE
        </Button>
      </div>
    </div>
  );
}
