"use client";

import { useEffect, useRef, useState } from "react";
import type { FlowFigureData, FlowTone } from "@/content/figures";
import { useInView, useReducedMotion } from "@/components/ui/useInView";

/**
 * The signature component of Version 5.
 *
 * An integration is a sequence of stages with labelled transitions, branches
 * that leave the path before the target is touched, and a return path for
 * failures. This renders exactly that, from the same typed figure data the
 * previous versions used, and it does three things none of them did:
 *
 *   1. a packet of data visibly travels the path, one stage at a time
 *   2. branches and return paths are drawn as departures from the spine
 *   3. the reader can replay, step and read the whole thing as text
 *
 * All stage text is present in the DOM at all times. The animation controls
 * arrival, never access. With reduced motion requested every stage is lit on
 * first paint and the travelling packet is removed.
 */

const toneColor: Record<FlowTone, string> = {
  source: "var(--color-source)",
  process: "var(--color-process)",
  oic: "var(--color-orch)",
  support: "var(--color-verify)",
  target: "var(--color-target)",
  error: "var(--color-fault)",
};

const toneLabel: Record<FlowTone, string> = {
  source: "Source",
  process: "In flight",
  oic: "Orchestration",
  support: "Technique",
  target: "Oracle Fusion",
  error: "Reconciliation",
};

const STEP_MS = 340;

export function Pipeline({
  figure,
  className = "",
}: {
  figure: FlowFigureData;
  className?: string;
}) {
  const total = figure.stages.length;
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.18);
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    // Reduced motion is derived below rather than written into state here, so
    // no render is ever triggered synchronously from this effect.
    if (reduced || !inView) return;

    let current = 0;
    timer.current = window.setInterval(() => {
      current += 1;
      setActive(current);
      if (current >= total && timer.current) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
    }, STEP_MS);

    return () => {
      if (timer.current) window.clearInterval(timer.current);
      timer.current = null;
    };
  }, [inView, reduced, total, run]);

  const stopTimer = () => {
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  };

  // Every stage is lit immediately when reduced motion is requested.
  const shown = reduced ? total : active;
  const complete = shown >= total;

  return (
    <figure
      ref={ref}
      className={`relative ${className}`}
      aria-labelledby={`${figure.id}-label`}
    >
      {/* -------------------------------------------------- figure header */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b border-line-strong pb-3">
        <div className="flex items-baseline gap-4">
          <span className="t-key text-orch">{figure.number}</span>
          <h3 id={`${figure.id}-label`} className="t-key text-console-muted">
            {figure.label}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="t-data text-console-dim"
            aria-live="off"
          >
            {Math.min(shown, total)}/{total}
          </span>
          <button
            type="button"
            onClick={() => {
              stopTimer();
              setActive((value) => (value >= total ? total : value + 1));
            }}
            className="t-key rounded-xs border border-line px-2.5 py-1.5 text-console-muted transition-colors hover:border-orch hover:text-orch"
          >
            Step
          </button>
          <button
            type="button"
            onClick={() => {
              stopTimer();
              if (reduced) {
                setActive(total);
                return;
              }
              setActive(0);
              setRun((value) => value + 1);
            }}
            className="t-key rounded-xs border border-line px-2.5 py-1.5 text-console-muted transition-colors hover:border-orch hover:text-orch"
          >
            Replay
          </button>
        </div>
      </div>

      {/* --------------------------------------------------- the flow spine */}
      <ol className="group/flow mt-2" data-complete={complete ? "" : undefined}>
        {figure.stages.map((stage, index) => {
          const state =
            index < shown - 1 ? "past" : index === shown - 1 ? "arriving" : "ahead";
          const lit = index < shown;
          const branch = figure.branches?.find(
            (item) => item.afterStage === index + 1,
          );
          const isLast = index === total - 1;

          return (
            <li key={stage.index} data-state={state}>
              <div className="grid grid-cols-[34px_1fr] gap-x-3 sm:grid-cols-[52px_1fr] sm:gap-x-5">
                {/* node column */}
                <div className="relative flex flex-col items-center">
                  <span
                    aria-hidden="true"
                    className="relative mt-[7px] block size-[13px] shrink-0 rotate-45 border transition-all duration-300"
                    style={{
                      borderColor: lit ? toneColor[stage.tone] : "var(--color-line-strong)",
                      backgroundColor: lit
                        ? toneColor[stage.tone]
                        : "transparent",
                      boxShadow: lit
                        ? `0 0 0 4px color-mix(in srgb, ${toneColor[stage.tone]} 16%, transparent)`
                        : "none",
                      animation:
                        state === "arriving" && !reduced
                          ? "node-arrive 420ms var(--ease-out-quint) both"
                          : undefined,
                    }}
                  />
                  {state === "arriving" && !reduced ? (
                    <span
                      aria-hidden="true"
                      data-packet
                      className="pointer-events-none absolute top-[7px] block size-[13px] rotate-45 rounded-[1px]"
                      style={{
                        border: `1px solid ${toneColor[stage.tone]}`,
                        animation: "pulse-ring 700ms var(--ease-out-quint) both",
                      }}
                    />
                  ) : null}

                  {/* connector to the next stage */}
                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className="relative mt-1 w-px flex-1 overflow-hidden"
                      style={{
                        backgroundColor: "var(--color-line-strong)",
                      }}
                    >
                      <span
                        className="absolute inset-x-0 top-0 origin-top transition-transform duration-500 ease-out"
                        style={{
                          height: "100%",
                          transform: `scaleY(${index < shown - 1 ? 1 : 0})`,
                          backgroundColor: toneColor[stage.tone],
                          opacity: 0.75,
                        }}
                      />
                      {state === "arriving" && !reduced ? (
                        <span
                          data-packet
                          className="absolute left-1/2 top-0 block h-4 w-[3px] -translate-x-1/2 rounded-full"
                          style={{
                            backgroundColor: toneColor[stage.tone],
                            animation:
                              "packet-fall 340ms linear both",
                            ["--fall" as string]: "100%",
                          }}
                        />
                      ) : null}
                    </span>
                  ) : null}
                </div>

                {/* content column */}
                <div
                  className="pb-8 transition-opacity duration-500"
                  style={{ opacity: lit ? 1 : 0.68 }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="t-data text-console-dim">{stage.index}</span>
                    <h4 className="t-title text-console-ink">{stage.title}</h4>
                    <span
                      className="t-key"
                      style={{ color: toneColor[stage.tone] }}
                    >
                      {toneLabel[stage.tone]}
                    </span>
                  </div>
                  <p className="t-small measure mt-1.5 text-console-muted">
                    {stage.detail}
                  </p>

                  {stage.connector && !isLast ? (
                    <p className="t-data mt-3 flex items-center gap-2 text-console-dim">
                      <span aria-hidden="true">&darr;</span>
                      <span>{stage.connector}</span>
                    </p>
                  ) : null}

                  {branch ? (
                    <div
                      className="mt-4 border-l border-dashed pl-4 transition-opacity duration-500 sm:pl-5"
                      style={{
                        borderColor:
                          branch.kind === "exit"
                            ? "var(--color-verify)"
                            : "var(--color-target)",
                        opacity: lit ? 1 : 0.55,
                      }}
                    >
                      <p
                        className="t-key"
                        style={{
                          color:
                            branch.kind === "exit"
                              ? "var(--color-verify)"
                              : "var(--color-target)",
                        }}
                      >
                        {branch.kind === "exit" ? "Exit path" : "Routes"}
                        <span className="sr-only">: </span>
                      </p>
                      <p className="t-small mt-1 text-console-muted">
                        {branch.label}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {branch.items.map((item) => (
                          <li
                            key={item.title}
                            className="t-data rounded-xs border px-2.5 py-1.5"
                            style={{
                              borderColor: `color-mix(in srgb, ${toneColor[item.tone]} 45%, transparent)`,
                              color: toneColor[item.tone],
                            }}
                          >
                            {item.title}
                            {item.detail ? (
                              <span className="text-console-dim">
                                {" "}
                                {item.detail}
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* --------------------------------------------------- return path */}
      {figure.returnPath ? (
        <div
          className="mt-1 flex flex-col gap-2 border-t border-dashed pt-4 transition-opacity duration-500 sm:flex-row sm:items-baseline sm:gap-4"
          style={{
            borderColor: "color-mix(in srgb, var(--color-fault) 55%, transparent)",
            opacity: complete ? 1 : 0.35,
          }}
        >
          <span className="t-key text-fault">
            <span aria-hidden="true">&uarr; </span>
            {figure.returnPath.label}
          </span>
          <p className="t-small measure text-console-muted">
            {figure.returnPath.from} to {figure.returnPath.to}.{" "}
            {figure.returnPath.detail}.
          </p>
        </div>
      ) : null}

      {/* ------------------------------------------- caption and text form */}
      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="t-small text-console-muted">{figure.caption}</p>
        <details className="group mt-3">
          <summary className="t-key inline-flex min-h-[28px] cursor-pointer items-center gap-2 py-1 text-console-dim transition-colors hover:text-orch">
            <span
              aria-hidden="true"
              className="transition-transform group-open:rotate-90"
            >
              &rsaquo;
            </span>
            Read this figure as text
          </summary>
          <ol className="t-small mt-3 space-y-1.5 border-l border-line pl-4 text-console-muted">
            {figure.alt.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </details>
      </figcaption>
    </figure>
  );
}
