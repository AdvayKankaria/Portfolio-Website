"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useMagneticHover } from "@/hooks/useMagneticHover";

/**
 * The canonical CTA. Exactly three variants (MASTER §Button System):
 *  - primary     : red fill, the single most important action per section
 *  - ghost       : red border, transparent — secondary CTAs
 *  - ghost-steel : graphite border, no red — low-priority actions
 */
export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono uppercase tracking-widest select-none transition-colors duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-red-500 text-primary-foreground hover:bg-red-400 hover:glow-red active:bg-red-600 border border-transparent",
        ghost:
          "bg-transparent border border-red-500 text-red-400 hover:bg-red-500/10 hover:border-red-400 hover:text-red-300",
        "ghost-steel":
          "bg-transparent border border-border text-muted-foreground hover:border-graphite-400 hover:text-foreground",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "px-7 py-3 text-sm",
        lg: "px-8 py-3.5 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

const scaleByVariant = {
  primary: { hover: 1.02, tap: 0.98 },
  ghost: { hover: 1.01, tap: 0.98 },
  "ghost-steel": { hover: 1.01, tap: 0.98 },
} as const;

type Variant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

interface BaseProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
  /** Render as a link when set (auto external rel/target for http links). */
  href?: string;
  magnetic?: boolean;
  /** Accessible label for icon-only buttons. */
  "aria-label"?: string;
  /** Label shown inside the custom cursor when magnetic-hovering. */
  "data-cursor-label"?: string;
}

type ButtonProps = BaseProps &
  Omit<HTMLMotionProps<"button">, keyof BaseProps> & {
    type?: "button" | "submit" | "reset";
  };

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  magnetic = false,
  type = "button",
  ...props
}: ButtonProps) {
  const v = (variant ?? "primary") as Variant;
  const scale = scaleByVariant[v];
  const magnet = useMagneticHover<HTMLElement>();

  const motionProps = {
    whileHover: { scale: scale.hover },
    whileTap: { scale: scale.tap },
    style: magnetic && magnet.enabled ? magnet.style : undefined,
    onMouseMove: magnetic ? magnet.handlers.onMouseMove : undefined,
    onMouseLeave: magnetic ? magnet.handlers.onMouseLeave : undefined,
    "data-magnetic": magnetic ? "" : undefined,
    className: cn(buttonVariants({ variant, size }), className),
  };

  if (href) {
    const external = href.startsWith("http");
    return (
      <motion.a
        ref={magnetic ? (magnet.ref as React.Ref<HTMLAnchorElement>) : undefined}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...(props as HTMLMotionProps<"a">)}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={magnetic ? (magnet.ref as React.Ref<HTMLButtonElement>) : undefined}
      type={type}
      {...(props as HTMLMotionProps<"button">)}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
