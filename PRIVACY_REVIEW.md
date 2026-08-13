# Privacy and confidentiality review, Version 5

## Standing rules

1. No client name, vendor name, internal project name, system identifier,
   payload detail, schema, endpoint, credential or internal recipient appears in
   rendered output, in markup, in diagrams, in decorative text or in image
   assets.
2. Case studies describe architecture and technique. They name Oracle products,
   which is the technology being described, and nothing else.
3. No employer screenshot, no production data, no fabricated client logo and no
   invented testimonial.
4. No phone number.
5. Approximate figures stay approximate. A range is never converted to a single
   number to make a visual cleaner.

## How the rules are enforced

Confidentiality is stated on the page, not hidden in a policy document. The case
studies index carries the boundary in its header, every case study repeats it
beside the role statement, the experience page carries it under the scope note,
and the footer carries it site wide.

`scripts/qa-sweep.py` scans both the visible text and the raw markup of all 18
routes for a blocked string list, using whole word matching for short codes so
that a real word cannot mask a false pass. The list covers client and vendor
names recorded in the previous privacy reviews, the historical phone number, the
superseded email address, internal tooling names, and host names that should
never be published such as `localhost` and `vercel.app`.

Result on the current build: **no blocked string found in visible text or in
markup on any route.**

## Diagram content

Every figure is built from generic flow nodes: source systems, staging,
comparison, orchestration, technique, target, reconciliation. Stage titles
describe function, never a system. The hero instrument names only Oracle
products and generic categories. No figure contains sample data, a file name, a
directory, an endpoint or an identifier.

## Third parties

The site loads nothing from a third party at runtime. No analytics, no tag
manager, no font host, no embedded media, no comment system, no form backend.
Outbound links are limited to LinkedIn, GitHub, the five project repositories
and the issuer verification pages for credentials. All open in a new tab with
`rel="noopener noreferrer"` and announce that they do.

## Personal data

The site collects nothing and stores nothing. There is no form, no cookie set by
the application, and no client side storage. The contact route is a `mailto`
link plus a copy to clipboard control, which acts only on the user's own
clipboard on their own click.

## Residual risk carried from earlier versions

**The TripTogether repository still has service credentials in its git history.**
The `.env` file was removed from the working tree, which does not remove it from
history. Version 5 links that repository publicly from `/projects/triptogether`.
Rotation and a history rewrite are required before that link is shared widely.
This is the highest priority item in `REMAINING_MANUAL_ACTIONS.md`.
