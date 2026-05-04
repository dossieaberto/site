import Link from "next/link";
import { deletePostAction, setPostStatusAction } from "@/app/actions/admin-posts";
import { StatusBadge } from "@/components/admin/status-badge";
import { getAdminArticles } from "@/lib/data/admin";
import { formatDateTime } from "@/lib/utils";

export default async function AdminPostsPage() {
  const articles = await getAdminArticles();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Matérias</p>
          <h1 className="font-serif text-4xl font-black">Arquivo editorial</h1>
        </div>
        <Link href="/admin/posts/new" className="bg-accent px-4 py-2 text-sm font-black text-accent-foreground">
          Nova matéria
        </Link>
      </div>

      <div className="mt-6 overflow-hidden border border-border bg-surface">
        {articles.length > 0 ? (
          <div className="divide-y divide-border">
            {articles.map((article) => (
              <div key={article.id} className="grid gap-4 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={article.status} />
                    {article.isFeatured ? <span className="text-xs font-black text-accent">Destaque da capa</span> : null}
                  </div>
                  <h2 className="mt-2 font-serif text-xl font-black">{article.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">Atualizada em {formatDateTime(article.updatedAt)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/posts/${article.id}/edit`}
                    className="border border-border px-3 py-2 text-sm font-black hover:border-accent"
                  >
                    Editar
                  </Link>
                  <form action={setPostStatusAction}>
                    <input type="hidden" name="id" value={article.id} />
                    <input type="hidden" name="status" value={article.status === "published" ? "draft" : "published"} />
                    <button className="border border-border px-3 py-2 text-sm font-black hover:border-accent">
                      {article.status === "published" ? "Despublicar" : "Publicar"}
                    </button>
                  </form>
                  <form action={deletePostAction}>
                    <input type="hidden" name="id" value={article.id} />
                    <button className="border border-border px-3 py-2 text-sm font-black text-accent hover:bg-muted">
                      Excluir
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6">
            <h2 className="font-serif text-2xl font-black">Nenhuma matéria cadastrada</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Comece por um rascunho. Ele pode ser salvo sem publicação até a apuração estar pronta.
            </p>
            <Link href="/admin/posts/new" className="mt-4 inline-flex bg-accent px-4 py-2 text-sm font-black text-accent-foreground">
              Criar primeira matéria
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
