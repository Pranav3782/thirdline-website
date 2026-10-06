import { LineIcon, Portrait, Tag, people, type Tint } from "./ui";

const mentors = [
  { person: people.anika, name: "Anika S.", tag: "Landed first 50 customers", tint: "lavender" as Tint, selected: true },
  { person: people.rohan, name: "Rohan M.", tag: "Closed a seed round", tint: "sky" as Tint },
  { person: people.leah, name: "Leah K.", tag: "Tested pricing, got it right", tint: "butter" as Tint },
];

const days = [
  { d: "Mon", n: 12 },
  { d: "Tue", n: 13, active: true },
  { d: "Wed", n: 14 },
  { d: "Thu", n: 15 },
  { d: "Fri", n: 16 },
];

const slots = ["10:00", "11:30", "14:00", "16:30"];

export function BookingInfographic() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Panel step={1} title="Browse mentors" caption="Filter by the exact thing you're stuck on.">
        <div className="mb-3 flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm text-muted">
          <LineIcon name="search" className="h-4 w-4" />
          Crack sales
        </div>
        <ul className="space-y-2">
          {mentors.map((m) => (
            <li
              key={m.name}
              className={`flex items-center gap-3 rounded-2xl bg-white p-2.5 ${
                m.selected ? "ring-[1.5px] ring-ink" : "ring-1 ring-line"
              }`}
            >
              <Portrait {...m.person} className="h-10 w-10" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="truncate text-xs text-muted">{m.tag}</p>
              </div>
              {m.selected && <Tag tint="lime">Pick</Tag>}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel step={2} title="Book a time" caption="See open slots. Pick one that works.">
        <div className="flex items-center gap-2.5">
          <Portrait {...people.anika} className="h-10 w-10" />
          <div>
            <p className="text-sm font-semibold">1:1 with Anika</p>
            <p className="text-xs text-muted">30 min · Video call</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1.5 text-center">
          {days.map((day) => (
            <div key={day.d} className={`rounded-xl py-1.5 ${day.active ? "bg-ink text-white" : "bg-white text-ink"}`}>
              <p className={`text-[11px] ${day.active ? "text-white/70" : "text-muted"}`}>{day.d}</p>
              <p className="text-sm font-semibold tabular-nums">{day.n}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {slots.map((s) => (
            <div
              key={s}
              className={`rounded-full py-2 text-center text-xs font-semibold tabular-nums ${
                s === "11:30" ? "bg-lime text-ink" : "bg-white text-ink ring-1 ring-line"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </Panel>

      <Panel step={3} title="Get unstuck" caption="Talk it through with someone who's done it.">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative flex aspect-[4/3] items-center justify-center rounded-2xl bg-ink md:aspect-[4/5]">
            <Portrait {...people.founder} className="h-14 w-14" />
            <span className="absolute bottom-2 left-2.5 text-[11px] text-white/80">You</span>
          </div>
          <div className="relative flex aspect-[4/3] items-center justify-center rounded-2xl bg-ink md:aspect-[4/5]">
            <Portrait {...people.anika} className="h-14 w-14" />
            <span className="absolute bottom-2 left-2.5 text-[11px] text-white/80">Anika</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-full bg-white px-3.5 py-2 ring-1 ring-line">
          <span className="flex items-center gap-2 text-xs font-semibold text-leaf">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime ring-1 ring-leaf" />
            Live · 1:1
          </span>
          <span className="text-xs font-medium text-muted tabular-nums">12:48</span>
        </div>
      </Panel>
    </div>
  );
}

function Panel({
  step,
  title,
  caption,
  children,
}: {
  step: number;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 ring-1 ring-line">
      <div className="flex-1 rounded-2xl bg-mist p-4">{children}</div>
      <div className="mt-4 flex gap-3 px-1 pb-1">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white tabular-nums">
          {step}
        </span>
        <div>
          <p className="font-display text-lg font-bold">{title}</p>
          <p className="mt-0.5 text-sm text-muted">{caption}</p>
        </div>
      </div>
    </div>
  );
}
