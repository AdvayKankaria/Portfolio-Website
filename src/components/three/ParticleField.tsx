"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";

import { seededRandom } from "@/lib/utils";

interface ParticleFieldProps {
  count?: number;
  color: string;
  reduced?: boolean;
}

/**
 * A single BufferGeometry of drifting points (never per-instance geometry).
 * Points rise slowly and wrap at the top edge. Static under reduced motion.
 */
export function ParticleField({
  count = 900,
  color,
  reduced = false,
}: ParticleFieldProps) {
  const ref = useRef<Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    // Deterministic placement (pure) so render stays side-effect free.
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seededRandom(i * 3 + 1) - 0.5) * 18; // x
      arr[i * 3 + 1] = (seededRandom(i * 3 + 2) - 0.5) * 14; // y
      arr[i * 3 + 2] = (seededRandom(i * 3 + 3) - 0.5) * 10; // z
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    const points = ref.current;
    if (!points || reduced) return;
    const geom = points.geometry;
    const pos = geom.attributes.position;
    const array = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const yi = i * 3 + 1;
      array[yi] += delta * 0.35; // drift upward
      if (array[yi] > 7) array[yi] = -7; // wrap
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
}
