"use client";

/**
 * Opens the browser print dialogue. The page is styled for print, so the
 * output is a clean one column document with the navigation, footer and this
 * panel removed. Progressive: without JavaScript the browser print command
 * produces exactly the same result, which is why this is a convenience rather
 * than the only route.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="action action-ghost"
    >
      Print or save as PDF
    </button>
  );
}
