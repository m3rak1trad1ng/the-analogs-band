/**
 * The picture in the hero before there is a photo — and behind the photo after.
 * Drawn in SVG and CSS, so it costs no image file and stays sharp at any size.
 * Which one shows is `BAND.heroArt` in content.ts: "meter", "record" or "wave".
 */
export default function HeroArt({ variant }: { variant: string }) {
  if (variant === "meter") return <Meter />;
  if (variant === "record") return <Record />;
  if (variant === "wave") return <Wave />;
  return null;
}

/* A VU meter, drawn the way the real thing is built: a metal case, a recessed
   lip with four screws, a backlit cream dial with two scales, a needle that
   casts a shadow, and a pane of glass over all of it. The depth is the point —
   a flat dial reads as clip art. */
function Meter() {
  const cx = 280, cy = 400, r = 256;
  const pt = (deg: number, rad: number) => {
    const a = (deg * Math.PI) / 180;
    return [cx + rad * Math.sin(a), cy - rad * Math.cos(a)];
  };
  const f = (n: number) => n.toFixed(1);
  const arc = (from: number, to: number, rad: number) => {
    const [x1, y1] = pt(from, rad), [x2, y2] = pt(to, rad);
    return `M${f(x1)} ${f(y1)} A${rad} ${rad} 0 0 1 ${f(x2)} ${f(y2)}`;
  };
  /* The VU law is not linear: the scale crowds up toward zero. */
  const major: [number, string][] = [
    [-45, "20"], [-30, "10"], [-20, "7"], [-11, "5"], [-1, "3"], [5, "2"], [12, "1"], [20, "0"], [28, "1"], [36, "2"], [45, "3"],
  ];
  const minor = [-37.5, -25, -15.5, -6, 2, 8.5, 16, 24, 32, 40.5];
  const pct = [0, 20, 40, 60, 80, 100];
  const tick = (d: number, a: number, b: number, cls: string) => {
    const [x1, y1] = pt(d, a), [x2, y2] = pt(d, b);
    return <line key={`${cls}${d}`} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} className={cls} />;
  };
  const screws: [number, number, number][] = [[27, 27, 20], [533, 27, -35], [27, 353, 70], [533, 353, 5]];

  return (
    <div className="hero-art hero-art-meter" aria-hidden="true">
      <Signal flip />
      <svg className="meter" viewBox="0 0 560 380">
        <defs>
          <linearGradient id="m-case" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9a868" />
            <stop offset="0.07" stopColor="#8a6a36" />
            <stop offset="0.5" stopColor="#5a431f" />
            <stop offset="0.93" stopColor="#33250f" />
            <stop offset="1" stopColor="#6e5527" />
          </linearGradient>
          <linearGradient id="m-lip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#060504" />
            <stop offset="1" stopColor="#15120e" />
          </linearGradient>
          <radialGradient id="m-face" cx="50%" cy="108%" r="105%">
            <stop offset="0" stopColor="#fbf1d6" />
            <stop offset="0.4" stopColor="#efdcae" />
            <stop offset="0.75" stopColor="#d6b676" />
            <stop offset="1" stopColor="#8f6a2e" />
          </radialGradient>
          <radialGradient id="m-vig" cx="50%" cy="60%" r="75%">
            <stop offset="0.55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#1a0f00" stopOpacity="0.42" />
          </radialGradient>
          <linearGradient id="m-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.26" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.04" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="m-plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b2620" />
            <stop offset="1" stopColor="#0f0d0a" />
          </linearGradient>
          <radialGradient id="m-hub" cx="38%" cy="30%" r="80%">
            <stop offset="0" stopColor="#d9bd82" />
            <stop offset="0.45" stopColor="#7a5c2a" />
            <stop offset="1" stopColor="#2a1d0a" />
          </radialGradient>
          {/* ⚠ userSpaceOnUse: a perfectly vertical line has a zero-width bounding
              box, and a filter sized as a percentage of nothing erases it. */}
          <filter id="m-shadow" filterUnits="userSpaceOnUse" x="-200" y="-200" width="960" height="900">
            <feDropShadow dx="5" dy="4" stdDeviation="2.2" floodColor="#3a2600" floodOpacity="0.45" />
          </filter>
          <clipPath id="m-clip"><rect x="46" y="46" width="468" height="288" rx="6" /></clipPath>
        </defs>

        <rect x="2" y="2" width="556" height="376" rx="24" fill="url(#m-case)" stroke="#080706" strokeWidth="2" />
        <rect x="3.5" y="3.5" width="553" height="373" rx="23" fill="none" stroke="#fff3d0" strokeOpacity="0.22" />
        <rect x="12" y="12" width="536" height="356" rx="17" fill="none" stroke="#1a1206" strokeOpacity="0.55" strokeWidth="1.5" />
        <rect x="13.5" y="13.5" width="533" height="353" rx="16" fill="none" stroke="#f3dca8" strokeOpacity="0.16" />
        <rect x="40" y="40" width="480" height="300" rx="10" fill="url(#m-lip)" />

        <g clipPath="url(#m-clip)">
          <rect x="46" y="46" width="468" height="288" fill="url(#m-face)" />

          <path d={arc(-45, 20, r)} className="m-arc" />
          <path d={arc(20, 45, r)} className="m-arc m-red" />
          <path d={arc(20, 45, r - 9)} className="m-band" />
          {minor.map((d) => tick(d, r, r + 9, d > 20 ? "m-tick m-min m-red" : "m-tick m-min"))}
          {major.map(([d, t]) => {
            const [tx, ty] = pt(d, r + 33);
            return (
              <g key={d}>
                {tick(d, r, r + 17, d > 20 ? "m-tick m-red" : "m-tick")}
                <text x={f(tx)} y={f(ty)} className={d > 20 ? "m-num m-redfill" : "m-num"}>{t}</text>
              </g>
            );
          })}
          <text x={f(pt(-52, r + 14)[0])} y={f(pt(-52, r + 14)[1])} className="m-sign">−</text>
          <text x={f(pt(52, r + 14)[0])} y={f(pt(52, r + 14)[1])} className="m-sign m-redfill">+</text>

          <path d={arc(-45, 20, r - 30)} className="m-arc m-thin" />
          {pct.map((v) => {
            const d = -45 + (65 * v) / 100;
            const [tx, ty] = pt(d, r - 47);
            return (
              <g key={v}>
                {tick(d, r - 30, r - 37, "m-tick m-thin")}
                <text x={f(tx)} y={f(ty)} className="m-pct">{v}</text>
              </g>
            );
          })}

          <text x="280" y="246" className="m-vu">VU</text>
          <text x="280" y="270" className="m-brand">THE ANALOGS · MADISON, WIS.</text>

          <g className="m-needle" filter="url(#m-shadow)">
            <line x1={cx} y1={cy} x2={cx} y2={cy - r - 20} />
          </g>

          <rect x="46" y="46" width="468" height="288" fill="url(#m-vig)" />
          <rect x="46" y="296" width="468" height="38" fill="url(#m-plate)" />
          <line x1="46" y1="296.5" x2="514" y2="296.5" stroke="#fff" strokeOpacity="0.14" />
          <circle cx="280" cy="318" r="27" fill="url(#m-hub)" stroke="#060504" strokeWidth="1.5" />
          <circle cx="280" cy="318" r="5" fill="#0a0806" stroke="#5d564a" strokeWidth="1" />
          {/* The peak lamp: dark until the meter is driven into the red. */}
          <text x="452" y="319" className="m-peak">PEAK</text>
          <circle cx="484" cy="315" r="7.5" fill="#0a0806" stroke="#5d564a" strokeWidth="1" />
          <circle cx="484" cy="315" r="5" className="m-lamp" />
          <path d="M46 46H350L196 334H46Z" fill="url(#m-glass)" />
          <rect x="46.5" y="46.5" width="467" height="287" rx="6" fill="none" stroke="#000" strokeOpacity="0.55" strokeWidth="3" />
        </g>

        {screws.map(([x, y, a]) => (
          <g key={`${x}${y}`} transform={`rotate(${a} ${x} ${y})`}>
            <circle cx={x} cy={y} r="7" fill="url(#m-hub)" stroke="#060504" />
            <line x1={x - 4.5} y1={y} x2={x + 4.5} y2={y} stroke="#060504" strokeWidth="1.6" />
          </g>
        ))}
      </svg>
      <Signal />
    </div>
  );
}

/* The signal leaving the meter: a waveform that is loud at the meter and dies
   away toward the edge of the page, the way the band's own artwork draws it. */
function Signal({ flip = false }: { flip?: boolean }) {
  const n = 46;
  const bars = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    /* Deterministic "noise": the same heights on the server and in the
       browser, or React complains the two renders differ. */
    const wob = 0.55 + 0.45 * Math.abs(Math.sin(i * 12.9898) * Math.cos(i * 4.1414));
    const h = Math.max(1.5, 46 * Math.pow(1 - t, 1.7) * wob);
    return { x: 6 + i * 6.4, h };
  });
  return (
    <svg className={flip ? "signal signal-flip" : "signal"} viewBox="0 0 300 100" preserveAspectRatio="none">
      <line x1="0" y1="50" x2="300" y2="50" className="signal-axis" />
      {bars.map((b, i) => (
        <line key={i} x1={b.x} y1={50 - b.h} x2={b.x} y2={50 + b.h} className="signal-bar" style={{ animationDelay: `${(i % 7) * 0.13}s` }} />
      ))}
    </svg>
  );
}

/* A record, mostly off the edge of the page, turning slowly. */
function Record() {
  return (
    <div className="hero-art hero-art-record" aria-hidden="true">
      <div className="record">
        <div className="record-label"><span>The Analogs</span></div>
      </div>
    </div>
  );
}

/* A signal on a scope: three sine traces drifting across the hero. */
function Wave() {
  const path = (amp: number, len: number, y: number) => {
    let d = `M0 ${y}`;
    for (let x = 0; x <= 2880; x += 8) d += ` L${x} ${(y + amp * Math.sin((x / len) * Math.PI * 2)).toFixed(1)}`;
    return d;
  };
  return (
    <div className="hero-art hero-art-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 420" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wgrad" x1="0" x2="1">
            <stop offset="0" stopColor="var(--amber)" stopOpacity="0" />
            <stop offset="0.35" stopColor="var(--amber)" />
            <stop offset="1" stopColor="var(--signal)" />
          </linearGradient>
        </defs>
        <g className="wave-a"><path d={path(70, 720, 210)} /></g>
        <g className="wave-b"><path d={path(38, 480, 210)} /></g>
        <g className="wave-c"><path d={path(18, 288, 210)} /></g>
      </svg>
    </div>
  );
}
