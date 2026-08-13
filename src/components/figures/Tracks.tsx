import {
  figCareerDirection,
  figEnvironmentProgression,
} from "@/content/figures";

/**
 * Environment progression.
 *
 * Four stations on one track, drawn left to right on wide screens and top to
 * bottom on a phone. The track is a rule that draws itself on reveal, so the
 * promotion path reads as movement without needing a script.
 */
export function EnvironmentTrack() {
  const fig = figEnvironmentProgression;

  return (
    <figure aria-labelledby={`${fig.id}-label`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-strong pb-3">
        <div className="flex items-baseline gap-4">
          <span className="t-key text-orch">{fig.number}</span>
          <h3 id={`${fig.id}-label`} className="t-key text-console-muted">
            {fig.label}
          </h3>
        </div>
      </div>

      <div className="relative mt-8">
        <div
          aria-hidden="true"
          data-draw="idle"
          className="absolute left-0 right-0 top-[6px] hidden h-px origin-left bg-line-strong md:block"
          style={{ ["--reveal-delay" as string]: "80ms" }}
        />
        <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
          {fig.stages.map((stage, index) => (
            <li
              key={stage.index}
              className="relative pl-6 md:pl-0"
              data-reveal="idle"
              style={{ ["--reveal-delay" as string]: `${index * 90}ms` }}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-[6px] size-[11px] rotate-45 border md:relative md:left-auto md:top-auto md:block"
                style={{
                  borderColor:
                    index === fig.stages.length - 1
                      ? "var(--color-target)"
                      : "var(--color-orch)",
                  backgroundColor:
                    index === fig.stages.length - 1
                      ? "var(--color-target)"
                      : "var(--color-orch)",
                }}
              />
              <p className="t-title mt-0 text-console-ink md:mt-5">
                {stage.name}
              </p>
              <p className="t-data mt-1 text-console-muted">{stage.stage}</p>
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="t-data mt-8 max-w-[70ch] text-console-dim">
        {fig.caption}
        <span className="sr-only"> {fig.alt.join(" ")}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Career direction.
 *
 * The third panel is deliberately drawn as an open, dashed frame with a
 * "Direction" flag, because it is a stated direction supported by study in
 * progress and not a current title. The design carries that distinction so the
 * copy does not have to repeat it in every sentence.
 */
export function DirectionTimeline() {
  const fig = figCareerDirection;

  return (
    <figure aria-labelledby={`${fig.id}-label`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line-strong pb-3">
        <div className="flex items-baseline gap-4">
          <span className="t-key text-orch">{fig.number}</span>
          <h3 id={`${fig.id}-label`} className="t-key text-console-muted">
            {fig.label}
          </h3>
        </div>
      </div>

      <ol className="mt-8 grid gap-px bg-line md:grid-cols-3">
        {fig.stages.map((stage, index) => (
          <li
            key={stage.index}
            className={`relative bg-console p-6 md:p-7 ${
              stage.isDirection ? "" : ""
            }`}
            data-reveal="idle"
            style={{ ["--reveal-delay" as string]: `${index * 110}ms` }}
          >
            {stage.isDirection ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-2 border border-dashed border-orch/45"
              />
            ) : null}
            <div className="relative flex items-baseline justify-between gap-4">
              <span
                className={`t-key ${stage.isDirection ? "text-orch" : "text-verify"}`}
              >
                {stage.heading}
              </span>
              <span className="t-data text-console-dim">{stage.period}</span>
            </div>
            <p className="t-small relative mt-4 text-console-muted">
              {stage.body}
            </p>
          </li>
        ))}
      </ol>

      <figcaption className="t-data mt-6 max-w-[70ch] text-console-dim">
        {fig.caption}
      </figcaption>
    </figure>
  );
}

/**
 * Compact stage strip used on index rows. Shows the shape of a flow in one
 * line: how many stages, and which tones it moves through. The row that owns
 * it animates it on hover, which is why the tick marks are class driven.
 */
export function StageStrip({
  tones,
  label,
}: {
  tones: readonly string[];
  label: string;
}) {
  const toneVar: Record<string, string> = {
    source: "var(--color-source-ink)",
    process: "var(--color-process-ink)",
    oic: "var(--color-orch-ink)",
    support: "var(--color-verify-ink)",
    target: "var(--color-record-ink)",
    error: "var(--color-fault-ink)",
  };

  return (
    <div className="flex items-center gap-1.5" aria-hidden="true" title={label}>
      {tones.map((tone, index) => (
        <span
          key={`${tone}-${index}`}
          className="block h-[10px] w-[3px] origin-bottom transition-transform duration-300 ease-out group-hover:scale-y-[1.55]"
          style={{
            backgroundColor: toneVar[tone] ?? "var(--color-record-muted)",
            transitionDelay: `${index * 38}ms`,
          }}
        />
      ))}
    </div>
  );
}
