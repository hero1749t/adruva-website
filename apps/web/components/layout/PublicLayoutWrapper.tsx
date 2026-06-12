'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { MobileBottomBar } from './MobileBottomBar';
import { CookieBanner } from './CookieBanner';
import { BackToTop } from './BackToTop';

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
}

export function PublicLayoutWrapper({ children }: PublicLayoutWrapperProps) {
  const pathname = usePathname();
  
  // Isolate layout if the user is on the admin dashboard or the login screen
  const isAdminOrAuth = pathname.startsWith('/admin') || pathname === '/login';

  if (isAdminOrAuth) {
    return (
      <main className="flex-grow flex flex-col">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
      <CookieBanner />
      <BackToTop />
    </>
  );
}
