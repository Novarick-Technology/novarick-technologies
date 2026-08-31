"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMonthGrid,
  isSameDay,
  monthLabel,
  timeSlots,
  unavailableSlots,
  weekdayLabels,
  type CalendarDay,
} from "@/lib/booking";

/**
 * Calendar + time picker (Book call page, desktop node 482:1273, mobile
 * 537:72/537:172). No Cal.com connection yet — per CLAUDE.md's Booking
 * section, that's a deliberate later step, not something to fake a
 * backend for. This just needs to be clickable end to end: pick an
 * available (weekday, not-past) day, pick a time, confirm routes to the
 * static confirmation page. "Available" is computed from today's real
 * date rather than hardcoded to the Figma snapshot's August 2026 dates.
 *
 * Desktop merges the two panels into one bordered card (calendar left,
 * divider, time picker right); mobile stacks them as two separate cards
 * — same split the source uses. The row layout only engages past
 * min-[1300px]: the calendar's fixed 670px next to a flex-1 time panel
 * is the exact "fixed sibling squeezes a flex-1 sibling" bug fixed
 * elsewhere on this site (InfrastructureInner, Contact, Portfolio
 * detail) if it goes row any earlier.
 */
export function BookingWidget() {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const [currentMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const grid = useMemo(
    () => getMonthGrid(currentMonth.getFullYear(), currentMonth.getMonth(), today),
    [currentMonth, today],
  );

  const canConfirm = selectedDate !== null && selectedTime !== null;

  function handleConfirm() {
    if (!selectedDate || !selectedTime) return;
    const isoDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    router.push(`/book-call/confirmed?date=${isoDate}&time=${selectedTime}`);
  }

  return (
    <div className="flex w-full flex-col gap-3 min-[1300px]:flex-row min-[1300px]:gap-0 min-[1300px]:overflow-hidden min-[1300px]:rounded-panel">
      <div className="flex w-full flex-col gap-5 rounded-panel bg-ink px-4 py-6 min-[1300px]:w-[670px] min-[1300px]:rounded-r-none min-[1300px]:p-8">
        <div className="flex w-full items-center justify-between">
          <p className="font-heading text-[18px] font-medium uppercase text-paper-warm">
            {monthLabel(currentMonth.getFullYear(), currentMonth.getMonth())}
          </p>
          <p className="font-heading text-[12px] uppercase text-text-calendar-lo">Your local time</p>
        </div>

        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full gap-1">
            {weekdayLabels.map((label) => (
              <div key={label} className="flex flex-1 flex-col items-center py-2">
                <p className="font-heading text-[10px] uppercase tracking-[1px] text-text-calendar">{label}</p>
              </div>
            ))}
          </div>

          {Array.from({ length: grid.length / 7 }, (_, week) => grid.slice(week * 7, week * 7 + 7)).map(
            (week, i) => (
              <div key={i} className="flex w-full gap-1">
                {week.map((cell, j) => (
                  <CalendarCell
                    key={j}
                    cell={cell}
                    selected={selectedDate !== null && isSameDay(cell.date, selectedDate)}
                    onSelect={() => setSelectedDate(cell.date)}
                  />
                ))}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-5 rounded-panel border-white/10 bg-ink px-4 py-6 min-[1300px]:flex-1 min-[1300px]:rounded-l-none min-[1300px]:border-l min-[1300px]:p-8">
        <div className="flex w-full flex-col gap-2">
          <p className="font-heading text-[14px] font-medium uppercase tracking-[1.4px] text-paper-warm">
            Select a time
          </p>
          <p className="font-body text-[14px] leading-5 text-white/70">
            Select the time that works best for you.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          {timeSlots.map((slot) => {
            const unavailable = unavailableSlots.has(slot);
            const selected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                disabled={unavailable}
                aria-disabled={unavailable}
                aria-pressed={selected}
                onClick={() => setSelectedTime(slot)}
                className={`w-full rounded-round border px-6 py-4 text-center font-heading text-[14px] uppercase transition-colors ${
                  unavailable
                    ? "cursor-not-allowed border-white/40 text-white/40"
                    : selected
                      ? "border-lime text-lime"
                      : "border-white text-white hover:border-lime hover:text-lime"
                }`}
              >
                {slot}
                {unavailable && <span className="sr-only"> (unavailable)</span>}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!canConfirm}
          aria-disabled={!canConfirm}
          onClick={handleConfirm}
          className={`flex h-12 w-full items-center justify-center rounded-pill font-heading text-[14px] font-medium uppercase transition-opacity ${
            canConfirm ? "bg-lime text-black hover:brightness-95" : "cursor-not-allowed bg-lime/40 text-black/50"
          }`}
        >
          Confirm booking
        </button>
      </div>
    </div>
  );
}

function CalendarCell({
  cell,
  selected,
  onSelect,
}: {
  cell: CalendarDay;
  selected: boolean;
  onSelect: () => void;
}) {
  if (!cell.isCurrentMonth) {
    return <div className="h-[44px] flex-1 min-[1300px]:h-[68px]" />;
  }

  if (!cell.isAvailable) {
    return (
      <div
        aria-disabled
        className="flex h-[44px] flex-1 items-center justify-center font-body text-[14px] text-text-calendar min-[1300px]:h-[68px]"
      >
        {cell.day}
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex h-[44px] flex-1 items-center justify-center rounded-cell font-body text-[14px] transition-colors min-[1300px]:h-[68px] ${
        selected ? "bg-lime text-black" : "border border-line-cal text-paper-warm hover:border-lime hover:text-lime"
      }`}
    >
      {cell.day}
    </button>
  );
}
