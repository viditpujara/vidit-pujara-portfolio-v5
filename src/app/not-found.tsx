import type { Metadata } from "next";
import { Action, Console, Key, Shell } from "@/components/primitives/register";
import { primaryNav } from "@/content/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Console label="Page not found">
      <Shell>
        <Key tone="orch">404</Key>
        <h1 className="t-display mt-5 max-w-[22ch]">
          That route does not exist on this site
        </h1>
        <p className="t-lead measure mt-5 text-console-muted">
          The address may have changed. Everything published is reachable from
          the list below.
        </p>
        <ul className="mt-10 max-w-xl">
          {[{ href: "/", label: "Home" }, ...primaryNav].map((item) => (
            <li key={item.href} className="border-t border-line">
              <Link
                href={item.href}
                className="t-data row-link group py-4 text-console-muted transition-colors hover:text-orch"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Action href="/" variant="primary">
            Back to the homepage
          </Action>
        </div>
      </Shell>
    </Console>
  );
}
