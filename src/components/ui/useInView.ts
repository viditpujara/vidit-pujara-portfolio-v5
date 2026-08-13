"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * True once the element has entered the viewport. Never flips back.
 *
 * State is only ever set from inside the observer callback, which is an
 * external event, so no render is triggered synchronously from an effect.
 * IntersectionObserver has been available in every browser this site targets
 * for years, and it is also the mechanism the site wide RevealEngine depends
 * on, so there is no separate fallback path to keep in sync.
 */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ------------------------------------------------------------ reduced motion */

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function readMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The reduced motion preference, read as an external store rather than mirrored
 * into state inside an effect. The server snapshot is false, which is the
 * conservative answer: markup is identical either way, and the preference is
 * applied on the first client render.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    readMotionPreference,
    () => false,
  );
}
