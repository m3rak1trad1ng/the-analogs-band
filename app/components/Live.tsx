import { VIDEOS, PHOTOS } from "../content";

export default function Live() {
  /* PHOTOS[0] is spent on the hero, so the grid starts at 1 — otherwise the
     same shot appears twice within one scroll. */
  const gallery = PHOTOS.slice(1);
  if (VIDEOS.length === 0 && gallery.length === 0) {
    return (
      <section className="section" id="live">
        <div className="wrap">
          <div className="section-head">
            <span className="label">Live</span>
            <span className="hr" />
          </div>
          <h2 className="poster">See us play</h2>
          <div style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <div className="empty">
              <strong>Photos and video coming soon</strong>
              We&rsquo;re putting footage together now. Check back, or email us and
              we&rsquo;ll let you know when it&rsquo;s up.
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="live">
      <div className="wrap">
        <div className="section-head">
          <span className="label">Live</span>
          <span className="hr" />
        </div>
        <h2 className="poster">See us play</h2>

        {VIDEOS.length > 0 && (
          <div className="video-grid" style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            {VIDEOS.map((v) => (
              <div key={v.id}>
                <div className="video-frame">
                  {/* Embedded, not hosted — YouTube serves the file, this page
                      just shows a window into it. No size cap, no bandwidth
                      cost, works on a static host. */}
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <p className="video-title">{v.title}</p>
              </div>
            ))}
          </div>
        )}

        {gallery.length > 0 && (
          <div className="photo-grid" style={{ marginTop: "2rem" }}>
            {gallery.map((p) => (
              /* Plain <img>: next/image's optimizer can't run on a static
                 export, so the wrapper buys nothing. */
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
