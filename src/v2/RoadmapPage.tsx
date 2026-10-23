import { StudentFeedback, SitePage, Summit } from "../AriaExperience";
import Timeline, { type Phase } from "./Timeline";

// Wording is as supplied by the team. The one mention of the second dataset carries no numbers.
const phases: Phase[] = [
  {
    n: 1,
    status: "Complete",
    title: "Synthetic think-aloud data",
    body: "Generate think-aloud examples to build and test a first version of the system. This shows the pipeline works end to end. It does not show that it works for real students.",
  },
  {
    n: 2,
    status: "Current",
    title: "Timing model on real student logs",
    body: "ARIA-Pace combines a knowledge-tracing model fitted on public student logs with a timing rule. We evaluated it on locked splits from 2009–10 and 2012–13. The second set of results remains unpublished until the dataset terms are confirmed. These evaluations replay historical logs rather than testing the tutor in a classroom.",
    href: "/pace",
    hrefLabel: "Read the results",
  },
  {
    n: 3,
    status: "Planned",
    title: "Student interviews",
    body: "We plan to interview students about where they get stuck in math, what help they have rejected, and how they want to interact. Ethics review and consent must come first.",
  },
  {
    n: 4,
    status: "Planned",
    title: "Formative prototype testing",
    body: "We plan to observe small sessions where students use the prototype on math work. We will use these sessions to identify prompts that misfire, annoy, or get ignored and revise them before making outcome claims.",
  },
  {
    n: 5,
    status: "Planned",
    title: "Classroom and teacher-informed evaluation",
    body: "We plan to design an evaluation with teachers in real instructional settings, using measures they consider meaningful. This stage would allow us to begin investigating learning outcomes.",
  },
];

export default function RoadmapPage() {
  return (
    <SitePage>
      <div className="v2">
        <header className="band band--grid pagehead">
          <div className="wrap g12">
            <div className="c-7">
              <p className="eyebrow">Research roadmap</p>
              <h1>Five phases, in order.</h1>
            </div>
            <p className="lede c-5 pagehead__intro">
              Each phase has to hold up before the next one is worth running, and we are early in that sequence. Naming where we are is more useful than implying we are further along.
            </p>
          </div>
        </header>
        <section className="band band--white timeline-band" aria-label="Research phases">
          <div className="wrap">
            <Timeline phases={phases} />
          </div>
        </section>
        <div className="v2-legacy">
          <StudentFeedback />
          <Summit />
        </div>
      </div>
    </SitePage>
  );
}
