import { SEO } from "@niama/domain/functions/site";
import { text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const SITEMAP_URLS = ["/", "/mentions-legales"] as const;

const renderUrlSet = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_URLS.map((pathname) => `  <url><loc>${new URL(pathname, SEO.url).toString()}</loc></url>`).join("\n")}
</urlset>
`;

export const GET: RequestHandler = () =>
  text(renderUrlSet(), {
    headers: {
      "cache-control": "public, max-age=3600",
      "content-type": "application/xml; charset=utf-8",
    },
  });
