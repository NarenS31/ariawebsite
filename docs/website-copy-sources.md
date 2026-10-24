# Website copy update sources

Updated 2026-10-15 from the supplied section-by-section edit list.

> **Superseded in part by the `site-merge` branch (2026-10-20).** Where this file says a result "was not independently
> reproduced", the numbers have since been checked against the results files; see "Sources checked on merge" at the end.
> Where it says the activity moments come from build `074812d`, they now come from the summit build (see below).

## Summit participation update

- The audience is math learners broadly; prominent ADHD positioning was removed. On the merged site the motivation is stated without any
  diagnosis ("wanting to understand why tutors interrupt students who are mid-thought"). The only remaining mention is the exclusion
  statement on /pace ("not trained on any data about ADHD, anxiety, or disability").
- `/participate` is a planning request with an explicit email-review handoff,
  not open pilot enrollment or a backend lead database.
- `/activity` contains the eight moments and the draft consent. It is a local-only preview, not active research
  collection. Advisor and organizer consent review are still unconfirmed.
- The eight moments are now copied from `data/teacher_moments.json` (NarenS31/aria.kls, branch `summit-activity`; build tag
  `summit-2026-10-24`, commit `e09218c`), replacing the earlier pre-freeze set (`074812d`). ARIA stays quiet on M1, M2, M4, M5
  and steps in on M3, M6, M7, M8. Sampling limitation, to record in any analysis plan: the set has two quiet-on-correct
  cases, two quiet-on-planning-words cases, two wrong-math step-ins, and two words-only step-ins; it has no wrong-but-quiet case.
- Teacher decisions are committed before model decisions are revealed. The CSV download was removed; at the end of the activity
  visitors may share their eight Step in / Stay quiet choices anonymously (table `activity_responses`, `db/002_activity_responses.sql`).
  Nothing is sent unless they tick consent and press Share.
- The hero now includes help requests and difficulty signals as intervention
  triggers, matching the supplied words-only cases instead of claiming that
  intervention happens only on verified mathematical errors.
- `/students` is an optional three-question design-feedback worksheet with a
  local download, not a human-subject study or a survey submission backend.
- The summit follow-up band is date-gated to October 19–27, 2026 (Eastern Time). Cross-dataset wording on every page matches /pace: run once on a
  locked 2012–13 split, numbers held until the dataset terms are confirmed.
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

## Sources checked on merge (2026-10-20)

All against NarenS31/aria.kls:

- 52% fewer interventions (under the 3-correct-in-a-row mastery definition), 3.7% missed (95% CI 2.2–5.3%), 597 test students, 4,163 students in the splits: `docs/aria_pace/RESULTS.md`
  (branch `aria-pace`) lines 9–11 and 20; `aria_pace/results/test_results.json` (`main.variants.frozen`, `main.scope`).
- Supportive cost setting: 3% fewer, difference to always-help includes zero: `RESULTS.md` line 11–13 and 72.
- Classifier benchmark: 84.6% (0.8457) and macro-F1 0.837 on 350 synthetic messages, seven states:
  `eval/data/eval/eval_heuristic_350.json` (`state_detection`, lines 5, 6, 125); mean cross-generator gap 9.05 points:
  `eval/data/eval/cross_generator_heuristic.json` (`generalization_gap.mean_points`, line 542).
- 30 demo problems: `data/demo_problems.json`. 0 answer leaks / 0 math errors / 0 crashes on the 8 featured problems in scripted harness
  runs: `results/demo_harness_summit_pace.json` (branch `summit-pace-mac`, commit `945516e`; both the original summit build `e09218c` and the
  ARIA-Pace build `498882c`), produced by `scripts/demo_harness.py --featured --strict`; `docs/DEMO_RUNBOOK.md` section 5 for the full-bank run.
- Home-page "prompt from the demo" example (alg-08 wrong answer): reproduced on the tag build `summit-2026-10-24`.
- Not found: handwriting/photo input (only a text box exists in `ui/demo_app.py`); the site says only that the summit demo works on typed math.

## Reference links

- Koedinger & Aleven (2007):
  https://pslcdatashop.web.cmu.edu/KDDCup/FAQ/Koedinger-Aleven-EPR-07.pdf
- Beck & Gong (2013): https://doi.org/10.1007/978-3-642-39112-5_44
- Corbett & Anderson: https://doi.org/10.1007/BF01099821
  (The requested 1995 citation is widely used; the publisher lists the issue
  date as December 1994 and a revision date in 1995.)
- Sweller (1988): https://doi.org/10.1207/s15516709cog1202_4 (cited in the text of the intervention-design section and listed in the references)
