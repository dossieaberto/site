import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
} as const;

const imageSizes = {
  sm: "32px",
  md: "40px",
  lg: "48px",
  xl: "64px",
} as const;

type LogoSymbolProps = {
  size?: keyof typeof sizeClasses;
  className?: string;
  priority?: boolean;
};

export function LogoSymbol({ size = "md", className, priority = false }: LogoSymbolProps) {
  return (
    <span aria-hidden className={cn("relative inline-flex shrink-0", sizeClasses[size], className)}>
      <Image
        src="/brand/dossie-aberto-symbol.png"
        alt=""
        fill
        sizes={imageSizes[size]}
        priority={priority}
        className="object-contain dark:invert"
      />
    </span>
  );
}
