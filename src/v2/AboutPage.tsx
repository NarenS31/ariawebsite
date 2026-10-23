import { SitePage } from "../AriaExperience";
import { JoinCards } from "./HomePage";
import { Reveal, SideNav } from "./motion";
import { Pill, PillarIcon } from "./ui";

const toc = [
  { id: "mission", label: "Mission" },
  { id: "what-aria-is", label: "What ARIA is" },
  { id: "why-math", label: "Why math?" },
  { id: "roadmap", label: "Roadmap" },
  { id: "team", label: "Team" },
  { id: "get-involved", label: "Get involved" },
];

const mathReasons = [
  {
    title: "A step can be checked.",
    body: "Algebra and calculus steps can be verified symbolically with SymPy. A wrong step is a checkable fact, not a guess about how the student feels, so ARIA only considers speaking after a verified error.",
  },
  {
    title: "Productive struggle is well studied in math.",
    body: "The assistance dilemma (Koedinger and Aleven, 2007) and productive failure (Kapur, 2008) both come out of math learning. There is a real literature for this work to be measured against.",
  },
  {
    title: "Wheel-spinning was defined on math practice.",
    body: "Beck and Gong (2013) described students who keep attempting a skill without mastering it, using math practice data. It is the outcome ARIA-Pace predicts.",
  },
  {
    title: "The logs we have are math.",
    body: "The public ASSISTments 2009–10 skill-builder logs are math problem sets. Our replay says something about those logs only, and nothing about other subjects.",
  },
];

const phases = [
  { n: 1, name: "Synthetic think-aloud data", status: "Complete" },
  { n: 2, name: "Timing model on real student logs", status: "Current" },
  { n: 3, name: "Student interviews", status: "Planned" },
  { n: 4, name: "Formative prototype testing", status: "Planned" },
  { n: 5, name: "Classroom and teacher-informed evaluation", status: "Planned" },
] as const;

export default function AboutPage() {
  return (
    <SitePage>
      <div className="v2">
        <header className="band band--grid pagehead">
          <div className="wrap">
            <p className="eyebrow">About</p>
            <h1>About ARIA</h1>
          </div>
        </header>

        <div className="doc">
          <div className="wrap doc__grid">
            <aside className="doc__aside">
              <SideNav items={toc} label="About page sections" />
            </aside>

            <div className="doc__main">
              <section className="docsec docsec--white" id="mission">
                <Reveal>
                  <p className="eyebrow">Mission</p>
                  <p className="mission">ARIA studies when a math tutor should speak up, and when it should stay quiet.</p>
                  <p className="lede lede--narrow">
                    A student-led research initiative at Marvin Ridge High School. We measure the timing decision on public data first, build the tutor around it, and talk to teachers before anything reaches a classroom.
                  </p>
                </Reveal>
                <ul className="pillars">
                  {[
                    { k: "research", t: "Research", b: "Offline evaluation on public data. A written-down protocol, a locked test set, and the negative results published next to the positive ones." },
                    { k: "tool", t: "Tool", b: "The ARIA tutor and its teacher-facing settings. Each step is checked symbolically; Quiet, Balanced and Supportive are cost settings for the timing rule." },
                    { k: "engagement", t: "Engagement", b: "Teachers, the Khan Lab School summit, and a planned reviewed pilot. Criticism of the study design is the most useful thing anyone can give us right now." },
                  ].map((p, i) => (
                    <Reveal as="li" className="pillar" key={p.k} delay={i * 70}>
                      <PillarIcon kind={p.k as "research" | "tool" | "engagement"} />
                      <h3>{p.t}</h3>
                      <p>{p.b}</p>
                    </Reveal>
                  ))}
                </ul>
              </section>

              <section className="docsec docsec--warm" id="what-aria-is">
                <Reveal>
                  <p className="eyebrow">What ARIA is</p>
                  <h2>Getting the answer is not the same as learning to recover.</h2>
                </Reveal>
                <div className="offset">
                  <Reveal className="note">
                    <h3>Origin</h3>
                    <p>
                      The question came from wondering why tutors interrupt students who are mid-thought. Help that arrives too fast can remove the chance to plan, work through confusion, and recover when a strategy fails. That motivates the study; it is not evidence for it.
                    </p>
                  </Reveal>
                  <Reveal className="note note--lower" delay={70}>
                    <h3>The gap</h3>
                    <p>
                      Most tutoring software responds to every step. The learning-sciences literature has long asked when help should be given and when it should be withheld, but few tools treat staying quiet as a decision in its own right.
                    </p>
                  </Reveal>
                  <Reveal className="note" delay={140}>
                    <h3>The research question</h3>
                    <p>
                      Can a tutor that verifies each step and chooses when to intervene reduce unnecessary interruptions without leaving stuck students unhelped, and does that timing change how students persist? ARIA is the instrument for asking it.
                    </p>
                  </Reveal>
                </div>
              </section>

              <section className="docsec docsec--white" id="why-math">
                <Reveal>
                  <p className="eyebrow">Scope</p>
                  <h2>Why math?</h2>
                  <p className="lede lede--narrow">Four reasons, all specific to mathematics. They explain a scope choice. They do not promise an outcome.</p>
                </Reveal>
                <ol className="reasons">
                  {mathReasons.map((r, i) => (
                    <Reveal as="li" key={r.title} delay={i * 60}>
                      <span className="reasons__n tnum">0{i + 1}</span>
                      <div>
                        <h3>{r.title}</h3>
                        <p>{r.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </ol>
                <Reveal className="callout">
                  <b>This is a scope choice, not a hidden limitation.</b> ARIA is not a general homework assistant, and we make no claims about subjects we have not studied.
                </Reveal>
              </section>

              <section className="docsec docsec--tint" id="roadmap">
                <Reveal>
                  <p className="eyebrow">Roadmap</p>
                  <h2>Five phases, in order. We are early.</h2>
                </Reveal>
                <Reveal as="ol" className="miniphases">
                  {phases.map((p) => (
                    <li key={p.n} className={p.status === "Current" ? "is-current" : undefined}>
                      <span className="tnum">Phase {p.n}</span>
                      <b>{p.name}</b>
                      <Pill status={p.status} />
                    </li>
                  ))}
                </Reveal>
                <a className="textlink" href="/roadmap">
                  Read the full roadmap <span aria-hidden="true">→</span>
                </a>
              </section>

              <section className="docsec docsec--white" id="team">
                <Reveal>
                  <p className="eyebrow">Team</p>
                  <h2>Two student researchers.</h2>
                  <p className="lede lede--narrow">Naren Saravanan and Karthik Malireddy, Marvin Ridge High School, Waxhaw, North Carolina.</p>
                  <a className="textlink" href="/team">
                    Meet the team <span aria-hidden="true">→</span>
                  </a>
                </Reveal>
              </section>

              <section className="docsec docsec--warm" id="get-involved">
                <Reveal>
                  <p className="eyebrow">Get involved</p>
                  <h2>Where we need help.</h2>
                </Reveal>
                <JoinCards compact />
              </section>
            </div>
          </div>
        </div>
      </div>
    </SitePage>
  );
}
