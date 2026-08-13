# Domain and search setup

## Choosing the domain

The site does not care which domain is used; it reads one environment variable.
The trade off is worth stating plainly.

| Option | For | Against |
| --- | --- | --- |
| `viditpujara.com` or `.in` | Strongest long term asset. Reads as a professional identity, survives any change of employer or host, and is what a recruiter expects to see on a CV | Costs money every year, and `.com` availability for a personal name is uncertain |
| A short novelty domain such as `viditpujara.qd.je` | Cheap or free, quick to set up | Reads as a side project rather than a professional identity, and any novelty registry is a dependency you do not control |
| The default `*.vercel.app` host | Free, immediate | Looks provisional, and the host is not yours. Poor choice for a portfolio you will put on a CV |

Recommendation: buy `viditpujara.com` if it is available, `viditpujara.in`
otherwise. The annual cost is trivial against the purpose, and the alternative
is rewriting the URL on every application later.

Whatever is chosen, set `NEXT_PUBLIC_SITE_URL` to exactly that origin with no
trailing slash, pick one canonical host, and redirect the other. Serving the
same site on both the apex and the `www` subdomain without a redirect splits
the signal for no benefit.

## Steps

1. Register the domain.
2. In Vercel, add it to the project and follow the DNS instructions shown there.
3. Set `NEXT_PUBLIC_SITE_URL` to the chosen origin in the Production
   environment, and `NEXT_PUBLIC_SITE_ENV=production`.
4. Redeploy. Environment variables are read at build time, so a redeploy is
   required for a change to take effect.
5. Confirm on the live site that `/robots.txt` allows crawling and names the
   sitemap, and that a page's canonical points at the new origin.

## Google Search Console

1. Add the property in Search Console. Domain properties are preferable because
   they cover every subdomain and both protocols.
2. If DNS verification is not convenient, use the HTML tag method: copy the
   token and set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then redeploy. The tag
   is emitted only when that variable is set.
3. Submit `https://your-domain/sitemap.xml`.
4. Use URL inspection on the homepage to confirm the canonical Google sees
   matches the one being published.
5. Check the Rich Results test on the homepage and on one case study to confirm
   the `Person` and `TechArticle` graphs are read as intended.

Indexing takes days to weeks. Nothing in the site needs changing while waiting.

## Keeping preview deployments out of the index

Leave `NEXT_PUBLIC_SITE_ENV` unset, or set it to `preview`, in the Preview and
Development environments. Those builds then serve `noindex, nofollow` on every
route and a disallow all `robots.txt`. Do not "fix" a preview that is not being
indexed: that is the intended behaviour.
