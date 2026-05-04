import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/content";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="grid overflow-hidden rounded-md border border-border/85 bg-surface lg:grid-cols-[1.25fr_0.75fr]">
      <Link href={`/noticias/${article.slug}`} className="relative min-h-72 overflow-hidden bg-muted lg:min-h-[460px]">
        {article.coverImage ? (
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 1024px) 65vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full min-h-72 items-center justify-center bg-[linear-gradient(135deg,var(--muted),var(--surface))] text-sm font-black uppercase tracking-[0.24em] text-muted-foreground lg:min-h-[460px]">
            Dossiê Aberto
          </div>
        )}
      </Link>
      <div className="flex flex-col justify-center p-6 md:p-8">
        <Link href={`/${article.category.slug}`} className="text-xs font-black uppercase tracking-[0.2em] text-accent">
          {article.category.name}
        </Link>
        <h1 className="mt-3 text-4xl font-black leading-[1.02] md:text-5xl">
          <Link href={`/noticias/${article.slug}`} className="hover:text-accent">
            {article.title}
          </Link>
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-muted-foreground">
          <span>{article.author.fullName}</span>
          <span aria-hidden>-</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span aria-hidden>-</span>
          <span>{article.readingTimeMinutes} min</span>
        </div>
      </div>
    </article>
  );
}
