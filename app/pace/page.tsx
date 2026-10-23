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

// 2012-13 results held pending dataset terms; restore from private copy.
// Flip this to true only after the held block has been restored.
const showCrossDataset = false;

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

const sensitivityRows = [
  { rule: "3 correct in a row within 10 attempts (the pre-registered rule)", tau: "0.51–0.60", saving: "50.1% (48.5–51.6)", missed: "6.2% (5.2–7.2)" },
  { rule: "4 correct in a row within 10 attempts", tau: "0.43–0.52", saving: "8.3% (7.5–9.2)", missed: "0.2% (0.1–0.3)" },
  { rule: "5 correct in a row within 15 attempts", tau: "0.31–0.44", saving: "26.4% (24.7–28.2)", missed: "4.3% (3.4–5.3)" },
  { rule: "5 correct in a row within 20 attempts", tau: "0.24–0.40", saving: "41.6% (39.2–43.8)", missed: "10.4% (8.1–12.7)" },
  { rule: "A running average of answers at or above 80% for 3 attempts in a row, within 10", tau: "0.52–0.77", saving: "7.1% (6.2–8.0)", missed: "0.3% (0.2–0.5)" },
];

const references = [
  {
    cite: "Koedinger, K. R., & Aleven, V. (2007). Exploring the assistance dilemma in experiments with Cognitive Tutors. Educational Psychology Review.",
    why: "This work frames the question ARIA-Pace addresses: when should a tutor give help, and when should it withhold it?",
  },
  {
    cite: "Beck, J. E., & Gong, Y. (2013). Wheel-spinning: students who fail to master a skill. Artificial Intelligence in Education.",
    why: "This work defines the outcome we predict. We use the operationalisation of Wang et al. and Kai et al., which follows Beck and Gong.",
  },
  {
    cite: "Corbett, A. T., & Anderson, J. R. (1995). Knowledge tracing: modeling the acquisition of procedural knowledge. User Modeling and User-Adapted Interaction.",
    why: "This paper introduces the risk model that ARIA-Pace currently uses.",
  },
  {
    cite: "Piech, C., et al. (2015). Deep Knowledge Tracing. arXiv:1506.05908.",
    why: "This paper introduces a sequence model that we trained and compared. Our simplified version uses one skill per sequence.",
  },
  {
    cite: "Pandey, S., & Karypis, G. (2019). A Self-Attentive model for Knowledge Tracing. arXiv:1907.06837.",
    why: "This paper introduces an attention model that we trained and compared using the same single-skill simplification.",
  },
  {
    cite: "Ocumpaugh, J., et al. (2014). Population validity for educational data mining models. Sensor-free affect detectors trained on BROMP classroom observations.",
    why: "This work describes the source of the affect signals in the 2012–13 ASSISTments data. The public columns contain detector predictions, not human observations.",
  },
];

export default function PacePage() {
  return (
    <>
    <Navigation />
    <main className="methodology-page">

      <article className="methodology-note">
        <header className="methodology-hero">
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
            <strong>Two held-out tests complete</strong>
            <small>
              {showCrossDataset
                ? "" // 2012-13 results held pending dataset terms; restore from private copy
                : "Evaluated once on 2009–10 data and once on 2012–13 data. The second set of numbers is held until the dataset terms are confirmed. No learning-outcome or clinical claim is made."}
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
                  chance the next step is right. We also trained four neural sequence models to
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
            We evaluated the policy once on 597 test students (3,468 skill sequences, 570 of them wheel-spinning).
            Interventions are per student, ARIA-Pace versus always helping after every wrong step.
            &ldquo;Missed help&rdquo; is the share of wheel-spinning students the rule never
            helped before their tenth attempt. Wheel-spinning is defined by a mastery rule fixed in
            advance: not getting three correct answers in a row within ten attempts.
          </p>
          <div className="methodology-result-grid">
            <article>
              <strong>52%</strong>
              <h3>Fewer interruptions</h3>
              <p>Under the Quiet setting and the three-correct-in-a-row mastery definition, ARIA-Pace intervened less often than helping after every wrong step.</p>
            </article>
            <article>
              <strong>3.7%</strong>
              <h3>Missed help</h3>
              <p>The 95% confidence interval is 2.2% to 5.3%, calculated by bootstrapping over students.</p>
            </article>
            <article>
              <strong>1</strong>
              <h3>Look at the test set</h3>
              <p>Every threshold was frozen on validation first. A lock file prevents a second run.</p>
            </article>
          </div>
          <p>All figures in this table are under the 3-correct-in-a-row mastery definition.</p>
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
          <p>
            The saving also depends on the mastery definition itself: the four other definitions
            shrink it to 7.1% to 41.6% (cross-validated; exploratory, validation only; the earlier
            single-split version is in{" "}
            <a href={`${repoUrl}/blob/aria-pace/docs/aria_pace/MASTERY_SENSITIVITY.md`}>
              MASTERY_SENSITIVITY.md
            </a>{" "}
            and the next section).
          </p>
        </section>

        <section className="methodology-section" id="sensitivity">
          <p className="kicker">Sensitivity · exploratory, validation only</p>
          <h2>How sensitive is this?</h2>
          <p>
            <strong>Definition of &ldquo;stuck&rdquo;.</strong> We re-ran the pipeline (labels,
            risk model, calibration, threshold choice) under four other mastery rules, with
            five-fold cross-validation over the training and validation students: in each fold the
            threshold and calibration were chosen on separate students and then scored on held-out
            ones. Under the pre-registered 3-correct-in-a-row rule the quiet saving is 50.1%
            (95% CI 48.5 to 51.6) with 6.2% missed help; under the four other rules it is 7.1% to
            41.6%. Missed help under the pre-registered rule is about 4 to 6% (3.7% on the locked
            test, 4.8% in the single-split validation, 6.2% cross-validated). The best quiet
            threshold also moves with the rule (last column), by more than 0.10 in several folds.
          </p>
          <div className="methodology-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Mastery rule</th>
                  <th scope="col">Quiet threshold (range over five folds)</th>
                  <th scope="col">Quiet-setting saving (95% CI)</th>
                  <th scope="col">Missed help (95% CI)</th>
                </tr>
              </thead>
              <tbody>
                {sensitivityRows.map((row) => (
                  <tr key={row.rule}>
                    <th scope="row">{row.rule}</th>
                    <td>{row.tau}</td>
                    <td>{row.saving}</td>
                    <td>{row.missed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Cross-validation removes the optimism of choosing the threshold on the same students,
            but these rows are still exploratory and use validation students only (compare 52%
            (3-correct-in-a-row) on the locked test). Nothing here touched the test split, no
            alternative rule has a test number, and the published 52% (3-correct-in-a-row) belongs
            to the first rule. The analysis covers BKT as the risk score only; the other risk
            models were not re-run. Full tables:{" "}
            <a href={`${repoUrl}/blob/aria-pace/aria_pace/RESULTS_v4.md`}>RESULTS_v4.md</a>.
          </p>
          <p>
            <strong>What if helping and interrupting have real effects?</strong> A small simulation
            (no real students, no language model) gives simulated students a hidden known or
            unknown state and assumes three things: how much help speeds learning, how much an
            interruption distracts, and how likely a stuck student who is left alone is to give up.
            With the thresholds frozen, the quiet policy beats always helping when giving up is
            assumed unlikely (below roughly 9 to 10% per unaided wrong step) and loses when it is
            more likely; for the balanced setting the break-even is roughly 2%. The help effect
            and the interruption cost move the result little in this model, and the supportive
            setting makes the same decisions as always helping. In short: the policy pays off only
            if leaving a stuck student alone is cheap. This is an assumption-dependent sensitivity
            analysis, not evidence of effect; replay cannot measure that cost, and only a study
            with students could.
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
            advance, BKT stays. A second pair of the same two kinds also saw the student&rsquo;s
            earlier attempts on other skills (see below).
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
            significantly worse. The first two models are simplified relative to the published ones:
            each sequence carries a single skill, as BKT does.
          </p>
          <p>
            The second pair removes that restriction. They predict the next answer slightly better
            than BKT (the LSTM&rsquo;s log-loss is lower by 0.017, interval 0.013 to 0.022; the
            attention model&rsquo;s difference is 0.0015 and its interval includes zero), but they
            did not improve the wheel-spinning ranking: at three and five attempts the AUC
            differences from BKT are between &minus;0.011 and &minus;0.004, and every interval
            includes zero. Under the rule fixed in advance (at least +0.01 with the interval above
            zero at both checkpoints) neither is promoted, so BKT stays. Better next-answer
            prediction did not translate into a better timing decision here
            (validation only; see{" "}
            <a href={`${repoUrl}/blob/aria-pace/docs/aria_pace/MULTISKILL.md`}>MULTISKILL.md</a>).
          </p>
          <p>
            We also tested a per-turn model for every attempt from 1 to 9 that adds how long the
            first response took. Response time was tested and did not clear the pre-registered
            bar: the gain over BKT was +0.0072 AUC at three attempts and +0.0034 at five, against
            the required +0.01 (validation only; see{" "}
            <a href={`${repoUrl}/blob/aria-pace/aria_pace/RESULTS_v4.md`}>RESULTS_v4.md</a>).
          </p>
        </section>

        <section className="methodology-section">
          <p className="kicker">Result · affect signals, 2012–13 data (numbers held)</p>
          <h2>Does detector-predicted affect improve the timing decision?</h2>
          <p>
            The 2012–13 ASSISTments release carries four numeric
            columns for boredom, confusion, frustration, and engaged concentration. They are outputs
            of ASSISTments&rsquo; own sensor-free affect detectors, computed from interaction-log
            features such as errors, correct answers, hints, and timing, not from anything a
            student wrote. They are predictions, not observations: the detector version is unknown
            and the file contains no human labels. We asked whether adding them to the risk model
            (the last value, the running mean, and the running maximum of each, rank-transformed)
            improves wheel-spinning prediction.
          </p>
          <p>
            A published log-based affect detector (frustration, confusion, concentration, boredom
            outputs) did not add enough information to clear our pre-registered bar. The numbers
            are held until the dataset terms are confirmed. The bar was fixed before any of that
            data was read. This is a statement about this detector, this data, and this decision,
            not a claim that affect is irrelevant to tutoring; and because the detectors read the
            same interaction logs the risk model already uses, overlap with the response history
            is expected. Other signals, such as keystroke dynamics, response latency used
            directly, or gaze, could be tested against the same pre-registered gate.
          </p>
        </section>

        <section className="methodology-section">
          <p className="kicker">Result · held-out test, 2012–13 data</p>
          <h2>Does it hold on a second year of students?</h2>
          <p>
            A locked 20% of the 2012–13 skill-builder students was reserved for
            one evaluation of the 2009-trained models and the three policies, with every threshold
            frozen from 2009. The lock file was written before the test rows were read. Students
            appearing in both years were removed first.
          </p>
          {/* 2012-13 results held pending dataset terms; restore from private copy */}
          {showCrossDataset ? null : (
            <div className="methodology-status" style={{ gridColumn: "auto", gridRow: "auto" }}>
              <span>Evaluated · numbers held</span>
              <strong>Cross-dataset test complete</strong>
              <small>
                The evaluation has been run once; the results are held pending dataset terms. The numbers
                are not shown here until the ASSISTments team confirms the terms for the 2012–13
                file. They will appear with confidence intervals, whatever they show.
              </small>
            </div>
          )}
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
              The three cost settings are weights we chose (3:1, 1:1, 1:3). The cost of an
              interruption is an assumed weight in an offline simulation, not a measured harm;
              whether the quiet setting reduces frustration or preserves working memory has not
              been measured and needs a live comparison with students. Nothing here shows that any
              group of learners corresponds to the settings.
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
              The mastery-definition sensitivity and the multi-skill comparison use validation
              students only and are exploratory. The mastery sensitivity covered BKT as the risk
              score only; the other risk models were not re-run. The closed-loop simulation rests
              entirely on assumed parameters.
            </li>
            <li>
              The live demo uses one pooled parameter set rather than the per-skill parameters the
              evaluated policy used; on validation this changes about 14% of Quiet wrong-step
              decisions, so the demo approximates the evaluated policy (Quiet saving 49.8% with
              per-skill parameters, 43.9% pooled; see{" "}
              <a href={`${repoUrl}/blob/aria-pace/aria_pace/RESULTS_v4.md`}>RESULTS_v4.md</a>).
            </li>
            <li>
              The &ldquo;Would you step in?&rdquo; moments test ARIA&rsquo;s default rule and do not
              distinguish the three profiles: ARIA makes the same decision on all eight under Quiet,
              Balanced and Supportive.
            </li>
            <li>
              The 2009 data are ASSISTments skill-builder math logs (grade level not stated),
              not calculus. ARIA&rsquo;s live tutor targets algebra through calculus and applies the
              fitted parameters unchanged, so they need re-calibration before any deployment.
            </li>
            <li>
              The language analyzer was evaluated only on synthetic messages. The ARIA-Pace gate and
              its published results do not depend on it. In the demo its flags (they need an
              explicit feeling word) can add an affect-based reply or prompt a reply to a
              words-only message, but never override correctness.
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
            Specification, amendments, frozen thresholds, the 2009&ndash;10 results, and lock files
            are committed in the{" "}
            <a href={repoUrl}>aria.kls repository</a> on the <code>aria-pace</code> branch. The
            student-id splits and the second-dataset results are held pending dataset terms. The raw
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
