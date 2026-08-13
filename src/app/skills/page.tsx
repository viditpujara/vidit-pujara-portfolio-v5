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
import { StructuredData } from "@/components/ui/StructuredData";
import { skills } from "@/content/pages";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Skills",
  description:
    "Oracle Integration Cloud, Oracle Fusion HCM and Financials, BI Publisher, HDL, FBDI, REST and SOAP, Oracle SQL and engineering skills, grouped by depth of use rather than scored as percentages.",
  path: "/skills",
  keywords: [
    "Oracle Integration Cloud skills",
    "BI Publisher",
    "HDL",
    "FBDI",
    "Oracle SQL",
    "Java",
  ],
});

const bandTone: Record<string, string> = {
  primary: "var(--color-orch)",
  secondary: "var(--color-source)",
  tertiary: "var(--color-verify)",
};

const bandToneInk: Record<string, string> = {
  primary: "var(--color-orch-ink)",
  secondary: "var(--color-source-ink)",
  tertiary: "var(--color-verify-ink)",
};

export default function SkillsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Skills", path: "/skills" },
        ])}
      />

      <section
        data-register="console"
        aria-label="Skills"
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <div className="grid gap-12 pb-14 pt-14 md:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:pb-20">
            <div>
              <p className="rise t-key text-orch">{skills.eyebrow}</p>
              <h1
                className="rise t-display mt-6 max-w-[18ch] text-console-ink"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                {skills.title}
              </h1>
              <p
                className="rise t-lead measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "160ms" }}
              >
                {skills.intro}
              </p>
            </div>
            <ul
              className="rise self-end"
              style={{ ["--rise-delay" as string]: "240ms" }}
            >
              {skills.bands.map((band) => (
                <li
                  key={band.index}
                  className="flex items-baseline gap-4 border-t border-line py-3"
                >
                  <span
                    aria-hidden="true"
                    className="block size-[9px] shrink-0 rotate-45"
                    style={{ backgroundColor: bandTone[band.emphasis] }}
                  />
                  <span className="t-data text-console-ink">{band.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </section>

      {/* ================================================================ Bands */}
      {skills.bands.map((band, bandIndex) => {
        const onConsole = bandIndex % 2 === 1;
        const Section = onConsole ? Console : Record;
        const accent = onConsole
          ? bandTone[band.emphasis]
          : bandToneInk[band.emphasis];

        return (
          <div key={band.index}>
            <Seam enters={onConsole ? "console" : "record"} />
            <Section id={`band-${band.index}`} tight>
              <Shell>
                <SectionHead
                  index={band.index}
                  eyebrow={
                    band.emphasis === "primary"
                      ? "Live delivery"
                      : band.emphasis === "secondary"
                        ? "Trained"
                        : "Learning in progress"
                  }
                  title={band.title}
                  intro={band.intro}
                  register={onConsole ? "console" : "record"}
                  wide
                />
                <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
                  {band.groups.map((group, groupIndex) => (
                    <section
                      key={group.title}
                      data-reveal="idle"
                      style={{
                        ["--reveal-delay" as string]: `${groupIndex * 70}ms`,
                      }}
                    >
                      <h3
                        className={`t-key border-t-2 pt-4 ${onConsole ? "text-console-ink" : "text-record-ink"}`}
                        style={{ borderColor: accent }}
                      >
                        {group.title}
                      </h3>
                      <ul className="mt-3">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className={`t-data border-b py-2.5 ${
                              onConsole
                                ? "border-line text-console-muted"
                                : "border-rule text-record-muted"
                            }`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
                {band.emphasis === "tertiary" ? (
                  <Note
                    register={onConsole ? "console" : "record"}
                    className="mt-10"
                  >
                    Everything in this band is study in progress. It is not
                    presented as delivery experience, and no proficiency score is
                    published anywhere on this site.
                  </Note>
                ) : null}
              </Shell>
            </Section>
          </div>
        );
      })}

      <Seam enters="console" />
      <Console id="next" tight>
        <Shell>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="t-section max-w-[28ch]">
              The delivery work behind the first band is written up in full.
            </p>
            <div className="flex flex-wrap gap-3">
              <Action href="/case-studies" variant="primary">
                Case studies
              </Action>
              <Action href="/credentials">Credentials</Action>
            </div>
          </div>
        </Shell>
      </Console>
    </>
  );
}
