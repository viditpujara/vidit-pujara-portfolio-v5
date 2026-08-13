"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/**
 * Section index.
 *
 * A supplementary jump list that tracks the section currently in view. It is
 * additive: every section it points at is reachable by scrolling, and the
 * primary navigation covers every page, so hiding this below 1280px costs
 * nothing. Links are real anchors, so keyboard and screen reader users get the
 * same jumps a pointer user gets.
 */
export function SectionIndex({ items }: { items: Item[] }) {
  const [current, setCurrent] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sections on this page"
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ul className="pointer-events-auto space-y-1.5">
        {items.map((item, index) => {
          const active = current === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                className="group flex min-h-[26px] items-center justify-end gap-3 py-1.5"
              >
                <span
                  className={`t-key whitespace-nowrap transition-all duration-300 ${
                    active
                      ? "text-orch opacity-100"
                      : "text-console-dim opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all duration-300 ${
                    active
                      ? "w-7 bg-orch"
                      : "w-3.5 bg-console-dim group-hover:w-5 group-hover:bg-console-muted"
                  }`}
                />
                <span className="sr-only">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
