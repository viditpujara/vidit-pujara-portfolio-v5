type Environment = Record<string, string | undefined>;

export const canonicalOrigin = "https://viditpujara.me";

/** Hosting context and the explicit flag must agree before a build invites indexing. */
export function resolveSiteEnvironment(env: Environment) {
  const requestedProduction = env.NEXT_PUBLIC_SITE_ENV === "production";
  if (env.VERCEL_ENV === "production" && !requestedProduction) {
    throw new Error("Production requires NEXT_PUBLIC_SITE_ENV=production at build time.");
  }
  if (requestedProduction && env.VERCEL_ENV && env.VERCEL_ENV !== "production") {
    throw new Error("A Vercel preview/development build must never enable production indexing.");
  }
  const configured = env.NEXT_PUBLIC_SITE_URL;
  if (requestedProduction && !configured) {
    throw new Error("Production requires an explicit NEXT_PUBLIC_SITE_URL HTTPS origin.");
  }
  const url = new URL(configured || canonicalOrigin);
  if (url.protocol !== "https:" || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash || url.port ||
      url.hostname === "localhost" || url.hostname.endsWith(".localhost") ||
      url.hostname.endsWith(".vercel.app") || /^[\d.]+$/.test(url.hostname) ||
      url.hostname.includes(":")) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a public HTTPS origin without a path, port or credentials.");
  }
  return { siteUrl: url.origin, isProductionSite: requestedProduction };
}
