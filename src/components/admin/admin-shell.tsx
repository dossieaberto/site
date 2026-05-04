import Link from "next/link";
import { LayoutDashboard, MessageSquare, Newspaper, Settings, Users } from "lucide-react";
import { logoutAdmin } from "@/app/actions/admin-auth";
import { BrandLogo } from "@/components/public/brand-logo";
import { LogoSymbol } from "@/components/public/logo-symbol";
import { SITE_NAME } from "@/lib/constants";
import type { Author } from "@/types/content";

const navItems = [
  { href: "/admin/dashboard", label: "Visão geral", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Notícias", icon: Newspaper },
  { href: "/admin/comments", label: "Comentários", icon: MessageSquare },
  { href: "/admin/newsletter", label: "Newsletter", icon: Users },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export function AdminShell({ children, admin }: { children: React.ReactNode; admin: Author }) {
  return (
    <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-border bg-surface lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="px-4 py-5">
          <BrandLogo siteName={SITE_NAME} variant="admin" />
        </div>
        <nav className="grid gap-1 px-3 pb-4" aria-label="Admin">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-black text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Icon aria-hidden size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div>
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <LogoSymbol size="sm" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Painel editorial</p>
              <p className="text-sm font-semibold text-muted-foreground">{admin.fullName}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-border px-3 py-2 text-sm font-black hover:border-accent hover:text-accent"
            >
              Ver site
            </Link>
            <form action={logoutAdmin}>
              <button className="rounded-lg bg-foreground px-3 py-2 text-sm font-black text-background" type="submit">
                Sair
              </button>
            </form>
          </div>
        </header>
        <main className="px-4 py-6 md:px-6">{children}</main>
      </div>
    </div>
  );
}
