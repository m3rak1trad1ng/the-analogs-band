import { BAND, PHOTOS } from "../content";
import HeroArt from "./HeroArt";
import HeroFx from "./HeroFx";

export default function Hero() {
  /* First photo in content.ts becomes the hero background. Until there is one,
     the logo and the meter carry it. */
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

      <div className="wrap hero-inner">
        <div className="hero-rail label">
          <span>{BAND.kicker}</span>
          <span className="dot" aria-hidden="true" />
          <span>Available for booking</span>
        </div>

        {/* ⭐ THE BAND'S OWN LOGO IS THE HEADLINE. It is hand-lettered, and no
            typeface set beside it could match it — so the name is the logo and
            the page's type stays out of its way. The <h1> text is still there
            for search engines and screen readers. */}
        <h1 className="hero-title">
          {BAND.wordmark ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={BAND.wordmark} alt={BAND.name} width={1366} height={517} />
          ) : (
            <span className="poster">{BAND.name}</span>
          )}
        </h1>

        <HeroArt variant={BAND.heroArt} />

        {BAND.tagline && <p className="hero-tagline poster">{BAND.tagline}</p>}
        <p className="hero-hook">{BAND.hook}</p>

        <div className="hero-cta">
          <a href="#booking" className="btn" data-hot>Book the band</a>
          <a href="#shows" className="btn btn-ghost">Upcoming shows</a>
        </div>
      </div>
      <HeroFx />
    </header>
  );
}
