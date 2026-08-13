"use client";

import { useEffect, useState } from "react";
import type { DeliveryMetric } from "@/content/metrics";
import { useInView, useReducedMotion } from "@/components/ui/useInView";

/* ============================================================ Animated value */

const NUMBER = /\d[\d,]*/g;

/**
 * Counts the numeric tokens inside a published figure while leaving the rest of
 * the string exactly as written.
 *
 * This matters for accuracy, not decoration. Several figures on this site are
 * ranges, and a range must stay a range: "20 to 25" animates as two numbers
 * with the word between them untouched, and "DEV to PROD" contains no numbers
 * so it never animates at all. Nothing is rounded, and the final frame is
 * always the exact published string.
 */
function AnimatedValue({
  value,
  active,
  duration = 900,
}: {
  value: string;
  active: boolean;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  // Mounting the counter only while it should run keeps every setState inside
  // a requestAnimationFrame callback, and means the published string is what
  // renders whenever the figure is not animating.
  if (!active || reduced) return <>{value}</>;
  return <CountingValue value={value} duration={duration} />;
}

function CountingValue({
  value,
  duration,
}: {
  value: string;
  duration: number;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Quintic ease out, the same curve the CSS uses.
      setProgress(1 - Math.pow(1 - t, 5));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration]);

  if (progress >= 1) return <>{value}</>;

  const rendered = value.replace(NUMBER, (match) => {
    const target = Number(match.replace(/,/g, ""));
    return Math.round(target * progress).toLocaleString("en-US");
  });

  return <>{rendered}</>;
}

/* =============================================================== Metric grid */

/**
 * Delivery figures. On the paper register on purpose: numbers are the record,
 * so they are set as a document rather than as glowing console tiles.
 */
export function MetricGrid({
  metrics,
  columns = 3,
}: {
  metrics: DeliveryMetric[];
  columns?: 2 | 3;
}) {
  const { ref, inView } = useInView<HTMLDListElement>(0.2);

  return (
    <dl
      ref={ref}
      className={`grid gap-x-8 gap-y-0 sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : ""
      }`}
    >
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="border-t border-rule py-6"
          data-reveal="idle"
          style={{ ["--reveal-delay" as string]: `${index * 55}ms` }}
        >
          <dd className="t-figure text-record-ink">
            <AnimatedValue value={metric.value} active={inView} />
          </dd>
          <dt className="t-body mt-3 max-w-[34ch] font-medium text-record-ink">
            {metric.label}
          </dt>
          <p className="t-data mt-1.5 max-w-[36ch] text-record-muted">
            {metric.note}
          </p>
        </div>
      ))}
    </dl>
  );
}

/* ================================================================ Range graph */

type RangeRow = { label: string; min: number; max: number; display: string };
type ValueRow = { label: string; value: number; display: string };

type GraphData = {
  id: string;
  title: string;
  caption: string;
  axisMax: number;
  unit: string;
  rows: readonly (RangeRow | ValueRow)[];
  summary: string;
};

function isRange(row: RangeRow | ValueRow): row is RangeRow {
  return "min" in row;
}

/**
 * Quantitative evidence, drawn.
 *
 * Ranges are drawn as a span between two ends rather than as a bar to the
 * upper bound, because the underlying figure is approximate and a solid bar to
 * 25 would read as a measured 25. The published display string is the visible
 * value; the bars are aria hidden, so a screen reader gets the numbers and the
 * summary rather than a description of a rectangle.
 */
export function RangeGraph({
  graph,
  register = "record",
}: {
  graph: GraphData;
  register?: "console" | "record";
}) {
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const onConsole = register === "console";
  const line = onConsole ? "border-line" : "border-rule";
  const ink = onConsole ? "text-console-ink" : "text-record-ink";
  const muted = onConsole ? "text-console-muted" : "text-record-muted";
  const dim = onConsole ? "text-console-dim" : "text-record-muted";

  return (
    <figure ref={ref} className={`border-t ${line} pt-5`} id={graph.id}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className={`t-key ${onConsole ? "text-orch" : "text-orch-ink"}`}>
          {graph.title}
        </h3>
        <span className={`t-data ${dim}`}>
          0 to {graph.axisMax.toLocaleString("en-US")} {graph.unit}
        </span>
      </div>

      <dl className="mt-5 space-y-5">
        {graph.rows.map((row, index) => {
          const left = isRange(row) ? (row.min / graph.axisMax) * 100 : 0;
          const right = isRange(row)
            ? (row.max / graph.axisMax) * 100
            : (row.value / graph.axisMax) * 100;

          return (
            <div key={row.label}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5">
                <dt className={`t-small max-w-[46ch] ${muted}`}>{row.label}</dt>
                <dd className={`t-data font-medium ${ink}`}>{row.display}</dd>
              </div>
              <div
                aria-hidden="true"
                className={`mt-2 h-[7px] w-full border-b ${line} relative`}
              >
                <span
                  className="absolute bottom-0 top-0 origin-left transition-transform duration-[900ms] ease-out"
                  style={{
                    left: `${left}%`,
                    width: `${Math.max(right - left, 1.5)}%`,
                    transform: `scaleX(${inView ? 1 : 0})`,
                    transitionDelay: `${index * 110}ms`,
                    backgroundColor: isRange(row)
                      ? "var(--color-orch)"
                      : onConsole
                        ? "var(--color-verify)"
                        : "var(--color-verify-ink)",
                    opacity: isRange(row) ? 0.9 : 0.85,
                  }}
                />
                {isRange(row) ? (
                  <>
                    <span
                      className="absolute bottom-[-3px] top-[-3px] w-px"
                      style={{ left: `${left}%`, backgroundColor: "var(--color-orch)" }}
                    />
                    <span
                      className="absolute bottom-[-3px] top-[-3px] w-px"
                      style={{ left: `${right}%`, backgroundColor: "var(--color-orch)" }}
                    />
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
      </dl>

      <figcaption className={`t-data mt-5 max-w-[70ch] ${dim}`}>
        {graph.caption}
        <span className="sr-only"> {graph.summary}</span>
      </figcaption>
    </figure>
  );
}
