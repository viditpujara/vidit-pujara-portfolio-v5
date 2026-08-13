import type { Metadata } from "next";
import { HeroInstrument } from "@/components/figures/HeroInstrument";
import { Pipeline } from "@/components/figures/Pipeline";
import { MetricGrid } from "@/components/figures/Numbers";
import { DirectionTimeline, EnvironmentTrack } from "@/components/figures/Tracks";
import { SectionIndex } from "@/components/layout/SectionIndex";
import {
  Action,
  Console,
  DataRow,
  Key,
  MoreLink,
  Note,
  Record,
  Seam,
  SectionHead,
  Shell,
} from "@/components/primitives/register";
import {
  CapabilityRow,
  CaseStudyRow,
  ProjectRow,
} from "@/components/sections/rows";
import { StructuredData } from "@/components/ui/StructuredData";
import { caseStudies } from "@/content/case-studies";
import { figWorkingShape } from "@/content/figures";
import { homeMetrics } from "@/content/metrics";
import { experience, home } from "@/content/pages";
import { projects } from "@/content/projects";
import { identity } from "@/content/site";
import { pageMetadata, profilePageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${identity.name} | Oracle ERP Technical Consultant`,
  description:
    "Oracle ERP Technical Consultant specialising in Oracle Integration Cloud, delivering enterprise integrations across Oracle Fusion HCM and Financials with BI Publisher, REST APIs, SOAP services, HDL, FBDI and Oracle SQL.",
  path: "/",
  type: "profile",
  keywords: [
    "Oracle Integration Cloud consultant",
    "OIC developer",
    "Oracle Fusion HCM integration",
    "Oracle Fusion Financials integration",
    "BI Publisher",
    "HDL",
    "FBDI",
    "Oracle SQL",
    "Mastek",
    "Ahmedabad",
  ],
});

/**
 * The six capabilities map one to one onto the six signal colours used in every
 * figure on this site, which is why they carry a key rather than a number: they
 * are categories, not a sequence.
 */
const capabilityMeta = [
  { keyLabel: "OIC", tone: "oic" as const },
  { keyLabel: "HCM + FIN", tone: "target" as const },
  { keyLabel: "BIP", tone: "support" as const },
  { keyLabel: "HDL / FBDI / REST", tone: "process" as const },
  { keyLabel: "SQL + STAGING", tone: "source" as const },
  { keyLabel: "RECONCILE", tone: "error" as const },
];

const sectionIndex = [
  { id: "positioning", label: "Positioning" },
  { id: "shape", label: "Working shape" },
  { id: "record", label: "Delivery record" },
  { id: "capabilities", label: "Capabilities" },
  { id: "case-studies", label: "Case studies" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "direction", label: "Direction" },
  { id: "contact", label: "Contact" },
];

const featuredProjects = projects.filter((project) =>
  ["triptogether", "sherbimet"].includes(project.slug),
);

const specRows = [
  { label: "Role", value: identity.publicTitle },
  { label: "Employer", value: identity.employer },
  { label: "Since", value: "15 July 2024" },
  {
    label: "Based in",
    value: `${identity.locality}, ${identity.region}, ${identity.country}`,
  },
];

export default function HomePage() {
  return (
    <>
      <StructuredData data={profilePageSchema("/")} />
      <SectionIndex items={sectionIndex} />

      {/* ================================================================ Hero

          Two columns on a wide screen: the identity on the left, the working
          shape running live on the right. On a phone the instrument sits under
          the name rather than being shrunk into unreadability.
          ================================================================== */}
      <section
        data-register="console"
        aria-label="Introduction"
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <div className="grid items-center gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:pb-28 lg:pt-24">
            <div>
              <p
                className="rise t-key text-orch"
                style={{ ["--rise-delay" as string]: "40ms" }}
              >
                {home.categoryLine}
              </p>

              <h1
                className="rise t-hero mt-6 text-console-ink"
                style={{ ["--rise-delay" as string]: "120ms" }}
              >
                Vidit
                <br />
                Pujara
              </h1>

              <p
                className="rise t-display mt-6 max-w-[24ch] text-orch"
                style={{
                  ["--rise-delay" as string]: "200ms",
                  fontSize: "clamp(1.25rem, 3.2vw, 1.9rem)",
                }}
              >
                {home.title}
              </p>

              <p
                className="rise t-lead measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "280ms" }}
              >
                {home.positioning}
              </p>

              <div
                className="rise mt-9 flex flex-wrap gap-3"
                style={{ ["--rise-delay" as string]: "360ms" }}
              >
                <Action href="/case-studies" variant="primary">
                  Read the case studies
                </Action>
                <Action href="/contact">Contact</Action>
              </div>
            </div>

            <div
              className="rise"
              style={{ ["--rise-delay" as string]: "440ms" }}
            >
              <div className="border border-line bg-console/60 p-5 md:p-7">
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <Key tone="muted">Working shape</Key>
                  <Key tone="orch">Fig. 00</Key>
                </div>
                <div className="pt-6">
                  <HeroInstrument />
                </div>
              </div>
            </div>
          </div>

          {/* specification strip */}
          <div
            className="rise grid gap-x-10 gap-y-6 pb-14 pt-2 sm:grid-cols-2 lg:grid-cols-4"
            style={{ ["--rise-delay" as string]: "520ms" }}
          >
            <dl className="contents">
              {specRows.map((row) => (
                <div key={row.label} className="border-t border-line pt-4">
                  <dt className="t-key text-console-dim">{row.label}</dt>
                  <dd className="t-data mt-2 text-console-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Shell>
      </section>

      {/* ========================================================= Positioning */}
      <Seam enters="record" />
      <Record id="positioning" tight>
        <Shell>
          <SectionHead
            index="01"
            eyebrow={home.positioningEyebrow}
            title={home.positioningStatement}
            register="record"
            wide
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14">
            {home.positioningBody.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                className="t-lead text-record-muted"
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Shell>
      </Record>

      {/* ======================================================= Working shape */}
      <Seam enters="console" />
      <Console id="shape" grid tight>
        <Shell>
          <SectionHead
            index="02"
            eyebrow="Architecture"
            title="Every integration on this site has the same spine"
            intro={figWorkingShape.caption}
            action={<MoreLink href="/case-studies">All four flows</MoreLink>}
            wide
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <Pipeline figure={figWorkingShape} />
            <div className="lg:pt-10">
              <Key tone="muted">Signal legend</Key>
              <dl className="mt-5">
                {[
                  {
                    tone: "var(--color-source)",
                    term: "Source",
                    detail: "Inbound systems, files, events and REST calls",
                  },
                  {
                    tone: "var(--color-process)",
                    term: "In flight",
                    detail: "Staging, comparison and transformation",
                  },
                  {
                    tone: "var(--color-orch)",
                    term: "Orchestration",
                    detail: "The Oracle Integration Cloud layer",
                  },
                  {
                    tone: "var(--color-verify)",
                    term: "Technique",
                    detail: "BI Publisher, validation and classification",
                  },
                  {
                    tone: "var(--color-target)",
                    term: "Oracle Fusion",
                    detail: "HCM and Financials, the destination",
                  },
                  {
                    tone: "var(--color-fault)",
                    term: "Reconciliation",
                    detail: "Errors and return paths",
                  },
                ].map((item, index) => (
                  <div
                    key={item.term}
                    className="flex items-start gap-3 border-t border-line py-3"
                    data-reveal="idle"
                    style={{ ["--reveal-delay" as string]: `${index * 50}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] block size-[9px] shrink-0 rotate-45"
                      style={{ backgroundColor: item.tone }}
                    />
                    <div>
                      <dt className="t-data text-console-ink">{item.term}</dt>
                      <dd className="t-small text-console-muted">
                        {item.detail}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
              <Note className="mt-6">
                The same six signals are used in every figure on this site, and
                nothing uses them against that meaning.
              </Note>
            </div>
          </div>
        </Shell>
      </Console>

      {/* ====================================================== Delivery record */}
      <Seam enters="record" />
      <Record id="record" tight>
        <Shell>
          <SectionHead
            index="03"
            eyebrow="Record"
            title={home.deliveryRecordHeading}
            intro="Figures are approximate where they were counted rather than measured, and are published as ranges when that is the honest form."
            register="record"
            action={<MoreLink href="/experience" register="record">Full record</MoreLink>}
            wide
          />
          <div className="mt-10">
            <MetricGrid metrics={homeMetrics} columns={3} />
          </div>
          <Note register="record" className="mt-8">
            Manual expense report creation and manual employee bank account
            creation were each eliminated for one automated workflow. Volumes
            relate to the runs described in the case studies and are not claimed
            for every integration.
          </Note>
        </Shell>
      </Record>

      {/* ========================================================= Capabilities */}
      <Seam enters="console" />
      <Console id="capabilities" tight>
        <Shell>
          <SectionHead
            index="04"
            eyebrow={home.capabilitiesEyebrow}
            title={home.capabilitiesHeading}
            intro={home.capabilitiesIntro}
            action={<MoreLink href="/skills">Skills in depth</MoreLink>}
          />
          <ul className="mt-12">
            {home.capabilities.map((capability, index) => {
              const meta = capabilityMeta[index];
              return (
                <CapabilityRow
                  key={capability.title}
                  keyLabel={meta?.keyLabel ?? capability.index}
                  title={capability.title}
                  body={capability.body}
                  tone={meta?.tone ?? "oic"}
                />
              );
            })}
          </ul>
        </Shell>
      </Console>

      {/* ========================================================= Case studies */}
      <Seam enters="record" />
      <Record id="case-studies" tight>
        <Shell>
          <SectionHead
            index="05"
            eyebrow={home.caseStudiesEyebrow}
            title={home.caseStudiesHeading}
            intro={home.caseStudiesIntro}
            register="record"
            action={
              <MoreLink href="/case-studies" register="record">
                All case studies
              </MoreLink>
            }
            wide
          />
          <ul className="mt-10">
            {caseStudies.map((study) => (
              <CaseStudyRow key={study.slug} study={study} register="record" />
            ))}
          </ul>
        </Shell>
      </Record>

      {/* =========================================================== Experience */}
      <Seam enters="console" />
      <Console id="experience" grid tight>
        <Shell>
          <SectionHead
            index="06"
            eyebrow={home.experienceEyebrow}
            title={home.experienceHeading}
            intro={home.experienceBody}
            action={<MoreLink href="/experience">Delivery detail</MoreLink>}
            wide
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div>
              <Key tone="muted">Delivery context</Key>
              <ul className="mt-5">
                {home.experiencePoints.map((point, index) => (
                  <li
                    key={point}
                    className="t-body flex gap-4 border-t border-line py-4 text-console-muted"
                    data-reveal="idle"
                    style={{ ["--reveal-delay" as string]: `${index * 60}ms` }}
                  >
                    <span aria-hidden="true" className="t-data text-orch">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <dl className="mt-8">
                <DataRow label="Employer" value={identity.employer} />
                <DataRow label="Period" value={experience.period} />
                <DataRow label="Role" value={experience.designation} />
              </dl>
            </div>
            <div data-reveal="idle">
              <EnvironmentTrack />
            </div>
          </div>
        </Shell>
      </Console>

      {/* ============================================================= Projects */}
      <Seam enters="record" />
      <Record id="projects" tight>
        <Shell>
          <SectionHead
            index="07"
            eyebrow={home.projectsEyebrow}
            title={home.projectsHeading}
            intro={home.projectsIntro}
            register="record"
            action={
              <MoreLink href="/projects" register="record">
                All projects
              </MoreLink>
            }
            wide
          />
          <ul className="mt-10">
            {featuredProjects.map((project) => (
              <ProjectRow
                key={project.slug}
                project={project}
                register="record"
              />
            ))}
          </ul>
        </Shell>
      </Record>

      {/* ============================================================ Direction */}
      <Seam enters="console" />
      <Console id="direction" tight>
        <Shell>
          <SectionHead
            index="08"
            eyebrow={home.directionEyebrow}
            title={home.directionHeading}
            intro={home.directionIntro}
            wide
          />
          <div className="mt-12">
            <DirectionTimeline />
          </div>
        </Shell>
      </Console>

      {/* ============================================================== Contact */}
      <Seam enters="record" />
      <Record id="contact">
        <Shell>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <Key tone="muted" className="!text-record-muted">
                {home.contactEyebrow}
              </Key>
              <h2
                className="t-display mt-5 max-w-[24ch] text-record-ink"
                data-reveal="idle"
              >
                {home.contactHeading}
              </h2>
              <p
                className="t-lead measure mt-5 text-record-muted"
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: "80ms" }}
              >
                {home.contactBody}
              </p>
            </div>
            <div
              className="flex flex-wrap gap-3 lg:justify-end"
              data-reveal="idle"
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >
              <a
                href={`mailto:${identity.email}`}
                className="action action-primary"
              >
                Email {identity.email}
              </a>
              <Action href="/resume">View résumé</Action>
            </div>
          </div>
        </Shell>
      </Record>
    </>
  );
}
