"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export function PushPrompt() {
  const [message, setMessage] = useState("");

  async function requestPermission() {
    if (!("Notification" in window)) {
      setMessage("Seu navegador não oferece suporte a notificações.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      setMessage("Tudo bem. Você pode seguir acompanhando as matérias pelo site.");
      return;
    }

    setMessage("Permissão concedida. O envio será ativado quando as notificações forem configuradas.");
  }

  return (
    <section className="border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
          <Bell aria-hidden size={18} />
        </span>
        <div>
          <h2 className="font-serif text-xl font-black">Alertas editoriais</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Receba aviso quando uma matéria importante for publicada. O envio ainda depende da configuração final.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={requestPermission}
        className="mt-4 border border-border px-4 py-2 text-sm font-black hover:border-secondary hover:text-secondary"
      >
        Permitir notificações
      </button>
      {message ? <p className="mt-3 text-sm font-semibold text-muted-foreground">{message}</p> : null}
    </section>
  );
}
