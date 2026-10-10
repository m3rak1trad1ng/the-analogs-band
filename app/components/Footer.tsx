import { BAND } from "../content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>{BAND.name} · {BAND.city}</div>
        <div className="footer-links label">
          {BAND.socials.map((s) =>
            s.href ? (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ) : (
              /* A placeholder, not a link: the label holds the spot and goes
                 live the moment an address is added in content.ts. A link to
                 nowhere would be worse than no link. */
              <span key={s.label} className="footer-soon" title="Coming soon">{s.label}</span>
            ),
          )}
          <a href="#booking">Booking</a>
        </div>
      </div>
    </footer>
  );
}
