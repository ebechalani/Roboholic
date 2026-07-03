// ════════════════════════════════════════════════════════════════
//  Summer Camp 2026 calendar — maps plan "days" onto real dates.
//  Camp runs Mon–Fri, 1 July (a Wednesday) → 28 August 2026.
//  Day 1 of every class plan = Wednesday 1 July 2026.
// ════════════════════════════════════════════════════════════════
import type { ClassDoc } from '@/types';

export const CAMP_START = '2026-07-01';
export const CAMP_END = '2026-08-28';

function toStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Every camp day (Mon–Fri between start and end) as YYYY-MM-DD, in order. */
export const CAMP_DATES: string[] = (() => {
  const out: string[] = [];
  const d = new Date(CAMP_START + 'T12:00:00');
  const end = new Date(CAMP_END + 'T12:00:00');
  while (d <= end) {
    const wd = d.getDay();
    if (wd >= 1 && wd <= 5) out.push(toStr(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
})();

/** Camp day number (1-based) for a YYYY-MM-DD date, or null if not a camp day. */
export function dayNumberForDate(date: string): number | null {
  const i = CAMP_DATES.indexOf(date);
  return i === -1 ? null : i + 1;
}

/** The date (YYYY-MM-DD) a plan day lands on, or null past the end of camp. */
export function dateForDay(n: number): string | null {
  return CAMP_DATES[n - 1] ?? null;
}

export function todayStr(): string {
  return toStr(new Date());
}

/** A class's day-by-day plan; falls back to chunking lessonIds 2-per-day. */
export function planDays(cls: ClassDoc): string[][] {
  if (cls.plan && cls.plan.length) return cls.plan;
  const ids = cls.lessonIds ?? [];
  const out: string[][] = [];
  for (let i = 0; i < ids.length; i += 2) out.push(ids.slice(i, i + 2));
  return out;
}
