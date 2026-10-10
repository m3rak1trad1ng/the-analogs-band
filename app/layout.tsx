import type { Metadata } from "next";
import { Anton, Oswald, Inter } from "next/font/google";
import { BAND } from "./content";
import "./globals.css";

/* Three faces, three jobs: Anton is the poster woodtype, Oswald handles labels
   and buttons, Inter carries body copy. next/font self-hosts all three at build
   time, so the published site makes no request to Google. */
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--f-poster" });
const oswald = Oswald({ subsets: ["latin"], weight: ["500", "600"], variable: "--f-label" });
const inter = Inter({ subsets: ["latin"], variable: "--f-body" });

const title = `${BAND.name} — ${BAND.kicker}`;

export const metadata: Metadata = {
  metadataBase: new URL(BAND.url),
  title,
  description: BAND.hook,
  /* ⭐ THE SHARE CARD. This is what renders when anyone drops the link into
     Facebook, a text message, or a venue's page — it has nothing to do with
     owning a Facebook account. Without an image the link posts as a bare grey
     rectangle, which is the difference between a post that gets tapped and one
     that gets scrolled past. 1200x630 is the size both Facebook and iMessage
     expect; other ratios get cropped unpredictably. */
  openGraph: {
    type: "website",
    url: BAND.url,
    siteName: BAND.name,
    title,
    description: BAND.hook,
    /* Only once the file exists — a link to a missing image posts as a broken
       card, which is worse than the plain grey one. Set BAND.og in content.ts. */
    ...(BAND.og ? { images: [{ url: BAND.og, width: 1200, height: 630, alt: BAND.name }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: BAND.hook,
    ...(BAND.og ? { images: [BAND.og] } : {}),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${oswald.variable} ${inter.variable}`}>
      <body>
        <a className="skip" href="#booking">Skip to booking</a>
        {children}
      </body>
    </html>
  );
}
