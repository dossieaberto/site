"use client";

import { useActionState } from "react";
import { Mail } from "lucide-react";
import { subscribeNewsletter, type NewsletterState } from "@/app/actions/newsletter";

const initialState: NewsletterState = { ok: false, message: "" };

export function NewsletterBox({ compact = false }: { compact?: boolean }) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  return (
    <section className="border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Mail aria-hidden size={18} />
        </span>
        <div>
          <h2 className={compact ? "font-serif text-xl font-black" : "font-serif text-3xl font-black"}>
            Uma seleção com mais contexto
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Receba fatos, bastidores e análises para ler a semana sem depender apenas da manchete.
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
          placeholder="seu e-mail"
          className="min-h-11 border border-border bg-background px-3 text-sm outline-none transition focus:border-accent"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 bg-accent px-5 text-sm font-black text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Enviando..." : "Assinar"}
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
