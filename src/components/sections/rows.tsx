import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import type { Project } from "@/content/projects";
import { StageStrip } from "@/components/figures/Tracks";
import { Key, OutLink, TagList } from "@/components/primitives/register";

/* ============================================================= Case study row */

/**
 * A case study index row.
 *
 * Full width, ruled, and it carries a compact stage strip showing the shape of
 * the flow: how many stages the integration has and which signal tones it moves
 * through. Hovering the row raises the strip, so the preview is a property of
 * the work rather than an unrelated hover effect.
 */
export function CaseStudyRow({
  study,
  register = "record",
}: {
  study: CaseStudy;
  register?: "console" | "record";
}) {
  const onConsole = register === "console";
  const tones = study.figure.stages.map((stage) => stage.tone);

  return (
    <li
      className={`border-t ${onConsole ? "border-line" : "border-rule"}`}
      data-reveal="idle"
    >
      <Link href={`/case-studies/${study.slug}`} className="row-link group py-8">
        <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[7rem_1fr_15rem] lg:items-start">
          <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
            <span
              className={`t-figure ${onConsole ? "text-console-dim" : "text-record-muted"}`}
              style={{ fontSize: "1.6rem" }}
            >
              {study.number}
            </span>
            <StageStrip
              tones={tones}
              label={`${tones.length} stage flow`}
            />
          </div>

          <div>
            <h3
              className={`t-title transition-colors ${
                onConsole
                  ? "text-console-ink group-hover:text-orch"
                  : "text-record-ink group-hover:text-orch-ink"
              }`}
            >
              {study.title}
            </h3>
            <p
              className={`t-small measure mt-2.5 ${onConsole ? "text-console-muted" : "text-record-muted"}`}
            >
              {study.summary}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <Key tone="muted" className={onConsole ? "" : "!text-record-muted"}>
              {study.domain}
            </Key>
            <span
              className={`t-key inline-flex items-center gap-2 ${
                onConsole ? "text-orch" : "text-orch-ink"
              }`}
            >
              Read the case study
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

/* ================================================================ Project row */

export function ProjectRow({
  project,
  register = "record",
}: {
  project: Project;
  register?: "console" | "record";
}) {
  const onConsole = register === "console";

  return (
    <li
      className={`border-t ${onConsole ? "border-line" : "border-rule"}`}
      data-reveal="idle"
    >
      <Link href={`/projects/${project.slug}`} className="row-link group py-8">
        <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[1fr_16rem] lg:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3
                className={`t-title transition-colors ${
                  onConsole
                    ? "text-console-ink group-hover:text-orch"
                    : "text-record-ink group-hover:text-orch-ink"
                }`}
              >
                {project.name}
              </h3>
              <span
                className="t-key rounded-xs border px-2 py-1"
                style={{
                  borderColor:
                    project.ownership === "Solo"
                      ? onConsole
                        ? "color-mix(in srgb, var(--color-verify) 55%, transparent)"
                        : "color-mix(in srgb, var(--color-verify-ink) 45%, transparent)"
                      : onConsole
                        ? "var(--color-line-strong)"
                        : "var(--color-rule-strong)",
                  color:
                    project.ownership === "Solo"
                      ? onConsole
                        ? "var(--color-verify)"
                        : "var(--color-verify-ink)"
                      : onConsole
                        ? "var(--color-console-muted)"
                        : "var(--color-record-muted)",
                }}
              >
                {project.ownership}
              </span>
            </div>
            <p
              className={`t-small measure mt-2.5 ${onConsole ? "text-console-muted" : "text-record-muted"}`}
            >
              {project.tagline}. {project.summary}
            </p>
            <TagList
              items={project.cardStack}
              register={register}
              className="mt-4"
            />
          </div>

          <div className="flex flex-col gap-3 lg:items-end lg:text-right">
            <Key tone="muted" className={onConsole ? "" : "!text-record-muted"}>
              {project.kicker}
            </Key>
            <span
              className={`t-key inline-flex items-center gap-2 ${
                onConsole ? "text-orch" : "text-orch-ink"
              }`}
            >
              Open the write up
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

/* ============================================================== Capability row */

/**
 * Capabilities are categories, not a sequence, so they are keyed rather than
 * numbered. The key is the shorthand the work actually uses.
 */
export function CapabilityRow({
  keyLabel,
  title,
  body,
  tone,
}: {
  keyLabel: string;
  title: string;
  body: string;
  tone: "source" | "process" | "oic" | "support" | "target" | "error";
}) {
  const color: Record<string, string> = {
    source: "var(--color-source)",
    process: "var(--color-process)",
    oic: "var(--color-orch)",
    support: "var(--color-verify)",
    target: "var(--color-target)",
    error: "var(--color-fault)",
  };

  return (
    <li
      className="group relative border-t border-line py-7 transition-colors"
      data-reveal="idle"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ backgroundColor: color[tone] }}
      />
      <div className="grid gap-x-8 gap-y-3 md:grid-cols-[9rem_1fr]">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="block size-[9px] rotate-45 transition-transform duration-300 group-hover:scale-125"
            style={{ backgroundColor: color[tone] }}
          />
          <span className="t-key" style={{ color: color[tone] }}>
            {keyLabel}
          </span>
        </div>
        <div>
          <h3 className="t-title text-console-ink">{title}</h3>
          <p className="t-small measure mt-2 text-console-muted">{body}</p>
        </div>
      </div>
    </li>
  );
}

/* ============================================================= Credential card */

export function CredentialRow({
  issuer,
  name,
  issued,
  status,
  link,
  note,
}: {
  issuer: string;
  name: string;
  issued?: string;
  status: string;
  link?: { label: string; url: string };
  note?: string;
}) {
  const verified = status === "Verified link";

  return (
    <li className="border-t border-rule py-6" data-reveal="idle">
      <div className="grid gap-x-8 gap-y-3 lg:grid-cols-[1fr_16rem] lg:items-start">
        <div>
          <p className="t-key text-record-muted">{issuer}</p>
          <h3 className="t-title mt-2 text-record-ink">{name}</h3>
          {issued ? (
            <p className="t-data mt-1.5 text-record-muted">{issued}</p>
          ) : null}
          {note ? (
            <p className="t-small measure mt-2 text-record-muted">{note}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-3 lg:justify-end">
          <span
            className="t-key rounded-xs border px-2 py-1"
            style={{
              borderColor: verified
                ? "color-mix(in srgb, var(--color-verify-ink) 45%, transparent)"
                : "var(--color-rule-strong)",
              color: verified
                ? "var(--color-verify-ink)"
                : "var(--color-record-muted)",
            }}
          >
            {status}
          </span>
          {link ? (
            <OutLink href={link.url} register="record" className="t-data">
              {link.label}
            </OutLink>
          ) : null}
        </div>
      </div>
    </li>
  );
}
