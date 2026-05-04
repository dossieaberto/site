import Link from "next/link";
import { StatusBadge } from "@/components/admin/status-badge";
import { getDashboardStats } from "@/lib/data/admin";
import { formatDateTime } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Publicadas", value: stats.published },
    { label: "Rascunhos", value: stats.drafts },
    { label: "Comentários pendentes", value: stats.pendingComments },
    { label: "Inscritos", value: stats.subscribers },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Mesa editorial</p>
          <h1 className="font-serif text-4xl font-black">Visão da redação</h1>
        </div>
        <Link href="/admin/posts/new" className="bg-accent px-4 py-2 text-sm font-black text-accent-foreground">
          Nova matéria
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <section key={card.label} className="border border-border bg-surface p-5">
            <p className="text-sm font-bold text-muted-foreground">{card.label}</p>
            <p className="mt-3 text-4xl font-black">{card.value}</p>
          </section>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="border border-border bg-surface p-5">
          <h2 className="font-serif text-2xl font-black">Matérias recentes</h2>
          {stats.recentArticles.length > 0 ? (
            <div className="mt-4 divide-y divide-border">
              {stats.recentArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-black">{article.title}</p>
                    <p className="text-xs text-muted-foreground">Atualizada em {formatDateTime(article.updatedAt)}</p>
                  </div>
                  <StatusBadge status={article.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 border border-dashed border-border p-4">
              <p className="font-black">A redação ainda não tem matérias cadastradas.</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Crie o primeiro rascunho para começar a organizar a pauta do Dossiê Aberto.
              </p>
            </div>
          )}
        </section>

        <section className="border border-border bg-surface p-5">
          <h2 className="font-serif text-2xl font-black">Atalhos editoriais</h2>
          <div className="mt-4 grid gap-3">
            <Link className="border border-border p-4 font-black hover:border-accent" href="/admin/posts">
              Gerenciar matérias
            </Link>
            <Link className="border border-border p-4 font-black hover:border-accent" href="/admin/comments">
              Moderar comentários
            </Link>
            <Link className="border border-border p-4 font-black hover:border-accent" href="/admin/newsletter">
              Ver inscritos da newsletter
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
