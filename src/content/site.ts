export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  "http://localhost:3000"
).replace(/\/$/, "");

export const isProductionSite = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

export const identity = {
  name: "Vidit Pujara",
  publicTitle: "Oracle ERP Technical Consultant",
  /**
   * Confirmed by Vidit on 13 August 2026: the official designation is the same
   * string as the public title. Kept as its own field so the distinction stays
   * modelled, but it is never rendered twice on one page.
   */
  officialDesignation: "Oracle ERP Technical Consultant",
  employer: "Mastek",
  employmentStart: "2024-07-15",
  employmentPeriod: "July 2024 to Present",
  location: "Ahmedabad, Gujarat, India",
  locality: "Ahmedabad",
  region: "Gujarat",
  country: "India",
  email: "vidit.pujara@zohomail.in",
  linkedin: "https://www.linkedin.com/in/viditpujara",
  github: "https://github.com/viditpujara",
  monogram: "VP",
  siteName: "Vidit Pujara, Oracle ERP Technical Consultant",
  positioning:
    "Oracle ERP Technical Consultant specialising in Oracle Integration Cloud, with experience delivering enterprise integrations across Oracle Fusion HCM and Financials and a developing focus on AI enabled integration architecture.",
  footerLine:
    "Oracle ERP Technical Consultant working on Oracle Integration Cloud, Oracle Fusion HCM and Oracle Fusion Financials.",
  confidentialityLine:
    "Case studies describe architecture and technique only. Client, vendor and system names are omitted.",
} as const;

export type NavItem = { href: string; label: string };

export const primaryNav: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
];

export const headerAction: NavItem = { href: "/resume", label: "View Résumé" };

export const footerNav: NavItem[] = [
  { href: "/", label: "Home" },
  ...primaryNav.filter((item) => item.href !== "/contact"),
  { href: "/resume", label: "Résumé" },
  { href: "/contact", label: "Contact" },
];

/** Every crawlable public route, used by the sitemap. */
export const allRoutes: string[] = [
  "/",
  "/about",
  "/experience",
  "/case-studies",
  "/case-studies/employee-retirement-contribution-synchronization",
  "/case-studies/spend-authorization-to-expense-report-automation",
  "/case-studies/employee-lifecycle-synchronization",
  "/case-studies/employee-bank-account-synchronization",
  "/projects",
  "/projects/sherbimet",
  "/projects/plezer-construction",
  "/projects/triptogether",
  "/projects/pu-nav",
  "/projects/eventos",
  "/skills",
  "/credentials",
  "/resume",
  "/contact",
];

export const socialImage = {
  path: "/images/vidit-pujara-oracle-erp-technical-consultant-og.png",
  width: 1200,
  height: 630,
  alt: "Vidit Pujara, Oracle ERP Technical Consultant",
} as const;

export const portrait = {
  src: "/images/vidit-pujara-oracle-erp-technical-consultant-portrait.jpg",
  width: 582,
  height: 728,
  alt: "Portrait of Vidit Pujara",
  caption:
    "Vidit Pujara, Oracle ERP Technical Consultant at Mastek.",
} as const;
