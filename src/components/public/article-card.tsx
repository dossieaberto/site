import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/content";

export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <article className="group overflow-hidden border-b border-border pb-5 transition last:border-b-0 sm:border sm:bg-surface sm:pb-0 sm:hover:border-foreground/30">
      <Link href={`/noticias/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.025]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
              Dossiê
            </div>
          )}
        </div>
      </Link>
      <div className="pt-4 sm:p-4">
        <Link href={`/${article.category.slug}`} className="text-[0.7rem] font-black uppercase tracking-[0.18em] text-accent">
          {article.category.name}
        </Link>
        <h3 className="mt-2 font-serif text-2xl font-black leading-[1.05]">
          <Link href={`/noticias/${article.slug}`} className="hover:text-accent">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span>{formatDate(article.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{article.readingTimeMinutes} min de leitura</span>
        </div>
      </div>
    </article>
  );
}
