import { cn } from "@/lib/utils";

export function AdPlaceholder({ label = "Espaço reservado para anúncio", className }: { label?: string; className?: string }) {
  const placement = label
    .replace(/^An[uú]ncio\s*/i, "")
    .replace(/^Espa[cç]o reservado para an[uú]ncio$/i, "")
    .trim();

  return (
    <aside
      className={cn(
        "flex min-h-20 flex-col items-center justify-center rounded-md border border-dashed border-border/80 bg-surface/55 px-4 py-5 text-center",
        className,
      )}
    >
      <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-muted-foreground">Publicidade</span>
      {placement ? <span className="mt-1 text-xs font-semibold text-muted-foreground/80">{placement}</span> : null}
    </aside>
  );
}
