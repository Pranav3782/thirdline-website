import Image from "next/image";
import { Eyebrow, Section, Tag, type Tint } from "@/components/ui";

export type Founder = {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  image: string;
  objectPosition?: string;
  isRealPhoto?: boolean;
  tint: Tint;
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
};

export const founders: Founder[] = [
  {
    id: "manthan",
    name: "Manthan",
    role: "Founding Member",
    tagline: "Connecting founders to real experience",
    bio: "Driving growth and ecosystem strategy. Passionate about building mentor networks that help early-stage founders bypass months of guesswork.",
    image: "/images/founders/manthan.png",
    objectPosition: "center 30%",
    isRealPhoto: true,
    tint: "lavender",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://www.linkedin.com/in/manthan-gupta-53ba96182/",
    },
  },
  {
    id: "surya",
    name: "Surya",
    role: "Founding Designer",
    tagline: "Crafting intuitive visual systems & UX",
    bio: "Designing clean, human-centered web experiences and visual identity for Thirdline. Focused on making mentor discovery smooth and delightful.",
    image: "/images/founders/surya.png",
    objectPosition: "center 25%",
    isRealPhoto: true,
    tint: "lime",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://www.linkedin.com/in/suryapranav13/?isSelfProfile=true",
    },
  },
];

export function FoundersSection() {
  return (
    <Section id="founders" className="bg-white">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>The creators behind Thirdline</Eyebrow>
        <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl text-ink">
          Meet the Founders
        </h2>
        <p className="mt-4 text-lg text-muted">
          We&apos;re building Thirdline because we believe every founder stuck on a hard problem deserves direct 1:1 access to someone who has already solved it.
        </p>
      </div>

      <div className="mt-14 mx-auto max-w-4xl grid gap-8 sm:grid-cols-2">
        {founders.map((founder) => (
          <div
            key={founder.id}
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-mist p-4 ring-1 ring-line transition-all duration-300 hover:-translate-y-1.5 hover:ring-ink hover:shadow-xl"
          >
            {/* Founder Image Frame */}
            <div className="relative aspect-[4/4] w-full overflow-hidden rounded-2xl bg-white shadow-inner">
              <Image
                src={founder.image}
                alt={`${founder.name} - ${founder.role}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: founder.objectPosition || "center center" }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {!founder.isRealPhoto && (
                <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm">
                    Sample Photo
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4 pt-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-2xl font-bold text-ink">{founder.name}</h3>
                <Tag tint={founder.tint}>{founder.role}</Tag>
              </div>

              <p className="mt-1.5 font-display text-sm font-semibold text-ink/80">
                {founder.tagline}
              </p>

              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">
                {founder.bio}
              </p>

              {/* Contact / Social links */}
              <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4 text-xs font-semibold text-muted">
                <span className="text-[12px] text-muted/70">Founding Team</span>
                {founder.socials.linkedin ? (
                  <a
                    href={founder.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect with ${founder.name} on LinkedIn`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-ink-soft hover:shadow-md hover:scale-105 active:scale-95"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span>Connect &rarr;</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-ink hover:underline cursor-pointer">
                    Connect &rarr;
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
