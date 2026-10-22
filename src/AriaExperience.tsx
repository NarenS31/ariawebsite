"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { metrics, team } from "./data";
import AriaLogo from "./AriaLogo";
import MathPreview from "./MathPreview";
import { EducatorSection, EvidenceSummary } from "./HomeSections";
import EducatorIntake from "./EducatorIntake";

const summitTicketsUrl =
  "https://www.eventbrite.com/e/ai-in-education-summit-2026-khan-lab-school-tickets-1988581168807?aff=oddtdtcreator";

const navItems = [
  { label: "ARIA-Pace", href: "/pace" },
  { label: "About", href: "/about" },
  { label: "Method", href: "/method" },
  { label: "Research", href: "/research" },
  { label: "Roadmap", href: "/roadmap" },
] as const;

const overviewCards = [
  {
    href: "/pace",
    kicker: "The timing model",
    title: "ARIA-Pace",
    body: "A knowledge-tracing model fit on logs from 4,163 real students, with a rule for when to stay quiet. Under a high interruption cost, and the 3-correct-in-a-row mastery definition, it intervened 52% less often than always helping and missed 3.7% of students who went on to get stuck, on a held-out test read once.",
    cta: "Results and protocol",
  },
  {
    href: "/about",
    kicker: "Motivation and scope",
    title: "About",
    body: "Why the question is timing, why the study is limited to mathematics, and what the project does and does not claim.",
    cta: "Read more",
  },
  {
    href: "/method",
    kicker: "How the tutor works",
    title: "Method",
    body: "Notice, verify, scaffold, step back. A symbolic engine checks every step; a hint points at the next step and never gives the student’s answer; the policy distinguishes progress from being stuck.",
    cta: "Read more",
  },
  {
    href: "/research",
    kicker: "Evidence so far",
    title: "Research",
    body: "Software checks on synthetic text, an offline replay of real student logs, the limitations of each, and the open questions the current evidence cannot answer.",
    cta: "Results and limitations",
  },
  {
    href: "/roadmap",
    kicker: "Where the work is",
    title: "Roadmap",
    body: "Five phases, in order, with the current one marked. Student interviews and classroom evaluation are planned and gated on ethics review.",
    cta: "See the phases",
  },
  {
    href: "/collaborate",
    kicker: "Teachers, students, researchers",
    title: "Collaborate",
    body: "Review the study design, host a small offline pilot, share your experience with tutoring tools, or critique the methods. Criticism now is worth more than defence later.",
    cta: "Get in touch",
  },
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
    mark: "Built",
    level: "01",
    title: "One hint after a verified wrong step",
    body: "When a step is verified wrong, ARIA gives one hint that points at the next authored step of the problem that the student has not yet produced. The wording comes from a few templates and rotates, so consecutive replies differ: some are a plain question, some name the step, and some also name that step’s result. The student’s final answer is never given, and every reply is checked for it before it is shown.",
    example: "Try this: apply the power rule to 3x^4. What do you get?",
    gate: "In the summit demo",
    tone: "pear",
  },
  {
    mark: "Built",
    level: "02",
    title: "A counter picks the next step, not a higher level",
    body: "Each hint moves a counter forward, so the next hint points at the next authored step the student has not produced yet. When every authored step is done, the hint falls back to a general question. There is no fixed sequence of levels: nothing moves from a question to an explanation.",
    example: "What is the smallest useful next step?",
    gate: "In the summit demo",
    tone: "cyan",
  },
  {
    mark: "Future work",
    level: "03",
    title: "A three-level scaffold is an idea, not a feature",
    body: "A gate with three levels (silence, a prompt with no mathematical content, an execution hint) could be built on the same checks. It has not been built or tested, no offline data can set its thresholds, and ARIA does not generate a worked example on a different problem. It needs a reviewed study with students first.",
    example: "",
    gate: "Design note only: docs/aria_pace/SCAFFOLD_LEVELS.md in the aria.kls repository",
    tone: "coral",
  },
] as const;

const watchedStates = [
  {
    name: "Making progress",
    signal: "A correct or partially correct step, verified by the math engine.",
    response: "Stay quiet and show a “watching” indicator. Interrupting productive work is treated as an error, not a missed opportunity.",
  },
  {
    name: "Planning",
    signal: "The student restates the problem or sets up an approach before computing.",
    response: "Let it run. No prompt is offered while a plan is forming.",
  },
  {
    name: "Stuck",
    signal: "A step the math engine marks wrong, or a stall after a verified error.",
    response: "One hint aimed at the next step the student has not produced. From the third attempt, a profile with a high bar may show a short note first and hold the hint until the risk is high enough.",
  },
  {
    name: "Frustrated or confused",
    signal: "Explicit words in the student’s message. These are flags on top of the state, never a substitute for checking the math.",
    response: "The tone of the help changes. The correctness verdict does not.",
  },
  {
    name: "Asking for the answer",
    signal: "A direct request to be told the result.",
    response: "ARIA declines to give the answer and gives a hint toward the first step. Every reply is checked so the answer cannot leak.",
  },
  {
    name: "Finished",
    signal: "A correct final answer.",
    response: "One short reflection question, then nothing more.",
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
    body: "ARIA-Pace: a knowledge-tracing model fit on public logs from thousands of real students, with a rule for when to stay quiet. Evaluated once on a locked 2009–10 split and once on a locked 2012–13 split; the 2012–13 numbers are held until the dataset terms are confirmed. A replay of logs, not a classroom study.",
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
    title: "Do teachers agree with the policy about when to step in?",
    body: "The timing rule was tuned to a cost we chose. The test that matters is whether experienced teachers, shown the same student moments, would make the same call, and whether they agree with each other.",
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
    heading: "The language classifier is built on synthetic think-aloud examples.",
    body: "That text was generated to imitate student reasoning. It was not collected from students in classrooms, and it has not been validated against human labels; it was evaluated only on synthetic messages, and accuracy fell when a different generator wrote them. The live tutor\u2019s timing decision does not depend on it: in the demo it only adds optional flags that need an explicit feeling word and never overrides correctness.",
  },
  {
    heading: "The timing results come from replaying logs, not from students using ARIA.",
    body: "They show what the policy would have done on recorded behaviour. They cannot show that helping at that moment works, or that any student learned more. “Unnecessary interruption” is a proxy, since the logs contain no real interventions.",
  },
  {
    heading: "The cost settings are weights we chose.",
    body: "Quiet, balanced, and supportive are explicit trade-offs between interruption and delayed help. The cost of an interruption is an assumed weight in an offline simulation, not a measured harm: whether the quiet setting reduces frustration or preserves working memory has not been measured, and that needs a live comparison with students. Nothing shows that any group of learners corresponds to the settings.",
  },
  {
    heading: "The timing model was fitted on math logs, not calculus.",
    body: "Its parameters come from ASSISTments skill-builder math logs (grade level not stated). The demo applies them unchanged to algebra, trigonometry and calculus problems; they need re-calibration on the target domain before any deployment.",
  },
  {
    heading: "The interaction design is not yet validated.",
    body: "Hint wording and timing are informed judgments. Student interviews and prototype testing are how they get corrected.",
  },
  {
    heading: "The headline saving depends on how “stuck” is defined, and the checks cover BKT only.",
    body: "The 52% is under the 3-correct-in-a-row mastery definition, which is the ASSISTments skill-builder\u2019s own completion rule. Under four other definitions the quiet saving fell to between 8.6% and 45.4% (exploratory, validation only), and that sensitivity analysis used BKT as the risk score only; the other risk models were not re-run.",
  },
  {
    heading: "We are not claiming classroom-validated learning gains.",
    body: "ARIA has not been shown to improve grades, retention, or transfer, and it is not a substitute for a teacher, a tutor, or an IEP support plan.",
  },
  {
    heading: "The summit demo works on typed math.",
    body: "Handwriting and photo input are not supported in the build shown at the summit.",
  },
  {
    heading: "Real-student evaluation is the next step.",
    body: "The claims on this site will change as that evidence arrives, including if it contradicts what we expected.",
  },
] as const;

const inspirations = [
  {
    title: "The assistance dilemma",
    href: "https://pslcdatashop.web.cmu.edu/KDDCup/FAQ/Koedinger-Aleven-EPR-07.pdf",
    body: "Koedinger and Aleven (2007) framed the question directly: when does giving help aid learning, and when does withholding it? ARIA-Pace treats that as a decision with an explicit cost for each kind of mistake.",
  },
  {
    title: "Wheel-spinning",
    href: "https://doi.org/10.1007/978-3-642-39112-5_44",
    body: "Beck and Gong (2013) described students who keep attempting a skill without ever mastering it. It is the outcome ARIA-Pace predicts, using the operationalisation of later ASSISTments work, and it can be read directly from logs without hand labelling.",
  },
  {
    title: "Knowledge tracing",
    href: "https://doi.org/10.1007/BF01099821",
    body: "Corbett and Anderson’s (1995) Bayesian Knowledge Tracing estimates mastery from a sequence of right and wrong answers. It is the risk model ARIA-Pace currently runs on; four neural models we trained, two single-skill and two that also see earlier attempts on other skills, did not improve the wheel-spinning ranking.",
  },
  {
    title: "Cognitive load",
    href: "https://doi.org/10.1207/s15516709cog1202_4",
    body: "Sweller (1988) examined how the demands of solving a problem can use up the working memory that learning needs. It informs our choice to keep each hint to one step, as described on the Method page; it is a design influence, not evidence that ARIA works.",
  },
] as const;

const ideas = [
  {
    title: "Learning with a more capable other",
    cite: "Vygotsky (1978), Mind in Society, Harvard University Press (a book; no DOI).",
    motive: "Vygotsky described the gap between what a learner can do alone and what they can do with a little guidance. It motivates ARIA\u2019s question of how much help is enough.",
    limit: "ARIA does not test it: we measure when a tutor speaks in old logs, not what a student can do with or without help.",
  },
  {
    title: "Metacognition",
    cite: "Flavell (1979), American Psychologist 34(10), 906\u2013911.",
    doi: "https://doi.org/10.1037/0003-066X.34.10.906",
    motive: "Flavell described people monitoring their own thinking. It motivates the idea that a student should get a chance to notice a wrong step before the tutor speaks.",
    limit: "ARIA does not test it: nothing here measures whether a student monitors their own thinking.",
  },
  {
    title: "Productive failure",
    cite: "Kapur (2008), Cognition and Instruction 26(3), 379\u2013424.",
    doi: "https://doi.org/10.1080/07370000802212669",
    motive: "Kapur studied learners who struggle with a problem before being shown the method. It motivates asking whether early help is always better.",
    limit: "ARIA does not test it: we have no learning outcomes, so we cannot say whether staying quiet helps students learn.",
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
    title: "A symbolic engine checks the step.",
    body: "Each step the student writes is checked for correctness before ARIA decides whether to speak. A correct step is never treated as stuck, and a wrong step is never treated as progress.",
    detail: "Correctness comes from the math, not from the student’s tone.",
    tone: "cyan",
  },
  {
    number: "03",
    verb: "Scaffold",
    title: "ARIA offers one hint, or none.",
    body: "While the student is making progress, ARIA stays quiet and shows that it is watching. After a verified wrong step it gives one hint that points at the next authored step, or a short note without a hint while the risk is still below the profile’s bar. The student’s own answer is never given.",
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

export function Navigation() {
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
      <a className="summit-banner" href="/roadmap#summit">
        <span>ARIA is presenting at the Khan Lab School AI in Education Summit</span>
        <strong>October 24 · Mountain View</strong>
      </a>
      <div className="site-nav shell">
        <a className="wordmark" href="/" aria-label="ARIA">
          <AriaLogo />
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="/collaborate">
          Collaborate
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
            <a href="/collaborate" onClick={() => setOpen(false)}>
              <span>0{navItems.length + 1}</span>
              Collaborate
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
        <span className="live-label">Example interaction</span>
        <span>Select a student message</span>
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
        Whether a step is right or wrong comes from the math checker. The student&rsquo;s words are
        used only to notice uncertainty, frustration, and requests for help. ARIA does not diagnose
        a hidden mental state, ability, emotion, or disability.
      </p>
    </div>
  );
}

export function LanguageSignals() {
  return (
    <section className="section reasoning-examples" id="language-signals">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">Language signals</p>
          <h2>Different moments. Different questions.</h2>
        </div>
        <ThoughtPlayground />
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <>
    <section className="hero" id="home">
      <div className="shell hero-layout">
        <div className="hero-copy">
          <Reveal>
            <p className="kicker">Student-led research initiative · Mathematics · 2026</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1>
              When should a math tutor <span className="highlight">step in?</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="hero-lede">
              ARIA is a research prototype of a math tutor that decides when to intervene and when
              to stay quiet. A symbolic engine checks each step a student writes; a timing model fit
              on public logs from thousands of real students decides whether to offer a hint.
              We study whether choosing <em>when</em> to help, not only what to
              say, changes how students persist. Results so far come from software tests and from
              offline replay of student logs, not from classroom studies.
            </p>
          </Reveal>
          <Reveal className="hero-actions" delay={0.18}>
            <a className="btn btn--pear" href="#evidence">
              Results to date <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href="/pace">
              ARIA-Pace, the timing model <span aria-hidden="true">→</span>
            </a>
          </Reveal>
          <Reveal className="hero-trust" delay={0.24}>
            <span>Research prototype, not a product</span>
            <span>Evaluated on logs, not yet with students</span>
            <span>The student&rsquo;s answer is never revealed</span>
          </Reveal>
          <p className="hero-stage-note">
            Classroom pilots are not open yet. <a href="/research">See the evidence</a>
          </p>
        </div>
      </div>
    </section>
    <section className="demo-section" id="preview" aria-label="Example tutoring moments">
      <div className="shell">
        <Reveal delay={0.14}>
          <MathPreview />
        </Reveal>
      </div>
    </section>
    </>
  );
}

export function SummitFollowUp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const now = Date.now();
    setVisible(
      now >= Date.parse("2026-10-19T00:00:00-04:00") && now < Date.parse("2026-10-28T00:00:00-04:00"),
    );
  }, []);
  if (!visible) return null;
  return (
    <aside className="summit-followup" aria-label="Summit follow-up">
      <div className="shell">
        <strong>Met us at Khan Lab School?</strong>
        <a href="#preview">See the examples</a>
        <a href="/activity">Try the teacher activity</a>
        <a href="/participate">Plan a classroom evaluation</a>
        <a href="/pace">See the evidence</a>
      </div>
    </aside>
  );
}

export function About() {
  return (
    <section className="idea-section section" id="about">
      <div className="shell idea-layout">
        <div className="idea-statement">
          <p className="kicker">Motivation</p>
          <h2>
            Getting the answer is not the same as learning to recover.
            <span>ARIA asks whether a tutor that waits can strengthen independent reasoning.</span>
          </h2>
        </div>
        <div className="idea-notes">
          <Reveal>
            <article>
              <span>01</span>
              <h3>Origin</h3>
              <p>
                The question came from wanting to understand why tutors interrupt students who are
                mid-thought: help that arrives too fast removes the chance to plan, work through
                confusion, and recover when a strategy fails. That motivates the study; it is not
                evidence for it.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article>
              <span>02</span>
              <h3>The gap</h3>
              <p>
                Most tutoring software responds to every step. The learning-sciences literature has
                long asked when help should be given and when it should be withheld (the assistance
                dilemma), but few tools treat staying quiet as a decision in its own right.
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <article>
              <span>03</span>
              <h3>The research question</h3>
              <p>
                Can a tutor that verifies each step and chooses when to intervene reduce
                unnecessary interruptions without leaving stuck students unhelped, and does that
                timing change how students persist? ARIA is the instrument for asking it.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function WhyMath() {
  return (
    <section className="why-math section" id="why-math">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Scope</p>
            <h2>Why the study is limited to mathematics.</h2>
          </div>
          <p>
            Mathematics is where a tutor&rsquo;s timing can be studied honestly before anyone
            claims it works elsewhere. Each step can be checked, so the decision to intervene can be
            tied to a verified error rather than to a guess about the student.
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

export function HelpModel() {
  return (
    <section className="help-model section" id="help-model">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">Intervention design</p>
          <h2>One hint at a time, aimed at the next step.</h2>
          <p>
            Once ARIA has decided to speak after a verified wrong step, it gives one hint at a time.
            The student&rsquo;s own answer is never given. Keeping each hint to one step is a design
            choice informed by work on cognitive load during problem solving (Sweller, 1988); it is
            a design influence, not evidence that ARIA works.{" "}
            <a href="/research#ideas">Ideas this builds on</a>.
          </p>
        </div>
        <ol className="level-list">
          {helpLevels.map((item) => (
            <li className={`level-card level-card--${item.tone}`} key={item.level}>
              <div className="level-card__mark">
                <span>{item.mark}</span>
                <strong>{item.level}</strong>
              </div>
              <div className="level-card__body">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.example ? <blockquote>“{item.example}”</blockquote> : null}
                <small>{item.gate}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WatchedStates() {
  return (
    <section className="watched section" id="states">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Intervention policy</p>
            <h2>Quiet does not always mean stuck.</h2>
          </div>
          <p>
            ARIA decides whether to speak before it decides what to say. The state comes from
            verified correctness first; the student&rsquo;s words add flags on top. In the live
            tutor, these are the situations the policy distinguishes.
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

export function StudentFeedback() {
  return (
    <section className="feedback section" id="student-feedback">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">Planned · Student interviews</p>
          <h2>From data we generated to students we listen to.</h2>
        </div>
        <div className="feedback-layout">
          <Reveal className="feedback-copy">
            <p>
              ARIA&rsquo;s language classifier was built on synthetic think-aloud examples: text
              generated to imitate how students describe their reasoning. The timing model has since
              been evaluated on real student logs, but no student has yet used ARIA in a study, and
              the logs record behaviour, not what students wanted.
            </p>
            <p>
              The next phase is structured interviews with students who struggle in mathematics,
              asking what happens when they get stuck and what kind of help has and has not worked.
              Interviews with minors require ethics review and parental consent, and will not begin
              until both are in place.
            </p>
            <p>
              What we learn is meant to change the system, not just the write-up: which situations
              the policy distinguishes, how hints are worded and chosen, and what the
              interface asks of a student who is already frustrated.
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

export function Roadmap() {
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

export function Limitations() {
  return (
    <section className="limitations section" id="limitations">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Limitations</p>
            <h2>What the current evidence does not show.</h2>
          </div>
          <p>
            ARIA is an early-stage research prototype. Each limitation below is a reason a claim
            on this site is phrased the way it is.
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

export function TestingNext() {
  return (
    <section className="testing-next section" id="testing-next">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">Open questions</p>
          <h2>Four questions the current evidence cannot answer.</h2>
          <p>
            Log replay and software tests cannot answer these. Student interviews and prototype
            sessions are designed to, and any of them could come back against the design.
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

export function IdeasBuildOn() {
  return (
    <section className="inspiration section" id="ideas">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Background</p>
            <h2>Ideas this builds on.</h2>
          </div>
          <p>
            These ideas motivated the question. Each one is listed with what ARIA does not test, so
            none of them should be read as support for a result. Cognitive load (Sweller, 1988) is
            described in the related-work cards below.
          </p>
        </div>
        <div className="inspiration-grid">
          {ideas.map((item) => (
            <article className="inspiration-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.motive}</p>
              <p><strong>{item.limit}</strong></p>
              <p><small>{item.cite}{"doi" in item ? <> <a href={item.doi}>DOI</a></> : null}</small></p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Inspiration() {
  return (
    <section className="inspiration section" id="inspiration">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Related work</p>
            <h2>Research this work builds on.</h2>
          </div>
          <p>
            ARIA is a student project. These are the lines of learning-sciences research that
            define the question and the method. The full list, with verification notes, is on the
            ARIA-Pace page.
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
          be read as their validation of ARIA. <a href="/pace#sources">Sources and verification notes</a>.
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
      <div className="stage-visual visual-state" aria-label="A symbolic engine checks the student’s step">
        <div>
          <span>Step check</span>
          <strong>12x³ − 10x</strong>
          <small>Partial: two of three terms correct</small>
        </div>
        <ul>
          <li>
            <span>12x³ verified</span>
            <i className="bar bar--high" />
          </li>
          <li>
            <span>−10x verified</span>
            <i className="bar bar--high" />
          </li>
          <li>
            <span>+7 not yet written</span>
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

export function Workflow() {
  return (
    <section className="workflow section" id="workflow-details">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">Method</p>
          <h2>Notice, verify, scaffold, step back.</h2>
          <p>
            The cycle stays on the step in front of the student. ARIA reads what they write, checks
            the mathematics, decides whether to say anything, and looks for the support to become
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

export function Research({ compact = false }: { compact?: boolean }) {
  if (compact) return <EvidenceSummary />;
  return (
    <section className="research section" id="research">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Results to date</p>
            <h2>Two kinds of evidence. Neither is a learning result.</h2>
          </div>
          <p>
            Software checks on synthetic text test whether the system behaves as designed. An
            offline replay of real student logs (ARIA-Pace) tests the timing policy. No study with
            students has been run.
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

        {compact ? (
          <div className="hero-actions">
            <a className="btn btn--ink" href="/pace">
              ARIA-Pace results and protocol <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="/research">
              All results and limitations <span aria-hidden="true">→</span>
            </a>
          </div>
        ) : null}

        {compact ? null : (
        <Reveal className="results-sheet">
          <div className="results-sheet__head">
            <div>
              <span>Language classifier · development benchmark</span>
              <h3>Useful for finding failures. Not evidence of learning.</h3>
            </div>
            <p>Synthetic examples · no human ground truth · the timing decision does not depend on it</p>
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
                  <th scope="row">Same-generator synthetic recognition</th>
                  <td>84.6%</td>
                  <td>About 85 of 100 held-out simulated messages from the same generator matched their designed label; no human ground truth.</td>
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
            <strong>What these numbers describe.</strong>
            <p>
              They test the language classifier on text written by language models in the same
              style as its training data. They cannot show that ARIA understands real students. In
              the current tutor, whether to step in is decided by verified correctness and the
              timing model, not by this classifier; it only adds flags for frustration, confusion,
              and requests for help.
            </p>
          </div>
        </Reveal>
        )}

        {compact ? null : (
        <Reveal className="method-summary">
          <div className="method-summary__intro">
            <p className="kicker">Evidence gates</p>
            <h3>Each stronger claim needs a stronger kind of evidence.</h3>
            <p>
              The protocol separates software correctness, offline replay, educator judgment,
              real-language validation, feasibility with students, and learning outcomes. A result
              advances only the claim it tests.
            </p>
          </div>
          <ol className="method-summary__steps">
            <li>
              <span>01</span>
              <p>
                <strong>Done:</strong> timing policy evaluated once on a locked held-out split of
                2009–10 student logs and once on a locked 2012–13 split (those numbers are held
                until the dataset terms are confirmed, as on the ARIA-Pace page), with the
                specification committed before modeling.
              </p>
            </li>
            <li>
              <span>02</span>
              <p>
                <strong>Pending:</strong> educator review of the problem bank; teacher judgments on
                when to intervene.
              </p>
            </li>
            <li>
              <span>03</span>
              <p>
                Validate the language flags on real student messages, split by complete student or
                session, against independent human labels.
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
            Evaluation methodology <span aria-hidden="true">→</span>
          </a>
          <a className="text-link" href="/pace">
            ARIA-Pace results and protocol <span aria-hidden="true">→</span>
          </a>
        </Reveal>
        )}
      </div>
    </section>
  );
}

export function Summit() {
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
            Naren Saravanan and Karthik Malireddy will present ARIA&rsquo;s design, the ARIA-Pace
            results, and the limitations, and run a short activity asking teachers when they would
            step in. The aim is critique of the study design and, if a teacher is willing, a
            classroom pilot.
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
          <a className="text-link" href={summitTicketsUrl} target="_blank" rel="noreferrer">
            Event details <span aria-hidden="true">↗</span>
          </a>
          <div className="summit-next-links">
            <a href="/activity">Try the two-minute teacher activity →</a>
            <a href="/participate">Plan a school partnership →</a>
            <a href="/pace">Review the research →</a>
            <a href="/privacy">Privacy and data →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Researchers() {
  return (
    <section className="team section" id="founders">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">Researchers</p>
          <h2>Who is doing the work.</h2>
          <p>
            ARIA is a student-led project at Marvin Ridge High School. The question came from
            wanting to understand why tutors interrupt students who are mid-thought; the protocol is
            what keeps that motivation from becoming a claim. We are looking for a teacher or researcher to review the study design
            as an advisor.
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
                  ? "Research direction, the timing-model study, and the question at the center of ARIA."
                  : "Co-research, system development, and evaluation of the tutor."}
              </p>
            </Reveal>
          ))}
        </div>
        <div className="team-context">
          <p>
            <strong>Based in:</strong> Waxhaw, North Carolina · Eastern Time. School partnerships
            may involve remote support, agreed before any sessions.
          </p>
          <p>
            <strong>Advisor:</strong> open. We welcome educators and researchers to review the
            study design and consent process. <a href="/collaborate">See where we need help →</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Join() {
  const groups = [
    {
      label: "Teachers and advisors",
      text: "Review the study design, tell us which outcomes are worth measuring, or host a small classroom pilot: two or three sessions, offline, no student accounts. The pilot is designed so that student text stays on the device, but that is not yet promised (see the privacy page). We would rather have the design criticised now than defended later.",
      cta: "Review the study design",
      detail: { href: "/participate", label: "Classroom planning form" },
    },
    {
      label: "Students",
      text: "If you have struggled with math tutoring tools, tell us where you get stuck, which tools you stopped using, and whether you would type, tap, or speak. You do not need to be good at math to help.",
      cta: "Share your experience",
      detail: { href: "/students", label: "Three optional questions" },
    },
    {
      label: "Researchers",
      text: "Real student transcripts with permission to use them, independent annotation, review of the consent and ethics protocol, or methods critique of the ARIA-Pace study.",
      cta: "Discuss data or methods",
      detail: { href: "/researchers", label: "What we need from researchers" },
    },
  ];

  return (
    <section className="join section" id="join">
      <div className="shell">
        <div className="join-lead">
          <h2>Collaborate. The study design gains more from criticism now than from defence later.</h2>
          <a className="btn btn--pear" href="mailto:11narensara11@gmail.com?subject=ARIA%20research%20collaboration">
            Contact the researchers <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="join-paths">
          {groups.map((group, index) => (
            <article key={group.label}>
              <span>0{index + 1}</span>
              <h3>{group.label}</h3>
              <div className="join-path-body">
                <p>{group.text}</p>
                <a className="text-link" href={group.detail.href}>
                  {group.detail.label} <span aria-hidden="true">→</span>
                </a>
              </div>
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
          <h3>Occasional updates when there is new evidence.</h3>
          <p>Results, limitations, and ways to participate. Sent only when something has changed, including when a result goes against the design.</p>
          <a
            className="btn btn--cyan"
            href="mailto:11narensara11@gmail.com?subject=Add%20me%20to%20ARIA%20research%20updates"
          >
            Request updates
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="shell footer-meta">
        <a className="footer-wordmark" href="/" aria-label="ARIA">
          <AriaLogo />
        </a>
        <p>Research by Naren Saravanan and Karthik Malireddy · Last updated October 2026</p>
        <div>
          <a href="/pace">ARIA-Pace</a>
          <a href="/methodology">Methodology</a>
          <a href="/activity">Teacher activity</a>
          <a href="/participate">For educators</a>
          <a href="/students">For students</a>
          <a href="/researchers">For researchers</a>
          <a href="/privacy">Privacy and data</a>
          <a href="https://github.com/NarenS31/aria.kls">Code and results</a>
          <a href="mailto:11narensara11@gmail.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export function Overview() {
  return (
    <section className="why-math section" id="overview">
      <div className="shell">
        <div className="section-intro section-intro--split">
          <div>
            <p className="kicker">Overview</p>
            <h2>The project in six parts.</h2>
          </div>
          <p>
            This page is a summary. Each part below has its own page with the full detail, and the
            ARIA-Pace page carries every number with its source.
          </p>
        </div>
        <div className="why-math-grid overview-grid">
          {overviewCards.map((card, index) => (
            <Reveal key={card.href} delay={index * 0.05}>
              <a className={`why-math-card overview-card${index === 0 ? " overview-card--pace" : ""}`} href={card.href}>
                <span>{card.kicker}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <em className="text-link">
                  {card.cta} <span aria-hidden="true">→</span>
                </em>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro section">
      <div className="shell">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        {children ? <p className="hero-lede">{children}</p> : null}
      </div>
    </section>
  );
}

export function SitePage({ children, progress = false }: { children: ReactNode; progress?: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {progress ? <ScrollProgress /> : null}
      <Navigation />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.22 });
  return <motion.div className="page-progress" style={{ scaleX: progress }} />;
}

export default function AriaExperience() {
  return (
    <SitePage progress>
      <SummitFollowUp />
      <Hero />
      <Overview />
      <Research compact />
      <EducatorSection />
      <EducatorIntake />
      <Roadmap />
      <Summit />
      <Join />
    </SitePage>
  );
}
