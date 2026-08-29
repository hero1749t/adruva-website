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
  { name: "AI Ads", slug: "ai-ads" },
  { name: "Custom AI Solutions", slug: "custom-ai-solutions" },
  { name: "Google Ads", slug: "google-ads" },
  { name: "Meta Ads", slug: "meta-ads" },
  { name: "SEO Services", slug: "seo" },
  { name: "Social Media Management", slug: "social-media-management" },
  { name: "Email Marketing", slug: "email-marketing" },
  { name: "UI/UX Design", slug: "ui-ux-design" },
  { name: "Graphic Designing", slug: "graphic-designing" },
  { name: "Video Editing", slug: "video-editing" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Work", href: "/work" },
  { name: "Blog", href: "/blog" },
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

  const facebookUrl =
    settings.facebookUrl ||
    "https://www.facebook.com/p/Adruva-solution-61559775392656/";
  const linkedinUrl =
    settings.linkedinUrl || "https://www.linkedin.com/company/adruva-solution";
  const instagramUrl =
    settings.instagramUrl || "https://www.instagram.com/adruvasolution/";
  const twitterUrl = settings.twitterUrl || "https://x.com/adruvasolution";
  const youtubeUrl = settings.youtubeUrl || "https://youtube.com";

  const whatsappNumber = settings.contactPhone
    ? settings.contactPhone.replace(/[^0-9]/g, "")
    : process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919149276799";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Adruva!%20I'd%20like%20to%20discuss%20a%20project.`;

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
        body: JSON.stringify({ email, recaptchaToken: token }),
      });

      setStatus("success");
      setMessage("You're subscribed! 🎉");
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setMessage("Already subscribed or error occurred");
    }
  };

  return (
    <footer className="w-full bg-[#0A0A0A] text-white border-t border-white/10 pt-16 pb-28 md:pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Newsletter */}
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 focus:outline-none group"
            >
              <div className="h-8 w-[40px] relative shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo-symbol-light.png"
                  alt="Adruva Solution Logo | Web Development & AI Automation Agency"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-[800] tracking-tight text-white transition-colors font-poppins">
                Adruva<span className="text-brand-orange">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-[1.7] max-w-[260px] mb-6 font-inter">
              Digital growth systems for local businesses and beyond.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs text-gray-500 block mb-2 font-inter">
                Stay updated
              </span>
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2 max-w-[260px] w-full"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === "loading"}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 h-10 text-sm focus-visible:ring-1 focus-visible:ring-brand-orange/50 rounded-lg flex-1 outline-none"
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-brand-orange hover:bg-orange-600 text-white w-10 h-10 p-0 shrink-0 rounded-lg flex items-center justify-center font-semibold text-sm transition-colors duration-200"
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
                    status === "success" ? "text-green-400" : "text-red-400",
                  )}
                >
                  {message}
                </span>
              )}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white pb-2 mb-5 border-b border-white/8 font-poppins">
              Services
            </h4>
            <ul className="flex flex-col space-y-2.5">
              {services.slice(0, 6).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-150 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white pb-2 mb-5 border-b border-white/8 font-poppins">
              Company
            </h4>
            <ul className="flex flex-col space-y-2.5 mb-6">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-150 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white pb-2 mb-5 border-b border-white/8 font-poppins">
              Legal
            </h4>
            <ul className="flex flex-col space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-150 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white pb-2 mb-5 border-b border-white/8 font-poppins">
              Contact
            </h4>
            <div className="flex flex-col space-y-3.5 text-sm text-gray-400 mb-6 font-inter">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-brand-orange mt-0.5 shrink-0" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-brand-orange mt-0.5 shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                    className="hover:text-white transition-colors block"
                  >
                    {contactPhone}
                  </a>
                  <a
                    href="tel:+918383877088"
                    className="hover:text-white transition-colors text-xs text-gray-500 block"
                  >
                    +91 83838 77088
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-orange mt-0.5 shrink-0" />
                <span className="whitespace-pre-line">{officeAddress}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "Facebook",
                  href: facebookUrl,
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  label: "LinkedIn",
                  href: linkedinUrl,
                  path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
                },
                {
                  label: "Instagram",
                  href: instagramUrl,
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
                },
                {
                  label: "Twitter",
                  href: twitterUrl,
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  label: "YouTube",
                  href: youtubeUrl,
                  path: "M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.863.502-5.837.502-5.837s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                },
                {
                  label: "WhatsApp",
                  href: whatsappUrl,
                  path: "M12.004 0C5.378 0 .004 5.373.004 12c0 2.112.551 4.164 1.6 5.976L.004 24l6.19-1.624c1.769.965 3.765 1.472 5.81 1.472 6.626 0 12-5.373 12-12s-5.374-12-12-12zm6.606 17.075c-.274.767-1.357 1.424-2.196 1.516-.576.064-1.328.096-2.129-.16-3.238-1.033-5.323-4.329-5.485-4.545-.162-.216-1.309-1.745-1.309-3.328 0-1.583.829-2.361 1.125-2.679.296-.318.647-.398.864-.398.216 0 .432.008.62.016.196.008.459-.072.716.551.274.663.935 2.279 1.015 2.44.08.16.134.348.026.559-.108.211-.162.344-.324.532-.162.188-.344.42-.491.564-.162.156-.332.328-.14.659.192.331.855 1.408 1.832 2.279.864.771 1.593 1.258 1.916 1.42.324.162.513.136.705-.084.192-.22.829-.964 1.05-1.296.221-.332.441-.276.745-.164.304.112 1.936.912 2.26 1.076.324.164.54.244.62.38.08.136.08.788-.194 1.556z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[34px] h-[34px] rounded-lg border border-white/10 hover:border-brand-orange text-gray-500 hover:text-brand-orange hover:bg-brand-orange/10 transition-all duration-150 flex items-center justify-center bg-transparent shrink-0"
                  aria-label={social.label}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 w-full text-center md:text-left">
          <p>
            © {new Date().getFullYear()} Adruva Solution. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <span className="text-brand-orange">♥</span> in Rishikesh
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
