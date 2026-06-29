import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  className?: string;
}

/** Sharp-cornered tech-stack tag — graphite border + muted mono text. */
export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-secondary/30 px-2 py-1 font-mono text-xs tracking-wide text-muted-foreground transition-colors duration-200 group-hover:border-graphite-600",
        className,
      )}
    >
      {label}
    </span>
  );
}
