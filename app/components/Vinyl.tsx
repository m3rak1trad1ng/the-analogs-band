/**
 * A record, drawn properly.
 *
 * ⭐ THE LIGHT STAYS STILL AND THE DISC TURNS. That one thing is the difference
 * between a record and a spinning black circle: on a real turntable the two
 * bright wedges of reflected light hold their place while the grooves slide
 * under them. So the grooves and label rotate, and the sheen is a separate
 * layer that does not.
 *
 * The rest is the detail a pressing actually has: bands of grooves separated
 * by the darker gaps between tracks, a smooth run-out near the label, a bevel
 * at the rim, and a printed label with text set around its edge.
 */
export default function Vinyl({ name, city }: { name: string; city: string }) {
  const rings: { r: number; o: number }[] = [];
  /* Track gaps: radii where the groove thins out between songs. */
  const gaps = [176, 151, 131, 108];
  for (let r = 193; r >= 92; r -= 1.55) {
    const nearGap = gaps.some((g) => Math.abs(r - g) < 2.4);
    if (nearGap) continue;
    /* Deterministic variation so no two neighbouring grooves match exactly. */
    const o = 0.1 + 0.12 * Math.abs(Math.sin(r * 3.7));
    rings.push({ r: Number(r.toFixed(2)), o: Number(o.toFixed(3)) });
  }
  const text = `${name}  ✦  ${city}  ✦  33⅓ RPM  ✦  STEREO  ✦  `.toUpperCase();

  return (
    <div className="vinyl" aria-hidden="true">
      <svg viewBox="0 0 400 400">
        <defs>
          <radialGradient id="v-disc" cx="50%" cy="50%" r="50%">
            <stop offset="0.44" stopColor="#0a0908" />
            <stop offset="0.86" stopColor="#141210" />
            <stop offset="0.97" stopColor="#0b0a09" />
            <stop offset="1" stopColor="#2a2622" />
          </radialGradient>
          <radialGradient id="v-label" cx="42%" cy="36%" r="75%">
            <stop offset="0" stopColor="#c0553a" />
            <stop offset="0.55" stopColor="#96361f" />
            <stop offset="1" stopColor="#5e1c10" />
          </radialGradient>
          <radialGradient id="v-hub" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#f3dfae" />
            <stop offset="0.5" stopColor="#a8873f" />
            <stop offset="1" stopColor="#4a3614" />
          </radialGradient>
          <path id="v-arc" d="M200 200 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0" />
        </defs>

        <g className="vinyl-spin">
          <circle cx="200" cy="200" r="198" fill="url(#v-disc)" />
          {rings.map((g) => (
            <circle key={g.r} cx="200" cy="200" r={g.r} fill="none" stroke="#fff" strokeOpacity={g.o} strokeWidth="0.55" />
          ))}
          {/* run-out: the smooth band between the last groove and the label */}
          <circle cx="200" cy="200" r="84" fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="13" />
          <circle cx="200" cy="200" r="88.500" fill="none" stroke="#fff" strokeOpacity="0.1" strokeWidth="0.6" />

          <circle cx="200" cy="200" r="76" fill="url(#v-label)" />
          <circle cx="200" cy="200" r="75" fill="none" stroke="#e6cb8e" strokeOpacity="0.85" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="70.500" fill="none" stroke="#e6cb8e" strokeOpacity="0.45" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="46" fill="none" stroke="#e6cb8e" strokeOpacity="0.45" strokeWidth="0.6" />
          <text className="vinyl-ring"><textPath href="#v-arc" startOffset="0">{text}</textPath></text>
          <text x="200" y="174" className="vinyl-the">THE</text>
          <text x="200" y="232" className="vinyl-side">SIDE A</text>
          <path d="M200 236c.5 4 1.800 5.400 6 6-4.200.6-5.500 2-6 6-.5-4-1.800-5.400-6-6 4.200-.6 5.500-2 6-6z" fill="#e6cb8e" />

          <circle cx="200" cy="200" r="11" fill="url(#v-hub)" />
          <circle cx="200" cy="200" r="5.500" fill="#050505" />
        </g>
        <circle cx="200" cy="200" r="198" fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="1" />
      </svg>
      <div className="vinyl-sheen" />
    </div>
  );
}
