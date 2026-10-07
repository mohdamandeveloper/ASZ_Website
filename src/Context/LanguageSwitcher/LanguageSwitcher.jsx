import React, { useEffect, useRef, useState } from "react";
import { useLanguage, useTranslation, LANGUAGES } from "../../Context/LanguageContext";
import "./LanguageSwitcher.scss";

/*
 * LanguageSwitcher
 * -----------------
 * Drop this into the site header wherever the "language button" should
 * live, e.g.:
 *
 *   import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
 *   ...
 *   <LanguageSwitcher />
 *
 * It reads/writes language state through LanguageContext, so selecting a
 * language here immediately re-renders every component that calls
 * useTranslation() (Home, HomeBanner, IndustryCards, etc.) and, for
 * Arabic, flips the document to RTL via LanguageContext's isRTL effect.
 */
export default function LanguageSwitcher({ className = "" }) {
  const { language, setLanguage, isRTL } = useLanguage();
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div
      className={`lang-switcher${isRTL ? " lang-switcher--rtl" : ""} ${className}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="lang-switcher__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.language_label}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="lang-switcher__flag" aria-hidden="true">
          {language.flag}
        </span>
        <span className="lang-switcher__code">{language.code}</span>
        <span
          className={`lang-switcher__chevron${open ? " is-open" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {open && (
        <ul className="lang-switcher__menu" role="listbox">
          {LANGUAGES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={lang.code === language.code}>
              <button
                type="button"
                className={`lang-switcher__option${
                  lang.code === language.code ? " is-active" : ""
                }`}
                onClick={() => handleSelect(lang)}
              >
                <span className="lang-switcher__flag" aria-hidden="true">
                  {lang.flag}
                </span>
                <span className="lang-switcher__label">{lang.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
