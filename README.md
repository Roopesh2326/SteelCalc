# SteelCalc

SteelCalc is an Astro-based toolkit for practical steel weight and cost calculations.

## Calculator toolkit

- Steel Weight Calculator
- TMT / Rebar Calculator
- Steel Plate Calculator
- Steel Pipe Calculator
- Steel Cost Calculator

## Development

From the repository root:

```sh
npm install
npm run dev
```

Production build:

```sh
npm run build
npm run preview
```

## Production SEO configuration

Set `PUBLIC_SITE_URL` to the final production origin when deploying, for example:

```text
PUBLIC_SITE_URL=https://example.com
```

Astro then uses that origin for absolute canonical URLs, the sitemap endpoint, and the sitemap reference in `robots.txt`.

Without `PUBLIC_SITE_URL`, the site still works locally; canonical and absolute sitemap URLs remain unset until a real production domain is configured.

## Routes

The calculator directory is available at `/calculators`, with individual tools below it:

```text
/calculators
/calculators/steel-weight
/calculators/tmt-rebar
/calculators/steel-plate
/calculators/steel-pipe
/calculators/steel-cost
```

The site also exposes `/robots.txt` and `/sitemap.xml`.
