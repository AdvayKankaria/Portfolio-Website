import { Tag } from "@/components/atoms/Tag";
import { Card } from "@/components/ui/card";
import type { Experience } from "@/types";
import { cn } from "@/lib/utils";

interface TimelineEntryProps {
  entry: Experience;
  align?: "left" | "right";
}

/** One experience card: role, company (red link), dates, bullets, stack. */
export function TimelineEntry({ entry, align = "right" }: TimelineEntryProps) {
  return (
    <Card interactive className={cn("group p-6", align === "left" && "md:text-right")}>
      <div
        className={cn(
          "flex flex-wrap items-baseline justify-between gap-2",
          align === "left" && "md:flex-row-reverse",
        )}
      >
        <h3 className="font-mono text-lg font-medium text-foreground transition-colors duration-200 group-hover:text-red-400">
          {entry.role}
        </h3>
        <span className="font-mono text-sm text-muted-foreground">
          {entry.start} — {entry.end}
        </span>
      </div>

      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block font-mono text-sm text-red-400 transition-colors hover:text-red-300"
      >
        {entry.company}
        <span className="text-muted-foreground"> · {entry.location}</span>
      </a>

      <ul
        className={cn(
          "mt-4 space-y-2 text-sm text-muted-foreground",
          align === "left" && "md:[&_li]:flex-row-reverse",
        )}
      >
        {entry.description.map((point, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 h-px w-3 shrink-0 bg-graphite-600" aria-hidden />
            <span className="text-pretty">{point}</span>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "mt-5 flex flex-wrap gap-2",
          align === "left" && "md:justify-end",
        )}
      >
        {entry.stack.map((tech) => (
          <Tag key={tech} label={tech} />
        ))}
      </div>
    </Card>
  );
}
