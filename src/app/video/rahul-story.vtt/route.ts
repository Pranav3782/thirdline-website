import { buildTimeline } from "@/lib/timeline";

export const dynamic = "force-static";

function timestamp(seconds: number) {
  const ms = Math.round(seconds * 1000);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const rest = ms % 1000;
  const pad = (n: number, len = 2) => String(n).padStart(len, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(rest, 3)}`;
}

export async function GET() {
  const { beats } = buildTimeline();
  const cues = beats
    .filter((beat) => beat.spoken > 0)
    .map(
      (beat, i) =>
        `${i + 1}\n${timestamp(beat.start)} --> ${timestamp(beat.start + beat.spoken)}\n${beat.text}`,
    )
    .join("\n\n");

  return new Response(`WEBVTT\n\n${cues}\n`, {
    headers: { "Content-Type": "text/vtt; charset=utf-8" },
  });
}
