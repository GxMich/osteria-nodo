import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/* Written to the export as a file — the static host generates nothing. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("sitemap.xml", siteUrl).toString(),
  };
}
