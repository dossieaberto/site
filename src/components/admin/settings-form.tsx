"use client";

import { useActionState } from "react";
import { saveSettingsAction, type SettingsState } from "@/app/actions/admin-settings";
import type { SiteSettings } from "@/types/content";

const initialState: SettingsState = { ok: false, message: "" };

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState(saveSettingsAction, initialState);

  return (
    <form action={formAction} className="max-w-3xl space-y-5 rounded-lg border border-border bg-surface p-5">
      {[
        ["site_name", "Nome do site"],
        ["site_description", "Descrição do site"],
        ["main_author_name", "Nome do autor principal"],
        ["contact_email", "E-mail de contato"],
        ["footer_text", "Texto do rodapé"],
        ["instagram_url", "Link do Instagram"],
        ["x_url", "Link do X"],
      ].map(([name, label]) => (
        <div key={name}>
          <label htmlFor={name} className="text-sm font-black">
            {label}
          </label>
          {name.includes("description") || name.includes("footer") ? (
            <textarea
              id={name}
              name={name}
              defaultValue={settings[name as keyof SiteSettings]}
              rows={3}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:border-accent"
            />
          ) : (
            <input
              id={name}
              name={name}
              defaultValue={settings[name as keyof SiteSettings]}
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-accent"
            />
          )}
        </div>
      ))}

      {state.message ? (
        <p className={`text-sm font-semibold ${state.ok ? "text-secondary" : "text-accent"}`}>
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent px-5 py-3 text-sm font-black text-accent-foreground hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Salvando..." : "Salvar configurações"}
      </button>
    </form>
  );
}
