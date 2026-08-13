"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/ui/useInView";

/**
 * The hero instrument.
 *
 * A single SVG holding the shape every integration on this site shares: source
 * systems on the left, Oracle Integration Cloud in the middle, Oracle Fusion on
 * the right, and a return path down to reconciliation. Packets of data run the
 * path continuously and slowly, which is the one piece of ambient motion on the
 * site.
 *
 * The whole graphic is a text alternative away from being static: it declares
 * role="img" with a full label, the same shape is published as Fig. 00 further
 * down the page in text form, and every packet is removed under reduced motion.
 */

/**
 * Right angle routing on purpose. The return path leaves the target on its
 * right, drops clear of every label row, then runs back along its own lane, so
 * no line can ever cross a word at any width.
 */
const DESCRIPTION =
  "Working shape. Source systems deliver files, events and REST calls to Oracle Integration Cloud, which validates, stages, compares and transforms them. Oracle Fusion HCM and Financials receive the result. Errors return on a separate path to reconciliation, where every failure is mapped back to the record that caused it.";

const MOBILE_STATIONS = [
  {
    title: "Source systems",
    sub: "Files, events, REST calls",
    color: "var(--color-source)",
  },
  {
    title: "Oracle Integration Cloud",
    sub: "Validate, stage, compare, transform",
    color: "var(--color-orch)",
  },
  {
    title: "Oracle Fusion",
    sub: "HCM and Financials",
    color: "var(--color-target)",
  },
];

const SPINE = "M 60 112 L 500 112";
const RETURN = "M 509 112 L 536 112 L 536 212 L 134 212";

export function HeroInstrument() {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement | null>(null);

  /**
   * Pointer parallax. Fine pointers only, one transform on one group, written
   * inside a requestAnimationFrame so it never runs more than once a frame.
   * Touch devices and reduced motion get nothing, which is correct rather than
   * degraded: the instrument is not a control.
   */
  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const layers = Array.from(
      host.querySelectorAll<SVGGElement>("[data-parallax]"),
    );
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const box = host.getBoundingClientRect();
        const dx = (event.clientX - (box.left + box.width / 2)) / box.width;
        const dy = (event.clientY - (box.top + box.height / 2)) / box.height;
        for (const layer of layers) {
          const depth = Number(layer.dataset.parallax ?? "1");
          layer.style.transform = `translate(${(dx * depth * 9).toFixed(2)}px, ${(dy * depth * 6).toFixed(2)}px)`;
        }
      });
    };

    const onLeave = () => {
      for (const layer of layers) layer.style.transform = "";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div ref={hostRef} className="w-full">
      {/* One text alternative for both visuals below. */}
      <p className="sr-only">{DESCRIPTION}</p>

      {/*
        Phones get a stacked version rather than a shrunken diagram. A 560 unit
        viewBox at 350px renders mono labels at about 8px, which is not a
        diagram, it is decoration. The stack keeps every label at a real reading
        size and carries the same falling packet motion.
      */}
      <ol aria-hidden="true" className="md:hidden">
        {MOBILE_STATIONS.map((station, index) => (
          <li key={station.title}>
            <div className="flex items-start gap-3">
              <span
                className="mt-[7px] block size-[11px] shrink-0 rotate-45"
                style={{ backgroundColor: station.color }}
              />
              <div>
                <p className="t-key" style={{ color: station.color }}>
                  {station.title}
                </p>
                <p className="t-data mt-1 text-console-muted">{station.sub}</p>
              </div>
            </div>
            {index < MOBILE_STATIONS.length - 1 ? (
              <div className="relative ml-[5px] h-8 w-px bg-line-strong">
                {!reduced ? (
                  <span
                    data-packet
                    className="absolute left-1/2 top-0 block h-3 w-[3px] -translate-x-1/2"
                    style={{
                      backgroundColor: station.color,
                      animation: `packet-fall 2.2s linear ${index * 0.5}s infinite`,
                      ["--fall" as string]: "32px",
                    }}
                  />
                ) : null}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="t-data mt-5 flex items-start gap-2 text-fault md:hidden" aria-hidden="true">
        <span>&uarr;</span>
        Errors return to reconciliation, mapped to the record that caused them
      </p>

      <svg
        viewBox="0 0 560 268"
        className="hidden h-auto w-full md:block"
        aria-hidden="true"
      >
        <defs>
          {/* userSpaceOnUse, because a horizontal path has a zero height
              bounding box and an objectBoundingBox gradient degenerates on it */}
          <linearGradient
            id="hero-spine"
            gradientUnits="userSpaceOnUse"
            x1="60"
            x2="500"
            y1="112"
            y2="112"
          >
            <stop offset="0%" stopColor="var(--color-source)" />
            <stop offset="48%" stopColor="var(--color-orch)" />
            <stop offset="100%" stopColor="var(--color-target)" />
          </linearGradient>
        </defs>

        {/* lattice, one layer behind the flow */}
        <g data-parallax="0.35" opacity="0.55">
          {[60, 280, 500].map((x) => (
            <line key={x} x1={x} x2={x} y1="20" y2="252" stroke="var(--color-line)" />
          ))}
          <line x1="0" x2="560" y1="112" y2="112" stroke="var(--color-line)" />
          <line x1="0" x2="560" y1="212" y2="212" stroke="var(--color-line)" />
        </g>

        <g data-parallax="1">
          <path d={SPINE} fill="none" stroke="url(#hero-spine)" strokeWidth="2" />
          <path
            d={RETURN}
            fill="none"
            stroke="var(--color-fault)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.85"
          />
          <polygon points="134,206 134,218 122,212" fill="var(--color-fault)" />

          {/* Source. Labelled below the spine. */}
          <Node x={60} y={112} size={18} color="var(--color-source)" />
          <text x={50} y={156} fill="var(--color-console-ink)" style={label(15)}>
            SOURCE SYSTEMS
          </text>
          <text x={50} y={174} fill="var(--color-console-dim)" style={sub(11.5)}>
            Files, events, REST calls
          </text>

          {/* Oracle Integration Cloud. Labelled above the spine. */}
          <Node x={280} y={112} size={34} color="var(--color-orch)" emphasis />
          <text
            x={280}
            y={58}
            textAnchor="middle"
            fill="var(--color-orch)"
            style={label(15)}
          >
            ORACLE INTEGRATION CLOUD
          </text>
          <text
            x={280}
            y={76}
            textAnchor="middle"
            fill="var(--color-console-dim)"
            style={sub(11.5)}
          >
            Validate, stage, compare, transform
          </text>

          {/* Oracle Fusion. Labelled below the spine, right aligned. */}
          <Node x={500} y={112} size={18} color="var(--color-target)" />
          <text
            x={512}
            y={156}
            textAnchor="end"
            fill="var(--color-console-ink)"
            style={label(15)}
          >
            ORACLE FUSION
          </text>
          <text
            x={512}
            y={174}
            textAnchor="end"
            fill="var(--color-console-dim)"
            style={sub(11.5)}
          >
            HCM and Financials
          </text>

          {/* Reconciliation, at the end of the return path. */}
          <Node x={100} y={212} size={14} color="var(--color-fault)" />
          <text x={82} y={242} fill="var(--color-fault)" style={label(13)}>
            RECONCILIATION
          </text>
          <text x={82} y={258} fill="var(--color-console-dim)" style={sub(11.5)}>
            Every failure mapped to its record
          </text>

          {!reduced ? (
            <>
              <Packet path={SPINE} color="var(--color-source)" delay="0s" duration="5.4s" />
              <Packet path={SPINE} color="var(--color-process)" delay="1.8s" duration="5.4s" />
              <Packet path={SPINE} color="var(--color-orch)" delay="3.6s" duration="5.4s" />
              <Packet path={RETURN} color="var(--color-fault)" delay="2.4s" duration="6.8s" />
            </>
          ) : null}
        </g>
      </svg>
    </div>
  );
}

function label(size: number): React.CSSProperties {
  return {
    fontFamily: "var(--font-mono)",
    fontSize: size,
    fontWeight: 500,
    letterSpacing: "0.06em",
  };
}

function sub(size: number): React.CSSProperties {
  return { fontFamily: "var(--font-mono)", fontSize: size };
}

function Node({
  x,
  y,
  size,
  color,
  emphasis = false,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  emphasis?: boolean;
}) {
  return (
    <g>
      {emphasis ? (
        <rect
          x={x - size / 2 - 7}
          y={y - size / 2 - 7}
          width={size + 14}
          height={size + 14}
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.4"
          rx="3"
        />
      ) : null}
      <rect
        x={x - size / 2}
        y={y - size / 2}
        width={size}
        height={size}
        fill={color}
        rx="2"
      />
    </g>
  );
}

function Packet({
  path,
  color,
  delay,
  duration,
}: {
  path: string;
  color: string;
  delay: string;
  duration: string;
}) {
  return (
    <rect
      data-packet
      width="8"
      height="8"
      rx="1"
      fill={color}
      x={-4}
      y={-4}
      style={{
        offsetPath: `path("${path}")`,
        offsetRotate: "0deg",
        animation: `packet-run ${duration} linear ${delay} infinite`,
      }}
    />
  );
}
