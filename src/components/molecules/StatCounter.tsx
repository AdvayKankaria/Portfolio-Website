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
    <div ref={ref}>
      <div className="font-mono text-4xl font-medium tabular-nums tracking-tight text-foreground sm:text-5xl">
        {count}
        <span className="text-muted-foreground">{suffix}</span>
      </div>
      <div className="mt-2 font-mono text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
