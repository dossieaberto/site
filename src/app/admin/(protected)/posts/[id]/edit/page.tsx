import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import { getAdminArticle } from "@/lib/data/admin";
import { getCategories } from "@/lib/data/articles";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const [article, categories] = await Promise.all([getAdminArticle(id), getCategories()]);
  if (!article) notFound();

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Editar notícia</p>
      <h1 className="mb-6 text-3xl font-black">{article.title}</h1>
      <PostEditor article={article} categories={categories} />
    </div>
  );
}
