export interface Metric {
  eyebrow: string;
  value: string;
  label: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  school: string;
  location: string;
}

// Every value here traces to a file in the aria.kls repository. Do not add a
// count that cannot be pointed to.
export const metrics: Metric[] = [
  {
    eyebrow: "Timing model · held-out test",
    value: "52%",
    label: "Fewer interruptions",
    description:
      "Under the quiet cost setting and the 3-correct-in-a-row mastery definition, ARIA-Pace intervened 52% less often than helping after every wrong step, and missed 3.7% of students who went on to get stuck (95% CI 2.2–5.3).",
  },
  {
    eyebrow: "Real students in the data",
    value: "4,163",
    label: "Students whose logs trained and tested the model",
    description:
      "We trained and tested the model using public, de-identified student logs. We did not collect any student data ourselves. We also ran a cross-dataset test, but its results will remain unpublished until the dataset terms are confirmed.",
  },
  {
    eyebrow: "Demo problem bank",
    value: "30",
    label: "Problems with answers re-derived in code",
    description:
      "The problem bank covers algebra, trigonometry, and calculus. A symbolic engine recomputes every answer when the bank loads and excludes any problem that fails the check.",
  },
  {
    eyebrow: "Classroom evidence",
    value: "Not yet",
    label: "Learning results",
    description:
      "No study with students has been run, so we are not claiming that ARIA improves learning, retention, transfer, or outcomes for any group of learners.",
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
