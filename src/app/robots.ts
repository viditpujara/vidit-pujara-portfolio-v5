import type { MetadataRoute } from "next";
import { isProductionSite } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * Only the production deployment invites crawlers. Any other environment,
 * including every Vercel preview, disallows everything, which keeps preview
 * hosts out of the index and stops them competing with the canonical origin.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
