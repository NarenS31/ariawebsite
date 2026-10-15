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
  The known moment-5 misfire note remains visible in the reveal.
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
