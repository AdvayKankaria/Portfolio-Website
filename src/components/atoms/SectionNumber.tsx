"use client";

import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";

interface SectionNumberProps {
  /** Section id this number belongs to; turns red when that section is active. */
  sectionId: string;
  num: string;
  className?: string;
}

/** Zero-padded mono section number; red only for the in-view section (MASTER). */
export function SectionNumber({ sectionId, num, className }: SectionNumberProps) {
  const active = useActiveSection();
  const isActive = active === sectionId;

  return (
    <span
      className={cn(
        "font-mono text-sm tabular-nums transition-colors duration-300",
        isActive ? "text-red-500" : "text-muted-foreground",
        className,
      )}
      aria-hidden
    >
      {num}
    </span>
  );
}
