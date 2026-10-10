import { RANGE, RANGE_INTRO } from "../content";

export default function Range() {
  if (RANGE.length === 0) return null;

  return (
    <section className="section" id="music">
      <div className="wrap">
        <div className="section-head">
          <span className="label">The set</span>
          <span className="hr" />
        </div>
        <h2 className="poster">What we play</h2>
        <p className="lede">{RANGE_INTRO}</p>

        <ul className="range">
          {RANGE.map((r) => (
            <li key={r.name}>
              <span className="range-name">{r.name}</span>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
