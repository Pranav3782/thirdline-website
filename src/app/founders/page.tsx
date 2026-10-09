import { FoundersSection } from "@/components/founders";
import { Logo } from "@/components/ui";
import { WaitlistButton, WaitlistProvider } from "@/components/waitlist";
import Link from "next/link";

export default function FoundersPage() {
  return (
    <WaitlistProvider>
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="Thirdline home">
            <Logo />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
            <Link href="/#problem" className="transition hover:text-ink">Problem</Link>
            <Link href="/#video" className="transition hover:text-ink">Watch</Link>
            <Link href="/#how-it-works" className="transition hover:text-ink">How it works</Link>
            <Link href="/#who" className="transition hover:text-ink">Who it&apos;s for</Link>
            <Link href="/#examples" className="transition hover:text-ink">Examples</Link>
            <Link href="/founders" className="font-bold text-ink underline decoration-lime decoration-2 underline-offset-4">Founders</Link>
          </nav>
          <WaitlistButton role="founder" variant="secondary" size="sm">
            Join the waitlist
          </WaitlistButton>
        </div>
      </header>

      <main className="flex-1 py-12">
        <FoundersSection />
      </main>

      <footer className="border-t border-line px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p className="font-display text-lg font-bold text-ink">It&apos;s a deal.</p>
          <p>© {new Date().getFullYear()} Thirdline</p>
        </div>
      </footer>
    </WaitlistProvider>
  );
}
