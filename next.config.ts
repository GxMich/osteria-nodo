import type { NextConfig } from "next";

/*
 * Published as a static export. There is no Node server behind it, so no
 * /_next/image endpoint: the resizing is handed to the image host instead,
 * which keeps responsive srcsets working (see src/lib/unsplash-loader.ts).
 *
 * NEXT_PUBLIC_BASE_PATH is empty locally, so `npm run dev` serves at /.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    /*
     * The candidate ladder stops at 1920.
     *
     * Next's default tops out at 3840, and a full-bleed photograph on a 1440px
     * retina screen asks for 2850px of image — which rounds up to the 3840
     * candidate and pulls a one-megabyte JPEG for a single decorative plate.
     * At the size these photographs are actually viewed, a 1920px source is
     * indistinguishable from a 3840px one; it is only distinguishable on the
     * network tab.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    loader: "custom",
    loaderFile: "./src/lib/unsplash-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
