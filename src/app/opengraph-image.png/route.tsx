import { ImageResponse } from "next/og";
import { immagini } from "@/lib/immagini";
import { site } from "@/data/site";

const size = { width: 1200, height: 630 };

/* Rendered once at build time and written to the export as a file: the static
   host has no runtime to generate it on request. */
export const dynamic = "force-static";

/*
 * The share card is composed rather than exported from a design tool, so it
 * cannot drift out of step with the site's own facts.
 *
 * It lives at a route path that already ends in .png instead of using Next's
 * `opengraph-image` file convention. The convention writes an extension-less
 * file and injects an og:image tag that overrides the metadata — and a static
 * file host reads the content type off the extension, so crawlers would be
 * handed application/octet-stream and drop the card.
 *
 * Type is set in the renderer's built-in face rather than in Bodoni:
 * embedding the display serif would mean fetching a font over the network
 * during the build, and a portfolio project should not have a build that
 * fails when Google Fonts is unreachable.
 */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f2ede3",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 720,
            height: size.height,
            padding: "64px 56px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontSize: 20,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#7a1f32",
              }}
            >
              {site.nome}
            </div>
            {/* One interpolation, not three: Satori refuses a box with more
                than one child node unless its display is stated, and adjacent
                text nodes count. */}
            <div
              style={{
                fontSize: 20,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#5f5849",
              }}
            >
              {`${site.insegna} — ${site.regione}`}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.02,
              color: "#191712",
              letterSpacing: -2,
            }}
          >
            Ingredienti, tempo, contrasti.
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#5f5849",
              borderTop: "1px solid rgba(25,23,18,0.2)",
              paddingTop: 20,
            }}
          >
            Concept digitale — ristorante di fantasia
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element --
            ImageResponse renders through Satori, which has no next/image. */}
        <img
          src={`${immagini.copertina}&w=480&h=630&fit=crop`}
          alt=""
          width={480}
          height={size.height}
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    size,
  );
}
