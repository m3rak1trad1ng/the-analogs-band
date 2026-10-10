/**
 * ⭐ EDIT THIS FILE, NOT THE COMPONENTS.
 * Every word, date and link on the site lives here.
 *
 * ⚠ BEFORE THIS GOES PUBLIC, CHECK THE THREE THINGS MARKED "ASSUMED" BELOW.
 * The city and the setlist came from the band. `venues`, `radius` and the
 * booking address did not — they are the Carper Diem lines, kept because the
 * two bands work the same area, and nobody has confirmed them for this one.
 */

export const BAND = {
  name: "The Analogs",
  city: "Madison, Wisconsin",
  /* Absolute URL. Facebook and Google both require absolute image and page
     URLs — a relative path silently produces no share preview at all. */
  url: "https://www.theanalogsband.com",

  /* Genre + city. The one line a booker reads before deciding anything. */
  kicker: "Rock covers · Madison, Wisconsin",

  /* Machine-readable genres for Google. Plain names: "Classic rock", "Funk". */
  genres: ["Classic rock", "Alternative rock", "Rock"] as string[],

  /* One sentence under the name. Written from the band's setlist, which was
     given as reference for describing the band — ⛔ not to be listed on the
     site. Add the size of the band ("Four pieces — …") once the lineup below
     is filled in. */
  /* ⛔ NO ARTIST NAMES OR SONG TITLES ANYWHERE ON THE SITE. Owner, 2026-10-09:
     describe the genres and the range, not specific bands. */
  hook: "Classic rock, ’90s alternative and soul — six decades of songs the whole room already knows.",

  /* ⚠ ASSUMED — both lines are Carper Diem's, word for word. Same area, so
     probably right; change them if this band plays different rooms. */
  venues: "Bars, breweries, wineries, festivals and private events.",
  radius:
    "Southern Wisconsin and northern Illinois — Madison, Milwaukee, the Dells, Chicago. Further for the right room.",

  /* ⚠ ASSUMED — THIS ADDRESS DOES NOT EXIST YET. Set it up as a forward at
     GoDaddy, pointing at whoever actually checks it, or mail sent from the
     site goes nowhere. Don't ship a personal Gmail. */
  email: "booking@theanalogsband.com",

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

/** One wide group shot for the top of the band section. Drop the file in
 *  public/photos/ and set src to "/photos/band.jpg". Leave "" and the section
 *  renders the lineup alone. */
export const BAND_PHOTO = {
  src: "",
  alt: "The Analogs",
};

/**
 * The band. One row per player: { part: "Guitar", name: "…" }. `name` and
 * `photo` are optional. Empty hides the section and its nav link.
 */
export const LINEUP: { part: string; name?: string; photo?: string }[] = [];

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

/** YouTube videos. id: the part after v= in the URL. */
export const VIDEOS: { id: string; title: string }[] = [];

/**
 * Photos. Drop files in public/photos/ and list them here.
 * The FIRST photo becomes the hero background, so make it a wide live shot.
 */
export const PHOTOS: { src: string; alt: string }[] = [];

/** Rooms that have already booked the band. Empty hides the list. */
export const PAST_VENUES: { name: string; city: string }[] = [];
