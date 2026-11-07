import type { Metadata } from "next";
import { PrintButton } from "@/components/ui/PrintButton";
import { Key, Note, Shell } from "@/components/primitives/register";
import { StructuredData } from "@/components/ui/StructuredData";
import { caseStudies } from "@/content/case-studies";
import { deliveryMetrics } from "@/content/metrics";
import { credentials, experience, resume, skills } from "@/content/pages";
import { projects } from "@/content/projects";
import { identity, resumeDownload } from "@/content/site";
import { breadcrumbSchema, pageMetadata, profilePageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Résumé",
  description:
    "Download Vidit Pujara’s Oracle Fusion and OIC résumé: integration delivery, BI Publisher, production support and verified certifications.",
  path: "/resume",
  type: "profile",
  keywords: ["Oracle Fusion consultant resume", "OIC developer CV"],
});

/** Print-friendly web résumé with a separately reviewed public PDF. */
export default function ResumePage() {
  const featuredProjects = projects.filter((project) =>
    ["triptogether", "sherbimet", "plezer-construction"].includes(project.slug),
  );

  return (
    <div
      data-register="record"
      data-print="page"
      className="bg-paper-high text-record-ink"
    >
      <StructuredData
        data={[
          profilePageSchema("/resume"),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Résumé", path: "/resume" },
          ]),
        ]}
      />

      <Shell className="max-w-[900px]">
        <div className="py-14 md:py-20">
          {/* ------------------------------------------------- print control */}
          <div
            data-print="hide"
            className="mb-12 border border-rule-strong p-5 md:p-6"
          >
            <Key tone="muted" className="!text-orch-ink">
              This page is the résumé
            </Key>
            <p className="t-small measure mt-3 text-record-muted">
              {resume.printNote}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={resumeDownload.href} download={resumeDownload.filename} className="action action-primary">
                Download résumé (PDF)
              </a>
              <PrintButton />
            </div>
          </div>

          {/* ------------------------------------------------------- masthead */}
          <header className="border-b-2 border-record-ink pb-6">
            <h1 className="t-display" style={{ fontVariationSettings: '"wdth" 88' }}>
              {identity.name}
            </h1>
            <p className="t-title mt-2 text-orch-ink">{identity.publicTitle}</p>
            <ul className="t-data mt-5 flex flex-wrap gap-x-5 gap-y-1 text-record-muted">
              <li>
                <a href={`mailto:${identity.email}`} className="link inline-block min-h-[26px] py-[3px]">
                  {identity.email}
                </a>
              </li>
              <li>
                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-block min-h-[26px] py-[3px]"
                >
                  linkedin.com/in/viditpujara
                </a>
              </li>
              <li>
                {identity.locality}, {identity.region}, {identity.country}
              </li>
            </ul>
          </header>

          {/* -------------------------------------------------------- summary */}
          <ResumeSection title="Summary">
            <p className="t-body">{resume.summary}</p>
          </ResumeSection>

          {/* ----------------------------------------------------- core skills */}
          <ResumeSection title="Core skills">
            <dl className="space-y-3">
              {resume.coreSkills.map((row) => (
                <div key={row.label} className="grid gap-1 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="t-key text-record-muted">{row.label}</dt>
                  <dd className="t-small">{row.value}</dd>
                </div>
              ))}
            </dl>
          </ResumeSection>

          {/* ------------------------------------------------------ experience */}
          <ResumeSection title="Experience">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6">
              <h3 className="t-title">
                {experience.designation}, {experience.company}
              </h3>
              <p className="t-data text-record-muted">{experience.period}</p>
            </div>
            <p className="t-small mt-3 text-record-muted">{experience.body}</p>
            <div className="mt-5 space-y-4">
              {experience.categories.map((category) => (
                <div key={category.title}>
                  <p className="t-key text-record-muted">{category.title}</p>
                  <ul className="mt-2 space-y-1">
                    {category.points.map((point) => (
                      <li key={point} className="t-small flex gap-2.5">
                        <span aria-hidden="true">&bull;</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="t-data mt-5 text-record-muted">
              {experience.scopeNote.join(" ")}
            </p>
          </ResumeSection>

          {/* --------------------------------------------------------- figures */}
          <ResumeSection title="Delivery in numbers">
            <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {deliveryMetrics.map((metric) => (
                <div key={metric.label} className="flex gap-3">
                  <dd className="t-data w-[5.5rem] shrink-0 font-medium">
                    {metric.value}
                  </dd>
                  <dt className="t-small text-record-muted">{metric.label}</dt>
                </div>
              ))}
            </dl>
            <p className="t-data mt-4 text-record-muted">{resume.metricsNote}</p>
          </ResumeSection>

          {/* ----------------------------------------------------- case studies */}
          <ResumeSection title="Selected enterprise integrations">
            <ul className="space-y-4">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                    <h3 className="t-body font-medium">{study.title}</h3>
                    <p className="t-data text-record-muted">{study.domain}</p>
                  </div>
                  <p className="t-small mt-1 text-record-muted">
                    {study.summary}
                  </p>
                </li>
              ))}
            </ul>
            <p className="t-data mt-4 text-record-muted">
              {identity.confidentialityLine}
            </p>
          </ResumeSection>

          {/* -------------------------------------------------------- projects */}
          <ResumeSection title="Projects">
            <ul className="space-y-3">
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                    <h3 className="t-body font-medium">
                      {project.name}
                      <span className="t-data text-record-muted">
                        {" "}
                        {project.ownership}
                      </span>
                    </h3>
                    <p className="t-data text-record-muted">{project.kicker}</p>
                  </div>
                  <p className="t-small mt-1 text-record-muted">
                    {project.tagline}. {project.ownershipNote}
                  </p>
                </li>
              ))}
            </ul>
          </ResumeSection>

          {/* ---------------------------------------------------------- skills */}
          <ResumeSection title="Additional skills">
            {skills.bands.slice(1).map((band) => (
              <div key={band.index} className="mb-3">
                <p className="t-key text-record-muted">{band.title}</p>
                <p className="t-small mt-1">
                  {band.groups
                    .map((group) => `${group.title}: ${group.items.join(", ")}`)
                    .join(". ")}
                </p>
              </div>
            ))}
          </ResumeSection>

          {/* -------------------------------------------------- certifications */}
          <ResumeSection title="Certifications">
            <ul className="space-y-2">
              {credentials.certifications.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-6"
                >
                  <p className="t-small">
                    {item.name}
                    <span className="text-record-muted"> {item.issuer}</span>
                  </p>
                  <p className="t-data text-record-muted">
                    {item.issued || item.status}
                  </p>
                </li>
              ))}
            </ul>
          </ResumeSection>

          {/* ------------------------------------------------------- education */}
          <ResumeSection title="Education">
            <ul className="space-y-2">
              {credentials.education.map((item) => (
                <li
                  key={item.qualification}
                  className="flex flex-wrap items-baseline justify-between gap-x-6"
                >
                  <p className="t-small">
                    {item.qualification}
                    <span className="text-record-muted">
                      {" "}
                      {item.institution}
                    </span>
                    {item.note ? (
                      <span className="text-record-muted"> {item.note}</span>
                    ) : null}
                  </p>
                  <p className="t-data text-record-muted">{item.period}</p>
                </li>
              ))}
            </ul>
          </ResumeSection>

          <Note register="record" className="mt-12 border-t border-rule pt-6">
            Every figure on this résumé is published in the form it was verified
            in. Ranges stay ranges, and no phone number is published on this
            site.
          </Note>
        </div>
      </Shell>
    </div>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 break-inside-avoid">
      <h2 className="t-key border-b border-rule-strong pb-2 text-record-muted">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
