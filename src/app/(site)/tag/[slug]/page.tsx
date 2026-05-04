import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/public/article-card";
import { SITE_NAME } from "@/lib/constants";
import { getArticlesByTag, getTags } from "@/lib/data/articles";
import { absoluteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find((item) => item.slug === slug);
  const title = `${tag?.name || "Tag"} | ${SITE_NAME}`;

  return {
    title,
    description: `Notícias marcadas com ${tag?.name || slug} no Dossiê Aberto.`,
    alternates: { canonical: absoluteUrl(`/tag/${slug}`) },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find((item) => item.slug === slug);
  if (!tag) notFound();

  const articles = await getArticlesByTag(tag.slug);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Tag</p>
      <h1 className="mt-2 font-serif text-5xl font-black md:text-6xl">#{tag.name}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">
        Matérias, bastidores e análises relacionadas a {tag.name.toLowerCase()}.
      </p>

      {articles.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-border bg-surface p-6">
          <h2 className="font-serif text-2xl font-black">Nenhuma matéria marcada com esta tag</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A tag existe no arquivo editorial, mas ainda não reúne publicações disponíveis ao leitor.
          </p>
        </div>
      )}
    </main>
  );
}
