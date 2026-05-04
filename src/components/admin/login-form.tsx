"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/actions/admin-auth";

const initialState: LoginState = { ok: false, message: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-bold">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-bold">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent"
        />
      </div>
      {state.message ? <p className="text-sm font-semibold text-accent">{state.message}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full bg-accent px-4 text-sm font-black text-accent-foreground transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar no painel"}
      </button>
    </form>
  );
}
