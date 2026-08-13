import type { Metadata } from "next";
import {
  Action,
  Console,
  Key,
  Note,
  OutLink,
  Record,
  Seam,
  SectionHead,
  Shell,
} from "@/components/primitives/register";
import { CredentialRow } from "@/components/sections/rows";
import { StructuredData } from "@/components/ui/StructuredData";
import { credentials } from "@/content/pages";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Credentials",
  description:
    "Certifications and education, including Oracle APEX Cloud Certified Developer Professional and Microsoft fundamentals certifications. Credentials readable on the issuer's own verification page are marked verified.",
  path: "/credentials",
  keywords: [
    "Oracle APEX Cloud Certified Developer Professional",
    "Azure Fundamentals",
    "Power Platform Fundamentals",
    "B.Tech Computer Science",
  ],
});

export default function CredentialsPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Credentials", path: "/credentials" },
        ])}
      />

      <section
        data-register="console"
        aria-label="Credentials"
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <div className="grid gap-12 pb-14 pt-14 md:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:pb-20">
            <div>
              <p className="rise t-key text-orch">{credentials.eyebrow}</p>
              <h1
                className="rise t-display mt-6 max-w-[18ch] text-console-ink"
                style={{ ["--rise-delay" as string]: "80ms" }}
              >
                {credentials.title}
              </h1>
              <p
                className="rise t-lead measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "160ms" }}
              >
                {credentials.intro}
              </p>
            </div>
            <div
              className="rise self-end border border-line bg-console p-6"
              style={{ ["--rise-delay" as string]: "240ms" }}
            >
              <Key tone="verify">Verification</Key>
              <p className="t-small mt-4 text-console-muted">
                {credentials.maintenanceBody}
              </p>
            </div>
          </div>
        </Shell>
      </section>

      <Seam enters="record" />
      <Record id="certifications" tight>
        <Shell>
          <SectionHead
            index="01"
            eyebrow="Certifications"
            title={credentials.certificationsHeading}
            register="record"
            wide
          />
          <ul className="mt-10">
            {credentials.certifications.map((item) => (
              <CredentialRow
                key={item.name}
                issuer={item.issuer}
                name={item.name}
                issued={item.issued}
                status={item.status}
                link={"link" in item ? item.link : undefined}
                note={"note" in item ? item.note : undefined}
              />
            ))}
          </ul>
        </Shell>
      </Record>

      <Seam enters="console" />
      <Console id="education" tight>
        <Shell>
          <SectionHead
            index="02"
            eyebrow="Education"
            title={credentials.educationHeading}
            wide
          />
          <ol className="mt-10">
            {credentials.education.map((item, index) => (
              <li
                key={item.qualification}
                className="grid gap-x-10 gap-y-2 border-t border-line py-7 lg:grid-cols-[1.2fr_1fr_1fr]"
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
              >
                <h3 className="t-title text-console-ink">
                  {item.qualification}
                </h3>
                <p className="t-data text-console-muted">{item.institution}</p>
                <div className="lg:text-right">
                  <p className="t-data text-console-muted">{item.period}</p>
                  {item.note ? (
                    <p className="t-data mt-1 text-console-dim">{item.note}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </Shell>
      </Console>

      <Seam enters="record" />
      <Record id="coursework">
        <Shell>
          <SectionHead
            index="03"
            eyebrow="Coursework"
            title={credentials.courseworkHeading}
            intro={credentials.courseworkIntro}
            register="record"
            wide
          />
          <ul className="mt-10">
            {credentials.coursework.map((item, index) => (
              <li
                key={item.name}
                className="grid gap-x-10 gap-y-2 border-t border-rule py-5 lg:grid-cols-[1.4fr_1fr_10rem] lg:items-baseline"
                data-reveal="idle"
                style={{ ["--reveal-delay" as string]: `${(index % 3) * 60}ms` }}
              >
                <p className="t-body text-record-ink">{item.name}</p>
                <p className="t-data text-record-muted">{item.issuer}</p>
                <div className="lg:text-right">
                  {"url" in item && item.url ? (
                    <OutLink href={item.url} register="record" className="t-data">
                      Verify
                    </OutLink>
                  ) : (
                    <span className="t-data text-record-muted">
                      {item.status}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Note register="record" className="mt-10">
            {credentials.maintenanceHeading}. {credentials.maintenanceBody}
          </Note>
          <div className="mt-10 flex flex-wrap gap-3">
            <Action href="/resume" variant="primary">
              View résumé
            </Action>
            <Action href="/contact">Contact</Action>
          </div>
        </Shell>
      </Record>
    </>
  );
}
