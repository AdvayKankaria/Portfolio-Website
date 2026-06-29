import { SectionHeader } from "@/components/molecules/SectionHeader";
import { ResearchItem } from "@/components/molecules/ResearchItem";
import { research } from "@/data/placeholder";

export function Research() {
  const hasResearch = research.length > 0;

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader
        sectionId="research"
        num="05"
        title="Research"
        headingId="research-heading"
        kicker="Papers and writing on systems and interfaces."
      />

      {hasResearch ? (
        <ul className="border-t border-border">
          {research.map((entry, i) => (
            <ResearchItem key={`${entry.title}-${i}`} entry={entry} />
          ))}
        </ul>
      ) : (
        <div className="rounded-md border border-dashed border-border bg-card/40 px-6 py-16 text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Coming soon
          </p>
          <p className="mx-auto mt-3 max-w-md text-pretty text-sm text-muted-foreground">
            Selected papers and technical writing will appear here.
          </p>
        </div>
      )}
    </section>
  );
}
