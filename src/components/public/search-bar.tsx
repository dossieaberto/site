"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (term) router.push(`/buscar?q=${encodeURIComponent(term)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full items-center gap-2 border border-border bg-surface px-3 py-2"
      role="search"
    >
      <Search aria-hidden size={18} className="text-muted-foreground" />
      <label className="sr-only" htmlFor={compact ? "search-compact" : "search"}>
        Buscar notícias
      </label>
      <input
        id={compact ? "search-compact" : "search"}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={compact ? "Buscar" : "Busque por tema, nome, decisão ou bastidor"}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
      <button
        type="submit"
        className="bg-foreground px-3 py-1.5 text-xs font-bold text-background transition hover:bg-accent hover:text-accent-foreground"
      >
        Buscar
      </button>
    </form>
  );
}
