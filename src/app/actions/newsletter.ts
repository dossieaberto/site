"use server";

import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type NewsletterState = {
  ok: boolean;
  message: string;
};

const schema = z.object({
  email: z.email("Informe um e-mail válido."),
});

export async function subscribeNewsletter(
  _previousState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = schema.safeParse({
    email: String(formData.get("email") || "").trim().toLowerCase(),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "E-mail inválido." };
  }

  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: "Newsletter pronta. Configure o Supabase para salvar inscrições reais.",
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, message: "Supabase não configurado." };

  const { error } = await supabase.from("newsletter_subscribers").insert({
    email: parsed.data.email,
    status: "active",
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: true, message: "Este e-mail já está cadastrado na newsletter." };
    }

    return { ok: false, message: "Não foi possível cadastrar agora. Tente novamente." };
  }

  return { ok: true, message: "Cadastro recebido. Obrigado por acompanhar o Dossiê Aberto." };
}
