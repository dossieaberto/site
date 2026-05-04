"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { estimateReadingTime, slugify } from "@/lib/utils";

export type AdminActionState = {
  ok: boolean;
  message: string;
};

const postSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(5, "Título muito curto."),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().min(20, "Resumo muito curto."),
  content: z.string().trim().min(80, "Conteúdo muito curto."),
  categoryId: z.string().min(1, "Selecione uma categoria."),
  status: z.enum(["draft", "published", "archived"]),
  isFeatured: z.boolean(),
  coverImageUrl: z.string().trim().optional(),
  seoTitle: z.string().trim().optional(),
  seoDescription: z.string().trim().optional(),
  ogImageUrl: z.string().trim().optional(),
  tags: z.array(z.string().trim().min(1)).max(12),
});

async function uploadCoverImage(file: File | null, slug: string) {
  if (!file || file.size === 0) return null;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const extension = file.name.split(".").pop() || "jpg";
  const path = `${slug}/${Date.now()}.${extension}`;

  const { error } = await supabase.storage.from("article-images").upload(path, file, {
    cacheControl: "3600",
    contentType: file.type || "image/jpeg",
    upsert: false,
  });

  if (error) return null;

  const { data } = supabase.storage.from("article-images").getPublicUrl(path);
  return data.publicUrl;
}

async function syncTags(articleId: string, tagNames: string[]) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return;

  await supabase.from("article_tags").delete().eq("article_id", articleId);

  const tagRows = [];
  for (const name of tagNames) {
    const slug = slugify(name);
    if (!slug) continue;

    const { data, error } = await supabase
      .from("tags")
      .upsert({ name, slug }, { onConflict: "slug" })
      .select("id")
      .single();

    if (!error && data) {
      tagRows.push({ article_id: articleId, tag_id: data.id });
    }
  }

  if (tagRows.length > 0) {
    await supabase.from("article_tags").insert(tagRows);
  }
}

export async function savePostAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const admin = await requireAdmin();

  if (!isSupabaseConfigured) {
    return { ok: false, message: "Configure o Supabase para salvar matérias." };
  }

  const parsed = postSchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    categoryId: String(formData.get("categoryId") || ""),
    status: String(formData.get("status") || "draft"),
    isFeatured: formData.get("isFeatured") === "on",
    coverImageUrl: String(formData.get("coverImageUrl") || ""),
    seoTitle: String(formData.get("seoTitle") || ""),
    seoDescription: String(formData.get("seoDescription") || ""),
    ogImageUrl: String(formData.get("ogImageUrl") || ""),
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "Confira os campos." };
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) return { ok: false, message: "Não foi possível abrir a conexão com o banco." };

  const articleSlug = slugify(parsed.data.slug || parsed.data.title);
  const uploadedCover = await uploadCoverImage(formData.get("coverFile") as File | null, articleSlug);
  const coverImageUrl = uploadedCover || parsed.data.coverImageUrl || null;
  const ogImageUrl = parsed.data.ogImageUrl || coverImageUrl;
  const now = new Date().toISOString();

  const payload = {
    title: parsed.data.title,
    slug: articleSlug,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    cover_image_url: coverImageUrl,
    category_id: parsed.data.categoryId,
    author_id: admin.user.id,
    status: parsed.data.status,
    is_featured: parsed.data.isFeatured,
    reading_time_minutes: estimateReadingTime(parsed.data.content),
    seo_title: parsed.data.seoTitle || parsed.data.title,
    seo_description: parsed.data.seoDescription || parsed.data.excerpt,
    og_image_url: ogImageUrl,
    published_at: parsed.data.status === "published" ? now : null,
    updated_at: now,
  };

  const { data, error } = parsed.data.id
    ? await supabase.from("articles").update(payload).eq("id", parsed.data.id).select("id,slug").single()
    : await supabase
        .from("articles")
        .insert({ ...payload, created_at: now })
        .select("id,slug")
        .single();

  if (error || !data) {
    return { ok: false, message: error?.message || "Não foi possível salvar a matéria." };
  }

  await syncTags(data.id, parsed.data.tags);

  revalidatePath("/");
  revalidatePath("/rss.xml");
  revalidatePath("/sitemap.xml");
  revalidatePath(`/noticias/${data.slug}`);
  revalidatePath("/admin/posts");

  redirect(`/admin/posts/${data.id}/edit?salvo=1`);
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return;

  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function setPostStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "draft");
  if (!id || !["draft", "published", "archived"].includes(status)) return;

  const supabase = await createServerSupabaseClient();
  if (!supabase) return;

  await supabase
    .from("articles")
    .update({
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/posts");
}
