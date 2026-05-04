import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LogoSymbol } from "./logo-symbol";

type BrandLogoVariant = "header" | "footer" | "admin" | "compact";

type BrandLogoProps = {
  siteName: string;
  compact?: boolean;
  variant?: BrandLogoVariant;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  siteName,
  compact = false,
  variant = "header",
  className,
  priority = false,
}: BrandLogoProps) {
  const currentVariant = compact ? "compact" : variant;

  return (
    <Link
      href="/"
      className={cn("group inline-flex min-w-0 items-center gap-3", className)}
      aria-label="Ir para a página inicial"
    >
      <LogoSymbol
        size={currentVariant === "footer" ? "lg" : currentVariant === "compact" ? "sm" : "md"}
        priority={priority}
      />
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate font-black leading-none text-foreground transition group-hover:text-accent",
            currentVariant === "footer" ? "text-2xl" : currentVariant === "admin" ? "text-lg" : "text-xl sm:text-2xl",
          )}
        >
          {siteName}
        </span>
        {currentVariant !== "compact" ? (
          <span
            className={cn(
              "mt-1 truncate text-xs font-black uppercase tracking-[0.16em] text-accent",
              currentVariant === "header" ? "hidden sm:block" : "block",
            )}
          >
            {SITE_TAGLINE}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
