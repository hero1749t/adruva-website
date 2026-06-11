'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MobileMenu } from './MobileMenu';

import { SERVICES_BY_CATEGORY } from '@/lib/services-data';

const serviceCategories = [
  {
    name: 'Build',
    services: SERVICES_BY_CATEGORY.build.map((s) => ({
      name:
        s.name === 'Web Development'
          ? 'Web Dev'
          : s.name === 'Mobile App Development'
          ? 'Mobile App'
          : s.name === 'SaaS & Custom Software'
          ? 'SaaS'
          : s.name,
      slug: s.slug,
    })),
  },
  {
    name: 'Automate',
    services: SERVICES_BY_CATEGORY.automate.map((s) => ({
      name: s.name === 'Custom AI Solutions' ? 'Custom AI' : s.name,
      slug: s.slug,
    })),
  },
  {
    name: 'Grow',
    services: SERVICES_BY_CATEGORY.grow.map((s) => ({
      name: s.name === 'Social Media Management' ? 'Social Media' : s.name,
      slug: s.slug,
    })),
  },
  {
    name: 'Design',
    services: SERVICES_BY_CATEGORY.design.map((s) => ({
      name:
        s.name === 'UI/UX Design'
          ? 'UI/UX'
          : s.name === 'Graphic Designing'
          ? 'Graphic Design'
          : s.name,
      slug: s.slug,
    })),
  },
];

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  
  const pathname = usePathname();
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '#', isDropdown: true },
    { name: 'Our Work', href: '/work' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const isScrolled = scrollY > 10;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border dark:border-white/10 shadow-sm py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span className="text-2xl font-extrabold tracking-tight text-brand-navy dark:text-white transition-colors">
              Adruva<span className="text-brand-orange">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.isDropdown && pathname.startsWith('/services'));

              if (link.isDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <button
                      className={cn(
                        'flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-orange text-foreground/80 dark:text-white/80',
                        isActive && 'text-brand-orange font-semibold'
                      )}
                    >
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[580px] p-6 rounded-2xl glass-card premium-shadow grid grid-cols-4 gap-6"
                        >
                          {serviceCategories.map((category) => (
                            <div key={category.name} className="flex flex-col space-y-3">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                                {category.name}
                              </h4>
                              <ul className="flex flex-col space-y-2">
                                {category.services.map((service) => (
                                  <li key={service.slug}>
                                    <Link
                                      href={`/services/${service.slug}`}
                                      className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors block"
                                      onClick={() => setIsServicesDropdownOpen(false)}
                                    >
                                      {service.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-brand-orange py-2 relative text-foreground/80 dark:text-white/80',
                    isActive && 'text-brand-orange font-semibold'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <a
              href={calendlyUrl}
              target={calendlyUrl.startsWith('http') ? '_blank' : undefined}
              rel={calendlyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <Button 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xs px-4 h-9 rounded-lg font-semibold flex items-center gap-1.5 shadow-[0_4px_14px_rgba(255,107,0,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Calendar className="h-4 w-4" />
                Book a Free Call
              </Button>
            </a>
          </div>

          {/* Mobile Actions/Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'p-2 rounded-lg border transition-colors',
                isScrolled
                  ? 'border-white/10 hover:bg-white/5 text-white'
                  : 'border-border hover:bg-muted text-foreground dark:text-white dark:border-white/10'
              )}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

export default Navbar;
