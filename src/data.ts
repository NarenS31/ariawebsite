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

// Every value here traces to a file in the aria.kls repository. Do not add a
// count that cannot be pointed to.
export const metrics: Metric[] = [
  {
    eyebrow: "Timing model · held-out test",
    value: "52%",
    label: "Fewer interruptions",
    description:
      "Under the quiet cost setting, ARIA-Pace intervened 52% less often than helping after every wrong step, and missed 3.7% of students who went on to get stuck (95% CI 2.2–5.3).",
    technical: "ASSISTments 2009–10 · 597 test students · evaluated once, then locked",
  },
  {
    eyebrow: "Real students in the data",
    value: "4,163",
    label: "Students whose logs trained and tested the model",
    description:
      "Public, de-identified logs. No student data was collected by us. A second file of 46,674 students was used for a cross-dataset test, run once on a locked split; its numbers are held until the dataset terms are confirmed.",
    technical: "Split by student · train 2,498 · validation 833 · test 832",
  },
  {
    eyebrow: "Demo problem bank",
    value: "30",
    label: "Problems with answers re-derived in code",
    description:
      "Algebra, trigonometry, and calculus. Every answer is recomputed by a symbolic engine when the bank loads; a problem that fails the check does not load.",
    technical: "8 featured for the summit demo · educator review is next",
  },
  {
    eyebrow: "Classroom evidence",
    value: "Not yet",
    label: "Learning results",
    description:
      "No study with students has been run, so we are not claiming that ARIA improves learning, retention, transfer, or outcomes for any group of learners.",
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
