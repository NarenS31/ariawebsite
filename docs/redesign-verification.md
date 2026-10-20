# Flint-inspired ARIA redesign

Implemented 2026-10-15 from the supplied brief and screenshots. The implementation
keeps the existing Next.js application, routes, forms, and research material.

## Changes

- White surfaces, upright editorial serif headings, system sans-serif body text,
  ARIA yellow actions, restrained state colors, and smaller corner radii.
- A centered product introduction and substantial interactive mathematical
  preview with explicit scripted-build labeling.
- Student-value rows, an educator planning section, and an evidence ledger that
  distinguishes implementation, reported scripted checks, reported replay, and
  future human evidence.
- Existing deep research sections remain accessible in a native disclosure.
- `demoMoments.ts` holds the eight supplied moments without altering their
  wording. Both the homepage and teacher activity read this shared source.
- Replay provenance is present on the homepage, roadmap, research metrics,
  researcher page, and methodology ledger.
- Mobile navigation supports Escape and restores focus to its toggle.

## Verification

- TypeScript check and optimized production build passed.
- Homepage inspected at 320, 375, 414, 768, and 1440 pixels. No horizontal
  overflow or broken images; the preview begins within the first 900-pixel
  viewport at all five widths.
- All three example states have identical panel heights at each breakpoint:
  600px on the four smaller widths, 260px at 1440px.
- All seven routes loaded without document overflow at 320px.
- Mobile menu, Escape/focus return, FAQs, and research disclosure tested.
- Complete eight-moment activity tested with optional background fields, a skip,
  consent gate, hidden reveals, all eight final reveals, and CSV download.
  (Superseded: the moment-5 misfire note no longer exists; see the merge section below.)
- Educator form prepared the expected mailto draft using dummy QA details.
  No email was sent.
- Student response JSON downloaded locally with the selected answers.
- Main palette contrast calculated from the OKLCH tokens: main text/white
  16.83:1, body text/white 9.17:1, muted text/white 7.10:1, action text/yellow
  11.02:1, support label/mint 7.47:1.
- Reduced-motion CSS disables animations, transitions, smooth scrolling, and
  hover/press movement; the menu also respects the motion preference. This
  behavior was reviewed in source, not tested by changing the operating system
  accessibility preference.

## Remaining gates

Pilot enrollment, research collection, adult/organizer consent review, frozen
demo regeneration, offline checks, teacher summaries, a frozen-build video,
and reproducible public replay artifacts remain pending. The redesign does
not assert those capabilities are available. No push, merge, or publication
was performed.

## Merge verification: `site-merge` (2026-10-20)

Merge of `origin/codex/website-copy-updates` into `origin/main` (content from main, design and new pages from the branch).

- `tsc --noEmit` and `npm run build` pass; 14 routes prerendered (/, /pace, /about, /method, /research, /roadmap, /collaborate,
  /methodology, /activity, /participate, /privacy, /researchers, /students).
- Playwright (system Chrome) screenshots of every route at 1280 and 390 px: no horizontal page scroll, no console errors, content starts
  below the fixed header on every route. Defects found by looking and fixed: footer text squeezed by nine links; Join-card links broke
  the card grid; the date-gated summit band sat under the fixed header.
- Activity driven end to end: consent gate, eight moments, hidden then revealed decisions (quiet M1, M2, M4, M5; step in M3, M6, M7, M8,
  matching `data/teacher_moments.json`), CSV download. Planning form produces a mailto draft; student survey downloads JSON.
  Network log for the whole session: 33 requests, all GET to the site itself, none to any other host, no POST.
- Mobile menu opens, Escape closes it and returns focus to the toggle.
- Text and link diff against `origin/main` per route: the only main text no longer present is the unverified 100 / 13 / 5 counts and the two
  ADHD lines on the methodology page (removed on purpose), the old text wordmark ("Research Initiative" under ARIA, now the logo image),
  and the playground, which moved from the home page to /method.

### Follow-up edits (2026-10-20, after review)

- ADHD wording on About and Researchers replaced by a neutral motivation; cross-dataset wording on the home tile, roadmap, and evidence-gates list now matches /pace;
  the activity's draft consent says answers stay in the browser and nothing is sent; the Join card promises less than the privacy page; "Research Initiative"
  restored next to the logo; Sweller (1988) restored with an in-text citation; harness results cited to `results/demo_harness_summit_pace.json`.
- Summit follow-up band: all four links resolve; it shows on Oct 19 to 27 (Eastern) and not before or after (tested with a fixed browser clock).
