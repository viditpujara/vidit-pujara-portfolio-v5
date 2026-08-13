import Link from "next/link";
import { footerNav, identity } from "@/content/site";

export function SiteFooter() {
  // Evaluated when the static page is generated.
  const year = new Date().getFullYear();

  return (
    <footer
      data-register="console"
      data-print="hide"
      className="border-t border-line bg-abyss text-console-ink"
    >
      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="t-display max-w-[20ch]">{identity.name}</p>
            <p className="t-small measure mt-5 text-console-muted">
              {identity.footerLine}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <li>
                <a
                  href={`mailto:${identity.email}`}
                  className="t-data link inline-block min-h-[26px] py-[3px] text-console-ink"
                >
                  {identity.email}
                </a>
              </li>
              <li>
                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-data link inline-block min-h-[26px] py-[3px] text-console-ink"
                >
                  LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={identity.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-data link inline-block min-h-[26px] py-[3px] text-console-ink"
                >
                  GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="t-key text-console-dim">Pages</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6">
              {footerNav.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    className="t-data block py-3 text-console-muted transition-colors hover:text-orch"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-baseline md:justify-between">
          <p className="t-data max-w-[62ch] text-console-dim">
            {identity.confidentialityLine}
          </p>
          <p className="t-data text-console-dim">
            &copy; {year} {identity.name}. {identity.locality}, {identity.country}.
          </p>
        </div>
      </div>
    </footer>
  );
}
