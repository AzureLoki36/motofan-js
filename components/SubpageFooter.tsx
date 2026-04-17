"use client";

import Link from "next/link";
import { Editable } from "@/components/Editable";

export default function SubpageFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">
                MOTO<span className="logo-accent">FAN</span>
              </span>
              <span className="logo-sub">Opole</span>
            </div>
            <Editable id="footer.sub.desc" as="p">
              Autoryzowany dealer i serwis Kawasaki, Benelli, Kymco. Od 1999
              roku służymy motocyklistom w Opolu.
            </Editable>
          </div>
          <div className="footer-links">
            <Editable id="footer.sub.services.title" as="h4">Usługi</Editable>
            <ul>
              <li><Link href="/serwis-motocyklowy">Serwis motocyklowy</Link></li>
              <li><Link href="/sklep">Sklep z odzieżą</Link></li>
              <li><Link href="/czesci">Sprzedaż części</Link></li>
              <li><Link href="/motocykle-nowe">Motocykle nowe</Link></li>
              <li><Link href="/motocykle-uzywane">Motocykle używane</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <Editable id="footer.sub.links.title" as="h4">Przydatne linki</Editable>
            <ul>
              <li><Link href="/transport-i-wynajem">Transport i wynajem przyczepy</Link></li>
              <li><Link href="/#contact">Kontakt</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <Editable id="footer.sub.contact.title" as="h4">Kontakt</Editable>
            <p>
              <Editable id="footer.sub.address1" as="span">ul. Partyzancka 85</Editable>
              <br />
              <Editable id="footer.sub.address2" as="span">45-801 Opole</Editable>
            </p>
            <p>
              <a href="tel:601484242">601 48 42 42</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <Editable id="footer.sub.copy" as="p">&copy; 2026 MotoFan Opole. Wszelkie prawa zastrzeżone.</Editable>
        </div>
      </div>
    </footer>
  );
}
