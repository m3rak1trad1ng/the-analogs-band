import { VIDEOS, PHOTOS, VIDEO_SLOTS, PHOTO_SLOTS } from "../content";

/**
 * Video and photos — with the frames already in place before there is anything
 * to put in them.
 *
 * ⭐ ADDING ONE IS A LINE IN content.ts AND NOTHING ELSE. A video or photo takes
 * the next empty frame; the layout does not change, so there is no "now build
 * the gallery" step on the day the first clip exists.
 */
export default function Live() {
  /* PHOTOS[0] is spent on the hero, so the grid starts at 1 — otherwise the
     same shot appears twice within one scroll. */
  const gallery = PHOTOS.slice(1);
  const emptyVideos = Math.max(0, VIDEO_SLOTS - VIDEOS.length);
  const emptyPhotos = Math.max(0, PHOTO_SLOTS - gallery.length);

  if (VIDEOS.length + gallery.length + emptyVideos + emptyPhotos === 0) return null;

  return (
    <section className="section" id="live">
      <div className="wrap">
        <div className="section-head">
          <span className="label">Live</span>
          <span className="hr" />
        </div>
        <h2 className="poster">See us play</h2>

        {VIDEOS.length + emptyVideos > 0 && (
          <div className="video-grid" style={{ marginTop: "clamp(2rem, 4vw, 3rem)" }}>
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
            {Array.from({ length: emptyVideos }, (_, i) => (
              <div key={`slot-${i}`}>
                <div className="video-frame">
                  <div className="slot slot-video">
                    <span className="slot-play" aria-hidden="true" />
                    <span className="label">Video coming soon</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {gallery.length + emptyPhotos > 0 && (
          <div className="photo-grid" style={{ marginTop: "1.5rem" }}>
            {gallery.map((p) => (
              /* Plain <img>: next/image's optimizer can't run on a static
                 export, so the wrapper buys nothing. */
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />
            ))}
            {Array.from({ length: emptyPhotos }, (_, i) => (
              <div className="slot slot-photo" key={`slot-${i}`}>
                <span className="label">Photo coming soon</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
