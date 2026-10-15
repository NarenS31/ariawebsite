# Website copy update sources

Updated 2026-10-15 from the supplied section-by-section edit list.

## Summit participation update

- The audience is math learners broadly; prominent ADHD positioning was removed.
- `/participate` is a planning request with an explicit email-review handoff,
  not open pilot enrollment or a backend lead database.
- `/activity` contains the eight moments and verbatim draft consent provided by
  the user from build `074812d`. It is a local-only preview, not active research
  collection. Advisor and organizer consent review are still unconfirmed.
- All moments must be regenerated from the frozen build, especially moment 5's
  known confusion-flag misfire. The current set has two quiet-on-correct cases,
  three wrong-math interventions, three words-only interventions, and no
  wrong-but-quiet category. Record this sampling limitation in any analysis plan.
- Teacher decisions are committed before model decisions are revealed. CSV
  exports are labeled `preview-not-research`; nothing is uploaded.
- The hero now includes help requests and difficulty signals as intervention
  triggers, matching the supplied words-only cases instead of claiming that
  intervention happens only on verified mathematical errors.
- `/students` is an optional three-question design-feedback worksheet with a
  local download, not a human-subject study or a survey submission backend.
- The summit follow-up band is date-gated to October 19–27, 2026 (Eastern Time).
- The adult advisor, offline check, teacher summaries, frozen-build video, and
  public replay specification/results links remain pending confirmation.

- Website baseline: `NarenS31/ariawebsite`, commit `0801e95`.
- The 30-problem demo bank and symbolic checker exist on the app repository's
  `summit-demo` branch as `data/demo_problems.json` and `agent/math_check.py`.
- The 52% intervention reduction, 3.7% missed-help rate, confidence interval,
  cost sensitivity, and zero answer-leak/math-error harness results were supplied
  in the edit list. The corresponding replay reports and completed harness-run
  logs were not present in the fetched app branches, so those results were not
  independently reproduced during this website update.
- `docs/aria_pace/LITERATURE.md` was not present in the fetched app branches.
  The four requested references were checked against publisher or university
  sources instead. No additional literature was added.
- Unsupported homepage counts of 100 tasks, 13 reasoning moves, and 5 system
  variants were removed, including their repetitions on the methodology page.
- This update changes website copy, not the tutor's behavior. It adds no claims
  about offline operation, teacher summary screens, latency, learner-adjustable
  support modes, handwriting, or photo input.

## Reference links

- Koedinger & Aleven (2007):
  https://pslcdatashop.web.cmu.edu/KDDCup/FAQ/Koedinger-Aleven-EPR-07.pdf
- Beck & Gong (2013): https://doi.org/10.1007/978-3-642-39112-5_44
- Corbett & Anderson: https://doi.org/10.1007/BF01099821
  (The requested 1995 citation is widely used; the publisher lists the issue
  date as December 1994 and a revision date in 1995.)
- Sweller (1988): https://doi.org/10.1207/s15516709cog1202_4
