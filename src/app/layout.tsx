import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Thirdline (It's a deal): Book a mentor who has solved it",
  description:
    "Stuck as a founder? Pick a mentor who has done exactly what you're trying to do. Book a 1:1 call and get unstuck. Waitlist open for founders and mentors.",
  openGraph: {
    title: "Thirdline (It's a deal)",
    description:
      "Pick a mentor who has done exactly what you're trying to do. Book a 1:1 call and get unstuck.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
