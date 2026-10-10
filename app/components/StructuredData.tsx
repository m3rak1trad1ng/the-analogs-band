import { BAND, SHOWS } from "../content";

/**
 * Google event markup.
 *
 * ⚠ THIS IS PART OF THE WEBSITE — there is nothing to set up at Google and no
 * account to create. It renders as an invisible <script> block that Google's
 * crawler reads when it visits the page. If it likes what it finds, the show
 * can appear in search results and in the "events near me" panel with the date,
 * venue and time already filled in.
 *
 * The band itself is marked up as a MusicGroup so searches for the name can
 * show a proper result rather than a generic page listing.
 */
export default function StructuredData() {
  const band = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: BAND.name,
    url: BAND.url,
    ...(BAND.og ? { image: `${BAND.url}${BAND.og}` } : {}),
    genre: BAND.genres,
    foundingLocation: { "@type": "Place", name: BAND.city },
    ...(BAND.socials.some((s) => s.href)
      ? { sameAs: BAND.socials.filter((s) => s.href).map((s) => s.href) }
      : {}),
  };

  const events = SHOWS.map((s) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${BAND.name} at ${s.venue}`,
    startDate: s.start,
    endDate: s.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(BAND.og ? { image: `${BAND.url}${BAND.og}` } : {}),
    location: {
      "@type": "Place",
      name: s.venue,
      address: { "@type": "PostalAddress", addressLocality: s.city.split(",")[0], addressRegion: (s.city.split(",")[1] || "").trim(), addressCountry: "US" },
    },
    performer: { "@type": "MusicGroup", name: BAND.name, url: BAND.url },
    organizer: { "@type": "MusicGroup", name: BAND.name, url: BAND.url },
    ...(s.ticket ? { offers: { "@type": "Offer", url: s.ticket, availability: "https://schema.org/InStock" } } : {}),
  }));

  return (
    <>
      {[band, ...events].map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}
