import { cn } from "@/lib/utils";

export function AdPlaceholder({ label = "Espaco reservado para anuncio", className }: { label?: string; className?: string }) {
  return (
    <aside
      className={cn(
        "flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border bg-muted/60 px-4 py-6 text-center text-xs font-black uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      {label}
    </aside>
  );
}
