"use client";

import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import Link from "next/link";
import { Editable, EditableHTML } from "@/components/Editable";

export default function Czesci() {
  return (
    <>
      <Navbar activeSection="Usługi" />

      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Strona główna</Link>
            <span>/</span>
            <Link href="/#services">Usługi</Link>
            <span>/</span>
            <span>Sprzedaż części</span>
          </div>
          <EditableHTML id="czesci.title" as="h1" className="page-title" defaultHtml='Sprzedaż <span class="gradient-text">Części Zamiennych</span>' />
          <Editable id="czesci.desc" as="p" className="page-desc" multiline>Oryginalne części OEM oraz wysokiej jakości zamienniki do motocykli Kawasaki, Benelli, Kymco i innych marek.</Editable>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <EditableHTML id="czesci.h2.marki" as="h2" defaultHtml='Części do <span class="gradient-text">wszystkich marek</span>' />
          <Editable id="czesci.lead" as="p" className="lead" multiline>Jako autoryzowany dealer Kawasaki, Benelli i Kymco mamy bezpośredni dostęp do oryginalnych części. Zamawiamy także części do innych producentów.</Editable>

          <div className="brands-showcase" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: "30px" }}>
            <a href="#jak-zamowic" className="brand-showcase-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", textDecoration: "none" }}>
              <img src="/pics/marki/kawsaki.png" alt="Kawasaki" style={{ height: "150px", width: "auto" }} />
            </a>
            <a href="#jak-zamowic" className="brand-showcase-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", textDecoration: "none" }}>
              <img src="/pics/marki/benelli-logo.png" alt="Benelli" style={{ height: "100px", width: "auto" }} />
            </a>
            <a href="#jak-zamowic" className="brand-showcase-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", textDecoration: "none" }}>
              <img src="/pics/marki/kymco.png" alt="Kymco" style={{ height: "150px", width: "auto" }} />
            </a>
          </div>

          <div className="content-grid">
            <div className="content-main">
              <EditableHTML id="czesci.h2.kategorie" as="h2" defaultHtml='Kategorie <span class="gradient-text">części</span>' />

              <div className="repairs-list">
                <a href="#jak-zamowic" className="repair-item" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                  <Editable id="czesci.cat1.name" as="span" className="repair-name">Silnik</Editable>
                  <Editable id="czesci.cat1.desc" as="span" className="repair-desc">Tłoki, uszczelki, łańcuchy rozrządu, filtry oleju</Editable>
                </a>
                <a href="#jak-zamowic" className="repair-item" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                  <Editable id="czesci.cat2.name" as="span" className="repair-name">Hamulce</Editable>
                  <Editable id="czesci.cat2.desc" as="span" className="repair-desc">Klocki, tarcze, przewody, zaciski, pompy</Editable>
                </a>
                <a href="#jak-zamowic" className="repair-item" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                  <Editable id="czesci.cat3.name" as="span" className="repair-name">Zawieszenie</Editable>
                  <Editable id="czesci.cat3.desc" as="span" className="repair-desc">Amortyzatory, sprężyny, łożyska, uszczelniacze</Editable>
                </a>
                <a href="#jak-zamowic" className="repair-item" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                  <Editable id="czesci.cat4.name" as="span" className="repair-name">Napęd</Editable>
                  <Editable id="czesci.cat4.desc" as="span" className="repair-desc">Łańcuchy, zębatki, paski, wały kardana</Editable>
                </a>
                <a href="#jak-zamowic" className="repair-item" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                  <Editable id="czesci.cat5.name" as="span" className="repair-name">Elektryka</Editable>
                  <Editable id="czesci.cat5.desc" as="span" className="repair-desc">Akumulatory, alternatory, cewki, świece, czujniki</Editable>
                </a>
                <a href="#jak-zamowic" className="repair-item" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                  <Editable id="czesci.cat6.name" as="span" className="repair-name">Owiewki i plastiki</Editable>
                  <Editable id="czesci.cat6.desc" as="span" className="repair-desc">Owiewki, błotniki, osłony, naklejki</Editable>
                </a>
              </div>

              <EditableHTML id="czesci.h2.dlaczego" as="h2" defaultHtml='Dlaczego <span class="gradient-text">u nas?</span>' />

              <div className="service-features">
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/czesci/katalogczesci.png" alt="Katalog części na magazynie" />
                  </div>
                  <Editable id="czesci.box1.title" as="h3">Katalog części na magazynie</Editable>
                  <Editable id="czesci.box1.desc" as="p" multiline>Stały zapas najpopularniejszych części eksploatacyjnych gotowych do odbioru od ręki.</Editable>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/czesci/dostawa.png" alt="Szybka dostawa" />
                  </div>
                  <Editable id="czesci.box2.title" as="h3">Szybka dostawa</Editable>
                  <Editable id="czesci.box2.desc" as="p" multiline>Większość części dostarczamy w ciągu 2-5 dni roboczych.</Editable>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/czesci/doborczesci.png" alt="Dobór części po numerze VIN" />
                  </div>
                  <Editable id="czesci.box3.title" as="h3">Dobór części po numerze VIN</Editable>
                  <Editable id="czesci.box3.desc" as="p" multiline>Podaj VIN motocykla, a znajdziemy dokładnie pasującą część z katalogu producenta.</Editable>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/czesci/montaz.png" alt="Montaż w naszym serwisie" />
                  </div>
                  <Editable id="czesci.box4.title" as="h3">Montaż w naszym serwisie</Editable>
                  <Editable id="czesci.box4.desc" as="p" multiline>Zamówione części zamontujemy od razu na miejscu w naszym warsztacie.</Editable>
                </div>
              </div>

              <h3 id="jak-zamowic">Jak zamówić część?</h3>
              <ol className="steps-list">
                <li>
                  <span className="step-number">1</span>
                  <div>
                    <strong>Podaj dane motocykla</strong>
                    <p>Marka, model, rok produkcji, numer VIN (jeśli dostępny)</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <div>
                    <strong>Opisz potrzebną część</strong>
                    <p>Nazwa, numer katalogowy lub zdjęcie części</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <div>
                    <strong>Otrzymaj wycenę</strong>
                    <p>Przygotujemy ofertę z ceną i czasem dostawy</p>
                  </div>
                </li>
                <li>
                  <span className="step-number">4</span>
                  <div>
                    <strong>Odbierz lub zamów dostawę</strong>
                    <p>Możesz odebrać część w salonie lub zamówić wysyłkę</p>
                  </div>
                </li>
              </ol>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h4>Godziny otwarcia</h4>
                <div className="hours-list">
                  <div className="hours-row">
                    <span>Poniedziałek – Piątek</span>
                    <span>9:00 – 17:00</span>
                  </div>
                  <div className="hours-row">
                    <span>Sobota</span>
                    <span>9:00 – 13:00</span>
                  </div>
                  <div className="hours-row">
                    <span>Niedziela</span>
                    <span>Zamknięte</span>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h4>Przydatne informacje</h4>
                <ul className="sidebar-list">
                  <li>Numer VIN przyspiesza wyszukanie części</li>
                  <li>Montaż zamówionych części w naszym serwisie</li>
                  <li>Możliwość zwrotu nieużywanej części do 14 dni</li>
                </ul>
              </div>

              <div className="sidebar-card cta-card">
                <Editable id="czesci.cta.title" as="h3">Zamów części</Editable>
                <Editable id="czesci.cta.desc" as="p" multiline>Zadzwoń lub napisz – podaj markę, model i rok produkcji motocykla</Editable>
                <a href="tel:601484242" className="btn btn-primary btn-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  601 48 42 42
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SubpageFooter />
    </>
  );
}
