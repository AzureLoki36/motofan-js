"use client";

import Link from "next/link";
import { Editable } from "@/components/Editable";
import { useLocale } from "@/components/LocaleProvider";

interface FooterProps {
  isHome?: boolean;
}

export default function HomeFooter() {
  const { t } = useLocale();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/pics/logo.jpg"
                alt="MotoFun Tomasz Kokoszka"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="logo-text">
                MOTO<span className="logo-accent">FUN</span>
              </div>
            </div>
            <Editable id="footer.home.desc" as="p">
              Autoryzowany dealer Kawasaki, Benelli i Kymco. Salon motocyklowy,
              serwis i sklep w Opolu od 1999 roku.
            </Editable>
            <div className="footer-socials">
              <a
                href="https://www.facebook.com/tomko.koko.9"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn fb"
                aria-label="Facebook"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/motofanmotocykle/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn ig"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.645.07-4.85.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85C2.295 5.785 2.569 4.517 3.544 3.542c.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.149 0-3.522.012-4.764.069-1.05.048-1.612.225-1.989.373-.5.194-.857.426-1.232.801-.375.375-.607.732-.801 1.232-.148.377-.325.94-.373 1.989-.057 1.242-.069 1.615-.069 4.764s.012 3.522.069 4.764c.048 1.05.225 1.612.373 1.989.194.5.426.857.801 1.232.375.375.732.607 1.232.801.377.148.94.325 1.989.373 1.242.057 1.615.069 4.764.069s3.522-.012 4.764-.069c1.05-.048 1.612-.225 1.989-.373.5-.194.857-.426 1.232-.801.375-.375.607-.732.801-1.232.148-.377.325-.94.373-1.989.057-1.242.069-1.615.069-4.764s-.012-3.522-.069-4.764c-.048-1.05-.225-1.612-.373-1.989-.194-.5-.426-.857-.801-1.232-.375-.375-.732-.607-1.232-.801-.377-.148-.94-.325-1.989-.373C15.522 4.013 15.149 4.001 12 4.001zm0 3.063A4.936 4.936 0 1 1 7.064 12 4.942 4.942 0 0 1 12 7.064zm0 8.135A3.199 3.199 0 1 0 8.801 12 3.2 3.2 0 0 0 12 15.199zm6.281-8.345a1.153 1.153 0 1 1-1.153-1.153 1.153 1.153 0 0 1 1.153 1.153z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <Editable id="footer.home.nav.title" as="h4">Nawigacja</Editable>
            <ul>
              <li>
                <a href="#home">{t("nav.start")}</a>
              </li>
              <li>
                <a href="#about">{t("nav.about")}</a>
              </li>
              <li>
                <a href="#brands">{t("nav.brands")}</a>
              </li>
              <li>
                <a href="#services">{t("nav.services")}</a>
              </li>
              <li>
                <a href="#news">{t("nav.news")}</a>
              </li>
              <li>
                <a href="#contact">{t("nav.contact")}</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <Editable id="footer.home.brands.title" as="h4">Marki</Editable>
            <ul>
              <li>
                <a href="https://www.kawasaki.pl/" target="_blank" rel="noopener noreferrer">
                  Kawasaki
                </a>
              </li>
              <li>
                <a href="https://poland.benelli.com/" target="_blank" rel="noopener noreferrer">
                  Benelli
                </a>
              </li>
              <li>
                <a href="https://kymco.pl/" target="_blank" rel="noopener noreferrer">
                  Kymco
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <Editable id="footer.home.contact.title" as="h4">Kontakt</Editable>
            <ul>
              <li><Editable id="footer.home.address" as="span">ul. Partyzancka 85, 45-801 Opole</Editable></li>
              <li>
                <a href="tel:601484242">601 48 42 42</a>
              </li>
              <li>
                <a href="mailto:motofan@vp.pl">motofan@vp.pl</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <Editable id="footer.home.copy" as="p">&copy; 2026 MotoFun Opole. Wszelkie prawa zastrzeżone.</Editable>
          <Editable id="footer.home.tagline" as="p">Zaprojektowano z pasją dla motocyklistów</Editable>
        </div>
      </div>
    </footer>
  );
}
