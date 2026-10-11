import { BAND } from "../content";

export default function Footer({ home = true }: { home?: boolean }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        {BAND.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="footer-logo" src={BAND.logo} alt="" width={1535} height={1024} loading="lazy" />
        )}
        <div className="footer-line">{BAND.name} · {BAND.city}</div>
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
          <a href={home ? "#booking" : "../#booking"}>Booking</a>
        </div>
      </div>
    </footer>
  );
}
