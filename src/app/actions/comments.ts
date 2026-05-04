"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CommentState = {
  ok: boolean;
  message: string;
};

const schema = z.object({
  articleId: z.string().min(1, "Matéria inválida."),
  articleSlug: z.string().min(1),
  name: z.string().trim().min(2, "Informe seu nome.").max(80, "Nome muito longo."),
  email: z.email("Informe um e-mail válido.").max(160),
  body: z.string().trim().min(10, "Escreva um comentário com pelo menos 10 caracteres.").max(1200),
  website: z.string().max(0),
});

export async function submitComment(
  _previousState: CommentState,
  formData: FormData,
): Promise<CommentState> {
  const parsed = schema.safeParse({
    articleId: String(formData.get("articleId") || ""),
    articleSlug: String(formData.get("articleSlug") || ""),
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || "").trim().toLowerCase(),
    body: String(formData.get("body") || ""),
    website: String(formData.get("website") || ""),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "Confira os campos." };
  }

  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: "Comentários prontos. Configure o Supabase para salvar moderação real.",
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, message: "Supabase não configurado." };

  const { articleId, articleSlug, name, email, body } = parsed.data;
  const { error } = await supabase.from("comments").insert({
    article_id: articleId,
    name,
    email,
    body,
    status: "pending",
  });

  if (error) {
    return { ok: false, message: "Não foi possível enviar o comentário agora." };
  }

  revalidatePath(`/noticias/${articleSlug}`);
  return {
    ok: true,
    message: "Comentário enviado para moderação. Ele aparecerá após aprovação.",
  };
}
