import type { Metadata } from "next";
import Image from "next/image";
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
import { about } from "@/content/pages";
import { identity, portrait } from "@/content/site";
import { breadcrumbSchema, pageMetadata, profilePageSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Vidit Pujara, Oracle ERP Technical Consultant at Mastek since July 2024. The route from a computer science background into Oracle Integration Cloud delivery, and the direction it is moving in.",
  path: "/about",
  type: "profile",
  keywords: ["Oracle ERP consultant profile", "OIC developer background"],
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={[
          profilePageSchema("/about"),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      {/* ============================================================== Header */}
      <section
        data-register="console"
        aria-label="About Vidit Pujara"
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <div className="grid items-end gap-12 pb-14 pt-14 md:pt-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:pb-20">
            <div>
              <p className="rise t-key text-orch">{about.eyebrow}</p>
              <h1
                className="rise t-display mt-6 max-w-[20ch] text-console-ink"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                {about.title}
              </h1>
              <p
                className="rise t-lead measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "160ms" }}
              >
                {about.intro}
              </p>
              <dl
                className="rise mt-10 max-w-xl"
                style={{ ["--rise-delay" as string]: "240ms" }}
              >
                {about.facts.map((fact) => (
                  <DataRow
                    key={fact.label}
                    label={fact.label}
                    value={fact.value}
                  />
                ))}
              </dl>
            </div>

            <figure
              className="rise"
              style={{ ["--rise-delay" as string]: "320ms" }}
            >
              <div className="relative border border-line-strong bg-console p-2">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  priority
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="h-auto w-full"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-px -right-px size-4 border-b border-r border-orch"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-px -top-px size-4 border-l border-t border-orch"
                />
              </div>
              <figcaption className="t-data mt-4 text-console-dim">
                {portrait.caption}
              </figcaption>
            </figure>
          </div>
        </Shell>
      </section>

      {/* ============================================================ Narrative */}
      <Seam enters="record" />
      <Record id="narrative" tight>
        <Shell>
          <SectionHead
            index="01"
            eyebrow="Route in"
            title="How the work got here"
            register="record"
            wide
          />

          <blockquote
            className="mt-12 border-l-2 pl-6 md:pl-8"
            style={{ borderColor: "var(--color-orch-ink)" }}
            data-reveal="idle"
          >
            <p className="t-display max-w-[34ch] text-record-ink">
              {about.pullQuote}
            </p>
          </blockquote>

          <ol className="mt-14">
            {about.narrative.map((item, index) => (
              <li
                key={item.index}
                className="grid gap-x-10 gap-y-3 border-t border-rule py-8 lg:grid-cols-[5rem_1fr_1fr]"
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: `${(index % 3) * 70}ms` }}
              >
                <span className="t-data text-orch-ink">{item.index}</span>
                <h3 className="t-title max-w-[24ch] text-record-ink">
                  {item.title}
                </h3>
                <p className="t-body text-record-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </Shell>
      </Record>

      {/* =========================================================== Principles */}
      <Seam enters="console" />
      <Console id="principles" tight>
        <Shell>
          <SectionHead
            index="02"
            eyebrow="Method"
            title={about.principlesHeading}
            intro={about.principlesIntro}
            wide
          />
          <ul className="mt-12 grid gap-px bg-line md:grid-cols-3">
            {about.principles.map((principle, index) => (
              <li
                key={principle.title}
                className="bg-console p-7"
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}
              >
                <Key tone="verify">{String(index + 1).padStart(2, "0")}</Key>
                <h3 className="t-title mt-4 text-console-ink">
                  {principle.title}
                </h3>
                <p className="t-small mt-3 text-console-muted">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
          <Note className="mt-8">{identity.confidentialityLine}</Note>
          <div className="mt-10 flex flex-wrap gap-3">
            <Action href="/experience" variant="primary">
              Delivery record
            </Action>
            <Action href="/case-studies">Case studies</Action>
          </div>
        </Shell>
      </Console>
    </>
  );
}
