'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Settings, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Consent categories
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Check local storage for consent
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Delay presentation slightly for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentValue = JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
    });
    localStorage.setItem('cookie_consent', consentValue);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    setShowPreferences(false);
    setShowBanner(false);
  };

  const togglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={cn(
            'p-5 rounded-2xl shadow-2xl border border-border/40 text-foreground overflow-hidden',
            'bg-background/95 backdrop-blur-md dark:bg-black/90'
          )}
        >
          {!showPreferences ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-orange/10 text-brand-orange shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Cookie Policy & Consent</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    We use cookies to optimize site features, analyze traffic, and personalize marketing content. Check &quot;Manage&quot; to configure categories.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button 
                  onClick={handleAcceptAll}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xs py-2 h-auto flex-1 font-semibold"
                >
                  Accept All
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowPreferences(true)}
                  className="border-border hover:bg-muted text-xs py-2 h-auto flex-1 gap-1"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Manage
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="font-semibold text-sm">Cookie Preferences</span>
                <button 
                  onClick={() => setShowPreferences(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Essential */}
                <div className="flex items-start justify-between p-2 rounded-lg bg-muted/40">
                  <div>
                    <h4 className="text-xs font-semibold">Strictly Necessary</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Required for core site operation & theme toggling.</p>
                  </div>
                  <span className="text-[10px] bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded font-medium">Always Active</span>
                </div>

                {/* Analytics */}
                <div 
                  onClick={() => togglePreference('analytics')}
                  className="flex items-start justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors"
                >
                  <div className="pr-4">
                    <h4 className="text-xs font-semibold">Analytics & Performance</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Helps us understand how users navigate and find content (Google Analytics).</p>
                  </div>
                  <div className={cn(
                    'h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-colors',
                    preferences.analytics ? 'bg-brand-orange border-brand-orange text-white' : 'border-border'
                  )}>
                    {preferences.analytics && <Check className="h-3.5 w-3.5" />}
                  </div>
                </div>

                {/* Marketing */}
                <div 
                  onClick={() => togglePreference('marketing')}
                  className="flex items-start justify-between p-2 rounded-lg bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors"
                >
                  <div className="pr-4">
                    <h4 className="text-xs font-semibold">Marketing & Personalization</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Enables tracking and scripts for Calendly, Sentry, and reCAPTCHA integrations.</p>
                  </div>
                  <div className={cn(
                    'h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-colors',
                    preferences.marketing ? 'bg-brand-orange border-brand-orange text-white' : 'border-border'
                  )}>
                    {preferences.marketing && <Check className="h-3.5 w-3.5" />}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={handleSavePreferences}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xs py-2 h-auto w-full font-semibold"
                >
                  Save Selection
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CookieBanner;
