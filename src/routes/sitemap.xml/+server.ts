import { getAllSlugs } from "$lib/utils/converterRouter";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const slugs = getAllSlugs();
  const baseUrl = "https://Convertwith.me";

  const pages = [
    { url: baseUrl, priority: "1.0", changefreq: "weekly" },
    { url: `${baseUrl}/about`, priority: "0.5", changefreq: "monthly" },
    { url: `${baseUrl}/privacy`, priority: "0.3", changefreq: "monthly" },
    ...slugs.map((slug) => ({
      url: `${baseUrl}/convert/${slug}`,
      priority: "0.8",
      changefreq: "monthly" as const,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
