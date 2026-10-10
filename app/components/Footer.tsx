import { BAND } from "../content";

export default function Footer() {
  const socials = BAND.socials.filter((s) => s.href);

  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>{BAND.name} · {BAND.city}</div>
        <div className="footer-links label">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
          ))}
          <a href={`mailto:${BAND.email}`}>Booking</a>
        </div>
      </div>
    </footer>
  );
}
