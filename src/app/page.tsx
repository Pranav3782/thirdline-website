import { BookingInfographic } from "@/components/booking-infographic";
import { ExamplesSection } from "@/components/examples-section";
import { FoundersSection } from "@/components/founders";
import { HeroArt } from "@/components/hero-art";
import { HeroInfographic } from "@/components/hero-infographic";
import { ProductVideo } from "@/components/product-video";
import {
  Arrow,
  Eyebrow,
  Highlight,
  Logo,
  LogoMark,
  Portrait,
  Section,
  Tag,
  people,
  type Tint,
} from "@/components/ui";
import { WaitlistButton, WaitlistProvider } from "@/components/waitlist";
import { video } from "@/lib/content";

const nav = [
  { href: "#problem", label: "Problem" },
  { href: "#video", label: "Watch" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#who", label: "Who it's for" },
  { href: "#examples", label: "Examples" },
  { href: "#founders", label: "Founders" },
];

export default function Home() {
  return (
    <WaitlistProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Thesis />
        <ProductProblem />
        <HowItWorks />
        <WhoItsFor />
        <ExamplesSection />
        <FoundersSection />
        <FinalCta />
      </main>
      <Footer />
    </WaitlistProvider>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" aria-label="Thirdline home">
          <Logo />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <WaitlistButton role="founder" variant="secondary" size="sm">
          Join the waitlist
        </WaitlistButton>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="overflow-x-clip px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <div className="flex animate-fade-up flex-wrap gap-2">
              <Tag tint="mist">Coming soon</Tag>
              <Tag tint="lime">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-ink animate-ring" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-ink" />
                </span>
                Waitlist open
              </Tag>
              <Tag tint="lavender">Beta</Tag>
            </div>
            <h1 className="mt-6 font-display text-[44px] font-extrabold leading-[1.04] sm:text-6xl lg:text-[68px]">
              <span className="block animate-fade-up [animation-delay:0.1s]">Stuck as a founder?</span>
              <span className="block animate-fade-up [animation-delay:0.25s]">
                <Highlight sweep className="whitespace-nowrap">
                  Book a mentor
                </Highlight>{" "}
                who has solved it.
              </span>
            </h1>
            <p className="mt-6 max-w-[34rem] animate-fade-up text-lg leading-relaxed text-muted [animation-delay:0.4s]">
              Pick a mentor who has done exactly what you&apos;re trying to do. Book a 1:1 call and get
              unstuck.
            </p>
            <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:0.55s] sm:flex-row">
              <WaitlistButton role="founder" className="group">
                Join the waitlist as a founder
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  <Arrow />
                </span>
              </WaitlistButton>
              <WaitlistButton role="mentor" variant="outline">
                Join as a mentor
              </WaitlistButton>
            </div>
            <p className="mt-5 animate-fade-up text-[13px] font-medium text-muted [animation-delay:0.7s]">
              Waitlist is open. Beta access for founders and mentors.
            </p>
          </div>
          <HeroArt />
        </div>

        <div className="mt-16 sm:mt-20">
          <HeroInfographic />
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const bottlenecks: { label: string; tint: Tint }[] = [
    { label: "Sales", tint: "peach" },
    { label: "Fundraising", tint: "lavender" },
    { label: "Hiring", tint: "butter" },
    { label: "Pricing", tint: "sky" },
  ];
  return (
    <Section id="problem">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <div>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
            You don&apos;t need more advice from everyone. You need one person who has done it.
          </h2>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
            Founders get stuck on one thing: sales, fundraising, hiring, pricing. Most advice is generic,
            and networking takes weeks.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-mist p-6">
            <p className="font-display text-lg font-bold">What founders get</p>
            <ul className="mt-5 space-y-3 text-[15px] text-muted">
              {["Generic advice from everyone", "Threads, articles, AI answers", "Weeks of cold networking"].map(
                (item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted/60" />
                    <span className="line-through decoration-muted/50">{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="rounded-2xl bg-ink p-6 text-white">
            <p className="font-display text-lg font-bold text-lime">What they need</p>
            <div className="mt-5 flex items-center gap-3">
              <Portrait {...people.anika} className="h-12 w-12" />
              <div>
                <p className="font-semibold">One person</p>
                <p className="text-sm text-white/70">who has solved it</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {bottlenecks.map((b) => (
                <Tag key={b.label} tint={b.tint}>
                  {b.label}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Thesis() {
  return (
    <section className="px-5 sm:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-ink px-6 py-16 text-white sm:px-14 sm:py-20">
        <svg
          viewBox="0 0 400 200"
          className="pointer-events-none absolute -bottom-6 -right-6 hidden w-[26rem] lg:block"
          aria-hidden
        >
          <path d="M40 190 C 110 30, 290 30, 360 190" fill="none" stroke="var(--color-lime)" strokeWidth="1.5" />
          <path d="M110 190 C 160 90, 240 90, 290 190" fill="none" stroke="var(--color-leaf)" strokeWidth="1.5" />
          <circle cx="40" cy="190" r="6" fill="var(--color-lime)" />
          <circle cx="360" cy="190" r="6" fill="var(--color-lime)" />
          <circle cx="200" cy="70" r="4" fill="var(--color-lime)" />
        </svg>
        <div className="relative flex items-center gap-3">
          <LogoMark variant="inverse" className="h-9 w-9" />
          <p className="text-[13px] font-medium text-lime">Our thesis</p>
        </div>
        <blockquote className="relative mt-6 max-w-4xl font-display text-3xl font-bold leading-[1.15] sm:text-5xl">
          People don&apos;t need more networking. They need the <span className="text-lime">right person</span>{" "}
          with the exact knowledge to solve the bottleneck.
        </blockquote>
      </div>
    </section>
  );
}

function ProductProblem() {
  return (
    <Section id="video">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
        <div>
          <Eyebrow>The product problem</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">See why founders stay stuck</h2>
        </div>
        <p className="max-w-[34rem] text-lg leading-relaxed text-muted">
          {video.title}. The bottleneck a founder faces, why generic advice and cold networking fail, and
          what changes with one mentor.
        </p>
      </div>
      <div className="mt-10">
        <ProductVideo />
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-mist">
      <div className="max-w-2xl">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
          Pick a mentor. Book a time. Get unstuck.
        </h2>
      </div>
      <div className="mt-12">
        <BookingInfographic />
      </div>
    </Section>
  );
}

function WhoItsFor() {
  return (
    <Section id="who">
      <div className="max-w-2xl">
        <Eyebrow>Who it&apos;s for</Eyebrow>
        <h2 className="mt-4 flex flex-wrap items-center gap-3 font-display text-4xl font-bold sm:text-5xl">
          Founders and mentors
          <Tag tint="lavender">Beta</Tag>
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="flex flex-col rounded-2xl bg-mist p-8 sm:p-10">
          <div className="flex -space-x-2">
            <Portrait {...people.founder} className="h-14 w-14" />
            <Portrait {...people.sara} className="h-14 w-14" />
          </div>
          <h3 className="mt-6 font-display text-3xl font-bold">If you are a founder</h3>
          <p className="mt-3 max-w-[30rem] flex-1 text-lg leading-relaxed text-muted">
            You&apos;re stuck on one thing and don&apos;t have time for generic advice. Book a 1:1 with a
            mentor who has solved it.
          </p>
          <div className="mt-8">
            <WaitlistButton role="founder" variant="secondary">
              Join as a founder <Arrow />
            </WaitlistButton>
          </div>
        </article>
        <article className="flex flex-col rounded-2xl bg-ink p-8 text-white sm:p-10">
          <div className="flex -space-x-2">
            <Portrait {...people.anika} className="h-14 w-14" />
            <Portrait {...people.rohan} className="h-14 w-14" />
          </div>
          <h3 className="mt-6 font-display text-3xl font-bold">If you are a mentor</h3>
          <p className="mt-3 max-w-[30rem] flex-1 text-lg leading-relaxed text-white/75">
            You&apos;ve already solved it. Share what you know, set your availability, and take 1:1 calls with
            founders who are stuck on the same thing.
          </p>
          <div className="mt-8">
            <WaitlistButton role="mentor" variant="inverse">
              Join as a mentor <Arrow />
            </WaitlistButton>
          </div>
        </article>
      </div>
    </Section>
  );
}



function FinalCta() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-ink px-6 py-16 text-white sm:px-14 sm:py-20">
        <svg viewBox="0 0 400 200" className="pointer-events-none absolute -right-10 -top-10 hidden w-[24rem] lg:block" aria-hidden>
          <path d="M20 180 C 100 10, 300 10, 380 180" fill="none" stroke="var(--color-leaf)" strokeWidth="1.5" />
          <circle cx="200" cy="52" r="5" fill="var(--color-lime)" />
          <circle cx="20" cy="180" r="5" fill="var(--color-leaf)" />
        </svg>
        <div className="relative max-w-3xl">
          <p className="text-[13px] font-medium text-lime">Coming soon. Waitlist open.</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            Your bottleneck has an answer. <span className="text-lime">Book the mentor who has it.</span>
          </h2>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <WaitlistButton role="founder">
              Join as a founder <Arrow />
            </WaitlistButton>
            <WaitlistButton role="mentor" variant="outline-light">
              Join as a mentor
            </WaitlistButton>
          </div>
          <p className="mt-5 text-[13px] font-medium text-white/70">Beta access for founders and mentors.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p className="font-display text-lg font-bold text-ink">It&apos;s a deal.</p>
        <p>© {new Date().getFullYear()} Thirdline</p>
      </div>
    </footer>
  );
}
