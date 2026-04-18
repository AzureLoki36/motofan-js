"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "./LocaleProvider";
import type { Locale } from "@/lib/i18n";
import { LOCALES, LOCALE_NAMES } from "@/lib/i18n";

const SHORT: Record<Locale, string> = {
  pl: "PL",
  en: "EN",
  uk: "UA",
};

function Flag({ code, size = 20 }: { code: Locale; size?: number }) {
  if (code === "pl")
    return (
      <svg width={size} height={size * 0.67} viewBox="0 0 30 20" style={{ borderRadius: 3, display: "block" }}>
        <rect width="30" height="10" fill="#fff" />
        <rect y="10" width="30" height="10" fill="#dc143c" />
      </svg>
    );
  if (code === "en")
    return (
      <svg width={size} height={size * 0.67} viewBox="0 0 60 40" style={{ borderRadius: 3, display: "block" }}>
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0L60 40M60 0L0 40" stroke="#fff" strokeWidth="6" />
        <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    );
  /* uk = Ukraine */
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" style={{ borderRadius: 3, display: "block" }}>
      <rect width="30" height="10" fill="#0057B8" />
      <rect y="10" width="30" height="10" fill="#FFD700" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const choose = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <>
      <div className="lang-dropdown" ref={ref}>
        <button
          className="lang-current"
          onClick={() => setOpen(!open)}
          aria-label={LOCALE_NAMES[locale]}
          aria-expanded={open}
        >
          <Flag code={locale} />
          <span className="lang-code">{SHORT[locale]}</span>
          <svg className={`lang-chevron${open ? " open" : ""}`} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3.5L5 6.5L8 3.5" />
          </svg>
        </button>
        {open && (
          <ul className="lang-menu">
            {LOCALES.filter((l) => l !== locale).map((l) => (
              <li key={l}>
                <button className="lang-option" onClick={() => choose(l)}>
                  <Flag code={l} />
                  <span className="lang-code">{SHORT[l]}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <style>{`
        .lang-dropdown {
          position: relative;
          margin: 0 4px;
        }
        .lang-current {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 8px;
          padding: 5px 10px;
          cursor: pointer;
          transition: all .2s;
          color: inherit;
          font-family: inherit;
        }
        .lang-current:hover {
          background: rgba(255,255,255,.15);
        }
        .lang-code {
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .5px;
        }
        .lang-chevron {
          transition: transform .2s;
        }
        .lang-chevron.open {
          transform: rotate(180deg);
        }
        .lang-menu {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          list-style: none;
          margin: 0;
          padding: 4px;
          background: var(--card-bg, #1a1a2e);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,.35);
          z-index: 1000;
          min-width: 90px;
          animation: langFade .15s ease;
        }
        @keyframes langFade {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lang-option {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          background: none;
          border: none;
          padding: 8px 12px;
          border-radius: 7px;
          cursor: pointer;
          color: inherit;
          font-family: inherit;
          transition: background .15s;
        }
        .lang-option:hover {
          background: rgba(255,255,255,.1);
        }
        .lang-option .lang-code {
          font-size: .82rem;
        }
        @media (max-width: 900px) {
          .lang-dropdown {
            margin: 0 2px;
          }
        }
      `}</style>
    </>
  );
}
