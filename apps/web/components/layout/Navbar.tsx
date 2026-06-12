'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, Menu, Calendar, 
  Code2, Smartphone, Terminal, 
  Cpu, Megaphone, Zap, 
  Target, Share2, Search, Mail, 
  Layout, Palette, Video, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MobileMenu } from './MobileMenu';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const serviceCategories = [
  {
    name: 'Build',
    icon: Code2,
    services: [
      { name: 'Web Dev', slug: 'web-development', icon: Code2 },
      { name: 'Mobile App', slug: 'mobile-app-development', icon: Smartphone },
      { name: 'SaaS', slug: 'saas-custom-software', icon: Terminal },
    ],
  },
  {
    name: 'Automate',
    icon: Cpu,
    services: [
      { name: 'AI Automation', slug: 'ai-automation', icon: Cpu },
      { name: 'AI Ads', slug: 'ai-ads', icon: Megaphone },
      { name: 'Custom AI', slug: 'custom-ai-solutions', icon: Zap },
    ],
  },
  {
    name: 'Grow',
    icon: Target,
    services: [
      { name: 'Google Ads', slug: 'google-ads', icon: Target },
      { name: 'Meta Ads', slug: 'meta-ads', icon: Share2 },
      { name: 'SEO', slug: 'seo', icon: Search },
      { name: 'Social Media', slug: 'social-media-management', icon: Share2 },
      { name: 'Email Marketing', slug: 'email-marketing', icon: Mail },
    ],
  },
  {
    name: 'Design',
    icon: Palette,
    services: [
      { name: 'UI/UX', slug: 'ui-ux-design', icon: Layout },
      { name: 'Graphic Design', slug: 'graphic-designing', icon: Palette },
      { name: 'Video Editing', slug: 'video-editing', icon: Video },
    ],
  },
];

export function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  useEffect(() => {
    setMounted(true);
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
  const isDarkMode = resolvedTheme === 'dark' || theme === 'dark';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 focus:outline-none group"
          >
            <div className="h-10 w-10 relative shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image
                src={mounted && isDarkMode ? "/logo-symbol-dark.png" : "/logo-symbol-light.png"}
                alt="Adruva Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-[800] tracking-tight text-brand-navy dark:text-white transition-colors font-poppins">
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
                        'flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-orange text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-white',
                        isActive && 'text-foreground dark:text-white font-semibold'
                      )}
                    >
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[660px] rounded-2xl bg-gradient-to-b from-white to-slate-50 dark:from-[#0b1f3a] dark:to-[#071529] border border-slate-200/80 dark:border-white/10 premium-shadow overflow-hidden z-50"
                        >
                          {/* Top Orange Highlight Strip */}
                          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-brand-orange/40 via-brand-orange to-brand-orange/40" />
                          
                          {/* Main Grid Content */}
                          <div className="grid grid-cols-4 gap-6 p-7">
                            {serviceCategories.map((category) => {
                              const CategoryIcon = category.icon;
                              return (
                                <div key={category.name} className="flex flex-col space-y-3.5">
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-orange flex items-center gap-1.5 font-space">
                                    <CategoryIcon className="h-3.5 w-3.5 shrink-0" />
                                    {category.name}
                                  </h4>
                                  <ul className="flex flex-col space-y-1">
                                    {category.services.map((service) => {
                                      const ServiceIcon = service.icon;
                                      return (
                                        <li key={service.slug}>
                                          <Link
                                            href={`/services/${service.slug}`}
                                            className="group/item flex items-center gap-2 p-2 -mx-2 rounded-xl transition-all duration-200 hover:bg-slate-100/75 dark:hover:bg-white/5"
                                            onClick={() => setIsServicesDropdownOpen(false)}
                                          >
                                            <div className="flex items-center justify-center p-1 rounded-lg bg-slate-50/50 dark:bg-white/5 group-hover/item:bg-brand-orange/10 text-muted-foreground group-hover/item:text-brand-orange transition-colors">
                                              <ServiceIcon className="h-3.5 w-3.5 shrink-0" />
                                            </div>
                                            <span className="text-[13px] font-medium text-foreground/80 dark:text-white/80 group-hover/item:text-brand-orange group-hover/item:translate-x-0.5 transition-all font-inter">
                                              {service.name}
                                            </span>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>

                          {/* Elegant Bottom Footer */}
                          <div className="border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/15 px-7 py-3.5 flex items-center justify-between">
                            <span className="text-[11px] text-muted-foreground font-medium font-inter">
                              Need a customized digital strategy? Let&apos;s build together.
                            </span>
                            <Link
                              href="/contact"
                              className="text-xs font-bold text-brand-orange hover:text-brand-orange-hover transition-colors flex items-center gap-1 font-inter animate-pulse"
                              onClick={() => setIsServicesDropdownOpen(false)}
                            >
                              Book a Free Call
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
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
                    'text-sm font-medium transition-colors hover:text-brand-orange py-2 relative text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-white',
                    isActive && 'text-foreground dark:text-white font-semibold'
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
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xs px-4 h-9 rounded-lg font-semibold flex items-center gap-1.5 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
