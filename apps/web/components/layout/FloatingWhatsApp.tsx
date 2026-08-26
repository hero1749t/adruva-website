"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

interface FloatingWhatsAppProps {
  message?: string;
}

export function FloatingWhatsApp({
  message = "Hi Adruva! I'd like to discuss a project.",
}: FloatingWhatsAppProps) {
  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: Record<string, string> }>("/settings"),
  });
  const settings = settingsData?.data || {};

  const phoneNumber = settings.contactPhone
    ? settings.contactPhone.replace(/[^0-9]/g, "")
    : process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919149276799";

  if (!phoneNumber) {
    return null;
  }

  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
          70% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        @keyframes wa-bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .whatsapp-fab {
          animation: wa-bounce-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both, wa-pulse 2.5s 0.5s infinite;
        }
        .whatsapp-fab:hover {
          animation: none;
          box-shadow: 0 8px 30px rgba(37, 211, 102, 0.45);
        }
      `,
        }}
      />
      <div className="fixed z-50 hidden md:flex items-center gap-3 bottom-8 right-8 group">
        {/* Tooltip */}
        <div className="opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out bg-[#111b21] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl whitespace-nowrap font-inter flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#25d366] shrink-0 animate-pulse" />
          Chat with us on WhatsApp
        </div>

        {/* Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "whatsapp-fab h-14 w-14 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25d366]/30",
          )}
          style={{
            background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
          }}
          aria-label="Chat with us on WhatsApp"
        >
          {/* Official WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 175.216 175.552"
            className="h-8 w-8"
          >
            <defs>
              <linearGradient id="wa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#e8fdf0" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Phone outline */}
            <path
              d="M87.6 0C39.2 0 0 39.2 0 87.6c0 15.2 3.9 29.5 10.8 42L0 175.6l47.1-12.4c12.1 6.2 25.8 9.8 40.5 9.8 48.4 0 87.6-39.2 87.6-87.6S136 0 87.6 0z"
              fill="url(#wa-grad)"
            />
            {/* WhatsApp handset path */}
            <path
              d="M127.2 107.9c-2-1-11.7-5.8-13.5-6.4-1.8-.7-3.1-1-4.4.9-1.3 1.9-5.1 6.4-6.2 7.7-1.1 1.3-2.3 1.5-4.3.5-2-.9-8.5-3.1-16.2-10-6-5.3-10-11.9-11.2-13.9-1.2-2-.1-3 .9-4 .9-.9 2-2.3 3-3.5 1-1.2 1.3-2 2-3.3.7-1.3.3-2.4-.2-3.4-.5-1-4.4-10.6-6-14.5-1.6-3.8-3.2-3.3-4.4-3.4-1.1-.1-2.4-.1-3.7-.1-1.3 0-3.4.5-5.2 2.4-1.8 1.9-6.7 6.6-6.7 16.1 0 9.5 6.9 18.7 7.9 20 1 1.3 13.6 20.7 32.9 29 4.6 2 8.2 3.2 11 4 4.6 1.4 8.8 1.2 12.1.7 3.7-.5 11.4-4.7 13-9.2 1.6-4.5 1.6-8.4 1.1-9.2-.5-.8-1.8-1.3-3.8-2.3z"
              fill="#25d366"
            />
          </svg>
        </a>
      </div>
    </>
  );
}

export default FloatingWhatsApp;
