'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { apiFetch } from '@/lib/api';
import Image from 'next/image';

const services = [
  { name: 'Web Development', slug: 'web-development' },
  { name: 'Mobile App Development', slug: 'mobile-app-development' },
  { name: 'SaaS & Custom Software', slug: 'saas-custom-software' },
  { name: 'AI Automation', slug: 'ai-automation' },
  { name: 'AI Ads', slug: 'ai-ads' },
  { name: 'Custom AI Solutions', slug: 'custom-ai-solutions' },
  { name: 'Google Ads', slug: 'google-ads' },
  { name: 'Meta Ads', slug: 'meta-ads' },
  { name: 'SEO Services', slug: 'seo' },
  { name: 'Social Media Management', slug: 'social-media-management' },
  { name: 'Email Marketing', slug: 'email-marketing' },
  { name: 'UI/UX Design', slug: 'ui-ux-design' },
  { name: 'Graphic Designing', slug: 'graphic-designing' },
  { name: 'Video Editing', slug: 'video-editing' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Work', href: '/work' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Refund Policy', href: '/refund-policy' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  const whatsappUrl = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=Hi%20Adruva!%20I'd%20like%20to%20discuss%20a%20project.`
    : '#';

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    let token = '';
    try {
      if (executeRecaptcha) {
        token = await executeRecaptcha('newsletter');
      } else {
        console.warn('reCAPTCHA not loaded yet, proceeding without token');
      }
    } catch (err) {
      console.error('reCAPTCHA execution failed', err);
    }

    try {
      await apiFetch<unknown>('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, recaptchaToken: token }),
      });

      setStatus('success');
      setMessage("You're subscribed! 🎉");
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Already subscribed or error occurred');
    }
  };

  return (
    <footer className="w-full bg-[#0A0A0A] text-white border-t border-white/10 pt-16 pb-24 md:pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2.5 focus:outline-none group">
              <div className="h-11 w-11 relative shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo-symbol-dark.png"
                  alt="Adruva Logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <span className="text-3xl font-[800] tracking-tight text-white transition-colors font-poppins">
                Adruva<span className="text-brand-orange">.</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[240px] font-inter">
              Digital growth systems for local businesses and beyond. The last tech partner you&apos;ll ever need.
            </p>
            
            {/* Newsletter Subscription Form */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white block mb-3 font-space-grotesk">
                Join our Newsletter
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-[260px]">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === 'loading'}
                  className="bg-black/40 border-white/10 text-white placeholder:text-white/30 h-9 text-xs focus-visible:ring-1 focus-visible:ring-brand-orange/50 rounded-lg"
                />
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white w-9 h-9 p-0 shrink-0 rounded-lg flex items-center justify-center"
                >
                  {status === 'loading' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
              {message && (
                <span className={cn(
                  'text-[10px] block mt-1.5 font-medium',
                  status === 'success' ? 'text-green-400' : 'text-red-400'
                )}>
                  {message}
                </span>
              )}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white block mb-4 font-space-grotesk">
              Our Services
            </span>
            <ul className="grid grid-cols-1 gap-2">
              {services.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="text-xs text-muted-foreground hover:text-brand-orange transition-colors hover:translate-x-0.5 duration-200 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white block mb-4 font-space-grotesk">
                Company
              </span>
              <ul className="space-y-2">
                {companyLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-muted-foreground hover:text-brand-orange transition-colors hover:translate-x-0.5 duration-200 block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white block mb-4 font-space-grotesk">
                Legal
              </span>
              <ul className="space-y-2">
                {legalLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-muted-foreground hover:text-brand-orange transition-colors hover:translate-x-0.5 duration-200 block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white block mb-4 font-space-grotesk">
                Contact Us
              </span>
              <div className="space-y-2.5 text-xs text-muted-foreground">
                <p>hello@adruvasolution.com</p>
                <p>+91 98765 43210</p>
                <p className="leading-relaxed">
                  Rajpur Road, Jakhan,<br />
                  Dehradun, Uttarakhand,<br />
                  India - 248001
                </p>
              </div>
            </div>            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white block mb-4 font-space-grotesk">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-orange text-muted-foreground hover:text-brand-orange transition-all duration-300 flex items-center justify-center bg-transparent"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-orange text-muted-foreground hover:text-brand-orange transition-all duration-300 flex items-center justify-center bg-transparent"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-orange text-muted-foreground hover:text-brand-orange transition-all duration-300 flex items-center justify-center bg-transparent"
                  aria-label="Twitter"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-orange text-muted-foreground hover:text-brand-orange transition-all duration-300 flex items-center justify-center bg-transparent"
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.863.502-5.837.502-5.837s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {whatsappNumber && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-white/10 hover:border-brand-orange text-muted-foreground hover:text-brand-orange transition-all duration-300 flex items-center justify-center bg-transparent"
                    aria-label="WhatsApp"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.004 0C5.378 0 .004 5.373.004 12c0 2.112.551 4.164 1.6 5.976L.004 24l6.19-1.624c1.769.965 3.765 1.472 5.81 1.472 6.626 0 12-5.373 12-12s-5.374-12-12-12zm6.606 17.075c-.274.767-1.357 1.424-2.196 1.516-.576.064-1.328.096-2.129-.16-3.238-1.033-5.323-4.329-5.485-4.545-.162-.216-1.309-1.745-1.309-3.328 0-1.583.829-2.361 1.125-2.679.296-.318.647-.398.864-.398.216 0 .432.008.62.016.196.008.459-.072.716.551.274.663.935 2.279 1.015 2.44.08.16.134.348.026.559-.108.211-.162.344-.324.532-.162.188-.344.42-.491.564-.162.156-.332.328-.14.659.192.331.855 1.408 1.832 2.279.864.771 1.593 1.258 1.916 1.42.324.162.513.136.705-.084.192-.22.829-.964 1.05-1.296.221-.332.441-.276.745-.164.304.112 1.936.912 2.26 1.076.324.164.54.244.62.38.08.136.08.788-.194 1.556z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Adruva Solution. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-brand-orange transition-colors cursor-pointer">Dehradun, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
