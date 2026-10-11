import type { Metadata } from "next";
import Link from "next/link";
import Nav from "../components/Nav";
import Live from "../components/Live";
import Footer from "../components/Footer";
import { BAND } from "../content";

/**
 * Video and photos, on their own page.
 *
 * The band asked for this (2026-10-10): the front page is the pitch, and a
 * growing wall of clips and pictures in the middle of it pushes the booking
 * form further and further down. Everything here is still driven by VIDEOS
 * and PHOTOS in content.ts.
 */
export const metadata: Metadata = {
  title: `Media — ${BAND.name}`,
  description: `Video and photos of ${BAND.name}, ${BAND.city}.`,
};

export default function MediaPage() {
  return (
    <>
      <Nav home={false} />
      <main className="media-page">
        <Live />
        <div className="wrap media-foot">
          <Link href="/#booking" className="btn">Book the band</Link>
          <Link href="/" className="btn btn-ghost">Back to the front page</Link>
        </div>
      </main>
      <Footer home={false} />
    </>
  );
}
