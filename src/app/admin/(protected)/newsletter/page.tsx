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
          <h1 className="text-3xl font-black">Inscritos</h1>
        </div>
        <Link
          href="/api/admin/newsletter/export"
          className="rounded-lg border border-border px-4 py-2 text-sm font-black hover:border-accent"
        >
          Exportar CSV
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-surface">
        <div className="divide-y divide-border">
          {subscribers.map((subscriber) => (
            <div key={subscriber.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="font-black">{subscriber.email}</p>
                <p className="text-xs text-muted-foreground">
                  {subscriber.status} - {formatDateTime(subscriber.createdAt)}
                </p>
              </div>
              <form action={deleteSubscriberAction}>
                <input type="hidden" name="id" value={subscriber.id} />
                <button className="rounded-lg border border-border px-3 py-2 text-sm font-black text-accent hover:bg-muted">
                  Excluir
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
