"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useId, useState, type ReactNode } from "react";
import { metrics, team } from "./data";

const summitTicketsUrl =
  "https://www.eventbrite.com/e/ai-in-education-summit-2026-khan-lab-school-tickets-1988581168807?aff=oddtdtcreator";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Why math", href: "#why-math" },
  { label: "How it helps", href: "#how-it-works" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Research status", href: "#research" },
  { label: "ARIA-Pace", href: "/pace" },
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
    gate: "Escalates if the student stays stuck or idle after responding",
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
    title: "Answer explanation, after repeated struggle",
    body: "Only after documented struggle at the earlier levels does ARIA explain the reasoning for the step. The explanation focuses on why each move is made, and is followed by a similar problem the student completes independently.",
    example: "Here is why we subtract 3x from both sides — then try this one on your own.",
    gate: "Never the first response, and never a silent solution",
    tone: "coral",
  },
] as const;

const watchedStates = [
  {
    name: "Stuck",
    signal: "Repeated attempts on the same step, backtracking, or no forward progress for an extended stretch.",
    response: "A Level 1 prompt aimed at locating the exact step that broke down.",
  },
  {
    name: "Confused",
    signal: "A step that contradicts the previous one, or a message that misstates what the problem is asking.",
    response: "A question that checks understanding of the goal before any hint is given.",
  },
  {
    name: "Idle",
    signal: "No input for a sustained period, with no partial work on screen — disengagement rather than thinking.",
    response: "A low-pressure re-entry prompt, not a hint and not a nudge to hurry.",
  },
  {
    name: "Struggling productively",
    signal: "Slow but real progress — the student is testing approaches, self-correcting, and moving between steps.",
    response: "Stay out of the way. Interrupting productive struggle is a failure mode, not a missed opportunity.",
  },
  {
    name: "Rushing or misusing the system",
    signal: "Answers submitted faster than they could be worked, or repeated requests that skip straight to Level 3.",
    response: "Slow the loop down and ask the student to show one step before help continues.",
  },
  {
    name: "Planning",
    signal: "The student is setting up an approach before computing — the behavior we most want to strengthen.",
    response: "Acknowledge and let it run. Prompting here is only useful if the plan is unstated.",
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
    phase: "Phase 2",
    status: "Current",
    title: "Timing model on real student logs",
    body: "ARIA-Pace: a knowledge-tracing model fit on public logs from thousands of real students, with a rule for when to stay quiet. First held-out test done; a second-dataset test is pending. A replay of logs, not a classroom study.",
    href: "/pace",
  },
  {
    phase: "Phase 3",
    status: "Planned",
    title: "Student interviews",
    body: "Structured interviews with students who struggle in math: where they get stuck, what help they have rejected, and how they want to interact. Requires ethics review and consent first.",
  },
  {
    phase: "Phase 4",
    status: "Planned",
    title: "Formative prototype testing",
    body: "Small sessions where students use the prototype on real math work while we observe. The goal is to find where prompts misfire, annoy, or get ignored, and revise before any outcome claims.",
  },
  {
    phase: "Phase 5",
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
    heading: "Real-student evaluation is the next step.",
    body: "The claims on this site will change as that evidence arrives, including if it contradicts what we expected.",
  },
] as const;

const inspirations = [
  {
    title: "When a teacher steps in",
    body: "Work on how experienced teachers decide when to intervene, and the recognition that help offered too early can cut short the struggle that produces learning. ARIA’s escalation model is an attempt to take that timing question seriously.",
  },
  {
    title: "Engagement as changing states",
    body: "Research describing learning as a sequence of states — engaged, confused, frustrated, disengaged — rather than one fixed measure of ability. This is why ARIA treats “stuck” and “struggling productively” as different situations.",
  },
  {
    title: "Who gets attention",
    body: "Studies of how teacher attention distributes unevenly across a classroom, and how quiet students can go unnoticed for long stretches. It motivates watching for idle and silent states, not only for students who ask for help.",
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
    verb: "Ground",
    title: "ARIA grounds itself in the step.",
    body: "It marks visible reasoning moves and keeps the exact evidence beside each label, at the level of a single step rather than the whole problem.",
    detail: "The label describes the message, not the student.",
    tone: "cyan",
  },
  {
    number: "03",
    verb: "Scaffold",
    title: "ARIA offers the smallest useful scaffold.",
    body: "A prompt first, a narrowed hint only if that does not move the student, and a worked explanation only after repeated struggle.",
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
              <span>0{navItems.length + 1}</span>
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
        <span className="live-label">Reasoning-move example</span>
        <span>Tap a move to change ARIA’s question</span>
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
              <CharacterMark small />
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
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="shell hero-layout">
        <div className="hero-copy">
          <Reveal>
            <p className="kicker">Math-first metacognitive tutoring · Research in progress</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1>
              What if a math tutor noticed <span className="highlight">how you think?</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="hero-lede">
              ARIA is designed to support reflection while a student works through a math problem.
              It reads the reasoning rather than the final answer, then offers the smallest scaffold
              that could move the student forward. We are evaluating whether that improves
              persistence and clarity; current results are preliminary.
            </p>
          </Reveal>
          <Reveal className="hero-actions" delay={0.18}>
            <a className="btn btn--pear" href="#roadmap">
              See the research roadmap <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="#research">
              See the research status <span aria-hidden="true">→</span>
            </a>
          </Reveal>
          <Reveal className="hero-trust" delay={0.24}>
            <span>Prompts before hints, answers last</span>
            <span>Answers stay with the student</span>
            <span>Human validation is still pending</span>
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
            The student always receives the least amount of help that could still move them forward.
            An answer is the last resort, never the opening move.
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
            The same behavior can mean very different things. A student who is quiet because the
            work is going well should not be interrupted the same way as a student who has quietly
            given up.
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
              ARIA’s current model was trained on synthetic think-aloud examples: text generated to
              imitate how students describe their reasoning. That was a practical way to build a
              working prototype, but synthetic data can only reflect what we already assumed
              students would say.
            </p>
            <p>
              So the design is moving toward the students themselves. We are shifting to structured
              interviews with students who struggle in math, including students with ADHD and
              learning disabilities, asking what actually happens when they get stuck and what kind
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
            <h2>Five phases, in order.</h2>
          </div>
          <p>
            Each phase has to hold up before the next one is worth running, and we are early in that
            sequence. Naming where we are is more useful than implying we are further along.
          </p>
        </div>
        <ol className="phase-track">
          {roadmapPhases.map((phase) => (
            <li
              className={`phase-card${phase.status === "Current" ? " phase-card--now" : ""}`}
              aria-current={phase.status === "Current" ? "step" : undefined}
              key={phase.phase}
            >
              <div className="phase-card__meta">
                <span>{phase.phase}</span>
                <em>{phase.status}</em>
              </div>
              <h3>{phase.title}</h3>
              <p>{phase.body}</p>
              {"href" in phase && (
                <a className="text-link" href={phase.href}>
                  Read the results <span aria-hidden="true">→</span>
                </a>
              )}
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
            <p className="kicker">Research inspiration</p>
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
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="inspiration-note">
          These are influences on our thinking, not endorsements or affiliations. We are not
          affiliated with the researchers or institutions behind this work, and nothing here should
          be read as their validation of ARIA. A full reference list will accompany our paper.
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
    <section className="workflow section" id="how-it-works">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">How ARIA helps</p>
          <h2>Step-by-step scaffolding, not answer-giving.</h2>
          <p>
            The cycle stays on the step in front of the student. ARIA notices what they actually
            say, gives the smallest scaffold that could help, and looks for the support to become
            unnecessary.
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

        <Reveal className="results-sheet">
          <div className="results-sheet__head">
            <div>
              <span>Development benchmark</span>
              <h3>Useful for finding failures. Not evidence of learning.</h3>
            </div>
            <p>Synthetic examples · no human ground truth</p>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Development check</th>
                  <th scope="col">Current result</th>
                  <th scope="col">Plain-language meaning</th>
                  <th scope="col">Evidence level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Same-style synthetic recognition</th>
                  <td>84.6%</td>
                  <td>About 85 of 100 held-out simulated messages matched their designed label.</td>
                  <td>Synthetic development test</td>
                </tr>
                <tr>
                  <th scope="row">Balanced synthetic score</th>
                  <td>0.837</td>
                  <td>Performance summarized while giving each legacy state equal weight.</td>
                  <td>Synthetic development test</td>
                </tr>
                <tr>
                  <th scope="row">Writing-style stress test</th>
                  <td>9.05-point gap</td>
                  <td>Average accuracy changed when unfamiliar generators wrote the examples.</td>
                  <td>Cross-generator stress test</td>
                </tr>
                <tr>
                  <th scope="row">Independent human labels</th>
                  <td>Pending</td>
                  <td>Two trained annotators must label real student language before accuracy claims advance.</td>
                  <td>No result yet</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="research-caveat">
            <strong>Why the old headline changed.</strong>
            <p>
              Synthetic labels can test software, but they cannot show that ARIA understands real
              students. The primary language target is now observable reasoning moves with exact
              evidence spans and independent human validation.
            </p>
          </div>
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
                Have qualified educators independently review all <strong>100 task models</strong>.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                Blindly rate <strong>five paired response conditions</strong> for grounding,
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
              <div className="person-mark person-mark--photo" aria-hidden="true">
                <img
                  src={index === 0 ? "/naren-saravanan.jpg" : "/karthick-mallireddy.jpg"}
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
      </div>
    </section>
  );
}

function Join() {
  const groups = [
    {
      label: "Teachers + research advisors",
      text: "Interested in reviewing our study design? We would rather have it critiqued now than defend a flawed one later. Tell us which outcomes are worth measuring, and help us evaluate ARIA with real students.",
      cta: "Review our study design",
    },
    {
      label: "Students",
      text: "Have you struggled with math tutoring tools? Share your experience: where you get stuck, which tools you stopped using, and whether you would type, tap, or speak. You do not need to be good at math to help.",
      cta: "Share your experience",
    },
    {
      label: "Researchers + developers",
      text: "Help with real think-aloud datasets, human annotation, study design, or interface work for low-effort, privacy-aware input.",
      cta: "Start a conversation",
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
                {group.cta} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <div className="updates-panel">
          <div>
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
        <p>Research by Naren Saravanan and Karthik Malireddy · 2026</p>
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
        <WhyMath />
        <Workflow />
        <HelpModel />
        <WatchedStates />
        <StudentFeedback />
        <Roadmap />
        <Research />
        <Limitations />
        <TestingNext />
        <Inspiration />
        <Summit />
        <Founders />
        <Join />
      </main>
      <Footer />
    </>
  );
}
