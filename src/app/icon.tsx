import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const dynamic = "force-static";

/*
 * The mark is the second word of the wordmark, alone, on the accent. At 16px
 * in a browser tab there is room for exactly one letter, and a drawn symbol
 * for a restaurant whose identity is entirely typographic would be a symbol
 * that appears nowhere else on the site.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7a1f32",
          color: "#f2ede3",
          fontSize: 46,
          letterSpacing: -1,
        }}
      >
        N
      </div>
    ),
    size,
  );
}
