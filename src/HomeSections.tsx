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
        <div className="evidence-heading"><div><p className="kicker">Evidence, in context</p><h2>A working prototype.<br />A research question still open.</h2></div><p>Software checks tell us one thing. Student learning tells us another. Here is where the work stands.</p></div>
        <div className="evidence-ledger">
          <article><span>Implemented</span><strong>30</strong><div><h3>Demo math problems</h3><p>Across algebra, trigonometry, and calculus. Answers are re-derived by a symbolic engine; independent educator review is next.</p></div></article>
          <article><span>Scripted checks</span><strong>0</strong><div><h3>Reported answer leaks</h3><p>The supplied harness summary reports no revealed answers or false mathematical claims. This is a scripted check, not a real-student evaluation.</p></div></article>
          <article><span>Reported log replay</span><strong>52%</strong><div><h3>Fewer interventions under one cost assumption</h3><p>ASSISTments replay with interruptions weighted 3× delayed help: 3.7% missed help opportunities (95% CI 2.2–5.3%). The saving disappears when delayed help is weighted more.</p><small>Source: supplied project summary. Replay artifacts have not been independently verified during the website work. Not a classroom result.</small></div></article>
          <article><span>Next evidence</span><strong>Open</strong><div><h3>Human and classroom evaluation</h3><p>No completed classroom study establishes learning, retention, or transfer. Independent labels, educator review, and school-approved studies remain ahead.</p></div></article>
        </div>
        <div className="evidence-links"><a href="/researchers">Read the results and limitations →</a><a href="/methodology">Evaluation methodology →</a></div>
      </div>
    </section>
  );
}
