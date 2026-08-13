import type { Metadata } from "next";
import {
  Action,
  Console,
  Key,
  Note,
  Record,
  Seam,
  SectionHead,
  Shell,
} from "@/components/primitives/register";
import { CaseStudyRow } from "@/components/sections/rows";
import { StructuredData } from "@/components/ui/StructuredData";
import { caseStudies, caseStudiesIntro } from "@/content/case-studies";
import { breadcrumbSchema, itemListSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case studies",
  description:
    "Four Oracle Integration Cloud integrations built at Mastek, written up as architecture and technique. Client, vendor, project and system names are omitted throughout.",
  path: "/case-studies",
  keywords: [
    "Oracle Integration Cloud case study",
    "HDL integration",
    "FBDI integration",
    "Oracle Fusion REST API integration",
  ],
});

export default function CaseStudiesPage() {
  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies" },
          ]),
          itemListSchema({
            path: "/case-studies",
            name: "Enterprise case studies",
            items: caseStudies.map((study) => ({
              name: study.title,
              path: `/case-studies/${study.slug}`,
            })),
          }),
        ]}
      />

      <section
        data-register="console"
        aria-label="Case studies"
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <div className="grid gap-12 pb-14 pt-14 md:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:pb-20">
            <div>
              <p className="rise t-key text-orch">{caseStudiesIntro.eyebrow}</p>
              <h1
                className="rise t-display mt-6 max-w-[18ch] text-console-ink"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                {caseStudiesIntro.title}
              </h1>
              <p
                className="rise t-lead measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "160ms" }}
              >
                {caseStudiesIntro.intro}
              </p>
            </div>
            <div
              className="rise self-end border border-line bg-console p-6"
              style={{ ["--rise-delay" as string]: "240ms" }}
            >
              <Key tone="fault">Confidentiality</Key>
              <p className="t-small mt-4 text-console-muted">
                {caseStudiesIntro.confidentiality}
              </p>
            </div>
          </div>
        </Shell>
      </section>

      <Seam enters="record" />
      <Record id="studies">
        <Shell>
          <SectionHead
            index="01"
            eyebrow="Index"
            title="Four integrations, four flows"
            intro="Each write up covers the business problem, the role, the sequence the integration runs in, and the figure that shows it. The strip beside each number is the shape of that flow."
            register="record"
            wide
          />
          <ul className="mt-10">
            {caseStudies.map((study) => (
              <CaseStudyRow key={study.slug} study={study} register="record" />
            ))}
          </ul>
          <Note register="record" className="mt-10">
            {caseStudiesIntro.confidentiality}
          </Note>
        </Shell>
      </Record>

      <Seam enters="console" />
      <Console id="next" tight>
        <Shell>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="t-section max-w-[26ch]">
              Supporting integration work is summarised on the experience page.
            </p>
            <div className="flex flex-wrap gap-3">
              <Action href="/experience" variant="primary">
                Delivery record
              </Action>
              <Action href="/contact">Contact</Action>
            </div>
          </div>
        </Shell>
      </Console>
    </>
  );
}
