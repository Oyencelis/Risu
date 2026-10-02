import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const CANVAS = "#050505";
const SHEET = "#F4F4F1";
const INK = "#0B0B0C";
const MUTED = "#5F6169";
const COBALT = "#0B0B0C";
const LABEL = "#F4F4F1";

type OgOptions = {
  /** Frame label, e.g. "00 Cover" or "001 Laguna Guide". */
  label: string;
  title: string;
  caption?: string;
};

/** Shared Open Graph card: one frame on the canvas. Used by each route's opengraph-image. */
export async function renderOg({ label, title, caption = site.role }: OgOptions) {
  // The site's heading font, bundled in assets/fonts (SIL Open Font License).
  const heading = await readFile(join(process.cwd(), "assets/fonts/BricolageGrotesque-Bold.ttf"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "36px 48px 48px",
        background: CANVAS,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 14,
          fontSize: 20,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: LABEL,
        }}
      >
        <div style={{ display: "flex" }}>{label}</div>
        <div style={{ display: "flex", color: "#868995" }}>
          {site.brand} / {site.edition}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 48,
          background: SHEET,
          color: INK,
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              padding: "6px 14px",
              background: COBALT,
              color: "#fff",
              fontSize: 20,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {caption}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 12 ? 96 : 210,
            fontFamily: "Bricolage",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -6,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: MUTED }}>
          {site.location}
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [{ name: "Bricolage", data: heading, weight: 700, style: "normal" }],
    },
  );
}
