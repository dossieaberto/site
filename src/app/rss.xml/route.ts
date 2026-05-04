import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { getPublishedArticles } from "@/lib/data/articles";

export const revalidate = 300;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getPublishedArticles(30);
  const items = articles
    .map(
      (article) => `<item>
  <title>${escapeXml(article.title)}</title>
  <link>${SITE_URL}/noticias/${article.slug}</link>
  <guid>${SITE_URL}/noticias/${article.slug}</guid>
  <description>${escapeXml(article.excerpt)}</description>
  <category>${escapeXml(article.category.name)}</category>
  <pubDate>${new Date(article.publishedAt || article.createdAt).toUTCString()}</pubDate>
</item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(SITE_NAME)}</title>
  <link>${SITE_URL}</link>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <language>pt-BR</language>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
