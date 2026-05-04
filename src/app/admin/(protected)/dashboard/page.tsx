import Link from "next/link";
import { StatusBadge } from "@/components/admin/status-badge";
import { LogoSymbol } from "@/components/public/logo-symbol";
import { SITE_TAGLINE } from "@/lib/constants";
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
        <div className="flex items-center gap-3">
          <LogoSymbol size="md" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Dashboard</p>
            <h1 className="text-3xl font-black">Visão geral</h1>
            <p className="mt-1 text-sm text-muted-foreground">{SITE_TAGLINE}</p>
          </div>
        </div>
        <Link href="/admin/posts/new" className="rounded-lg bg-accent px-4 py-2 text-sm font-black text-accent-foreground">
          Criar notícia
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <section key={card.label} className="rounded-lg border border-border bg-surface p-5">
            <p className="text-sm font-bold text-muted-foreground">{card.label}</p>
            <p className="mt-3 text-4xl font-black">{card.value}</p>
          </section>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface p-5">
          <h2 className="text-xl font-black">Notícias recentes</h2>
          <div className="mt-4 divide-y divide-border">
            {stats.recentArticles.map((article) => (
              <div key={article.id} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-black">{article.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(article.updatedAt)}</p>
                </div>
                <StatusBadge status={article.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-surface p-5">
          <h2 className="text-xl font-black">Atalhos</h2>
          <div className="mt-4 grid gap-3">
            <Link className="rounded-lg border border-border p-4 font-black hover:border-accent" href="/admin/posts">
              Gerenciar notícias
            </Link>
            <Link className="rounded-lg border border-border p-4 font-black hover:border-accent" href="/admin/comments">
              Moderar comentários
            </Link>
            <Link className="rounded-lg border border-border p-4 font-black hover:border-accent" href="/admin/newsletter">
              Ver newsletter
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
