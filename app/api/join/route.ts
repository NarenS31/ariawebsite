import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROLES = ["Teacher", "Researcher", "Student", "Parent", "Other"];
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MIN_FILL_MS = 2000;
const MAX_BODY = 8000;

const json = (body: object, status = 200) => Response.json(body, { status });
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim() : "").slice(0, max + 1);

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: "Request too large." }, 413);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  if (!body || typeof body !== "object") return json({ error: "Invalid request." }, 400);

  // Spam protection: a filled honeypot or an implausibly fast submit (elapsedMs is measured in the browser, so device clocks don't matter) looks like a bot.
  // Pretend success so bots get no signal, and store nothing.
  const elapsed = Number(body.elapsedMs);
  const trapped = text(body.hp, 200) !== "";
  if (trapped || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    console.warn("join: dropped as spam", { reason: trapped ? "honeypot" : "too-fast", elapsed });
    return json({ ok: true });
  }

  const firstName = text(body.firstName, 80);
  const lastName = text(body.lastName, 80);
  const affiliation = text(body.affiliation, 160);
  const email = text(body.email, 254);
  const interest = text(body.interest, 400);
  const role = text(body.role, 20);
  const source = text(body.source, 80);

  const errors: Record<string, string> = {};
  if (!firstName || firstName.length > 80) errors.firstName = "Enter a first name (up to 80 characters).";
  if (!lastName || lastName.length > 80) errors.lastName = "Enter a last name (up to 80 characters).";
  if (!affiliation || affiliation.length > 160) errors.affiliation = "Enter your school or organization (up to 160 characters).";
  if (!EMAIL.test(email) || email.length > 254) errors.email = "Enter a valid email address.";
  if (!interest || interest.length > 400) errors.interest = "Tell us what interests you (up to 400 characters).";
  if (role && !ROLES.includes(role)) errors.role = "Choose one of the listed roles.";
  if (body.consent !== true) errors.consent = "Please confirm you agree before submitting.";
  if (Object.keys(errors).length) return json({ error: "Please check the form.", fields: errors }, 400);

  const url = process.env.DATABASE_URL;
  if (!url) return json({ error: "Sign-ups are temporarily unavailable." }, 503);

  try {
    const sql = neon(url);
    await sql`
      insert into interest_signups (first_name, last_name, affiliation, email, interest, role, consent, source)
      values (${firstName}, ${lastName}, ${affiliation}, ${email}, ${interest}, ${role || null}, true, ${source || null})`;
  } catch {
    return json({ error: "Could not save your sign-up. Please try again later." }, 500);
  }
  return json({ ok: true });
}
