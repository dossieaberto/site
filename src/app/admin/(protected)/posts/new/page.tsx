import { PostEditor } from "@/components/admin/post-editor";
import { getCategories } from "@/lib/data/articles";

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Nova notícia</p>
      <h1 className="mb-6 text-3xl font-black">Criar notícia</h1>
      <PostEditor categories={categories} />
    </div>
  );
}
