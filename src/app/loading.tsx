/** Route-level skeleton — graphite blocks beneath the curtain (CLS-safe). */
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6">
      <div className="h-4 w-24 animate-pulse rounded-sm bg-secondary" />
      <div className="mt-8 h-16 w-3/4 animate-pulse rounded-md bg-secondary" />
      <div className="mt-4 h-6 w-1/2 animate-pulse rounded-sm bg-secondary" />
      <div className="mt-10 flex gap-4">
        <div className="h-11 w-36 animate-pulse rounded-md bg-secondary" />
        <div className="h-11 w-28 animate-pulse rounded-md bg-secondary" />
      </div>
    </div>
  );
}
