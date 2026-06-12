import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionTagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionTag({ children, className, ...props }: SectionTagProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-orange mb-3 font-space-grotesk select-none",
        className
      )}
      {...props}
    >
      <span className="w-4 h-px bg-brand-orange shrink-0" />
      <span>{children}</span>
    </div>
  );
}

export default SectionTag;
