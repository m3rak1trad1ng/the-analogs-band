import { BAND, PHOTOS } from "../content";
import HeroArt from "./HeroArt";

export default function Hero() {
  /* Two words stacked at woodtype scale is the entire visual identity.
     The second word carries the amber. */
  const [line1, ...rest] = BAND.name.split(" ");
  const line2 = rest.join(" ");

  /* First photo in content.ts becomes the hero. Until there is one, stage
     lights and halftone carry it — the page should never look broken for
     want of an image. */
  const cover = PHOTOS[0];

  return (
    <header className="hero" id="top">
      {cover ? (
        <div className="hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover.src} alt={cover.alt} />
        </div>
      ) : (
        <div className="hero-lights" aria-hidden="true" />
      )}
      <HeroArt variant={BAND.heroArt} />

      <div className="wrap hero-inner">
        <div className="hero-rail label">
          <span className="dot" aria-hidden="true" />
          <span>{BAND.kicker}</span>
          <span>Available for booking</span>
        </div>

        <h1 className="poster">
          {line1}
          <span className="l2">{line2}</span>
        </h1>

        <p className="hero-hook">{BAND.hook}</p>

        <div className="hero-cta">
          <a href="#booking" className="btn">Book the band</a>
          <a href="#shows" className="btn btn-ghost">Upcoming shows</a>
        </div>
      </div>
    </header>
  );
}
