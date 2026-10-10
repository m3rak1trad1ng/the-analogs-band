import { BAND, LINEUP, RANGE } from "../content";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        {/* ⭐ THE BAND'S ACTUAL LOGO, NOT A TYPEFACE STANDING IN FOR IT. Two
            attempts at setting "The Analogs" in a font here both looked wrong
            beside the hand-lettered original — any font would. It stays hidden
            while the big logo is on screen (two of them a few inches apart is
            clutter) and fades in once that one scrolls away. */}
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
