import { metrics } from "./data";

export function StudentValue() {
  return (
    <section className="student-value section" id="how-it-works">
      <div className="shell">
        <div className="value-heading">
          <p className="kicker">For the learner</p>
          <h2>A next step that is still yours.</h2>
          <p>Planning, checking, trying again. ARIA is built around the moments that make up mathematical thinking.</p>
        </div>
        <div className="value-rows">
          <article><span className="value-number">01</span><div><h3>Space to keep going.</h3><p>A valid step does not need another question. When the math is progressing, ARIA stays quiet.</p></div><p className="value-example"><span>Valid step</span>3x − 3 = 9<strong>Watching. No interruption.</strong></p></article>
          <article><span className="value-number">02</span><div><h3>A small prompt when it matters.</h3><p>A wrong step or request for help can trigger support. It begins with a question, then a more focused hint if needed.</p></div><p className="value-example"><span>Prompt from the demo</span>“Write (x + 3)(x + 3) and multiply each term. What do you get?”</p></article>
          <article><span className="value-number">03</span><div><h3>Practice the thinking, too.</h3><p>Explain a plan, notice an error, and choose a next move. The research question is whether that support helps students persist independently.</p></div><p className="value-example"><span>The goal</span>Plan. Check. Revise.<strong>Learning outcomes still need a student study.</strong></p></article>
        </div>
      </div>
    </section>
  );
}

export function EducatorSection() {
  return (
    <section className="educator-section section" id="educators">
      <div className="shell educator-layout">
        <div><p className="kicker">Built with educators</p><h2>You know when a student needs a little help.</h2><p>Help us study those moments. Try eight examples, compare your judgment with ARIA’s logged decisions, or help shape a classroom evaluation.</p><div className="educator-actions"><a className="btn btn--ink" href="/activity">Try the teacher preview <span aria-hidden="true">→</span></a><a className="text-link" href="/participate">Help plan a classroom study →</a></div></div>
        <div className="study-outline">
          <span className="kicker">A proposed study, planned together</span>
          <dl><div><dt>2–3 sessions</dt><dd>30–45 minutes each; format agreed with your school.</dd></div><div><dt>Algebra through calculus</dt><dd>Typed mathematics, with tasks and measures chosen together.</dd></div><div><dt>A teacher-informed direction</dt><dd>Session summaries and classroom visibility are planned, not available features.</dd></div></dl>
          <p className="study-gate"><strong>Planning stage.</strong> Pilot enrollment follows offline checks, teacher-summary tests, release checks, consent review, and school approval.</p>
        </div>
      </div>
    </section>
  );
}

export function EvidenceSummary() {
  return (
    <section className="evidence-summary section" id="evidence">
      <div className="shell">
        <div className="evidence-heading">
          <div>
            <p className="kicker">Results to date</p>
            <h2>Two kinds of evidence.<br />Neither is a learning result.</h2>
          </div>
          <p>
            Software checks on synthetic text test whether the system behaves as designed. An
            offline replay of real student logs (ARIA-Pace) tests the timing policy. No study with
            students has been run.
          </p>
        </div>
        <div className="evidence-ledger">
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.eyebrow}</span>
              <strong>{metric.value}</strong>
              <div>
                <h3>{metric.label}</h3>
                <p>{metric.description}</p>
                <small>{metric.technical}</small>
              </div>
            </article>
          ))}
        </div>
        <div className="evidence-links">
          <a href="/pace">ARIA-Pace results and protocol →</a>
          <a href="/research">All results and limitations →</a>
          <a href="/methodology">Evaluation methodology →</a>
        </div>
      </div>
    </section>
  );
}

export function CommonQuestions() {
  return (
    <section className="common-questions section" id="questions">
      <div className="shell">
        <div className="section-intro">
          <p className="kicker">Before you try it</p>
          <h2>A few practical questions.</h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Who is ARIA for?</summary>
            <p>
              ARIA is a research prototype for math learners working through algebra, trigonometry,
              and calculus. The demo bank has 30 problems. It is not limited to students with a
              particular diagnosis, and it makes no claim about any group of learners.
            </p>
          </details>
          <details>
            <summary>Can I use the tutor on this website?</summary>
            <p>
              This website offers logged examples and an eight-moment teacher activity. The tutor
              itself is a separate application, shown at the summit. The examples are logged
              decisions from the summit build (tag summit-2026-10-24); they are not a live tutoring
              session.
            </p>
          </details>
          <details>
            <summary>Will ARIA give away the answer?</summary>
            <p>
              The tutor is designed to start with prompts and small hints, and every reply is
              checked for the answer before it is shown. In scripted runs on the eight featured
              problems no reply revealed an answer (results/demo_harness_summit_pace.json in the aria.kls repository); real-student evaluation is still pending.
            </p>
          </details>
          <details>
            <summary>Can my class try ARIA?</summary>
            <p>
              We are planning school partnerships, but pilot enrollment is not open. Offline checks,
              teacher summaries, consent review, and school approval must come first.{" "}
              <a href="/participate">Help shape the proposed study →</a>
            </p>
          </details>
          <details>
            <summary>What happens to my responses?</summary>
            <p>
              The teacher activity keeps responses in browser memory and downloads a CSV only when
              you request it. It does not upload your answers. The planning form and the student
              questions do not send anything either: one prepares an email you review and send
              yourself, the other downloads a file. <a href="/privacy">Read the privacy page →</a>
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
