import type { ImageLoaderProps } from "next/image";

/**
 * Image loader for the static export.
 *
 * GitHub Pages serves files, not a Node server, so /_next/image does not
 * exist there. Rather than giving up responsive images (`unoptimized: true`),
 * this hands the resizing to Unsplash itself, which takes the same `w` and `q`
 * parameters. next/image still builds the srcset, `sizes` still decides which
 * candidate is fetched, and a 390px phone still downloads the 828px file
 * instead of the full-resolution original.
 */
export default function unsplashLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}
