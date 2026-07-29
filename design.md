# Design | ARIA Research Website

A locked design system for the ARIA public research site. Future pages should extend this
system rather than inventing a separate visual identity.

## Genre

Research-forward, warm, and student-friendly. Interactions should explain the research without
making the initiative look like a generic AI assistant or children’s application.

## Macrostructure family

- Marketing pages: Narrative Workflow with interactive explanatory moments.
- App pages: Workbench with quiet product visuals and visible uncertainty.
- Content pages: Long Document using the same typography and palette.

## Theme

- `--color-paper`: `oklch(97% 0.012 95)`
- `--color-paper-2`: `oklch(94% 0.016 95)`
- `--color-ink`: `oklch(20% 0.012 250)`
- `--color-ink-2`: `oklch(39% 0.018 250)`
- `--color-rule`: `oklch(78% 0.025 95)`
- `--color-accent`: `oklch(86% 0.18 95)`
- `--color-accent-2`: `oklch(66% 0.18 235)`
- `--color-accent-3`: `oklch(68% 0.24 18)`
- `--color-focus`: `oklch(52% 0.19 235)`

## Typography

- Display and body: the platform’s system sans-serif stack, weights 400 to 700.
- Mono labels and data: the platform’s system monospace stack, weights 400 to 600.
- Display tracking: `-0.035em`.
- Type anchor: `clamp(2.75rem, 5vw + 1rem, 5.25rem)`.

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

- Primary CTA: pear push-button with a physical edge and direct verb.
- Secondary CTA: underlined text link or cyan push-button.

## What pages must share

- ARIA wordmark without an assistant character or status-light decoration.
- Warm cream paper, ink, pear, cyan, and one coral emphasis.
- Plus Jakarta Sans and JetBrains Mono.
- Restrained controls, full-width navigation, and visible focus states.
- Honest research limitations beside evidence.
- Compact narrative sections with centered content and limited unused side space.
