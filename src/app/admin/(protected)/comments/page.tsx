import { deleteCommentAction, updateCommentStatusAction } from "@/app/actions/admin-comments";
import { StatusBadge } from "@/components/admin/status-badge";
import { getAdminComments } from "@/lib/data/admin";
import { formatDateTime } from "@/lib/utils";

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminCommentsPage({ searchParams }: PageProps) {
  const { status } = await searchParams;
  const comments = await getAdminComments(status);

  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Comentários</p>
      <h1 className="font-serif text-4xl font-black">Fila de moderação</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {["pending", "approved", "rejected"].map((item) => (
          <a key={item} href={`/admin/comments?status=${item}`} className="border border-border px-3 py-2 text-sm font-black hover:border-accent">
            {item === "pending" ? "Pendentes" : item === "approved" ? "Aprovados" : "Rejeitados"}
          </a>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <article key={comment.id} className="border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-black">{comment.name}</h2>
                  <p className="text-xs text-muted-foreground">{formatDateTime(comment.createdAt)}</p>
                </div>
                <StatusBadge status={comment.status} />
              </div>
              <p className="mt-3 leading-7">{comment.body}</p>
              {"articleTitle" in comment && comment.articleTitle ? (
                <p className="mt-3 text-sm text-muted-foreground">Matéria: {comment.articleTitle}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {["approved", "rejected", "pending"].map((nextStatus) => (
                  <form key={nextStatus} action={updateCommentStatusAction}>
                    <input type="hidden" name="id" value={comment.id} />
                    <input type="hidden" name="status" value={nextStatus} />
                    {"articleSlug" in comment && comment.articleSlug ? (
                      <input type="hidden" name="articleSlug" value={comment.articleSlug} />
                    ) : null}
                    <button className="border border-border px-3 py-2 text-sm font-black hover:border-accent">
                      {nextStatus === "approved"
                        ? "Aprovar"
                        : nextStatus === "rejected"
                          ? "Rejeitar"
                          : "Marcar pendente"}
                    </button>
                  </form>
                ))}
                <form action={deleteCommentAction}>
                  <input type="hidden" name="id" value={comment.id} />
                  <button className="border border-border px-3 py-2 text-sm font-black text-accent hover:bg-muted">
                    Excluir
                  </button>
                </form>
              </div>
            </article>
          ))
        ) : (
          <div className="border border-dashed border-border bg-surface p-6">
            <h2 className="font-serif text-2xl font-black">Nenhum comentário nesta fila</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Quando leitores enviarem comentários, eles aparecerão aqui para aprovação, rejeição ou exclusão.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
