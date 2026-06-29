"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type { Mesh } from "three";

export type GeometryKind = "icosahedron" | "torusKnot" | "octahedron" | "sphere" | "text";

interface FloatingGeometryProps {
  kind: GeometryKind;
  position: [number, number, number];
  scale?: number;
  /** Per-axis rotation speed (rad/sec). */
  rotation: [number, number, number];
  /** Parallax response strength as a fraction of base position. */
  parallax?: number;
  reduced?: boolean;
  color: string;
  emissive: string;
  wireframe?: boolean;
  text?: string;
}

/**
 * A single metallic primitive that rotates on its own axes and drifts toward
 * the pointer (±parallax of its base position). useFrame uses delta — never
 * Date.now(). Static when reduced motion is on.
 */
export function FloatingGeometry({
  kind,
  position,
  scale = 1,
  rotation,
  parallax = 0.05,
  reduced = false,
  color,
  emissive,
  wireframe = false,
  text = "",
}: FloatingGeometryProps) {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh || reduced) return;

    mesh.rotation.x += rotation[0] * delta;
    mesh.rotation.y += rotation[1] * delta;
    mesh.rotation.z += rotation[2] * delta;

    // Pointer parallax: lerp toward base ± parallax * pointer.
    const targetX = position[0] + state.pointer.x * position[0] * parallax * 6;
    const targetY = position[1] + state.pointer.y * position[1] * parallax * 6;
    mesh.position.x += (targetX - mesh.position.x) * 0.05;
    mesh.position.y += (targetY - mesh.position.y) * 0.05;
  });

  return (
    <group ref={ref as any} position={position} scale={scale}>
      {kind === "text" ? (
        <Text
          color={emissive}
          fontSize={1}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor={emissive}
          fillOpacity={0.8}
        >
          {text}
        </Text>
      ) : (
        <mesh>
          {kind === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
          {kind === "torusKnot" && <torusKnotGeometry args={[0.7, 0.25, 128, 16]} />}
          {kind === "octahedron" && <octahedronGeometry args={[1, 0]} />}
          {kind === "sphere" && <sphereGeometry args={[1, 16, 16]} />}
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={wireframe ? 0.8 : 0.35}
            metalness={0.8}
            roughness={0.2}
            flatShading
            wireframe={wireframe}
          />
        </mesh>
      )}
    </group>
  );
}
