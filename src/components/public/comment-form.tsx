"use client";

import { useActionState } from "react";
import { submitComment, type CommentState } from "@/app/actions/comments";

const initialState: CommentState = { ok: false, message: "" };

export function CommentForm({ articleId, articleSlug }: { articleId: string; articleSlug: string }) {
  const [state, formAction, pending] = useActionState(submitComment, initialState);

  return (
    <form action={formAction} className="mt-6 rounded-lg border border-border bg-surface p-5">
      <input type="hidden" name="articleId" value={articleId} />
      <input type="hidden" name="articleSlug" value={articleSlug} />
      <input className="hidden" tabIndex={-1} autoComplete="off" name="website" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-bold" htmlFor="comment-name">
            Nome
          </label>
          <input
            id="comment-name"
            name="name"
            required
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-sm font-bold" htmlFor="comment-email">
            E-mail
          </label>
          <input
            id="comment-email"
            name="email"
            type="email"
            required
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-accent"
          />
          <p className="mt-1 text-xs text-muted-foreground">Seu e-mail não será exibido.</p>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-sm font-bold" htmlFor="comment-body">
          Comentário
        </label>
        <textarea
          id="comment-body"
          name="body"
          required
          minLength={10}
          rows={5}
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:border-accent"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-accent px-5 py-3 text-sm font-black text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Enviando..." : "Enviar para moderação"}
        </button>
        {state.message ? (
          <p className={`text-sm font-semibold ${state.ok ? "text-secondary" : "text-accent"}`}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
