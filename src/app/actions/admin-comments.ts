"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function updateCommentStatusAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  const articleSlug = String(formData.get("articleSlug") || "");

  if (!id || !["approved", "rejected", "pending"].includes(status)) return;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return;

  await supabase.from("comments").update({ status }).eq("id", id);
  revalidatePath("/admin/comments");
  if (articleSlug) revalidatePath(`/noticias/${articleSlug}`);
}

export async function deleteCommentAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") || "");
  if (!id) return;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return;

  await supabase.from("comments").delete().eq("id", id);
  revalidatePath("/admin/comments");
}
