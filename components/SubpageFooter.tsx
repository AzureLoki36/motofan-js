"use client";

import Link from "next/link";
import { Editable } from "@/components/Editable";
import { useLocale } from "@/components/LocaleProvider";

export default function SubpageFooter() {
  const { t } = useLocale();
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
              <li><Link href="/serwis-motocyklowy">{t("footer.service")}</Link></li>
              <li><Link href="/sklep">{t("footer.shop")}</Link></li>
              <li><Link href="/czesci">{t("footer.parts")}</Link></li>
              <li><Link href="/motocykle-nowe">{t("footer.newBikes")}</Link></li>
              <li><Link href="/motocykle-uzywane">{t("footer.usedBikes")}</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <Editable id="footer.sub.links.title" as="h4">Przydatne linki</Editable>
            <ul>
              <li><Link href="/transport-i-wynajem">{t("footer.transport")}</Link></li>
              <li><Link href="/#contact">{t("footer.contact")}</Link></li>
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
