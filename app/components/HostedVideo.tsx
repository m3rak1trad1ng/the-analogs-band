"use client";

import { useRef, useState } from "react";

/**
 * A video hosted on this site, with the whole thumbnail as the play button.
 *
 * ⭐ The band asked for it (2026-10-19): with only the browser's own controls,
 * the only way to start the video was a small play icon in the corner, and
 * people tapped the picture and nothing happened. Now the picture is the
 * button. Once it is playing, the browser's normal controls take over
 * (pause, scrub, volume, full screen).
 *
 * ⚠ preload="none": nobody downloads the file until they press play.
 */
export default function HostedVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.controls = true;
    void v.play().catch(() => {
      /* If the browser refuses to start it, leave the controls showing so the
         visitor can press play themselves. */
    });
  };

  return (
    <>
      <video ref={ref} src={src} poster={poster} preload="none" playsInline aria-label={label} controls={started} />
      {!started && (
        <button type="button" className="video-start" onClick={start} aria-label={`Play: ${label}`}>
          <span className="video-start-icon" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
