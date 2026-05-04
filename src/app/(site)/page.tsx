import Link from "next/link";
import { AdPlaceholder } from "@/components/public/ad-placeholder";
import { ArticleCard } from "@/components/public/article-card";
import { CategorySection } from "@/components/public/category-section";
import { FeaturedArticle } from "@/components/public/featured-article";
import { NewsletterBox } from "@/components/public/newsletter-box";
import { PushPrompt } from "@/components/public/push-prompt";
import { SearchBar } from "@/components/public/search-bar";
import { EDITORIAL_PILLAR_COPY, EDITORIAL_PILLARS, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/constants";
import {
  getArticlesByCategory,
  getCategories,
  getFeaturedArticle,
  getMostReadArticles,
  getPublishedArticles,
} from "@/lib/data/articles";

export default async function HomePage() {
  const [featured, latestArticles, categories, mostRead] = await Promise.all([
    getFeaturedArticle(),
    getPublishedArticles(9),
    getCategories(),
    getMostReadArticles(5),
  ]);

  const categoryBlocks = await Promise.all(
    categories.map(async (category) => ({
      category,
      articles: await getArticlesByCategory(category.slug, 3),
    })),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <AdPlaceholder label="Espaço superior reservado para campanha institucional ou anúncio" />

      <section className="grid gap-7 border-b border-foreground/20 py-9 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">
            {SITE_TAGLINE}
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl font-black leading-[0.94] md:text-7xl">
            Toda manchete tem um entorno.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            {SITE_DESCRIPTION} O Dossiê Aberto observa decisões, interesses e consequências antes que
            elas se percam no ruído do dia.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {EDITORIAL_PILLARS.map((pillar) => (
              <Link
                key={pillar}
                href={`/tag/${pillar.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="border border-border bg-surface px-4 py-2 text-sm font-black hover:border-accent hover:text-accent"
              >
                {pillar}
              </Link>
            ))}
          </div>
        </div>

        <div className="border border-border bg-surface p-4">
          <h2 className="text-sm font-black uppercase tracking-[0.18em]">Localize uma pauta</h2>
          <div className="mt-3">
            <SearchBar />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="border border-border px-3 py-3 text-sm font-bold hover:border-accent hover:text-accent"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured ? <FeaturedArticle article={featured} /> : null}

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4 border-b border-foreground/20 pb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Em pauta</p>
              <h2 className="font-serif text-3xl font-black">Leituras recentes</h2>
            </div>
            <Link href="/buscar" className="text-sm font-black text-muted-foreground hover:text-accent">
              Buscar no arquivo
            </Link>
          </div>
          {latestArticles.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {latestArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} priority={index < 2} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border bg-surface p-6">
              <h3 className="font-serif text-2xl font-black">A capa ainda não tem matérias publicadas</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Assim que a primeira publicação for aprovada, ela aparecerá nesta área.
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <AdPlaceholder label="Formato lateral para publicidade" />
          <section className="border border-border bg-surface p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Leitura do dia</p>
            <h2 className="mt-1 font-serif text-2xl font-black">Mais consultadas</h2>
            <div className="mt-4 space-y-4">
              {mostRead.length > 0 ? (
                mostRead.map((article, index) => (
                  <Link key={article.id} href={`/noticias/${article.slug}`} className="flex gap-3 group">
                    <span className="font-serif text-3xl font-black text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-black leading-5 group-hover:text-accent">{article.title}</span>
                  </Link>
                ))
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">
                  As leituras mais consultadas aparecerão depois das primeiras publicações.
                </p>
              )}
            </div>
          </section>
          <NewsletterBox compact />
          <PushPrompt />
        </aside>
      </section>

      <AdPlaceholder label="Espaço entre editorias" className="mt-12" />

      {categoryBlocks.map(({ category, articles }) => (
        <CategorySection key={category.slug} category={category} articles={articles} />
      ))}

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {EDITORIAL_PILLARS.map((pillar) => (
          <article key={pillar} className="border-t border-foreground/20 bg-surface p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Linha editorial</p>
            <h2 className="mt-2 font-serif text-2xl font-black">{pillar}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {EDITORIAL_PILLAR_COPY[pillar]}
            </p>
          </article>
        ))}
      </section>

      <AdPlaceholder label="Espaço inferior reservado para publicidade" className="mt-12" />
    </div>
  );
}
