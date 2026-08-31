import { pageMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/Button";
import { AppointmentCard } from "@/components/sections/AppointmentCard";
import { addMinutesToSlot, nextWeekday, timeSlots, unavailableSlots } from "@/lib/booking";

export const metadata = pageMetadata(
  "Booking Confirmed",
  "Your onboarding call is booked and a calendar invite is on its way."
);

/**
 * Desktop node 483:2081 (Figma mislabels it "Book call" — content and the
 * mobile counterpart, "Book call confirmed — Mobile" node 538:6, confirm
 * this is the confirmation page). Reads the date/time BookingWidget's
 * confirm button puts in the URL so the page reflects what was actually
 * picked; falls back to the next available weekday and first bookable
 * slot for anyone who lands here directly without going through the
 * picker. No real booking behind either path — Cal.com isn't wired up.
 */
export default async function BookCallConfirmed({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; time?: string }>;
}) {
  const params = await searchParams;

  const fallbackDate = nextWeekday(new Date());
  const date = params.date ? new Date(`${params.date}T00:00:00`) : fallbackDate;

  const fallbackTime = timeSlots.find((slot) => !unavailableSlots.has(slot)) ?? timeSlots[0];
  const time = params.time && !unavailableSlots.has(params.time) ? params.time : fallbackTime;
  const timeRange = `${time} — ${addMinutesToSlot(time, 30)} · West Africa Time (GMT+1)`;

  return (
    <>
      <Navbar />

      <div className="flex w-full flex-col items-center gap-6 px-4 py-10 lg:gap-8 lg:px-20 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-6 lg:gap-8">
          <div className="flex w-full flex-col items-center gap-2 text-center">
            <p className="font-heading text-[32px] font-normal tracking-[-0.96px] text-black lg:text-[52px] lg:tracking-[-1.5px]">
              Your strategy call is booked
            </p>
            <p className="font-body text-[14px] text-text-body lg:w-[580px]">
              Your onboarding call is booked and a calendar invite is on its way to{" "}
              <span className="font-medium">you@brand.com</span>.
            </p>
          </div>

          <div className="w-full lg:w-[767px]">
            <AppointmentCard date={date} time={timeRange} />
          </div>

          <Button variant="primary" href="/" fullWidthMobile={false} className="w-full lg:w-[209px]">
            Go back home
          </Button>
        </div>
      </div>

      <Footer />
    </>
  );
}
