import React from 'react';
import { cn } from '@/lib/utils';

type TextVariant = 'body' | 'marketing' | 'muted';
type TextSize = 'sm' | 'base' | 'lg' | 'xl';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  size?: TextSize;
}

export function Text({
  variant = 'body',
  size = 'base',
  className,
  children,
  ...props
}: TextProps) {
  const styles = {
    // Variants
    variants: {
      body: 'text-text-secondary dark:text-text-secondary leading-relaxed transition-colors duration-300',
      marketing: 'font-space text-text-primary dark:text-text-primary leading-normal transition-colors duration-300',
      muted: 'text-text-muted leading-relaxed transition-colors duration-300',
    },
    // Sizes
    sizes: {
      sm: 'text-xs sm:text-sm',
      base: 'text-sm sm:text-base',
      lg: 'text-base sm:text-lg',
      xl: 'text-lg sm:text-xl',
    },
  };

  return (
    <p
      className={cn(
        'font-inter',
        styles.variants[variant],
        styles.sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
