import type { Metadata } from "next";
import { ArticleCard } from "@/components/public/article-card";
import { SearchBar } from "@/components/public/search-bar";
import { SITE_NAME } from "@/lib/constants";
import { searchArticles } from "@/lib/data/articles";
import { absoluteUrl } from "@/lib/utils";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: `Busca | ${SITE_NAME}`,
  description: "Busque notícias, categorias e tags no Dossiê Aberto.",
  alternates: { canonical: absoluteUrl("/buscar") },
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const articles = q ? await searchArticles(q) : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Busca</p>
      <h1 className="mt-2 text-4xl font-black md:text-5xl">Pesquisar no Dossiê Aberto</h1>
      <div className="mt-6 max-w-2xl">
        <SearchBar />
      </div>

      {q ? (
        <section className="mt-8">
          <h2 className="text-xl font-black">
            {articles.length} resultado{articles.length === 1 ? "" : "s"} para “{q}”
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          {articles.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border bg-surface p-6 text-muted-foreground">
              Nenhuma notícia encontrada para este termo.
            </p>
          ) : null}
        </section>
      ) : (
        <p className="mt-8 rounded-lg border border-dashed border-border bg-surface p-6 text-muted-foreground">
          Digite um termo para buscar por título, resumo, conteúdo, categoria ou tags.
        </p>
      )}
    </main>
  );
}
