import { Button } from "@/components/atoms/Button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background bg-grid px-6">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-red-500">
          Error 404
        </p>
        <h1 className="mt-4 font-mono text-6xl font-medium tracking-tighter text-foreground sm:text-8xl">
          Not found
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-pretty text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" variant="primary" magnetic>
            Back home
          </Button>
        </div>
      </div>
    </main>
  );
}
