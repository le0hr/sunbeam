import { readFileSync, writeFileSync } from "fs";

const DOMAIN = "https://sunbeambe.com";

const routes = JSON.parse(
  readFileSync("./prerender-routes.json", "utf8")
);

const uniqueRoutes = [...new Set(routes)];

const today = new Date().toISOString().split("T")[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${uniqueRoutes
  .map((route) => {
    const url =
      route === "/"
        ? DOMAIN
        : DOMAIN + (route.startsWith("/") ? route : `/${route}`);

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${
      route === "/"
        ? "1.0"
        : route === "/catalog"
        ? "0.9"
        : route.includes("/catalog/") && route.split("/").length >= 5
        ? "0.8"
        : "0.7"
    }</priority>
  </url>`;
  })
  .join("\n")}

</urlset>
`;

writeFileSync("./dist/sitemap.xml", xml);

console.log(`Сайтмап створено (${uniqueRoutes.length} URLs)`);