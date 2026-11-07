import type { Metadata } from "next";
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
import { CopyEmail } from "@/components/ui/CopyEmail";
import { StructuredData } from "@/components/ui/StructuredData";
import { contact } from "@/content/pages";
import { identity } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Vidit Pujara about Oracle Fusion and OIC roles. Based in Ahmedabad, with experience in integration delivery and production support.",
  path: "/contact",
  keywords: [
    "hire Oracle Integration Cloud consultant",
    "Oracle Fusion technical consultant Ahmedabad",
  ],
});

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section
        data-register="console"
        aria-label="Contact"
        className="relative overflow-hidden border-b border-line bg-abyss"
      >
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
        <Shell className="relative">
          <div className="grid gap-12 pb-14 pt-14 md:pt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:pb-20">
            <div>
              <p className="rise t-key text-orch">{contact.eyebrow}</p>
              <h1
                className="rise t-hero mt-6 text-console-ink"
                style={{
                  ["--rise-delay" as string]: "80ms",
                  fontSize: "clamp(2.4rem, 8vw, 5.2rem)",
                }}
              >
                {contact.title}
              </h1>
              <p
                className="rise t-lead measure mt-6 text-console-muted"
                style={{ ["--rise-delay" as string]: "160ms" }}
              >
                {contact.intro}. {contact.detailBody}
              </p>
              <div
                className="rise mt-9 flex flex-wrap items-center gap-3"
                style={{ ["--rise-delay" as string]: "240ms" }}
              >
                <a
                  href={`mailto:${identity.email}`}
                  className="action action-primary"
                >
                  Email {identity.email}
                </a>
                <CopyEmail email={identity.email} />
              </div>
            </div>

            <dl
              className="rise self-end"
              style={{ ["--rise-delay" as string]: "320ms" }}
            >
              <DataRow label="Email" value={identity.email} />
              <DataRow
                label="Phone"
                value={
                  <a
                    href={identity.phoneHref}
                    className="link inline-block min-h-[26px] py-[3px]"
                  >
                    {identity.phone}
                  </a>
                }
              />
              <DataRow
                label="Based in"
                value={`${identity.locality}, ${identity.region}, ${identity.country}`}
              />
              <DataRow label="Role" value={identity.publicTitle} />
              <DataRow label="Employer" value={identity.employer} />
            </dl>
          </div>
        </Shell>
      </section>

      {/* ============================================================ Channels */}
      <Seam enters="record" />
      <Record id="channels" tight>
        <Shell>
          <SectionHead
            index="01"
            eyebrow="Channels"
            title="Three ways through, and what each is best for"
            register="record"
            wide
          />
          <ul className="mt-10 grid gap-px bg-rule md:grid-cols-3">
            {contact.channels.map((channel, index) => {
              const href =
                channel.label === "Email"
                  ? `mailto:${identity.email}`
                  : channel.label === "LinkedIn"
                    ? identity.linkedin
                    : identity.github;
              const external = channel.label !== "Email";

              return (
                <li
                  key={channel.label}
                  className="bg-paper p-7"
                  data-reveal="idle"
                  style={{ ["--reveal-delay" as string]: `${index * 80}ms` }}
                >
                  <Key tone="muted" className="!text-orch-ink">
                    {String(index + 1).padStart(2, "0")}
                  </Key>
                  <h3 className="t-title mt-4 text-record-ink">
                    {channel.label}
                  </h3>
                  <p className="t-small mt-3 text-record-muted">
                    {channel.note}
                  </p>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="t-key mt-5 inline-flex min-h-[30px] items-center gap-2 py-1 text-orch-ink hover:underline"
                  >
                    {channel.label === "Email"
                      ? "Open a message"
                      : `Open ${channel.label}`}
                    <span aria-hidden="true">{external ? "\u2197" : "\u2192"}</span>
                    {external ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
          <Note register="record" className="mt-10">
            {contact.formNote}
          </Note>
        </Shell>
      </Record>

      {/* ======================================================= First message */}
      <Seam enters="console" />
      <Console id="first-message">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHead
                index="02"
                eyebrow="Useful detail"
                title={contact.firstMessageHeading}
                wide
              />
              <ul className="mt-8">
                {contact.firstMessage.map((item, index) => (
                  <li
                    key={item}
                    className="t-body flex gap-4 border-t border-line py-4 text-console-muted"
                    data-reveal="idle"
                    style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
                  >
                    <span aria-hidden="true" className="t-data text-orch">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pt-2">
              <div className="border border-line bg-console p-7" data-reveal="idle">
                <Key tone="fault">{contact.detailHeading}</Key>
                <p className="t-small mt-4 text-console-muted">
                  {contact.detailBody}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Action href="/resume" variant="primary">
                  View résumé
                </Action>
                <Action href="/case-studies">Case studies</Action>
              </div>
            </div>
          </div>
        </Shell>
      </Console>
    </>
  );
}
