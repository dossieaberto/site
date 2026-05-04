import Link from "next/link";
import { deleteSubscriberAction } from "@/app/actions/admin-newsletter";
import { getNewsletterSubscribers } from "@/lib/data/admin";
import { formatDateTime } from "@/lib/utils";

export default async function AdminNewsletterPage() {
  const subscribers = await getNewsletterSubscribers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Newsletter</p>
          <h1 className="font-serif text-4xl font-black">Leitores inscritos</h1>
        </div>
        <Link
          href="/api/admin/newsletter/export"
          className="border border-border px-4 py-2 text-sm font-black hover:border-accent"
        >
          Exportar CSV
        </Link>
      </div>

      <div className="mt-6 overflow-hidden border border-border bg-surface">
        {subscribers.length > 0 ? (
          <div className="divide-y divide-border">
            {subscribers.map((subscriber) => (
              <div key={subscriber.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-black">{subscriber.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {subscriber.status === "active" ? "ativo" : "descadastrado"} · {formatDateTime(subscriber.createdAt)}
                  </p>
                </div>
                <form action={deleteSubscriberAction}>
                  <input type="hidden" name="id" value={subscriber.id} />
                  <button className="border border-border px-3 py-2 text-sm font-black text-accent hover:bg-muted">
                    Excluir
                  </button>
                </form>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6">
            <h2 className="font-serif text-2xl font-black">A lista ainda está vazia</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Os e-mails cadastrados na newsletter aparecerão aqui para acompanhamento e exportação.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
