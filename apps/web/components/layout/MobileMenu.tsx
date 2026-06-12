'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceCategories = [
  {
    name: 'Build',
    services: [
      { name: 'Web Dev', slug: 'web-development' },
      { name: 'Mobile App', slug: 'mobile-app-development' },
      { name: 'SaaS', slug: 'saas-custom-software' },
    ],
  },
  {
    name: 'Automate',
    services: [
      { name: 'AI Automation', slug: 'ai-automation' },
      { name: 'AI Ads', slug: 'ai-ads' },
      { name: 'Custom AI', slug: 'custom-ai-solutions' },
    ],
  },
  {
    name: 'Grow',
    services: [
      { name: 'Google Ads', slug: 'google-ads' },
      { name: 'Meta Ads', slug: 'meta-ads' },
      { name: 'SEO', slug: 'seo' },
      { name: 'Social Media', slug: 'social-media-management' },
      { name: 'Email Marketing', slug: 'email-marketing' },
    ],
  },
  {
    name: 'Design',
    services: [
      { name: 'UI/UX', slug: 'ui-ux-design' },
      { name: 'Graphic Design', slug: 'graphic-designing' },
      { name: 'Video Editing', slug: 'video-editing' },
    ],
  },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact';

  const menuLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
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
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm h-full bg-black text-white p-6 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-lg font-bold tracking-tight text-white">
                Adruva<span className="text-brand-orange">.</span>
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-white rounded-lg border border-white/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Menu Items Area */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  onClick={onClose}
                  className="text-lg font-medium hover:text-brand-orange transition-colors py-2"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={onClose}
                  className="text-lg font-medium hover:text-brand-orange transition-colors py-2"
                >
                  About
                </Link>

                {/* Collapsible Services Category */}
                <div>
                  <button
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    className="flex w-full items-center justify-between text-lg font-medium hover:text-brand-orange transition-colors py-2 text-left"
                  >
                    <span>Services</span>
                    {servicesExpanded ? (
                      <ChevronUp className="h-5 w-5 text-white/60" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white/60" />
                    )}
                  </button>

                  <AnimatePresence>
                    {servicesExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4 border-l border-white/10 mt-1 space-y-3"
                      >
                        {serviceCategories.map((cat) => (
                          <div key={cat.name} className="py-1">
                            <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider block mb-1">
                              {cat.name}
                            </span>
                            <div className="flex flex-col pl-2 space-y-1.5">
                              {cat.services.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={`/services/${service.slug}`}
                                  onClick={onClose}
                                  className="text-sm text-white/80 hover:text-white transition-colors"
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {menuLinks.slice(2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="text-lg font-medium hover:text-brand-orange transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-white/10 pt-4 pb-2">
              <a
                href={calendlyUrl}
                target={calendlyUrl.startsWith('http') ? '_blank' : undefined}
                rel={calendlyUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-full flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange/90 transition-all shadow-[0_4px_14px_rgba(255,107,0,0.3)] active:scale-95"
                onClick={onClose}
              >
                <Calendar className="h-4 w-4" />
                Book a Free Call
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
