"use client";

import { useActionState } from "react";
import { Mail } from "lucide-react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/newsletter";

const initialState: NewsletterState = { ok: false, message: "" };

export function NewsletterBox({ compact = false }: { compact?: boolean }) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  return (
    <section className="rounded-md border border-border/85 bg-surface p-5">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Mail aria-hidden size={18} />
        </span>
        <div>
          <h2 className={compact ? "text-lg font-black" : "text-2xl font-black"}>
            Receba contexto no seu e-mail
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Uma seleção das principais análises e bastidores do Dossiê Aberto.
          </p>
        </div>
      </div>

      <form action={formAction} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="newsletter-email">
          E-mail para newsletter
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="seuemail@exemplo.com"
          className="min-h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-accent"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 rounded-lg bg-accent px-5 text-sm font-black text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
      {state.message ? (
        <p className={`mt-3 text-sm font-semibold ${state.ok ? "text-secondary" : "text-accent"}`}>
          {state.message}
        </p>
      ) : null}
    </section>
  );
}
