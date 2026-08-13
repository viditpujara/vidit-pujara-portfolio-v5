# Version 5 design system

## The idea

Enterprise integration is data moving between systems and landing as a record.
Version 5 makes that the structure of the site itself.

**Two registers.**

| | Console | Record |
| --- | --- | --- |
| Surface | Deep petrol `#0d1b26` on an `#08111a` canvas, engraved 88px lattice | Cool paper `#edf2f5`, no lattice |
| Carries | Systems in motion: hero instrument, pipelines, capabilities, environments, direction | Claims: prose, delivery figures, case study narrative, credentials, résumé |
| Voice | Mono labels, signal colours, live figures | Document typography, wide measure, ink on paper |

Sections alternate between them. The change of surface is marked by a seam: a
hairline of tick marks and one mono label naming the surface being entered. It
carries no information the page needs, which is why it is hidden from assistive
technology, but it stops the alternation reading as an accident.

The résumé leaves the console entirely and sits on white, because it is a
document rather than an instrument. It is also the one page styled for a
printer.

## Signals

Six colours with fixed meanings. Nothing in the interface uses them against that
meaning, and the six homepage capabilities map one to one onto them, so the
legend is learnable rather than decorative.

| Token | Console | On paper | Meaning |
| --- | --- | --- | --- |
| `source` | `#86a9c6` | `#37648c` | Inbound systems, files, events, REST calls |
| `process` | `#b9c9d6` | `#4a6474` | Data in flight: staging, comparison, transformation |
| `orch` | `#f2b14c` | `#8a5807` | Orchestration, the Oracle Integration Cloud layer |
| `verify` | `#4fc3a1` | `#0f6d54` | Supporting technique: BI Publisher, validation, classification |
| `fault` | `#f0705c` | `#b03626` | Errors, reconciliation, return paths |
| `target` | `#dce9f1` | ink | Oracle Fusion, the destination |

Gold against petrol blue is the primary tension, which is why the accent reads
as instrumentation rather than as a neon highlight on black. No colour carries
meaning on its own: every signal is paired with a label.

## Type

One family doing two jobs, plus one for machine facts.

- **Archivo Variable**, driven on its width axis. `t-hero` at `wdth` 84,
  `t-display` at 88, `t-section` at 90, `t-title` at 94, body at 100. Headings
  are narrow and tall, prose is normal width, and it is the same typeface
  throughout.
- **JetBrains Mono Variable** for every label, key, index, unit, figure number
  and data value. The reader learns quickly that mono means machine fact.

Both are self hosted variable woff2, latin subset, preloaded. Total font payload
is roughly 130KB.

## Motion

One easing family, `cubic-bezier(0.22, 1, 0.36, 1)`, across transitions,
keyframes and the JavaScript counter. Three durations: 180ms, 420ms, 720ms.

| Motion | Purpose | Technique |
| --- | --- | --- |
| Hero entrance | Staged arrival of identity, then the instrument | CSS keyframes with per element delay |
| Ambient packets | Data continuously running the working shape | `offset-path` plus `offset-distance` keyframes |
| Reveal | Content arriving as it enters view | One shared `IntersectionObserver`, CSS transition |
| Rule draw | Section rules drawing left to right | `scaleX` transform |
| Pipeline run | A packet advancing stage to stage | Stepped state, 340ms per stage, CSS per stage |
| Counters | Figures counting to their published value | `requestAnimationFrame`, quintic ease |
| Graph bars | Ranges drawing from their lower bound | `scaleX` with staggered delay |
| Route entrance | New page arriving | Keyed remount, one CSS animation |

**Rules the motion obeys.** Animation controls arrival, never access: every word
is in the DOM at all times. Nothing loops except the hero packets. There is no
exit animation on navigation, because delaying a page to play one out makes a
site slower, not more polished. There is no scroll hijacking. Pointer parallax
runs only on fine pointers, only on the hero instrument, and only inside a
`requestAnimationFrame`.

**Reduced motion** delivers the site already arrived: reveals visible, pipeline
stages lit, counters final, packets removed. The preference is also watched at
runtime, so changing it mid session takes effect.

## Responsive intent

Not a compressed desktop. The hero instrument is a horizontal SVG diagram at
768px and above; on phones it is replaced by a stacked HTML flow, because a 560
unit viewBox at 350px renders mono labels at about 8px, and that is decoration
rather than a diagram. Pipelines are vertical at every width by design, so they
scale to nine stages without serpentine layout. The section index appears only
at 1280px and above and is purely additive. Every target is at least 24px, and
primary actions are 46px.

---

# What was carried, changed and dropped

## Read before building

All four previous repositories were downloaded and read: package configuration,
routes, components, tokens, CSS, content modules, figures, SEO, sitemap, robots,
accessibility patterns and every verification document.

## Findings

| Version | Strongest contribution | Weakness |
| --- | --- | --- |
| V1 | Established the verified content model and the "never inflate" rule | Serif and warm plum reads as a personal blog rather than enterprise delivery |
| V2 | Introduced the typed content modules and semantic figure data | Card grid layout, generic portfolio silhouette |
| V3 | Best content architecture; graphs, figures and confidentiality notes all in place | Warm cream palette shared with V2, purely static |
| V4 | Best information design; ruled full width rows, mono data layer, honest small print | Same palette again, a "technical specification" idiom already used, and never opened in a browser |

**The gap all four share:** none of them moves. There is no animation dependency
in any of the four, one `IntersectionObserver` in V4, and no interaction beyond
a mobile menu. For a consultant whose work is data moving between systems, that
is the missed opportunity, and it is what Version 5 attacks.

## Carried forward

- The typed content architecture, extended rather than replaced.
- The 18 route information architecture, unchanged, which preserves any SEO
  established by V3.
- Semantic figure data with per stage tones, branches and return paths.
- The small print discipline: approximate figures stay approximate, ranges stay
  ranges, confidentiality boundaries are stated on the page rather than dropped.
- No proficiency percentages, no skill bars, no invented deployment links.
- Self hosted fonts, static rendering, no third party scripts.

## Deliberately not repeated

- The warm cream canvas used by V2, V3 and V4.
- Be Vietnam Pro, and IBM Plex Mono as the data face.
- V4's left hand decorative rail and the "specification document" idiom.
- Card grids as a primary layout device.

## Bugs and limitations not carried forward

- V4's `next lint` script and `FlatCompat` ESLint shim. Version 5 uses
  `eslint .` with the native flat config from `eslint-config-next` 16.
- V4's mobile navigation state derived in a way that tripped the React hooks
  rules. Version 5 closes the sheet from the link handler and Escape, so no
  state is set during render or in an effect keyed on the route.
- Building without ever rendering the result. Version 5 was inspected in a real
  browser at 390, 768 and 1440, which caught four defects invisible in source:
  colliding SVG labels, a gradient that degenerates on a horizontal path, a
  return path crossing a label, and an unreadable hero diagram on phones.

## Opportunities none of the previous versions explored

Stage by stage pipeline playback with step and replay, a text form of every
figure, ranges drawn as spans rather than bars, register alternation as pacing,
a scroll tracking section index, and animated figures that never round or
reshape the number they are animating.
