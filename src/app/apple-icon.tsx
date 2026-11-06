import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Εικονίδιο για την αρχική οθόνη iOS: η ψηφίδα σε πετρόλ φόντο. */
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
          background: "#1E4E5A",
        }}
      >
        <div
          style={{
            width: 65,
            height: 65,
            borderRadius: 15,
            background: "#D96C4F",
            transform: "rotate(10deg)",
          }}
        />
      </div>
    ),
    size,
  );
}
