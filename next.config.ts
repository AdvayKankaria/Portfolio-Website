import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Pin the workspace root (a stray lockfile in $HOME otherwise confuses inference).
  turbopack: { root: import.meta.dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    // First-party placeholder art is SVG; safe to allow for our own assets.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withAnalyzer(nextConfig);
