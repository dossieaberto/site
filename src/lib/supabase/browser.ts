"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/config";

export function createBrowserSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase não configurado. Defina as variáveis de ambiente públicas.");
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
