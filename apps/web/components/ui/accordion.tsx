'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const AccordionContext = React.createContext<{
  openValue?: string | null;
  toggleValue: (value: string) => void;
}>({
  toggleValue: () => {},
});

export function Accordion({
  children,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type = 'single',
  collapsible = true,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [openValue, setOpenValue] = React.useState<string | null>(null);

  const toggleValue = (value: string) => {
    setOpenValue((prev) => (prev === value ? (collapsible ? null : prev) : value));
  };

  return (
    <AccordionContext.Provider value={{ openValue, toggleValue }}>
      <div className={cn('flex w-full flex-col', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  children,
  value,
  className,
  ...props
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('border-b border-border py-2', className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ value?: string }>, { value });
        }
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({
  children,
  value,
  className,
  ...props
}: {
  children: React.ReactNode;
  value?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { openValue, toggleValue } = React.useContext(AccordionContext);
  const isOpen = openValue === value;

  return (
    <button
      type="button"
      onClick={() => value && toggleValue(value)}
      className={cn(
        'flex flex-1 items-center justify-between w-full py-4 font-semibold transition-all hover:underline text-left text-sm',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  value,
  className,
  ...props
}: {
  children: React.ReactNode;
  value?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { openValue } = React.useContext(AccordionContext);
  const isOpen = openValue === value;

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'pt-0 pb-4 text-sm text-text-secondary font-inter transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
export default Accordion;
