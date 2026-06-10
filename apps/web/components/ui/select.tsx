'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children?: React.ReactNode;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8 cursor-pointer dark:bg-input/30',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-3 top-2.5 h-4 w-4 pointer-events-none text-muted-foreground flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}

export function SelectLabel({ children }: { children: React.ReactNode }) {
  return <optgroup label={children as string} />;
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <option value="" disabled>{placeholder}</option>;
}
export default Select;
