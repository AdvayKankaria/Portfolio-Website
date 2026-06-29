import { SectionNumber } from "@/components/atoms/SectionNumber";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  sectionId: string;
  num: string;
  title: string;
  /** Short mono kicker above the title. */
  kicker?: string;
  headingId: string;
  className?: string;
}

/**
 * Standard section header: red-aware number + mono heading + 1px rule.
 * Renders the <h2> that the section's aria-labelledby points to.
 */
export function SectionHeader({
  sectionId,
  num,
  title,
  kicker,
  headingId,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-baseline gap-4">
        <SectionNumber sectionId={sectionId} num={num} />
        <h2
          id={headingId}
          className="font-mono text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
        >
          {title}
        </h2>
      </div>
      {kicker && (
        <p className="mt-3 max-w-xl font-mono text-sm text-muted-foreground">
          {kicker}
        </p>
      )}
      <Separator className="mt-6" />
    </div>
  );
}
