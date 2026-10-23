import { SitePage } from "../AriaExperience";
import { SensitivityFigure, TimelineFigure, TradeoffFigure } from "./Figures";
import { CountUp, Reveal, SideNav } from "./motion";
import {
  REPO,
  REPO_BLOB,
  alwaysHelpInterventions,
  baselinesQuiet,
  dataCounts,
  definitions,
  frozenHash,
  headline,
  leavers,
  pooledVsOwn,
  rerunCommands,
  settings,
} from "./paceData";

const toc = [
  { id: "summary", label: "Summary" },
  { id: "question", label: "The question" },
  { id: "data", label: "Data" },
  { id: "model", label: "Model" },
  { id: "protocol", label: "Evaluation protocol" },
  { id: "results", label: "Results" },
  { id: "robustness", label: "Robustness" },
  { id: "limitations", label: "Limitations" },
  { id: "reproducibility", label: "Reproducibility" },
  { id: "cite", label: "Cite this work" },
];

const bibtex = `@misc{saravanan2026ariapace,
  author       = {Saravanan, Naren and Malireddy, Karthik},
  title        = {{ARIA-Pace}: When Should a Math Tutor Stay Quiet? An Offline Replay on ASSISTments 2009--10 Logs},
  year         = {2026},
  howpublished = {\\url{${REPO}}},
  note         = {Student-led research project, Marvin Ridge High School. Not peer reviewed. Offline replay of logged data, not a classroom study.}
}`;

function Fig({ n, title, children, caption, source }: { n: number; title: string; children: React.ReactNode; caption: React.ReactNode; source: string }) {
  return (
    <Reveal as="figure" className="figure">
      <div className="figure__plot">{children}</div>
      <figcaption>
        <b>Figure {n}.</b> <strong>{title}</strong> {caption}
        <span className="figure__src">Source: {source}</span>
      </figcaption>
    </Reveal>
  );
}

export default function PacePage() {
  return (
    <SitePage>
      <div className="v2">
        <header className="band band--dark pacehero" id="top">
          <div className="wrap">
            <p className="eyebrow eyebrow--on-dark">ARIA-Pace · research project page · October 2026</p>
            <h1>When should a math tutor stay quiet?</h1>
            <p className="lede lede--on-dark">
              A timing rule for a math tutor, evaluated by replaying the logs of {headline.testStudents} held-out students. An offline replay, not a classroom trial.
            </p>
            <dl className="bignums">
              <div>
                <dt>fewer skill sequences hinted, Quiet setting, against hinting after every wrong step</dt>
                <dd>
                  <CountUp value={headline.fewer} suffix="%" />
                </dd>
              </div>
              <div>
                <dt>
                  missed help: {headline.missedN} of {headline.missedOf} stuck sequences (95% CI {headline.ciLow}–{headline.ciHigh}%)
                </dt>
                <dd>
                  <CountUp value={headline.missedPct} decimals={1} suffix="%" />
                </dd>
              </div>
              <div>
                <dt>held-out test students, evaluated once</dt>
                <dd>
                  <CountUp value={headline.testStudents} />
                </dd>
              </div>
            </dl>
            <p className="heldnote">A second locked evaluation has also been run once. Its numbers are withheld until the dataset terms are confirmed.</p>
          </div>
        </header>

        <div className="doc">
          <div className="wrap doc__grid">
            <aside className="doc__aside">
              <SideNav items={toc} label="Sections of this page" />
            </aside>

            <div className="doc__main">
              {/* 1 ------------------------------------------------------------------------------------------ */}
              <section className="docsec docsec--white" id="summary">
                <Reveal>
                  <p className="eyebrow">1 · Summary</p>
                  <h2>The short version.</h2>
                  <p className="prose prose--lead">
                    When a student writes a wrong step, should a tutor speak right away or wait? ARIA-Pace is a timing rule: a knowledge-tracing model estimates the chance the student is getting stuck, and the tutor gives a hint only when that risk passes a threshold set by how costly an interruption is compared with a late hint. On a locked test of {headline.testStudents} students, the Quiet setting hinted {headline.fewer}% fewer skill sequences than hinting after every wrong step, and missed help in {headline.missedPct}% of stuck sequences ({headline.missedN} of {headline.missedOf}). This is an offline replay of logged data, not a classroom trial. It cannot show how a student would have responded to help, and we make no claim about learning.
                  </p>
                </Reveal>
              </section>

              {/* 2 ------------------------------------------------------------------------------------------ */}
              <section className="docsec docsec--warm" id="question">
                <Reveal>
                  <p className="eyebrow">2 · The question</p>
                  <h2>Interrupt now, or let the student keep working?</h2>
                </Reveal>
                <div className="split">
                  <Reveal>
                    <p className="prose">
                      ARIA treats hint timing as a just-in-time adaptive intervention (JITAI): at each decision point the system chooses between acting and waiting, based on the state it can observe. Help that arrives too early can cut short useful struggle. Help that arrives too late can leave a student spinning their wheels. Koedinger and Aleven (2007) called this the assistance dilemma.
                    </p>
                    <p className="prose">
                      We make the trade-off explicit. Each unnecessary interruption has a cost, each opportunity of delayed help has a cost, and the three settings are three ratios of those costs. They are cost settings, not types of student.
                    </p>
                  </Reveal>
                  <Reveal delay={80}>
                    <table className="table table--tight">
                      <caption>Table 1. The three cost settings</caption>
                      <thead>
                        <tr>
                          <th scope="col">Setting</th>
                          <th scope="col">Interruption : delay cost</th>
                          <th scope="col">Hint threshold</th>
                        </tr>
                      </thead>
                      <tbody>
                        {settings.map((s) => (
                          <tr key={s.id}>
                            <th scope="row">{s.name}</th>
                            <td className="num">{s.weights}</td>
                            <td className="num">{s.threshold}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Reveal>
                </div>
              </section>

              {/* 3 ------------------------------------------------------------------------------------------ */}
              <section className="docsec docsec--white" id="data">
                <Reveal>
                  <p className="eyebrow">3 · Data</p>
                  <h2>Public ASSISTments logs, split by student.</h2>
                  <p className="prose">
                    ASSISTments 2009–10 skill-builder logs, corrected and collapsed: {dataCounts.rows} rows from {dataCounts.students} students, public and de-identified. We collected no student data. Rows with no skill tag ({dataCounts.droppedRows}, {dataCounts.droppedShare}) were dropped, leaving {dataCounts.sequences}{" "}sequences, where a sequence is one student&rsquo;s work on one problem set. The data are math logs; the sources do not state a grade level.
                  </p>
                </Reveal>
                <div className="split split--figs">
                  <Reveal>
                    <table className="table">
                      <caption>Table 2. Split by student, so no student appears in two splits</caption>
                      <thead>
                        <tr>
                          <th scope="col">Split</th>
                          <th scope="col" className="num">Students</th>
                          <th scope="col">Used for</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><th scope="row">Train</th><td className="num">{dataCounts.train}</td><td>Fitting the risk models</td></tr>
                        <tr><th scope="row">Validation</th><td className="num">{dataCounts.validation}</td><td>Calibration and thresholds</td></tr>
                        <tr><th scope="row">Test</th><td className="num">{dataCounts.test}</td><td>One locked evaluation</td></tr>
                      </tbody>
                    </table>
                    <p className="small">
                      The test evaluation covers the {headline.testStudents} test students with at least one in-scope sequence: {headline.sequences.toLocaleString("en-US")} skill sequences, {headline.stuckSequences} of them labeled stuck.
                    </p>
                  </Reveal>
                  <Reveal className="definition" delay={80}>
                    <h3>The &ldquo;stuck&rdquo; label</h3>
                    <p>
                      A sequence is stuck (wheel-spinning) if the student has <b>no 3 correct answers in a row within their first 10 tries</b>. The logs record this directly, so nobody labeled anything by hand.
                    </p>
                    <p className="small">Following Wang et al. and Kai et al., which attribute the idea to Beck and Gong (2013).</p>
                  </Reveal>
                </div>
              </section>

              {/* 4 ------------------------------------------------------------------------------------------ */}
              <section className="docsec docsec--tint" id="model">
                <Reveal>
                  <p className="eyebrow">4 · Model</p>
                  <h2>A step, a check, a risk, a decision.</h2>
                </Reveal>
                <Reveal as="ol" className="pipeline" aria-label="How ARIA decides">
                  <li>
                    <span className="pipeline__n">1</span>
                    <b>Student writes a step</b>
                    <small>One step of the problem, typed as math.</small>
                  </li>
                  <li>
                    <span className="pipeline__n">2</span>
                    <b>SymPy checks it</b>
                    <small>Right or wrong. A right step gets no reply.</small>
                  </li>
                  <li>
                    <span className="pipeline__n">3</span>
                    <b>Stuck risk updates</b>
                    <small>Bayesian Knowledge Tracing, calibrated.</small>
                  </li>
                  <li className="pipeline__end">
                    <span className="pipeline__n">4</span>
                    <b>Hint, or wait</b>
                    <small>If the step is wrong and the risk passes the setting&rsquo;s threshold, hint.</small>
                  </li>
                </Reveal>
                <div className="split">
                  <Reveal>
                    <p className="prose">
                      The risk model is Bayesian Knowledge Tracing (BKT), fitted per skill on the training students with a pooled fallback for skills it has not seen. Stuck risk is the calibrated probability of not mastering the skill by try 10. We also trained neural sequence models; none improved the stuck ranking, so BKT stayed.
                    </p>
                  </Reveal>
                  <Reveal delay={80}>
                    <p className="prose">
                      Thresholds were chosen on validation students only, then frozen. The three settings weight an unnecessary interruption against delayed help at 3:1, 1:1 and 1:3. In the replay, the dataset&rsquo;s own correctness flag stands in for the SymPy check, which is evaluated separately in the live tutor.
                    </p>
                  </Reveal>
                </div>
              </section>

              {/* 5 ------------------------------------------------------------------------------------------ */}
              <section className="docsec docsec--white" id="protocol">
                <Reveal>
                  <p className="eyebrow">5 · Evaluation protocol</p>
                  <h2>Written down first, tested once.</h2>
                </Reveal>
                <div className="split">
                  <Reveal>
                    <ul className="checklist">
                      <li>
                        <b>Specification first.</b> Labels, splits, metrics and cost settings were committed before any model was fit. Later changes are numbered amendments with dates. This is a repository commit history, not an external registry.
                      </li>
                      <li>
                        <b>Locked test set, run once.</b> Every threshold was frozen on validation. A lock file makes the evaluation script refuse a second run.
                      </li>
                      <li>
                        <b>Paired bootstrap over students.</b> Confidence intervals come from 1,000 resamples of students.
                      </li>
                    </ul>
                  </Reveal>
                  <Reveal className="definition" delay={80}>
                    <h3>What the two measures count</h3>
                    <p>
                      <b>Fewer hints</b> counts the first hint in each skill sequence, compared with hinting after every wrong step. <b>Missed help</b> is the share of stuck sequences that had a chance for help but received no hint before try 10.
                    </p>
                    <p className="small">Hints are considered at tries 3 to 9, at most one counted per sequence.</p>
                  </Reveal>
                </div>
              </section>

              {/* 6 ------------------------------------------------------------------------------------------ */}
              <section className="docsec docsec--warm" id="results">
                <Reveal>
                  <p className="eyebrow">6 · Results</p>
                  <h2>Quiet roughly halves the hints and misses few stuck students.</h2>
                  <p className="prose">
                    Locked test, {headline.testStudents} students, {headline.sequences.toLocaleString("en-US")} skill sequences. All figures use the 3-correct-in-a-row definition of stuck; the robustness section shows what other definitions do.
                  </p>
                </Reveal>

                <Fig
                  n={1}
                  title="The trade-off."
                  caption={
                    <>
                      Hints given per student against missed help on the locked test. Down and to the left is better. The three yellow points are ARIA-Pace&rsquo;s settings; the other markers are baselines scored at the Quiet setting. A tuned two-wrong-in-a-row rule uses about as many hints as Quiet but misses far more stuck sequences.
                    </>
                  }
                  source="docs/aria_pace/RESULTS.md and aria_pace/results/test_results.json (mirrors aria_pace/figures/frontier_test.png)"
                >
                  <TradeoffFigure />
                </Fig>

                <div className="split split--figs">
                  <Reveal>
                    <table className="table">
                      <caption>Table 3. ARIA-Pace by setting, locked test</caption>
                      <thead>
                        <tr>
                          <th scope="col">Setting</th>
                          <th scope="col" className="num">Hints per student</th>
                          <th scope="col" className="num">Fewer than always-help</th>
                          <th scope="col" className="num">Missed help</th>
                        </tr>
                      </thead>
                      <tbody>
                        {settings.map((s) => (
                          <tr key={s.id}>
                            <th scope="row">{s.name}</th>
                            <td className="num">{s.interventions.toFixed(2)}</td>
                            <td className="num">{s.fewer}%</td>
                            <td className="num">
                              {s.missedLabel} <small>({s.missedCount})</small>
                            </td>
                          </tr>
                        ))}
                        <tr className="table__ref">
                          <th scope="row">Always help</th>
                          <td className="num">{alwaysHelpInterventions.toFixed(2)}</td>
                          <td className="num">&ndash;</td>
                          <td className="num">0%</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="small">Quiet missed-help 95% CI: {headline.ciLow}–{headline.ciHigh}%. For Supportive the difference from always-help includes zero: abstaining saves little when delayed help is the costly side.</p>
                  </Reveal>
                  <Reveal delay={80}>
                    <table className="table">
                      <caption>Table 4. Baselines at the Quiet setting</caption>
                      <thead>
                        <tr>
                          <th scope="col">Method</th>
                          <th scope="col" className="num">Hints per student</th>
                          <th scope="col" className="num">Missed help</th>
                        </tr>
                      </thead>
                      <tbody>
                        {baselinesQuiet.map((b) => (
                          <tr key={b.key} className={b.key === "bkt" ? "table__hl" : undefined}>
                            <th scope="row">{b.label}</th>
                            <td className="num">{b.interventions.toFixed(2)}</td>
                            <td className="num">
                              {b.missedPct.toFixed(1)}% <small>({b.missedCount})</small>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="small">ARIA-Pace is not distinguishable in cost from PFA. It is cheaper than always-help, the untuned rule and the matched-rate random rule at Quiet.</p>
                  </Reveal>
                </div>

                <Fig
                  n={2}
                  title="The same student under three settings."
                  caption={
                    <>
                      One student gets tries 1 and 2 right, then writes four wrong answers. Stuck risk climbs from 15% to 70%. Supportive gives its first hint at try 3, Balanced at try 4, Quiet at try 6. Same answers, different timing.
                    </>
                  }
                  source="docs/DEMO_RUNBOOK.md section 6 (lines 133-150) and the ARIA summit poster; thresholds from aria_pace/results/frozen_val.json"
                >
                  <TimelineFigure />
                </Fig>
              </section>

              {/* 7 ------------------------------------------------------------------------------------------ */}
              <section className="docsec docsec--white" id="robustness">
                <Reveal>
                  <p className="eyebrow">7 · Robustness</p>
                  <h2>The saving depends on what &ldquo;stuck&rdquo; means.</h2>
                  <p className="prose">
                    These checks use validation students and BKT only. They are labeled exploratory where the source labels them so, and none of them has a locked-test number.
                  </p>
                </Reveal>

                <Fig
                  n={3}
                  title="Mastery-definition sensitivity."
                  caption={
                    <>
                      Quiet-setting saving against always-help under five definitions of stuck, with 95% intervals. <b>Exploratory.</b> Five-fold cross-validated on training and validation students, BKT only. The saving is {definitions[0].saving}% under 3-in-a-row and {Math.min(...definitions.slice(1).map((d) => d.saving))}–{Math.max(...definitions.slice(1).map((d) => d.saving))}% under the four others.
                    </>
                  }
                  source="aria_pace/RESULTS_v4.md, Step 2 (amendment A7)"
                >
                  <SensitivityFigure />
                </Fig>

                <div className="split split--figs">
                  <Reveal>
                    <h3 className="h3">Pooled versus per-skill parameters</h3>
                    <p className="prose">
                      The live demo uses one pooled set of BKT parameters; the evaluated policy used per-skill parameters. On validation (exploratory), the Quiet saving is {pooledVsOwn.ownSaving} per-skill and {pooledVsOwn.pooledSaving} pooled, and {pooledVsOwn.flipShare} of Quiet wrong-step decisions flip. Missed help is {pooledVsOwn.ownMissed} per-skill and {pooledVsOwn.pooledMissed} pooled. So the demo approximates the evaluated policy; it does not reproduce it.
                    </p>
                  </Reveal>
                  <Reveal delay={80}>
                    <h3 className="h3">Students who left early</h3>
                    <p className="prose">
                      Students who left a skill before try 10 have no label and are dropped from the main analysis. If they are counted as not stuck instead, the best Quiet threshold moves from {leavers.tauMain} to {leavers.tauRechosen} and missed help rises to {leavers.missed} (95% CI {leavers.ci}). The {headline.missedPct}% figure belongs to the primary assumption.
                    </p>
                  </Reveal>
                </div>
              </section>

              {/* 8 ------------------------------------------------------------------------------------------ */}
              <section className="docsec docsec--tint" id="limitations">
                <Reveal>
                  <p className="eyebrow">8 · Limitations</p>
                  <h2>What this does not show.</h2>
                </Reveal>
                <Reveal as="ol" className="limits">
                  <li>
                    <b>Offline replay.</b> The logs contain no tutor interventions, so nothing here shows how students respond to being helped or interrupted.
                  </li>
                  <li>
                    <b>&ldquo;Unnecessary&rdquo; is a stand-in.</b> It means the sequence was later mastered within 10 tries without logged help. A student may have mastered because of unlogged help, and earlier help might have changed the outcome.
                  </li>
                  <li>
                    <b>The data are from 2009–10.</b> One public dataset from one platform and one student-level split, with no external replication.
                  </li>
                  <li>
                    <b>The demo uses pooled parameters</b>, so it approximates the evaluated policy rather than reproducing it.
                  </li>
                  <li>
                    <b>No classroom evidence yet.</b> We make no claim that ARIA improves learning, and the three settings are cost settings, not groups of students. No clinical or demographic claim is made.
                  </li>
                </Reveal>
              </section>

              {/* 9 ------------------------------------------------------------------------------------------ */}
              <section className="docsec docsec--white" id="reproducibility">
                <Reveal>
                  <p className="eyebrow">9 · Reproducibility</p>
                  <h2>Every number comes from a file.</h2>
                </Reveal>
                <div className="split">
                  <Reveal>
                    <p className="prose">
                      Code, specification and result files are in the research repository. The validation-frozen configuration is pinned by a hash, and the test results record the same hash.
                    </p>
                    <p className="btnrow">
                      <a className="btn2 btn2--ink" href={REPO} target="_blank" rel="noreferrer">
                        Research repository on GitHub <span aria-hidden="true">↗</span>
                      </a>
                    </p>
                    <ul className="linklist">
                      <li><a href={`${REPO_BLOB}/docs/aria_pace/RESULTS.md`} target="_blank" rel="noreferrer">RESULTS.md</a> · the locked test and baselines</li>
                      <li><a href={`${REPO_BLOB}/aria_pace/RESULTS_v4.md`} target="_blank" rel="noreferrer">RESULTS_v4.md</a> · cross-validated sensitivity</li>
                      <li><a href={`${REPO_BLOB}/aria_pace/SPEC.md`} target="_blank" rel="noreferrer">SPEC.md</a> · specification and amendments</li>
                      <li><a href={`${REPO_BLOB}/docs/aria_pace/DATA.md`} target="_blank" rel="noreferrer">DATA.md</a> · the dataset check</li>
                    </ul>
                  </Reveal>
                  <Reveal delay={80}>
                    <h3 className="h3">Frozen configuration hash (SHA-256)</h3>
                    <p className="code code--wrap">{frozenHash}</p>
                    <h3 className="h3">Dataset file hash (SHA-256)</h3>
                    <p className="code code--wrap">{dataCounts.sha256}</p>
                    <h3 className="h3">Rerun</h3>
                    <pre className="code">{rerunCommands.join("\n")}</pre>
                    <p className="small">The test evaluation is not in this list on purpose: a lock file blocks a second run. Setup is in DATA.md.</p>
                  </Reveal>
                </div>
              </section>

              {/* 10 ----------------------------------------------------------------------------------------- */}
              <section className="docsec docsec--warm" id="cite">
                <Reveal>
                  <p className="eyebrow">10 · Cite this work</p>
                  <h2>BibTeX</h2>
                  <pre className="code code--bib" tabIndex={0} aria-label="BibTeX entry">{bibtex}</pre>
                </Reveal>
              </section>
            </div>
          </div>
        </div>
      </div>
    </SitePage>
  );
}
