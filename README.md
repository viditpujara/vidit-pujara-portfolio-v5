# Vidit Pujara, portfolio Version 5

Oracle Fusion Technical Consultant specialising in Oracle Integration Cloud (OIC).
The formal Mastek designation is **Consultant I**, confirmed 1 November 2026.

## Working on this repository

Coding agents and contributors follow the rules in [AGENTS.md](AGENTS.md). Task history,
decisions and requirements are indexed in [docs/README.md](docs/README.md).

## Run and verify

Use Node 24 LTS (minimum 22.14) and the committed lockfile:

```bash
npm ci --ignore-scripts
npm run dev
npm test
npm run typecheck
npm run lint
```

Production metadata is baked into the build. Set both values **before building**:

```bash
NEXT_PUBLIC_SITE_URL=https://viditpujara.me NEXT_PUBLIC_SITE_ENV=production npm run build
npm run start -- --port 3100
```

In another terminal:

```bash
npx playwright install chromium
python3 scripts/qa-sweep.py http://127.0.0.1:3100 --origin https://viditpujara.me --environment production
```

The sweep requires HTTP/content and browser checks to pass. `--http-only` explicitly
reports incomplete release coverage; it never claims browser verification. CI tests
separate production and preview builds. For a preview build set
`NEXT_PUBLIC_SITE_ENV=preview` **before building**, then use `--environment preview`.

## Deployment configuration

| Variable | Contract |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Explicit HTTPS canonical origin on Production: `https://viditpujara.me`. No path, port, credentials, query or fragment. |
| `NEXT_PUBLIC_SITE_ENV` | Exactly `production` on Production; `preview` or unset elsewhere. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Search Console HTML verification token. |

On Vercel these belong to the matching environment. Production without the flag
or origin fails the build. A preview with the production flag also fails. Vercel
hostnames and localhost are rejected as canonical origins. Local/preview builds
without an origin default to the known `.me` canonical and remain noindex.
`.env.example` defaults to preview; do not copy its flag to Production unchanged.
No private service credentials belong in `NEXT_PUBLIC_*` variables.

After deployment check `/robots.txt`, `/sitemap.xml`, HTML robots/canonical tags,
Open Graph URLs, schema identifiers, response headers and the PDF download.
Set redirects for historical version hosts in the hosting dashboard; do not
redirect the canonical host to itself. See `DOMAIN_AND_SEARCH_SETUP.md`.

## Résumé download and editable source

The reviewed public file is:

`public/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf`

Its URL is `/vidit-pujara-oracle-fusion-technical-consultant-resume.pdf` and the
browser download filename is `Vidit_Pujara_Oracle_Fusion_Technical_Consultant_OIC.pdf`.
`/resume` offers the download and a separate Print/Save as PDF action.

Editable content lives in `docs/resume.json`. This is a regenerated public copy
based on the supplied PDF, with Consultant I, certifications, no phone number,
and the vague second-project block removed. The original in Downloads is untouched.

```bash
python3 -m venv /tmp/portfolio-pdf-env
/tmp/portfolio-pdf-env/bin/pip install -r scripts/requirements.txt
/tmp/portfolio-pdf-env/bin/python scripts/build-resume.py
/tmp/portfolio-pdf-env/bin/python scripts/verify-resume.py
/tmp/portfolio-pdf-env/bin/python scripts/build-social-image.py
```

Generators use DejaVu fonts from `/usr/share/fonts/truetype/dejavu` (Debian/Ubuntu:
`fonts-dejavu-core`). The PDF builder writes an ignored `output/pdf/` copy and the
public asset. Render every page with `pdftoppm` and inspect the final layout after
edits; text checks alone cannot prove layout quality. Keep public PDF content and
`src/content` facts aligned. Never copy a phone/client-named source straight into
`public/`.

## Architecture and content

Next.js 16 App Router, React 19, strict TypeScript and Tailwind CSS 4. Fonts and
images are local. There are no application API routes, database connections,
analytics or third-party scripts.

- `src/content/site.ts`: identity and navigation, with separate public/official titles.
- `src/content/pages.ts`: home, experience, skills, résumé and other page copy.
- `src/content/case-studies.ts`, `projects.ts`: attributed enterprise and independent work.
- `src/content/metrics.ts`, `figures.ts`: approximate ranges and explanatory figures.
- `src/content/routes.json`: sitemap/QA route inventory, checked against pages and detail slugs.
- `src/lib/environment.ts`, `seo.ts`: origin validation and metadata/schema builders.
- `src/components`: reusable console/record surfaces, figures and native dialog navigation.

The visual system, CSS motion, figure text alternatives, print layout and reduced
motion experience are described in `V5_DESIGN.md`. JavaScript-free navigation uses
a native disclosure, while the interactive mobile menu uses a native modal dialog.

## Security and privacy

TripTogether's external repository action is withheld pending provider revocation
and history-cleanup verification. Removing a link does not revoke credentials.
Public Supabase keys need an RLS/auth review; elevated secrets must stay server-side.

The source/HTTP checks never embed private client names or phone values. An optional
ignored `.qa-private.json` array supplies private terms locally; CI can supply its
path through `QA_PRIVATE_TERMS_FILE`. Values are redacted in failures. This private
fixture is not a replacement for source/history cleanup.

```bash
npm run security:scan -- --history
npm audit --omit=dev
```

CI also runs Gitleaks over Git history. The local offline scan covers a smaller set
of credential patterns and reports that limit. Enforced headers restrict framing,
objects and base URLs. A broader resource CSP is Report-Only and permits inline
hydration/styles; it is not advertised as a strict script policy.

See `docs/audit/IMPLEMENTATION_STATUS.md` for verified results, remaining development
tool advisories and account-side work. The original audit and historical npm result
remain in `AUDIT_AND_IMPLEMENTATION_PLAN.md` and `docs/audit/`.
