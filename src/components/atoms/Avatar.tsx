import Image from "next/image";

import { cn } from "@/lib/utils";
import { AvatarEditor } from "@/components/molecules/AvatarEditor";

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
    <AvatarEditor>
      <div
        className={cn(
          "group relative overflow-hidden rounded-full border-2 border-border bg-secondary shadow-xl transition-all duration-500 hover:border-red-500 hover:ring-4 hover:ring-red-500/30 hover:shadow-[0_0_60px_rgba(255,0,0,0.6)]",
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
          className="relative h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 40vw"
          priority={false}
          unoptimized={true}
        />
      </div>
    </AvatarEditor>
  );
}

