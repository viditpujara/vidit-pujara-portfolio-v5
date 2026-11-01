import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RouteTransition } from "@/components/ui/RouteTransition";
import { RevealEngine } from "@/components/ui/RevealEngine";
import { StructuredData } from "@/components/ui/StructuredData";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { identity, isProductionSite, primaryNav, siteUrl } from "@/content/site";
import { personSchema, webSiteSchema } from "@/lib/seo";

/**
 * Both faces are self hosted variable woff2 files copied out of @fontsource at
 * build setup. fonts.googleapis.com is not reachable from the build
 * environment, and a portfolio should not depend on a third party font host in
 * any case. Archivo carries a width axis, which the display classes use.
 */
const archivo = localFont({
  src: "../fonts/archivo-latin-variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin-variable.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  variable: "--font-jetbrains-mono",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${identity.name} | ${identity.publicTitle}`,
    template: `%s | ${identity.name}`,
  },
  description: identity.positioning,
  applicationName: identity.siteName,
  authors: [{ name: identity.name, url: siteUrl }],
  creator: identity.name,
  publisher: identity.name,
  category: "technology",
  robots: isProductionSite
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#08111a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-abyss text-console-ink antialiased">
        {/* Without JavaScript nothing may stay hidden behind an observer. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-draw]{transform:scaleX(1)!important}[data-packet]{display:none!important}#mobile-menu-button{display:none}`}</style>
        </noscript>
        <StructuredData data={[personSchema(), webSiteSchema()]} />
        <a
          href="#main"
          className="t-key sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-sm focus-visible:bg-orch focus-visible:px-4 focus-visible:py-3 focus-visible:text-[#1c1204]"
        >
          Skip to main content
        </a>
        <RevealEngine />
        <SiteHeader />
        <noscript>
          <nav aria-label="Navigation without JavaScript" className="shell py-4">
            <details>
              <summary className="cursor-pointer py-3">Navigation</summary>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 py-4">
                {[{ href: "/", label: "Home" }, ...primaryNav, { href: "/resume", label: "Résumé" }].map((item) => (
                  <li key={item.href}><a className="link inline-block py-2" href={item.href}>{item.label}</a></li>
                ))}
              </ul>
            </details>
          </nav>
        </noscript>
        <main id="main" tabIndex={-1} className="focus-visible:outline-none">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
