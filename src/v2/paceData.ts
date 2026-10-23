// Every number in this file comes from the research repo, NarenS31/aria.kls, `main`:
//   R   = docs/aria_pace/RESULTS.md
//   R4  = aria_pace/RESULTS_v4.md
//   D   = docs/aria_pace/DATA.md
//   TR  = aria_pace/results/test_results.json
//   FV  = aria_pace/results/frozen_val.json / frozen_val.sha256
//   RB  = docs/DEMO_RUNBOOK.md
// The PR description lists each displayed number with its file and line. If a value is not
// in those files it is not here. 2012-13 data is held and appears nowhere in this module.

export const REPO = "https://github.com/NarenS31/aria.kls";
export const REPO_BLOB = `${REPO}/blob/main`;

export type SettingId = "quiet" | "balanced" | "supportive";

export interface Setting {
  id: SettingId;
  name: string;
  weights: string; // interruption : delayed-help cost weights
  threshold: number; // hint threshold, percent (frozen on validation)
  interventions: number; // per student, BKT on the locked test
  fewer: number; // percent fewer than always-help
  missedPct: number;
  missedLabel: string;
  missedCount: string;
}

// R:11-13, R:30-62, FV (taus 0.57 / 0.19 / 0.09), RB:133
export const settings: Setting[] = [
  { id: "quiet", name: "Quiet", weights: "3:1", threshold: 57, interventions: 1.22, fewer: 52, missedPct: 3.7, missedLabel: "3.7%", missedCount: "19 of 518" },
  { id: "balanced", name: "Balanced", weights: "1:1", threshold: 19, interventions: 2.15, fewer: 15, missedPct: 0.2, missedLabel: "0.2%", missedCount: "1 of 518" },
  { id: "supportive", name: "Supportive", weights: "1:3", threshold: 9, interventions: 2.46, fewer: 3, missedPct: 0.0, missedLabel: "0%", missedCount: "0 of 518" },
];

export const alwaysHelpInterventions = 2.54; // R:11

export const headline = {
  fewer: 52, // R:11
  missedPct: 3.7, // R:11
  missedN: 19, // R:11
  missedOf: 518, // R:11
  ciLow: 2.2, // R:11
  ciHigh: 5.3, // R:11
  testStudents: 597, // R:9, R:20, TR main.scope.students
  sequences: 3468, // R:9, R:20
  stuckSequences: 570, // R:9, R:20
  decisionPoints: 10907, // R:20
};

export const dataCounts = {
  rows: "346,860", // D:51 (descriptive profile), D:40, R:18
  students: "4,217", // D:51, D:40
  droppedRows: "63,755", // R:18
  droppedShare: "18.38%", // R:18
  sequences: "64,818", // R:18
  train: "2,498", // R:18
  validation: "833", // R:18
  test: "832", // R:18
  sha256: "162ef8d2d28bcbfea6591a282994062bd8d5eaa00636544292a0d268dca6e5da", // D:50, D:126
};

// R:30-38 (quiet table). Interventions per student, missed-help count over 518 sequences with a help opportunity.
export interface Baseline {
  key: string;
  label: string;
  interventions: number;
  missedPct: number;
  missedCount: string;
  note?: string;
}
export const baselinesQuiet: Baseline[] = [
  { key: "bkt", label: "ARIA-Pace (BKT threshold)", interventions: 1.22, missedPct: 3.7, missedCount: "19/518" },
  { key: "pfa", label: "PFA threshold", interventions: 1.44, missedPct: 2.1, missedCount: "11/518" },
  { key: "head", label: "Risk head (logistic)", interventions: 1.3, missedPct: 2.9, missedCount: "15/518" },
  { key: "n2", label: "Two-wrong-in-a-row rule, tuned", interventions: 1.28, missedPct: 25.9, missedCount: "134/518" },
  { key: "n3", label: "Three-wrong rule, untuned", interventions: 0.7, missedPct: 56.6, missedCount: "293/518" },
  { key: "random", label: "Random, matched to ARIA-Pace's rate", interventions: 1.22, missedPct: 33.2, missedCount: "171/518" },
  { key: "always", label: "Always help after a wrong step", interventions: 2.54, missedPct: 0.0, missedCount: "0/518" },
];

// RB:141, RB:150 and the ARIA poster (same student, tries 3-6). Tries 1-2 are correct steps.
// Third wrong step: poster and brief say 47%; DEMO_RUNBOOK.md:141 says 46%. See PR notes.
export const timeline = {
  tries: [
    { n: 1, answer: "right", risk: null as number | null },
    { n: 2, answer: "right", risk: null },
    { n: 3, answer: "wrong", risk: 15 },
    { n: 4, answer: "wrong", risk: 25 },
    { n: 5, answer: "wrong", risk: 47 },
    { n: 6, answer: "wrong", risk: 70 },
  ],
  firstHint: { supportive: 3, balanced: 4, quiet: 6 } as Record<SettingId, number>,
};

export const replies = {
  quietHolds: "Not quite yet. I’m holding the hint for now. Ask me if you want one.", // agent/demo_templates.py:72
  supportiveHints: "Not quite yet. Try this: subtract 2x from both sides. What do you get?", // ARIA poster
  problem: "Solve for x: 3(x − 4) = 2x + 5",
  wrongAnswer: "x = 7", // RB:159 (alg-01 wrong answer)
};

// R4:13-27. Cross-validated, exploratory, BKT only, validation students only.
export interface Definition {
  key: string;
  label: string;
  short: string;
  saving: number;
  lo: number;
  hi: number;
  missed: string;
}
export const definitions: Definition[] = [
  { key: "D3", label: "3 correct in a row, within 10 tries", short: "The rule used for the headline", saving: 50.1, lo: 48.5, hi: 51.6, missed: "6.2%" },
  { key: "D4", label: "4 correct in a row, within 10 tries", short: "", saving: 8.3, lo: 7.5, hi: 9.2, missed: "0.2%" },
  { key: "D5T15", label: "5 correct in a row, within 15 tries", short: "", saving: 26.4, lo: 24.7, hi: 28.2, missed: "4.3%" },
  { key: "D5T20", label: "5 correct in a row, within 20 tries", short: "", saving: 41.6, lo: 39.2, hi: 43.8, missed: "10.4%" },
  { key: "DEMA", label: "Running average at least 80% for 3 tries in a row, within 10", short: "", saving: 7.1, lo: 6.2, hi: 8.0, missed: "0.3%" },
];

// R4:46-52 (validation, frozen Platt and tau)
export const pooledVsOwn = {
  ownSaving: "49.8% [46.5%, 53.0%]",
  pooledSaving: "43.9% [40.6%, 47.0%]",
  ownMissed: "4.8%",
  pooledMissed: "3.4%",
  flipShare: "14.4%",
  flipCells: "523",
  cells: "3,631",
};

// R:123 (leaver sensitivity, test, frozen values)
export const leavers = { tauMain: 0.57, tauRechosen: 0.85, missed: "12.4%", ci: "9.4%–15.5%" };

// FV: frozen_val.sha256 (also test_results.json "_frozen_sha256")
export const frozenHash = "057f4389adbc0163a54205607947ec3515be62d8cd6ca09f1bbbb4353a847dce";

// R:219-228 (without the test-evaluation commands: the lock file blocks a second test run)
export const rerunCommands = [
  "python -m pytest aria_pace/tests",
  "python -m aria_pace.run_baselines",
  "python -m aria_pace.run_policy",
  "python -m aria_pace.freeze_val",
  "python -m aria_pace.report",
];
