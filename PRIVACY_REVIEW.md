# Privacy and confidentiality

Updated 1 November 2026.

Enterprise client names, system identifiers, payloads, internal recipients and
production screenshots must not appear in published content. Oracle product names
and Mastek as employer are intentional. Since 7 November 2026 the owner's own phone
number is published on the owner's instruction (`identity.phone` in `src/content/site.ts`,
the résumé page, the contact page and the PDF); it is the only phone number the QA
checks allow. It is now in Git history and on a public site, so expect it to be scraped. No other phone number is included in the
web résumé or regenerated download. Approximate counts retain their scope.

Literal private identifiers have been removed from the public QA denylist. Optional
private terms live in ignored `.qa-private.json` or a file selected through
`QA_PRIVATE_TERMS_FILE`; failures redact values. Historical Git objects can still
contain the previous fixture. A coordinated history cleanup remains an account-side
action; ignore rules and current-tree deletion do not erase it.

`.env` and `.env.*` are ignored, except `.env.example`. Secret scanning combines a
small redacted local pattern check with Gitleaks CI. No scan guarantees absence of
all confidential information or proves third-party repository security.

The app has no forms, cookies, analytics or persistent user storage. Fonts and
images are self-hosted. Outbound links use noopener/noreferrer. Copy-email writes
only on the user's click. No new data collector was added.

TripTogether's direct repository link is removed pending key classification,
provider revocation and history cleanup. Public Supabase keys are designed for
clients; RLS/auth policies still need review. Elevated keys and Gemini secrets must
stay server-side. Removal of the link is containment, not credential revocation.

Headers now enforce framing, object, base-URL and form-target restrictions. Resource
restrictions are staged in a Report-Only CSP compatible with static Next hydration;
inline scripts/styles remain allowed in that staged policy. Existing hosting HSTS
is outside the local configuration and must be rechecked after deployment.
