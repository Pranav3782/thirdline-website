import type { ReactNode } from "react";

const SPARK =
  "M50 30 C51 44 57.5 51 71.5 52 C57.5 53 51 60 50 74 C49 60 42.5 53 28.5 52 C42.5 51 49 44 50 30 Z";

type MarkVariant = "primary" | "inverse";

/** Primary: ink disc, lime spark (on light or lime). Inverse: lime disc, ink spark (on ink). */
export function LogoMark({
  variant = "primary",
  className = "h-8 w-8",
}: {
  variant?: MarkVariant;
  className?: string;
}) {
  const disc = variant === "primary" ? "var(--color-ink)" : "var(--color-lime)";
  const spark = variant === "primary" ? "var(--color-lime)" : "var(--color-ink)";
  return (
    <svg viewBox="0 0 100 100" className={`shrink-0 ${className}`} aria-hidden>
      <circle cx="50" cy="50" r="50" fill={disc} />
      <path d={SPARK} fill={spark} />
      <circle cx="34" cy="37" r="4" fill={spark} />
      <path d="M68.5 24.5 V38.5 M61.5 31.5 H75.5" stroke={spark} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  variant = "primary",
  className = "",
  size = "md",
}: {
  variant?: MarkVariant;
  className?: string;
  size?: "md" | "lg";
}) {
  const text = variant === "primary" ? "text-ink" : "text-white";
  return (
    <span className={`inline-flex items-center ${size === "lg" ? "gap-3" : "gap-2.5"} ${className}`}>
      <LogoMark variant={variant} className={size === "lg" ? "h-11 w-11" : "h-8 w-8"} />
      <span
        className={`font-display font-extrabold leading-none ${text} ${size === "lg" ? "text-3xl" : "text-[22px]"}`}
      >
        Thirdline
      </span>
    </span>
  );
}

export type Tint = "lavender" | "butter" | "peach" | "sky" | "mist" | "lime";

export const tintBg: Record<Tint, string> = {
  lavender: "bg-lavender",
  butter: "bg-butter",
  peach: "bg-peach",
  sky: "bg-sky",
  mist: "bg-mist",
  lime: "bg-lime",
};

export function Tag({ children, tint = "mist" }: { children: ReactNode; tint?: Tint }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium text-ink ${tintBg[tint]}`}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3.5 text-[13px] font-semibold text-ink">
      <svg viewBox="0 0 100 100" className="h-6 w-6 shrink-0" aria-hidden>
        <circle cx="50" cy="50" r="50" fill="var(--color-lime)" />
        <path d="M50 22 C51.5 40 59 47.5 78 49 C59 50.5 51.5 58 50 76 C48.5 58 41 50.5 22 49 C41 47.5 48.5 40 50 22 Z" fill="var(--color-ink)" />
      </svg>
      {children}
    </p>
  );
}

/** Lime used as a fill behind words; lime text on light backgrounds is not allowed. */
export function Highlight({
  children,
  sweep = false,
  className = "",
}: {
  children: ReactNode;
  sweep?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`rounded-[0.3em] px-[0.18em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] ${sweep ? "highlight-sweep" : "bg-lime"} ${className}`}
    >
      {children}
    </span>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

const skinTones = ["#F2D3B8", "#E2B08C", "#C68B63", "#9A6342", "#6E4429"] as const;

export type PortraitStyle = "short" | "long" | "bun" | "curly" | "beard" | "scarf";

export type PortraitProps = {
  style: PortraitStyle;
  skin?: 0 | 1 | 2 | 3 | 4;
  tint?: Tint;
  shirt?: string;
  hair?: string;
  className?: string;
  label?: string;
};

/** Hand-drawn style portrait: ink outline, flat fills, framed in a pastel rounded-square tile. */
export function Portrait({
  style,
  skin = 1,
  tint = "lavender",
  shirt = "#FFFFFF",
  hair = "#1B1B1F",
  className = "h-12 w-12",
  label,
}: PortraitProps) {
  const s = skinTones[skin];
  const stroke = { stroke: "#1B1B1F", strokeWidth: 1.6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-flex shrink-0 overflow-hidden rounded-[28%] border-[1.5px] border-ink ${tintBg[tint]} ${className}`}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full">
        {style === "long" && (
          <path d="M19 30 C18 17 25 12 32 12 C40 12 46 17 45 30 L47 46 C43 48 39 46 38 41 L26 41 C25 46 21 48 17 46 Z" fill={hair} {...stroke} />
        )}
        {style === "scarf" && (
          <path d="M18 31 C18 17 25 12 32 12 C39 12 46 17 46 31 C46 42 40 47 32 48 C24 47 18 42 18 31 Z" fill={hair} {...stroke} />
        )}
        <path d="M11 66 C11 50 21 45 32 45 C43 45 53 50 53 66" fill={shirt} {...stroke} />
        {style !== "scarf" && <path d="M28 37 V46 C30 47.5 34 47.5 36 46 V37" fill={s} {...stroke} />}
        {style === "scarf" ? (
          <ellipse cx="32" cy="29.5" rx="9" ry="10.5" fill={s} {...stroke} />
        ) : (
          <circle cx="32" cy="28" r="11" fill={s} {...stroke} />
        )}
        {(style === "short" || style === "beard" || style === "bun") && (
          <path d="M20.6 27 C20 17 26 14 33 14 C40 14 44.5 18.5 43.4 27 C40 22 35.5 21 30 21.5 C26 22 23 23.5 20.6 27 Z" fill={hair} {...stroke} />
        )}
        {style === "bun" && <circle cx="32" cy="12.5" r="4.6" fill={hair} {...stroke} />}
        {style === "long" && (
          <path d="M21 26 C22.5 18 27.5 16 33 16 C38.5 16 42 19 43 26 C38 22 29 21 21 26 Z" fill={hair} {...stroke} />
        )}
        {style === "curly" && (
          <g fill={hair} {...stroke}>
            <circle cx="22.5" cy="23" r="4.5" />
            <circle cx="26" cy="17.5" r="5" />
            <circle cx="32.5" cy="15.5" r="5.2" />
            <circle cx="39" cy="17.5" r="5" />
            <circle cx="42" cy="23" r="4.5" />
          </g>
        )}
        {style === "beard" && (
          <path d="M21.5 29 C21.5 39 26.5 42.5 32 42.5 C37.5 42.5 42.5 39 42.5 29 C40.5 34.5 36.5 35.5 32 35.5 C27.5 35.5 23.5 34.5 21.5 29 Z" fill={hair} {...stroke} />
        )}
        <circle cx="28" cy="28.5" r="1.2" fill="#1B1B1F" />
        <circle cx="36" cy="28.5" r="1.2" fill="#1B1B1F" />
        {style !== "beard" && <path d="M28.8 33 Q32 35.4 35.2 33" fill="none" {...stroke} />}
      </svg>
    </span>
  );
}

export const people = {
  founder: { style: "curly", skin: 2, tint: "peach", shirt: "#A6E24B" },
  rahul: { style: "short", skin: 3, tint: "sky", shirt: "#FFFFFF" },
  anika: { style: "long", skin: 1, tint: "lavender", shirt: "#FBE9A6", hair: "#3A2A20" },
  rohan: { style: "beard", skin: 3, tint: "sky", shirt: "#FFFFFF" },
  leah: { style: "bun", skin: 0, tint: "butter", shirt: "#DCD3F5", hair: "#7A4B2E" },
  sara: { style: "scarf", skin: 2, tint: "mist", shirt: "#CFE3F7", hair: "#3F7A17" },
  mentor: { style: "beard", skin: 4, tint: "butter", shirt: "#DCD3F5" },
} satisfies Record<string, Omit<PortraitProps, "className" | "label">>;

type IconName = "bulb" | "book" | "target" | "chat" | "group" | "sprout" | "calendar" | "search" | "check";

export function LineIcon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {name === "bulb" && (
        <g {...p}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
        </g>
      )}
      {name === "book" && (
        <g {...p}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
          <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
        </g>
      )}
      {name === "target" && (
        <g {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" />
        </g>
      )}
      {name === "chat" && (
        <g {...p}>
          <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4A8 8 0 1 1 20 12z" />
        </g>
      )}
      {name === "group" && (
        <g {...p}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.1.7 3.5 2.8 3.5 5.7" />
        </g>
      )}
      {name === "sprout" && (
        <g {...p}>
          <path d="M12 21v-9" />
          <path d="M12 12C12 7.5 8.5 5 4 5c0 4.5 3.5 7 8 7z" />
          <path d="M12 14c0-3.5 2.8-6 7-6 0 3.5-2.8 6-7 6z" />
        </g>
      )}
      {name === "calendar" && (
        <g {...p}>
          <rect x="3.5" y="5" width="17" height="15" rx="3" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </g>
      )}
      {name === "search" && (
        <g {...p}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </g>
      )}
      {name === "check" && (
        <g {...p}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </g>
      )}
    </svg>
  );
}

export function IconTile({
  name,
  tint = "mist",
  className = "h-11 w-11",
}: {
  name: IconName;
  tint?: Tint;
  className?: string;
}) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-xl text-ink ${tintBg[tint]} ${className}`}>
      <LineIcon name={name} />
    </span>
  );
}

export function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
