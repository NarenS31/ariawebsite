"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  cognitiveStates,
  features,
  metrics,
  stateResults,
  team,
  type Feature,
} from "./data";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Research", href: "#research" },
  { label: "See Us", href: "#see-us" },
  { label: "Team", href: "#about" },
  { label: "Get Involved", href: "#get-involved" },
] as const;

const revealTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] } as const;
const summitTicketsUrl =
  "https://www.eventbrite.com/e/ai-in-education-summit-2026-khan-lab-school-tickets-1988581168807?aff=oddtdtcreator";

function Reveal({
  children,
  className,
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
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? " eyebrow--light" : ""}`}>{children}</p>;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <Reveal className={`section-heading${light ? " section-heading--light" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  );
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -64% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label="ARIA Research Initiative home">
          <span className="brand-name">ARIA</span>
          <span className="brand-rule" aria-hidden="true" />
          <span className="brand-descriptor">Research Initiative</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={activeSection === item.href.slice(1) ? "active" : ""}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="site-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function SystemDiagram() {
  const reduceMotion = useReducedMotion();
  const stages = [
    {
      number: "01",
      kicker: "Student signal",
      title: "Think-aloud reasoning + behavioral features",
    },
    {
      number: "02",
      kicker: "Real-time inference",
      title: "Cognitive state detection",
      states: true,
    },
    {
      number: "03",
      kicker: "State-specific response",
      title: "One metacognitive question, never the answer",
      detail: "“What is your plan before you begin the next step?”",
    },
  ];

  return (
    <motion.div
      className="system-card"
      initial={reduceMotion ? false : { opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ...revealTransition, delay: 0.28 }}
      aria-label="ARIA real-time metacognitive intervention pipeline"
    >
      <div className="system-header">
        <span>ARIA / System overview</span>
        <span className="device-tag">On-device</span>
      </div>
      <div className="system-body">
        {stages.map((stage, index) => (
          <div key={stage.number}>
            <motion.div
              className={`system-step${index === 1 ? " system-step--active" : ""}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.38 + index * 0.11 }}
            >
              <span className="step-index">{stage.number}</span>
              <span>
                <span className="step-kicker">{stage.kicker}</span>
                <strong>{stage.title}</strong>
                {stage.states && (
                  <span className="state-cloud">
                    {cognitiveStates.map((state) => (
                      <span className="state-pill" key={state}>
                        {state}
                      </span>
                    ))}
                  </span>
                )}
                {stage.detail && <span className="step-detail">{stage.detail}</span>}
              </span>
            </motion.div>
            {index < stages.length - 1 && <div className="system-connector" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="system-outcome">
        <span>Longitudinal objective</span>
        <strong>
          Self-initiated metacognition <b>↑</b>
        </strong>
      </div>
    </motion.div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="hero" id="home">
      <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          {[
            <Eyebrow key="eyebrow">Independent research initiative · Open research</Eyebrow>,
            <h1 key="title">
              Teaching Students with Learning Disabilities to Think, Not Just Answer
            </h1>,
            <p className="hero-lede" key="lede">
              ARIA detects cognitive states from student think-alouds in real time and responds
              with metacognitive interventions instead of answers. Everything runs locally. No
              student data ever leaves the device.
            </p>,
            <div className="hero-actions" key="actions">
              <a className="button button--primary" href="#research">
                Explore the research <span>→</span>
              </a>
              <a className="button button--secondary" href="#get-involved">
                Collaborate with us
              </a>
            </div>,
            <p className="hero-proof" key="proof">
              Accepted to present at the Khan Lab School AI in Education Summit 2026
            </p>,
          ].map((child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: revealTransition },
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
        <SystemDiagram />
      </div>
      <motion.div
        className="scroll-cue"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-hidden="true"
      >
        <span>Scroll to examine the research</span>
        <i />
      </motion.div>
    </section>
  );
}

function Problem() {
  const problems = [
    {
      number: "01",
      label: "The gap",
      title: "AI tutors are not designed for neurodivergent learners.",
      body: "Students with ADHD and learning disabilities represent 20% of all students but remain absent from AI tutor design decisions. Standard tutors answer questions. That is not what these students need.",
    },
    {
      number: "02",
      label: "The deficit",
      title: "The missing skill is metacognition.",
      body: "Planning before starting. Monitoring while working. Catching your own errors. These are learnable skills that ADHD specifically impairs, and schools rarely teach them explicitly.",
    },
    {
      number: "03",
      label: "The opportunity",
      title: "AI can scale better questions, not just faster answers.",
      body: "Bloom’s 1984 “2 Sigma” study showed the power of one-on-one tutoring. AI can extend individualized support, but only when it is built around how neurodivergent students actually learn.",
    },
  ];

  return (
    <section className="section problem-section" id="problem">
      <div className="container">
        <Reveal>
          <blockquote className="pull-quote">
            “For over a century, education has been designed for the average student.”
          </blockquote>
        </Reveal>
        <div className="problem-grid">
          {problems.map((problem, index) => (
            <Reveal key={problem.number} delay={index * 0.08}>
              <article className="problem-card">
                <div className="problem-meta">
                  <span>{problem.number}</span>
                  <span>{problem.label}</span>
                </div>
                <h3>{problem.title}</h3>
                <p>{problem.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ icon }: { icon: Feature["icon"] }) {
  return (
    <span className={`feature-icon feature-icon--${icon}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function HowItWorks() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow="Research method"
          title="How ARIA Works"
          description="Language, behavioral signals, and state-specific prompts make the learning process, not the final answer, the center of each intervention."
        />
        <div className="feature-grid">
          {features.map((feature, index) => (
            <Reveal key={feature.number} delay={(index % 3) * 0.06}>
              <motion.article
                className="feature-card"
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="feature-topline">
                  <FeatureIcon icon={feature.icon} />
                  <span>{feature.number}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Research() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section research-section" id="research">
      <div className="container">
        <SectionHeading
          light
          eyebrow="Early research results"
          title="What the Numbers Mean"
          description="ARIA shows promising early performance in controlled testing. These results come from simulated student responses, so studies with real students are the essential next step."
        />
        <Reveal>
          <div className="results-intro">
            <span>Plain-language takeaway</span>
            <p>
              ARIA correctly identified a student’s likely thinking state most of the time, but it
              was not equally strong in every situation. It recognized frustration, rushing, and
              insight especially well. Detecting flow was harder, and performance dropped when the
              writing style changed. That tells us both where the system is promising and where
              more research is needed.
            </p>
          </div>
        </Reveal>
        <div className="metric-grid">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.07}>
              <motion.article
                className="metric-card"
                whileHover={reduceMotion ? undefined : { borderColor: "rgba(143, 192, 239, .55)" }}
              >
                <strong>{metric.value}</strong>
                <h3>{metric.label}</h3>
                <p>{metric.description}</p>
                <small>{metric.technical}</small>
              </motion.article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="results-panel">
            <div className="results-header">
              <div>
                <span>Experiment 01</span>
                <h3>Detailed results by thinking state</h3>
              </div>
              <span className="sample-tag">350 examples not used in training</span>
            </div>
            <div className="metric-key">
              <p>
                <strong>Balanced score</strong>
                Combines missed cases and incorrect predictions into one overall measure.
              </p>
              <p>
                <strong>Cases found</strong>
                Of all examples in that state, how many ARIA successfully detected.
              </p>
              <p>
                <strong>Predictions correct</strong>
                When ARIA named that state, how often it was right.
              </p>
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
                      <td>
                        <span className="table-dot" />
                        {result.state}
                      </td>
                      <td>{Math.round(Number(result.f1) * 100)}%</td>
                      <td>{Math.round(Number(result.recall) * 100)}%</td>
                      <td>{Math.round(Number(result.precision) * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="research-note">
              <strong>Important context:</strong> These are preliminary results, not evidence of
              classroom effectiveness. The test used simulated think-aloud responses generated
              with llama3.1:8b. Accuracy fell by an average of 19 points on writing from other
              generators, suggesting that the model learned some writing-style patterns. ARIA is
              adding behavioral signals such as pauses and typing rhythm to reduce that dependence.
              Validation with real students is still needed.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="section team-section" id="about">
      <div className="container">
        <SectionHeading
          eyebrow="Research team"
          title="Meet the ARIA Team"
          description="Two student researchers at Marvin Ridge High School investigating whether AI can teach durable metacognitive skills."
        />
        <div className="team-grid">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.08}>
              <article className="team-card">
                <div className="portrait" role="img" aria-label={`Photo placeholder for ${member.name}`}>
                  <span>Photo</span>
                </div>
                <div className="member-details">
                  <span>{member.role}</span>
                  <h3>{member.name}</h3>
                  <p>
                    {member.school}
                    <br />
                    {member.location}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="origin-story">
          <div className="origin-heading">
            <Eyebrow>Research origin</Eyebrow>
            <h2>Built from lived experience. Advanced through shared research.</h2>
          </div>
          <div className="origin-copy">
            <p className="origin-lead">
              ARIA began with a question shaped by Naren’s experience with ADHD: what if an AI
              tutor paid attention to how a student was thinking, instead of simply producing the
              next answer?
            </p>
            <div className="origin-researchers">
              <article>
                <span>01 / Naren Saravanan</span>
                <h3>Lived experience and research direction</h3>
                <p>
                  Naren’s experience exposed a gap in conventional AI tutoring. Immediate answers
                  can finish an assignment, but they do not necessarily help a student plan,
                  monitor confusion, or recover from getting stuck.
                </p>
              </article>
              <article>
                <span>02 / Karthick Mallireddy</span>
                <h3>Co-research and system development</h3>
                <p>
                  Karthick co-develops ARIA’s research approach, helping turn the core idea into a
                  testable system grounded in evidence, careful evaluation, and relevance to real
                  learning environments.
                </p>
              </article>
            </div>
            <p className="origin-mission">
              Together, the two Marvin Ridge seniors are investigating whether state-aware
              questions can help neurodivergent students build durable metacognitive skills. The
              goal is not an AI that thinks for students. It is an AI that helps students become
              more independent thinkers.
            </p>
          </div>
        </Reveal>

        <Reveal className="recognition-row">
          <span className="recognition recognition--accepted">
            <i />
            <span>
              <small>Accepted to present</small>
              Khan Lab School AI in Education Summit 2026
            </span>
          </span>
          <span className="recognition">
            <i />
            <span>
              <small>In preparation</small>
              NeurIPS 2026 Workshop Submission
            </span>
          </span>
        </Reveal>
      </div>
    </section>
  );
}

function SeeUs() {
  return (
    <section className="section summit-section" id="see-us">
      <div className="container">
        <Reveal>
          <div className="summit-shell">
            <div className="summit-date" aria-label="October 24, 2026">
              <span>October</span>
              <strong>24</strong>
              <span>2026</span>
            </div>
            <div className="summit-content">
              <Eyebrow>See ARIA in person</Eyebrow>
              <p className="summit-status">
                <i aria-hidden="true" />
                Accepted to present
              </p>
              <h2>Khan Lab School AI in Education Summit 2026</h2>
              <p className="summit-theme">
                Intentional Innovation: Keeping Learning Human in an AI World
              </p>
              <p className="summit-description">
                Meet Naren Saravanan and Karthick Mallireddy as they present ARIA and share how
                state-aware AI could help students with ADHD and learning disabilities become more
                independent thinkers. The summit brings together educators, researchers, students,
                and technology builders focused on using AI with purpose, rigor, and care.
              </p>
              <div className="summit-details">
                <div>
                  <span>Date and time</span>
                  <strong>Saturday, October 24, 2026</strong>
                  <p>8:00 AM to 5:00 PM Pacific Time</p>
                </div>
                <div>
                  <span>Location</span>
                  <strong>Khan Lab School, Middle &amp; Upper School</strong>
                  <p>1200 Villa Street, Mountain View, California</p>
                </div>
              </div>
              <div className="summit-actions">
                <a
                  className="button button--summit"
                  href={summitTicketsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get tickets to see us <span>↗</span>
                </a>
                <p>In person · Nine-hour summit · Free parking</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GetInvolved() {
  const groups = [
    {
      number: "01",
      title: "For Researchers",
      intro: "We are actively seeking collaboration on:",
      items: [
        "Real student think-aloud datasets",
        "Human annotation of cognitive-state labels",
        "IRB-approved pilot studies",
        "Extensions to other learning disabilities",
      ],
    },
    {
      number: "02",
      title: "For Educators",
      intro:
        "If you work with students who have ADHD, dyslexia, or other learning disabilities and want to pilot ARIA, we want to hear from you.",
      items: ["Classroom pilots", "Tutoring settings", "Curriculum feedback"],
    },
    {
      number: "03",
      title: "For Developers",
      intro: "We welcome technical collaboration on:",
      items: [
        "New cognitive-state taxonomies",
        "Additional language support",
        "Mobile interfaces",
        "Dataset collection tools",
      ],
    },
  ];

  return (
    <section className="section involved-section" id="get-involved">
      <div className="container">
        <SectionHeading
          light
          eyebrow="Collaborate"
          title="Get Involved"
          description="Better evidence, broader perspectives, and real-world pilots are essential to the next phase of this research."
        />
        <div className="involved-grid">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.08}>
              <article className="involved-card">
                <span>{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.intro}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href="mailto:11narensara11@gmail.com">Start a conversation →</a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="signup-panel">
            <div>
              <span>Research updates</span>
              <h3>Follow ARIA’s progress</h3>
              <p>No spam. Research updates only. We will never share your email.</p>
            </div>
            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
              <button type="submit">Follow the research</button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <span className="footer-brand">ARIA</span>
          <p>Research Initiative © 2026</p>
        </div>
        <p>Research by Naren Saravanan &amp; Karthick Mallireddy</p>
        <div className="footer-links">
          <a href="#research">Research</a>
          <a href="mailto:11narensara11@gmail.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <Navigation />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Research />
        <SeeUs />
        <Team />
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}
