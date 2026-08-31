import { pageMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookingWidget } from "@/components/sections/BookingWidget";

export const metadata = pageMetadata(
  "Book a Call",
  "Select the time that works best for you and book your onboarding call."
);

/**
 * Desktop node 482:1050, mobile 537:6. Padding here is bespoke (not the
 * shared WhoWeAre component) — the source uses pt-100/pb-40 desktop and
 * an asymmetric pt-40/pb-24 mobile, not WhoWeAre's uniform py-10 mobile,
 * and the calendar section that follows sits at pt-24 (not the 0 of a
 * true continuation section, but tighter than a fresh section start).
 */
export default function BookCall() {
  return (
    <>
      <Navbar />

      <div className="flex w-full flex-col items-center gap-4 px-4 pb-6 pt-10 text-center lg:gap-4 lg:px-20 lg:pb-10 lg:pt-[100px]">
        <p className="font-heading text-[32px] font-medium tracking-[-1.92px] text-black lg:w-full lg:max-w-[930px] lg:text-[60px] lg:leading-[66px] lg:tracking-[-3.6px]">
          Book your onboarding call
        </p>
        <p className="font-body text-[14px] leading-[22px] text-text-body lg:w-full lg:max-w-[848px] lg:text-[20px] lg:leading-7">
          Select the time that works best for you and book your onboarding call.
        </p>
      </div>

      <div className="w-full px-4 pb-10 pt-6 lg:px-20 lg:pb-20 lg:pt-6">
        <BookingWidget />
      </div>

      <div className="w-full">
        <Testimonials heading="What they say about working with us" />
      </div>

      <Footer />
    </>
  );
}
