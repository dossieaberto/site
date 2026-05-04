"use client";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Erro</p>
      <h1 className="mt-3 text-4xl font-black">Algo saiu do previsto</h1>
      <p className="mt-4 text-muted-foreground">Tente recarregar a pagina.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-foreground px-5 py-3 text-sm font-black text-background transition hover:bg-accent hover:text-accent-foreground"
      >
        Tentar novamente
      </button>
    </main>
  );
}
