// Generates the storyboard voiceover with the macOS system voices.
// Usage: npm run voiceover
// macOS only. Install the voices in System Settings → Accessibility → Spoken Content → System voice → Manage voices:
// English (India) → "Voice 1" (Siri) and "Aman (Premium)", English (US) → "Voice 4" (Siri).

import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { scenes } from "../src/lib/content.ts";

const NARRATOR = { name: "Riya", voice: "com.apple.siri.natural.Riya", rate: 0.5 };
const RAHUL = { name: "Aman", voice: "com.apple.voice.Aman.premium", rate: 0.5 };
const EXPERT = { name: "Nora", voice: "com.apple.siri.natural.Nora", rate: 0.5 };

/** `${sceneIndex}-${lineIndex}` → speaker for the dialogue in the conversation scene. */
const speakers = {
  "7-2": EXPERT,
  "7-3": RAHUL,
  "7-4": EXPERT,
  "7-5": RAHUL,
  "7-7": EXPERT,
  "7-8": EXPERT,
  "7-10": EXPERT,
};

/** Spoken-only fixes; captions keep the script text unchanged. */
function toSpeech(text) {
  return text
    .replace(/\bHowz\b/g, "How's")
    .replace(/[“”]/g, "")
    .replace(/,$/, ".");
}

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "voiceover");
const manifestPath = path.join(root, "src", "lib", "voiceover.json");
const tmp = mkdtempSync(path.join(os.tmpdir(), "thirdline-vo-"));

const jobs = [];
scenes.forEach((scene, s) => {
  scene.voiceover.forEach((text, l) => {
    if (text.trim() === "…") return;
    const key = `${s}-${l}`;
    const speaker = speakers[key] ?? NARRATOR;
    jobs.push({ key, speaker, text, voice: speaker.voice, rate: speaker.rate, out: path.join(tmp, `${key}.caf`) });
  });
});

const jobsPath = path.join(tmp, "jobs.json");
writeFileSync(jobsPath, JSON.stringify(jobs.map(({ voice, text, out, rate }) => ({ voice, text: toSpeech(text), out, rate }))));
execFileSync("swift", [path.join(import.meta.dirname, "speak.swift"), jobsPath], { stdio: ["ignore", "ignore", "inherit"] });

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const lines = {};
for (const { key, speaker, text, out } of jobs) {
  const m4a = path.join(outDir, `${key}.m4a`);
  execFileSync("afconvert", ["-f", "m4af", "-d", "aac ", out, m4a]);
  const info = execFileSync("afinfo", [m4a], { encoding: "utf8" });
  const duration = Number(info.match(/estimated duration: ([\d.]+)/)?.[1]);
  if (!duration) throw new Error(`Could not read duration for ${key}`);

  lines[key] = { src: `/voiceover/${key}.m4a`, duration: Math.round(duration * 1000) / 1000 };
  console.log(`${key.padEnd(6)} ${speaker.name.padEnd(5)} ${duration.toFixed(2)}s  ${text}`);
}

rmSync(tmp, { recursive: true, force: true });
writeFileSync(
  manifestPath,
  JSON.stringify({ narrator: NARRATOR.name, rahul: RAHUL.name, expert: EXPERT.name, lines }, null, 2) + "\n",
);
console.log(`\nWrote ${Object.keys(lines).length} clips to public/voiceover and ${path.relative(root, manifestPath)}`);
