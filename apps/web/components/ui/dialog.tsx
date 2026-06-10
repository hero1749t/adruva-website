'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const DialogContext = React.createContext<{
  open?: boolean;
  setOpen: (open: boolean) => void;
}>({
  setOpen: () => {},
});

export function Dialog({ children, open: controlledOpen, onOpenChange }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ render, ...props }: { render: React.ReactElement }) {
  const { setOpen } = React.useContext(DialogContext);
  return React.cloneElement(render, {
    onClick: (e: React.MouseEvent) => {
      render.props.onClick?.(e);
      setOpen(true);
    },
    ...props,
  });
}

export function DialogPortal({ children }: { children: React.ReactNode }) {
  const { open } = React.useContext(DialogContext);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>
  );
}

export function DialogClose({
  render,
  children,
  ...props
}: {
  render?: React.ReactElement;
  children?: React.ReactNode;
}) {
  const { setOpen } = React.useContext(DialogContext);
  if (render) {
    return React.cloneElement(render, {
      onClick: (e: React.MouseEvent) => {
        render.props.onClick?.(e);
        setOpen(false);
      },
      children: render.props.children || children,
      ...props,
    });
  }
  return (
    <button type="button" onClick={() => setOpen(false)} {...props}>
      {children}
    </button>
  );
}

export function DialogOverlay() {
  const { setOpen } = React.useContext(DialogContext);
  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
    />
  );
}

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showCloseButton?: boolean;
}) {
  const { setOpen } = React.useContext(DialogContext);
  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        className={cn(
          'relative z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl bg-card p-6 text-card-foreground shadow-lg border border-border sm:max-w-[425px] animation-in fade-in-0 zoom-in-95 duration-200',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <Button
            variant="ghost"
            className="absolute top-4 right-4 h-8 w-8 p-0 rounded-btn"
            onClick={() => setOpen(false)}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
    </DialogPortal>
  );
}

export function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2 text-left', className)}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean;
}) {
  const { setOpen } = React.useContext(DialogContext);
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2 mt-4',
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <Button variant="outline" onClick={() => setOpen(false)}>
          Close
        </Button>
      )}
    </div>
  );
}

export function DialogTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'font-poppins text-lg leading-none font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-sm text-text-secondary font-inter',
        className
      )}
      {...props}
    />
  );
}
