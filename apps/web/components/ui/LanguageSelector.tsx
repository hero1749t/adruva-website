"use client";

import React, { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी (Hindi)", flag: "🇮🇳" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ja", name: "日本語 (Japanese)", flag: "🇯🇵" },
  { code: "zh-CN", name: "中文 (Chinese)", flag: "🇨🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read current google translate cookie if set
    const match = document.cookie.match(/(?:^|; )googtrans=([^;]*)/);
    if (match && match[1]) {
      const parts = match[1].split("/");
      const code = parts[parts.length - 1];
      if (code) {
        setCurrentLang(code);
      }
    }

    // Initialize hidden Google Translate element script
    if (
      typeof window !== "undefined" &&
      !document.getElementById("google-translate-script")
    ) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitCustom";
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInitCustom = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,de,fr,es,id,ja,zh-CN,ru,it,nl",
            autoDisplay: false,
          },
          "google_translate_hidden_holder",
        );
      };
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    // Set cookie for google translate
    const domain =
      window.location.hostname === "localhost"
        ? ""
        : `;domain=.${window.location.hostname}`;
    document.cookie = `googtrans=/en/${langCode};path=/${domain}`;
    document.cookie = `googtrans=/en/${langCode};path=/`;

    // Try triggering the Google select combo if available
    const select = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  const activeLangObj = (languages.find((l) => l.code === currentLang) ??
    languages[0])!;

  return (
    <div ref={dropdownRef} className="relative z-50">
      {/* Hidden google translate container */}
      <div
        id="google_translate_hidden_holder"
        className="hidden"
        style={{ display: "none" }}
      />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200/80 dark:border-white/10 hover:border-brand-blue/50 text-slate-700 dark:text-slate-300 hover:text-brand-blue text-xs font-mono font-medium transition-colors bg-white/50 dark:bg-black/20"
        title="Change Language"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-brand-blue" />
        <span className="uppercase">
          {activeLangObj.code === "zh-CN" ? "ZH" : activeLangObj.code}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#111720] border border-slate-200 dark:border-[#202936] shadow-2xl py-1.5 overflow-hidden"
          >
            <div className="px-3 py-1 border-b border-slate-100 dark:border-slate-800 text-[10px] font-mono uppercase font-bold text-slate-400">
              Select Language
            </div>
            <div className="max-h-60 overflow-y-auto py-1">
              {languages.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                      isSelected
                        ? "bg-brand-blue/10 text-brand-blue font-bold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-brand-blue" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LanguageSelector;
