import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getCategories, getPublishedArticles, getTags } from "@/lib/data/articles";
import { INSTITUTIONAL_PAGES } from "@/lib/institutional-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [categories, articles, tags] = await Promise.all([
    getCategories(),
    getPublishedArticles(200),
    getTags(),
  ]);

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/buscar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...INSTITUTIONAL_PAGES.map((page) => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(`${page.updatedAt}T12:00:00`),
      changeFrequency: "monthly" as const,
      priority: page.slug === "sobre" || page.slug === "editorial" ? 0.7 : 0.4,
    })),
    ...categories.map((category) => ({
      url: `${SITE_URL}/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...tags.map((tag) => ({
      url: `${SITE_URL}/tag/${tag.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/noticias/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || article.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/autor/${article.author.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
