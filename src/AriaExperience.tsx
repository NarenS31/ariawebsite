"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useId, useState, type ReactNode } from "react";
import { metrics, stateResults, team } from "./data";

const summitTicketsUrl =
  "https://www.eventbrite.com/e/ai-in-education-summit-2026-khan-lab-school-tickets-1988581168807?aff=oddtdtcreator";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Founders", href: "#founders" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Early results", href: "#research" },
] as const;

const thoughtStates = {
  confused: {
    label: "Confused",
    student: "I know I have seen this before, but I cannot tell which step comes next.",
    aria: "What part still feels clear? Start there, then name the first point where the path gets fuzzy.",
    signal: "Uncertainty + stalled next step",
  },
  rushing: {
    label: "Rushing",
    student: "I think it is 72. I just multiplied everything quickly.",
    aria: "Before calculating again, what is the problem asking you to find?",
    signal: "Fast answer + no stated plan",
  },
  stuck: {
    label: "Stuck",
    student: "I have tried twice. I do not know what else to do.",
    aria: "What is the smallest piece of the problem you can explain with confidence?",
    signal: "Repeated attempt + no new strategy",
  },
} as const;

type ThoughtState = keyof typeof thoughtStates;

const workflow = [
  {
    number: "1.0",
    verb: "Notice",
    title: "The student thinks out loud.",
    body: "Words, revisions, pauses, and typing rhythm reveal more than a final answer can. ARIA pays attention to the learning process while the student works.",
    detail: "The work stays on the device.",
    tone: "pear",
  },
  {
    number: "2.0",
    verb: "Interpret",
    title: "ARIA estimates the thinking state.",
    body: "The system looks for seven states: planning, flow, confusion, rushing, frustration, being stuck, and insight. It shows its evidence instead of pretending certainty.",
    detail: "A state is a useful hypothesis, not a diagnosis.",
    tone: "cyan",
  },
  {
    number: "3.0",
    verb: "Ask",
    title: "One question interrupts the pattern.",
    body: "ARIA does not hand over the solution. It chooses a short Socratic prompt that helps the student plan, check, recover, or reflect.",
    detail: "The student keeps ownership of the work.",
    tone: "coral",
  },
  {
    number: "4.0",
    verb: "Transfer",
    title: "The prompt should become unnecessary.",
    body: "Over time, ARIA looks for the student to begin planning and self-checking independently. That transfer, not more time with an AI, is the long-term research goal.",
    detail: "Success means ARIA can step back.",
    tone: "mint",
  },
] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CharacterMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`aria-character${small ? " aria-character--small" : ""}`} aria-hidden="true">
      <span className="aria-character__spark" />
      <span className="aria-character__face">
        <i />
        <i />
        <b />
      </span>
      <span className="aria-character__thought aria-character__thought--one" />
      <span className="aria-character__thought aria-character__thought--two" />
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 84);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`site-header${compact ? " site-header--compact" : ""}`}>
      <a className="summit-banner" href="#summit">
        <span>ARIA is presenting at the Khan Lab School AI in Education Summit</span>
        <strong>October 24 · Mountain View</strong>
      </a>
      <div className="site-nav shell">
        <a className="wordmark" href="#home" aria-label="ARIA home">
          <CharacterMark small />
          <span>ARIA</span>
          <small>Research Initiative</small>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#join">
          Join the research
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
            <a href="#join" onClick={() => setOpen(false)}>
              <span>05</span>
              Join the research
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThoughtPlayground() {
  const [active, setActive] = useState<ThoughtState>("confused");
  const panelId = useId();
  const current = thoughtStates[active];

  return (
    <div className="thought-playground">
      <div className="playground-top">
        <span className="live-label">Thinking-state example</span>
        <span>Tap a state to change ARIA’s question</span>
      </div>
      <div className="state-tabs" role="tablist" aria-label="Student thinking states">
        {(Object.keys(thoughtStates) as ThoughtState[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            aria-controls={panelId}
            onClick={() => setActive(key)}
          >
            {thoughtStates[key].label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className="thought-panel"
          id={panelId}
          role="tabpanel"
          key={active}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          <div className="student-bubble">
            <span>Student says</span>
            <p>“{current.student}”</p>
          </div>
          <div className="signal-line" aria-label={`Signal: ${current.signal}`}>
            <span>{current.signal}</span>
            <b aria-hidden="true">→</b>
          </div>
          <div className="aria-bubble">
            <div>
              <CharacterMark small />
              <span>ARIA asks</span>
            </div>
            <p>“{current.aria}”</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="playground-note">
        A teaching concept, not a diagnostic tool. ARIA’s state estimate is always uncertain and
        should remain visible to the learner.
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="shell hero-layout">
        <div className="hero-copy">
          <Reveal>
            <p className="kicker">Independent research in metacognition</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1>
              What if a learning tool noticed <span className="highlight">how you think?</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="hero-lede">
              ARIA studies a student’s reasoning, not just the final answer, then asks one useful
              question to help them plan, recover, or check their work.
            </p>
          </Reveal>
          <Reveal className="hero-actions" delay={0.18}>
            <a className="btn btn--pear" href="#about">
              Why we are building it <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#research">
              See the early evidence <span aria-hidden="true">→</span>
            </a>
          </Reveal>
          <Reveal className="hero-trust" delay={0.24}>
            <span>On-device by design</span>
            <span>Answers stay with the student</span>
            <span>Early research, not a finished claim</span>
          </Reveal>
        </div>
        <Reveal className="hero-demo" delay={0.14}>
          <CharacterMark />
          <ThoughtPlayground />
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="idea-section section" id="about">
      <div className="shell idea-layout">
        <div className="idea-statement">
          <p className="kicker">About ARIA</p>
          <h2>
            Built from personal experience with ADHD and research into today’s learning tools.
            <span>We are studying how technology can strengthen independent thinking.</span>
          </h2>
        </div>
        <div className="idea-notes">
          <Reveal>
            <article>
              <span>01</span>
              <h3>It started with lived experience.</h3>
              <p>
                Naren’s experience with ADHD made one problem clear: getting an answer is not the
                same as learning how to plan, work through confusion, and recover when a strategy
                fails.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article>
              <span>02</span>
              <h3>Current tools often solve too much.</h3>
              <p>
                Our research into current tutoring tools found that many systems optimize for fast,
                correct responses. They rarely make the student’s thinking process visible or help
                students practice metacognition directly.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <article>
              <span>03</span>
              <h3>ARIA turns that gap into a research question.</h3>
              <p>
                Naren Saravanan and Karthick Mallireddy are testing whether short, state-aware
                questions can help students plan and self-check independently. Success means the
                support becomes less necessary over time.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WorkflowVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="stage-visual visual-listen" aria-label="A student thought being captured">
        <span className="mini-avatar">S</span>
        <p>I think I multiply first… wait.</p>
        <div className="typing-track" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="stage-visual visual-state" aria-label="ARIA estimates a confused thinking state">
        <div>
          <span>Likely state</span>
          <strong>Confused</strong>
          <small>Confidence 82%</small>
        </div>
        <ul>
          <li>
            <span>Uncertainty language</span>
            <i className="bar bar--high" />
          </li>
          <li>
            <span>Pause before next step</span>
            <i className="bar bar--mid" />
          </li>
          <li>
            <span>Self-correction</span>
            <i className="bar bar--low" />
          </li>
        </ul>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="stage-visual visual-question" aria-label="ARIA asks a Socratic question">
        <CharacterMark small />
        <span>ARIA asks</span>
        <p>“Which part of your plan still feels reliable?”</p>
        <small>No answer revealed</small>
      </div>
    );
  }
  return (
    <div className="stage-visual visual-transfer" aria-label="Prompts decrease as independent planning grows">
      <div>
        <span>ARIA prompts</span>
        <i className="trend trend--down" />
      </div>
      <div>
        <span>Independent planning</span>
        <i className="trend trend--up" />
      </div>
      <strong>Step back as the student steps forward.</strong>
    </div>
  );
}

function Workflow() {
  return (
    <section className="workflow" id="how-it-works">
      <div className="section-intro shell">
        <p className="kicker">How ARIA works</p>
        <h2>Four moments. One direction: more independence.</h2>
        <p>
          ARIA’s workflow is sequential on purpose. Each intervention begins with evidence and ends
          by returning control to the learner.
        </p>
      </div>
      <div className="workflow-stages">
        {workflow.map((stage, index) => (
          <article className={`workflow-stage workflow-stage--${stage.tone}`} key={stage.number}>
            <div className="shell stage-layout">
              <div className="stage-number" aria-hidden="true">
                {stage.number}
              </div>
              <Reveal className="stage-copy">
                <span>{stage.verb}</span>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
                <small>{stage.detail}</small>
              </Reveal>
              <Reveal className="stage-demo" delay={0.08}>
                <WorkflowVisual index={index} />
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Research() {
  return (
    <section className="research section" id="research">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <h2>Promising signals, with the limitations left in.</h2>
          </div>
          <p>
            These results come from simulated think-aloud examples. They help the team find weak
            spots, but they do not yet show that ARIA improves learning in real classrooms.
          </p>
        </div>

        <div className="metric-mosaic">
          {metrics.map((metric, index) => (
            <Reveal
              className={`metric-tile metric-tile--${index + 1}`}
              key={metric.label}
              delay={index * 0.05}
            >
              <span>{index === 3 ? "Important limitation" : `Finding 0${index + 1}`}</span>
              <strong>{metric.value}</strong>
              <h3>{metric.label}</h3>
              <p>{metric.description}</p>
              <small>{metric.technical}</small>
            </Reveal>
          ))}
        </div>

        <Reveal className="results-sheet">
          <div className="results-sheet__head">
            <div>
              <span>Experiment 01</span>
              <h3>Seven thinking states, shown plainly</h3>
            </div>
            <p>350 simulated examples not used in training</p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Thinking state</th>
                  <th scope="col">Balanced score</th>
                  <th scope="col">Cases found</th>
                  <th scope="col">Predictions correct</th>
                </tr>
              </thead>
              <tbody>
                {stateResults.map((result) => (
                  <tr key={result.state}>
                    <th scope="row">{result.state}</th>
                    <td>{Math.round(Number(result.f1) * 100)}%</td>
                    <td>{Math.round(Number(result.recall) * 100)}%</td>
                    <td>{Math.round(Number(result.precision) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="research-caveat">
            <strong>Read this before reading the scores.</strong>
            <p>
              Performance fell by an average of 19 points on writing from other generators,
              suggesting that the model learned some writing-style patterns. Validation with real
              students is still needed.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Summit() {
  return (
    <section className="summit section" id="summit">
      <div className="shell summit-layout">
        <div className="summit-date">
          <span>October</span>
          <strong>24</strong>
          <span>2026</span>
        </div>
        <div className="summit-copy">
          <h2>Khan Lab School AI in Education Summit</h2>
          <p className="summit-theme">
            Intentional Innovation: Keeping Learning Human in an AI World
          </p>
          <p>
            Meet Naren Saravanan and Karthick Mallireddy as they share ARIA’s research, current
            limitations, and next questions with educators, researchers, students, and builders.
          </p>
          <dl>
            <div>
              <dt>When</dt>
              <dd>Saturday, October 24 · 8:00 AM to 5:00 PM PT</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>Khan Lab School · Mountain View, California</dd>
            </div>
          </dl>
          <a className="btn btn--ink" href={summitTicketsUrl} target="_blank" rel="noreferrer">
            Get summit tickets <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Founders() {
  return (
    <section className="team section" id="founders">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">Founders</p>
          <h2>Built from lived experience. Tested with care.</h2>
          <p>
            ARIA began with a question shaped by experience with ADHD: what if a tutor paid
            attention to how a student was thinking instead of simply producing the next answer?
          </p>
        </div>
        <div className="team-list">
          {team.map((member, index) => (
            <Reveal className="team-person" key={member.name} delay={index * 0.08}>
              <div
                className={`person-mark${index === 1 ? " person-mark--photo" : ""}`}
                aria-hidden="true"
              >
                {index === 1 ? (
                  <img src="/karthick-mallireddy.jpg" alt="" />
                ) : (
                  member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                )}
              </div>
              <div>
                <span>{member.role}</span>
                <h3>{member.name}</h3>
                <p>
                  {member.school} · {member.location}
                </p>
              </div>
              <p>
                {index === 0
                  ? "Lived experience, research direction, and the question at the center of ARIA."
                  : "Co-research, system development, evaluation, and translating the idea into a testable tool."}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Join() {
  const groups = [
    {
      label: "Researchers",
      text: "Help with real think-aloud datasets, human annotation, study design, or new cognitive-state taxonomies.",
    },
    {
      label: "Educators",
      text: "Share what students with ADHD, dyslexia, and other learning disabilities need from a responsible pilot.",
    },
    {
      label: "Families + students",
      text: "Tell us what feels supportive, what feels intrusive, and what an AI tutor should never do.",
    },
  ];

  return (
    <section className="join section" id="join">
      <div className="shell">
        <div className="join-lead">
          <h2>ARIA needs more than a model. It needs people who know learning up close.</h2>
          <a className="btn btn--pear" href="mailto:11narensara11@gmail.com?subject=ARIA%20research%20collaboration">
            Contact the team <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="join-paths">
          {groups.map((group, index) => (
            <article key={group.label}>
              <span>0{index + 1}</span>
              <h3>{group.label}</h3>
              <p>{group.text}</p>
              <a
                href={`mailto:11narensara11@gmail.com?subject=${encodeURIComponent(
                  `ARIA | ${group.label} collaboration`,
                )}`}
              >
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <div className="updates-panel">
          <div>
            <CharacterMark small />
            <span>Research updates</span>
          </div>
          <h3>Follow the honest version of the story.</h3>
          <p>New evidence, limitations, demos, and ways to participate, sent only when there is something useful to share.</p>
          <a
            className="btn btn--cyan"
            href="mailto:11narensara11@gmail.com?subject=Add%20me%20to%20ARIA%20research%20updates"
          >
            Join research updates
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>Notice the process · Ask a better question · Build independent thinkers · </span>
          <span>Notice the process · Ask a better question · Build independent thinkers · </span>
        </div>
      </div>
      <div className="shell footer-meta">
        <a className="footer-wordmark" href="#home">
          ARIA
        </a>
        <p>Research by Naren Saravanan and Karthick Mallireddy · 2026</p>
        <div>
          <a href="#research">Research</a>
          <a href="mailto:11narensara11@gmail.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function AriaExperience() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.22 });

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Founders />
        <Workflow />
        <Research />
        <Summit />
        <Join />
      </main>
      <Footer />
    </>
  );
}
