"use client";

import { useRef, useState, type FormEvent } from "react";

import { demoMoments as moments } from "./demoMoments";

const choices = [
  {value: "stay_quiet", label: "Stay quiet"},
  {value: "step_in", label: "Step in"},
  {value: "unsure", label: "Not sure"},
  {value: "skip", label: "Skip"},
];
const shareable = ["step_in", "stay_quiet"];
const roles = ["Teacher", "Researcher", "Student", "Parent", "Other"];

type ShareStatus = "idle" | "sending" | "done" | "error";

function newSessionId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

export default function TeacherActivity() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [shareRole, setShareRole] = useState("");
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<ShareStatus>("idle");
  const [error, setError] = useState("");
  const sessionId = useRef("");
  const startedAt = useRef(0);
  const moment = moments[answers.length];

  function start() {
    sessionId.current = newSessionId();
    startedAt.current = performance.now();
    setStarted(true);
  }

  async function share(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "done") return;
    const v = new FormData(event.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/activity", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          sessionId: sessionId.current,
          answers: moments.map((item, index) => ({moment: item.id, choice: answers[index]})),
          role: shareRole,
          consent: agree,
          hp: v.get("hp"),
          elapsedMs: Math.round(performance.now() - startedAt.current),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
        return;
      }
      setError(data.error ?? "Something went wrong. Your answers were not shared. Please try again.");
      setStatus("error");
    } catch {
      setError("Could not reach the server. Your answers were not shared. Please try again.");
      setStatus("error");
    }
  }

  if (!started) return <section className="methodology-section">
    <h2>Before you begin.</h2>
    <p>This activity presents eight student moments and takes about two minutes. Decide whether you would help at the final line shown. ARIA’s logged decisions stay hidden until you finish. This is your judgment, not a test with a correct score.</p>
    <p>Your answers stay in your browser unless you choose to share them. At the end you can share your eight choices with the ARIA team, anonymously. We never ask for your name or email here.</p>
    <button className="btn btn--ink" type="button" onClick={start}>Start eight moments <span aria-hidden="true">→</span></button>
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
    <p>Your answers stay in your browser unless you choose to share them. <a href="/">Leave the activity</a></p>
  </section>;

  const complete = answers.every(answer => shareable.includes(answer));
  const unclear = answers.filter(answer => !shareable.includes(answer)).length;

  return <section className="methodology-section">
    <h2>Eight moments complete.</h2>
    <p>You answered {answers.filter(answer => answer !== "skip").length} moments. {status === "done" ? "Your answers were shared anonymously." : "Your answers stay in your browser unless you choose to share them."}</p>
    <div className="activity-choices"><button className="btn btn--ink" type="button" onClick={() => setRevealed(true)}>See ARIA’s logged decisions</button></div>
    {revealed && <div className="activity-reveals">{moments.map((item, index) => <article key={item.id}><h3>{item.id}. {item.problem}</h3><p><strong>Your decision:</strong> {choices.find(choice => choice.value === answers[index])?.label}</p><p><strong>ARIA:</strong> {item.decision === "stay_quiet" ? "Stayed quiet" : "Stepped in"}</p><blockquote>{item.reply}</blockquote><small>Logged: {item.verdict} · {item.state} · {item.reason}</small></article>)}</div>}
    <p>In these eight moments ARIA stays quiet {moments.filter(item => item.decision === "stay_quiet").length} times (on {moments.filter(item => item.category === "correct_math").length} correct steps and {moments.filter(item => item.decision === "stay_quiet" && item.category === "words_only").length} students planning in words) and steps in {moments.filter(item => item.decision === "step_in").length} times (on {moments.filter(item => item.category === "wrong_math").length} verified wrong answers and {moments.filter(item => item.decision === "step_in" && item.category === "words_only").length} messages with no math: frustration, and a request for the answer). It never stays quiet on a verified wrong step. These are chosen examples, not a representative sample of classroom behavior.</p>
    {revealed && <>
      <div className="activity-share" aria-labelledby="share-title">
        <h3 id="share-title">Share your answers with the ARIA team?</h3>
        <p>We’ll see how people judge hint timing compared with ARIA. Your 8 choices are shared anonymously. No name or email.</p>
        {status === "done" ? <p role="status"><strong>Thanks, your answers were shared.</strong></p>
          : !complete ? <p role="status">You marked {unclear} {unclear === 1 ? "moment" : "moments"} “Not sure” or “Skip”, so there isn’t a full set of eight Step in / Stay quiet choices to share. Nothing was sent.</p>
          : <form onSubmit={share}>
            <label>I am a… (optional)<select value={shareRole} onChange={event => setShareRole(event.target.value)}><option value="">Prefer not to say</option>{roles.map(r => <option key={r}>{r}</option>)}</select></label>
            <div aria-hidden="true" style={{position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden"}}>
              <label>Leave this field empty<input name="hp" tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore /></label>
            </div>
            <label className="consent-check"><input type="checkbox" checked={agree} onChange={event => setAgree(event.target.checked)} required />I agree to share my answers anonymously</label>
            {error && <p role="alert">{error}</p>}
            <button className="btn btn--ink" type="submit" disabled={!agree || status === "sending"}>{status === "sending" ? "Sharing…" : "Share my answers"}</button>
            <p><small>What is collected: your eight choices, the role if you pick one, and the time. <a href="/privacy">Privacy and data</a></small></p>
          </form>}
      </div>
      <div className="activity-join">
        <h3>Help shape how tutors support students.</h3>
        <p>We’re two students planning a classroom study on when a tutor should step in. If you teach, research, or care about how kids learn math, we’d love your help.</p>
        <a className="btn btn--pear" href="/join">Join ARIA <span aria-hidden="true">→</span></a>
      </div>
    </>}
  </section>;
}
