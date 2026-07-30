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
    value: "100",
    label: "Problems ready for review",
    description:
      "The math and English bank includes answer guides, solution paths, common mistakes, hints, and scoring notes.",
    technical: "Built and checked in code · educator review is next",
  },
  {
    eyebrow: "Student language",
    value: "13",
    label: "Ways students show their thinking",
    description:
      "ARIA can mark planning, checking, self-correction, uncertainty, and help-seeking while showing the exact words behind the label.",
    technical: "Working in the product · human annotation is next",
  },
  {
    eyebrow: "Comparison study",
    value: "5",
    label: "Versions of the system to compare",
    description:
      "The same student moments will be tested with generic help, problem context, current reasoning, learning history, and the full ARIA pipeline.",
    technical: "Study designed · independent educator ratings are next",
  },
  {
    eyebrow: "Classroom evidence",
    value: "Not yet",
    label: "Learning results",
    description:
      "We have not run a classroom study, so we are not claiming that ARIA improves learning, retention, transfer, or ADHD outcomes.",
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
