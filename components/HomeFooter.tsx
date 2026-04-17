"use client";

import Link from "next/link";
import { Editable } from "@/components/Editable";

interface FooterProps {
  isHome?: boolean;
}

export default function HomeFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/pics/logo.jpg"
                alt="MotoFan Tomasz Kokoszka"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="logo-text">
                MOTO<span className="logo-accent">FAN</span>
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
            </div>
          </div>
          <div className="footer-col">
            <Editable id="footer.home.nav.title" as="h4">Nawigacja</Editable>
            <ul>
              <li>
                <a href="#home">Start</a>
              </li>
              <li>
                <a href="#about">O nas</a>
              </li>
              <li>
                <a href="#brands">Marki</a>
              </li>
              <li>
                <a href="#services">Usługi</a>
              </li>
              <li>
                <a href="#news">Aktualności</a>
              </li>
              <li>
                <a href="#contact">Kontakt</a>
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
          <Editable id="footer.home.copy" as="p">&copy; 2026 MotoFan Opole. Wszelkie prawa zastrzeżone.</Editable>
          <Editable id="footer.home.tagline" as="p">Zaprojektowano z pasją dla motocyklistów</Editable>
        </div>
      </div>
    </footer>
  );
}
