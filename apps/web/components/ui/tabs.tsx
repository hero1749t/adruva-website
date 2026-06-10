'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const TabsContext = React.createContext<{
  activeTab?: string;
  setActiveTab: (value: string) => void;
}>({
  setActiveTab: () => {},
});

export function Tabs({
  defaultValue,
  children,
  className,
  ...props
}: {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('flex flex-col gap-2', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  ...props
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'hover:text-foreground/80',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
  ...props
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
export default Tabs;
