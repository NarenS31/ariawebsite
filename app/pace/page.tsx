import type { Metadata } from "next";
import { Footer, Navigation } from "@/src/AriaExperience";

export const metadata: Metadata = {
  title: "ARIA-Pace | ARIA Research Initiative",
  description:
    "ARIA-Pace is the timing model behind ARIA: a knowledge-tracing model fit on real student logs plus a policy that decides when a tutor should stay quiet. Results, protocol, and limits.",
};

// Every number on this page traces to a results file in the aria.kls repository
// (branch aria-pace, docs/aria_pace/RESULTS.md and results/*.json). Validation
// numbers are labelled as validation; the single held-out test run is labelled
// as test. Nothing here is a learning-outcome or clinical claim.

const repoUrl = "https://github.com/NarenS31/aria.kls";

const stageRows = [
  {
    stage: "Specification",
    status: "Committed before any modeling",
    detail:
      "Labels, splits, metrics, cost settings, and the one-time test rule were written down and committed first. Later changes are dated amendments.",
  },
  {
    stage: "Data",
    status: "ASSISTments 2009–10 skill builder",
    detail:
      "346,860 rows from 4,217 real students. Rows with no skill tag were dropped (18.4%), leaving 4,163 students, split by student into train (2,498), validation (833), and test (832).",
  },
  {
    stage: "Baselines",
    status: "Validation only",
    detail:
      "Always-help, an n-wrong-in-a-row rule, Performance Factors Analysis, and Bayesian Knowledge Tracing (BKT). BKT and PFA were statistically indistinguishable; both beat the rules.",
  },
  {
    stage: "Policy",
    status: "Three cost settings",
    detail:
      "Intervene only when a wrong answer coincides with risk above a threshold. The threshold is chosen on validation for each cost setting and then frozen.",
  },
  {
    stage: "Test",
    status: "Run once, then locked",
    detail:
      "The test split was read a single time after every choice was frozen. A lock file makes the evaluation script refuse a second run.",
  },
];

const testRows = [
  {
    profile: "Quiet (interruption costs 3× a delayed hint)",
    interventions: "1.22 vs 2.54",
    reduction: "52% fewer",
    missed: "3.7% (95% CI 2.2–5.3)",
  },
  {
    profile: "Balanced (equal costs)",
    interventions: "2.15 vs 2.54",
    reduction: "15% fewer",
    missed: "0.2%",
  },
  {
    profile: "Supportive (delayed hint costs 3× an interruption)",
    interventions: "2.46 vs 2.54",
    reduction: "3% fewer (difference includes zero)",
    missed: "0%",
  },
];

const modelRows = [
  { model: "BKT (1995)", k3: "0.813", k5: "0.806", k8: "0.911", logloss: "0.575" },
  { model: "DKT-style LSTM", k3: "0.810", k5: "0.803", k8: "0.914", logloss: "0.564" },
  { model: "SAKT-style attention", k3: "0.805", k5: "0.792", k8: "0.911", logloss: "0.568" },
];

const references = [
  {
    cite: "Koedinger, K. R., & Aleven, V. (2007). Exploring the assistance dilemma in experiments with Cognitive Tutors. Educational Psychology Review.",
    why: "The formal question ARIA-Pace addresses: when should a tutor give help, and when should it withhold it?",
  },
  {
    cite: "Beck, J. E., & Gong, Y. (2013). Wheel-spinning: students who fail to master a skill. Artificial Intelligence in Education.",
    why: "The outcome we predict. We use the operationalisation of Wang et al. and Kai et al., which follows Beck and Gong.",
  },
  {
    cite: "Corbett, A. T., & Anderson, J. R. (1995). Knowledge tracing: modeling the acquisition of procedural knowledge. User Modeling and User-Adapted Interaction.",
    why: "The risk model ARIA-Pace currently runs on.",
  },
  {
    cite: "Piech, C., et al. (2015). Deep Knowledge Tracing. arXiv:1506.05908.",
    why: "The sequence model we trained and compared. Our version is simplified: one skill per sequence.",
  },
  {
    cite: "Pandey, S., & Karypis, G. (2019). A Self-Attentive model for Knowledge Tracing. arXiv:1907.06837.",
    why: "The attention model we trained and compared, with the same simplification.",
  },
  {
    cite: "Ocumpaugh, J., et al. (2014). Population validity for educational data mining models. Sensor-free affect detectors trained on BROMP classroom observations.",
    why: "The source of the affect signals in the 2012–13 ASSISTments data. The public columns are detector predictions, not the human observations.",
  },
];

export default function PacePage() {
  return (
    <>
    <Navigation />
    <main className="methodology-page">

      <article className="methodology-note">
        <header className="methodology-hero">
          <p className="kicker">Research note 02 · Updated October 2026</p>
          <h1>ARIA-Pace: a model for when to stay quiet.</h1>
          <p>
            Most tutoring software responds to every step. ARIA-Pace is the part of ARIA that
            decides whether to say anything at all. It is a knowledge-tracing model fit on logs
            from thousands of real students, combined with a decision rule that trades
            unnecessary interruptions against delayed help. It is in development, and every
            number below says which stage it comes from.
          </p>
          <div className="methodology-status">
            <span>Current status</span>
            <strong>First held-out test complete</strong>
            <small>
              Cross-dataset test on a second year of data is pending. No learning-outcome or
              clinical claim is made.
            </small>
          </div>
        </header>

        <section className="methodology-section">
          <p className="kicker">The question</p>
          <h2>When should a tutor step in, and when should it wait?</h2>
          <p>
            Help offered too early cuts short the struggle that produces learning. Help offered too
            late lets a student spin their wheels. Koedinger and Aleven called this the assistance
            dilemma. ARIA-Pace treats it as a decision problem with an explicit cost for each kind
            of mistake, and asks how well a simple rule can trade one against the other on real
            student behaviour.
          </p>
          <p>
            The outcome we predict is wheel-spinning: a student who works through ten attempts on a
            skill without ever getting three right in a row. The logs record it directly, so no one
            had to label anything by hand, and no student data was collected by us.
          </p>
        </section>

        <section className="methodology-section">
          <p className="kicker">How it works</p>
          <h2>Three layers, each with its own job.</h2>
          <ol className="methodology-process">
            <li>
              <span>01</span>
              <div>
                <h3>Estimate mastery.</h3>
                <p>
                  Bayesian Knowledge Tracing, fit per skill on the training students, estimates the
                  chance the next step is right. We also trained two neural sequence models to
                  replace it; see below for why it stayed.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Verify the error.</h3>
                <p>
                  In the live tutor, a symbolic math engine checks each step. In the log replay, the
                  dataset&rsquo;s own correctness flag plays that role. A correct step never counts
                  as stuck; the model only considers speaking after a verified wrong step.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Decide, under a chosen cost.</h3>
                <p>
                  Intervene only when the mastery estimate says the student is at risk of
                  wheel-spinning. The risk threshold depends on a cost setting the learner or
                  teacher chooses: quiet, balanced, or supportive. The settings are explicit cost
                  weights, not categories of student.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="methodology-section">
          <p className="kicker">Protocol</p>
          <h2>Written down first, tested once.</h2>
          <div className="methodology-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Stage</th>
                  <th scope="col">Status</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                {stageRows.map((row) => (
                  <tr key={row.stage}>
                    <th scope="row">{row.stage}</th>
                    <td>{row.status}</td>
                    <td>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="methodology-section">
          <p className="kicker">Result · held-out test, 2009–10 data</p>
          <h2>Quieter when quiet is what you asked for.</h2>
          <p>
            Evaluated once on 597 test students (3,468 skill sequences, 570 of them wheel-spinning).
            Interventions are per student, ARIA-Pace versus always helping after every wrong step.
            &ldquo;Missed help&rdquo; is the share of wheel-spinning students the rule never
            helped before their tenth attempt.
          </p>
          <div className="methodology-result-grid">
            <article>
              <strong>52%</strong>
              <h3>Fewer interruptions</h3>
              <p>Under the quiet setting, compared with helping after every wrong step.</p>
            </article>
            <article>
              <strong>3.7%</strong>
              <h3>Missed help</h3>
              <p>95% confidence interval 2.2% to 5.3%, bootstrapped over students.</p>
            </article>
            <article>
              <strong>1</strong>
              <h3>Look at the test set</h3>
              <p>Every threshold was frozen on validation first. A lock file prevents a second run.</p>
            </article>
          </div>
          <div className="methodology-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Cost setting</th>
                  <th scope="col">Interventions per student (Pace vs always-help)</th>
                  <th scope="col">Change</th>
                  <th scope="col">Missed help</th>
                </tr>
              </thead>
              <tbody>
                {testRows.map((row) => (
                  <tr key={row.profile}>
                    <th scope="row">{row.profile}</th>
                    <td>{row.interventions}</td>
                    <td>{row.reduction}</td>
                    <td>{row.missed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The saving is real only when interruptions are costly. When delayed help is the bigger
            cost, the rule behaves almost exactly like always helping. That is the point: the
            setting matters most for learners who are hurt by being interrupted.
          </p>
          <p>
            One sensitivity result changes the picture and belongs next to the headline. Students
            who left a skill before ten attempts have no label and were excluded. If they are
            instead counted as not wheel-spinning, the best quiet-setting threshold moves from 0.57
            to 0.85 and missed help rises to 12.4% (95% CI 9.4–15.5). The 3.7% figure holds under
            the primary assumption about those students, not under every assumption.
          </p>
        </section>

        <section className="methodology-section">
          <p className="kicker">Result · validation, 2009–10 data</p>
          <h2>We trained neural models. They did not help the decision.</h2>
          <p>
            Two sequence models were trained on the same 2,498 training students: an LSTM in the
            style of Deep Knowledge Tracing and an attention model in the style of SAKT. Both
            predict the next answer better than BKT. Neither ranks wheel-spinning risk any better,
            which is the quantity the decision rule actually uses. By the rule we committed in
            advance, BKT stays.
          </p>
          <div className="methodology-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Risk model</th>
                  <th scope="col">AUC after 3 attempts</th>
                  <th scope="col">After 5</th>
                  <th scope="col">After 8</th>
                  <th scope="col">Next-answer log-loss (lower is better)</th>
                </tr>
              </thead>
              <tbody>
                {modelRows.map((row) => (
                  <tr key={row.model}>
                    <th scope="row">{row.model}</th>
                    <td>{row.k3}</td>
                    <td>{row.k5}</td>
                    <td>{row.k8}</td>
                    <td>{row.logloss}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The paired differences from BKT at three and five attempts are within ±0.01 AUC and
            their confidence intervals include zero for the LSTM; the attention model is
            significantly worse. Both neural models are simplified relative to the published ones:
            each sequence carries a single skill, as BKT does. Better student modelling did not
            translate into better timing here.
          </p>
        </section>

        <section className="methodology-section">
          <p className="kicker">Result · validation, 2012–13 data</p>
          <h2>Do emotion signals improve the timing decision?</h2>
          <p>
            The 2012–13 ASSISTments release (6.1 million rows, 46,674 students) carries four affect
            columns: boredom, confusion, frustration, and engaged concentration. They are predictions
            from detectors that Ryan Baker&rsquo;s group trained on human classroom observations of
            real students. We asked whether adding them to the risk model improves wheel-spinning
            prediction, using 13,953 training and 4,651 validation students from that file.
          </p>
          <p>
            The gain is small and early. With affect features, AUC after three attempts rises by
            0.006 (95% CI 0.004 to 0.008). After five and eight attempts the difference is
            indistinguishable from zero. Averaged over the three checkpoints the gain is 0.002,
            below the 0.005 threshold we set in advance. Shuffling the affect columns removes the
            gain, so it is not an artefact of extra parameters. The reading we take: emotion signals
            carry a little information when there is almost no behaviour to go on, and the
            correctness history carries the rest.
          </p>
          <div className="methodology-status" style={{ gridColumn: "auto", gridRow: "auto" }}>
            <span>Pending</span>
            <strong>Cross-dataset test</strong>
            <small>
              A locked 20% of the 2012–13 students (4,651) is reserved for a single evaluation of
              the 2009-trained models and policies. It has not been read. Results will appear here
              once, with confidence intervals, whatever they show.
            </small>
          </div>
        </section>

        <section className="methodology-limitations">
          <p className="kicker">Limitations</p>
          <h2>What ARIA-Pace does not show.</h2>
          <ul>
            <li>
              It is a replay of logs. It shows what the rule would have done, not whether helping at
              that moment would have worked or whether any student learned more.
            </li>
            <li>
              &ldquo;Unnecessary interruption&rdquo; is a proxy: the student later mastered the
              skill without logged help. The logs contain no real interventions to compare against.
            </li>
            <li>
              The three cost settings are weights we chose (3:1, 1:1, 1:3). Nothing here shows that
              any group of learners corresponds to them.
            </li>
            <li>
              The risk model is BKT from 1995. The contribution is the decision rule, the evaluation
              protocol, and the negative results, not a new model architecture.
            </li>
            <li>
              The affect columns are detector outputs of unknown version, rank-transformed; the
              detectors were built from interaction features that overlap with our model&rsquo;s
              inputs.
            </li>
            <li>
              Grade level is not stated for either data file. ARIA&rsquo;s live tutor targets
              algebra through calculus; ASSISTments skill builders are mostly middle-school
              mathematics.
            </li>
            <li>
              The live tutor&rsquo;s symbolic step checker was not evaluated in the replay; the
              dataset&rsquo;s correctness flag stood in for it.
            </li>
            <li>
              Dataset licence terms are being confirmed with the ASSISTments team; nothing here is
              submitted for publication until they are.
            </li>
          </ul>
        </section>

        <section className="methodology-section">
          <p className="kicker">Claims we are not making</p>
          <h2>Read this before quoting the numbers.</h2>
          <p>
            ARIA-Pace is not a diagnostic tool, is not trained on any data about ADHD, anxiety, or
            disability, and has not been shown to help any particular group of students. The
            &ldquo;quiet&rdquo; setting is a cost weight a learner or teacher can choose, in the
            spirit of common classroom accommodations such as reduced interruption. Whether it
            helps anyone is a question for a reviewed study with students, which has not been run.
          </p>
        </section>

        <section className="methodology-section">
          <p className="kicker">Sources</p>
          <h2>What the design builds on.</h2>
          <p>
            These sources justify the question and the method. They do not establish that ARIA-Pace
            is effective. Full citations with verification notes are in the project repository.
          </p>
          <dl className="methodology-glossary">
            {references.map((ref) => (
              <div key={ref.cite}>
                <dt>{ref.cite}</dt>
                <dd>{ref.why}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="methodology-next">
          <div>
            <p className="kicker">Reproducibility</p>
            <h2>Every number comes from a file.</h2>
          </div>
          <p>
            Specification, amendments, splits, frozen thresholds, results, and lock files are
            committed in the{" "}
            <a href={repoUrl}>aria.kls repository</a> on the <code>aria-pace</code> branch. The raw
            ASSISTments files are not redistributed; download steps and checksums are documented
            instead.
          </p>
        </section>

        <footer className="methodology-footer">
          <p>Prepared by Naren Saravanan and Karthik Malireddy · ARIA Research Initiative</p>
          <a href="mailto:11narensara11@gmail.com?subject=ARIA-Pace">
            Ask about ARIA-Pace <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </article>
    </main>
    <Footer />
    </>
  );
}
