import type { MetadataRoute } from "next";
import { allRoutes } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * Every crawlable route, generated from the single list in src/content/site.ts,
 * so a new page cannot be added without appearing here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return allRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
