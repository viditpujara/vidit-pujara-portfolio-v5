import type { NextConfig } from "next";

/** Must equal canonicalOrigin in src/lib/environment.ts (checked by a test). */
const CANONICAL_ORIGIN = "https://viditpujara.me";

/** Earlier versions of the portfolio, plus www, all send visitors to the canonical site. */
const LEGACY_HOST_PREFIXES = ["v1", "v2", "v3", "v4", "v5", "www"];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      // Any request that reaches this app on an old version host or www is moved to the
      // canonical origin with the same path, so a case study opened on v5 lands on the
      // same case study at viditpujara.me. The canonical host never matches, so no loop.
      ...LEGACY_HOST_PREFIXES.map((prefix) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: `${prefix}\\.viditpujara\\.me` }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      })),
      // Plausible alternative URLs.
      { source: "/case-study", destination: "/case-studies", permanent: true },
      { source: "/case-study/:slug", destination: "/case-studies/:slug", permanent: true },
      // Slug used for TripTogether on an earlier version of the site.
      { source: "/projects/triptogether-planner", destination: "/projects/triptogether", permanent: true },
    ];
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        // Enforce safe structural restrictions without breaking static Next hydration.
        { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
        // Tight resource policy under observation before enforcement. Static hydration
        // needs a build-hash strategy before inline scripts can be disallowed.
        { key: "Content-Security-Policy-Report-Only", value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'" },
      ],
    }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
