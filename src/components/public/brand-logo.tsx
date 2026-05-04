import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function BrandLogo({ siteName, compact = false }: { siteName: string; compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex min-w-0 items-center gap-3" aria-label="Ir para a página inicial">
      <span
        aria-hidden
        className={cn(
          "flex shrink-0 items-center justify-center border border-foreground bg-foreground text-background",
          compact ? "h-9 w-9 text-lg" : "h-11 w-11 text-xl",
        )}
      >
        <span className="font-serif font-black leading-none">DA</span>
      </span>
      <span className="min-w-0">
        <span className="block truncate font-serif text-2xl font-black leading-none text-foreground group-hover:text-accent">
          {siteName}
        </span>
        {!compact ? (
          <span className="mt-1 block truncate text-xs font-black uppercase tracking-[0.16em] text-accent">
            {SITE_TAGLINE}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
