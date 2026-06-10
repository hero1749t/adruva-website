import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export function Container({
  clean = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full px-5 md:px-10',
        !clean && 'max-w-[1100px] mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
export default Container;
