import { BAND, BAND_PHOTO } from "../content";

export default function Booking() {
  return (
    <section className="section booking" id="booking">
      <div className="wrap">
        <div className="section-head">
          <span className="label">Booking</span>
          <span className="hr" />
        </div>
        <h2 className="poster">Book the band</h2>

        {/* ⛔ Do not re-add a grid of venue-type cards here. The headline and
            this line already name the venues; the cards repeated them and then
            added false qualifiers about when each type books. */}
        <p className="lede">{BAND.venues}</p>
        <p className="lede lede-2">{BAND.radius}</p>

        <div className="book-cta">
          <div>
            <p className="label book-cta-kicker">Tell us the date and the room</p>
            {/* No form on purpose — a plain address is one tap on a phone and
                needs nothing running on a server. */}
            <a className="book-email" href={`mailto:${BAND.email}`}>{BAND.email}</a>
          </div>
          <div className="book-actions">
            <a className="btn" href={`mailto:${BAND.email}`}>Email us</a>
            {/* Venues build their own posters and social graphics for every act
                they book. Without this they'd be right-clicking a darkened,
                desaturated image off the page — so hand them the clean file.
                `download` works here because this is a real host, not a
                sandboxed preview. */}
            {BAND_PHOTO.src && (
              <a className="btn btn-ghost" href={BAND_PHOTO.src} download="the-analogs-press-photo.jpg">
                Download press photo
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
