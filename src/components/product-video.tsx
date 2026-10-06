"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { scenes, video } from "@/lib/content";
import { buildTimeline } from "@/lib/timeline";
import { SceneVisual } from "./scene-visuals";
import { LogoMark } from "./ui";

function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function ProductVideo() {
  if (video.src) {
    return (
      <div className="overflow-hidden rounded-2xl bg-ink">
        <video
          controls
          preload="none"
          playsInline
          poster={video.poster ?? undefined}
          aria-label={video.title}
          className="aspect-video w-full"
        >
          <source src={video.src} type="video/mp4" />
          <track src={video.captions} kind="captions" srcLang="en" label="English" default />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  return <StoryboardPlayer />;
}

function StoryboardPlayer() {
  const { beats, total } = useMemo(() => buildTimeline(), []);
  const chapters = useMemo(() => {
    const seen = new Set<number>();
    return beats
      .filter((b) => {
        if (seen.has(b.sceneIndex)) return false;
        seen.add(b.sceneIndex);
        return true;
      })
      .map((b) => ({ sceneIndex: b.sceneIndex, start: b.start }));
  }, [beats]);

  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [muted, setMuted] = useState(false);
  const [seekCount, setSeekCount] = useState(0);
  const lastTs = useRef<number | null>(null);
  const timeRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function getAudio() {
    audioRef.current ??= new Audio();
    return audioRef.current;
  }

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const loop = (ts: number) => {
      if (lastTs.current != null) {
        const dt = (ts - lastTs.current) / 1000;
        setTime((t) => {
          const next = t + dt;
          if (next >= total) {
            setPlaying(false);
            return total;
          }
          return next;
        });
      }
      lastTs.current = ts;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      lastTs.current = null;
    };
  }, [playing, total]);

  const found = beats.findIndex((b) => time >= b.start && time < b.start + b.duration);
  const beatIndex = found === -1 ? beats.length - 1 : found;
  const beat = beats[beatIndex];
  const scene = scenes[beat.sceneIndex];
  const shown = scene.onScreen.filter((_, i) => (scene.revealAt?.[i] ?? i) <= beat.lineIndex);
  const ended = time >= total;

  useEffect(() => {
    timeRef.current = time;
  });

  useEffect(() => {
    const current = beats[beatIndex];
    const clip = current.audio;
    if (!playing || muted || !clip) return;
    const offset = timeRef.current - current.start;
    if (offset >= clip.duration - 0.05) return;

    const audio = audioRef.current ?? (audioRef.current = new Audio());
    if (!audio.src.endsWith(clip.src)) audio.src = clip.src;
    const startAt = () => {
      audio.currentTime = Math.max(0, offset);
      audio.play().catch(() => {});
    };
    if (audio.readyState >= 1) startAt();
    else audio.addEventListener("loadedmetadata", startAt, { once: true });

    const next = beats.slice(beatIndex + 1).find((b) => b.audio)?.audio;
    if (next) new Audio(next.src).preload = "auto";

    return () => {
      audio.removeEventListener("loadedmetadata", startAt);
      audio.pause();
    };
  }, [beats, beatIndex, playing, muted, seekCount]);

  function toggle() {
    setStarted(true);
    const willPlay = !playing || ended;
    if (ended) setTime(0);
    setPlaying(willPlay);
    if (willPlay && !muted) {
      const clip = (ended ? beats[0] : beat).audio;
      const audio = getAudio();
      if (clip && !audio.src.endsWith(clip.src)) audio.src = clip.src;
      audio.play().catch(() => {});
    }
  }

  function seek(t: number) {
    setStarted(true);
    setTime(Math.min(Math.max(t, 0), total - 0.01));
    setSeekCount((c) => c + 1);
  }

  return (
    <div>
      <div
        className="group relative overflow-hidden rounded-2xl bg-ink text-white"
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "k") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <div
          role="img"
          aria-label={`${video.title}. Scene ${scene.number}: ${scene.title}. ${scene.screen}`}
          className="relative aspect-video w-full overflow-hidden"
        >
          {started ? (
            <>
              <div key={beat.sceneIndex} className="animate-fade-up absolute inset-0">
                <SceneVisual scene={scene} shown={shown} />
              </div>
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] sm:left-6 sm:top-5 sm:text-xs">
                <span className="font-semibold text-lime tabular-nums">{scene.number}</span>
                <span className="text-white/80">{scene.title}</span>
              </div>
              {captions && beat.text !== "…" && (
                <p
                  aria-live="polite"
                  className="absolute inset-x-4 bottom-4 mx-auto w-fit max-w-[90%] rounded-lg bg-black/75 px-3 py-1.5 text-center text-xs leading-snug text-white sm:bottom-6 sm:text-base"
                >
                  {beat.text}
                </p>
              )}
            </>
          ) : (
            <Poster onPlay={toggle} duration={total} />
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : ended ? "Replay" : "Play"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink transition hover:bg-mist"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : ended ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
              </svg>
            )}
          </button>

          <div className="relative h-5 flex-1">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/15">
              <div className="h-full rounded-full bg-lime" style={{ width: `${(time / total) * 100}%` }} />
              {chapters.slice(1).map((c) => (
                <span
                  key={c.sceneIndex}
                  className="absolute top-0 h-1 w-0.5 bg-ink"
                  style={{ left: `${(c.start / total) * 100}%` }}
                />
              ))}
            </div>
            <input
              type="range"
              min={0}
              max={total}
              step={0.1}
              value={time}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek"
              aria-valuetext={`${formatTime(time)} of ${formatTime(total)}`}
              className="peer absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform peer-hover:scale-110 peer-focus-visible:ring-2 peer-focus-visible:ring-lime peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink"
              style={{ left: `${(time / total) * 100}%` }}
            />
          </div>

          <span className="hidden text-xs text-white/70 tabular-nums sm:inline">
            {formatTime(time)} / {formatTime(total)}
          </span>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-pressed={muted}
            aria-label={muted ? "Unmute voiceover" : "Mute voiceover"}
            className="rounded-md p-1 text-white/80 transition hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" />
              {muted ? (
                <path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setCaptions((c) => !c)}
            aria-pressed={captions}
            aria-label="Captions"
            className={`rounded-md border px-1.5 py-0.5 text-[11px] font-semibold transition ${
              captions ? "border-white bg-white text-ink" : "border-white/40 text-white/60 hover:text-white"
            }`}
          >
            CC
          </button>
        </div>
      </div>

      <details className="group/script mt-5 rounded-2xl bg-mist">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
          <span>
            Read the full script <span className="font-normal text-muted">· Rahul&apos;s story, 11 scenes</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition group-open/script:rotate-180" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <ol className="divide-y divide-line border-t border-line">
          {chapters.map(({ sceneIndex, start }) => {
            const s = scenes[sceneIndex];
            const active = sceneIndex === beat.sceneIndex && started;
            return (
              <li key={sceneIndex} className={`px-5 py-5 transition ${active ? "bg-lime/25" : ""}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-lg font-bold">
                    <span className="mr-2 text-leaf tabular-nums">{s.number}</span>
                    {s.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      seek(start);
                      setPlaying(true);
                    }}
                    className="shrink-0 text-xs font-medium text-leaf tabular-nums underline-offset-4 hover:underline"
                  >
                    ▶ {formatTime(start)}
                  </button>
                </div>
                <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-muted">
                  <span className="mr-1.5 font-semibold text-ink">Screen:</span>
                  {s.screen}
                  {s.onScreen.length > 0 && <> Text on screen: {s.onScreen.map((t) => `“${t}”`).join(" ")}</>}
                </p>
                <p className="mt-2 max-w-[70ch] text-[15px] leading-relaxed text-ink">
                  <span className="mr-1.5 font-semibold text-leaf">Voiceover:</span>
                  {s.voiceover.join(" ")}
                </p>
              </li>
            );
          })}
        </ol>
      </details>
    </div>
  );
}

function Poster({ onPlay, duration }: { onPlay: () => void; duration: number }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center"
      aria-label={`Play: ${video.title}`}
    >
      <svg viewBox="0 0 400 120" className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2" aria-hidden>
        <path d="M30 105 C 130 -15, 270 -15, 370 105" fill="none" stroke="var(--color-leaf)" strokeWidth="1.2" />
        <circle cx="30" cy="105" r="3" fill="var(--color-leaf)" />
        <circle cx="370" cy="105" r="3" fill="var(--color-leaf)" />
      </svg>
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-lime text-ink transition group-hover:scale-105">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
        </svg>
      </span>
      <span className="relative px-6">
        <span className="block font-display text-3xl font-extrabold sm:text-5xl">Meet Rahul</span>
        <span className="mt-2 block text-sm text-white/70">
          {video.title} · {formatTime(duration)}
        </span>
      </span>
      <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-white/80 sm:bottom-5 sm:left-6">
        <LogoMark variant="inverse" className="h-5 w-5" /> Thirdline
      </span>
      <span className="absolute bottom-4 right-4 rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/70 sm:bottom-5 sm:right-6">
        Voiceover and captions on
      </span>
    </button>
  );
}
