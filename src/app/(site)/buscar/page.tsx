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
  description: "Pesquise matérias, editorias e temas acompanhados pelo Dossiê Aberto.",
  alternates: { canonical: absoluteUrl("/buscar") },
};

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const articles = q ? await searchArticles(q) : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Busca</p>
      <h1 className="mt-2 font-serif text-5xl font-black md:text-6xl">Pesquisar no arquivo editorial</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">
        Procure por temas, nomes, decisões públicas, tecnologias, indicadores ou bastidores já publicados.
      </p>
      <div className="mt-6 max-w-2xl">
        <SearchBar />
      </div>

      {q ? (
        <section className="mt-8">
          <h2 className="font-serif text-2xl font-black">
            {articles.length} resultado{articles.length === 1 ? "" : "s"} para “{q}”
          </h2>
          {articles.length > 0 ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="mt-5 border border-dashed border-border bg-surface p-6">
              <h3 className="font-serif text-2xl font-black">Não encontramos esse recorte</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Tente outro termo, reduza a busca a uma palavra-chave ou explore as editorias no menu.
              </p>
            </div>
          )}
        </section>
      ) : (
        <div className="mt-8 border border-dashed border-border bg-surface p-6">
          <h2 className="font-serif text-2xl font-black">Comece por uma pista</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Digite um assunto, uma instituição, uma tecnologia ou uma palavra ligada à pauta que você quer localizar.
          </p>
        </div>
      )}
    </main>
  );
}
