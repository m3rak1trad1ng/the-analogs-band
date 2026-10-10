import { MARQUEE } from "../content";

export default function Marquee() {
  /* The track is rendered twice and slid exactly -100%, so the second copy
     lands where the first began and the loop has no visible seam. */
  if (MARQUEE.length === 0) return null;

  const track = (key: string) => (
    <div className="marquee-track" key={key} aria-hidden={key === "b"}>
      {MARQUEE.map((m, i) => (
        <span key={m} className={i % 2 ? "hot" : undefined}>
          {m} <span aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );

  return <div className="marquee">{[track("a"), track("b")]}</div>;
}
