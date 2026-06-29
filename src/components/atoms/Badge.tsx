import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  /** Pulsing red availability dot in front of the label. */
  dot?: boolean;
}

/**
 * Pill badge — graphite border + muted text only (MASTER: never colored badges).
 * The only red permitted here is the optional availability dot, which signals
 * an interactive/live status.
 */
export function Badge({ children, className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs tracking-wide text-muted-foreground",
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      )}
      {children}
    </span>
  );
}
