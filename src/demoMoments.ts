// Generated from data/teacher_moments.json in NarenS31/aria.kls (branch summit-activity). Student lines, problem text,
// ARIA's logged decision and reply are copied verbatim from that file; nothing here is rewritten or re-derived.
// Logged by the summit build: tag summit-2026-10-24, commit e09218c14242707cf6198efe7a3ae37b8382a1db
// (build.tutor_files_match_tag is true for all eight rows). The activity's design is four quiet moments (M1, M2, M4, M5)
// and four step-ins (M3, M6, M7, M8).
export const demoBuild = "summit-2026-10-24";
export const demoCommit = "e09218c";

export interface DemoMoment {
  id: string;
  problemId: string;
  problem: string;
  turns: string[];
  decision: "stay_quiet" | "step_in";
  category: "correct_math" | "wrong_math" | "words_only";
  verdict: string;
  state: string;
  reason: string;
  reply: string;
}

export const demoMoments: DemoMoment[] = [
  {
    id: "M1", problemId: "calc-01", problem: "Differentiate f(x) = 3x^4 - 5x^2 + 7x - 9",
    turns: ["first I'll differentiate term by term", "12x^3 - 10x"],
    decision: "stay_quiet", category: "correct_math",
    verdict: "partial", state: "FLOW", reason: "productive work: stay quiet",
    reply: "ARIA stayed quiet.",
  },
  {
    id: "M2", problemId: "alg-03", problem: "Solve for x: 5x - 3 = 2x + 9",
    turns: ["move the 2x over", "3x - 3 = 9"],
    decision: "stay_quiet", category: "correct_math",
    verdict: "step", state: "FLOW", reason: "productive work: stay quiet",
    reply: "ARIA stayed quiet.",
  },
  {
    id: "M3", problemId: "calc-02", problem: "Differentiate f(x) = x^2 cos(2x)",
    turns: ["product rule", "2x cos(2x) + 2x^2 sin(2x)"],
    decision: "step_in", category: "wrong_math",
    verdict: "wrong", state: "STUCK", reason: "student needs support: one small prompt",
    reply: "Not quite yet. Try this: use the product rule, so differentiate x^2 and keep cos(2x). What do you get?",
  },
  {
    id: "M4", problemId: "alg-05", problem: "Solve for x: x^2 - 5x + 6 = 0",
    turns: ["I think I'll try factoring first"],
    decision: "stay_quiet", category: "words_only",
    verdict: "none", state: "UNKNOWN", reason: "no reason to interrupt: stay quiet",
    reply: "ARIA stayed quiet.",
  },
  {
    id: "M5", problemId: "trig-01", problem: "Evaluate sin(pi/6) + cos(pi/3)",
    turns: ["so I need sin of pi over 6 plus cos of pi over 3"],
    decision: "stay_quiet", category: "words_only",
    verdict: "none", state: "UNKNOWN", reason: "no reason to interrupt: stay quiet",
    reply: "ARIA stayed quiet.",
  },
  {
    id: "M6", problemId: "calc-07", problem: "Find the integral of 6x^2 - 4x + 1 dx",
    turns: ["ugh I hate integrals"],
    decision: "step_in", category: "words_only",
    verdict: "none", state: "FRUSTRATED", reason: "student needs support: one small prompt",
    reply: "This is a hard moment. What is one part you do understand?",
  },
  {
    id: "M7", problemId: "alg-05", problem: "Solve for x: x^2 - 5x + 6 = 0",
    turns: ["can you just tell me the answer"],
    decision: "step_in", category: "words_only",
    verdict: "none", state: "STUCK", reason: "student needs support: one small prompt",
    reply: "I won't hand over the answer, but I'll help you get there. Try this: factor the left side. What do you get?",
  },
  {
    id: "M8", problemId: "alg-02", problem: "Solve for x: 2x + 7 = 15",
    turns: ["x = 11"],
    decision: "step_in", category: "wrong_math",
    verdict: "wrong", state: "STUCK", reason: "student needs support: one small prompt",
    reply: "Not quite yet. Try this: subtract 7 from both sides. What do you get?",
  },
];

export function momentById(id: string): DemoMoment {
  const found = demoMoments.find((moment) => moment.id === id);
  if (!found) throw new Error(`Unknown demo moment ${id}`);
  return found;
}
