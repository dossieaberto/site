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
      setMessage("Permissão não concedida.");
      return;
    }

    setMessage("Permissão concedida. Os alertas serão ativados quando a configuração estiver concluída.");
  }

  return (
    <section className="rounded-md border border-border/85 bg-surface p-5">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Bell aria-hidden size={18} />
        </span>
        <div>
          <h2 className="text-lg font-black">Alertas de novas matérias</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Receba avisos quando a redação publicar uma nova cobertura relevante.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={requestPermission}
        className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-black hover:border-secondary hover:text-secondary"
      >
        Permitir notificações
      </button>
      {message ? <p className="mt-3 text-sm font-semibold text-muted-foreground">{message}</p> : null}
    </section>
  );
}
