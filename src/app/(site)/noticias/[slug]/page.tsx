import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdPlaceholder } from "@/components/public/ad-placeholder";
import { ArticleCard } from "@/components/public/article-card";
import { CommentForm } from "@/components/public/comment-form";
import { CommentsList } from "@/components/public/comments-list";
import { MarkdownRenderer } from "@/components/public/markdown-renderer";
import { ShareButtons } from "@/components/public/share-buttons";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import {
  getApprovedComments,
  getArticleBySlug,
  getPublishedArticles,
  getRelatedArticles,
  recordArticleView,
} from "@/lib/data/articles";
import { absoluteUrl, formatDate, getArticleUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getPublishedArticles(60);
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const url = getArticleUrl(article.slug);
  const image = article.ogImage || article.coverImage || absoluteUrl("/icon.svg");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime: article.publishedAt || undefined,
      modifiedTime: article.updatedAt,
      authors: [article.author.fullName],
      tags: article.tags.map((tag) => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [related, comments] = await Promise.all([
    getRelatedArticles(article, 3),
    getApprovedComments(article.id),
  ]);
  void recordArticleView(article.id);

  const articleUrl = getArticleUrl(article.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.ogImage || article.coverImage || absoluteUrl("/icon.svg"),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author.fullName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg"),
      },
    },
    mainEntityOfPage: articleUrl,
  };

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_320px] lg:items-start">
        <main>
          <Link href={`/${article.category.slug}`} className="text-xs font-black uppercase tracking-[0.2em] text-accent">
            {article.category.name}
          </Link>
          <h1 className="mt-3 text-4xl font-black leading-none md:text-6xl">{article.title}</h1>
          <p className="mt-5 text-xl leading-8 text-muted-foreground">{article.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-muted-foreground">
            <Link href={`/autor/${article.author.slug}`} className="hover:text-accent">
              {article.author.fullName}
            </Link>
            <span aria-hidden>-</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span aria-hidden>-</span>
            <span>{article.readingTimeMinutes} min de leitura</span>
          </div>

          <div className="mt-6">
            <ShareButtons title={article.title} url={articleUrl} />
          </div>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            {article.coverImage ? (
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-black uppercase tracking-[0.24em] text-muted-foreground">
                Dossiê Aberto
              </div>
            )}
          </div>

          <AdPlaceholder label="Anúncio dentro da matéria" className="mt-8" />

          <div className="mt-8 border-t border-border pt-2 text-lg">
            <MarkdownRenderer content={article.content} />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}`}
                className="rounded-full border border-border bg-surface px-3 py-2 text-sm font-bold hover:border-accent hover:text-accent"
              >
                #{tag.name}
              </Link>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-black">Comentários</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Comentários são moderados antes de aparecer publicamente.
            </p>
            <CommentForm articleId={article.id} articleSlug={article.slug} />
            <CommentsList comments={comments} />
          </section>
        </main>

        <aside className="space-y-5">
          <AdPlaceholder label="Anúncio lateral da matéria" />
          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-lg font-black">Relacionadas</h2>
            <div className="mt-4 space-y-4">
              {related.map((item) => (
                <Link key={item.id} href={`/noticias/${item.slug}`} className="block font-black leading-6 hover:text-accent">
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-black">Continue lendo</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
