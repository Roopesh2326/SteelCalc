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
/calculators
/calculators/steel-weight
/calculators/tmt-rebar
/calculators/steel-plate
/calculators/steel-pipe
/calculators/steel-cost
/robots.txt
/sitemap.xml
```

A branded `/404` page is included for invalid routes.

## Quality gate

Every pull request should pass:

```sh
npm run build
```

The repository also contains a GitHub Actions build workflow that runs the production build automatically on pushes and pull requests.

## Notes on calculation estimates

SteelCalc is an estimation tool. Actual delivered weight and purchase cost can vary by steel grade, manufacturing tolerances, coating, supplier pricing, and project-specific specifications.
