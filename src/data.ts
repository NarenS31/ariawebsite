export type CognitiveState =
  | "Planning"
  | "Flow"
  | "Confused"
  | "Rushing"
  | "Frustrated"
  | "Stuck"
  | "Insight";

export interface Feature {
  number: string;
  title: string;
  description: string;
  icon: "speech" | "signal" | "question" | "trend" | "lock" | "keyboard";
}

export interface Metric {
  value: string;
  label: string;
  description: string;
}

export interface StateResult {
  state: CognitiveState;
  f1: string;
  recall: string;
  precision: string;
}

export interface TeamMember {
  name: string;
  role: string;
  school: string;
  location: string;
}

export const cognitiveStates: CognitiveState[] = [
  "Planning",
  "Flow",
  "Confused",
  "Rushing",
  "Frustrated",
  "Stuck",
  "Insight",
];

export const features: Feature[] = [
  {
    number: "01",
    title: "Think-Aloud Protocol",
    icon: "speech",
    description:
      "Before attempting any problem, students type or speak their reasoning out loud. ARIA studies hesitations, false starts, and moments of confusion—not only the final answer.",
  },
  {
    number: "02",
    title: "Cognitive State Detection",
    icon: "signal",
    description:
      "A natural-language classifier trained on 3,507 synthetic think-aloud samples detects seven cognitive states in real time. Accuracy: 80.0%; macro-F1: 0.796.",
  },
  {
    number: "03",
    title: "Metacognitive Intervention",
    icon: "question",
    description:
      "Instead of answering, ARIA asks one targeted question. A rushing student articulates a plan; a stuck student receives the smallest question that can restart progress.",
  },
  {
    number: "04",
    title: "Transfer Detection",
    icon: "trend",
    description:
      "ARIA tracks whether students begin self-initiating metacognitive behaviors without prompting—the core longitudinal research question. Transfer F1: 0.886.",
  },
  {
    number: "05",
    title: "Privacy by Architecture",
    icon: "lock",
    description:
      "On-device inference keeps student data on the machine. Privacy is enforced by the architecture itself, with school environments and FERPA requirements in mind.",
  },
  {
    number: "06",
    title: "Behavioral Fusion",
    icon: "keyboard",
    description:
      "Typing speed, pause duration, keystroke timing, and backspace rate complement language signals with features that depend on student behavior—not generator style.",
  },
];

export const metrics: Metric[] = [
  {
    value: "80.0%",
    label: "State Detection Accuracy",
    description: "350 held-out samples · 7 states · 3 ADHD profiles · 10 subjects",
  },
  {
    value: "0.796",
    label: "Macro-F1",
    description: "Balanced evaluation across all seven cognitive states",
  },
  {
    value: "0.886",
    label: "Transfer Detection F1",
    description: "Detecting self-initiated metacognition without prompting",
  },
  {
    value: "19.0 pts",
    label: "Cross-Generator Gap",
    description: "Mean accuracy drop on unseen language-model generators",
  },
];

export const stateResults: StateResult[] = [
  { state: "Planning", f1: "0.796", recall: "0.820", precision: "0.774" },
  { state: "Flow", f1: "0.578", recall: "0.480", precision: "0.727" },
  { state: "Confused", f1: "0.732", recall: "0.820", precision: "0.661" },
  { state: "Rushing", f1: "0.882", recall: "0.820", precision: "0.953" },
  { state: "Frustrated", f1: "0.870", recall: "0.940", precision: "0.810" },
  { state: "Stuck", f1: "0.851", recall: "0.740", precision: "1.000" },
  { state: "Insight", f1: "0.860", recall: "0.980", precision: "0.766" },
];

export const team: TeamMember[] = [
  {
    name: "Naren Saravanan",
    role: "Student Researcher",
    school: "Senior, Marvin Ridge High School",
    location: "Waxhaw, North Carolina",
  },
  {
    name: "Karthick Mallireddy",
    role: "Student Researcher",
    school: "Senior, Marvin Ridge High School",
    location: "Waxhaw, North Carolina",
  },
];
