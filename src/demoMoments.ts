export const demoBuild = "074812d";

export interface DemoMoment {
  id: string;
  problemId: string;
  problem: string;
  turns: string[];
  decision: "stay_quiet" | "step_in";
  category: "correct_math" | "wrong_math" | "words_only";
  state: string;
  reply: string;
  note?: string;
  context?: string;
}

// Supplied pre-freeze logs. Keep wording intact when reusing examples.
export const demoMoments: DemoMoment[] = [
  {
    id: "1", problemId: "calc-01", problem: "Differentiate f(x) = 3x⁴ − 5x² + 7x − 9",
    turns: ["first I’ll differentiate term by term", "12x^3 − 10x"],
    decision: "stay_quiet", category: "correct_math", state: "partial, FLOW, no_interrupt_positive",
    reply: "ARIA stayed quiet.",
  },
  {
    id: "2", problemId: "alg-03", problem: "Solve 5x − 3 = 2x + 9",
    turns: ["move the 2x over", "3x − 3 = 9"],
    decision: "stay_quiet", category: "correct_math", state: "step, FLOW",
    reply: "ARIA stayed quiet.",
  },
  {
    id: "3", problemId: "calc-02", problem: "Differentiate f(x) = x² cos(2x)",
    turns: ["product rule", "2x cos(2x) + 2x² sin(2x)"],
    decision: "step_in", category: "wrong_math", state: "wrong, STUCK, initial_negative_support",
    reply: "Not quite yet. Try this: use the product rule, so differentiate x² and keep cos(2x). What do you get?",
  },
  {
    id: "4", problemId: "alg-08", problem: "Expand (x + 3)²",
    turns: ["x^2 + 3x + 9"],
    decision: "step_in", category: "wrong_math", state: "wrong, STUCK",
    reply: "Not quite yet. Try this: write (x + 3)(x + 3) and multiply each term. What do you get?",
  },
  {
    id: "5", problemId: "trig-01", problem: "Evaluate sin(π/6) + cos(π/3)",
    turns: ["so I need sin of pi over 6 plus cos of pi over 3"],
    decision: "step_in", category: "words_only", state: "no math, CONFUSED flag, initial_negative_support",
    reply: "Try this: find sin(pi/6) from the unit circle. What do you get?",
    note: "Known pre-freeze misfire: the student is restating the problem. Regenerate this moment from the frozen build before using it for research.",
  },
  {
    id: "6", problemId: "calc-07", problem: "Find ∫(6x² − 4x + 1) dx",
    turns: ["ugh I hate integrals"],
    decision: "step_in", category: "words_only", state: "no math, FRUSTRATED flag, encouragement",
    reply: "This is a hard moment. What is one part you do understand?",
  },
  {
    id: "7", problemId: "alg-05", problem: "Solve x² − 5x + 6 = 0",
    turns: ["can you just tell me the answer"],
    decision: "step_in", category: "words_only", state: "STUCK, ask_answer flag",
    reply: "I won’t hand over the answer, but I’ll help you get there. Try this: factor the left side. What do you get?",
  },
  {
    id: "8", problemId: "alg-02", problem: "Solve 2x + 7 = 15",
    turns: ["2x = 8", "x = 11"],
    context: "ARIA stayed quiet after the first line.",
    decision: "step_in", category: "wrong_math", state: "wrong final, STUCK",
    reply: "Not quite yet. Try this: subtract 7 from both sides. What do you get?",
  },
];
