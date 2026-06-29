"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

/** Graphite popover tooltip (sharp corners, border not shadow). */
export function Tooltip({ content, children, side = "top" }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={8}
          className={cn(
            "z-50 rounded-md border border-border bg-popover px-3 py-1.5 font-mono text-xs text-popover-foreground",
            "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0",
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-border" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
