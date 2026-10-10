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

  /* One sentence under the name. Built only from the setlist, because that is
     all that is known so far — add the size of the band ("Four pieces — …")
     once the lineup below is filled in. */
  hook: "Songs the whole room already knows — the Beatles and Pink Floyd through Nirvana, Pearl Jam and Adele.",

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

/**
 * The setlist, in the order the band gave it (2026-10-09).
 *
 * `by` is the VERSION the band plays, not always who wrote it — "Ain't No
 * Sunshine" is listed under John Mayer and "I Will Survive" under Cake on
 * purpose. Three spellings were corrected from the list as sent: Heaven's,
 * R.E.M., Creedence.
 *
 * ⚠ Keep it current. A song on the page that the band no longer plays is the
 * one somebody will request. Empty hides the section and its nav link.
 */
export const SETLIST: { song: string; by: string }[] = [
  { song: "Live and Let Die", by: "Guns N’ Roses" },
  { song: "Knockin’ on Heaven’s Door", by: "Guns N’ Roses" },
  { song: "Comfortably Numb", by: "Pink Floyd" },
  { song: "(Sittin’ On) The Dock of the Bay", by: "Otis Redding" },
  { song: "Ain’t No Sunshine", by: "John Mayer" },
  { song: "Come Together", by: "The Beatles" },
  { song: "Let It Be", by: "The Beatles" },
  { song: "Blackbird", by: "The Beatles" },
  { song: "I Will Survive", by: "Cake" },
  { song: "Everybody Hurts", by: "R.E.M." },
  { song: "Every Breath You Take", by: "The Police" },
  { song: "Wild World", by: "Mr. Big" },
  { song: "Free Fallin’", by: "Tom Petty" },
  { song: "Cocaine", by: "Eric Clapton" },
  { song: "Come As You Are", by: "Nirvana" },
  { song: "Roadhouse Blues", by: "The Doors" },
  { song: "New Shoes", by: "Paolo Nutini" },
  { song: "Sweet Emotion", by: "Aerosmith" },
  { song: "Someone Like You", by: "Adele" },
  { song: "Have You Ever Seen the Rain", by: "Creedence Clearwater Revival" },
  { song: "No Woman, No Cry", by: "Bob Marley" },
  { song: "Jeremy", by: "Pearl Jam" },
  { song: "Fast Car", by: "Tracy Chapman" },
  { song: "Just the Two of Us", by: "Bill Withers" },
  { song: "Just Like Heaven", by: "The Cure" },
  { song: "Life in the Fast Lane", by: "Eagles" },
  { song: "Separate Ways", by: "Journey" },
  { song: "Roll with the Changes", by: "REO Speedwagon" },
  { song: "Money", by: "Pink Floyd" },
  { song: "My City Was Gone", by: "Pretenders" },
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
