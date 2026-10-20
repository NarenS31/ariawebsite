"use client";

import { useId, useState } from "react";
import { demoBuild, momentById } from "./demoMoments";

const examples = [
  {
    label: "Making progress",
    moment: momentById("M2"),
    status: "Watching",
    explanation: "The step is valid. The student can keep working.",
  },
  {
    label: "A wrong step",
    moment: momentById("M3"),
    status: "Small hint",
    explanation: "A verified error triggers a prompt about the next step.",
  },
  {
    label: "Asking for help",
    moment: momentById("M7"),
    status: "Guided help",
    explanation: "An explicit help request gets guidance while the student keeps the work.",
  },
];

export default function MathPreview() {
  const [active, setActive] = useState(0);
  const id = useId();
  const example = examples[active];
  return <div className="math-preview">
    <div className="math-preview__heading"><strong>One step. The right amount of support.</strong><span>Logged examples · summit build {demoBuild}</span></div>
    <div className="math-preview__tabs" role="group" aria-label="Choose a tutoring example">
      {examples.map((item, index) => <button type="button" key={item.label} aria-pressed={active === index} aria-controls={id} onClick={() => setActive(index)}>{item.label}</button>)}
    </div>
    <div className="math-preview__work" id={id} aria-live="polite">
      <div className="math-preview__student">
        <p className="kicker">Student workspace</p>
        <h2>{example.moment.problem}</h2>
        <span className="math-preview__step-label">Latest student step</span>
        <p className="math-preview__equation">{example.moment.turns[example.moment.turns.length - 1]}</p>
        <span className="math-preview__check">{active === 0 ? "Valid intermediate step" : active === 1 ? "Mathematical error detected" : "Explicit request for an answer"}</span>
      </div>
      <div className="math-preview__support">
        <div className="math-preview__support-title"><img src="/aria-symbol.svg" width="32" height="32" alt="" /><div><strong>ARIA</strong><span>{example.status}</span></div></div>
        <p className="math-preview__reply">{example.moment.reply}</p>
        <p className="math-preview__reason">{example.explanation}</p>
      </div>
    </div>
    <div className="math-preview__footer"><span>Decisions logged by the summit build. Not a live tutoring session.</span><a href="/activity">Try eight student moments →</a></div>
  </div>;
}
