import Image from "next/image";

import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  initials: string;
  className?: string;
  /** Pixel size for next/image (square). */
  size?: number;
}

/**
 * Square (0.25rem corners) avatar with an initials fallback rendered beneath,
 * so layout is stable (CLS 0) even before the image paints.
 */
export function Avatar({ src, alt, initials, className, size = 480 }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border bg-secondary",
        className,
      )}
    >
      <div className="absolute inset-0 grid place-items-center font-mono text-4xl text-muted-foreground">
        {initials}
      </div>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="relative h-full w-full object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
        priority={false}
      />
    </div>
  );
}
