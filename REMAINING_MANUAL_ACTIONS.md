# Remaining manual actions

In priority order. Items 1 to 3 must happen before this site is shared widely.

---

## 1. Rotate the TripTogether credentials and rewrite that repository's history

**Severity: high. Carried unresolved from Version 3 and Version 4.**

The `triptogether-planner` repository has service credentials in its git
history: a Supabase key and a Google Gemini API key. The `.env` file was deleted
from the working tree at some point, which removes it from the current checkout
and **does not** remove it from history. Anyone can read the earlier commit.

Version 5 links that repository publicly from `/projects/triptogether`, so
sharing this portfolio increases the exposure.

Two separate actions are required, in this order:

1. **Rotate both keys at the provider.** Do this first. Until the keys are
   rotated, the exposure is live regardless of what happens to the history.
2. **Rewrite the history** so the file is gone from every commit, using
   `git filter-repo` or the BFG, then force push. Note that forks and existing
   clones keep the old objects, which is why rotation is the step that actually
   fixes the problem.

If neither is done, the alternative is to unpublish that repository and remove
the links. That is a real option, but the project is one of the two strongest
independent pieces of work on the site, so rotating is the better outcome.

---

## 2. Buy the domain

See `DOMAIN_AND_SEARCH_SETUP.md`. Recommendation is `viditpujara.com`, falling
back to `viditpujara.in`.

---

## 3. Set the environment variables in Vercel

- `NEXT_PUBLIC_SITE_URL=https://your-domain` on Production, no trailing slash.
- `NEXT_PUBLIC_SITE_ENV=production` on Production only.

Without the second, the site builds and serves perfectly and is never indexed.
Leave it unset on Preview, which is the correct default.

---

## 4. Decide what to do about the résumé PDF

The file supplied with this task, `Vidit_Pujara_Technical_Consultant.pdf`, is
the historical student résumé. It states a degree in progress, contains no
Oracle work, lists a superseded email address, and carries a phone number that
is not published anywhere on this site.

**No download control was created for it.** `/resume` is a print styled page
built from current verified content; it prints or saves to PDF from the browser.

If a downloadable file is wanted, produce a current one from the `/resume` page
and place it in `public/`, then add a download action. Do not publish the
supplied file as it stands.

---

## 5. Optional, worth considering

**The credential to specialisation gap.** The strongest verified credential is
Oracle APEX Cloud Certified Developer Professional, issued May 2025. The site is
positioned on Oracle Integration Cloud, which is where the delivery evidence is.
That is the right positioning, because delivery evidence beats a certificate,
but an Oracle Integration Cloud certification would close the gap between what
the credentials page says and what the case studies show. No design decision can
close it.

**A current professional photograph.** The portrait works and has been cropped
cleanly to 4:5, but it is the same image used since Version 1.

---

## What was verified and needs nothing

Dependency install, lint, typecheck, production build of 22 routes, all 18 public
routes returning 200, unknown routes returning 404, heading structure, canonical
URLs, Open Graph and Twitter metadata, JSON-LD validity, sitemap contents, robots
behaviour in both environments, blocked string scan across visible text and
markup, punctuation rules, alt text, skip link and landmarks, horizontal overflow
at 390, 768 and 1440, interactive target sizes, reduced motion behaviour, and
keyboard access to the primary navigation with a visible focus ring.
