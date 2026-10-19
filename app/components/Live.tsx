import { VIDEOS, PHOTOS, VIDEO_SLOTS, PHOTO_SLOTS } from "../content";
import Gallery from "./Gallery";

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
              <div key={v.id ?? v.src}>
                <div className="video-frame" style={v.aspect ? { aspectRatio: String(v.aspect) } : undefined}>
                  {v.src ? (
                    /* Hosted here. ⚠ preload="none" with a poster: nobody
                       downloads 50 MB until they press play. playsInline keeps
                       it in the page on an iPhone instead of going full screen. */
                    <video
                      src={v.src}
                      poster={v.poster}
                      controls
                      preload="none"
                      playsInline
                      aria-label={v.title || "The band live"}
                    />
                  ) : (
                    /* Embedded, not hosted — YouTube serves the file, this page
                       just shows a window into it. */
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                      title={v.title}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  )}
                </div>
                {v.title && <p className="video-title">{v.title}</p>}
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

        {gallery.length + emptyPhotos > 0 && <Gallery photos={gallery} empty={emptyPhotos} />}
      </div>
    </section>
  );
}
