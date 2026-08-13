"use client";

import { useState } from "react";

/**
 * Copies the email address to the clipboard and says so.
 *
 * The label changes to the completed state, matching the action that produced
 * it, and the change is announced politely rather than moving focus. If the
 * clipboard is unavailable the button says so instead of failing silently, and
 * the address is also present as a plain mailto link beside it, so this control
 * is never the only route.
 */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      window.setTimeout(() => setState("idle"), 2400);
    } catch {
      setState("failed");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={copy} className="action action-ghost">
        {state === "copied"
          ? "Copied"
          : state === "failed"
            ? "Copy unavailable"
            : "Copy email address"}
      </button>
      <span aria-live="polite" className="sr-only">
        {state === "copied"
          ? `${email} copied to the clipboard`
          : state === "failed"
            ? "Copying is not available in this browser. Use the email link instead."
            : ""}
      </span>
    </div>
  );
}
