import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  /**
   * Enables the signature hover: a red left-border slides in (scaleY 0→1) and
   * the surface shifts to --card-hover. No scale, no shadow (MASTER §Surface).
   * The element should also have `group` so descendants can react.
   */
  interactive?: boolean;
}

export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-card transition-colors duration-200",
        interactive &&
          "before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:origin-top before:scale-y-0 before:bg-red-500 before:transition-transform before:duration-200 hover:bg-card-hover hover:before:scale-y-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
