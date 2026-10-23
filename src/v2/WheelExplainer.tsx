"use client";

import { useEffect, useState } from "react";
import { replies, settings, timeline, type SettingId } from "./paceData";

// Stages: 0 = two right steps, then 1..4 = tries 3..6 (wrong), with the real stuck-risk values from the poster example.
const wrongTries = timeline.tries.filter((t) => t.risk !== null);
const LAST = wrongTries.length; // stage index of the final frame
const STEP_MS = 1700;
const HOLD_MS = 3200;

const order: SettingId[] = ["quiet", "balanced", "supportive"];

function riskAt(stage: number): number | null {
  return stage === 0 ? null : wrongTries[stage - 1].risk;
}

function crossed(stage: number, id: SettingId): boolean {
  if (stage === 0) return false;
  const setting = settings.find((s) => s.id === id)!;
  return (riskAt(stage) ?? 0) >= setting.threshold;
}

export default function WheelExplainer() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) {
        setPlaying(false);
        setStage(LAST); // static final frame
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!playing || reduced) return;
    const id = window.setTimeout(() => setStage((s) => (s >= LAST ? 0 : s + 1)), stage === LAST ? HOLD_MS : STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, reduced, stage]);

  const risk = riskAt(stage);
  const tryNumber = stage === 0 ? 2 : timeline.tries[stage + 1].n;
  const spin = stage === 0 ? "roll" : `spin${stage}`;
  const quietCrossed = crossed(stage, "quiet");

  return (
    <figure className="we" aria-label="Animated explainer: stuck risk rises with each wrong try, and each setting gives its first hint at a different point">
      <figcaption className="we__head">
        <span className="we__eyebrow">Same student, same wrong answers</span>
        <strong>{replies.problem}</strong>
      </figcaption>

      <div className="we__tries" role="group" aria-label="Jump to a try">
        {timeline.tries.map((t, i) => {
          const shown = i <= (stage === 0 ? 1 : stage + 1);
          return (
            <button
              key={t.n}
              type="button"
              aria-pressed={i === (stage === 0 ? 1 : stage + 1)}
              className={`we__try we__try--${t.answer}${shown ? " is-shown" : ""}${i === (stage === 0 ? 1 : stage + 1) ? " is-now" : ""}`}
              onClick={() => {
                setPlaying(false);
                setStage(i < 2 ? 0 : i - 1);
              }}
            >
              <span>Try {t.n}</span>
              <b>{shown ? (t.answer === "right" ? "right" : replies.wrongAnswer) : " "}</b>
            </button>
          );
        })}
      </div>

      <div className="we__stage">
        <div className={`we__wheel we__wheel--${spin}`} aria-hidden="true">
          <svg viewBox="0 0 160 130" width="100%" height="100%">
            <path className="we__ground" d="M6 112H154" />
            <ellipse className="we__rut" cx="80" cy="113" rx={stage === 0 ? 0 : 14 + stage * 7} ry={stage === 0 ? 0 : 2 + stage * 1.6} />
            <g className="we__wheel-rot">
              <circle cx="80" cy="64" r="44" className="we__rim" />
              {[0, 60, 120].map((deg) => (
                <line key={deg} x1="80" y1="22" x2="80" y2="106" className="we__spoke" transform={`rotate(${deg} 80 64)`} />
              ))}
              <circle cx="80" cy="64" r="9" className="we__hub" />
              <circle cx="80" cy="26" r="4" className="we__mark" />
            </g>
            <g className="we__dust">
              {stage > 0 && <path d="M30 104q-9-4-16-1M32 98q-10-7-20-6M128 104q9-4 16-1M126 98q10-7 20-6" />}
            </g>
          </svg>
          <span className="we__wheel-cap">{stage === 0 ? "Moving along" : "Spinning its wheels"}</span>
        </div>

        <div className="we__meter" aria-hidden="true">
          <div className="we__meter-top">
            <span>Stuck risk</span>
            <b className="tnum">{risk === null ? "–" : `${risk}%`}</b>
          </div>
          <div className="we__track">
            <div className="we__fill" style={{ width: `${risk ?? 0}%` }} />
            {order.map((id) => {
              const s = settings.find((x) => x.id === id)!;
              return (
                <span
                  key={id}
                  className={`we__tick we__tick--${id}${crossed(stage, id) ? " is-hit" : ""}`}
                  style={{ left: `${s.threshold}%` }}
                >
                  <i />
                  <em>
                    {s.name} {s.threshold}%
                  </em>
                </span>
              );
            })}
          </div>
          <p className="we__legend">
            {risk === null ? "Right steps: no hint needed." : `Chance of not mastering within 10 tries, after try ${tryNumber}.`}
          </p>
        </div>
      </div>

      <ul className="we__rings" aria-hidden="true">
        {order.map((id) => {
          const s = settings.find((x) => x.id === id)!;
          const hit = crossed(stage, id);
          return (
            <li key={id} className={`we__ring-card${hit ? " is-hit" : ""}`}>
              <span className="we__ring" />
              <div>
                <b>{s.name}</b>
                <small>{hit ? `First hint at try ${timeline.firstHint[id]}` : `Waits for ${s.threshold}%`}</small>
              </div>
              <span className="we__badge">{hit ? "Stepping in" : "Watching"}</span>
            </li>
          );
        })}
      </ul>

      <div className="we__replies" aria-hidden="true">
        <blockquote className={`we__reply${stage >= 1 ? " is-on" : ""}${quietCrossed ? " is-done" : ""}`}>
          <span>Quiet · {quietCrossed ? "stepping in at try 6" : "Watching"}</span>
          {quietCrossed ? "The risk is over Quiet’s 57% bar, so its first hint comes now." : replies.quietHolds}
        </blockquote>
        <blockquote className={`we__reply we__reply--hint${stage >= 1 ? " is-on" : ""}`}>
          <span>Supportive · Stepping in</span>
          {replies.supportiveHints}
        </blockquote>
      </div>

      <p className="sr-only">
        With the real example values: after the third try the stuck risk is 15%, then 25%, 46% and 70% at tries 4, 5 and 6.
        Supportive gives its first hint at try 3, Balanced at try 4 and Quiet at try 6. When Quiet holds the hint it says:
        {" " + replies.quietHolds} When Supportive hints it says: {replies.supportiveHints}
      </p>

      {!reduced && (
        <div className="we__controls">
          <button type="button" className="we__btn" aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>
            <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span> {playing ? "Pause" : "Play"} animation
          </button>
          <span className="we__note">Values from the poster example: ASSISTments 2009–10 replay.</span>
        </div>
      )}
    </figure>
  );
}
