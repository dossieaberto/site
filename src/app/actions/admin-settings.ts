"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type SettingsState = {
  ok: boolean;
  message: string;
};

const schema = z.object({
  site_name: z.string().trim().min(2),
  site_description: z.string().trim().min(10),
  main_author_name: z.string().trim().min(2),
  contact_email: z.string().trim().optional(),
  footer_text: z.string().trim().min(10),
  instagram_url: z.string().trim().optional(),
  x_url: z.string().trim().optional(),
});

export async function saveSettingsAction(
  _previousState: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  await requireAdmin();

  const parsed = schema.safeParse({
    site_name: String(formData.get("site_name") || ""),
    site_description: String(formData.get("site_description") || ""),
    main_author_name: String(formData.get("main_author_name") || ""),
    contact_email: String(formData.get("contact_email") || ""),
    footer_text: String(formData.get("footer_text") || ""),
    instagram_url: String(formData.get("instagram_url") || ""),
    x_url: String(formData.get("x_url") || ""),
  });

  if (!parsed.success) {
    return { ok: false, message: "Confira os campos obrigatórios." };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, message: "Supabase não configurado." };

  const rows = Object.entries(parsed.data).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) return { ok: false, message: "Não foi possível salvar as configurações." };

  revalidatePath("/");
  return { ok: true, message: "Configurações salvas." };
}
