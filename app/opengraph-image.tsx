import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/* The image that shows when a page is shared on social or in a text
   message. Generated rather than designed, so it never goes stale. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

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
          background: "#0B3665",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
            }}
          >
            Cross Services Group
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 88,
              lineHeight: 1.05,
              color: "#ffffff",
              maxWidth: 900,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 820,
            }}
          >
            One call handles your home or your building. MetroWest Boston since 1989.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
            borderTop: "1px solid rgba(255,255,255,0.25)",
            paddingTop: 28,
          }}
        >
          <span>{site.phone.display}</span>
          <span>{site.address.full}</span>
        </div>
      </div>
    ),
    size,
  );
}
