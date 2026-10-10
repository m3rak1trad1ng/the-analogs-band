import { BAND, SHOWS, PAST_VENUES } from "../content";

/* Google Calendar's template URL — no file to download and no library needed,
   which matters on a static host. ctz is explicit so the gig doesn't land in
   someone's calendar shifted by an hour. */
function calendarUrl(s: (typeof SHOWS)[number]) {
  const stamp = (iso: string) => iso.slice(0, 19).replace(/[-:]/g, "");
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `${BAND.name} at ${s.venue}`,
    dates: `${stamp(s.start)}/${stamp(s.end)}`,
    location: `${s.venue}, ${s.city}`,
    details: `${BAND.name} — ${BAND.kicker}. ${BAND.url}`,
    ctz: "America/Chicago",
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

const mapsUrl = (s: (typeof SHOWS)[number]) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.venue}, ${s.city}`)}`;

export default function Shows() {
  return (
    <section className="section" id="shows">
      <div className="wrap">
        <div className="section-head">
          <span className="label">Calendar</span>
          <span className="hr" />
        </div>
        <h2 className="poster">Upcoming shows</h2>

        <div style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
          {SHOWS.length === 0 ? (
            <div className="empty">
              <strong>No dates posted right now</strong>
              We&rsquo;re booking the next run. If you want us on your calendar, email us.
            </div>
          ) : (
            SHOWS.map((s, i) => (
              <div className="show-row" key={`${s.date}-${i}`}>
                <div className="show-date">{s.date}</div>
                <div>
                  <div className="show-venue">{s.venue}</div>
                  <div className="show-meta">{s.city} · {s.time}</div>
                </div>
                <div className="show-actions">
                  {/* One tap and the gig is in their phone. Worth more here
                      than on most sites — this audience is not going to
                      retype a date. */}
                  <a className="btn btn-sm btn-ghost" href={calendarUrl(s)} target="_blank" rel="noreferrer">
                    Add to calendar
                  </a>
                  <a className="btn btn-sm btn-ghost" href={mapsUrl(s)} target="_blank" rel="noreferrer">
                    Directions
                  </a>
                  {s.ticket && (
                    <a className="btn btn-sm" href={s.ticket} target="_blank" rel="noreferrer">Tickets</a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {PAST_VENUES.length > 0 && (
          <div className="past">
            <p className="label past-head">Where we&rsquo;ve played</p>
            <ul>
              {PAST_VENUES.map((v) => (
                <li key={v.name}>
                  <span className="past-name">{v.name}</span>
                  <span className="past-city">{v.city}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
