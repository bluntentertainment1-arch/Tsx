import { jobsApi, Job } from '../../services/api';
import { NextApiRequest, NextApiResponse } from 'next';

const HOSTNAME = 'https://globalworkvisajobs.com';

const SitemapCzechRepublic = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await jobsApi.getJobsByCountry('czech republic');
    const jobs: Job[] = response.data || [];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${HOSTNAME}/jobs/czech-republic</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${jobs
    .map(
      (job) => `
  <url>
    <loc>${HOSTNAME}/job/${job.id}</loc>
    <lastmod>${job.date_added || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `
    )
    .join('')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (err) {
    res.status(500).end();
  }
};

export default SitemapCzechRepublic;
