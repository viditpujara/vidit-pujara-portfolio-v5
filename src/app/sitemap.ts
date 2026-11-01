import type { MetadataRoute } from "next";
import { allRoutes } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * Every crawlable route, generated from the single list in src/content/site.ts,
 * with route coverage checked against content and the filesystem in release QA.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
