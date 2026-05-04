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
      <section className="w-full max-w-md rounded-md border border-border/85 bg-surface p-6">
        <BrandLogo siteName={SITE_NAME} variant="admin" />
        <h1 className="mt-8 text-3xl font-black">Entrar no painel editorial</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Acesso restrito a contas autorizadas da redação.
        </p>

        {!isSupabaseConfigured ? (
          <div className="mt-5 rounded-md border border-dashed border-border bg-muted p-4 text-sm leading-6 text-muted-foreground">
            Configure as variáveis do Supabase na Vercel para ativar o login real.
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
