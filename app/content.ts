/**
 * ⭐ EDIT THIS FILE, NOT THE COMPONENTS.
 * Every word, date and link on the site lives here.
 *
 * ⚠ CHECK THE THINGS MARKED "ASSUMED" BELOW. The city and the setlist came
 * from the band. `venues` is the Carper Diem line, kept because the two bands
 * work the same area.
 */

export const BAND = {
  name: "The Analogs",
  city: "Madison, Wisconsin",
  /* Absolute URL. Facebook and Google both require absolute image and page
     URLs — a relative path silently produces no share preview at all. */
  url: "https://www.theanalogsband.com",

  /* Genre + city. The one line a booker reads before deciding anything. */
  kicker: "Cover band · Madison, Wisconsin",

  /* Machine-readable genres for Google. Plain names: "Classic rock", "Funk". */
  genres: ["Classic rock", "Alternative rock", "Rock"] as string[],

  /* One sentence under the name. Written from the band's setlist, which was
     given as reference for describing the band — ⛔ not to be listed on the
     site. Add the size of the band ("Four pieces — …") once the lineup below
     is filled in. */
  /* ⛔ NO ARTIST NAMES OR SONG TITLES ANYWHERE ON THE SITE. Owner, 2026-10-09:
     describe the genres and the range, not specific bands. */
  /* Three words, set large in the headline serif. */
  tagline: "Live. Loud. Analog.",
  /* ⛔ Do not count the band in this line. "Four players…" — owner: "why say
     4 players, that sounds dumb af." Say what they play and stop. */
  hook: "Classic rock, ’90s alternative and soul — the songs you already know every word to.",

  /* ⚠ ASSUMED — the venue list is Carper Diem's, word for word. Change it if
     this band plays different rooms. */
  venues: "Bars, breweries, wineries, festivals and private events.",
  /* ⛔ NOT NORTHERN ILLINOIS. The first version carried Carper Diem's travel
     line — Milwaukee, the Dells, Chicago — and the owner's answer was "why
     northern Illinois? no...." Nothing beyond Madison has been confirmed for
     this band, so the line claims nothing beyond it. */
  radius: "Madison and the surrounding area.",

  /* ⭐ WHERE THE BOOKING FORM SENDS. There is no band email address on purpose
     (owner: not paying for one) — the form on the page posts to Web3Forms,
     which forwards each inquiry to one inbox for free.
     To switch it on: go to web3forms.com, enter the email of whoever handles
     booking (the lead guitarist), and paste the access key it emails back
     here. The key is meant to be public; it only names the destination inbox.
     ⚠ While this is "", the form shows but says booking is not open yet. */
  formKey: "",

  /* The graphic in the hero: "meter" (a VU meter), "record" (a turning record),
     "wave" (a signal trace) or "" for none. */
  heroArt: "meter",

  /* The band's own logo, shown as the name at the top of the page. It sits on
     black, which is why the page's background is black too. */
  logo: "/brand/logo.webp",

  /* The share card — 1200x630, dropped in public/ as og.jpg, then set this to
     "/og.jpg". Left empty the link still posts, just without a picture. */
  og: "/og.jpg",

  socials: [
    { label: "Facebook", href: "" },
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
  ],
};

/** The scrolling strip under the hero. Short fragments — genres, the city.
 *  Empty hides the strip. */
export const MARQUEE: string[] = [
  "Classic rock",
  "’90s alternative",
  "Soul",
  "The ’60s to the 2010s",
  "Madison, Wisconsin",
];

/**
 * What the band plays, in three blocks. This is the answer to the one question
 * a booker has about a cover band: "will my crowd know these songs?"
 *
 * ⛔ Genres and eras only — no artist names, no song titles (owner's rule).
 * Written from the band's setlist; reword freely. Empty hides the section.
 */
export const RANGE_INTRO =
  "Covers from the ’60s through the 2010s, picked for one thing: the room knows the words.";

export const RANGE: { name: string; text: string }[] = [
  {
    name: "Classic rock",
    text: "The ’60s and ’70s staples. Big choruses, long guitar solos, and the slow ones everybody ends up singing.",
  },
  {
    name: "’80s & ’90s alternative",
    text: "Arena rock, new wave and grunge-era radio — the stretch of the night where people remember every line.",
  },
  {
    name: "Soul & acoustic",
    text: "Soul, a little reggae and stripped-down ballads to change the pace between the loud ones.",
  },
];

/** One wide group shot for the top of the band section. Drop the file in
 *  public/photos/ and set src to "/photos/band.jpg". Leave "" and the section
 *  renders the lineup alone. */
export const BAND_PHOTO = {
  src: "",
  alt: "The Analogs",
};

/**
 * The band. One row per player: { part: "Guitar", name: "…" }. `name` and
 * `photo` are optional.
 */
export const LINEUP: { part: string; name?: string; photo?: string }[] = [
  /* Parts and portraits are from the photos the band sent 2026-10-09. Add
     `name:` to any row to print it above the part. */
  { part: "Guitar", photo: "/band/guitar.jpg" },
  { part: "Bass", photo: "/band/bass.jpg" },
  { part: "Keys & vocals", photo: "/band/keys.jpg" },
  { part: "Drums", photo: "/band/drums.jpg" },
];

/**
 * Upcoming shows. Delete rows once they pass — an old date at the top of the
 * page reads as a dead band.
 *
 * `start`/`end` are the machine-readable twins of `date`/`time`; they drive the
 * add-to-calendar link and the Google event markup. ⚠ The offset is -05:00
 * during daylight time (mid-March to early November) and -06:00 otherwise, for
 * Central. Getting it wrong puts the gig in someone's calendar at the wrong hour.
 *
 *   {
 *     date: "Sat · Nov 14",
 *     venue: "Venue name",
 *     city: "Town, WI",
 *     time: "7:00 – 10:00 PM",
 *     start: "2026-11-14T19:00:00-06:00",
 *     end: "2026-11-14T22:00:00-06:00",
 *     ticket: "",
 *   },
 */
export const SHOWS: {
  date: string;
  venue: string;
  city: string;
  time: string;
  start: string;
  end: string;
  ticket: string;
}[] = [];

/**
 * How many empty frames the "See us play" section shows before there is
 * anything to put in them. Each video or photo added below takes one frame;
 * once there are more real ones than slots, the placeholders are gone. Set
 * either to 0 to show no placeholders at all.
 */
export const VIDEO_SLOTS = 2;
export const PHOTO_SLOTS = 3;

/** YouTube videos. id: the part after v= in the URL. */
export const VIDEOS: { id: string; title: string }[] = [];

/**
 * Photos. Drop files in public/photos/ and list them here.
 * The FIRST photo becomes the hero background, so make it a wide live shot.
 */
export const PHOTOS: { src: string; alt: string }[] = [];

/** Rooms that have already booked the band. Empty hides the list. */
export const PAST_VENUES: { name: string; city: string }[] = [];
