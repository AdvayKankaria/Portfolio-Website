import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and dedupe conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Compact number formatting: 3120 → "3.1k", 1830 → "1.8k". */
export function formatCompact(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
}

/** Deterministic 0–1 pseudo-random from an integer seed (no Math.random). */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
