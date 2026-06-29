"use client";

import { Canvas } from "@react-three/fiber";

import {
  FloatingGeometry,
  type GeometryKind,
} from "@/components/three/FloatingGeometry";
import { ParticleField } from "@/components/three/ParticleField";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// sRGB approximations of the theme tokens (THREE.Color doesn't parse oklch).
const RED = "#e5484d";
const GRAPHITE = "#15181f";

const GEOMETRIES: Array<{
  kind: GeometryKind;
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
}> = [
  { kind: "icosahedron", position: [-3, 1.4, -1], scale: 1.1, rotation: [0.12, 0.18, 0] },
  { kind: "torusKnot", position: [3.2, -0.6, -2], scale: 0.9, rotation: [0.1, 0.14, 0.05] },
  { kind: "octahedron", position: [1.6, 2, -1.5], scale: 0.7, rotation: [0.18, 0.1, 0.08] },
  { kind: "icosahedron", position: [-2, -1.8, -2.5], scale: 0.6, rotation: [0.08, 0.22, 0] },
];

/**
 * Hero 3D layer — transparent Canvas so the shader background shows through.
 * pixelRatio clamped to 2; reduced motion renders a single static frame
 * (frameloop="demand"). R3F disposes geometries/materials on unmount.
 */
export function Scene() {
  const reduced = useReducedMotion();

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      {GEOMETRIES.map((g, i) => (
        <FloatingGeometry
          key={i}
          kind={g.kind}
          position={g.position}
          scale={g.scale}
          rotation={g.rotation}
          reduced={reduced}
          color={GRAPHITE}
          emissive={RED}
        />
      ))}
      <ParticleField color={RED} reduced={reduced} count={900} />
    </Canvas>
  );
}

export default Scene;
