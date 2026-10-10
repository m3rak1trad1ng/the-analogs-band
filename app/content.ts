/**
 * ⭐ EDIT THIS FILE, NOT THE COMPONENTS.
 * Every word, date and link on the site lives here.
 *
 * ⛔ NOT READY TO PUBLISH. This was copied from the Carper Diem site on
 * 2026-10-09 and everything in [square brackets] is a placeholder waiting on a
 * real answer. Nothing here was carried over from Carper Diem — no venues, no
 * dates, no lineup — because the wrong band's facts on a live page is worse
 * than a blank one. Search this file for "[" before it goes anywhere public.
 */

export const BAND = {
  name: "The Analogs",
  city: "[city, state]",
  /* Absolute URL. Facebook and Google both require absolute image and page
     URLs — a relative path silently produces no share preview at all. */
  url: "https://www.theanalogsband.com",

  /* Genre + city. The one line a booker reads before deciding anything. */
  kicker: "[genre] · [city, state]",

  /* Machine-readable genres for Google. Plain names: "Classic rock", "Funk". */
  genres: [] as string[],

  /* One sentence: who is on stage and what the night sounds like. */
  hook: "[One line about the band — how many pieces, what it sounds like.]",

  venues: "[The kinds of rooms the band plays.]",
  radius: "[How far the band travels.]",

  /* ⚠ PLACEHOLDER. Set this address up as a forward at the domain registrar,
     pointing at whoever actually checks it. Don't ship a personal Gmail. */
  email: "booking@theanalogsband.com",

  /* The share card — 1200x630, dropped in public/ as og.jpg, then set this to
     "/og.jpg". Left empty the link still posts, just without a picture. */
  og: "",

  socials: [
    { label: "Facebook", href: "" },
    { label: "Instagram", href: "" },
    { label: "YouTube", href: "" },
  ],
};

/** The scrolling strip under the hero. Short fragments — genres, the city.
 *  Empty hides the strip. */
export const MARQUEE: string[] = [];

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
