"use client";

import { useLocale } from "./LocaleProvider";
import type { Locale } from "@/lib/i18n";
import { LOCALES, LOCALE_NAMES } from "@/lib/i18n";

const FLAGS: Record<Locale, string> = {
  pl: "🇵🇱",
  en: "🇬🇧",
  uk: "🇺🇦",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <>
      <div className="lang-switcher">
        {LOCALES.map((l) => (
          <button
            key={l}
            className={`lang-btn${l === locale ? " active" : ""}`}
            onClick={() => setLocale(l)}
            title={LOCALE_NAMES[l]}
            aria-label={LOCALE_NAMES[l]}
          >
            {FLAGS[l]}
          </button>
        ))}
      </div>
      <style>{`
        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 4px;
          margin: 0 6px;
        }
        .lang-btn {
          background: rgba(255,255,255,.08);
          border: 2px solid transparent;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s;
          padding: 0;
          line-height: 1;
        }
        .lang-btn:hover {
          background: rgba(255,255,255,.15);
          transform: scale(1.1);
        }
        .lang-btn.active {
          border-color: var(--accent, #e63946);
          background: rgba(230,57,70,.15);
          box-shadow: 0 0 8px rgba(230,57,70,.3);
        }
        @media (max-width: 900px) {
          .lang-switcher {
            order: -1;
            margin: 12px 0 0;
          }
        }
      `}</style>
    </>
  );
}
