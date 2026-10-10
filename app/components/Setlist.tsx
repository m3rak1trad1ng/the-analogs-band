import { SETLIST } from "../content";

/**
 * The songs.
 *
 * ⚠ THE CARPER DIEM SITE DELIBERATELY HAS NO SONG TITLES — its owner did not
 * want a list that goes stale. This band handed over its setlist to be shown,
 * so here the list IS the pitch: a booker for a cover band is asking one
 * question, "will my room know these?", and thirty titles answer it faster
 * than any paragraph.
 */
export default function Setlist() {
  if (SETLIST.length === 0) return null;

  return (
    <section className="section" id="songs">
      <div className="wrap">
        <div className="section-head">
          <span className="label">The set</span>
          <span className="hr" />
        </div>
        <h2 className="poster">Songs you know</h2>
        <p className="lede">
          {SETLIST.length} and counting. Requests welcome — ask when you book.
        </p>

        <ol className="setlist">
          {SETLIST.map((s, i) => (
            <li key={s.song}>
              <span className="setlist-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span className="setlist-text">
                <span className="setlist-song">{s.song}</span>
                <span className="setlist-by">{s.by}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
