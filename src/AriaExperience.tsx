"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { metrics, team } from "./data";
import MathPreview from "./MathPreview";
import AriaLogo from "./AriaLogo";
import { EducatorSection, EvidenceSummary, StudentValue } from "./HomeSections";

const summitTicketsUrl =
  "https://www.eventbrite.com/e/ai-in-education-summit-2026-khan-lab-school-tickets-1988581168807?aff=oddtdtcreator";

const navItems = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For educators", href: "/participate" },
  { label: "Research", href: "/researchers" },
  { label: "About", href: "#about" },
] as const;

const thoughtStates = {
  confused: {
    label: "Uncertain",
    student: "I know I have seen this kind of equation before, but I cannot tell which step comes next.",
    aria: "Which step still feels solid? Start there, then name the first line where it stops making sense.",
    signal: "Observed: uncertainty + help-seeking",
  },
  rushing: {
    label: "Self-correcting",
    student: "Wait, I multiplied before distributing. I need to work out what the question asks first.",
    aria: "What will you identify before you calculate again?",
    signal: "Observed: self-correction + task orientation",
  },
  stuck: {
    label: "Asking for help",
    student: "I do not know where to start. Can you give me a hint without solving it?",
    aria: "What quantity does the problem give you, and what quantity does it ask you to find?",
    signal: "Observed: explicit help request",
  },
} as const;

type ThoughtState = keyof typeof thoughtStates;

const mathReasons = [
  {
    number: "01",
    title: "Problem-solving has clear steps.",
    body: "A math problem breaks into discrete, observable moves — set up the equation, isolate the variable, check the result. That structure lets ARIA point to where a student stopped instead of guessing that they are generally confused.",
  },
  {
    number: "02",
    title: "Right and wrong are unambiguous.",
    body: "Unlike an essay, a math step is either valid or it is not. That gives an honest correctness signal for whether a scaffold actually helped, and makes it harder for us to claim success without evidence.",
  },
  {
    number: "03",
    title: "Learning outcomes are measurable.",
    body: "Attempts before giving up, time to a correct step, errors repeated across problems, and independent retries are all measurable in math. These are outcomes we can test rather than impressions we can only describe.",
  },
] as const;

const helpLevels = [
  {
    level: "01",
    title: "Metacognitive prompt",
    body: "A question that returns attention to the student’s own reasoning. No mathematical content is given — the goal is for the student to state the plan or locate the breakdown themselves.",
    example: "What are you trying to find, and what is the first step you would try?",
    gate: "Escalates if the student stays stuck after responding",
    tone: "pear",
  },
  {
    level: "02",
    title: "Guided hint or similar problem",
    body: "A narrowed hint about the specific step, or a simpler parallel problem that uses the same idea. The student still performs every step of their own problem; the hint only reduces the search space.",
    example: "Both sides still have an x. What could you do to get the x terms on one side?",
    gate: "Escalates only after repeated attempts at this level",
    tone: "cyan",
  },
  {
    level: "03",
    title: "Worked method on a parallel problem, after repeated struggle",
    body: "Only after documented struggle at the earlier levels does ARIA explain the method on a different problem. The student’s own answer is not the intended output. Replies are checked for answer leakage; the supplied scripted-run summary reports no revealed answers.",
    example: "Here’s how this kind of step works on a different problem — now try yours.",
    gate: "Never the first response, and never a silent solution.",
    tone: "coral",
  },
] as const;

const watchedStates = [
  {
    name: "Stuck",
    signal: "A step the math checker marks wrong, or no forward progress.",
    response: "A Level 1 prompt aimed at locating the exact step that broke down.",
  },
  {
    name: "Making progress",
    signal: "Correct or partially correct steps.",
    response: "ARIA shows a ‘watching’ badge and stays out of the way.",
  },
  {
    name: "Planning",
    signal: "Restating or setting up the problem.",
    response: "ARIA lets it run.",
  },
  {
    name: "Confused / Frustrated",
    signal: "Flags from the student’s words, layered on top of verified correctness. Help-seeking is also flagged.",
    response: "These flags change the tone of help, never the correctness verdict.",
  },
  {
    name: "Finished",
    signal: "A correct final answer.",
    response: "ARIA asks one reflection question.",
  },
] as const;

const roadmapPhases = [
  {
    phase: "Phase 1",
    status: "Complete",
    title: "Synthetic think-aloud data",
    body: "Generate think-aloud examples to build and test a first version of the system. This shows the pipeline works end to end. It does not show that it works for real students.",
  },
  {
    phase: "Offline replay",
    status: "Complete",
    title: "Offline replay on public student logs",
    body: "Using 2009–10 ASSISTments logs (real students, no text), we tested when a simple intervention rule should stay quiet. With interruptions weighted three times as costly as delayed help, the rule intervened 52% less often than always-helping and missed 3.7% of help opportunities (95% CI 2.2–5.3%). With delayed help weighted more, the saving disappears. This is a replay, not a classroom study. Figures are from the supplied project summary; replay artifacts have not been independently verified during the website work.",
  },
  {
    phase: "Phase 2",
    status: "Planned",
    title: "Student interviews",
    body: "Structured interviews with students who struggle in math: where they get stuck, what help they have rejected, and how they want to interact. Findings replace our assumptions in the design.",
  },
  {
    phase: "Phase 3",
    status: "Next",
    title: "Formative prototype testing",
    body: "Small sessions where students use the prototype on real math work while we observe. The goal is to find where prompts misfire, annoy, or get ignored, and revise before any outcome claims.",
  },
  {
    phase: "Phase 4",
    status: "Planned",
    title: "Classroom and teacher-informed evaluation",
    body: "Evaluation designed with teachers, in real instructional settings, using measures they consider meaningful. Only at this stage would it be reasonable to discuss learning outcomes.",
  },
] as const;

const openQuestions = [
  {
    number: "01",
    title: "Do students find the prompts helpful?",
    body: "A prompt a student experiences as nagging is worse than no prompt. We will ask students directly, in interviews and right after sessions, whether a given prompt helped, annoyed, or was ignored.",
  },
  {
    number: "02",
    title: "Does ARIA read student states accurately?",
    body: "Detection is currently measured against generated text. The real test is agreement with what students report about their own experience, and with what a trained observer would say.",
  },
  {
    number: "03",
    title: "Does scaffolding improve persistence?",
    body: "We are looking at whether students attempt more steps before asking for an answer, and whether they return to a hard problem — not at whether the final answer was right.",
  },
  {
    number: "04",
    title: "What input do students actually prefer?",
    body: "Text, tappable choices, or voice, and under what conditions. We expect preference to depend heavily on setting, especially whether a student is working near peers.",
  },
] as const;

const limitations = [
  {
    heading: "The current model is built on synthetic think-aloud examples.",
    body: "The data was generated to imitate student reasoning. It was not collected from students in classrooms.",
  },
  {
    heading: "Reported results are development checks, not learning results.",
    body: "They show the software behaves as designed on examples we created. They say nothing about whether a student learned anything.",
  },
  {
    heading: "The interaction design is not yet validated.",
    body: "Prompt wording, escalation thresholds, and timing are informed judgments. Student interviews and prototype testing are how they get corrected.",
  },
  {
    heading: "We are not claiming classroom-validated learning gains.",
    body: "ARIA has not been shown to improve grades, retention, or transfer, and it is not a substitute for a teacher, a tutor, or an IEP support plan.",
  },
  {
    heading: "Timing has been tested on logs, not on students.",
    body: "The replay shows what a policy would have done; it does not show that helping at that moment works.",
  },
  {
    heading: "ARIA currently works on typed math.",
    body: "Handwriting and photo input are not supported in the current build.",
  },
  {
    heading: "Real-student evaluation is the next step.",
    body: "The claims on this site will change as that evidence arrives, including if it contradicts what we expected.",
  },
] as const;

const inspirations = [
  {
    title: "Koedinger & Aleven (2007)",
    body: "Exploring the Assistance Dilemma in Experiments with Cognitive Tutors. Educational Psychology Review, 19, 239–264. Examines when to give or withhold assistance during learning.",
    href: "https://pslcdatashop.web.cmu.edu/KDDCup/FAQ/Koedinger-Aleven-EPR-07.pdf",
  },
  {
    title: "Beck & Gong (2013)",
    body: "Wheel-Spinning: Students Who Fail to Master a Skill. Artificial Intelligence in Education, 431–440. Distinguishes persistent practice from repeated effort without mastery.",
    href: "https://doi.org/10.1007/978-3-642-39112-5_44",
  },
  {
    title: "Corbett & Anderson (1995)",
    body: "Knowledge Tracing: Modeling the Acquisition of Procedural Knowledge. User Modeling and User-Adapted Interaction, 4, 253–278. Models changing skill knowledge from students’ work.",
    href: "https://doi.org/10.1007/BF01099821",
  },
  {
    title: "Sweller (1988)",
    body: "Cognitive Load During Problem Solving: Effects on Learning. Cognitive Science, 12, 257–285. Examines how problem-solving demands affect learning.",
    href: "https://doi.org/10.1207/s15516709cog1202_4",
  },
] as const;

const workflow = [
  {
    number: "01",
    verb: "Notice",
    title: "The student works the problem out loud.",
    body: "A plan, a revision, a pause, or a question gives ARIA more to work with than a final answer alone.",
    detail: "The student’s words stay central.",
    tone: "pear",
  },
  {
    number: "02",
    verb: "Verify",
    title: "ARIA checks the step.",
    body: "A symbolic engine confirms whether the step is valid before ARIA decides to say anything. A correct step is never treated as stuck; a wrong step is never treated as progress.",
    detail: "Verified correctness comes before language flags.",
    tone: "cyan",
  },
  {
    number: "03",
    verb: "Scaffold",
    title: "ARIA offers the smallest useful scaffold.",
    body: "A prompt first, a narrowed hint only if that does not move the student, and a worked explanation of the method on a similar problem only after repeated struggle. ARIA does not give the student’s own answer.",
    detail: "The student keeps ownership of the work.",
    tone: "coral",
  },
  {
    number: "04",
    verb: "Transfer",
    title: "The support should fade.",
    body: "ARIA looks for the student to begin planning and checking without being prompted.",
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
      <span className="aria-character__art">
        <span className="aria-character__spark" />
        <span className="aria-character__face">
          <i />
          <i />
          <b />
        </span>
        <span className="aria-character__thought aria-character__thought--one" />
        <span className="aria-character__thought aria-character__thought--two" />
      </span>
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

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

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className={`site-header${compact ? " site-header--compact" : ""}`}>
      <a className="summit-banner" href="#summit">
        <span>ARIA is presenting at the Khan Lab School AI in Education Summit</span>
        <strong>October 24 · Mountain View</strong>
      </a>
      <div className="site-nav shell">
        <a className="wordmark" href="#home" aria-label="ARIA home">
          <AriaLogo />
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="/activity">
          Try the preview
        </a>
        <button
          ref={toggle}
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
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            {navItems.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
            <a href="/activity" onClick={() => setOpen(false)}>
              <span>0{navItems.length + 1}</span>
              Try the preview
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
        <span className="live-label">Reasoning-move example</span>
        <span>Illustrative responses</span>
      </div>
      <div className="state-tabs" role="tablist" aria-label="Observable student reasoning moves">
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
              <img src="/aria-symbol.svg" width="28" height="28" alt="" />
              <span>ARIA asks</span>
            </div>
            <p>“{current.aria}”</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="playground-note">
        ARIA labels what is visible in the student’s words. It does not diagnose a hidden mental
        state, ability, emotion, or disability.
      </p>
      <p className="playground-note">
        In the current build, whether a step is right or wrong comes from the math checker.
        Language is used only to notice uncertainty, frustration, and help-seeking.
      </p>
    </div>
  );
}

function Hero() {
  return (
    <>
    <section className="hero" id="home">
      <div className="shell hero-layout">
        <div className="hero-copy">
          <Reveal>
            <p className="kicker">A little guidance. Your own thinking.</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1>
              <span className="hero-brand-name">ARIA</span> <span className="hero-category">AI math tutor</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="hero-lede">
              Work through algebra, trigonometry, and calculus one step at a time. ARIA checks
              your math, gives you space to try, and offers a small prompt when you need support.
            </p>
          </Reveal>
          <Reveal className="hero-actions" delay={0.18}>
            <a className="btn btn--pear" href="/activity">
              Try the preview <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="/participate">
              For educators <span aria-hidden="true">→</span>
            </a>
          </Reveal>
          <Reveal className="hero-trust" delay={0.24}>
            <span>Algebra</span>
            <span>Trigonometry</span>
            <span>Calculus</span>
          </Reveal>
          <p className="hero-stage-note">Research prototype · Classroom pilots are not open yet. <a href="/researchers">See the evidence</a></p>
        </div>
      </div>
    </section>
    <section className="demo-section" id="preview" aria-label="ARIA math examples">
      <div className="shell"><Reveal delay={0.14}><MathPreview /></Reveal></div>
    </section>
    </>
  );
}

function SummitFollowUp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const now = Date.now();
    setVisible(now >= Date.parse("2026-10-19T00:00:00-04:00") && now < Date.parse("2026-10-28T00:00:00-04:00"));
  }, []);
  if (!visible) return null;
  return <aside className="summit-followup" aria-label="Summit follow-up">
    <div className="shell"><strong>Met us at Khan Lab School?</strong><a href="#home">Explore the example</a><a href="/activity">Try the teacher activity</a><a href="/participate">Plan a classroom evaluation</a><a href="/researchers">See the evidence</a></div>
  </aside>;
}

function About() {
  return (
    <section className="idea-section section" id="about">
      <div className="shell idea-layout">
        <div className="idea-statement">
          <p className="kicker">About ARIA</p>
          <h2>
            Built to help math students plan, check, and keep going.
            <span>We are studying how technology can strengthen independent thinking.</span>
          </h2>
        </div>
        <div className="idea-notes">
          <Reveal>
            <article>
              <span>01</span>
              <h3>It started with a learning problem.</h3>
              <p>
                A finished solution does not tell us how a student planned, worked through
                confusion, or recovered when a strategy failed. ARIA focuses on those moments
                across math learners, without requiring a diagnosis.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article>
              <span>02</span>
              <h3>The next step matters.</h3>
              <p>
                A worked solution can explain a method. Students also need room to choose a
                step, notice an error, and try again. ARIA’s research asks when a prompt supports
                that process and when staying quiet is the better choice.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <article>
              <span>03</span>
              <h3>ARIA turns that gap into a research question.</h3>
              <p>
                Naren Saravanan and Karthik Malireddy are testing whether short, state-aware
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

function WhyMath() {
  return (
    <section className="why-math section" id="why-math">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Why math first</p>
            <h2>ARIA is deliberately narrow.</h2>
          </div>
          <p>
            Math is where a metacognitive tutor can be studied honestly before anyone claims it
            works elsewhere. The structure of a math problem is what makes the research question
            testable.
          </p>
        </div>
        <div className="why-math-grid">
          {mathReasons.map((reason, index) => (
            <Reveal key={reason.number} delay={index * 0.06}>
              <article className="why-math-card">
                <span>{reason.number}</span>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="scope-note">
          <strong>This is a scope choice, not a hidden limitation.</strong>
          <p>
            Starting with math means ARIA is not a general homework assistant, and we make no claims
            about subjects we have not studied. If the approach holds up here, extending it is a
            later research question rather than a feature we are shipping now.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function HelpModel() {
  return (
    <section className="help-model section" id="help-model">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">The three-level help model</p>
          <h2>Help escalates only when the level before it did not work.</h2>
          <p>
            The demo starts with a prompt and escalates after documented struggle. A worked method
            on a parallel problem is the final level; the student keeps working on their own problem.
          </p>
        </div>
        <ol className="level-list">
          {helpLevels.map((item) => (
            <li className={`level-card level-card--${item.tone}`} key={item.level}>
              <div className="level-card__mark">
                <span>Level</span>
                <strong>{item.level}</strong>
              </div>
              <div className="level-card__body">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <blockquote>“{item.example}”</blockquote>
                <small>{item.gate}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WatchedStates() {
  return (
    <section className="watched section" id="states">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">What ARIA watches for</p>
            <h2>Quiet does not always mean stuck.</h2>
          </div>
          <p>
            ARIA decides whether to speak before it decides what to say. The state comes from
            verified correctness first; the student’s words add flags on top.
          </p>
        </div>
        <div className="watched-grid">
          {watchedStates.map((state, index) => (
            <Reveal key={state.name} delay={index * 0.04}>
              <article className="watched-card">
                <h3>{state.name}</h3>
                <p>{state.signal}</p>
                <p className="watched-card__response">
                  <span>Response</span>
                  {state.response}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="privacy-note">
          <div>
            <span className="kicker">Privacy-aware interaction</span>
            <h3>Text and lightweight choices first. Voice is optional.</h3>
          </div>
          <p>
            Most interactions are a tap, a selected step, or one short line of text. Voice input is
            never required. Students work in classrooms, shared rooms, and beside peers, and asking
            someone to talk through a problem out loud can be exposing rather than helpful. Speaking
            should be a preference the student chooses, not a condition of getting help.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function StudentFeedback() {
  return (
    <section className="feedback section" id="student-feedback">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">Built from student feedback</p>
          <h2>Moving from data we generated to students we listen to.</h2>
        </div>
        <div className="feedback-layout">
          <Reveal className="feedback-copy">
            <p>
              ARIA’s language classifier was developed using synthetic think-aloud examples: text generated to
              imitate how students describe their reasoning. That was a practical way to build a
              working prototype, but synthetic data can only reflect what we already assumed
              students would say.
            </p>
            <p>
              So the design is moving toward the students themselves. We plan structured
              interviews with math students, asking what actually happens when they get stuck and what kind
              of help has and has not worked for them.
            </p>
            <p>
              What we learn changes the system, not just the write-up. Interview findings feed
              directly into which states ARIA watches for, how prompts are worded, when help
              escalates, and what the interface asks of a student who is already frustrated.
            </p>
          </Reveal>
          <Reveal className="feedback-questions" delay={0.08}>
            <span className="kicker">What we ask students</span>
            <ul>
              <li>
                <strong>Where do you actually get stuck?</strong>
                Setting up the problem, a specific step, or checking whether the answer is right.
              </li>
              <li>
                <strong>What do you do next?</strong>
                Re-read, guess, ask someone, look up the answer, or stop.
              </li>
              <li>
                <strong>What help has failed you?</strong>
                Which tutoring tools felt useless, condescending, or too slow to be worth it.
              </li>
              <li>
                <strong>What would you actually use?</strong>
                Typing, tapping a choice, or speaking, and what you would never use in a classroom.
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section className="roadmap section" id="roadmap">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Research roadmap</p>
            <h2>From synthetic checks to classroom evidence.</h2>
          </div>
          <p>
            Each phase has to hold up before the next one is worth running, and we are early in that
            sequence. Naming where we are is more useful than implying we are further along.
          </p>
        </div>
        <ol className="phase-track">
          {roadmapPhases.map((phase) => (
            <li
              className="phase-card"
              key={phase.phase}
            >
              <div className="phase-card__meta">
                <span>{phase.phase}</span>
                <em>{phase.status}</em>
              </div>
              <h3>{phase.title}</h3>
              <p>{phase.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Limitations() {
  return (
    <section className="limitations section" id="limitations">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Limitations and current stage</p>
            <h2>What ARIA is not, yet.</h2>
          </div>
          <p>
            ARIA is an early-stage research prototype. Stating that plainly is part of the work, so
            nothing on this site reads as more than it is.
          </p>
        </div>
        <ul className="limitation-list">
          {limitations.map((item) => (
            <li key={item.heading}>
              <strong>{item.heading}</strong>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestingNext() {
  return (
    <section className="testing-next section" id="testing-next">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">What we are testing next</p>
          <h2>Four questions synthetic data cannot answer.</h2>
          <p>
            These are the questions student interviews and prototype sessions are designed to
            answer. Any of them could come back against us.
          </p>
        </div>
        <div className="question-grid">
          {openQuestions.map((question, index) => (
            <Reveal key={question.number} delay={index * 0.05}>
              <article className="question-card">
                <span>{question.number}</span>
                <h3>{question.title}</h3>
                <p>{question.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inspiration() {
  return (
    <section className="inspiration section" id="inspiration">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">References</p>
            <h2>Ideas this work draws on.</h2>
          </div>
          <p>
            ARIA is a student project. These are lines of education research that shaped how we
            think about the problem.
          </p>
        </div>
        <div className="inspiration-grid">
          {inspirations.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="inspiration-card">
                <h3><a href={item.href}>{item.title}</a></h3>
                <p>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="inspiration-note">
          These are influences on our thinking, not endorsements or affiliations. We are not
          affiliated with the researchers or institutions behind this work, and nothing here should
          be read as their validation of ARIA.
        </p>
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
      <div className="stage-visual visual-state" aria-label="ARIA identifies observable reasoning moves">
        <div>
          <span>Observed move</span>
          <strong>Self-correction</strong>
          <small>Evidence stays visible</small>
        </div>
        <ul>
          <li>
            <span>“Wait”</span>
            <i className="bar bar--high" />
          </li>
          <li>
            <span>“I meant subtract”</span>
            <i className="bar bar--mid" />
          </li>
          <li>
            <span>No diagnosis inferred</span>
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
    <section className="workflow section" id="workflow-details">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">How ARIA helps</p>
          <h2>Start with the step in front of you.</h2>
          <p>
            Write a step. ARIA checks it. If the work is moving forward, keep going. If there’s an
            error or a request for help, ARIA starts with a question about the next move.
          </p>
        </div>
        <ol className="workflow-flow">
          {workflow.map((stage, index) => (
            <li className={`workflow-card workflow-card--${stage.tone}`} key={stage.number}>
              <div className="workflow-card__top">
                <span className="workflow-card__number">0{index + 1}</span>
                <span className="workflow-card__verb">{stage.verb}</span>
              </div>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              <small>{stage.detail}</small>
              {index < workflow.length - 1 && (
                <span className="workflow-card__arrow" aria-hidden="true">→</span>
              )}
            </li>
          ))}
        </ol>
        <div className="workflow-throughline">
          <span>Student says</span>
          <strong>“Wait, I multiplied too early.”</strong>
          <i aria-hidden="true">→</i>
          <span>ARIA notices</span>
          <strong>Self-correction</strong>
          <i aria-hidden="true">→</i>
          <span>ARIA asks</span>
          <strong>“What will you check before trying again?”</strong>
        </div>
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
            <h2>Where the work stands.</h2>
          </div>
          <p>
            The foundation is in place: a task bank, a way to describe student reasoning, and a
            fair comparison study. The next step is to put each part in front of educators and
            students.
          </p>
        </div>

        <div className="metric-mosaic">
          {metrics.map((metric, index) => (
            <Reveal
              className={`metric-tile metric-tile--${index + 1}`}
              key={metric.label}
              delay={index * 0.05}
            >
              <span>{metric.eyebrow}</span>
              <strong>{metric.value}</strong>
              <h3>{metric.label}</h3>
              <p>{metric.description}</p>
              <small>{metric.technical}</small>
            </Reveal>
          ))}
        </div>

        <Reveal className="research-link-band">
          <div><p className="kicker">Methods and results</p><h3>Read the evidence behind the prototype.</h3><p>Classifier benchmarks, replay assumptions, limitations, and specific collaboration needs.</p></div>
          <a className="btn btn--ink" href="/researchers">For researchers <span aria-hidden="true">→</span></a>
        </Reveal>

        <Reveal className="method-summary">
          <div className="method-summary__intro">
            <p className="kicker">What happens next</p>
            <h3>Each stronger claim has a stronger evidence gate.</h3>
            <p>
              The protocol separates task correctness, response quality, language measurement,
              feasibility, learning, retention, and unprompted transfer.
            </p>
          </div>
          <ol className="method-summary__steps">
            <li>
              <span>01</span>
              <p>
                Have qualified educators independently review all <strong>30 demo problems</strong>.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                Blindly rate <strong>paired response conditions</strong> for grounding,
                actionability, learner ownership, and answer leakage.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                Validate observable reasoning moves on real student language, split by complete
                student or session.
              </p>
            </li>
            <li>
              <span>04</span>
              <p>
                Run a reviewed feasibility pilot before testing learning and transfer against an
                active control.
              </p>
            </li>
          </ol>
          <a className="btn btn--ink" href="/methodology">
            Read the evaluation methodology <span aria-hidden="true">→</span>
          </a>
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
            Meet Naren Saravanan and Karthik Malireddy as they share ARIA’s research, current
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
          <div className="summit-next-links"><a href="/activity">Try the two-minute teacher preview →</a><a href="/participate">Plan a school partnership →</a><a href="/researchers">Review the research →</a><a href="/privacy">Privacy and data →</a></div>
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
          <h2>Student builders, focused on independent thinking.</h2>
          <p>
            Naren Saravanan and Karthik Malireddy are building ARIA for math learners who need
            help planning, checking, and recovering from mistakes. The work is not limited to a
            particular diagnosis or learner profile.
          </p>
        </div>
        <div className="team-list">
          {team.map((member, index) => (
            <Reveal className="team-person" key={member.name} delay={index * 0.08}>
              <div className="person-mark person-mark--photo" aria-hidden="true">
                <img
                  src={index === 0 ? "/naren-saravanan.jpg" : "/karthik-malireddy.jpg"}
                  alt=""
                />
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
        <div className="team-context"><p><strong>Based in:</strong> Waxhaw, North Carolina · Eastern Time. School partnerships may involve remote support, agreed before any sessions.</p><p><strong>Advisory collaboration:</strong> We welcome educators and researchers to review the study design and consent process. <a href="/researchers">See where we need help →</a></p></div>
      </div>
    </section>
  );
}

function Join() {
  const groups = [
    {
      label: "Educators + school partners",
      text: "Help define the tasks, session format, and measures for a reviewed classroom evaluation. Pilot enrollment remains closed until readiness checks and school approval are complete.",
      cta: "Start planning",
      href: "/participate",
    },
    {
      label: "Students",
      text: "What kind of math help would you actually use? Answer three optional questions and download your preferences. No contact details or student work are requested.",
      cta: "Student experience questions",
      href: "/students",
    },
    {
      label: "Researchers + developers",
      text: "Review our consent protocol, label permissioned reasoning transcripts, challenge the replay assumptions, or help design a school study.",
      cta: "Research collaboration",
      href: "/researchers",
    },
  ];

  return (
    <section className="join section" id="join">
      <div className="shell">
        <div className="join-lead">
          <h2>Help shape what comes next.</h2>
          <a className="btn btn--pear" href="/participate">
            Plan a school study <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="join-paths">
          {groups.map((group, index) => (
            <article key={group.label}>
              <span>0{index + 1}</span>
              <h3>{group.label}</h3>
              <p>{group.text}</p>
              <a
                href={group.href}
              >
                {group.cta} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <div className="updates-panel">
          <div>
            <span>Research updates</span>
          </div>
          <h3>Stay close to the work.</h3>
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

function CommonQuestions() {
  return <section className="common-questions section" id="questions">
    <div className="shell">
      <div className="section-intro"><p className="kicker">Before you try it</p><h2>A few practical questions.</h2></div>
      <div className="faq-list">
        <details><summary>Who is ARIA for?</summary><p>ARIA is a research prototype for math learners working through algebra, trigonometry, and calculus. The current demo bank has 30 problems. It is not limited to students with a particular diagnosis.</p></details>
        <details><summary>Can I use the tutor on this website?</summary><p>This website offers scripted examples and an eight-moment teacher activity. The tutor itself is a separate application. The preview shows logged behavior from a pre-freeze build; it is not a live tutoring session.</p></details>
        <details><summary>Will ARIA give away the answer?</summary><p>The demo is designed to start with prompts and small hints. After repeated struggle, it can explain the method using a parallel problem. Scripted checks have found no answer leaks; real-student evaluation is still pending.</p></details>
        <details><summary>Can my class try ARIA?</summary><p>We are planning school partnerships, but pilot enrollment is not open. Offline checks, teacher summaries, consent review, and school approval must come first. <a href="/participate">Help shape the proposed study →</a></p></details>
        <details><summary>What happens to my responses?</summary><p>The teacher preview keeps responses in browser memory and downloads a CSV only when you request it. It does not upload your answers. The educator planning form prepares an email that you review and send yourself. <a href="/privacy">Read the privacy page →</a></p></details>
      </div>
    </div>
  </section>;
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
          <AriaLogo />
        </a>
        <p>Research by Naren Saravanan and Karthik Malireddy · 2026</p>
        <div>
          <a href="/researchers">Research</a>
          <a href="/privacy">Privacy and data</a>
          <a href="mailto:11narensara11@gmail.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function ResearchNotes({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const disclosure = useRef<HTMLDetailsElement>(null);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready) return;
    const revealAnchor = () => {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (target && disclosure.current?.contains(target)) {
        disclosure.current.open = true;
        target.scrollIntoView({ block: "start" });
      }
    };
    revealAnchor();
    window.addEventListener("hashchange", revealAnchor);
    return () => window.removeEventListener("hashchange", revealAnchor);
  }, [ready]);

  // Browsers reveal fragment targets inside details before React hydrates.
  // Delay those targets so the server and initial client markup stay identical.
  return <details className="research-notes" ref={disclosure}>
    <summary><span className="shell">Research roadmap, evidence, and limitations</span></summary>
    {ready ? children : null}
  </details>;
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
      <SummitFollowUp />
      <main id="main">
        <Hero />
        <StudentValue />
        <HelpModel />
        <section className="section reasoning-examples"><div className="shell"><div className="section-intro"><p className="kicker">Language signals</p><h2>Different moments. Different questions.</h2></div><ThoughtPlayground /></div></section>
        <EducatorSection />
        <EvidenceSummary />
        <Summit />
        <About />
        <Founders />
        <CommonQuestions />
        <ResearchNotes>
          <WhyMath />
          <Workflow />
          <WatchedStates />
          <StudentFeedback />
          <Roadmap />
          <Research />
          <Limitations />
          <TestingNext />
          <Inspiration />
        </ResearchNotes>
        <Join />
      </main>
      <Footer />
    </>
  );
}
