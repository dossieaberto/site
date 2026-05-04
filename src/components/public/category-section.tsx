import Link from "next/link";
import type { Article, Category } from "@/types/content";
import { ArticleCard } from "./article-card";

export function CategorySection({ category, articles }: { category: Category; articles: Article[] }) {
  if (!articles.length) return null;

  return (
    <section className="mt-12">
      <div className="mb-4 flex items-end justify-between gap-4 border-b border-border pb-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Editorias</p>
          <h2 className="text-2xl font-black">{category.name}</h2>
        </div>
        <Link href={`/${category.slug}`} className="text-sm font-black text-muted-foreground hover:text-accent">
          Ver mais
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
