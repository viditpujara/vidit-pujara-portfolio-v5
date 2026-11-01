import { resolveSiteEnvironment } from "../lib/environment";
import routes from "./routes.json";

export const { siteUrl, isProductionSite } = resolveSiteEnvironment(process.env);

export const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

export const identity = {
  name: "Vidit Pujara",
  publicTitle: "Oracle Fusion Technical Consultant",
  /** Current HR designation confirmed by Vidit on 1 November 2026. */
  officialDesignation: "Consultant I",
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
  siteName: "Vidit Pujara, Oracle Fusion Technical Consultant",
  positioning:
    "Oracle Fusion Technical Consultant specialising in Oracle Integration Cloud, with experience delivering enterprise integrations across Oracle Fusion HCM and Financials and a developing focus on AI enabled integration architecture.",
  footerLine:
    "Oracle Fusion Technical Consultant working on Oracle Integration Cloud, Oracle Fusion HCM and Oracle Fusion Financials.",
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
export const allRoutes: string[] = routes;

export const socialImage = {
  path: "/images/vidit-pujara-oracle-fusion-technical-consultant-og.png",
  width: 1200,
  height: 630,
  alt: "Vidit Pujara, Oracle Fusion Technical Consultant",
} as const;

export const portrait = {
  src: "/images/vidit-pujara-oracle-erp-technical-consultant-portrait.jpg",
  width: 582,
  height: 728,
  alt: "Portrait of Vidit Pujara",
  caption:
    "Vidit Pujara, Oracle Fusion Technical Consultant at Mastek.",
} as const;

export const resumeDownload = {
  href: "/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf",
  filename: "Vidit_Pujara_Oracle_Fusion_Technical_Consultant_OIC.pdf",
} as const;
