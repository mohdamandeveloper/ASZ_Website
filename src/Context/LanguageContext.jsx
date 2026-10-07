import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import translations from "./Translation"; // adjust path if needed

const LanguageContext = createContext(null);

// Languages that use RTL layout
const RTL_CODES = ["AR"];

export const LANGUAGES = [
  { code: "EN", label: "English",   flag: "🇺🇸" },
  { code: "AR", label: "العربية",   flag: "🇸🇦" },
  // To enable later (blocks already exist in Translation.js):
  // { code: "FR", label: "Français",  flag: "🇫🇷" },
  // { code: "DE", label: "Deutsch",   flag: "🇩🇪" },
];

const DEFAULT_LANG = LANGUAGES[0]; // EN

function getLangFromCode(code) {
  return LANGUAGES.find(l => l.code === code.toUpperCase()) ?? null;
}

// ─── Browser locale → language detection ─────────────────────────────────────
// navigator.languages returns e.g. ["de-DE", "de", "en-US", "en"]
// We walk through each locale, extract the primary subtag (e.g. "DE"),
// and return the first one that exists in our LANGUAGES list.
// Falls back to English if nothing matches.
function detectBrowserLang() {
  try {
    const locales = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    for (const locale of locales) {
      if (!locale) continue;
      // "de-DE" → "DE" | "ar-SA" → "AR" | "zh-CN" → "ZH"
      const primary = locale.split("-")[0].toUpperCase();
      const matched = getLangFromCode(primary);
      if (matched) return matched;
    }
  } catch (_) {
    // SSR / old-browser safety
  }
  return DEFAULT_LANG;
}
// ─────────────────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCode = (searchParams.get("lang") ?? "").toUpperCase();

  // Priority:
  //  1. ?lang= in URL , explicit user / shareable choice
  //  2. Browser locale, auto-detect on first visit
  //  3. English       , hard fallback
  const initial = urlCode
    ? (getLangFromCode(urlCode) ?? DEFAULT_LANG)
    : detectBrowserLang();

  const [language, _setLanguage] = useState(initial);

  // Keep URL in sync whenever language changes
  const setLanguage = (lang) => {
    _setLanguage(lang);
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (lang.code === "EN") {
        next.delete("lang");           // clean URL for default language
      } else {
        next.set("lang", lang.code.toLowerCase());
      }
      return next;
    }, { replace: true });
  };

  // On first load: if browser-detected lang isn't EN, write it into the URL
  // so ?lang= persists across navigation and refresh.
  useEffect(() => {
    if (!searchParams.get("lang") && initial.code !== "EN") {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set("lang", initial.code.toLowerCase());
        return next;
      }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isRTL = RTL_CODES.includes(language.code);

  // Apply dir / lang attribute / class to <html>
  useEffect(() => {
    const html = document.documentElement;
    if (isRTL) {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      html.classList.add("rtl");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", language.code.toLowerCase());
      html.classList.remove("rtl");
    }
  }, [isRTL, language.code]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── useLanguage, access language state ────────────────────────────────────
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

// ─── useTranslation, get the right translation object for current language ──
// Usage in any component:
//   const t = useTranslation();
//   <h1>{t.hero_title_white}</h1>
//
// If a language has no translations file entry it gracefully falls back to EN.
export function useTranslation() {
  const { language } = useLanguage();
  // Per-key fallback: any key missing in the selected language shows the English text
  // instead of `undefined` (useful while a language is only partly translated).
  return useMemo(
    () => ({ ...translations.EN, ...(translations[language.code] ?? {}) }),
    [language.code]
  );
}
