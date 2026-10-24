import { SitePage } from "../AriaExperience";
import { Reveal } from "./motion";
import { Doodle } from "./ui";

const contact = "11narensara11@gmail.com";
const mail = (to: string, subject: string) => `mailto:${to}?subject=${encodeURIComponent(subject)}`;

// TODO(team): confirm role titles, write the bios, and swap in final photos. The two photos below are the ones already on the site.
const people = [
  {
    name: "Naren Saravanan",
    role: "Co-founder & researcher", // TODO: confirm role text with Naren and Karthik
    email: "11narensara11@gmail.com",
    photo: "/naren-saravanan.jpg",
    bioTodo: "TODO: Naren writes a 2–3 sentence bio here.",
  },
  {
    name: "Karthik Malireddy",
    role: "Co-founder & researcher", // TODO: confirm role text with Naren and Karthik
    email: "malireddykarthikeya@gmail.com",
    photo: "/karthik-malireddy.jpg",
    bioTodo: "TODO: Karthik writes a 2–3 sentence bio here.",
  },
];

const roles = [
  {
    tone: "yellow",
    who: "Teachers",
    ask: "Try the 8 moments and help plan a reviewed classroom pilot.",
    cta: "Plan a pilot with us",
    subject: "ARIA | Teacher: classroom pilot planning",
    extra: { href: "/activity", label: "Try the 8 moments first" },
  },
  {
    tone: "ink",
    who: "Researchers",
    ask: "Review our methods, replicate the replay, or collaborate.",
    cta: "Send a methods review",
    subject: "ARIA | Researcher: methods review or collaboration",
    extra: { href: "/pace#reproducibility", label: "How to rerun it" },
  },
  {
    tone: "warm",
    who: "Students",
    ask: "Give feedback on how hints should feel when you are stuck.",
    cta: "Share your experience",
    subject: "ARIA | Student feedback on hints",
  },
  {
    tone: "tint",
    who: "Advisors and mentors",
    ask: "We are looking for an adult advisor for ethics review and study design.",
    cta: "Offer to advise",
    subject: "ARIA | Advisor or mentor",
  },
] as const;

export default function TeamPage() {
  return (
    <SitePage>
      <div className="v2 team-page">
        <header className="band band--grid pagehead">
          <div className="wrap g12">
            <div className="c-8">
              <p className="eyebrow">Team</p>
              <h1>Two student researchers, one question.</h1>
              <p className="lede">
                ARIA is run by Naren and Karthik at Marvin Ridge High School in Waxhaw, North Carolina. We are looking for an adult advisor and for teachers willing to criticize the study design.
              </p>
            </div>
          </div>
        </header>

        <section className="band band--white" id="people">
          <div className="wrap">
            <ul className="people">
              {people.map((p, i) => (
                <Reveal as="li" className="person" key={p.name} delay={i * 80}>
                  <div className="person__photo">
                    {/* TODO(team): replace with the final portrait; alt text should describe the photo */}
                    <img src={p.photo} alt={`${p.name}`} width={320} height={320} loading="lazy" />
                  </div>
                  <div className="person__body">
                    <h2>{p.name}</h2>
                    <p className="person__role">{p.role}</p>
                    <p className="person__school">Marvin Ridge High School</p>
                    <p className="person__bio" data-todo>
                      {p.bioTodo}
                    </p>
                    <a className="textlink" href={`mailto:${p.email}`}>
                      {p.email}
                    </a>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="band band--warm" id="join">
          <div className="wrap">
            <Reveal className="sechead sechead--row">
              <div>
                <p className="eyebrow">Join us</p>
                <h2>Four ways to help, none of them signing up for something.</h2>
              </div>
              <Doodle kind="loop" className="sechead__doodle" />
            </Reveal>
            <ul className="joincards joincards--roles">
              {roles.map((r, i) => (
                <Reveal as="li" className={`joincard joincard--${r.tone}`} key={r.who} delay={i * 60}>
                  <h3>{r.who}</h3>
                  <p>{r.ask}</p>
                  <a className="joincard__cta" href={mail(contact, r.subject)}>
                    {r.cta} <span aria-hidden="true">→</span>
                  </a>
                  {"extra" in r && (
                    <a className="joincard__sub" href={r.extra.href}>
                      {r.extra.label}
                    </a>
                  )}
                </Reveal>
              ))}
            </ul>
            <p className="fineprint">These links open an email draft. Nothing is sent from this site, and there are no analytics or third-party forms.</p>
          </div>
        </section>
      </div>
    </SitePage>
  );
}
