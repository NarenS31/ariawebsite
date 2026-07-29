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
  technical: string;
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
      "Before attempting any problem, students type or speak their reasoning out loud. ARIA studies hesitations, false starts, and moments of confusion, not only the final answer.",
  },
  {
    number: "02",
    title: "Cognitive State Detection",
    icon: "signal",
    description:
      "A language model trained on 3,507 simulated think-aloud examples detects seven thinking states in real time. In early testing, it identified the correct state in 8 out of 10 examples.",
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
      "ARIA tracks whether students begin using planning and self-checking strategies without being prompted. This is the central long-term research question.",
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
      "Typing speed, pause duration, keystroke timing, and backspace rate complement language signals with features that depend on student behavior, not generator style.",
  },
];

export const metrics: Metric[] = [
  {
    value: "8 in 10",
    label: "Thinking states identified correctly",
    description:
      "In the early test, ARIA correctly recognized what a student was experiencing in 80% of examples.",
    technical: "80.0% accuracy across 350 test examples",
  },
  {
    value: "80 / 100",
    label: "Consistent across seven different states",
    description:
      "ARIA performed reliably across planning, flow, confusion, rushing, frustration, being stuck, and insight.",
    technical: "Macro-F1: 0.796",
  },
  {
    value: "89 / 100",
    label: "Recognized independent strategy use",
    description:
      "ARIA showed strong early performance at noticing when students used a thinking strategy without being prompted.",
    technical: "Transfer-detection F1: 0.886",
  },
  {
    value: "19 points",
    label: "Performance dropped on unfamiliar writing",
    description:
      "When the wording came from a different AI generator, accuracy fell. This is an important limitation we are actively addressing.",
    technical: "Mean cross-generator accuracy gap: 19.0 points",
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
    name: "Karthik Malireddy",
    role: "Student Researcher",
    school: "Senior, Marvin Ridge High School",
    location: "Waxhaw, North Carolina",
  },
];
