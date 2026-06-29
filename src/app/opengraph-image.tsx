import { ImageResponse } from "next/og";

import { person } from "@/data/placeholder";

export const alt = `${person.name} — ${person.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Graphite Mono + Red OG card, generated at the edge (no static asset needed).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#161a22",
          padding: "80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, background: "#e5484d" }} />
          <div style={{ color: "#8b94a3", fontSize: 28, letterSpacing: 2 }}>
            {person.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              color: "#f4f6f8",
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: -2,
            }}
          >
            {person.name}
            <span style={{ color: "#e5484d" }}>.</span>
          </div>
          <div style={{ display: "flex", color: "#aab2c0", fontSize: 40, marginTop: 16 }}>
            {person.title}
          </div>
        </div>

        <div style={{ display: "flex", color: "#6b7280", fontSize: 26 }}>
          {person.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
