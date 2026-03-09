// functions/sitemap.xml.ts
import { jobsApi } from '../services/api';

export async function onRequestGet(context: any) {
  const baseUrl = 'https://globalworkvisajobs.com';

  // Fetch all jobs from your API
  const response = await jobsApi.getAllJobs();
  const jobs = response.data || [];

  const staticPages = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/saved',
    '/visa-tips',
    '/privacy',
    '/terms',
    '/disclaimer',
  ];

  // Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages
  staticPages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page}</loc>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Dynamic job pages
  jobs.forEach((job: any) => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/job/${job.id}</loc>\n`;
    xml += `    <lastmod>${job.date_added || new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += '</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // cache 1 hour
    },
  });
}
