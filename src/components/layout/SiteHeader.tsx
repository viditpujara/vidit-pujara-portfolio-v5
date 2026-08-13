"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerAction, identity, primaryNav } from "@/content/site";

/**
 * Site header.
 *
 * Transparent over the hero, then it takes on a panel background and a hairline
 * rule once the page has scrolled, so the type underneath never collides with
 * the navigation. The mobile sheet is a real dialogue: focus moves into it, Esc
 * closes it, the background is inert to scroll, and the open state is derived
 * from the route so a navigation always closes it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        openerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-register="console"
      data-print="hide"
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-abyss/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex items-center justify-between gap-4" style={{ minHeight: "var(--header-h)" }}>
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${identity.name}, home`}
        >
          <span
            aria-hidden="true"
            className="grid size-[26px] place-items-center border border-orch/70 text-orch transition-colors group-hover:bg-orch group-hover:text-[#1c1204]"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em" }}
          >
            {identity.monogram}
          </span>
          <span className="t-key hidden text-console-ink sm:block">
            {identity.name}
          </span>
        </Link>

        {/* desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`t-key relative block px-3 py-2 transition-colors ${
                    isActive(item.href)
                      ? "text-orch"
                      : "text-console-muted hover:text-console-ink"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-1 h-px origin-left bg-orch transition-transform duration-300 ease-out ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={headerAction.href}
            className="action action-ghost hidden !min-h-[38px] !text-[0.6875rem] sm:inline-flex"
          >
            {headerAction.label}
          </Link>
          <button
            ref={openerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="t-key inline-flex min-h-[44px] items-center gap-2 border border-line px-3 text-console-ink transition-colors hover:border-orch hover:text-orch lg:hidden"
          >
            Menu
            <span aria-hidden="true" className="grid gap-[3px]">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open ? (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-abyss lg:hidden"
        >
          <div
            className="shell flex items-center justify-between border-b border-line"
            style={{ minHeight: "var(--header-h)" }}
          >
            <span className="t-key text-console-muted">Navigation</span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                openerRef.current?.focus();
              }}
              className="t-key inline-flex min-h-[44px] items-center gap-2 border border-line px-3 text-console-ink transition-colors hover:border-orch hover:text-orch"
            >
              Close
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <nav aria-label="Primary, mobile" className="shell flex-1 overflow-y-auto py-6">
            <ul>
              {[{ href: "/", label: "Home" }, ...primaryNav, headerAction].map(
                (item, index) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="rise flex items-baseline justify-between gap-4 border-b border-line py-5"
                      style={{ ["--rise-delay" as string]: `${index * 32}ms` }}
                    >
                      <span
                        className={`t-display ${
                          isActive(item.href) ? "text-orch" : "text-console-ink"
                        }`}
                        style={{ fontSize: "clamp(1.6rem, 8vw, 2.2rem)" }}
                      >
                        {item.label}
                      </span>
                      <span className="t-data text-console-dim">
                        {String(index).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
            <p className="t-data mt-8 text-console-dim">{identity.publicTitle}</p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
