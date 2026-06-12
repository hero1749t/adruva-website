'use client';

import React from 'react';
import Link from 'next/link';
import { X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  const menuLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Our Work', href: '/work' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-6"
          onClick={onClose}
        >
          {/* Close button (top-right, size 40x40) */}
          <div className="w-full flex justify-end">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links (large text-2xl, centered, stacked with gap-6) */}
          <nav className="flex-grow flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-2xl font-bold text-foreground hover:text-brand-orange transition-colors font-poppins"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA: Full-width orange button at bottom */}
          <div className="w-full pt-4 pb-2" onClick={(e) => e.stopPropagation()}>
            <a
              href={calendlyUrl}
              target={calendlyUrl.startsWith('http') ? '_blank' : undefined}
              rel={calendlyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="w-full flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange/90 transition-all shadow-[0_4px_14px_rgba(255,107,0,0.3)] active:scale-95"
              onClick={onClose}
            >
              <Calendar className="h-4 w-4" />
              Book a Free Call
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
