import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Pipeline } from "@/components/figures/Pipeline";
import {
  Action,
  Console,
  DataRow,
  Key,
  Note,
  Record,
  Seam,
  SectionHead,
  Shell,
  TagList,
} from "@/components/primitives/register";
import { StructuredData } from "@/components/ui/StructuredData";
import {
  caseStudies,
  caseStudyConfidentialityNote,
  getCaseStudy,
  getNextCaseStudy,
} from "@/content/case-studies";
import { identity } from "@/content/site";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };

  return pageMetadata({
    title: study.title,
    description: study.metaDescription,
    path: `/case-studies/${study.slug}`,
    type: "article",
    keywords: study.technologies.slice(0, 8),
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const next = getNextCaseStudy(study.slug);

  return (
    <>
      <StructuredData
        data={[
          articleSchema({
            path: `/case-studies/${study.slug}`,
            headline: study.title,
            description: study.metaDescription,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies" },
            { name: study.title, path: `/case-studies/${study.slug}` },
          ]),
        ]}
      />

      {/* ============================================================== Header */}
      <section
        data-register="console"
        aria-label={study.title}
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <nav aria-label="Breadcrumb" className="pt-10">
            <ol className="t-data flex flex-wrap items-center gap-2 text-console-dim">
              <li>
                <Link href="/" className="link inline-block min-h-[26px] py-[3px] text-console-dim">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/case-studies" className="link inline-block min-h-[26px] py-[3px] text-console-dim">
                  Case studies
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-console-muted">
                {study.number}
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 pb-14 pt-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pb-20">
            <div>
              <div className="rise flex items-baseline gap-4">
                <span className="t-figure text-orch" style={{ fontSize: "2rem" }}>
                  {study.number}
                </span>
                <Key tone="muted">{study.domain}</Key>
              </div>
              <h1
                className="rise t-display mt-6 max-w-[24ch] text-console-ink"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                {study.title}
              </h1>
              <p
                className="rise t-lead measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "160ms" }}
              >
                {study.summary}
              </p>
            </div>
            <dl
              className="rise self-end"
              style={{ ["--rise-delay" as string]: "240ms" }}
            >
              <DataRow label="Domain" value={study.domain} />
              <DataRow label="Employer" value={identity.employer} />
              <DataRow label="Stages" value={`${study.figure.stages.length}`} />
              <DataRow
                label="Technologies"
                value={`${study.technologies.length}`}
              />
            </dl>
          </div>
        </Shell>
      </section>

      {/* ==================================================== Problem and role */}
      <Seam enters="record" />
      <Record id="problem" tight>
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <SectionHead
                index="01"
                eyebrow="Problem"
                title="What had to be solved"
                register="record"
                wide
              />
              <p className="t-lead measure mt-8 text-record-muted" data-reveal="idle">
                {study.problem}
              </p>
            </div>
            <div className="lg:pt-2" data-reveal="idle">
              <div className="border-t-2 border-orch-ink pt-6">
                <Key tone="muted" className="!text-orch-ink">
                  My role
                </Key>
                <p className="t-body mt-4 text-record-ink">{study.role}</p>
              </div>
              <Note register="record" className="mt-8">
                {caseStudyConfidentialityNote}
              </Note>
            </div>
          </div>
        </Shell>
      </Record>

      {/* ============================================================ Sequence */}
      <Seam enters="console" />
      <Console id="sequence" grid tight>
        <Shell>
          <SectionHead
            index="02"
            eyebrow="Sequence"
            title="How the integration runs"
            intro="The stages below run in order. The figure that follows shows the same run as a flow, including where records leave the path before Oracle Fusion is touched."
            wide
          />

          <ol className="mt-12">
            {study.approach.map((step, index) => (
              <li
                key={step.index}
                className="grid gap-x-10 gap-y-2 border-t border-line py-7 lg:grid-cols-[5rem_1fr_1.4fr]"
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: `${(index % 3) * 70}ms` }}
              >
                <span className="t-data text-orch">{step.index}</span>
                <h3 className="t-title max-w-[22ch] text-console-ink">
                  {step.title}
                </h3>
                <p className="t-body text-console-muted">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-16 border border-line bg-console p-6 md:p-10">
            <Pipeline figure={study.figure} />
          </div>
        </Shell>
      </Console>

      {/* ============================================================= Outcome */}
      <Seam enters="record" />
      <Record id="outcome">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <SectionHead
                index="03"
                eyebrow="Outcome"
                title="What it changed"
                register="record"
                wide
              />
              <ul className="mt-8">
                {study.outcome.map((item, index) => (
                  <li
                    key={item}
                    className="t-body flex gap-4 border-t border-rule py-4 text-record-muted"
                    data-reveal="idle"
                    style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[10px] block size-[7px] shrink-0 rotate-45"
                      style={{ backgroundColor: "var(--color-verify-ink)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-2" data-reveal="idle">
              <Key tone="muted" className="!text-record-muted">
                Technologies
              </Key>
              <TagList
                items={study.technologies}
                register="record"
                className="mt-5"
              />
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-rule pt-8 md:flex-row md:items-center md:justify-between">
            <div>
              <Key tone="muted" className="!text-record-muted">
                Next case study
              </Key>
              <p className="t-title mt-3 max-w-[28ch] text-record-ink">
                {next.number}. {next.title}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Action href={`/case-studies/${next.slug}`} variant="primary">
                Read {next.number}
              </Action>
              <Action href="/case-studies">All case studies</Action>
            </div>
          </div>
        </Shell>
      </Record>
    </>
  );
}
