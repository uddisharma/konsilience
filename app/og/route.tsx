import { ImageResponse } from "next/og";
import { brand } from "@/lib/content";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || `${brand.name} | AI-First Digital Engineering`;
  const subtitle =
    searchParams.get("subtitle") ||
    "Building secure, scalable SaaS platforms, mobile apps & custom AI systems for ambitious teams.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.25) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15) 0%, transparent 40%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        {/* Header Branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "900",
              color: "#ffffff",
              boxShadow: "0 0 30px rgba(37, 99, 235, 0.5)",
            }}
          >
            K
          </div>
          <span style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-0.5px" }}>
            {brand.name.toLowerCase()}
          </span>
          <span
            style={{
              marginLeft: "16px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#60a5fa",
            }}
          >
            AI Studio & Digital Engineering
          </span>
        </div>

        {/* Content Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "950px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "800",
              lineHeight: "1.15",
              letterSpacing: "-1.5px",
              margin: "0",
              background: "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "24px",
              lineHeight: "1.4",
              color: "rgba(255, 255, 255, 0.75)",
              margin: "0",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Footer info */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.6)" }}>
            https://konsilience.tech
          </span>
          <span style={{ fontSize: "18px", fontWeight: "600", color: "#60a5fa" }}>
            Strategy · Design · Engineering · AI
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
