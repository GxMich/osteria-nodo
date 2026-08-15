import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/* Written to the export as a file — the static host generates nothing. */
export const dynamic = "force-static";

/* One page, so one entry. Nothing is invented to pad it out. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl.toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
