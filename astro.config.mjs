// @ts-check
import { defineConfig } from 'astro/config';

// Set PUBLIC_SITE_URL in the deployment environment (e.g. Cloudflare Pages ->
// Settings -> Variables) to your production origin, for example
// https://steelcalc.com. It enables absolute canonical URLs, Open Graph URLs,
// the sitemap and the robots.txt sitemap line.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || undefined,
  // Pages are built as /folder/index.html and served with a trailing slash.
  // 'ignore' keeps links like /calculators working in `npm run dev` too.
  trailingSlash: 'ignore'
});
