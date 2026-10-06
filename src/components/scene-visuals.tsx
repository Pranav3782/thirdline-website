"use client";

import type { Scene } from "@/lib/content";
import { Logo, Portrait, people } from "./ui";
import { WaitlistButton } from "./waitlist";

type Props = { scene: Scene; shown: string[] };

export function SceneVisual({ scene, shown }: Props) {
  switch (scene.visual) {
    case "street":
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <Skyline />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="animate-float">
              <Portrait {...people.rahul} className="h-16 w-16 sm:h-24 sm:w-24" />
            </div>
            {shown[0] && <BigText key={shown[0]}>{shown[0]}</BigText>}
          </div>
        </div>
      );

    case "clinics":
      return (
        <div className="flex h-full w-full items-center justify-center gap-3 px-6 sm:gap-5">
          {[
            { label: "Consultation", tint: "bg-lavender" },
            { label: "Follow-up", tint: "bg-sky" },
            { label: "Lab", tint: "bg-butter" },
          ].map((c, i) => (
            <div
              key={c.label}
              style={{ animationDelay: `${i * 0.25}s` }}
              className={`animate-fade-up flex aspect-[3/4] w-[22%] max-w-36 flex-col items-center justify-center gap-2 rounded-2xl ${c.tint}`}
            >
              <ClinicIcon />
              <span className="text-[10px] font-medium text-ink sm:text-xs">{c.label}</span>
            </div>
          ))}
          <div className="animate-fade-up flex aspect-[9/16] w-[18%] max-w-28 flex-col items-center justify-center gap-1 rounded-2xl border-2 border-white/30 bg-ink p-2 [animation-delay:0.8s]">
            <span className="text-[9px] text-white/60 sm:text-[11px]">Appointment</span>
            <span className="text-xs font-semibold text-lime tabular-nums sm:text-base">10:30</span>
          </div>
        </div>
      );

    case "waiting":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <Clock />
          {shown[0] && <BigText key={shown[0]} accent>{shown[0]}</BigText>}
        </div>
      );

    case "pattern":
    case "realisation":
    case "lesson":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center sm:gap-3">
          {scene.onScreen.map((text, i) => {
            const visible = i < shown.length;
            const last = i === scene.onScreen.length - 1;
            return (
              <p
                key={text}
                className={`font-display text-2xl font-bold transition-all duration-500 sm:text-4xl ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                } ${last ? "text-lime" : "text-white"}`}
              >
                {text}
              </p>
            );
          })}
        </div>
      );

    case "idea":
      return (
        <div className="flex h-full w-full items-center justify-center gap-6 sm:gap-10">
          <div className="hidden aspect-[3/4] w-28 rotate-[-6deg] rounded-xl bg-white p-3 sm:block">
            <svg viewBox="0 0 80 100" className="h-full w-full" aria-hidden>
              <path d="M8 18 H60 M8 34 H50 M8 50 H66" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              <circle cx="58" cy="78" r="12" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="2" />
              <path d="M58 70 V78 L64 82" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="animate-fade-up flex aspect-[9/16] w-32 flex-col justify-center gap-2 rounded-[1.5rem] border-[3px] border-white/30 bg-white p-3 sm:w-40">
            {(shown[0] ?? "").split(". ").map((part, i) => (
              <p
                key={part}
                className={`rounded-full px-2 py-2 text-center text-[11px] font-semibold text-ink sm:text-xs ${
                  ["bg-lavender", "bg-butter", "bg-lime"][i] ?? "bg-mist"
                }`}
              >
                {part.replace(/\.$/, "")}
              </p>
            ))}
          </div>
        </div>
      );

    case "building":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <div className="flex items-end gap-6">
            <div className="relative h-20 w-32 rounded-t-xl border-2 border-white/40 bg-white/5 sm:h-24 sm:w-40">
              <div className="absolute inset-2.5 space-y-1.5">
                {[70, 45, 85, 55].map((w, i) => (
                  <div key={i} className={`h-1.5 rounded ${i === 2 ? "bg-lime" : "bg-white/40"}`} style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="absolute -bottom-2 -left-3 -right-3 h-2 rounded-b-lg bg-white/40" />
            </div>
            <div className="flex h-16 w-14 flex-col overflow-hidden rounded-xl bg-white text-center">
              <span className="bg-lime py-0.5 text-[10px] font-semibold text-ink">Week</span>
              <span className="flex flex-1 items-center justify-center text-xl font-semibold text-ink tabular-nums">
                <WeekFlip />
              </span>
            </div>
          </div>
          {shown[0] && <BigText key={shown[0]}>{shown[0]}</BigText>}
        </div>
      );

    case "zero":
      return (
        <div className="flex h-full w-full items-center justify-center">
          {shown[0] ? (
            <p key={shown[0]} className="animate-fade-up font-display text-7xl font-extrabold text-lime sm:text-9xl">
              {shown[0]}
            </p>
          ) : (
            <div className="flex items-center gap-6">
              <Portrait {...people.rahul} className="h-14 w-14 sm:h-20 sm:w-20" />
              <span className="font-display text-4xl font-bold text-white/40">?</span>
              <Portrait style="bun" skin={1} tint="peach" shirt="#FFFFFF" className="h-14 w-14 sm:h-20 sm:w-20" />
            </div>
          )}
        </div>
      );

    case "call":
      return (
        <div className="grid h-full w-full grid-cols-2 gap-2 p-4 pb-16 sm:gap-3 sm:p-8 sm:pb-20">
          {[
            { person: people.rahul, name: "Rahul" },
            { person: people.mentor, name: "Worked with clinics" },
          ].map((p) => (
            <div key={p.name} className="relative flex items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <Portrait {...p.person} className="h-16 w-16 sm:h-24 sm:w-24" />
              <span className="absolute bottom-2 left-3 text-[10px] text-white/70 sm:text-xs">{p.name}</span>
            </div>
          ))}
        </div>
      );

    case "product":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-4">
          <Logo variant="inverse" size="lg" />
          <div className="grid w-full max-w-xl grid-cols-3 gap-2 sm:gap-3">
            {scene.onScreen.map((text, i) => (
              <div
                key={text}
                className={`rounded-2xl p-2.5 text-center text-[10px] font-semibold transition-all duration-500 sm:p-4 sm:text-sm ${
                  i < shown.length ? `${["bg-lavender", "bg-butter", "bg-lime"][i]} text-ink` : "bg-white/5 text-white/30"
                }`}
              >
                <span className="mb-1 block tabular-nums opacity-60">{i + 1}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      );

    case "cta":
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <div className="relative flex items-end gap-16 sm:gap-24">
            <svg viewBox="0 0 200 60" className="absolute -top-8 left-1/2 h-12 w-44 -translate-x-1/2 sm:w-56" aria-hidden>
              <path
                d="M30 58 C 70 0, 130 0, 170 58"
                fill="none"
                stroke="var(--color-lime)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ strokeDasharray: 220, ["--dash" as string]: 220 }}
                className="animate-draw"
              />
              <circle cx="100" cy="15" r="4" fill="var(--color-lime)" />
            </svg>
            <Portrait {...people.rahul} className="h-12 w-12 sm:h-14 sm:w-14" />
            <Portrait {...people.mentor} className="h-12 w-12 sm:h-14 sm:w-14" />
          </div>
          <div className="mt-2">
            <Logo variant="inverse" size="lg" />
          </div>
          <p className="text-sm text-white/70">Coming soon · Waitlist open</p>
          <WaitlistButton role="founder" size="sm">
            Join the waitlist
          </WaitlistButton>
        </div>
      );
  }
}

function BigText({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <p className={`animate-fade-up font-display text-4xl font-extrabold sm:text-6xl ${accent ? "text-lime" : "text-white"}`}>
      {children}
    </p>
  );
}

function Skyline() {
  return (
    <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/3 w-full" aria-hidden>
      <path
        d="M0 120 V80 H30 V60 H55 V85 H80 V50 H110 V75 H140 V40 H165 V70 H200 V55 H230 V90 H260 V45 H290 V70 H320 V60 H350 V85 H400 V120 Z"
        fill="#ffffff"
        opacity="0.07"
      />
      <path d="M0 118 H400" stroke="var(--color-lime)" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function ClinicIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="var(--color-ink)" strokeWidth="1.8" />
      <path d="M12 8v8M8 12h8" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Clock() {
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24 sm:h-32 sm:w-32" aria-hidden>
      <circle cx="50" cy="50" r="45" fill="none" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="4" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="10"
          x2="50"
          y2="16"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="2"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      <line x1="50" y1="50" x2="50" y2="28" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
      <g className="animate-tick" style={{ transformOrigin: "50px 50px" }}>
        <line x1="50" y1="50" x2="50" y2="16" stroke="var(--color-lime)" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="50" r="4" fill="var(--color-lime)" />
    </svg>
  );
}

function WeekFlip() {
  return (
    <span className="relative inline-block h-7 w-6 overflow-hidden">
      <span className="absolute inset-x-0 top-0 flex flex-col [animation:week-flip_4s_steps(8)_infinite]">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="h-7 leading-7">
            {Math.min(i + 1, 8)}
          </span>
        ))}
      </span>
      <style>{`@keyframes week-flip { to { transform: translateY(-224px); } }`}</style>
    </span>
  );
}
