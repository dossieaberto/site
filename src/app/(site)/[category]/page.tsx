import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdPlaceholder } from "@/components/public/ad-placeholder";
import { ArticleCard } from "@/components/public/article-card";
import { SITE_NAME } from "@/lib/constants";
import { getArticlesByCategory, getCategories } from "@/lib/data/articles";
import { absoluteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) return {};

  const title = `${category.name} | ${SITE_NAME}`;
  const description = category.description;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/${category.slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${category.slug}`),
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(category.slug);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="border-b border-border pb-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Editoria</p>
        <h1 className="mt-2 text-4xl font-black md:text-5xl">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">{category.description}</p>
      </div>

      <AdPlaceholder label={`Anúncio editoria ${category.name}`} className="mt-6" />

      {articles.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} priority={index < 2} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-lg border border-dashed border-border bg-surface p-6 text-muted-foreground">
          Ainda não há notícias publicadas nesta editoria.
        </p>
      )}
    </main>
  );
}
