import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Shared fallback OG image for every route that doesn't define its own —
 * next/og's ImageResponse can't use next/font, so this is plain system
 * sans rather than Inter; close enough for a social-card thumbnail.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 78% 60%, rgba(214,253,112,0.16), rgba(0,0,0,0) 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 40,
              height: 40,
              borderRadius: 999,
              backgroundColor: "#D6FD70",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
              color: "#000000",
            }}
          >
            N
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#FFFFFF", fontWeight: 600 }}>
            Novarick Technologies
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            lineHeight: 1.15,
            fontWeight: 700,
            color: "#FFFFFF",
            maxWidth: 940,
          }}
        >
          Technology that powers what comes next
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "#A9B0AD",
            maxWidth: 820,
          }}
        >
          We build, deploy, host and operate durable technology for real businesses.
        </div>
      </div>
    ),
    { ...size }
  );
}
