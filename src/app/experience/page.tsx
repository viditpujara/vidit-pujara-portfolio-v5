import type { Metadata } from "next";
import { MetricGrid, RangeGraph } from "@/components/figures/Numbers";
import { EnvironmentTrack } from "@/components/figures/Tracks";
import { SectionIndex } from "@/components/layout/SectionIndex";
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
} from "@/components/primitives/register";
import { StructuredData } from "@/components/ui/StructuredData";
import { caseStudyConfidentialityNote } from "@/content/case-studies";
import {
  deliveryMetrics,
  graphCoverage,
  graphDeliveryScope,
  graphPopulations,
  graphProcessingVolume,
} from "@/content/metrics";
import { experience } from "@/content/pages";
import { identity } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "Consultant I at Mastek since July 2024, delivering Oracle Fusion integrations, multi-client OIC production support and Oracle ADF application support.",
  path: "/experience",
  keywords: [
    "Oracle Integration Cloud delivery",
    "Oracle Fusion HCM integrations",
    "Oracle Fusion Financials integrations",
    "BI Publisher reports",
  ],
});

const sectionIndex = [
  { id: "role", label: "The role" },
  { id: "record", label: "In numbers" },
  { id: "graphs", label: "Evidence" },
  { id: "environments", label: "Environments" },
  { id: "additional", label: "Supporting work" },
];

export default function ExperiencePage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ])}
      />
      <SectionIndex items={sectionIndex} />

      <section
        data-register="console"
        aria-label="Experience"
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <div className="grid gap-12 pb-14 pt-14 md:pt-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pb-20">
            <div>
              <p className="rise t-key text-orch">{experience.eyebrow}</p>
              <h1
                className="rise t-display mt-6 max-w-[22ch] text-console-ink"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                {experience.title}
              </h1>
              <p
                className="rise t-lead measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "160ms" }}
              >
                {experience.intro}
              </p>
            </div>
            <dl
              className="rise self-end"
              style={{ ["--rise-delay" as string]: "240ms" }}
            >
              <DataRow label="Employer" value={experience.company} />
              <DataRow label="Role" value={experience.designation} />
              <DataRow label="Period" value={experience.period} />
              <DataRow label="Start" value={experience.startNote} />
              <DataRow
                label="Based in"
                value={`${identity.locality}, ${identity.country}`}
              />
            </dl>
          </div>
        </Shell>
      </section>

      {/* ================================================================ Role */}
      <Seam enters="record" />
      <Record id="role" tight>
        <Shell>
          <SectionHead
            index="01"
            eyebrow="Scope"
            title="What the role covers"
            intro={experience.body}
            register="record"
            wide
          />
          <div className="mt-12 grid gap-px bg-rule md:grid-cols-2">
            {experience.categories.map((category, index) => (
              <div
                key={category.title}
                className="bg-paper p-7 md:p-8"
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: `${(index % 2) * 80}ms` }}
              >
                <Key tone="muted" className="!text-orch-ink">
                  {String(index + 1).padStart(2, "0")}
                </Key>
                <h3 className="t-title mt-4 text-record-ink">
                  {category.title}
                </h3>
                <ul className="mt-5">
                  {category.points.map((point) => (
                    <li
                      key={point}
                      className="t-small flex gap-3 border-t border-rule py-3 text-record-muted"
                    >
                      <span aria-hidden="true" className="mt-[9px] block size-[6px] shrink-0 rotate-45 bg-orch-ink/70" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 space-y-2">
            {experience.scopeNote.map((note) => (
              <Note key={note} register="record">
                {note}
              </Note>
            ))}
            <Note register="record">{caseStudyConfidentialityNote}</Note>
          </div>
        </Shell>
      </Record>

      {/* ============================================================== Numbers */}
      <Seam enters="console" />
      <Console id="record" grid tight>
        <Shell>
          <SectionHead
            index="02"
            eyebrow={experience.recordEyebrow}
            title={experience.recordHeading}
            intro={experience.recordIntro}
            wide
          />
          <div
            className="mt-12 border border-line bg-paper p-6 md:p-10"
            data-register="record"
          >
            <MetricGrid metrics={deliveryMetrics} columns={3} />
          </div>
        </Shell>
      </Console>

      {/* =============================================================== Graphs */}
      <Seam enters="record" />
      <Record id="graphs" tight>
        <Shell>
          <SectionHead
            index="03"
            eyebrow="Evidence"
            title="The same figures, drawn"
            intro="Each bar is drawn to the stated value. Counts marked with a plus sign are lower bounds, and approximate volumes are labelled as approximate, so no bar reads as a measured total."
            register="record"
            wide
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-x-16">
            <RangeGraph graph={graphDeliveryScope} />
            <RangeGraph graph={graphProcessingVolume} />
            <RangeGraph graph={graphCoverage} />
            <RangeGraph graph={graphPopulations} />
          </div>
        </Shell>
      </Record>

      {/* ========================================================= Environments */}
      <Seam enters="console" />
      <Console id="environments" tight>
        <Shell>
          <SectionHead
            index="04"
            eyebrow="Promotion"
            title="Work is promoted through four environments"
            wide
          />
          <div className="mt-12">
            <EnvironmentTrack />
          </div>
        </Shell>
      </Console>

      {/* ====================================================== Supporting work */}
      <Seam enters="record" />
      <Record id="additional">
        <Shell>
          <SectionHead
            index="05"
            eyebrow={experience.additionalEyebrow}
            title={experience.additionalHeading}
            intro={experience.additionalIntro}
            register="record"
            wide
          />
          <ul className="mt-12">
            {experience.additional.map((item, index) => (
              <li
                key={item.title}
                className="grid gap-x-10 gap-y-2 border-t border-rule py-7 lg:grid-cols-[1fr_1.4fr]"
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: `${(index % 3) * 70}ms` }}
              >
                <h3 className="t-title max-w-[24ch] text-record-ink">
                  {item.title}
                </h3>
                <p className="t-body text-record-muted">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <Action href="/case-studies" variant="primary">
              Read the case studies
            </Action>
            <Action href="/skills">Skills in depth</Action>
          </div>
        </Shell>
      </Record>
    </>
  );
}
