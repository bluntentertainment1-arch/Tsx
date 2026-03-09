import { jobsApi } from "../services/api";

export const onRequest = async () => {
  const host = "https://globalworkvisajobs.com";

  // Static pages
  const pages = ["", "/jobs", "/countries", "/about", "/contact", "/blog"];

  // Fetch all countries from API
  let countries: string[] = [];
  try {
    const countriesResp = await jobsApi.getAvailableCountries();
    if (countriesResp.data) {
      countries = countriesResp.data.map((c: string) => `/jobs/${c.toLowerCase().replace(/\s+/g, "-")}`);
    }
  } catch (err) {
    console.error("Error fetching countries for sitemap:", err);
  }

  // Fetch featured jobs from API
  let jobs: string[] = [];
  try {
    const featuredResp = await jobsApi.getFeatured();
    if (featuredResp.data) {
      jobs = featuredResp.data.map(
        (job: any) => `/jobs/${job.country.toLowerCase().replace(/\s+/g, "-")}/${job.slug || job.id}`
      );
    }
  } catch (err) {
    console.error("Error fetching jobs for sitemap:", err);
  }

  // Combine all URLs
  const urls = [...pages, ...countries, ...jobs];

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${host}${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml",
    },
  });
};
