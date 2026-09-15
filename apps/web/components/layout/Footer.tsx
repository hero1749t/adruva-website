"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { apiFetch } from "@/lib/api";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const services = [
  { name: "Web Development", slug: "web-development" },
  { name: "Mobile App Development", slug: "mobile-app-development" },
  { name: "SaaS & Custom Software", slug: "saas-custom-software" },
  { name: "AI Automation", slug: "ai-automation" },
  { name: "AI Ads & Workflows", slug: "ai-ads" },
  { name: "Custom AI Systems", slug: "custom-ai-solutions" },
  { name: "Technical SEO", slug: "seo" },
  { name: "Google & Meta Ads", slug: "google-ads" },
  { name: "UI/UX & Product Design", slug: "ui-ux-design" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Work", href: "/work" },
  { name: "Blog & Insights", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Cookie Policy", href: "/cookie-policy" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: Record<string, string> }>("/settings"),
  });
  const settings = settingsData?.data || {};

  const contactEmail = settings.contactEmail || "info@adruvasolution.com";
  const contactPhone = settings.contactPhone || "+91 91492 76799";
  const officeAddress =
    settings.officeAddress ||
    "Near Bageshwari Devi Mandir, Shanti Nagar, Dhalwala, Rishikesh, Uttarakhand, India - 249137";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    let token = "";
    try {
      if (executeRecaptcha) {
        token = await executeRecaptcha("newsletter");
      }
    } catch (err) {
      console.error("reCAPTCHA execution failed", err);
    }

    try {
      await apiFetch<unknown>("/newsletter/subscribe", {
        method: "POST",
        body: JSON.stringify({ email, token }),
      });
      setStatus("success");
      setMessage("Subscribed successfully!");
      setEmail("");
    } catch (error: any) {
      setStatus("error");
      setMessage("Already subscribed or error occurred");
    }
  };

  return (
    <footer className="w-full bg-slate-50 dark:bg-[#07090D] text-slate-900 dark:text-white border-t border-slate-200 dark:border-[#202936] pt-16 pb-28 md:pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Newsletter */}
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3.5 focus:outline-none group py-1"
            >
              <div className="h-11 w-[54px] relative shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo-symbol-light.png"
                  alt="Adruva Solution Logo | Technology & AI Agency"
                  fill
                  sizes="60px"
                  className="object-contain hidden dark:block"
                  priority
                />
                <Image
                  src="/logo-symbol-dark.png"
                  alt="Adruva Solution Logo | Technology & AI Agency"
                  fill
                  sizes="60px"
                  className="object-contain block dark:hidden"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-[900] tracking-tight text-slate-900 dark:text-white transition-colors font-sora leading-none">
                  ADRUVA
                </span>
                <span className="text-[9.5px] font-extrabold tracking-[0.28em] text-brand-blue uppercase font-space mt-1">
                  SOLUTION
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[280px] mb-6 font-manrope">
              We build the systems behind growing businesses. Custom software,
              AI, automation & digital growth systems.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-400 block mb-2 font-manrope">
                Subscribe to Technical Insights
              </span>
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2 max-w-[280px] w-full"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter work email"
                  required
                  disabled={status === "loading"}
                  className="bg-white dark:bg-white/5 border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 h-10 text-xs focus-visible:ring-1 focus-visible:ring-brand-blue/50 rounded-xl flex-1 outline-none"
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-brand-blue hover:bg-brand-blue-dark text-white w-10 h-10 p-0 shrink-0 rounded-xl flex items-center justify-center font-semibold text-sm transition-colors duration-200"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
              {message && (
                <span
                  className={cn(
                    "text-[10px] block mt-1.5 font-medium",
                    status === "success" ? "text-emerald-500" : "text-red-500",
                  )}
                >
                  {message}
                </span>
              )}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white pb-2 mb-4 border-b border-slate-200 dark:border-white/10 font-sora">
              Capabilities
            </h4>
            <ul className="flex flex-col space-y-2.5">
              {services.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors duration-150 block font-manrope"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white pb-2 mb-4 border-b border-slate-200 dark:border-white/10 font-sora">
              Company
            </h4>
            <ul className="flex flex-col space-y-2.5 mb-6">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors duration-150 block font-manrope"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white pb-2 mb-4 border-b border-slate-200 dark:border-white/10 font-sora">
              Legal
            </h4>
            <ul className="flex flex-col space-y-2">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-brand-blue dark:hover:text-brand-blue transition-colors duration-150 block font-manrope"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white pb-2 mb-4 border-b border-slate-200 dark:border-white/10 font-sora">
              Contact & Studio
            </h4>
            <div className="flex flex-col space-y-4 text-sm text-slate-600 dark:text-slate-400 font-manrope">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-brand-blue mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 block">Email Us</span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="font-mono text-xs font-bold text-slate-900 dark:text-white hover:text-brand-blue"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-brand-blue mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 block">
                    Call Direct
                  </span>
                  <a
                    href={`tel:${contactPhone.replace(/s+/g, "")}`}
                    className="font-mono text-xs font-bold text-slate-900 dark:text-white hover:text-brand-blue"
                  >
                    {contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-blue mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 block">Location</span>
                  <span className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 block">
                    {officeAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-manrope">
          <p>
            &copy; {new Date().getFullYear()} Adruva Solution. All rights
            reserved.
          </p>
          <p>Engineered for Growth &bull; Scoped with Precision</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
