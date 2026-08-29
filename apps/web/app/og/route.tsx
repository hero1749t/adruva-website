import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Adruva Solution";
    const subtitle =
      searchParams.get("subtitle") || "Your Business & Productivity Partner";
    const type = searchParams.get("type") || "default";

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, #0B1F3A 0%, #0A0A0A 60%)",
          padding: "80px",
          boxSizing: "border-box",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Row: Brand Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              fontWeight: "bold",
              color: "#FFFFFF",
              letterSpacing: "-1px",
            }}
          >
            Adruva<span style={{ color: "#FF6B00" }}>.</span>
          </div>
          {type !== "default" && (
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#FF6B00",
                letterSpacing: "2px",
                border: "1px solid rgba(255, 107, 0, 0.3)",
                padding: "6px 12px",
                borderRadius: "100px",
                backgroundColor: "rgba(255, 107, 0, 0.05)",
              }}
            >
              {type}
            </div>
          )}
        </div>

        {/* Middle: Title & Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: "900",
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: "20px",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#8A94A6",
              fontWeight: "500",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "30px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#FF6B00",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            adruvasolution.com
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "#8A94A6",
            }}
          >
            Rishikesh, India
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    console.error("OG image generation error:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
