import { LineIcon, Portrait, Tag, people } from "./ui";

const steps = [
  { label: "Stuck founder", caption: "One bottleneck, weeks lost" },
  { label: "One mentor", caption: "Has solved exactly this" },
  { label: "1:1 call", caption: "Book a time, talk it through" },
  { label: "Unstuck", caption: "A clear next step" },
];

export function HeroInfographic() {
  return (
    <figure
      aria-label="A stuck founder finds one mentor, books a 1:1 call, and gets unstuck."
      className="relative rounded-2xl bg-mist p-5 sm:p-8"
    >
      <svg
        className="pointer-events-none absolute inset-x-16 top-[5.25rem] hidden h-8 w-[calc(100%-8rem)] lg:block"
        viewBox="0 0 1000 30"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 15 C 160 -5, 240 35, 333 15 S 520 -5, 666 15 S 860 35, 1000 15"
          fill="none"
          stroke="var(--color-leaf)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol className="relative grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {steps.map((step, i) => (
          <li key={step.label} className="flex flex-col">
            <div className="relative flex h-36 items-center justify-center rounded-2xl bg-white">
              {i === 0 && <StuckArt />}
              {i === 1 && <MentorArt />}
              {i === 2 && <CallArt />}
              {i === 3 && <UnstuckArt />}
            </div>
            <div className="mt-4 flex items-baseline gap-2.5 px-1">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white tabular-nums">
                {i + 1}
              </span>
              <div>
                <p className="font-display text-lg font-bold">{step.label}</p>
                <p className="text-sm text-muted">{step.caption}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function StuckArt() {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 120 44" className="h-11 w-28" aria-hidden>
        <path
          d="M10 28 C 25 5, 35 42, 45 20 S 60 5, 62 26 S 80 44, 82 18 S 100 10, 110 28 M40 32 C 55 46, 70 10, 90 34"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ strokeDasharray: 600, ["--dash" as string]: 600 }}
          className="animate-draw"
        />
      </svg>
      <Portrait {...people.founder} className="h-14 w-14" />
    </div>
  );
}

function MentorArt() {
  return (
    <div className="w-[85%] max-w-[11.5rem] rounded-2xl border-[1.5px] border-ink bg-white p-3">
      <div className="flex items-center gap-2.5">
        <Portrait {...people.anika} className="h-10 w-10" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Anika S.</p>
          <p className="truncate text-xs text-muted">Founder, B2B SaaS</p>
        </div>
      </div>
      <div className="mt-2.5">
        <Tag tint="lavender">First 50 customers</Tag>
      </div>
    </div>
  );
}

function CallArt() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative flex items-end gap-8">
        <svg viewBox="0 0 100 40" className="absolute -top-5 left-1/2 h-7 w-24 -translate-x-1/2" aria-hidden>
          <path d="M14 38 C 32 4, 68 4, 86 38" fill="none" stroke="var(--color-leaf)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="50" cy="12" r="3" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="1.2" />
        </svg>
        <Portrait {...people.founder} className="h-12 w-12" />
        <Portrait {...people.anika} className="h-12 w-12" />
      </div>
      <span className="mt-3">
        <Tag tint="lime">30 min · 1:1</Tag>
      </span>
    </div>
  );
}

function UnstuckArt() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 120 30" className="h-8 w-28" aria-hidden>
        <path d="M10 15 H 100" stroke="var(--color-leaf)" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M93 8 L 104 15 L 93 22" fill="none" stroke="var(--color-leaf)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="15" r="3" fill="var(--color-leaf)" />
      </svg>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime text-ink">
        <LineIcon name="check" className="h-6 w-6" />
      </span>
    </div>
  );
}
