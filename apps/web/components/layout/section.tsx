import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  dark?: boolean;
}

export function Section({
  dark = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'w-full py-12 md:py-20 transition-colors duration-300',
        dark
          ? 'bg-[#050814] dark:bg-[#030610] text-white border-y border-brand-orange/15'
          : 'bg-transparent text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
export default Section;
