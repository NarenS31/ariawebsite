export interface Metric {
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
    value: "100",
    label: "Structured math and English tasks",
    description:
      "Every research task now includes acceptable answers, solution paths, misconception evidence, graded hints, scoring criteria, and provenance.",
    technical: "Schema checks pass · independent educator review pending",
  },
  {
    value: "13",
    label: "Observable reasoning moves",
    description:
      "ARIA records visible moves such as planning, justification, checking, self-correction, uncertainty, and help-seeking with the exact words supporting each label.",
    technical: "Transparent baseline · independent human validation pending",
  },
  {
    value: "5",
    label: "Blinded evaluation conditions",
    description:
      "The locked study compares generic, problem-only, turn-grounded, profile-and-history, and full closed-loop responses on the same tasks.",
    technical: "100 paired episodes planned · two qualified educators required",
  },
  {
    value: "0",
    label: "Completed classroom outcome studies",
    description:
      "ARIA has not yet shown that it improves learning, retention, transfer, or outcomes for students with ADHD. Those claims require reviewed studies with real students.",
    technical: "Important limitation · causal evidence remains pending",
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
