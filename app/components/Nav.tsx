import Link from "next/link";
import { BAND, LINEUP, RANGE } from "../content";

/**
 * `home` is true on the front page, where the section links are plain anchors.
 * On any other page they have to go back to the front page first.
 * ⚠ <Link>, not <a>, for anything that changes page: Link adds the base path
 * the dashboard preview is served under, and a bare "/media/" would not.
 */
export default function Nav({ home = true }: { home?: boolean }) {
  const to = (hash: string) => (home ? hash : `/${hash}`);
  return (
    <nav className="nav">
      <div className="nav-inner">
        {/* ⭐ THE BAND'S ACTUAL LOGO, ALWAYS VISIBLE. It was hidden until the
            page scrolled, on the theory that two logos near each other is
            clutter — owner: "why'd you get rid of the band name at top left?
            fix that." The name belongs in the corner of every screen. */}
        <Link href={home ? "#top" : "/"} className="nav-mark" aria-label={`${BAND.name} — ${home ? "back to top" : "home"}`}>
          {BAND.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={BAND.logo} alt="" width={1535} height={1024} />
          ) : (
            BAND.name
          )}
        </Link>
        <div className="nav-links label">
          {LINEUP.length > 0 && <Link href={to("#band")}>The band</Link>}
          {RANGE.length > 0 && <Link href={to("#music")}>Music</Link>}
          <Link href={to("#shows")}>Shows</Link>
          <Link href="/media/" className="nav-keep" aria-current={home ? undefined : "page"}>Media</Link>
          <Link href={to("#booking")} className="btn btn-sm">Book us</Link>
        </div>
      </div>
    </nav>
  );
}
