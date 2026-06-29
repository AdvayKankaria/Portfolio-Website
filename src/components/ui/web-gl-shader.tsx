"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

/**
 * Raw-shader full-bleed background, sourced from 21st.dev and retuned to the
 * Graphite Mono + Red system: instead of an RGB chromatic split, it renders a
 * single red glow wave wrapped in a faint cool-graphite halo (hue ~260).
 *
 * - Positioned absolutely to sit behind hero content (not `fixed`, so it never
 *   covers the rest of the page). Pass a className to size/position it.
 * - Honors prefers-reduced-motion (renders a single static frame, no rAF loop).
 * - Pauses when the tab is hidden. Disposes all GPU resources on unmount.
 * - devicePixelRatio clamped to 2 per the performance budget.
 */

type ShaderUniforms = {
  resolution: { value: [number, number] };
  time: { value: number };
  xScale: { value: number };
  yScale: { value: number };
  distortion: { value: number };
  intensity: { value: number };
};

interface WebGLShaderProps {
  className?: string;
  /** Overall brightness of the red wave. Keep low so it reads as ambient. */
  intensity?: number;
}

export function WebGLShader({ className, intensity = 0.85 }: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
    renderer: THREE.WebGLRenderer | null;
    mesh: THREE.Mesh | null;
    uniforms: ShaderUniforms | null;
    animationId: number | null;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const { current: refs } = sceneRef;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Retuned fragment shader: red core + cool graphite halo, never rainbow.
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform float intensity;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * distortion;
        float rx = p.x * (1.0 + d);
        float bx = p.x * (1.0 - d);

        // Two offset glow waves keep a faint aberration feel...
        float a = 0.045 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float h = 0.045 / abs(p.y + sin((bx + time) * xScale) * yScale);

        // ...mapped to red core (--red-500-ish) + cool graphite halo (hue ~260).
        vec3 col = vec3(a, a * 0.06, a * 0.07);          // red core
        col += vec3(h * 0.10, h * 0.11, h * 0.20) * 0.6; // graphite-cool halo

        gl_FragColor = vec4(col * intensity, 1.0);
      }
    `;

    const sizeOf = () => {
      const rect = canvas.getBoundingClientRect();
      return {
        width: Math.max(1, Math.floor(rect.width)),
        height: Math.max(1, Math.floor(rect.height)),
      };
    };

    const initScene = () => {
      refs.scene = new THREE.Scene();
      refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.setClearColor(new THREE.Color(0x000000), 1);

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

      const { width, height } = sizeOf();
      refs.uniforms = {
        resolution: { value: [width, height] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
        intensity: { value: intensity },
      };

      const position = [
        -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0,
        1.0, 0.0, 1.0, 1.0, 0.0,
      ];

      const positions = new THREE.BufferAttribute(
        new Float32Array(position),
        3,
      );
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", positions);

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      });

      refs.mesh = new THREE.Mesh(geometry, material);
      refs.scene.add(refs.mesh);

      handleResize();
    };

    const renderFrame = () => {
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera);
      }
    };

    const animate = () => {
      if (document.hidden) {
        refs.animationId = requestAnimationFrame(animate);
        return;
      }
      if (refs.uniforms) refs.uniforms.time.value += 0.01;
      renderFrame();
      refs.animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return;
      const { width, height } = sizeOf();
      refs.renderer.setSize(width, height, false);
      refs.uniforms.resolution.value = [width, height];
      if (prefersReduced) renderFrame();
    };

    initScene();
    if (prefersReduced) {
      renderFrame(); // single static frame, no animation loop
    } else {
      animate();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh);
        refs.mesh.geometry.dispose();
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose();
        }
      }
      refs.renderer?.dispose();
      refs.scene = null;
      refs.camera = null;
      refs.renderer = null;
      refs.mesh = null;
      refs.uniforms = null;
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    />
  );
}
