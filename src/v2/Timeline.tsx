"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pill } from "./ui";

export interface Phase {
  n: number;
  status: "Complete" | "Current" | "Planned";
  title: string;
  body: string;
  href?: string;
  hrefLabel?: string;
}

/** Vertical timeline. The line draws itself as the section scrolls through the viewport and each node lights as
 *  the line reaches it. Server render, no-JS and reduced motion all show the finished timeline. */
export default function Timeline({ phases }: { phases: Phase[] }) {
  const ref = useRef<HTMLOListElement | null>(null);
  const [progress, setProgress] = useState(1);
  const [reached, setReached] = useState(phases.length);

  useEffect(() => {
    const list = ref.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = list.getBoundingClientRect();
      const lineY = window.innerHeight * 0.62;
      const p = Math.min(1, Math.max(0, (lineY - rect.top) / rect.height));
      setProgress(p);
      const nodes = Array.from(list.querySelectorAll<HTMLElement>("[data-node]"));
      let count = 0;
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top + 14 <= lineY) count += 1;
      });
      setReached(count);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ol className="tl" ref={ref} style={{ "--p": progress } as CSSProperties}>
      <li className="tl__rail" aria-hidden="true">
        <span className="tl__track" />
        <span className="tl__fill" />
      </li>
      {phases.map((phase, i) => {
        const current = phase.status === "Current";
        return (
          <li
            key={phase.n}
            className={`tl__item tl__item--${i % 2 === 0 ? "left" : "right"}${i < reached ? " is-on" : ""}${current ? " is-now" : ""}`}
            aria-current={current ? "step" : undefined}
          >
            <span className={`tl__node tl__node--${phase.status.toLowerCase()}`} data-node aria-hidden="true">
              <span className="tl__node-n tnum">{phase.n}</span>
            </span>
            <article className={`tl__card${current ? " tl__card--now" : ""}`}>
              <header>
                <span className="tl__phase tnum">Phase {phase.n}</span>
                <Pill status={phase.status} />
              </header>
              <h3>{phase.title}</h3>
              <p>{phase.body}</p>
              {phase.href && (
                <a className="textlink" href={phase.href}>
                  {phase.hrefLabel} <span aria-hidden="true">→</span>
                </a>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
