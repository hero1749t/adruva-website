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
          ? 'bg-[#0A0A0A] text-white'
          : 'bg-transparent text-foreground',
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
export default Section;
