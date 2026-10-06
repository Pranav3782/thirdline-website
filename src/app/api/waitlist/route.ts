import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
  const topic = String(body.topic ?? "").trim().slice(0, 500);
  const role = body.role === "mentor" ? "mentor" : "founder";

  if (!name) return Response.json({ error: "Please add your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please add a valid email." }, { status: 400 });
  }

  const entry = { name, email, topic, role, createdAt: new Date().toISOString() };

  // Local JSONL store; swap for a database or email tool before deploying to serverless hosting.
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "waitlist.jsonl"), JSON.stringify(entry) + "\n");

  return Response.json({ ok: true });
}
