import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/public/article-card";
import { SITE_NAME } from "@/lib/constants";
import { getArticlesByAuthor } from "@/lib/data/articles";
import { absoluteUrl, initials } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticlesByAuthor(slug);
  const author = articles[0]?.author;
  if (!author) return {};

  return {
    title: `${author.fullName} | ${SITE_NAME}`,
    description: `Matérias de ${author.fullName} no Dossiê Aberto.`,
    alternates: { canonical: absoluteUrl(`/autor/${slug}`) },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const articles = await getArticlesByAuthor(slug);
  const author = articles[0]?.author;
  if (!author) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <div className="flex items-center gap-4 border-b border-foreground/20 pb-6">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-xl font-black text-white">
          {initials(author.fullName)}
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Autor</p>
          <h1 className="font-serif text-4xl font-black md:text-5xl">{author.fullName}</h1>
          {author.bio ? <p className="mt-2 text-muted-foreground">{author.bio}</p> : null}
        </div>
      </div>

      {articles.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-dashed border-border bg-surface p-6">
          <h2 className="font-serif text-2xl font-black">Sem matérias publicadas por este autor</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Quando novas publicações forem associadas a esta assinatura, elas aparecerão aqui.
          </p>
        </div>
      )}
    </main>
  );
}
