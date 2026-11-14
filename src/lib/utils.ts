import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Intelligently scales an ingredient quantity based on default servings and target servings.
 */
export function scaleQuantity(baseQty: number, defaultServings: number, targetServings: number): number {
  if (!baseQty || defaultServings <= 0) return baseQty;
  const ratio = targetServings / defaultServings;
  const scaled = baseQty * ratio;

  // Round smartly to 2 decimal places max
  return Math.round(scaled * 100) / 100;
}

/**
 * Formats a decimal number into kitchen-friendly fractions.
 * e.g., 0.5 -> "1/2", 1.5 -> "1 ½", 0.25 -> "1/4", 0.75 -> "3/4"
 */
export function formatFraction(val: number): string {
  if (val === 0) return '0';
  if (!val) return '';

  const whole = Math.floor(val);
  const frac = Math.round((val - whole) * 100) / 100;

  let fracStr = '';
  if (Math.abs(frac - 0.5) < 0.05) fracStr = '½';
  else if (Math.abs(frac - 0.25) < 0.05) fracStr = '¼';
  else if (Math.abs(frac - 0.75) < 0.05) fracStr = '¾';
  else if (Math.abs(frac - 0.33) < 0.05) fracStr = '⅓';
  else if (Math.abs(frac - 0.67) < 0.05) fracStr = '⅔';
  else if (Math.abs(frac - 0.125) < 0.03) fracStr = '⅛';
  else if (frac > 0) fracStr = frac.toString().replace(/^0/, '');

  if (whole > 0 && fracStr) {
    return `${whole} ${fracStr}`;
  }
  if (whole > 0) {
    return whole.toString();
  }
  return fracStr || val.toString();
}

/**
 * Formats seconds into MM:SS format for timers.
 */
export function formatSeconds(totalSeconds: number): string {
  const mins = Math.floor(Math.max(0, totalSeconds) / 60);
  const secs = Math.floor(Math.max(0, totalSeconds) % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats total minutes into a human readable duration (e.g. "1 hr 15 mins" or "35 mins")
 */
export function formatDuration(totalMins: number): string {
  if (!totalMins) return '0 min';
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
  if (hrs > 0) return `${hrs} hr`;
  return `${mins} mins`;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
