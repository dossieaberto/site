import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 text-4xl font-black">Pagina nao encontrada</h1>
      <p className="mt-4 text-muted-foreground">O endereco acessado nao existe nesta fase do projeto.</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-foreground px-5 py-3 text-sm font-black text-background transition hover:bg-accent hover:text-accent-foreground"
      >
        Voltar para a home
      </Link>
    </main>
  );
}
