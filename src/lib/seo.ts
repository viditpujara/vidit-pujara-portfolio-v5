import type { Metadata } from "next";
import {
  googleSiteVerification,
  identity,
  isProductionSite,
  siteUrl,
  socialImage,
} from "@/content/site";

/** Absolute URL for any internal path. Every canonical is built from here. */
export function absoluteUrl(path: string): string {
  if (path === "/") return `${siteUrl}/`;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile" | "article";
  keywords?: string[];
};

/**
 * Route level metadata.
 *
 * Anything that is not the production deployment ships `noindex, nofollow`,
 * so preview builds on Vercel cannot compete with the production origin or
 * publish a canonical URL pointing at a preview host.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: isProductionSite
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: identity.siteName,
      locale: "en_IN",
      images: [
        {
          url: absoluteUrl(socialImage.path),
          width: socialImage.width,
          height: socialImage.height,
          alt: socialImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(socialImage.path)],
    },
    verification: googleSiteVerification
      ? { google: googleSiteVerification }
      : undefined,
  };
}

/* --------------------------------------------------------- Structured data */

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: identity.name,
    jobTitle: identity.publicTitle,
    description: identity.positioning,
    url: absoluteUrl("/"),
    image: absoluteUrl(socialImage.path),
    email: `mailto:${identity.email}`,
    worksFor: {
      "@type": "Organization",
      name: identity.employer,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: identity.locality,
      addressRegion: identity.region,
      addressCountry: "IN",
    },
    knowsAbout: [
      "Oracle Integration Cloud",
      "Oracle Fusion HCM",
      "Oracle Fusion Financials",
      "BI Publisher",
      "HDL",
      "FBDI",
      "REST APIs",
      "SOAP services",
      "Oracle SQL",
      "Enterprise integration architecture",
    ],
    sameAs: [identity.linkedin, identity.github],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: absoluteUrl("/"),
    name: identity.siteName,
    description: identity.positioning,
    inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#person` },
  };
}

export function profilePageSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(path)}#profilepage`,
    url: absoluteUrl(path),
    name: identity.siteName,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: { "@id": `${siteUrl}/#person` },
  };
}

export function articleSchema(input: {
  path: string;
  headline: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${absoluteUrl(input.path)}#article`,
    url: absoluteUrl(input.path),
    headline: input.headline,
    description: input.description,
    inLanguage: "en",
    isPartOf: { "@id": `${siteUrl}/#website` },
    author: { "@id": `${siteUrl}/#person` },
    publisher: { "@id": `${siteUrl}/#person` },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListSchema(input: {
  path: string;
  name: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(input.path)}#list`,
    name: input.name,
    itemListElement: input.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
