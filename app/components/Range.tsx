import { BAND, RANGE, RANGE_INTRO } from "../content";
import Vinyl from "./Vinyl";

export default function Range() {
  if (RANGE.length === 0) return null;

  return (
    <section className="section" id="music">
      <div className="wrap">
        <div className="section-head">
          <span className="label">The set</span>
          <span className="hr" />
        </div>
        {/* The heading sits in a clipped box so the record can rise from the
            first rule like a record half out of its sleeve. */}
        <div className="range-top">
          <div>
            <h2 className="poster">What we play</h2>
            <p className="lede">{RANGE_INTRO}</p>
          </div>
          <div className="range-record">
            <Vinyl logo={BAND.logo} name={BAND.name} city={BAND.city} />
          </div>
        </div>

        <ol className="range">
          {RANGE.map((r, i) => (
            <li key={r.name}>
              <span className="range-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="range-name">{r.name}</h3>
              <p>{r.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
