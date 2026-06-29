import { seededRandom } from "@/lib/utils";

const COLS = 52;
const ROWS = 7;
const CELL = 11;
const GAP = 3;

// Graphite intensity scale (no decorative red — red stays for interaction only).
const LEVEL_FILL = [
  "var(--graphite-900)",
  "var(--graphite-700)",
  "var(--graphite-600)",
  "var(--graphite-500)",
  "var(--graphite-300)",
];

function seedFrom(username: string): number {
  return username
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

/**
 * Deterministic 52×7 contribution heatmap rendered as a single SVG.
 * Levels are seeded from the username so the grid is stable across renders
 * (no live API calls). Colored on the graphite scale per MASTER.
 */
export function ContributionGrid({
  username,
  total,
}: {
  username: string;
  total: number;
}) {
  const base = seedFrom(username);
  const width = COLS * (CELL + GAP) - GAP;
  const height = ROWS * (CELL + GAP) - GAP;

  const cells = [];
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS; r++) {
      const i = c * ROWS + r;
      const rnd = seededRandom(base + i * 1.37);
      // Bias toward sparser cells, occasional bright streaks.
      const level =
        rnd > 0.93 ? 4 : rnd > 0.82 ? 3 : rnd > 0.62 ? 2 : rnd > 0.4 ? 1 : 0;
      cells.push(
        <rect
          key={i}
          x={c * (CELL + GAP)}
          y={r * (CELL + GAP)}
          width={CELL}
          height={CELL}
          rx={1}
          fill={LEVEL_FILL[level]}
        />,
      );
    }
  }

  return (
    <figure className="w-full">
      <figcaption className="mb-4 font-mono text-sm text-muted-foreground">
        {total.toLocaleString()} contributions in the last year
      </figcaption>
      <div className="overflow-x-auto pb-2">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${total} contributions over the last year for ${username}`}
          className="max-w-none"
        >
          {cells}
        </svg>
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-2xs text-muted-foreground">
        <span>Less</span>
        {LEVEL_FILL.map((fill, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: fill }}
            aria-hidden
          />
        ))}
        <span>More</span>
      </div>
    </figure>
  );
}
