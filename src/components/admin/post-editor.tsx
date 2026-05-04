"use client";

import { useActionState, useMemo, useState } from "react";
import { savePostAction, type AdminActionState } from "@/app/actions/admin-posts";
import { MarkdownRenderer } from "@/components/public/markdown-renderer";
import { slugify } from "@/lib/utils";
import type { Article, Category } from "@/types/content";

const initialState: AdminActionState = { ok: false, message: "" };

export function PostEditor({ article, categories }: { article?: Article | null; categories: Category[] }) {
  const [state, formAction, pending] = useActionState(savePostAction, initialState);
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [content, setContent] = useState(article?.content || "");

  const autoSlug = useMemo(() => slugify(title), [title]);

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {article?.id ? <input type="hidden" name="id" value={article.id} /> : null}

      <div className="space-y-5">
        <section className="border border-border bg-surface p-5">
          <label htmlFor="title" className="text-sm font-black">
            Título
          </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="mt-2 h-12 w-full border border-border bg-background px-3 text-lg font-black outline-none focus:border-accent"
          />

          <label htmlFor="slug" className="mt-4 block text-sm font-black">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            placeholder={autoSlug}
            className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          />

          <label htmlFor="excerpt" className="mt-4 block text-sm font-black">
            Resumo
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            defaultValue={article?.excerpt}
            required
            rows={3}
            className="mt-2 w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-accent"
          />
        </section>

        <section className="border border-border bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-black">Editor Markdown</h2>
            <p className="text-xs font-semibold text-muted-foreground">
              Use Markdown para intertítulos, links, imagens, listas e citações.
            </p>
          </div>
          <textarea
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            rows={18}
            className="mt-4 w-full border border-border bg-background px-3 py-3 font-mono text-sm leading-6 outline-none focus:border-accent"
          />
        </section>

        <section className="border border-border bg-surface p-5">
          <h2 className="text-lg font-black">Prévia da matéria</h2>
          <div className="mt-3 border border-border bg-background p-4">
            <MarkdownRenderer content={content || "Escreva o texto para visualizar a leitura antes da publicação."} />
          </div>
        </section>
      </div>

      <aside className="space-y-5">
        <section className="border border-border bg-surface p-5">
          <h2 className="text-lg font-black">Publicação</h2>
          <label htmlFor="status" className="mt-4 block text-sm font-black">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={article?.status || "draft"}
            className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="archived">Arquivado</option>
          </select>

          <label htmlFor="categoryId" className="mt-4 block text-sm font-black">
            Categoria
          </label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={article?.category.id || categories[0]?.id}
            required
            className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label className="mt-4 flex items-center gap-2 text-sm font-black">
            <input type="checkbox" name="isFeatured" defaultChecked={article?.isFeatured} />
            Destaque na capa
          </label>

          {state.message ? <p className="mt-3 text-sm font-semibold text-accent">{state.message}</p> : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-5 h-11 w-full bg-accent px-4 text-sm font-black text-accent-foreground hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Salvando..." : "Salvar matéria"}
          </button>
        </section>

        <section className="border border-border bg-surface p-5">
          <h2 className="text-lg font-black">Imagem de capa</h2>
          <label htmlFor="coverFile" className="mt-4 block text-sm font-black">
            Upload de capa
          </label>
          <input id="coverFile" name="coverFile" type="file" accept="image/*" className="mt-2 text-sm" />

          <label htmlFor="coverImageUrl" className="mt-4 block text-sm font-black">
            URL de capa
          </label>
          <input
            id="coverImageUrl"
            name="coverImageUrl"
            defaultValue={article?.coverImage || ""}
            className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          />
        </section>

        <section className="border border-border bg-surface p-5">
          <h2 className="text-lg font-black">Tags e SEO</h2>
          <label htmlFor="tags" className="mt-4 block text-sm font-black">
            Tags separadas por vírgula
          </label>
          <input
            id="tags"
            name="tags"
            defaultValue={article?.tags.map((tag) => tag.name).join(", ")}
            className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          />

          <label htmlFor="seoTitle" className="mt-4 block text-sm font-black">
            Título SEO
          </label>
          <input
            id="seoTitle"
            name="seoTitle"
            defaultValue={article?.seoTitle || ""}
            className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          />

          <label htmlFor="seoDescription" className="mt-4 block text-sm font-black">
            Descrição SEO
          </label>
          <textarea
            id="seoDescription"
            name="seoDescription"
            defaultValue={article?.seoDescription || ""}
            rows={3}
            className="mt-2 w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-accent"
          />

          <label htmlFor="ogImageUrl" className="mt-4 block text-sm font-black">
            Imagem Open Graph
          </label>
          <input
            id="ogImageUrl"
            name="ogImageUrl"
            defaultValue={article?.ogImage || ""}
            className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          />
        </section>
      </aside>
    </form>
  );
}
