"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import type { WaitlistRole } from "@/lib/content";
import { LogoMark } from "./ui";

type WaitlistContextValue = { open: (role: WaitlistRole) => void };

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [role, setRole] = useState<WaitlistRole>("founder");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const open = useCallback((nextRole: WaitlistRole) => {
    setRole(nextRole);
    setStatus("idle");
    setError("");
    dialogRef.current?.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("role", role);
    setStatus("submitting");
    setError("");
    try {
      // Netlify Forms only accepts posts to a static file; `next dev` can't serve that, so dev saves locally.
      const res =
        process.env.NODE_ENV === "development"
          ? await fetch("/api/waitlist", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(Object.fromEntries(data)),
            })
          : await fetch("/__forms.html", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
            });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "Something went wrong. Please try again.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const isFounder = role === "founder";

  return (
    <WaitlistContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="waitlist-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-0 text-ink"
      >
        <div className="p-7 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] font-medium text-leaf">Waitlist open · Beta</p>
              <h2 id="waitlist-title" className="mt-1.5 font-display text-3xl font-bold">
                {isFounder ? "Join as a founder" : "Join as a mentor"}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-full p-2 text-muted transition hover:bg-mist hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div role="tablist" aria-label="I am a" className="mt-5 grid grid-cols-2 rounded-full bg-mist p-1 text-sm">
            {(["founder", "mentor"] as const).map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={role === r}
                onClick={() => {
                  setRole(r);
                  setStatus("idle");
                }}
                className={`rounded-full px-4 py-2 font-medium capitalize transition ${
                  role === r ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {status === "success" ? (
            <div className="mt-7 rounded-2xl bg-mist p-6">
              <LogoMark className="h-10 w-10" />
              <p className="mt-4 font-display text-2xl font-bold">You&apos;ve joined the waitlist.</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                {isFounder
                  ? "We'll email you when Beta opens, so you can book your first mentor."
                  : "We'll email you when Beta opens, so you can set your availability."}
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-soft"
              >
                Done
              </button>
            </div>
          ) : (
            <form name="waitlist" onSubmit={onSubmit} className="mt-6 space-y-4">
              <input type="hidden" name="form-name" value="waitlist" />
              <p className="hidden" aria-hidden>
                <label>
                  Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <Field label="Name" name="name" autoComplete="name" required />
              <Field label="Email" name="email" type="email" autoComplete="email" required />
              <Field
                label={isFounder ? "What are you stuck on?" : "What have you solved?"}
                name="topic"
                placeholder={isFounder ? "Closing our first 10 customers" : "Closed a seed round in 2024"}
              />
              {status === "error" && (
                <p role="alert" className="text-sm font-medium text-ink">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-full bg-lime px-5 py-3 font-semibold text-ink transition hover:bg-lime-deep disabled:opacity-60"
              >
                {status === "submitting" ? "Joining…" : "Join the waitlist"}
              </button>
              <p className="text-[13px] text-muted">Beta access for founders and mentors.</p>
            </form>
          )}
        </div>
      </dialog>
    </WaitlistContext.Provider>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...rest
}: { label: string; name: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        name={name}
        type={type}
        {...rest}
        className="mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/70 outline-none transition focus:border-ink focus:ring-2 focus:ring-lime"
      />
    </label>
  );
}

const buttonStyles = {
  /** The main action. Use once per screen. */
  primary: "bg-lime text-ink hover:bg-lime-deep",
  secondary: "bg-ink text-white hover:bg-ink-soft",
  outline: "border-[1.5px] border-ink text-ink hover:bg-mist",
  inverse: "bg-white text-ink hover:bg-mist",
  "outline-light": "border-[1.5px] border-white/70 text-white hover:bg-white/10",
};

export function WaitlistButton({
  role,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  role: WaitlistRole;
  variant?: keyof typeof buttonStyles;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
}) {
  const ctx = useContext(WaitlistContext);
  const sizing = size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3.5 text-[15px]";
  return (
    <button
      type="button"
      onClick={() => ctx?.open(role)}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition ${sizing} ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
