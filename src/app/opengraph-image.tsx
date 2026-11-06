import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SAND = "#F5EFE6";
const PETROL = "#1E4E5A";
const TERRA = "#D96C4F";
const MUTED = "#6B6558";

/** Το ίδιο διακριτικό ψηφιδωτό μοτίβο με το hero του site. */
function tiles() {
  const out = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 15; c++) {
      const accent = (r * 15 + c) % 17 === 3;
      out.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: "absolute",
            left: 64 + c * 78,
            top: 40 + r * 78,
            width: 44,
            height: 44,
            borderRadius: 10,
            transform: "rotate(10deg)",
            background: accent ? TERRA : PETROL,
            opacity: accent ? 0.16 : 0.06,
          }}
        />,
      );
    }
  }
  return out;
}

/**
 * Η Commissioner έρχεται από το πακέτο Fontsource. Χρειάζονται και τα δύο
 * υποσύνολα (ελληνικά για τον τίτλο, λατινικά για το «psifida.com»), οπότε
 * δηλώνονται ως αλυσίδα fontFamily.
 */
const FONT_DIR = join(process.cwd(), "node_modules", "@fontsource", "commissioner", "files");

const font = (subset: "greek" | "latin", weight: 500 | 700) =>
  readFile(join(FONT_DIR, `commissioner-${subset}-${weight}-normal.woff`));

export default async function Image() {
  const [greek700, latin700, greek500, latin500] = await Promise.all([
    font("greek", 700),
    font("latin", 700),
    font("greek", 500),
    font("latin", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          background: SAND,
          padding: "0 88px",
          fontFamily: "CommissionerGreek, CommissionerLatin",
        }}
      >
        {tiles()}

        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: TERRA,
              transform: "rotate(10deg)",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 500, color: TERRA, letterSpacing: 3 }}>
            psifida.com
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            fontSize: 86,
            fontWeight: 700,
            color: PETROL,
            lineHeight: 1.1,
            marginTop: 28,
            maxWidth: 950,
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            fontSize: 34,
            fontWeight: 500,
            color: MUTED,
            marginTop: 30,
          }}
        >
          Ιστοσελίδες και εφαρμογές για μικρές επιχειρήσεις · Καλαμάτα
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "CommissionerGreek", data: greek700, weight: 700, style: "normal" },
        { name: "CommissionerLatin", data: latin700, weight: 700, style: "normal" },
        { name: "CommissionerGreek", data: greek500, weight: 500, style: "normal" },
        { name: "CommissionerLatin", data: latin500, weight: 500, style: "normal" },
      ],
    },
  );
}
