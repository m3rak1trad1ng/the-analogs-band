import { BAND_PHOTO, LINEUP } from "../content";

export default function Lineup() {
  /* Portrait cards only switch on once someone actually has a photo. Until
     then the grid stays a clean list — six empty placeholder boxes would look
     worse than no photos at all. */
  const hasPortraits = LINEUP.some((m) => m.photo);

  /* Nothing to show yet — a heading over an empty space reads as a broken
     page. The nav hides its link on the same condition. */
  if (LINEUP.length === 0) return null;

  return (
    <section className="section" id="band">
      <div className="wrap">
        <div className="section-head">
          <span className="label">Lineup</span>
          <span className="hr" />
        </div>
        <h2 className="poster">Meet the band</h2>

        {BAND_PHOTO.src ? (
          <figure className="band-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BAND_PHOTO.src} alt={BAND_PHOTO.alt} />
          </figure>
        ) : hasPortraits ? null : (
          /* The frame the group shot will sit in. Set BAND_PHOTO.src in
             content.ts and this is replaced. */
          <div className="band-photo">
            <div className="slot slot-band">
              <span className="label">Band photo coming soon</span>
            </div>
          </div>
        )}

        <ul className={hasPortraits ? "lineup lineup-cards" : "lineup"}>
          {LINEUP.map((m) => (
            <li key={m.part}>
              {hasPortraits && (
                <div className="lineup-shot">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name || m.part} loading="lazy" />
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </div>
              )}
              <div className="lineup-text">
                {m.name && <span className="lineup-name poster">{m.name}</span>}
                <span className="lineup-part">{m.part}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
