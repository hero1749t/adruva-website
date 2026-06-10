'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Home, HelpCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center w-full">
      <Section className="py-12 md:py-20">
        <Container>
          <div className="max-w-md mx-auto text-center space-y-8">
            {/* Visual 404 Error indicator */}
            <div className="space-y-4">
              <Badge variant="outline" className="px-3 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-wider text-xs font-semibold">
                Error 404
              </Badge>
              
              <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter bg-gradient-to-br from-primary via-orange-hover to-secondary bg-clip-text text-transparent select-none animate-pulse">
                404
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-extrabold font-poppins text-secondary dark:text-white leading-tight tracking-tight">
                Lost in Space?
              </h2>
              
              <p className="text-sm md:text-base leading-relaxed text-text-secondary dark:text-gray-300 font-inter max-w-sm mx-auto">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
            </div>

            {/* Navigation options row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  "bg-primary hover:bg-orange-hover text-white px-6 py-6 rounded-xl font-bold flex items-center justify-center gap-2 group shadow-md hover:shadow-primary/25 hover:shadow-lg transition-all duration-300 w-full sm:w-auto h-auto"
                )}
              >
                <Home className="w-4.5 h-4.5" />
                Back to Home
              </Link>
              
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  "border-border/80 text-text-primary dark:text-white px-6 py-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-muted transition-all duration-300 w-full sm:w-auto h-auto"
                )}
              >
                <HelpCircle className="w-4.5 h-4.5 text-text-muted" />
                Contact Support
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
