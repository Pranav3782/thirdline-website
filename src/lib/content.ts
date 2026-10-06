export type WaitlistRole = "founder" | "mentor";

export const examples = [
  { problem: "Crack sales", mentor: "Book a mentor who landed their first 50 customers." },
  { problem: "Raise your first round", mentor: "Book a mentor who has closed a seed round." },
  { problem: "Find investors who fit your stage", mentor: "Book a mentor who backs early teams." },
  { problem: "Grow when growth has stalled", mentor: "Book a mentor who has fixed it before." },
  { problem: "Make your first great hire", mentor: "Book a mentor who built a team from zero." },
  { problem: "Price your product", mentor: "Book a mentor who tested pricing and got it right." },
  { problem: "Fix your pitch deck", mentor: "Book a mentor who has pitched and won." },
  { problem: "Sell to big companies", mentor: "Book a mentor who has closed an enterprise deal." },
  { problem: "Find product-market fit", mentor: "Book a mentor who found it after months of nobody caring." },
  { problem: "Launch in a new country", mentor: "Book a mentor who has expanded abroad." },
  { problem: "Get your first 1,000 users", mentor: "Book a mentor who did it with no budget." },
  { problem: "Manage a team for the first time", mentor: "Book a mentor who learned it the hard way." },
  { problem: "Split equity with a co-founder", mentor: "Book a mentor who has done it fairly." },
  { problem: "Handle burnout and loneliness", mentor: "Book a mentor who has been through it." },
  { problem: "Know when to pivot", mentor: "Book a mentor who changed direction and made it work." },
] as const;

export type SceneVisual =
  | "street"
  | "clinics"
  | "waiting"
  | "pattern"
  | "idea"
  | "building"
  | "zero"
  | "call"
  | "realisation"
  | "lesson"
  | "product"
  | "cta";

export type Scene = {
  number: number;
  title: string;
  visual: SceneVisual;
  screen: string;
  onScreen: string[];
  /** Voiceover line index at which each onScreen item appears. Defaults to its own index. */
  revealAt?: number[];
  voiceover: string[];
};

export const video = {
  title: "Rahul's story: why founders stay stuck",
  // Set to null to fall back to the animated storyboard player.
  src: "/video/rahul-story.mp4" as string | null,
  poster: "/video/rahul-story-poster.jpg" as string | null,
  // The final video has captions burned in, so it gets no separate track.
  captions: null as string | null,
};

export const scenes: Scene[] = [
  {
    number: 1,
    title: "Meet Rahul",
    visual: "street",
    screen: "Rahul, a young man in a tier 2 city, walking down a street.",
    onScreen: ["Meet Rahul"],
    voiceover: [
      "This is Rahul.",
      "He lives in a tier 2 city, and a few months ago, he had kidney stones.",
    ],
  },
  {
    number: 2,
    title: "The clinics",
    visual: "clinics",
    screen:
      "Quick cuts: a doctor's consultation, a follow-up visit, a lab. Rahul checking appointment times on his phone.",
    onScreen: [],
    voiceover: [
      "So he ended up spending quite a bit of time in clinics.",
      "Different doctors, a few follow-ups, even a lab visit.",
      "And after a while, he started noticing something.",
    ],
  },
  {
    number: 2,
    title: "The clinics",
    visual: "waiting",
    screen:
      "Rahul arriving on time, then sitting in a waiting room. A wall clock ticking forward.",
    onScreen: ["50 minutes."],
    revealAt: [1],
    voiceover: [
      "No matter which clinic he went to, he’d show up for his appointment",
      "and still end up sitting there for almost 50 minutes before he was actually seen.",
    ],
  },
  {
    number: 3,
    title: "The pattern",
    visual: "pattern",
    screen: "Three short shots of different clinics.",
    onScreen: ["1st time: fine.", "2nd time: annoying.", "3rd or 4th time: why?"],
    voiceover: [
      "The first time, he didn’t think much of it.",
      "The second time, it was annoying.",
      "By the third or fourth time, he started wondering,",
      "“Why do I even have an appointment if I’m still going to wait this long?”",
    ],
  },
  {
    number: 4,
    title: "The idea",
    visual: "idea",
    screen: "Rahul sketching on paper. A phone mockup.",
    onScreen: ["Book a time. Show up. See the doctor."],
    voiceover: [
      "And that’s where the idea started.",
      "What if you could just book a time, show up, and actually see the doctor at that time?",
      "Simple, right?",
    ],
  },
  {
    number: 5,
    title: "Building it",
    visual: "building",
    screen: "Rahul at a laptop late at night. A calendar on the wall flips through weeks.",
    onScreen: ["2 months."],
    revealAt: [1],
    voiceover: [
      "So Rahul started building it.",
      "He spent almost two months working on the product, and then he started speaking to clinics.",
    ],
  },
  {
    number: 6,
    title: "The zero",
    visual: "zero",
    screen:
      "Rahul pitching to a clinic owner. The owner shakes their head politely. Pause on a blank screen. Rahul alone, looking confused.",
    onScreen: ["Rs. 0"],
    revealAt: [2],
    voiceover: [
      "Can you guess how much clinics paid for the solution?",
      "…",
      "Zero.",
      "But Howz that even possible? How can you not get customers for the problem which is so obvious",
      "That confused him.",
      "Because the problem felt so obvious. He had experienced it himself.",
    ],
  },
  {
    number: 7,
    title: "The conversation",
    visual: "call",
    screen:
      "Rahul on a video call with someone who has worked with clinics. Two-person split screen. Subtitles on.",
    onScreen: [],
    voiceover: [
      "So after a while, he spoke to someone who had actually worked with clinics.",
      "And they asked him,",
      "“Okay. Who are you building this for?”",
      "“The patients.”",
      "“And who’s paying you?”",
      "“The clinic.”",
      "And they said,",
      "“That’s the issue.”",
      "“You’re solving a real problem, but you’re offering the solution to the wrong customer.”",
      "And then they asked him one more thing:",
      "“Do clinics actually care that patients are waiting 50 minutes?”",
    ],
  },
  {
    number: 8,
    title: "The realisation",
    visual: "realisation",
    screen: "Close up on Rahul's face as it lands. Two words on screen, one after the other.",
    onScreen: ["Patients: the problem.", "Clinics: the customer."],
    revealAt: [1, 2],
    voiceover: [
      "And that was the moment Rahul realised what he’d missed.",
      "The patients had the problem.",
      "But the clinics were the customers.",
      "He’d spent two months building a solution for a problem his customer didn’t care enough about.",
    ],
  },
  {
    number: 9,
    title: "The lesson",
    visual: "lesson",
    screen: "Slow shot of Rahul at his desk with his laptop closed. Soft music.",
    onScreen: [
      "Too close to the problem.",
      "Not another article.",
      "Not another AI answer.",
      "Someone who’s been there.",
    ],
    revealAt: [1, 2, 3, 4],
    voiceover: [
      "And that’s the thing about building something.",
      "Sometimes you’re too close to the problem to see what’s actually wrong.",
      "You don’t need another article.",
      "You don’t need another AI answer.",
      "Sometimes you need to talk to someone who’s already been there.",
    ],
  },
  {
    number: 10,
    title: "Thirdline",
    visual: "product",
    screen:
      "Thirdline logo appears. Homepage, then three quick app screens: bring your problem, find a mentor who's dealt with it, book a 1:1 call and talk.",
    onScreen: ["Bring your problem", "Find a mentor who's dealt with it", "Book a 1:1 call and talk"],
    revealAt: [1, 2, 3],
    voiceover: [
      "That’s what we’re building with Thirdline.",
      "You bring the problem you’re stuck on.",
      "You find someone who’s actually dealt with it.",
      "You book a conversation.",
      "And you talk.",
    ],
  },
  {
    number: 11,
    title: "Call to action",
    visual: "cta",
    screen:
      "Rahul, relaxed, on a call. Two people connected by a curved line. End card: Thirdline logo, Coming soon, Waitlist open, Join the waitlist.",
    onScreen: [],
    voiceover: [
      "Because somewhere, someone has already solved what you’re stuck on.",
      "You just haven’t talked to them yet.",
      "Thirdline.",
      "Coming soon.",
      "Join the waitlist.",
    ],
  },
];
