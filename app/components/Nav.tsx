import { BAND, LINEUP, RANGE } from "../content";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        {/* ⭐ THE BAND'S ACTUAL LOGO, ALWAYS VISIBLE. It was hidden until the
            page scrolled, on the theory that two logos near each other is
            clutter — owner: "why'd you get rid of the band name at top left?
            fix that." The name belongs in the corner of every screen. It is the
            logo image because two attempts at a typeface here both looked
            wrong beside the hand-lettered original. */}
        <a href="#top" className="nav-mark" aria-label={`${BAND.name} — back to top`}>
          {BAND.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={BAND.logo} alt="" width={1535} height={1024} />
          ) : (
            BAND.name
          )}
        </a>
        <div className="nav-links label">
          {LINEUP.length > 0 && <a href="#band">The band</a>}
          {RANGE.length > 0 && <a href="#music">Music</a>}
          <a href="#shows">Shows</a>
          <a href="#live">Live</a>
          <a href="#booking" className="btn btn-sm">Book us</a>
        </div>
      </div>
    </nav>
  );
}
