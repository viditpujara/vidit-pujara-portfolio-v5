import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ============================================================ Shell and band */

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`shell ${className}`}>{children}</div>;
}

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  tight?: boolean;
  grid?: boolean;
  label?: string;
};

/**
 * The console register. Deep petrol, engraved lattice, mono labels. Used for
 * anything about systems in motion.
 */
export function Console({
  children,
  id,
  className = "",
  tight = false,
  grid = false,
  label,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      data-register="console"
      data-section={id}
      className={`relative bg-console text-console-ink ${className}`}
    >
      {grid ? (
        <div
          aria-hidden="true"
          className="console-grid console-grid-fade pointer-events-none absolute inset-0"
        />
      ) : null}
      <div className={`relative ${tight ? "band-tight" : "band"}`}>
        {children}
      </div>
    </section>
  );
}

/**
 * The record register. Cool paper, ink type, wider measure. Used for anything
 * that makes a claim: prose, numbers, credentials.
 */
export function Record({
  children,
  id,
  className = "",
  tight = false,
  label,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      data-register="record"
      data-section={id}
      className={`relative bg-paper text-record-ink ${className}`}
    >
      <div className={tight ? "band-tight" : "band"}>{children}</div>
    </section>
  );
}

/**
 * The seam.
 *
 * A register change is a junction, not a gap. This is the hairline that marks
 * it: tick marks across the full width and one mono label naming the surface
 * being entered. It carries no information the page needs, which is why it is
 * hidden from assistive technology, but it stops the alternation between the
 * two registers reading as an accident.
 */
export function Seam({ enters }: { enters: "console" | "record" }) {
  const onConsole = enters === "console";
  return (
    <div
      aria-hidden="true"
      data-register={enters}
      className={onConsole ? "bg-console" : "bg-paper"}
    >
      <Shell>
        <div className="flex items-center gap-4 pt-8">
          <span
            className={`seam-ticks h-px flex-1 ${onConsole ? "text-console-dim/50" : "text-record-muted/40"}`}
          />
          <span
            className={`t-key whitespace-nowrap ${onConsole ? "text-console-dim" : "text-record-muted/70"}`}
          >
            {onConsole ? "Console" : "Record"}
          </span>
        </div>
      </Shell>
    </div>
  );
}

/* ==================================================================== Labels */

export function Key({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: "muted" | "orch" | "verify" | "fault" | "source" | "ink";
  className?: string;
}) {
  const tones: Record<string, string> = {
    muted: "text-console-muted",
    orch: "text-orch",
    verify: "text-verify",
    fault: "text-fault",
    source: "text-source",
    ink: "text-console-ink",
  };
  return (
    <span className={`t-key ${tones[tone]} ${className}`}>{children}</span>
  );
}

/** Section header. The index is real: sections are numbered in reading order. */
export function SectionHead({
  index,
  eyebrow,
  title,
  intro,
  register = "console",
  action,
  wide = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  register?: "console" | "record";
  action?: ReactNode;
  wide?: boolean;
}) {
  const onConsole = register === "console";
  return (
    <header className="relative">
      <div
        className="flex items-baseline gap-4"
        data-reveal="idle"
      >
        <span
          className={`t-key ${onConsole ? "text-orch" : "text-orch-ink"}`}
        >
          {index}
        </span>
        <span
          className={`t-key ${onConsole ? "text-console-muted" : "text-record-muted"}`}
        >
          {eyebrow}
        </span>
      </div>
      <div
        aria-hidden="true"
        data-draw="idle"
        className={`mt-4 h-px w-full origin-left ${onConsole ? "bg-line-strong" : "bg-rule-strong"}`}
      />
      <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2
          className={`t-section ${wide ? "max-w-[22ch]" : "max-w-[18ch]"}`}
          data-reveal="idle"
          style={{ ["--reveal-delay" as string]: "60ms" }}
        >
          {title}
        </h2>
        {action ? (
          <div
            data-reveal="idle"
            style={{ ["--reveal-delay" as string]: "120ms" }}
            className="shrink-0"
          >
            {action}
          </div>
        ) : null}
      </div>
      {intro ? (
        <p
          className={`t-lead measure mt-6 ${onConsole ? "text-console-muted" : "text-record-muted"}`}
          data-reveal="idle"
          style={{ ["--reveal-delay" as string]: "140ms" }}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}

/* =================================================================== Actions */

type ActionProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "ghost";
};

export function Action({
  variant = "ghost",
  className = "",
  children,
  ...rest
}: ActionProps) {
  return (
    <Link
      {...rest}
      className={`action ${variant === "primary" ? "action-primary" : "action-ghost"} ${className}`}
    >
      {children}
    </Link>
  );
}

/** A quiet forward link with a mono arrow that slides on hover. */
export function MoreLink({
  href,
  children,
  register = "console",
}: {
  href: string;
  children: ReactNode;
  register?: "console" | "record";
}) {
  return (
    <Link
      href={href}
      className={`t-key group inline-flex min-h-[28px] items-center gap-2 py-1 ${
        register === "console"
          ? "text-console-ink hover:text-orch"
          : "text-record-ink hover:text-orch-ink"
      }`}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 ease-out group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}

/** External link. Always states where it goes. */
export function OutLink({
  href,
  children,
  register = "console",
  className = "",
}: {
  href: string;
  children: ReactNode;
  register?: "console" | "record";
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`link inline-block min-h-[26px] py-[3px] ${register === "console" ? "text-console-ink" : "text-record-ink"} ${className}`}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/* ==================================================================== Notes */

/**
 * Small print. Every approximate figure, confidentiality boundary and
 * verification caveat on this site is set here rather than being dropped from
 * the page, which is why the component exists at all.
 */
export function Note({
  children,
  register = "console",
  className = "",
}: {
  children: ReactNode;
  register?: "console" | "record";
  className?: string;
}) {
  return (
    <p
      className={`t-data max-w-[78ch] ${
        register === "console" ? "text-console-dim" : "text-record-muted"
      } ${className}`}
    >
      {children}
    </p>
  );
}

/** Data pair used in specification strips and fact tables. */
export function DataRow({
  label,
  value,
  register = "console",
}: {
  label: string;
  value: ReactNode;
  register?: "console" | "record";
}) {
  const onConsole = register === "console";
  return (
    <div
      className={`flex items-baseline justify-between gap-6 border-b py-3 ${
        onConsole ? "border-line" : "border-rule"
      }`}
    >
      <dt className={`t-key ${onConsole ? "text-console-dim" : "text-record-muted"}`}>
        {label}
      </dt>
      <dd
        className={`t-data text-right ${onConsole ? "text-console-ink" : "text-record-ink"}`}
      >
        {value}
      </dd>
    </div>
  );
}

/** Technology tag. No proficiency score, by instruction and by judgement. */
export function Tag({
  children,
  register = "console",
}: {
  children: ReactNode;
  register?: "console" | "record";
}) {
  return (
    <li
      className={`t-data rounded-xs border px-2.5 py-1 ${
        register === "console"
          ? "border-line text-console-muted"
          : "border-rule text-record-muted"
      }`}
    >
      {children}
    </li>
  );
}

export function TagList({
  items,
  register = "console",
  className = "",
}: {
  items: readonly string[];
  register?: "console" | "record";
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <Tag key={item} register={register}>
          {item}
        </Tag>
      ))}
    </ul>
  );
}
