import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";
import { BrandLogo } from "@/components/public/brand-logo";
import { SITE_NAME } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: `Login admin | ${SITE_NAME}`,
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-border bg-surface p-6 shadow-sm">
        <BrandLogo siteName={SITE_NAME} />
        <h1 className="mt-8 font-serif text-4xl font-black">Acesso da redação</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Área restrita para administrar matérias, comentários, newsletter e configurações editoriais.
        </p>

        {!isSupabaseConfigured ? (
          <div className="mt-5 rounded-lg border border-dashed border-border bg-muted p-4 text-sm leading-6 text-muted-foreground">
            O login depende das variáveis do Supabase configuradas no ambiente de produção.
          </div>
        ) : null}

        <LoginForm />

        <Link href="/" className="mt-5 block text-sm font-black text-muted-foreground hover:text-accent">
          Voltar para o site
        </Link>
      </section>
    </main>
  );
}
