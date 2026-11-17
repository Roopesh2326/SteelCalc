# SteelCalc

SteelCalc is an Astro-based toolkit for practical steel, construction, and project cost calculations.

## Calculator toolkit

- Steel Weight Calculator
- TMT / Rebar Calculator
- Steel Plate Calculator
- Steel Pipe Calculator
- Steel Cost Calculator
- Concrete Calculator
- Brick & Block Calculator
- Plaster Calculator
- Flooring & Tile Calculator
- Excavation & Earthwork Calculator
- Structural Steel Profile Calculator
- Rebar BBS Calculator
- Engineering Unit Converter
- Engineering Reference Guides
- Project Workbench

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

## Production configuration

Copy `.env.example` to `.env` for local configuration. Before deployment, set the final public origin:

```text
PUBLIC_SITE_URL=https://your-domain.example
```

The site uses that value for absolute canonical URLs and the production sitemap reference.

For a static host such as Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node: 22+

No server runtime is required for the calculator pages.

## Routes

```text
/
/calculators/
/calculators/steel-weight/
/calculators/tmt-rebar/
/calculators/steel-plate/
/calculators/steel-pipe/
/calculators/steel-cost/
/calculators/concrete/
/calculators/brick-block/
/calculators/plaster/
/calculators/flooring/
/calculators/earthwork/
/calculators/structural-steel/
/calculators/bbs/
/guides/
/guides/tmt-bar-weight-chart/
/guides/steel-weight-formulas/
/guides/construction-reference/
/guides/structural-sections-reference/
/guides/material-density-reference/
/tools/
/tools/unit-converter/
/workbench/
/robots.txt
/sitemap.xml
```

All routes use a trailing slash. A branded `/404` page is included for invalid routes.

## Quality gate

Every pull request should pass the production build and generated-route smoke tests:

```sh
npm ci
npm run build
```

GitHub Actions runs the clean install, production build, and route smoke tests on pushes and pull requests. The smoke test checks the homepage, all calculator pages, guide/reference pages, tools, workbench, 404 page, `robots.txt`, and `sitemap.xml`.

## Notes on calculation estimates

SteelCalc is an estimation tool. Actual delivered weight and purchase cost can vary by steel grade, manufacturing tolerances, coating, supplier pricing, and project-specific specifications.

## Production launch checklist

1. Set `PUBLIC_SITE_URL` (for example `https://steelcalc.com`) in the host's build environment. Without it, canonical URLs, Open Graph URLs, the sitemap entries and the robots.txt sitemap line are left out.
2. Deploy with `npm run build` and publish `dist/`.
3. Open `/robots.txt`, `/sitemap.xml` and `/og-image.png` on the live domain.
4. Add the domain to Google Search Console and submit `https://your-domain/sitemap.xml`.

`public/_headers` adds security headers and long-term caching for hashed assets on Cloudflare Pages and Netlify.
