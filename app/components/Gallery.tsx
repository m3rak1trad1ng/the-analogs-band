"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * The photo grid, and a full-screen view when one is clicked. The idea is the
 * lightbox from the Operational Systems site templates, cut down to what a
 * band page needs: open, next, previous, close.
 *
 * ⚠ A visible Close button and arrows, not only the keyboard — most of this
 *   traffic is on a phone, where there is no Escape key.
 */
export default function Gallery({ photos, empty }: { photos: { src: string; alt: string }[]; empty: number }) {
  const [at, setAt] = useState<number | null>(null);
  const step = useCallback(
    (d: number) => setAt((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (at === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAt(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const was = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = was;
    };
  }, [at, step]);

  return (
    <>
      <div className="photo-grid" style={{ marginTop: "1.5rem" }}>
        {photos.map((p, i) => (
          <button type="button" className="photo-btn" key={p.src} onClick={() => setAt(i)} aria-label={`Open photo: ${p.alt}`}>
            {/* Plain <img>: next/image's optimizer can't run on a static export. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} loading="lazy" />
          </button>
        ))}
        {Array.from({ length: empty }, (_, i) => (
          <div className="slot slot-photo" key={`slot-${i}`}>
            <span className="label">Photo coming soon</span>
          </div>
        ))}
      </div>

      {at !== null && photos[at] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={photos[at].alt} onClick={() => setAt(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[at].src} alt={photos[at].alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lightbox-close btn btn-sm" onClick={() => setAt(null)}>Close ✕</button>
          {photos.length > 1 && (
            <>
              <button type="button" className="lightbox-nav lightbox-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
              <button type="button" className="lightbox-nav lightbox-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
            </>
          )}
        </div>
      )}
    </>
  );
}
