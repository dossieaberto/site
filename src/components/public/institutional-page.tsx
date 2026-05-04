import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import type { InstitutionalPageContent } from "@/lib/institutional-pages";

export function InstitutionalPage({ page }: { page: InstitutionalPageContent }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <header className="border-b border-border pb-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">{page.kicker}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black leading-none md:text-6xl">
          {page.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{page.lead}</p>
      </header>

      <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <article className="space-y-8">
          {page.sections.map((section) => (
            <section key={section.heading} className="border-b border-border pb-8 last:border-b-0">
              <h2 className="text-2xl font-black">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="max-w-3xl text-base leading-8 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 grid gap-3">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>

        <aside className="rounded-lg border border-border bg-surface p-5 shadow-sm lg:sticky lg:top-24">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">{SITE_NAME}</p>
          <h2 className="mt-2 text-xl font-black">{SITE_TAGLINE}</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-black">Página</dt>
              <dd className="mt-1 text-muted-foreground">{page.navLabel}</dd>
            </div>
            <div>
              <dt className="font-black">Última atualização</dt>
              <dd className="mt-1 text-muted-foreground">
                {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
                  new Date(`${page.updatedAt}T12:00:00`),
                )}
              </dd>
            </div>
          </dl>
          {page.callout ? (
            <div className="mt-5 border-t border-border pt-5">
              <h3 className="text-sm font-black">{page.callout.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{page.callout.body}</p>
            </div>
          ) : null}
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full border border-border px-4 py-2 text-sm font-black hover:border-accent hover:text-accent"
          >
            Voltar para a home
          </Link>
        </aside>
      </div>
    </main>
  );
}
