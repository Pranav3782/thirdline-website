"use client";

import { useState } from "react";
import { Eyebrow, IconTile, Section, type Tint } from "@/components/ui";
import { examples } from "@/lib/content";

const exampleIcons = [
  "target", "sprout", "group", "sprout", "group", "target", "book", "chat",
  "bulb", "search", "group", "group", "chat", "chat", "bulb",
] as const;

const exampleTints: Tint[] = ["lavender", "butter", "peach", "sky"];

const INITIAL_COUNT = 6;

export function ExamplesSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleExamples = isExpanded ? examples : examples.slice(0, INITIAL_COUNT);
  const remainingCount = examples.length - INITIAL_COUNT;

  return (
    <Section id="examples" className="bg-mist">
      <div className="max-w-3xl">
        <Eyebrow>Examples</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
          If you are a founder and you don&apos;t know how to…
        </h2>
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
        {visibleExamples.map((ex, i) => (
          <li
            key={ex.problem}
            className="animate-fade-up flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-line transition hover:ring-ink"
          >
            <IconTile
              name={exampleIcons[i % exampleIcons.length]}
              tint={exampleTints[i % exampleTints.length]}
            />
            <div>
              <h3 className="font-display text-xl font-bold leading-tight">{ex.problem}</h3>
              <p className="mt-1.5 text-[15px] leading-snug text-muted">{ex.mentor}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 font-display text-sm font-bold text-ink shadow-sm transition-all duration-200 hover:border-ink hover:bg-ink hover:text-white"
        >
          {isExpanded ? (
            <>
              <span>Show less</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden
              >
                <path
                  d="M18 15l-6-6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          ) : (
            <>
              <span>See more examples ({remainingCount} more)</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </Section>
  );
}
