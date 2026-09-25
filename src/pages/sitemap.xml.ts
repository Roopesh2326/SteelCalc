import type { APIRoute } from 'astro';

const paths = [
  '/',
  '/calculators',
  '/calculators/steel-weight',
  '/calculators/tmt-rebar',
  '/calculators/steel-plate',
  '/calculators/steel-pipe',
  '/calculators/steel-cost',
  '/calculators/concrete',
  '/calculators/brick-block',
  '/calculators/plaster',
  '/calculators/flooring',
  '/calculators/earthwork',
  '/calculators/structural-steel',
  '/calculators/bbs',
  '/guides',
  '/guides/tmt-bar-weight-chart',
  '/guides/steel-weight-formulas',
  '/workbench'
];

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
    );
  }

  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, site).toString()}</loc></url>`)
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>'
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
