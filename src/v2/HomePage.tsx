import { Hero, SitePage } from "../AriaExperience";
import { ConferenceInvitation, ConferenceResearch } from "../HomeSections";
import { Reveal } from "./motion";

export function JoinCards({ compact = false }: { compact?: boolean }) {
  const cards = [
    { tone: "yellow", who: "Teachers", ask: "Try the 8 moments and help plan a reviewed classroom pilot.", href: "/join" },
    { tone: "ink", who: "Researchers", ask: "Review our methods, replicate the replay, or collaborate.", href: "/join" },
    { tone: "warm", who: "Students", ask: "Tell us how a hint should feel when you are stuck.", href: "/join" },
    { tone: "tint", who: "Advisors and mentors", ask: "We are looking for an adult advisor for ethics review and study design.", href: "/join" },
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
  return (
    <SitePage progress>
      <div className="legacy-hero">
        <Hero />
      </div>
      <div className="v2">
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
              <p className="fineprint">Screenshots of the summit demo, tag summit-2026-10-24-pace.</p>
            </Reveal>
            <Reveal className="product__panels c-8" delay={80}>
              <figure className="shot shot--watch">
                <div className="shot__crop"><img src="/demo/03_watching.png" width={1280} height={1186} loading="lazy" alt="The ARIA demo in the Watching state: a wrong step at 15% risk, below the Balanced bar, so the hint is held." /></div>
                <figcaption><span className="state state--watch">Watching</span> Wrong step, risk 15%, below the Balanced bar of 19%: ARIA holds the hint.</figcaption>
              </figure>
              <figure className="shot shot--step">
                <div className="shot__crop"><img src="/demo/02_stepping_in.png" width={1280} height={1235} loading="lazy" alt="The ARIA demo in the Stepping in state: after wrong steps and a risk of 25%, the Balanced setting gives a hint." /></div>
                <figcaption><span className="state state--step">Stepping in</span> Wrong step, risk 25%, Balanced bar 19%: one hint.</figcaption>
              </figure>
              <figure className="shot shot--teacher">
                <div className="shot__crop"><img src="/demo/05_teacher_summary.png" width={1280} height={1484} loading="lazy" alt="The teacher summary tab: a timeline of each turn, where the student got stuck, and the hints given." /></div>
                <figcaption>
                  Teacher summary of the same session. <a href="/demo/05_teacher_summary.png">Open full size</a>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <div className="v2-legacy">
          <ConferenceInvitation />
          <ConferenceResearch />
        </div>

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
