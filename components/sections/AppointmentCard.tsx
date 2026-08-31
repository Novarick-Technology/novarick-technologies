import { formatAppointmentDate } from "@/lib/booking";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center gap-4">
      <p className="shrink-0 font-body text-[12px] font-medium text-black/50">{label}</p>
      <p className="flex-1 font-body text-[14px] text-black/90 lg:text-[16px]">{value}</p>
    </div>
  );
}

/**
 * Confirmation page's appointment card (desktop node 483:2405, mobile
 * 538:73). The date tile is the one place DM Sans / Dela Gothic One
 * appear on the whole site, per CLAUDE.md — everywhere else uses
 * --font-heading / --font-body only.
 */
export function AppointmentCard({ date, time }: { date: Date; time: string }) {
  const { month, day, weekday } = formatAppointmentDate(date);

  return (
    <div className="flex w-full flex-col items-center gap-5 rounded-panel border border-black/10 bg-paper-muted p-4 lg:flex-row lg:gap-[26px] lg:p-6">
      <div className="flex size-[112px] shrink-0 flex-col items-center justify-center rounded-panel bg-black text-lime">
        <p className="font-[family-name:var(--font-date-sans)] text-[12px] font-bold tracking-[2px]">{month}</p>
        <p className="font-[family-name:var(--font-date-display)] text-[36px] leading-[46px] tracking-[-1.2px]">
          {day}
        </p>
        <p className="font-[family-name:var(--font-date-sans)] text-[10px] font-semibold tracking-[1.6px]">
          {weekday}
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-3">
        <p className="font-heading text-[21px] tracking-[-0.5px] text-black">Onboarding call · 30 minutes</p>
        <DetailRow label="TIME" value={time} />
        <DetailRow label="WITH" value="Novarick Technologies" />
        <DetailRow label="WHERE" value="Google Meet — link included in your invite" />
      </div>
    </div>
  );
}
