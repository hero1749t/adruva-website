"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyUrl?: string;
}

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Careers", href: "/careers" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function MobileMenu({
  isOpen,
  onClose,
  calendlyUrl = "/contact",
}: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-white/95 dark:bg-[#07090D]/95 backdrop-blur-xl flex flex-col justify-between p-6 md:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-3.5"
            >
              <div className="h-11 w-[54px] relative shrink-0">
                <Image
                  src="/logo-symbol-light.png"
                  alt="Adruva Logo"
                  fill
                  sizes="60px"
                  className="object-contain hidden dark:block"
                />
                <Image
                  src="/logo-symbol-dark.png"
                  alt="Adruva Logo"
                  fill
                  sizes="60px"
                  className="object-contain block dark:hidden"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-[900] tracking-tight text-slate-900 dark:text-white font-sora leading-none">
                  ADRUVA
                </span>
                <span className="text-[9.5px] font-extrabold tracking-[0.28em] text-brand-blue uppercase font-space mt-1">
                  SOLUTION
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl border border-border/80 text-foreground hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 py-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "text-2xl font-bold font-sora transition-colors py-2 flex items-center justify-between",
                    isActive
                      ? "text-brand-blue"
                      : "text-slate-800 dark:text-slate-200 hover:text-brand-blue",
                  )}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-5 h-5 opacity-40" />
                </Link>
              );
            })}
          </nav>

          {/* Footer CTA */}
          <div className="pt-6 border-t border-border/40">
            <Link
              href={calendlyUrl}
              onClick={onClose}
              className="w-full flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-bold font-space text-white bg-brand-blue hover:bg-brand-blue-dark shadow-[0_4px_16px_rgba(8,120,249,0.35)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
