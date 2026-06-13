"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export function MobileBottomBar() {
  const { data: settingsData } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: Record<string, string> }>("/settings"),
  });
  const settings = settingsData?.data || {};

  const contactPhone = settings.contactPhone;
  const whatsappNumber = contactPhone
    ? contactPhone.replace(/[^0-9]/g, "")
    : process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const calendlyUrl = "/contact";

  const whatsappMessage = "Hi Adruva! I'd like to discuss a project.";
  const encodedText = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 w-full md:hidden border-t border-border/40 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] transition-all duration-300",
        "bg-background/90 backdrop-blur-lg dark:bg-black/90",
        "px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom,16px))] flex items-center gap-3",
      )}
    >
      {/* WhatsApp Button - 40% Width */}
      {whatsappNumber && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex-1 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-transform active:scale-95 text-white bg-[#25d366]",
            "shadow-[0_4px_14px_rgba(37,211,102,0.3)]",
          )}
          style={{ flexGrow: 4 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 175.216 175.552"
            className="h-5 w-5"
          >
            <path
              d="M87.6 0C39.2 0 0 39.2 0 87.6c0 15.2 3.9 29.5 10.8 42L0 175.6l47.1-12.4c12.1 6.2 25.8 9.8 40.5 9.8 48.4 0 87.6-39.2 87.6-87.6S136 0 87.6 0z"
              fill="rgba(255,255,255,0.25)"
            />
            <path
              d="M127.2 107.9c-2-1-11.7-5.8-13.5-6.4-1.8-.7-3.1-1-4.4.9-1.3 1.9-5.1 6.4-6.2 7.7-1.1 1.3-2.3 1.5-4.3.5-2-.9-8.5-3.1-16.2-10-6-5.3-10-11.9-11.2-13.9-1.2-2-.1-3 .9-4 .9-.9 2-2.3 3-3.5 1-1.2 1.3-2 2-3.3.7-1.3.3-2.4-.2-3.4-.5-1-4.4-10.6-6-14.5-1.6-3.8-3.2-3.3-4.4-3.4-1.1-.1-2.4-.1-3.7-.1-1.3 0-3.4.5-5.2 2.4-1.8 1.9-6.7 6.6-6.7 16.1 0 9.5 6.9 18.7 7.9 20 1 1.3 13.6 20.7 32.9 29 4.6 2 8.2 3.2 11 4 4.6 1.4 8.8 1.2 12.1.7 3.7-.5 11.4-4.7 13-9.2 1.6-4.5 1.6-8.4 1.1-9.2-.5-.8-1.8-1.3-3.8-2.3z"
              fill="white"
            />
          </svg>
          WhatsApp
        </a>
      )}

      {/* Book Call Button - 60% Width */}
      <a
        href={calendlyUrl}
        target={calendlyUrl.startsWith("http") ? "_blank" : undefined}
        rel={calendlyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
        className={cn(
          "flex-1 flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-transform active:scale-95 text-white bg-brand-orange hover:bg-brand-orange/90",
          "shadow-[0_4px_14px_rgba(255,107,0,0.3)]",
        )}
        style={{ flexGrow: 6 }}
      >
        <Calendar className="h-4 w-4" />
        Book a Free Call
      </a>
    </div>
  );
}

export default MobileBottomBar;
