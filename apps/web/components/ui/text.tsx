import React from "react";
import { cn } from "@/lib/utils";

type TextVariant = "body" | "marketing" | "muted";
type TextSize = "sm" | "base" | "lg" | "xl";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  size?: TextSize;
}

export function Text({
  variant = "body",
  size = "base",
  className,
  children,
  ...props
}: TextProps) {
  const styles = {
    // Variants
    variants: {
      body: "text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300",
      marketing:
        "font-space text-slate-900 dark:text-white dark:text-slate-900 dark:text-white leading-normal transition-colors duration-300",
      muted:
        "text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-300",
    },
    // Sizes
    sizes: {
      sm: "text-xs sm:text-sm",
      base: "text-sm sm:text-base",
      lg: "text-base sm:text-lg",
      xl: "text-lg sm:text-xl",
    },
  };

  return (
    <p
      className={cn(
        "font-manrope",
        styles.variants[variant],
        styles.sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
