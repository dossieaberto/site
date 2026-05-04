import { cn } from "@/lib/utils";

export function AdPlaceholder({ label = "Publicidade", className }: { label?: string; className?: string }) {
  return (
    <aside
      className={cn(
        "flex min-h-24 items-center justify-center border border-dashed border-border bg-background/60 px-4 py-6 text-center",
        className,
      )}
      aria-label={label}
    >
      <div>
        <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-muted-foreground">Publicidade</p>
        <p className="mt-1 text-xs text-muted-foreground/80">{label}</p>
      </div>
    </aside>
  );
}
