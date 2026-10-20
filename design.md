# Design | ARIA Research Website

A locked design system for the ARIA public research site. Future pages should extend this
system rather than inventing a separate visual identity.

## Genre

Research-forward, approachable, and student-friendly. The home page opens with the research question;
logged examples follow, research qualifications stay visible, and detailed methods have dedicated pages.

## Macrostructure family

- Marketing pages: Narrative Workflow with interactive explanatory moments.
- App pages: Workbench with quiet product visuals and visible uncertainty.
- Content pages: Long Document using the same typography and palette.

## Theme

- `--color-paper`: `oklch(100% 0 0)`
- `--color-paper-2`: `oklch(98% 0.008 95)`
- `--color-ink`: `oklch(23% 0.012 150)`
- `--color-ink-2`: `oklch(40% 0.01 150)`
- `--color-rule`: `oklch(88% 0.006 150)`
- `--color-accent`: `oklch(86% 0.18 95)`
- `--color-accent-2`: `oklch(66% 0.18 235)`
- `--color-accent-3`: `oklch(68% 0.24 18)`
- `--color-focus`: `oklch(52% 0.19 235)`

## Typography

- Display: Avenir Next with Segoe UI and system sans-serif fallbacks, weights 700 to 750, upright.
- Body: the existing system sans-serif stack, weights 400 to 700.
- Mono labels and data: the platform’s system monospace stack, weights 400 to 600.
- New display text uses zero tracking and fixed sizes at responsive breakpoints.
- Home headline: 54px desktop, 42px mobile with a 34px category line.
- Main sections use 56px vertical spacing, reduced to 36px on mobile.

## Logo

- `public/aria-symbol.svg`: transparent dark A with a yellow crossbar, based on the selected third logo reference.
- `public/aria-wordmark.svg`: horizontal symbol and custom vector lettering with matching open crossbars, no font dependency.
- Use the wordmark in navigation and footer, and the symbol for the browser icon and tutoring responses.

## Spacing

A named four-point scale from `--space-3xs` through `--space-4xl`. No arbitrary section spacing.

## Motion

- Entries use `cubic-bezier(0.16, 1, 0.3, 1)`.
- Buttons press physically instead of scaling.
- Scroll reveals happen once and communicate the next stage.
- Reduced-motion mode removes spatial animation and stops the footer marquee.

## Microinteractions stance

- Interactive explanations respond immediately.
- Focus indicators appear instantly.
- No celebratory success toast for visible actions.
- No custom cursor, parallax, or auto-rotating content.

## CTA voice

- Primary CTA: ARIA yellow with a direct verb, modest corners, no decorative shadow.
- Secondary CTA: underlined text link or cyan push-button.

## What pages must share

- ARIA wordmark without an assistant character or status-light decoration.
- White surfaces, dark ink, ARIA yellow, and restrained state colors.
- Compact bold sans-serif headings and system sans-serif body copy; no remote font dependency.
- Restrained controls, full-width navigation, and visible focus states.
- Honest research limitations beside evidence.
- Compact narrative sections with centered content and limited unused side space.
