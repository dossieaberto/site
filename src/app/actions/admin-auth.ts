"use server";

import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type LoginState = {
  ok: boolean;
  message: string;
};

export async function loginAdmin(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { ok: false, message: "Informe e-mail e senha." };
  }

  if (!isSupabaseConfigured) {
    return {
      ok: false,
      message: "Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para ativar o login.",
    };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, message: "Supabase não configurado." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: "Credenciais inválidas." };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { ok: false, message: "Não foi possível confirmar o usuário." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    return { ok: false, message: "Usuário sem permissão de administrador." };
  }

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const supabase = await createServerSupabaseClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}
