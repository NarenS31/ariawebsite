import { SitePage, SummitFollowUp } from "../AriaExperience";
import { demoBuild, momentById } from "../demoMoments";
import WheelExplainer from "./WheelExplainer";
import { CountUp, Reveal } from "./motion";
import { Doodle, Underline } from "./ui";
import { headline } from "./paceData";

export function JoinCards({ compact = false }: { compact?: boolean }) {
  const cards = [
    { tone: "yellow", who: "Teachers", ask: "Try the 8 moments and help plan a reviewed classroom pilot.", href: "/team#join" },
    { tone: "ink", who: "Researchers", ask: "Review our methods, replicate the replay, or collaborate.", href: "/team#join" },
    { tone: "warm", who: "Students", ask: "Tell us how a hint should feel when you are stuck.", href: "/team#join" },
    { tone: "tint", who: "Advisors and mentors", ask: "We are looking for an adult advisor for ethics review and study design.", href: "/team#join" },
  ];
  return (
    <ul className={`joincards${compact ? " joincards--compact" : ""}`}>
      {cards.map((c, i) => (
        <li key={c.who} className={`joincard joincard--${c.tone}`} style={{ ["--tilt" as string]: `${[-0.6, 0.5, -0.4, 0.6][i]}deg` }}>
          <h3>{c.who}</h3>
          <p>{c.ask}</p>
          <a href={c.href}>
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function HomePage() {
  const watching = momentById("M2");
  const stepping = momentById("M8");
  return (
    <SitePage progress>
      <SummitFollowUp />
      <div className="v2">
        <section className="band band--grid hero2" id="home">
          <div className="wrap g12">
            <div className="hero2__copy c-5">
              <p className="eyebrow">Student-led research initiative · Mathematics</p>
              <h1>
                When should a tutor <Underline>speak up?</Underline>
              </h1>
              <p className="lede">
                ARIA is a math tutor that decides, step by step, whether a hint helps or interrupts, using a timing model fit on real student logs.
              </p>
              <div className="actions">
                <a className="btn2 btn2--ink" href="/activity">
                  Try the 8 moments <span aria-hidden="true">→</span>
                </a>
                <a className="btn2 btn2--line" href="/pace">
                  Read the research
                </a>
              </div>
              <p className="fineprint">Evaluated by replaying logged data, not in a classroom.</p>
            </div>
            <div className="hero2__stage c-7">
              <Doodle kind="burst" className="hero2__burst" />
              <WheelExplainer />
              <ul className="chips" aria-label="Headline results">
                <li className="chip chip--a">
                  <b>
                    <CountUp value={headline.fewer} suffix="%" />
                  </b>
                  <span>fewer skill sequences hinted (Quiet setting)</span>
                </li>
                <li className="chip chip--b">
                  <b>
                    <CountUp value={headline.missedPct} decimals={1} suffix="%" />
                  </b>
                  <span>missed help ({headline.missedN} of {headline.missedOf})</span>
                </li>
                <li className="chip chip--c">
                  <b>
                    <CountUp value={headline.testStudents} />
                  </b>
                  <span>held-out students, ASSISTments 2009–10</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="band band--white product" id="product">
          <div className="wrap g12">
            <Reveal className="product__copy c-4">
              <p className="eyebrow">The tutor</p>
              <h2>Quiet while the math is moving. One small hint when it is not.</h2>
              <p>
                Each step a student types is checked symbolically. A right step gets no interruption. A verified wrong step can earn one hint that points at the next move, never the answer.
              </p>
              <a className="textlink" href="/method">
                How a step is checked <span aria-hidden="true">→</span>
              </a>
              <p className="fineprint">Panels use the logged decisions and replies from summit build {demoBuild}.</p>
            </Reveal>
            <Reveal className="product__panels c-8" delay={80}>
              <article className="panel panel--watch" aria-label="A step where ARIA stays quiet">
                <header>
                  <img src="/aria-symbol.svg" width="26" height="26" alt="" />
                  <b>ARIA</b>
                  <span className="state state--watch">Watching</span>
                </header>
                <p className="panel__problem">{watching.problem}</p>
                <p className="panel__step">
                  <small>Student step</small>
                  {watching.turns[watching.turns.length - 1]}
                </p>
                <p className="panel__reply panel__reply--quiet">The step checks out. ARIA stays quiet.</p>
              </article>
              <article className="panel panel--step" aria-label="A step where ARIA steps in">
                <header>
                  <img src="/aria-symbol.svg" width="26" height="26" alt="" />
                  <b>ARIA</b>
                  <span className="state state--step">Stepping in</span>
                </header>
                <p className="panel__problem">{stepping.problem}</p>
                <p className="panel__step">
                  <small>Student step</small>
                  {stepping.turns[stepping.turns.length - 1]}
                </p>
                <p className="panel__reply">{stepping.reply}</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="band band--dark status" id="status">
          <div className="wrap g12">
            <Reveal className="c-6">
              <p className="eyebrow eyebrow--on-dark">Where the evidence stands</p>
              <p className="status__big">No study with students has been run.</p>
            </Reveal>
            <Reveal className="c-6 status__list" delay={80}>
              <ol>
                <li>
                  <b>Done</b>
                  <span>A timing model fit on public student logs and replayed on a locked test.</span>
                </li>
                <li>
                  <b>Planned</b>
                  <span>Student interviews, then small prototype sessions, both after ethics review and consent.</span>
                </li>
                <li>
                  <b>Later</b>
                  <span>A classroom evaluation designed with teachers.</span>
                </li>
              </ol>
              <a className="textlink textlink--on-dark" href="/roadmap">
                See the roadmap <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
        </section>

        <section className="band band--warm" id="involved">
          <div className="wrap">
            <Reveal className="sechead">
              <p className="eyebrow">Get involved</p>
              <h2>We would rather have the design criticized now than defended later.</h2>
            </Reveal>
            <Reveal delay={60}>
              <JoinCards />
            </Reveal>
          </div>
        </section>
      </div>
    </SitePage>
  );
}
