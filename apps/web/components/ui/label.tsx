import React from 'react';
import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  uppercase?: boolean;
  variant?: 'default' | 'sectionTag';
}

export function Label({
  uppercase = true,
  variant = 'default',
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <span
      className={cn(
        'font-inter font-semibold text-[11px] leading-none select-none transition-colors duration-300',
        uppercase && 'uppercase tracking-[0.1em]',
        variant === 'sectionTag' && 'text-primary dark:text-primary tracking-[0.12em] block mb-2.5',
        variant === 'default' && 'text-text-muted dark:text-text-muted',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
export default Label;
