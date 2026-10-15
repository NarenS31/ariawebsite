export interface Metric {
  eyebrow: string;
  value: string;
  label: string;
  description: string;
  technical: string;
}

export interface TeamMember {
  name: string;
  role: string;
  school: string;
  location: string;
}

export const metrics: Metric[] = [
  {
    eyebrow: "Task bank",
    value: "30",
    label: "Demo problems",
    description:
      "Each answer is re-derived by a symbolic engine, across algebra, trigonometry and calculus.",
    technical: "data/demo_problems.json · educator review is next",
  },
  {
    eyebrow: "Scripted safety check",
    value: "0",
    label: "Answer leaks",
    description:
      "In scripted harness runs, no reply revealed an answer and no reply contained a false mathematical claim.",
    technical: "Scripted test, not real students",
  },
  {
    eyebrow: "Offline replay",
    value: "52%",
    label: "Fewer interventions than always-helping",
    description:
      "In ASSISTments log replay, when interruptions cost three times as much as delayed help. Missed help opportunities: 3.7% (95% CI 2.2–5.3%). The saving disappears when delayed help is weighted more.",
    technical: "Supplied project summary · replay artifacts not independently verified · not a classroom study",
  },
  {
    eyebrow: "Classroom evidence",
    value: "Not yet",
    label: "Learning results",
    description:
      "We have not run a classroom study, so we are not claiming that ARIA improves learning, retention, or transfer.",
    technical: "A reviewed student study is still required",
  },
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
