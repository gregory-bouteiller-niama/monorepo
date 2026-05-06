import { SEO } from "@niama/domain/functions/site";
import { text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const renderSitemapIndex = () => `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${new URL("/sitemap-0.xml", SEO.url).toString()}</loc></sitemap>
</sitemapindex>
`;

export const GET: RequestHandler = () =>
  text(renderSitemapIndex(), {
    headers: {
      "cache-control": "public, max-age=3600",
      "content-type": "application/xml; charset=utf-8",
    },
  });
