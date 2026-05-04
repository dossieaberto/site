import { MOCK_ARTICLES, MOCK_COMMENTS, MOCK_NEWSLETTER } from "@/lib/mock-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Article, NewsletterSubscriber, SiteSettings } from "@/types/content";

export async function getDashboardStats() {
  if (!isSupabaseConfigured) {
    return {
      published: MOCK_ARTICLES.filter((article) => article.status === "published").length,
      drafts: MOCK_ARTICLES.filter((article) => article.status === "draft").length,
      pendingComments: MOCK_COMMENTS.filter((comment) => comment.status === "pending").length,
      subscribers: MOCK_NEWSLETTER.length,
      recentArticles: MOCK_ARTICLES.slice(0, 5),
      mostRead: [...MOCK_ARTICLES].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5),
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      published: 0,
      drafts: 0,
      pendingComments: 0,
      subscribers: 0,
      recentArticles: [],
      mostRead: [],
    };
  }

  const [
    published,
    drafts,
    pendingComments,
    subscribers,
    recentArticlesResult,
    viewsResult,
  ] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("comments").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("articles")
      .select("id,title,slug,status,published_at,created_at,updated_at")
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("articles")
      .select("id,title,slug,status,published_at,created_at,updated_at")
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .limit(5),
  ]);

  const toArticlePreview = (row: {
    id: string;
    title: string;
    slug: string;
    status: Article["status"];
    published_at: string | null;
    created_at: string;
    updated_at: string;
  }) =>
    ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: "",
      content: "",
      coverImage: null,
      category: { id: "", name: "", slug: "", description: "" },
      tags: [],
      author: { id: "", fullName: "", slug: "" },
      status: row.status,
      publishedAt: row.published_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      readingTimeMinutes: 1,
      isFeatured: false,
      views: 0,
    }) satisfies Article;

  return {
    published: published.count ?? 0,
    drafts: drafts.count ?? 0,
    pendingComments: pendingComments.count ?? 0,
    subscribers: subscribers.count ?? 0,
    recentArticles: recentArticlesResult.data?.map(toArticlePreview) ?? [],
    mostRead: viewsResult.data?.map(toArticlePreview) ?? [],
  };
}

export async function getAdminArticles() {
  if (!isSupabaseConfigured) return MOCK_ARTICLES;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return MOCK_ARTICLES;

  const { data, error } = await supabase
    .from("articles")
    .select("id,title,slug,excerpt,status,is_featured,published_at,created_at,updated_at")
    .order("updated_at", { ascending: false });

  if (error || !data) return [];

  return data.map(
    (row) =>
      ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt || "",
        content: "",
        coverImage: null,
        category: { id: "", name: "", slug: "", description: "" },
        tags: [],
        author: { id: "", fullName: "", slug: "" },
        status: row.status,
        publishedAt: row.published_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        readingTimeMinutes: 1,
        isFeatured: Boolean(row.is_featured),
      }) satisfies Article,
  );
}

export async function getAdminArticle(id: string) {
  if (!isSupabaseConfigured) return MOCK_ARTICLES.find((article) => article.id === id) ?? null;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("articles")
    .select(
      "*,categories(id,name,slug,description),article_tags(tags(id,name,slug)),profiles(id,email,full_name,role)",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt || "",
    content: data.content || "",
    coverImage: data.cover_image_url,
    ogImage: data.og_image_url,
    category: {
      id: data.categories?.id || data.category_id || "",
      name: data.categories?.name || "",
      slug: data.categories?.slug || "",
      description: data.categories?.description || "",
    },
    tags:
      data.article_tags
        ?.map((item: { tags: { id: string; name: string; slug: string } | null }) => item.tags)
        .filter(Boolean) ?? [],
    author: {
      id: data.profiles?.id || "",
      email: data.profiles?.email,
      fullName: data.profiles?.full_name || "Redação",
      slug: "redacao",
    },
    status: data.status,
    publishedAt: data.published_at,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    readingTimeMinutes: data.reading_time_minutes || 1,
    isFeatured: Boolean(data.is_featured),
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
  } satisfies Article;
}

export async function getAdminComments(status?: string) {
  if (!isSupabaseConfigured) {
    return MOCK_COMMENTS.filter((comment) => (status ? comment.status === status : true));
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("comments")
    .select("id,article_id,name,body,status,created_at,articles(title,slug)")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error || !data) return [];

  return data.map((comment) => {
    const articleRelation = Array.isArray(comment.articles) ? comment.articles[0] : comment.articles;

    return {
      id: comment.id,
      articleId: comment.article_id,
      name: comment.name,
      body: comment.body,
      status: comment.status,
      createdAt: comment.created_at,
      articleTitle: articleRelation?.title,
      articleSlug: articleRelation?.slug,
    };
  });
}

export async function getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  if (!isSupabaseConfigured) return MOCK_NEWSLETTER;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("id,email,status,created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((subscriber) => ({
    id: subscriber.id,
    email: subscriber.email,
    status: subscriber.status,
    createdAt: subscriber.created_at,
  }));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const defaults: SiteSettings = {
    site_name: "Dossiê Aberto",
    site_description: "O contexto por trás dos fatos.",
    main_author_name: "Redação Dossiê Aberto",
    contact_email: "",
    footer_text: "Jornalismo claro, sério e contextual.",
    instagram_url: "",
    x_url: "",
  };

  if (!isSupabaseConfigured) return defaults;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return defaults;

  const { data, error } = await supabase.from("site_settings").select("key,value");
  if (error || !data) return defaults;

  return data.reduce((settings, item) => {
    if (item.key in settings) {
      return { ...settings, [item.key]: item.value };
    }
    return settings;
  }, defaults);
}
