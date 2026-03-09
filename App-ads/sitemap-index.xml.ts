import { NextApiRequest, NextApiResponse } from 'next';

const HOSTNAME = 'https://globalworkvisajobs.com';

const SitemapIndex = async (req: NextApiRequest, res: NextApiResponse) => {
  const sitemaps = [
    'sitemap-uk.xml',
    'sitemap-germany.xml',
    'sitemap-canada.xml',
    'sitemap-czech-republic.xml',
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map(
      (file) => `
  <sitemap>
    <loc>${HOSTNAME}/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  `
    )
    .join('')}
</sitemapindex>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemapIndex);
  res.end();
};

export default SitemapIndex;
