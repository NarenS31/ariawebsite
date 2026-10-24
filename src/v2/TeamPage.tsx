import { SitePage } from "../AriaExperience";
import { Reveal } from "./motion";

// TODO(team): confirm role titles and add the bios (set `bio`; the bio block stays hidden until then).
const people = [
  {
    name: "Naren Saravanan",
    role: "Co-founder & researcher", // TODO: confirm role text with Naren and Karthik
    email: "11narensara11@gmail.com",
    photo: "/naren-saravanan.jpg",
    photoPosition: "center 25%",
    bio: "", // TODO: Naren writes a 2–3 sentence bio
  },
  {
    name: "Karthik Malireddy",
    role: "Co-founder & researcher", // TODO: confirm role text with Naren and Karthik
    email: "malireddykarthikeya@gmail.com",
    photo: "/karthik-malireddy.jpg",
    photoPosition: "center 0%",
    bio: "", // TODO: Karthik writes a 2–3 sentence bio
  },
];

export default function TeamPage() {
  return (
    <SitePage>
      <div className="v2 team-page">
        <header className="band band--grid pagehead">
          <div className="wrap g12">
            <div className="c-8">
              <h1>Our team</h1>
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
                    <img src={p.photo} alt={p.name} width={320} height={320} loading="lazy" style={{ objectPosition: p.photoPosition }} />
                  </div>
                  <div className="person__body">
                    <h2>{p.name}</h2>
                    <p className="person__role">{p.role}</p>
                    <p className="person__school">Marvin Ridge High School</p>
                    {p.bio && <p className="person__bio">{p.bio}</p>}
                    <a className="textlink" href={`mailto:${p.email}`}>
                      {p.email}
                    </a>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <p className="wrap team-join">
          Want to get involved? <a className="textlink" href="/join">Join ARIA →</a>
        </p>
      </div>
    </SitePage>
  );
}
