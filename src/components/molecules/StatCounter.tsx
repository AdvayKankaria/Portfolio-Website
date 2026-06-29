"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

/** Count-up statistic — animates 0 → value when scrolled into view. */
export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ amount: 0.5 });
  const count = useCountUp(value, { start: inView });

  return (
    <div 
      ref={ref} 
      className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-border bg-card/30 p-4 text-center backdrop-blur-sm transition-colors hover:bg-card/50 sm:p-6"
    >
      <div className="font-mono text-3xl font-medium tabular-nums tracking-tight text-foreground sm:text-4xl">
        {count}
        <span className="text-2xl text-muted-foreground sm:text-3xl">{suffix}</span>
      </div>
      <div className="mt-2 text-balance text-sm font-medium leading-tight text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
