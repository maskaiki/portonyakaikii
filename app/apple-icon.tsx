import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111112",
          borderRadius: "40px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "22px",
            right: "22px",
            width: "14px",
            height: "14px",
            background: "#0055FF",
          }}
        />
        <span
          style={{
            fontSize: "92px",
            fontWeight: 900,
            color: "#0055FF",
            letterSpacing: "-0.06em",
            fontFamily: "sans-serif",
          }}
        >
          R
        </span>
        <span
          style={{
            fontSize: "88px",
            fontWeight: 700,
            fontStyle: "italic",
            color: "#F4F4ED",
            marginLeft: "-6px",
            fontFamily: "serif",
          }}
        >
          W
        </span>
      </div>
    ),
    { ...size }
  );
}
