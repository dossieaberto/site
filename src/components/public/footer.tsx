import Link from "next/link";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/constants";
import { INSTITUTIONAL_PAGES } from "@/lib/institutional-pages";
import type { Category } from "@/types/content";
import { BrandLogo } from "./brand-logo";
import { NewsletterBox } from "./newsletter-box";

export function Footer({ categories, siteName }: { categories: Category[]; siteName: string }) {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1fr_0.9fr_0.75fr_0.75fr] md:px-6">
        <div>
          <BrandLogo siteName={siteName} />
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{SITE_DESCRIPTION}</p>
          <p className="mt-3 text-sm font-black text-accent">{SITE_TAGLINE}</p>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Um projeto editorial independente em desenvolvimento, dedicado a acompanhar fatos públicos,
            interesses em jogo e consequências para a sociedade.
          </p>
        </div>

        <NewsletterBox compact />

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em]">Editorias</h3>
          <div className="mt-4 grid gap-2">
            {categories.map((category) => (
              <Link key={category.slug} href={`/${category.slug}`} className="text-sm font-semibold hover:text-accent">
                {category.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-2 text-sm font-semibold">
            <Link href="/buscar" className="hover:text-accent">
              Busca
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em]">Institucional</h3>
          <div className="mt-4 grid gap-2 text-sm font-semibold">
            {INSTITUTIONAL_PAGES.map((page) => (
              <Link key={page.slug} href={`/${page.slug}`} className="hover:text-accent">
                {page.navLabel}
              </Link>
            ))}
            <Link href="/rss.xml" className="hover:text-accent">
              RSS
            </Link>
            <Link href="/admin/login" className="hover:text-accent">
              Área administrativa
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {siteName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
