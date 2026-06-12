import React from 'react';
import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
}

export function Heading({
  level = 'h1',
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = level;

  const styles = {
    h1: 'font-poppins font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.05] text-foreground transition-colors duration-300',
    h2: 'font-poppins font-bold text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] text-foreground transition-colors duration-300',
    h3: 'font-poppins font-semibold text-xl sm:text-2xl md:text-3xl tracking-tight text-foreground transition-colors duration-300',
    h4: 'font-poppins font-semibold text-lg sm:text-xl md:text-2xl tracking-normal text-foreground transition-colors duration-300',
  };

  return (
    <Tag className={cn(styles[level], className)} {...props}>
      {children}
    </Tag>
  );
}
