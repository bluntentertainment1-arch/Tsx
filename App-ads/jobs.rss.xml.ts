// functions/jobs.rss.xml.ts
import { jobsApi } from '../services/api';

export async function onRequestGet(context: any) {
  const baseUrl = 'https://globalworkvisajobs.com';
  const response = await jobsApi.getLatestJobs(20); // latest 20 jobs
  const jobs = response.data || [];

  let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Global Work Visa Jobs - Latest Jobs</title>
  <link>${baseUrl}</link>
  <description>Latest visa-sponsored job listings across Europe and beyond</description>
  <language>en-us</language>
  <pubDate>${new Date().toUTCString()}</pubDate>
`;

  jobs.forEach((job: any) => {
    xml += `  <item>
    <title>${job.title} - ${job.location}</title>
    <link>${baseUrl}/job/${job.id}</link>
    <description>${job.description}</description>
    <pubDate>${new Date(job.date_added).toUTCString()}</pubDate>
  </item>\n`;
  });

  xml += '</channel>\n</rss>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
