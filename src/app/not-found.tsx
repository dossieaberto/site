import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-3 font-serif text-5xl font-black">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Este endereço não leva a uma matéria ou página publicada. Volte para a capa ou procure pelo tema no arquivo.
      </p>
      <Link
        href="/"
        className="mt-6 bg-foreground px-5 py-3 text-sm font-black text-background transition hover:bg-accent hover:text-accent-foreground"
      >
        Voltar para a home
      </Link>
    </main>
  );
}
