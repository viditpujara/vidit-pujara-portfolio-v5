"use client";

import { useEffect } from "react";

/**
 * One observer for every reveal on the page.
 *
 * Elements opt in with `data-reveal` and are released with
 * `data-reveal="shown"`, which is what the CSS transition listens for. Rules
 * and traces use `data-draw` in the same way. Using a single mutation aware
 * observer instead of one component per element keeps the client bundle at a
 * few hundred bytes and means server rendered pages need no wrapper component
 * around every section.
 *
 * If JavaScript never runs, the fallback in the document head releases
 * everything, so no content is ever trapped behind an observer.
 */
export function RevealEngine() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const showAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal], [data-draw]")
        .forEach((node) => {
          if (node.hasAttribute("data-reveal")) {
            node.dataset.reveal = "shown";
          }
          if (node.hasAttribute("data-draw")) {
            node.dataset.draw = "shown";
          }
        });
    };

    if (reduced.matches) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          if (node.hasAttribute("data-reveal")) node.dataset.reveal = "shown";
          if (node.hasAttribute("data-draw")) node.dataset.draw = "shown";
          observer.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.01 },
    );

    const register = () => {
      document
        .querySelectorAll<HTMLElement>(
          '[data-reveal=""], [data-draw=""], [data-reveal="idle"], [data-draw="idle"]',
        )
        .forEach((node) => observer.observe(node));
    };

    register();

    const mutations = new MutationObserver(register);
    mutations.observe(document.body, { childList: true, subtree: true });

    const onChange = () => {
      if (reduced.matches) {
        observer.disconnect();
        showAll();
      }
    };
    reduced.addEventListener("change", onChange);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      reduced.removeEventListener("change", onChange);
    };
  }, []);

  return null;
}
