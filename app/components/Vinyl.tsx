/**
 * An album sleeve with the record sliding out of it.
 *
 * ⭐ THE SLEEVE CARRIES THE NAME; THE DISC CARRIES NO WORDS AT ALL. A bare
 * spinning record was tried twice. Its label is two inches across on screen
 * and turning — owner: "record unreadable and still looks amateur." Nothing
 * printed on a moving two-inch circle can be read. So the name is where a
 * record actually shows it: on the cover, big and still, using the band's own
 * logo. The disc is just a disc, and most of it stays inside the sleeve.
 *
 * ⚠ The light on the disc stays put while the disc turns under it. That is the
 * one detail that makes it read as vinyl instead of a black circle.
 */
export default function Vinyl({ logo, name, city }: { logo: string; name: string; city: string }) {
  const rings: { r: number; o: number }[] = [];
  /* Track gaps: radii where the groove thins out between songs. */
  const gaps = [176, 151, 131, 108];
  for (let r = 193; r >= 90; r -= 1.55) {
    if (gaps.some((g) => Math.abs(r - g) < 2.4)) continue;
    /* Deterministic variation so no two neighbouring grooves match exactly. */
    const o = 0.09 + 0.13 * Math.abs(Math.sin(r * 3.7));
    rings.push({ r: Number(r.toFixed(2)), o: Number(o.toFixed(3)) });
  }

  return (
    <div className="album" aria-hidden="true">
      <div className="album-disc">
        <svg viewBox="0 0 400 400">
          <defs>
            <radialGradient id="v-disc" cx="50%" cy="50%" r="50%">
              <stop offset="0.42" stopColor="#090807" />
              <stop offset="0.86" stopColor="#15130f" />
              <stop offset="0.975" stopColor="#0a0908" />
              <stop offset="1" stopColor="#3a352d" />
            </radialGradient>
            <radialGradient id="v-label" cx="40%" cy="32%" r="80%">
              <stop offset="0" stopColor="#f6e6bb" />
              <stop offset="0.5" stopColor="#d2ac62" />
              <stop offset="1" stopColor="#8a6a36" />
            </radialGradient>
            <radialGradient id="v-hub" cx="35%" cy="30%" r="80%">
              <stop offset="0" stopColor="#fff" />
              <stop offset="0.5" stopColor="#b9b3a6" />
              <stop offset="1" stopColor="#4c483f" />
            </radialGradient>
          </defs>
          <g className="vinyl-spin">
            <circle cx="200" cy="200" r="198" fill="url(#v-disc)" />
            {rings.map((g) => (
              <circle key={g.r} cx="200" cy="200" r={g.r} fill="none" stroke="#fff" strokeOpacity={g.o} strokeWidth="0.55" />
            ))}
            <circle cx="200" cy="200" r="82" fill="none" stroke="#000" strokeOpacity="0.55" strokeWidth="13" />
            <circle cx="200" cy="200" r="74" fill="url(#v-label)" />
            <circle cx="200" cy="200" r="73" fill="none" stroke="#3a2a0e" strokeOpacity="0.55" strokeWidth="1" />
            <circle cx="200" cy="200" r="66" fill="none" stroke="#3a2a0e" strokeOpacity="0.35" strokeWidth="0.7" />
            <circle cx="200" cy="200" r="30" fill="none" stroke="#3a2a0e" strokeOpacity="0.35" strokeWidth="0.7" />
            {/* The logo's four-point star, twice — it is what shows the disc is turning. */}
            <path d="M200 142c1.300 10 4.600 13.300 14.700 14.700-10.100 1.400-13.400 4.700-14.700 14.700-1.300-10-4.600-13.300-14.700-14.700 10.100-1.400 13.400-4.700 14.700-14.700z" fill="#3a2a0e" />
            <path d="M200 228c1.300 10 4.600 13.300 14.700 14.700-10.100 1.400-13.400 4.700-14.700 14.700-1.300-10-4.600-13.300-14.700-14.700 10.100-1.400 13.400-4.700 14.700-14.700z" fill="#3a2a0e" opacity="0.7" />
            <circle cx="200" cy="200" r="10" fill="url(#v-hub)" />
            <circle cx="200" cy="200" r="5" fill="#050505" />
          </g>
          <circle cx="200" cy="200" r="198" fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="1" />
        </svg>
        <div className="vinyl-sheen" />
      </div>

      <div className="album-sleeve">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={1535} height={1024} loading="lazy" />
        <div className="album-foot">
          <span>{name}</span>
          <span>{city}</span>
        </div>
      </div>
    </div>
  );
}
