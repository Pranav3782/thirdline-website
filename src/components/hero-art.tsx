"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { IconTile, LogoMark, Portrait, people, type PortraitProps } from "./ui";

type Node = { x: number; y: number; bend: number };

type Mentor = Node & {
  person: Omit<PortraitProps, "className">;
  problem: string;
  solved: string;
  side: "left" | "right";
  vertical: "above" | "below";
};

const founder: Node = { x: 50, y: 88, bend: 0 };

const mentors: Mentor[] = [
  { x: 17, y: 17, bend: -10, person: people.anika, problem: "fundraising", solved: "Closed a seed round", side: "left", vertical: "below" },
  { x: 83, y: 19, bend: 10, person: people.rohan, problem: "sales", solved: "Landed 50 customers", side: "right", vertical: "below" },
  { x: 86, y: 74, bend: -10, person: people.leah, problem: "pricing", solved: "Got pricing right", side: "right", vertical: "above" },
  { x: 15, y: 77, bend: 10, person: people.sara, problem: "hiring", solved: "Built a team from zero", side: "left", vertical: "above" },
];

const icons = [
  { x: 50, y: 11, bend: 0, name: "bulb" as const, tint: "butter" as const },
  { x: 8, y: 47, bend: -6, name: "chat" as const, tint: "sky" as const },
  { x: 92, y: 46, bend: 6, name: "sprout" as const, tint: "peach" as const },
];

const CYCLE_MS = 3600;

function curve({ x, y, bend }: Node) {
  const mx = (50 + x) / 2;
  const my = (50 + y) / 2;
  const dx = x - 50;
  const dy = y - 50;
  const len = Math.hypot(dx, dy) || 1;
  const cx = (mx + (-dy / len) * bend).toFixed(1);
  const cy = (my + (dx / len) * bend).toFixed(1);
  return {
    d: `M50 50 Q${cx} ${cy} ${x} ${y}`,
    tail: `Q${cx} ${cy} ${x} ${y}`,
    mid: { x: (50 + 2 * Number(cx) + x) / 4, y: (50 + 2 * Number(cy) + y) / 4 },
  };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function TravellingDot({ path }: { path: string }) {
  const motion = useRef<SVGAnimateMotionElement>(null);
  useEffect(() => {
    motion.current?.beginElement();
  }, []);
  return (
    <circle r="1.5" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="0.4">
      <animateMotion ref={motion} path={path} dur="1.4s" begin="indefinite" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.45 0 0.25 1" />
    </circle>
  );
}

export function HeroArt() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % mentors.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const match = mentors[active];

  return (
    <div
      role="img"
      aria-label="Thirdline at the center, matching a founder with a mentor who has solved their problem."
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <circle cx="50" cy="50" r="17" fill="none" stroke="var(--color-line)" strokeWidth="0.4" />

        {icons.map((n, i) => {
          const { d, mid } = curve(n);
          return (
            <g key={n.name} className="animate-fade" style={{ animationDelay: `${0.9 + i * 0.15}s` }}>
              <path d={d} fill="none" stroke="var(--color-lime)" strokeWidth="0.6" strokeLinecap="round" strokeDasharray="1.2 1.6" />
              <circle cx={mid.x} cy={mid.y} r="0.9" fill="var(--color-leaf)" />
            </g>
          );
        })}

        {[founder, ...mentors].map((n, i) => {
          const { d, mid } = curve(n);
          const on = i === 0 || i - 1 === active;
          return (
            <g key={i}>
              <path
                d={d}
                pathLength={1}
                fill="none"
                stroke="var(--color-leaf)"
                strokeLinecap="round"
                className="animate-draw transition-[stroke-width,opacity] duration-500"
                style={{
                  strokeDasharray: 1,
                  ["--dash" as string]: 1,
                  animationDelay: `${0.3 + i * 0.12}s`,
                  animationFillMode: "both",
                  strokeWidth: on ? 0.8 : 0.45,
                  opacity: on ? 1 : 0.45,
                }}
              />
              <circle cx={mid.x} cy={mid.y} r="0.9" fill="var(--color-leaf)" className="animate-fade" style={{ animationDelay: "1.2s" }} />
            </g>
          );
        })}

        {!reduced && <TravellingDot key={active} path={`M${founder.x} ${founder.y} L50 50 ${curve(match).tail}`} />}
      </svg>

      <div className="absolute left-1/2 top-1/2 w-[24%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-full border-2 border-leaf animate-ring" aria-hidden />
        <span className="absolute inset-0 rounded-full border-2 border-leaf animate-ring [animation-delay:1.4s]" aria-hidden />
        <div className="relative animate-pop rounded-full bg-white p-[12%]" style={{ animationDelay: "0.15s" }}>
          <LogoMark className="h-full w-full" />
        </div>
      </div>

      {mentors.map((m, i) => (
        <div
          key={i}
          className="absolute w-[19%] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <div className="animate-pop" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
            <div className="animate-float" style={{ animationDelay: `${i * 0.7}s` }}>
              <div
                className={`rounded-[28%] outline-[3px] outline-offset-2 transition duration-500 ${
                  i === active ? "scale-110 outline-lime" : "outline-transparent"
                }`}
              >
                <Portrait {...m.person} className="aspect-square h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      ))}

      <div
        className="absolute w-[19%] -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${founder.x}%`, top: `${founder.y}%` }}
      >
        <div className="animate-pop" style={{ animationDelay: "0.35s" }}>
          <Portrait {...people.founder} className="aspect-square h-auto w-full" />
        </div>
      </div>

      {icons.map((ic, i) => (
        <div
          key={ic.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${ic.x}%`, top: `${ic.y}%` }}
        >
          <div className="animate-pop" style={{ animationDelay: `${1 + i * 0.15}s` }}>
            <IconTile name={ic.name} tint={ic.tint} className="h-10 w-10 border-[1.5px] border-ink sm:h-11 sm:w-11" />
          </div>
        </div>
      ))}

      <Bubble
        key={`problem-${active}`}
        tone="border-[1.5px] border-ink bg-white"
        style={{ left: "61%", top: `${founder.y}%`, transform: "translateY(-50%)" }}
      >
        Stuck on {match.problem}
      </Bubble>
      <Bubble
        key={`solved-${active}`}
        delay={0.9}
        tone="bg-lime"
        style={{
          ...(match.side === "left" ? { left: `${match.x - 9.5}%` } : { right: `${100 - match.x - 9.5}%` }),
          top: `${match.vertical === "below" ? match.y + 12 : match.y - 12}%`,
          transform: match.vertical === "below" ? undefined : "translateY(-100%)",
        }}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {match.solved}
      </Bubble>
    </div>
  );
}

function Bubble({
  children,
  tone,
  style,
  delay = 0,
}: {
  children: ReactNode;
  tone: string;
  style: CSSProperties;
  delay?: number;
}) {
  return (
    <div className="absolute" style={style}>
      <p
        className={`animate-pop inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold text-ink sm:text-xs ${tone}`}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </p>
    </div>
  );
}
