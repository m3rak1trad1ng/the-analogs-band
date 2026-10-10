import { BAND, BAND_PHOTO } from "../content";
import BookingForm from "./BookingForm";

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
          <div className="book-form-col">
            <p className="label book-cta-kicker">Tell us the date and the room</p>
            {/* ⚠ A FORM HERE, WHERE CARPER DIEM HAS A PLAIN ADDRESS. This band
                has no email address of its own, so the form is the contact:
                it forwards to one person's inbox without printing that
                person's address on a public page. */}
            <BookingForm formKey={BAND.formKey} band={BAND.name} />
          </div>
          <div className="book-actions">
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
