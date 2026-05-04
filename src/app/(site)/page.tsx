import Link from "next/link";
import { AdPlaceholder } from "@/components/public/ad-placeholder";
import { ArticleCard } from "@/components/public/article-card";
import { CategorySection } from "@/components/public/category-section";
import { FeaturedArticle } from "@/components/public/featured-article";
import { NewsletterBox } from "@/components/public/newsletter-box";
import { LogoSymbol } from "@/components/public/logo-symbol";
import { PushPrompt } from "@/components/public/push-prompt";
import { SearchBar } from "@/components/public/search-bar";
import { EDITORIAL_PILLARS, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/constants";
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
      <AdPlaceholder label="Anúncio topo da home" />

      <section className="grid gap-6 py-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <div>
          <div className="flex items-center gap-3">
            <LogoSymbol size="lg" priority />
            <p className="text-xs font-black uppercase tracking-[0.24em] text-accent">{SITE_TAGLINE}</p>
          </div>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-none md:text-6xl">
            Notícias com bastidores, contexto e análise.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{SITE_DESCRIPTION}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {EDITORIAL_PILLARS.map((pillar) => (
              <Link
                key={pillar}
                href={`/tag/${pillar.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-black hover:border-accent hover:text-accent"
              >
                {pillar}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.18em]">Buscar no Dossiê</h2>
          <div className="mt-3">
            <SearchBar />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="rounded-lg border border-border px-3 py-3 text-sm font-bold hover:border-accent hover:text-accent"
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
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Últimas notícias</p>
              <h2 className="text-2xl font-black">Acompanhe agora</h2>
            </div>
            <Link href="/buscar" className="text-sm font-black text-muted-foreground hover:text-accent">
              Ver busca
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {latestArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} priority={index < 2} />
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <AdPlaceholder label="Anúncio lateral" />
          <section className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-lg font-black">Mais lidas</h2>
            <div className="mt-4 space-y-4">
              {mostRead.map((article, index) => (
                <Link key={article.id} href={`/noticias/${article.slug}`} className="flex gap-3 group">
                  <span className="text-2xl font-black text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-black leading-5 group-hover:text-accent">{article.title}</span>
                </Link>
              ))}
            </div>
          </section>
          <NewsletterBox compact />
          <PushPrompt />
        </aside>
      </section>

      <AdPlaceholder label="Anúncio entre blocos" className="mt-12" />

      {categoryBlocks.map(({ category, articles }) => (
        <CategorySection key={category.slug} category={category} articles={articles} />
      ))}

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {EDITORIAL_PILLARS.map((pillar) => (
          <article key={pillar} className="rounded-lg border border-border bg-surface p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Linha editorial</p>
            <h2 className="mt-2 text-xl font-black">{pillar}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {pillar === "Bastidores"
                ? "O que acontece antes das decisões chegarem ao público."
                : pillar === "Contexto"
                  ? "As conexões necessárias para entender a notícia além do título."
                  : "Leitura clara, responsável e baseada em fatos."}
            </p>
          </article>
        ))}
      </section>

      <AdPlaceholder label="Anúncio rodapé da home" className="mt-12" />
    </div>
  );
}
