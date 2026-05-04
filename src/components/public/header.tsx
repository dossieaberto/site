"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Category } from "@/types/content";
import { BrandLogo } from "./brand-logo";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";

export function Header({ categories, siteName }: { categories: Category[]; siteName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <BrandLogo siteName={siteName} priority />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Categorias principais">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="rounded-full px-3 py-2 text-sm font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="hidden w-full max-w-xs md:block">
          <SearchBar compact />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <SearchBar />
          <nav className="mt-4 grid grid-cols-2 gap-2" aria-label="Categorias">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                onClick={() => setOpen(false)}
                className="rounded-lg border border-border bg-surface px-3 py-3 text-sm font-bold"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
