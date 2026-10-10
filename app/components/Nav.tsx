import { BAND, BAND_PHOTO, LINEUP, SETLIST } from "../content";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-mark">{BAND.name}</a>
        <div className="nav-links label">
          {(BAND_PHOTO.src || LINEUP.length > 0) && <a href="#band">The band</a>}
          {SETLIST.length > 0 && <a href="#songs">Songs</a>}
          <a href="#shows">Shows</a>
          <a href="#live">Live</a>
          <a href="#booking" className="btn btn-sm">Book us</a>
        </div>
      </div>
    </nav>
  );
}
