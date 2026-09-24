// @ts-check
import { defineConfig } from 'astro/config';

// Set PUBLIC_SITE_URL in the deployment environment when a production
// domain is available. This enables absolute canonical URLs and sitemap links.
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || undefined
});
