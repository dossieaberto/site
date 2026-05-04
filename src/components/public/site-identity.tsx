import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LogoSymbol } from "./logo-symbol";

type SiteIdentityProps = {
  compact?: boolean;
  className?: string;
};

export function SiteIdentity({ compact = false, className }: SiteIdentityProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <LogoSymbol size={compact ? "md" : "lg"} />
      <div>
        <p className="text-lg font-black leading-none text-foreground">{SITE_NAME}</p>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-accent">{SITE_TAGLINE}</p>
        {!compact ? (
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{SITE_DESCRIPTION}</p>
        ) : null}
      </div>
    </div>
  );
}
