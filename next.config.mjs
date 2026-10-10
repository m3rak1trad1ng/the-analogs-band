/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⛔ THIS LINE IS WHY THE SITE CAN LIVE ON GITHUB PAGES.
  //    'export' makes Next write plain HTML/CSS/JS files instead of running a
  //    Node server. Consequences, all fine for a band site: no API routes, no
  //    redirects(), no image optimization. If a future change needs any of
  //    those, this line has to come out and the site needs a real host.
  output: "export",

  // Empty for the real site. The dashboard preview build sets it so the same
  // files can be served from a sub-folder (AI_SERVER/scripts/personal_site_preview.sh).
  basePath: process.env.SITE_BASE_PATH || "",

  // Static export cannot run Next's image optimizer, so images are served as-is.
  images: { unoptimized: true },

  // Every route becomes a folder with an index.html — GitHub Pages serves
  // /booking/ correctly instead of 404ing on /booking.
  trailingSlash: true,
};

export default nextConfig;
