import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Methodology | ARIA Research Initiative",
  description:
    "A plain-language account of ARIA’s evidence levels, research protocols, current metrics, and unanswered questions.",
};

const glossary = [
  {
    term: "Development benchmark",
    meaning:
      "A test used to find software weaknesses. Synthetic benchmark scores are not evidence that students learn more.",
  },
  {
    term: "Human ground truth",
    meaning:
      "Labels created independently by trained people using a locked codebook, without seeing ARIA’s prediction.",
  },
  {
    term: "Active control",
    meaning:
      "A comparison tool with the same tasks, interface, time, and base model, but without ARIA’s learner-conditioned pipeline.",
  },
  {
    term: "Transfer",
    meaning:
      "A student uses planning, checking, or self-correction on a new task while ARIA is absent.",
  },
];

const evidenceRows = [
  {
    layer: "Task models",
    status: "100 schema-checked drafts",
    meaning: "Educator correctness review is pending.",
    claim: "The bank is structured and ready for review.",
  },
  {
    layer: "Observable language",
    status: "13 reasoning-move codes",
    meaning: "Independent annotation on real student language is pending.",
    claim: "ARIA can show the exact phrase behind a tentative label.",
  },
  {
    layer: "Response quality",
    status: "5 blinded conditions designed",
    meaning: "Two qualified educators must rate the locked responses.",
    claim: "A fair comparison can be run; no winner is claimed yet.",
  },
  {
    layer: "Synthetic stress test",
    status: "84.6% same-style accuracy",
    meaning: "The balanced score is 0.837; the cross-generator gap is 9.05 points.",
    claim: "Useful for debugging only.",
  },
  {
    layer: "Student outcomes",
    status: "0 completed controlled studies",
    meaning: "Feasibility, learning, retention, and transfer remain untested with students.",
    claim: "No effectiveness claim.",
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
          Back to research status <span aria-hidden="true">←</span>
        </a>
      </header>

      <article className="methodology-note">
        <header className="methodology-hero">
          <p className="kicker">Research note 01 · Updated July 2026</p>
          <h1>How ARIA plans to earn its claims.</h1>
          <p>
            ARIA separates software checks, educator judgment, real-language validation, student
            feasibility, and learning outcomes. A result advances only the claim it actually tests.
          </p>
          <div className="methodology-status">
            <span>Current status</span>
            <strong>Research infrastructure ready</strong>
            <small>Independent human evidence and student outcomes remain pending</small>
          </div>
        </header>

        <section className="methodology-section">
          <p className="kicker">The research question</p>
          <h2>Can ARIA provide grounded help without taking over the work?</h2>
          <p>
            The program tests several different questions: whether tasks are correct, whether
            responses use the student’s actual reasoning, whether language labels match independent
            human judgments, and eventually whether students learn and transfer strategies.
          </p>
        </section>

        <section className="methodology-section">
          <p className="kicker">Evidence sequence</p>
          <h2>Five gates, from a working system to a learning claim.</h2>
          <ol className="methodology-process">
            <li>
              <span>01</span>
              <div>
                <h3>Validate the task bank.</h3>
                <p>
                  Two subject-qualified educators independently review answer models, solution
                  paths, misconceptions, hints, and scoring criteria. Disagreements stay visible.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Blindly compare response quality.</h3>
                <p>
                  Educators rate five paired conditions for problem grounding, student grounding,
                  usefulness, actionability, ownership, answer leakage, and invented student actions.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Validate language on real student messages.</h3>
                <p>
                  Two trained annotators label observable reasoning moves with exact evidence spans.
                  Evaluation is split by complete student or session, never random messages.
                </p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <h3>Run a reviewed feasibility pilot.</h3>
                <p>
                  With institutional review, parent permission, and student assent, test whether the
                  tool is understandable, usable, and safe before asking whether it is effective.
                </p>
              </div>
            </li>
            <li>
              <span>05</span>
              <div>
                <h3>Measure learning against an active control.</h3>
                <p>
                  Use independent outcome tasks, concealed assignment, blinded scoring, intention-to-
                  treat analysis, and a delayed no-ARIA transfer measure.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="methodology-section">
          <p className="kicker">Current evidence ledger</p>
          <div className="methodology-result-grid">
            <article>
              <strong>100</strong>
              <h3>Structured task drafts</h3>
              <p>Schema-valid and ready for independent educator review.</p>
            </article>
            <article>
              <strong>13</strong>
              <h3>Observable reasoning moves</h3>
              <p>Each automatic label keeps the exact supporting words visible.</p>
            </article>
            <article>
              <strong>0</strong>
              <h3>Completed outcome studies</h3>
              <p>No classroom learning or ADHD-specific effectiveness claim is being made.</p>
            </article>
          </div>

          <div className="methodology-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Evidence layer</th>
                  <th scope="col">Current status</th>
                  <th scope="col">What remains</th>
                  <th scope="col">Claim allowed today</th>
                </tr>
              </thead>
              <tbody>
                {evidenceRows.map((row) => (
                  <tr key={row.layer}>
                    <th scope="row">{row.layer}</th>
                    <td>{row.status}</td>
                    <td>{row.meaning}</td>
                    <td>{row.claim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="methodology-section">
          <p className="kicker">Reading the language</p>
          <h2>Four terms that prevent inflated claims.</h2>
          <dl className="methodology-glossary">
            {glossary.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="methodology-section">
          <p className="kicker">Sources behind the design</p>
          <h2>Evidence for the method, not proof of the product.</h2>
          <p>
            These sources support how ARIA should be studied. They do not establish that ARIA is
            effective.
          </p>
          <dl className="methodology-glossary">
            <div>
              <dt>
                <a href="https://doi.org/10.3389/fpsyg.2021.749749">
                  Observable self-regulated learning
                </a>
              </dt>
              <dd>Human coding of planning, monitoring, evaluation, and related think-aloud activity.</dd>
            </div>
            <div>
              <dt>
                <a href="https://aclanthology.org/2025.bea-1.77/">
                  Human evaluation of AI tutors
                </a>
              </dt>
              <dd>Mistake identification, guidance, and actionability evaluated with human labels.</dd>
            </div>
            <div>
              <dt>
                <a href="https://aclanthology.org/2023.findings-emnlp.372/">
                  Grounded tutoring dialogue
                </a>
              </dt>
              <dd>Teacher-authored scaffolding and documented risks of incorrect feedback or answer revelation.</dd>
            </div>
            <div>
              <dt>
                <a href="https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/metacognition">
                  Metacognition guidance
                </a>
              </dt>
              <dd>Planning, monitoring, and evaluation taught explicitly inside subject learning.</dd>
            </div>
            <div>
              <dt>
                <a href="https://ies.ed.gov/ncee/wwc/Docs/referenceresources/wwc_standards_handbook_v4.pdf">
                  What Works Clearinghouse standards
                </a>
              </dt>
              <dd>Randomization, attrition, baseline equivalence, eligible outcomes, and study confounds.</dd>
            </div>
            <div>
              <dt>
                <a href="https://www.hhs.gov/ohrp/regulations-and-policy/guidance/faq/children-research/index.html">
                  Research with children
                </a>
              </dt>
              <dd>Institutional review, parental permission, affirmative assent, and risk requirements.</dd>
            </div>
          </dl>
        </section>

        <section className="methodology-limitations">
          <p className="kicker">Limitations</p>
          <h2>What ARIA does not know yet.</h2>
          <ul>
            <li>The 100 task models have not yet been approved by independent educators.</li>
            <li>The observable-move baseline has not yet been tested against real human labels.</li>
            <li>The five response conditions have not yet received locked, blinded ratings.</li>
            <li>No student study has established usability, learning, retention, or transfer.</li>
            <li>Synthetic benchmark performance does not establish real-student understanding.</li>
            <li>Personal experience with ADHD motivates the question; it is not clinical evidence.</li>
          </ul>
        </section>

        <section className="methodology-next">
          <div>
            <p className="kicker">Evidence base</p>
            <h2>Built from learning science and rigorous evaluation standards.</h2>
          </div>
          <p>
            The design draws on observable self-regulated-learning coding, human evaluation of AI
            tutoring, grounded tutoring dialogue, metacognitive transfer research, and What Works
            Clearinghouse standards. Those sources justify the study design, not ARIA’s
            effectiveness.
          </p>
        </section>

        <footer className="methodology-footer">
          <p>Prepared by Naren Saravanan and Karthick Malireddy · ARIA Research Initiative</p>
          <a href="mailto:11narensara11@gmail.com?subject=ARIA%20research%20methodology">
            Ask about the methodology <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </article>
    </main>
  );
}
