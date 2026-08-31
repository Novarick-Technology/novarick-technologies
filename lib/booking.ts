/**
 * Static calendar-grid math for the dummy booking widget — no Cal.com
 * connection yet (per CLAUDE.md's Booking section: "Do not build the
 * booking backend... Use Cal.com Platform" once that account exists).
 * "Available" here is just weekdays from today onward, computed live
 * rather than hardcoded to a snapshot date, since this is meant to be
 * clicked through, not read as real availability.
 */
export type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isAvailable: boolean;
};

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

/** Weeks of a month as a flat 7-column grid, Sunday-first, with leading/trailing days from adjacent months filling out the first and last rows. */
export function getMonthGrid(year: number, month: number, today: Date): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const cells: CalendarDay[] = [];

  for (let i = 0; i < startOffset; i++) {
    const day = daysInPrevMonth - startOffset + 1 + i;
    const date = new Date(year, month - 1, day);
    cells.push({ date, day, isCurrentMonth: false, isAvailable: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isAvailable = isWeekday(date) && date >= midnightToday;
    cells.push({ date, day, isCurrentMonth: true, isAvailable });
  }

  const trailing = (7 - (cells.length % 7)) % 7;
  for (let day = 1; day <= trailing; day++) {
    const date = new Date(year, month + 1, day);
    cells.push({ date, day, isCurrentMonth: false, isAvailable: false });
  }

  return cells;
}

export const monthLabel = (year: number, month: number): string =>
  new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();

export const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const timeSlots = ["09:15", "09:45", "10:00", "10:30", "11:00", "11:30"];

/** A couple of slots are marked unavailable so the design's dimmed/aria-disabled
 * state is actually reachable in the demo, not just the all-available happy path. */
export const unavailableSlots = new Set(["10:00", "11:00"]);

/** Next weekday from (and including) the given date — used both as the
 * default day when the confirmation page is opened directly (no query
 * params) and to keep the demo's "today" anchor in one place. */
export function nextWeekday(from: Date): Date {
  const date = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}

export function addMinutesToSlot(slot: string, minutes: number): string {
  const [h, m] = slot.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export function formatAppointmentDate(date: Date): { month: string; day: number; weekday: string } {
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.getDate(),
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase(),
  };
}
