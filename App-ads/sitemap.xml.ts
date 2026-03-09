export const onRequest = async () => {
  const host = "https://globalworkvisajobs.com";

  // Main site pages
  const pages = [
    "",
    "/jobs",
    "/countries",
    "/about",
    "/contact",
    "/blog"
  ];

  // Country pages
  const countries = [
    "/countries/uk",
    "/countries/germany",
    "/countries/canada",
    "/countries/czech-republic"
  ];

  // Fetch all jobs dynamically from API
  let jobs: string[] = [];
  try {
    const res = await fetch(`${host}/api/jobs/featured`); // or your API endpoint
    const data = await res.json();
    if (data?.length) {
      jobs = data.map((job: { country: string; slug: string }) => 
        `/jobs/${job.country.toLowerCase().replace(/\s+/g, '-')}/${job.slug}`
      );
    }
  } catch (err) {
    console.error("Failed to fetch jobs for sitemap:", err);
  }

  const urls = [...pages, ...countries, ...jobs];

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
<url>
  <loc>${host}${url}</loc>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>
`).join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml"
    }
  });
};
