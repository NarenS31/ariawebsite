import { metrics } from "./data";

export function StudentValue() {
  return (
    <section className="student-value section" id="how-it-works">
      <div className="shell">
        <div className="value-heading">
          <p className="kicker">For the learner</p>
          <h2>A next step that is still yours.</h2>
          <p>ARIA supports mathematical thinking by giving students room to plan, check their work, and try again.</p>
        </div>
        <div className="value-rows">
          <article><span className="value-number">01</span><div><h3>Space to keep going.</h3><p>A valid step does not need another question. When the math is progressing, ARIA stays quiet.</p></div><p className="value-example"><span>Valid step</span>3x − 3 = 9<strong>ARIA watches without interrupting.</strong></p></article>
          <article><span className="value-number">02</span><div><h3>A small hint when it matters.</h3><p>A wrong step or a request for help can trigger one hint that points at the next step, never the answer.</p></div><p className="value-example"><span>Hint from the demo</span>“Write (x + 3)(x + 3) and multiply each term. What do you get?”</p></article>
          <article><span className="value-number">03</span><div><h3>Keep the thinking yours.</h3><p>Explain a plan, notice an error, and choose your next move. ARIA is designed to support that process rather than complete the problem for you.</p></div><p className="value-example"><span>The goal</span>Students plan, check their work, and revise their approach.</p></article>
        </div>
      </div>
    </section>
  );
}

export function ConferenceInvitation() {
  return <section className="educator-section section" id="educators">
    <div className="shell educator-layout">
      <div><p className="kicker">For educators</p><h2>When would you step in?</h2><p>Look at eight moments from a student&rsquo;s math work. Choose when you would offer help, then compare your decisions with ARIA&rsquo;s.</p><div className="educator-actions"><a className="btn btn--ink" href="/activity">Try the teacher activity <span aria-hidden="true">→</span></a></div></div>
      <div className="conference-invite-note"><h3>Bring your classroom perspective.</h3><p>The activity takes about two minutes. Your responses stay in your browser unless you choose to download and share them.</p><p>Interested in helping shape a classroom evaluation? We would like to hear what you would want to test.</p><a className="text-link" href="/participate">Start a conversation →</a></div>
    </div>
  </section>;
}

export function ConferenceResearch() {
  return <section className="section conference-research" id="evidence">
    <div className="shell educator-layout">
      <div><p className="kicker">Behind the tutor</p><h2>Good help is also about timing.</h2></div>
      <div><p>ARIA-Pace explores the tradeoff between offering a hint too early and leaving a student waiting too long. Our research compares timing policies using historical student logs.</p><div className="evidence-links"><a href="/pace">Explore the timing research →</a><a href="/method">See how ARIA works →</a></div></div>
    </div>
  </section>;
}

export function EducatorSection() {
  return (
    <section className="educator-section section" id="educators">
      <div className="shell educator-layout">
        <div><p className="kicker">Built with educators</p><h2>You know when a student needs a little help.</h2><p>Help us study those moments. Try eight examples, compare your judgment with ARIA’s logged decisions, or help shape a classroom evaluation.</p><div className="educator-actions"><a className="btn btn--ink" href="/activity">Try the teacher preview <span aria-hidden="true">→</span></a><a className="text-link" href="/participate">Help plan a classroom study →</a></div></div>
        <div className="study-outline">
          <span className="kicker">A proposed study, planned together</span>
          <dl><div><dt>2–3 sessions</dt><dd>Each session would last 30–45 minutes, with the format agreed with your school.</dd></div><div><dt>Algebra through calculus</dt><dd>Students would type their mathematics, with tasks and measures chosen together.</dd></div><div><dt>A teacher-informed direction</dt><dd>Session summaries and classroom visibility are planned but are not yet available.</dd></div></dl>
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
              The tutor gives hints that point at the next step, never the answer, and every reply is
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
              The teacher activity keeps your answers in your browser unless you choose to share
              them at the end; sharing is anonymous (your eight choices and an optional role, no
              name or email). The planning form and the student questions do not send anything:
              one prepares an email you review and send yourself, the other downloads a file.{" "}
              <a href="/privacy">Read the privacy page →</a>
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
