import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types/content";

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="grid overflow-hidden border-y border-foreground/20 bg-surface lg:grid-cols-[1.22fr_0.78fr]">
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
          <div className="flex h-full min-h-72 items-center justify-center bg-muted text-sm font-black uppercase tracking-[0.24em] text-muted-foreground lg:min-h-[460px]">
            Dossiê Aberto
          </div>
        )}
      </Link>
      <div className="flex flex-col justify-center p-5 md:p-8">
        <p className="text-[0.7rem] font-black uppercase tracking-[0.22em] text-muted-foreground">Manchete</p>
        <Link href={`/${article.category.slug}`} className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-accent">
          {article.category.name}
        </Link>
        <h1 className="mt-3 font-serif text-4xl font-black leading-[0.96] md:text-5xl">
          <Link href={`/noticias/${article.slug}`} className="hover:text-accent">
            {article.title}
          </Link>
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-muted-foreground">
          <span>{article.author.fullName}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{article.readingTimeMinutes} min</span>
        </div>
      </div>
    </article>
  );
}
