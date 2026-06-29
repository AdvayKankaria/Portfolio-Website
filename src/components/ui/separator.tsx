"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

/** 1px graphite rule — sections are divided by these, not by margin alone. */
export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
