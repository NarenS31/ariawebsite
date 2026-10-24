import { neon } from "@neondatabase/serverless";

import { demoBuild, demoMoments } from "@/src/demoMoments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ROLES = ["Teacher", "Researcher", "Student", "Parent", "Other"];
const CHOICES = ["step_in", "stay_quiet"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MIN_ELAPSED_MS = 20_000;
const MAX_BODY = 4000;

const json = (body: object, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: "Request too large." }, 413);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "Invalid request." }, 400);

  // Spam protection, as on /api/join: a filled honeypot, or a submit less than 20 seconds after the activity started
  // (elapsedMs is measured in the browser, so device clocks don't matter), looks like a bot. Pretend success, store nothing.
  const elapsed = Number(body.elapsedMs);
  const trapped = typeof body.hp === "string" && body.hp.trim() !== "";
  if (trapped || !Number.isFinite(elapsed) || elapsed < MIN_ELAPSED_MS) {
    console.warn("activity: dropped as spam", { reason: trapped ? "honeypot" : Number.isFinite(elapsed) ? "too-fast" : "no-elapsed-time", elapsed: Number.isFinite(elapsed) ? Math.round(elapsed) : null });
    return json({ ok: true });
  }

  const errors: Record<string, string> = {};
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.toLowerCase() : "";
  if (!UUID.test(sessionId)) errors.sessionId = "This session could not be identified. Please reload the activity.";

  // Exactly 8 answers: moments M1-M8 once each, choices step_in / stay_quiet only. Anything else in an item is ignored, never stored.
  const wanted = demoMoments.map((m) => m.id);
  const seen = new Set<string>();
  const answers: { moment: string; choice: string }[] = [];
  if (!Array.isArray(body.answers) || body.answers.length !== wanted.length) {
    errors.answers = "Please answer all eight moments with Step in or Stay quiet.";
  } else {
    for (const item of body.answers) {
      const moment = item && typeof item === "object" ? (item as Record<string, unknown>).moment : undefined;
      const choice = item && typeof item === "object" ? (item as Record<string, unknown>).choice : undefined;
      if (typeof moment !== "string" || !wanted.includes(moment) || seen.has(moment) || typeof choice !== "string" || !CHOICES.includes(choice)) {
        errors.answers = "Please answer all eight moments with Step in or Stay quiet.";
        break;
      }
      seen.add(moment);
      answers.push({ moment, choice });
    }
  }

  const role = typeof body.role === "string" ? body.role.trim() : "";
  if (role && !ROLES.includes(role)) errors.role = "Choose one of the listed roles.";
  if (body.consent !== true) errors.consent = "Please confirm you agree to share your answers anonymously.";
  if (Object.keys(errors).length) return json({ error: Object.values(errors)[0], fields: errors }, 400);

  answers.sort((a, b) => wanted.indexOf(a.moment) - wanted.indexOf(b.moment));
  // The count is ours, never the browser's: how many choices match ARIA's logged decision for that moment.
  const agreeCount = answers.filter((a, i) => a.choice === demoMoments[i].decision).length;

  const url = process.env.DATABASE_URL;
  if (!url) return json({ error: "Sharing is temporarily unavailable. Your answers were not sent." }, 503);

  try {
    const sql = neon(url);
    await sql`
      insert into activity_responses (session_id, answers, agree_count, role, consent, build, source)
      values (${sessionId}, ${JSON.stringify(answers)}::jsonb, ${agreeCount}, ${role || null}, true, ${demoBuild}, 'activity')
      on conflict (session_id) do nothing`;
  } catch (error) {
    console.error("activity: insert failed", error instanceof Error ? error.message : "unknown error");
    return json({ error: "Could not share your answers. Please try again later." }, 500);
  }
  return json({ ok: true });
}
