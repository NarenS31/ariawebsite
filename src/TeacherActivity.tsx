"use client";

import { useState } from "react";

import { demoBuild as build, demoMoments as moments } from "./demoMoments";

const choices = [
  {value: "stay_quiet", label: "Stay quiet"},
  {value: "step_in", label: "Step in"},
  {value: "unsure", label: "Not sure"},
  {value: "skip", label: "Skip"},
];

export default function TeacherActivity() {
  const [started, setStarted] = useState(false);
  const [role, setRole] = useState("");
  const [years, setYears] = useState("");
  const [grade, setGrade] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const moment = moments[answers.length];

  function download() {
    const rows = [
      ["dataset_version", "build", "moment", "problem_id", "signal_category", "teacher_decision", "aria_decision", "role", "years_teaching", "grade_band"],
      ...moments.map((item, index) => ["preview-not-research", build, item.id, item.problemId, item.category, answers[index], item.decision, role, years, grade]),
    ];
    const csv = rows.map(row => row.map(value => `"${value.replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], {type: "text/csv;charset=utf-8"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = `aria-teacher-preview-${build}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }

  if (!started) return <section className="methodology-section">
    <h2>Before you begin.</h2>
    <p>Eight student moments, about two minutes. Decide whether you would help at the final line shown. ARIA’s logged decisions stay hidden until you finish. This is your judgment, not a test with a correct score.</p>
    <details className="consent-draft"><summary>Draft consent · not yet reviewed by an adult (a teacher or the organizers)</summary><p><strong>Draft.</strong> In this version your answers stay in your browser and nothing is sent. This two-minute activity asks when you would step in to help a student working on a math problem. We do not collect names or emails. We ask only your role, years teaching, and grade band, and you can leave any of those blank. You can skip at any point. If responses are ever collected for research, this text will be rewritten and reviewed first.</p></details>
    <p><strong>Preview only:</strong> research collection is not open. Nothing is uploaded or submitted. You may download your responses for your own use; sharing or research use requires the final approved process.</p>
    <div className="field-grid">
      <label>Role (optional)<select value={role} onChange={event => setRole(event.target.value)}><option value="">Leave blank</option><option>Teacher</option><option>School leader</option><option>Researcher</option><option>Tutor</option><option>Other</option></select></label>
      <label>Years teaching (optional)<input type="number" min="0" max="80" step="1" value={years} onChange={event => setYears(event.target.value)} /></label>
      <label>Grade band (optional)<select value={grade} onChange={event => setGrade(event.target.value)}><option value="">Leave blank</option><option>Elementary</option><option>Middle school</option><option>High school</option><option>Higher education</option><option>Multiple grade bands</option></select></label>
    </div>
    <label className="consent-check"><input type="checkbox" checked={acknowledged} onChange={event => setAcknowledged(event.target.checked)} />I understand this is a local preview and nothing will be submitted.</label>
    <button className="btn btn--ink" type="button" disabled={!acknowledged || (years !== "" && (!Number.isInteger(Number(years)) || Number(years) < 0 || Number(years) > 80))} onClick={() => setStarted(true)}>Start eight moments <span aria-hidden="true">→</span></button>
    <p><a href="/privacy">Privacy and data</a></p>
  </section>;

  if (moment) return <section className="methodology-section activity-workspace" aria-labelledby="moment-title">
    <div className="activity-progress" aria-live="polite">Moment {answers.length + 1} of {moments.length}</div>
    <progress value={answers.length} max={moments.length} aria-label="Moments answered" />
    <h2 id="moment-title">{moment.problem}</h2>
    <p className="kicker">Student’s work, in order</p>
    <ol className="activity-turns">{moment.turns.map((turn, index) => <li key={index}>{turn}</li>)}</ol>
    <h3>Would you step in now?</h3>
    <div className="activity-choices" role="group" aria-label="Your intervention decision">{choices.map(choice => <button className="btn" key={choice.value} type="button" onClick={() => setAnswers(current => [...current, choice.value])}>{choice.label}</button>)}</div>
    <p>Your responses stay in this browser tab. <a href="/">Leave the activity</a></p>
  </section>;

  return <section className="methodology-section">
    <h2>Eight moments complete.</h2>
    <p>You answered {answers.filter(answer => answer !== "skip").length} moments. Nothing has been sent to ARIA.</p>
    <div className="activity-choices"><button className="btn btn--ink" type="button" onClick={() => setRevealed(true)}>See ARIA’s logged decisions</button><button className="btn btn--pear" type="button" onClick={download}>Download preview CSV <span aria-hidden="true">↓</span></button></div>
    {downloaded && <p role="status">Your preview CSV is ready. It is labeled “preview-not-research” and has not been uploaded.</p>}
    {revealed && <div className="activity-reveals">{moments.map((item, index) => <article key={item.id}><h3>{item.id}. {item.problem}</h3><p><strong>Your decision:</strong> {choices.find(choice => choice.value === answers[index])?.label}</p><p><strong>ARIA:</strong> {item.decision === "stay_quiet" ? "Stayed quiet" : "Stepped in"}</p><blockquote>{item.reply}</blockquote><small>Logged: {item.verdict} · {item.state} · {item.reason}</small></article>)}</div>}
    <p>In these eight moments ARIA stays quiet {moments.filter(item => item.decision === "stay_quiet").length} times (on {moments.filter(item => item.category === "correct_math").length} correct steps and {moments.filter(item => item.decision === "stay_quiet" && item.category === "words_only").length} students planning in words) and steps in {moments.filter(item => item.decision === "step_in").length} times (on {moments.filter(item => item.category === "wrong_math").length} verified wrong answers and {moments.filter(item => item.decision === "step_in" && item.category === "words_only").length} messages with no math: frustration, and a request for the answer). It never stays quiet on a verified wrong step. These are chosen examples, not a representative sample of classroom behavior.</p>
  </section>;
}
