import { PostEditor } from "@/components/admin/post-editor";
import { getCategories } from "@/lib/data/articles";

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Nova matéria</p>
      <h1 className="mb-2 font-serif text-4xl font-black">Abrir rascunho</h1>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-muted-foreground">
        Estruture título, resumo, corpo, imagem e SEO antes de publicar.
      </p>
      <PostEditor categories={categories} />
    </div>
  );
}
