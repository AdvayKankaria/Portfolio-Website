import { Star } from "lucide-react";

import { Icon } from "@/components/atoms/Icon";
import { Card } from "@/components/ui/card";
import type { Repo } from "@/types";
import { formatCompact } from "@/lib/utils";

/** GitHub repo card: name (red on hover), description, language dot, stars. */
export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer">
      <Card interactive className="group h-full p-5">
        <h3 className="font-mono text-base font-medium text-foreground transition-colors duration-200 group-hover:text-red-400">
          {repo.name}
        </h3>
        <p className="mt-2 text-pretty text-sm text-muted-foreground">
          {repo.description}
        </p>
        <div className="mt-4 flex items-center gap-4 font-mono text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: repo.languageColor }}
              aria-hidden
            />
            {repo.language}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon icon={Star} size={13} />
            {formatCompact(repo.stars)}
          </span>
        </div>
      </Card>
    </a>
  );
}
