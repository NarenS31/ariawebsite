import type { Metadata } from "next";
import { stateResults } from "@/src/data";

export const metadata: Metadata = {
  title: "Evaluation Methodology | ARIA Research Initiative",
  description:
    "A plain-language research note explaining how ARIA's early cognitive-state evaluation was conducted, measured, and limited.",
};

const glossary = [
  {
    term: "Accuracy",
    meaning: "Out of all test examples, how often ARIA selected the intended thinking state.",
  },
  {
    term: "Precision",
    meaning:
      "When ARIA predicted a particular state, how often that prediction matched the intended label.",
  },
  {
    term: "Recall",
    meaning:
      "Of all examples written for a particular state, how many ARIA successfully recognized.",
  },
  {
    term: "F1 score",
    meaning:
      "One score that balances precision and recall. Macro-F1 gives each of the seven states equal importance.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="methodology-page">
      <header className="methodology-nav">
        <a className="methodology-wordmark" href="/">
          ARIA <span>Research Initiative</span>
        </a>
        <a className="text-link" href="/#research">
          Back to early results <span aria-hidden="true">←</span>
        </a>
      </header>

      <article className="methodology-note">
        <header className="methodology-hero">
          <p className="kicker">Research note 01 · July 2026</p>
          <h1>How ARIA’s early evaluation works.</h1>
          <p>
            This note explains what the current numbers measure, how the test was structured, and
            what the results cannot yet tell us.
          </p>
          <div className="methodology-status">
            <span>Current evidence</span>
            <strong>Simulation-based model evaluation</strong>
            <small>Not a classroom learning-outcomes study</small>
          </div>
        </header>

        <section className="methodology-section">
          <p className="kicker">The research question</p>
          <h2>Can ARIA recognize a student’s likely thinking state from a think-aloud?</h2>
          <p>
            The evaluation tests state recognition. Each example represents one of seven states:
            planning, flow, confusion, rushing, frustration, being stuck, or insight. ARIA reads
            the example and predicts the most likely state.
          </p>
        </section>

        <section className="methodology-section">
          <p className="kicker">Evaluation design</p>
          <h2>Five steps, from examples to an honest result.</h2>
          <ol className="methodology-process">
            <li>
              <span>01</span>
              <div>
                <h3>Build a simulated training set.</h3>
                <p>
                  ARIA was trained with 3,507 simulated think-aloud examples spanning all seven
                  thinking states.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Keep the evaluation examples separate.</h3>
                <p>
                  The main test used 350 additional simulated examples that were not used to train
                  the state detector.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Make one prediction per example.</h3>
                <p>
                  For each think-aloud, ARIA selected one likely state. That prediction was compared
                  with the state the example was designed to represent.
                </p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Measure the overall and state-level performance.</h3>
                <p>
                  Accuracy summarizes all predictions. Precision, recall, and F1 show where the
                  system is reliable and where individual states remain difficult.
                </p>
              </div>
            </li>
            <li>
              <span>05</span>
              <div>
                <h3>Change the writing source.</h3>
                <p>
                  A cross-generator stress test checked how performance changed when examples used
                  an unfamiliar writing style. Accuracy fell by an average of 19 points.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="methodology-section">
          <p className="kicker">Results at a glance</p>
          <div className="methodology-result-grid">
            <article>
              <strong>80%</strong>
              <h3>Overall accuracy</h3>
              <p>ARIA selected the intended state in 8 out of 10 held-out examples.</p>
            </article>
            <article>
              <strong>0.796</strong>
              <h3>Macro-F1</h3>
              <p>Performance was summarized while giving every thinking state equal weight.</p>
            </article>
            <article>
              <strong>0.886</strong>
              <h3>Transfer-detection F1</h3>
              <p>
                A separate early test measured recognition of independent strategy use without a
                prompt.
              </p>
            </article>
          </div>

          <div className="methodology-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Thinking state</th>
                  <th scope="col">F1</th>
                  <th scope="col">Recall</th>
                  <th scope="col">Precision</th>
                </tr>
              </thead>
              <tbody>
                {stateResults.map((result) => (
                  <tr key={result.state}>
                    <th scope="row">{result.state}</th>
                    <td>{Number(result.f1).toFixed(3)}</td>
                    <td>{Number(result.recall).toFixed(3)}</td>
                    <td>{Number(result.precision).toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="methodology-section">
          <p className="kicker">Reading the metrics</p>
          <h2>The numbers answer different questions.</h2>
          <dl className="methodology-glossary">
            {glossary.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="methodology-limitations">
          <p className="kicker">Limitations</p>
          <h2>What this evaluation does not prove.</h2>
          <ul>
            <li>
              The examples were simulated. Real students may express the same thinking state in
              more varied and unexpected ways.
            </li>
            <li>
              The 19-point cross-generator gap suggests that ARIA learned some writing-style
              patterns instead of only learning general signals of thinking.
            </li>
            <li>
              State labels are useful hypotheses, not diagnoses of a student’s ability, emotion, or
              disability.
            </li>
            <li>
              These results do not show that ARIA improves grades, understanding, confidence, or
              long-term metacognitive independence.
            </li>
          </ul>
        </section>

        <section className="methodology-next">
          <div>
            <p className="kicker">Next evidence needed</p>
            <h2>Move from simulated recognition to learning with real students.</h2>
          </div>
          <p>
            The next phase should include consented think-aloud sessions, human review of state
            labels, broader writing styles, subgroup analysis, and longitudinal testing of whether
            students begin planning and self-checking without ARIA.
          </p>
        </section>

        <footer className="methodology-footer">
          <p>
            Prepared by Naren Saravanan and Karthick Mallireddy · ARIA Research Initiative
          </p>
          <a href="mailto:11narensara11@gmail.com?subject=ARIA%20evaluation%20methodology">
            Ask about the evaluation <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </article>
    </main>
  );
}
