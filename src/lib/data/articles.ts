import { unstable_noStore as noStore } from "next/cache";
import { CATEGORIES, DEFAULT_AUTHOR } from "@/lib/constants";
import { MOCK_ARTICLES, MOCK_COMMENTS, MOCK_TAGS } from "@/lib/mock-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import type { Article, Author, Category, Comment, Tag } from "@/types/content";

type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  og_image_url: string | null;
  category_id: string | null;
  author_id: string | null;
  status: "draft" | "published" | "archived";
  is_featured: boolean | null;
  reading_time_minutes: number | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  categories?: CategoryRow | null;
  profiles?: ProfileRow | null;
  article_tags?: Array<{ tags: TagRow | null }> | null;
  article_views?: Array<{ count: number }> | null;
};

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

type TagRow = {
  id: string;
  name: string;
  slug: string;
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "admin" | "editor" | string | null;
};

function mapCategory(row: CategoryRow | null | undefined): Category {
  const fallback = CATEGORIES[0];
  if (!row) return fallback;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || "",
  };
}

function mapAuthor(row: ProfileRow | null | undefined): Author {
  if (!row) return DEFAULT_AUTHOR;

  const fullName = row.full_name || "Redação";
  return {
    id: row.id,
    email: row.email,
    fullName,
    slug: slugify(fullName),
    role: row.role === "admin" ? "admin" : "editor",
  };
}

function mapArticle(row: ArticleRow): Article {
  const tags =
    row.article_tags
      ?.map((item) => item.tags)
      .filter((tag): tag is TagRow => Boolean(tag))
      .map((tag) => ({ id: tag.id, name: tag.name, slug: tag.slug })) ?? [];

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    content: row.content || "",
    coverImage: row.cover_image_url,
    ogImage: row.og_image_url,
    category: mapCategory(row.categories),
    tags,
    author: mapAuthor(row.profiles),
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    readingTimeMinutes: row.reading_time_minutes || 1,
    isFeatured: Boolean(row.is_featured),
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    views: row.article_views?.[0]?.count ?? 0,
  };
}

function publishedMock() {
  return MOCK_ARTICLES.filter((article) => article.status === "published");
}

function sortByDate(articles: Article[]) {
  return [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt || b.createdAt).getTime() -
      new Date(a.publishedAt || a.createdAt).getTime(),
  );
}

const articleSelect = `
  *,
  categories(id,name,slug,description),
  profiles(id,email,full_name,role),
  article_tags(tags(id,name,slug))
`;

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return CATEGORIES;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return CATEGORIES;

  const { data, error } = await supabase.from("categories").select("*").order("name");
  if (error || !data) return CATEGORIES;

  return data.map(mapCategory);
}

export async function getTags(): Promise<Tag[]> {
  if (!isSupabaseConfigured) return MOCK_TAGS;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return MOCK_TAGS;

  const { data, error } = await supabase.from("tags").select("id,name,slug").order("name");
  if (error || !data) return MOCK_TAGS;

  return data;
}

export async function getPublishedArticles(limit?: number): Promise<Article[]> {
  if (!isSupabaseConfigured) {
    const articles = sortByDate(publishedMock());
    return typeof limit === "number" ? articles.slice(0, limit) : articles;
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return sortByDate(publishedMock());

  let query = supabase
    .from("articles")
    .select(articleSelect)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (typeof limit === "number") query = query.limit(limit);

  const { data, error } = await query;
  if (error || !data) return sortByDate(publishedMock()).slice(0, limit);

  return data.map((row) => mapArticle(row as ArticleRow));
}

export async function getFeaturedArticle() {
  const articles = await getPublishedArticles(12);
  return articles.find((article) => article.isFeatured) ?? articles[0] ?? null;
}

export async function getMostReadArticles(limit = 5) {
  const articles = await getPublishedArticles(24);
  return [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
}

export async function getArticleBySlug(slug: string) {
  if (!isSupabaseConfigured) {
    return publishedMock().find((article) => article.slug === slug) ?? null;
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return publishedMock().find((article) => article.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("articles")
    .select(articleSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;

  return mapArticle(data as ArticleRow);
}

export async function getArticlesByCategory(categorySlug: string, limit?: number) {
  if (!isSupabaseConfigured) {
    const articles = sortByDate(
      publishedMock().filter((article) => article.category.slug === categorySlug),
    );
    return typeof limit === "number" ? articles.slice(0, limit) : articles;
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    const articles = sortByDate(
      publishedMock().filter((article) => article.category.slug === categorySlug),
    );
    return typeof limit === "number" ? articles.slice(0, limit) : articles;
  }

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .maybeSingle();

  if (!category) return [];

  let query = supabase
    .from("articles")
    .select(articleSelect)
    .eq("category_id", category.id)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (typeof limit === "number") query = query.limit(limit);

  const { data, error } = await query;
  if (error || !data) return [];

  return data.map((row) => mapArticle(row as ArticleRow));
}

export async function getArticlesByTag(tagSlug: string) {
  const articles = isSupabaseConfigured ? await getPublishedArticles(120) : sortByDate(publishedMock());
  return articles.filter((article) => article.tags.some((tag) => tag.slug === tagSlug));
}

export async function getArticlesByAuthor(authorSlug: string) {
  const articles = await getPublishedArticles(60);
  return articles.filter((article) => article.author.slug === authorSlug);
}

export async function searchArticles(query: string) {
  const term = query.trim();
  if (!term) return [];

  noStore();

  if (!isSupabaseConfigured) {
    const normalized = term.toLowerCase();
    return publishedMock().filter((article) => {
      const haystack = [
        article.title,
        article.excerpt,
        article.content,
        article.category.name,
        ...article.tags.map((tag) => tag.name),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }

  const articles = await getPublishedArticles(120);
  const normalized = term.toLowerCase();

  return articles.filter((article) => {
    const haystack = [
      article.title,
      article.excerpt,
      article.content,
      article.category.name,
      article.category.slug,
      ...article.tags.map((tag) => tag.name),
      ...article.tags.map((tag) => tag.slug),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export async function getRelatedArticles(article: Article, limit = 3) {
  const articles = await getPublishedArticles(24);
  return articles
    .filter((item) => item.id !== article.id)
    .filter(
      (item) =>
        item.category.slug === article.category.slug ||
        item.tags.some((tag) => article.tags.some((articleTag) => articleTag.slug === tag.slug)),
    )
    .slice(0, limit);
}

export async function getApprovedComments(articleId: string): Promise<Comment[]> {
  if (!isSupabaseConfigured) {
    return MOCK_COMMENTS.filter(
      (comment) => comment.articleId === articleId && comment.status === "approved",
    );
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("comments")
    .select("id,article_id,name,body,status,created_at")
    .eq("article_id", articleId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((comment) => ({
    id: comment.id,
    articleId: comment.article_id,
    name: comment.name,
    body: comment.body,
    status: comment.status,
    createdAt: comment.created_at,
  }));
}

export async function recordArticleView(articleId: string) {
  if (!isSupabaseConfigured) return;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return;

  await supabase.from("article_views").insert({ article_id: articleId });
}
