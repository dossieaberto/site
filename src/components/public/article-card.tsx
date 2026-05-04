import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/content";

export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-md border border-border/85 bg-surface transition hover:border-accent/70">
      <Link href={`/noticias/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,var(--muted),var(--surface))] text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
              Dossiê
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/${article.category.slug}`} className="text-xs font-black uppercase tracking-[0.16em] text-accent">
          {article.category.name}
        </Link>
        <h3 className="mt-2 text-xl font-black leading-snug">
          <Link href={`/noticias/${article.slug}`} className="hover:text-accent">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span>{formatDate(article.publishedAt)}</span>
          <span aria-hidden>-</span>
          <span>{article.readingTimeMinutes} min de leitura</span>
        </div>
      </div>
    </article>
  );
}
