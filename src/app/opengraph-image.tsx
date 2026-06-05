import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Andres Caso Iglesias - Senior Backend Developer";

export default async function OpengraphImage() {
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
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Andres Caso Iglesias
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: "#60a5fa",
            marginBottom: 16,
          }}
        >
          Senior Backend Developer
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#cbd5e1",
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          20 anos de liderazgo + ciberseguridad + IA
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            fontSize: 24,
            color: "#94a3b8",
          }}
        >
          Master en Ciberseguridad e IA  |  eJPT  |  NestJS  |  Spring Boot
        </div>
      </div>
    ),
    { ...size }
  );
}
