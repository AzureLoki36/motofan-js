"use client";

import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import CookieBanner from "@/components/CookieBanner";
import ScrollEffects from "@/components/ScrollEffects";
import ContactForm from "@/components/ContactForm";
import FacebookSection from "@/components/FacebookSection";
import { Editable, EditableHTML, EditableImage } from "@/components/Editable";

export default function Home() {
  return (
    <>
      <Navbar isHome activeSection="Start" />
      <ScrollEffects />

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div className="hero-video-wrap">
          <video className="hero-video" autoPlay muted loop playsInline>
            <source src="/motofan-hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <EditableHTML id="home.hero.title" as="h1" className="hero-title" defaultHtml='Twoja pasja.<br/><span class="gradient-text">Nasze rzemiosło.</span>' />
          <Editable id="home.hero.sub" as="p" className="hero-sub" multiline>
            Autoryzowany dealer Kawasaki, Benelli & Kymco. Serwis, odzież, części i transport – wszystko pod jednym dachem.
          </Editable>
          <div className="hero-actions">
            <a href="#brands" className="btn btn-primary">
              Poznaj nasze marki
            </a>
            <a href="#contact" className="btn btn-ghost">
              Kontakt z nami
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <Editable id="home.hero.stat1num" as="span" className="stat-num">25+</Editable>
              <Editable id="home.hero.stat1label" as="span" className="stat-label">lat doświadczenia</Editable>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <Editable id="home.hero.stat2num" as="span" className="stat-num">500m²</Editable>
              <Editable id="home.hero.stat2label" as="span" className="stat-label">salon motocyklowy</Editable>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <Editable id="home.hero.stat3num" as="span" className="stat-num">3</Editable>
              <Editable id="home.hero.stat3label" as="span" className="stat-label">autoryzacje marek</Editable>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <Editable id="home.hero.scroll" as="span">Przewiń w dół</Editable>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">O nas</span>
            <EditableHTML id="home.about.heading" as="h2" className="section-title" defaultHtml='Pasja do motocykli<br/><span class="gradient-text">od 1999 roku</span>' />
          </div>
          <div className="about-grid">
            <div
              className="about-text"
              style={{
                gridColumn: "1/-1",
                maxWidth: 800,
                margin: "0 auto",
                width: "100%",
              }}
            >
              <Editable id="home.about.lead" as="p" className="about-lead" multiline>
                Firma MOTOFAN powstała w 1999 roku w Opolu i od samego początku stawia na jakość, pasję i profesjonalną obsługę każdego motocyklisty.
              </Editable>
              <Editable id="home.about.text" as="p" multiline>
                Dziś MotoFan to nowoczesny salon o powierzchni 500 m² przy ul. Partyzanckiej 85, gdzie oferujemy sprzedaż nowych i używanych motocykli, kompletny serwis, sklep z odzieżą oraz transport i wynajem przyczep.
              </Editable>
              <div style={{ textAlign: "center", marginTop: 30 }}>
                <a href="/historia" className="btn btn-primary">
                  Historia firmy
                </a>
              </div>
              <div style={{ marginTop: 30, textAlign: "center" }}>
                <EditableImage
                  id="home.about.image"
                  src="/pics/glowna/wejscie.jpg"
                  alt="Wejście do salonu MotoFan"
                  style={{
                    maxWidth: "100%",
                    borderRadius: 16,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRANDS ===== */}
      <section className="brands" id="brands">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Autoryzacje</span>
            <EditableHTML id="home.brands.heading" as="h2" className="section-title" defaultHtml='Firmy, z którymi<br/><span class="gradient-text">współpracujemy</span>' />
            <Editable id="home.brands.desc" as="p" className="section-desc" multiline>
              Jesteśmy oficjalnym autoryzowanym dealerem i serwisem trzech
              wiodących marek motocyklowych. Gwarantujemy oryginalne części i
              profesjonalny serwis.
            </Editable>
          </div>
          <div className="brands-grid">
            <a
              href="https://www.kawasaki.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="brand-card featured"
              id="brand-kawasaki"
            >
              <div className="brand-card-inner">
                <div className="brand-logo-wrap">
                  <EditableImage
                    id="home.img.brand.kawasaki"
                    src="/pics/marki/kawsaki.png"
                    alt="Kawasaki"
                    className="brand-logo brand-logo-lg"
                  />
                </div>
                <div className="brand-badge">
                  <Editable id="home.brand.kawasaki.badge" as="span">Autoryzowany Dealer &amp; Serwis</Editable>
                </div>
                <Editable id="home.brand.kawasaki.desc" as="p" multiline>
                  Jesteśmy autoryzowanym salonem i centrum serwisowym marki
                  Kawasaki w Opolu. Pełna gama motocykli – od sportowych Ninja
                  po turystyczne Versys.
                </Editable>
                <ul className="brand-offers">
                  <Editable id="home.brand.kawasaki.li1" as="li">Sprzedaż nowych motocykli Kawasaki</Editable>
                  <Editable id="home.brand.kawasaki.li2" as="li">Autoryzowany serwis gwarancyjny i pogwarancyjny</Editable>
                  <Editable id="home.brand.kawasaki.li3" as="li">Oryginalne części i akcesoria</Editable>
                  <Editable id="home.brand.kawasaki.li4" as="li">Diagnostyka komputerowa</Editable>
                </ul>
                <span className="brand-link">
                  Oficjalna strona Kawasaki →
                </span>
              </div>
            </a>

            <a
              href="https://poland.benelli.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="brand-card featured"
              id="brand-benelli"
            >
              <div className="brand-card-inner">
                <div className="brand-logo-wrap">
                  <EditableImage
                    id="home.img.brand.benelli"
                    src="/pics/marki/benelli-logo.png"
                    alt="Benelli"
                    className="brand-logo"
                  />
                </div>
                <div className="brand-badge">
                  <Editable id="home.brand.benelli.badge" as="span">Autoryzowany Dealer &amp; Serwis</Editable>
                </div>
                <Editable id="home.brand.benelli.desc" as="p" multiline>
                  Włoska marka o 100-letniej tradycji. Nowoczesne motocykle
                  łączące europejski design z niezawodną technologią.
                </Editable>
                <ul className="brand-offers">
                  <Editable id="home.brand.benelli.li1" as="li">Sprzedaż nowych motocykli Benelli</Editable>
                  <Editable id="home.brand.benelli.li2" as="li">Autoryzowany serwis Benelli</Editable>
                  <Editable id="home.brand.benelli.li3" as="li">Oryginalne części importowane</Editable>
                  <Editable id="home.brand.benelli.li4" as="li">Wsparcie techniczne</Editable>
                </ul>
                <span className="brand-link">
                  Oficjalna strona Benelli Polska →
                </span>
              </div>
              <div className="brand-featured-badge">⭐ Polecana</div>
            </a>

            <a
              href="https://kymco.pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="brand-card featured"
              id="brand-kymco"
            >
              <div className="brand-card-inner">
                <div className="brand-logo-wrap">
                  <EditableImage
                    id="home.img.brand.kymco"
                    src="/pics/marki/kymco.png"
                    alt="Kymco"
                    className="brand-logo brand-logo-lg"
                  />
                </div>
                <div className="brand-badge">
                  <Editable id="home.brand.kymco.badge" as="span">Autoryzowany Dealer &amp; Serwis</Editable>
                </div>
                <Editable id="home.brand.kymco.desc" as="p" multiline>
                  Tajwański producent o światowej renomie. Skutery i quady Kymco
                  – idealne dla miasta i terenu. Szeroki wybór modeli.
                </Editable>
                <ul className="brand-offers">
                  <Editable id="home.brand.kymco.li1" as="li">Skutery 50 ccm i 125 ccm</Editable>
                  <Editable id="home.brand.kymco.li2" as="li">Maxiskutery</Editable>
                  <Editable id="home.brand.kymco.li3" as="li">Quady Kymco</Editable>
                  <Editable id="home.brand.kymco.li4" as="li">Autoryzowany serwis</Editable>
                </ul>
                <span className="brand-link">
                  Oficjalna strona Kymco Polska →
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Oferta</span>
            <EditableHTML id="home.services.heading" as="h2" className="section-title" defaultHtml='Co oferujemy?' />
            <Editable id="home.services.desc" as="p" className="section-desc" multiline>
              Kompleksowa obsługa motocyklisty – od zakupu nowego pojazdu, przez
              serwis, aż po kompletne wyposażenie.
            </Editable>
          </div>
          <div className="services-grid">
            <a href="/serwis-motocyklowy" className="service-card" id="svc-service">
              <div className="service-icon-wrap service-photo">
                <EditableImage id="home.img.svc.serwis" src="https://images.unsplash.com/photo-1636761358760-101cabeeb699?w=600&h=300&fit=crop&crop=center" alt="Mechanik pracujący przy motocyklu w warsztacie" />
              </div>
              <Editable id="home.svc.serwis.title" as="h3">Serwis motocyklowy</Editable>
              <Editable id="home.svc.serwis.desc" as="p" multiline>
                Naprawiamy wszelkiego rodzaju motocykle, quady, skutery, skutery wodne i śnieżne. Remonty silników, diagnostyka, regulacje.
              </Editable>
              <ul className="service-list">
                <Editable id="home.svc.serwis.li1" as="li">Remonty silników (2T i 4T)</Editable>
                <Editable id="home.svc.serwis.li2" as="li">Czyszczenie i synchronizacja gaźników</Editable>
                <Editable id="home.svc.serwis.li3" as="li">Sprawdzenie osiowości (Profi Laser S-BAT)</Editable>
                <Editable id="home.svc.serwis.li4" as="li">Diagnostyka komputerowa (Motorscan 5850)</Editable>
                <Editable id="home.svc.serwis.li5" as="li">Gwarancja na wykonane usługi</Editable>
              </ul>
            </a>

            <a href="/sklep" className="service-card" id="svc-shop">
              <div className="service-icon-wrap service-photo">
                <EditableImage id="home.img.svc.sklep" src="/pics/glowna/odziez.jpg" alt="Odzież motocyklowa w sklepie" />
              </div>
              <Editable id="home.svc.sklep.title" as="h3">Sklep z odzieżą i akcesoriami</Editable>
              <Editable id="home.svc.sklep.desc" as="p" multiline>
                Odzież motocyklowa SECA, kaski AGV i Nolan, oleje Motul, rękawice, buty i akcesoria.
              </Editable>
              <ul className="service-list">
                <Editable id="home.svc.sklep.li1" as="li">Kaski (pełne, szczękowe, turystyczne)</Editable>
                <Editable id="home.svc.sklep.li2" as="li">Kurtki motocyklowe</Editable>
                <Editable id="home.svc.sklep.li3" as="li">Spodnie motocyklowe</Editable>
                <Editable id="home.svc.sklep.li4" as="li">Rękawice (letnie, zimowe)</Editable>
                <Editable id="home.svc.sklep.li5" as="li">Buty motocyklowe</Editable>
              </ul>
            </a>

            <a href="/czesci" className="service-card" id="svc-parts">
              <div className="service-icon-wrap service-photo">
                <EditableImage id="home.img.svc.czesci" src="https://images.unsplash.com/photo-1775141570840-7e9578242d24?w=600&h=300&fit=crop&crop=center" alt="Silnik motocykla Kawasaki – części" />
              </div>
              <Editable id="home.svc.czesci.title" as="h3">Sprzedaż części</Editable>
              <Editable id="home.svc.czesci.desc" as="p" multiline>
                Szeroki wybór oryginalnych i zamiennikowych części do motocykli, skuterów i quadów.
              </Editable>
              <ul className="service-list">
                <Editable id="home.svc.czesci.li1" as="li">Oryginalne części Kawasaki, Benelli, Kymco</Editable>
                <Editable id="home.svc.czesci.li2" as="li">Części do chińskich skuterów i motocykli</Editable>
                <Editable id="home.svc.czesci.li3" as="li">Akcesoria i tuning</Editable>
                <Editable id="home.svc.czesci.li4" as="li">Oleje i płyny eksploatacyjne</Editable>
                <Editable id="home.svc.czesci.li5" as="li">Opony motocyklowe</Editable>
              </ul>
            </a>

            <a href="/motocykle-nowe" className="service-card" id="svc-new">
              <div className="service-icon-wrap service-photo">
                <EditableImage id="home.img.svc.nowe" src="/pics/glowna/moto_nowe.jpg" alt="Nowe motocykle w salonie MotoFan" />
              </div>
              <Editable id="home.svc.nowe.title" as="h3">Nowe motocykle</Editable>
              <Editable id="home.svc.nowe.desc" as="p" multiline>
                Autoryzowany salon Kawasaki, Benelli i Kymco. Pełna gama nowych motocykli, skuterów i quadów z gwarancją producenta.
              </Editable>
              <ul className="service-list">
                <Editable id="home.svc.nowe.li1" as="li">Motocykle Kawasaki – cała gama modeli</Editable>
                <Editable id="home.svc.nowe.li2" as="li">Motocykle i skutery Benelli</Editable>
                <Editable id="home.svc.nowe.li3" as="li">Skutery i quady Kymco</Editable>
                <Editable id="home.svc.nowe.li4" as="li">Kredyt, leasing, rejestracja na miejscu</Editable>
              </ul>
            </a>

            <a href="/motocykle-uzywane" className="service-card" id="svc-used">
              <div className="service-icon-wrap service-photo">
                <EditableImage id="home.img.svc.uzywane" src="/pics/glowna/motorki.jpg" alt="Motocykle używane w salonie" />
              </div>
              <Editable id="home.svc.uzywane.title" as="h3">Motocykle używane</Editable>
              <Editable id="home.svc.uzywane.desc" as="p" multiline>
                Skup i sprzedaż sprawdzonych motocykli używanych. Każdy pojazd dokładnie weryfikowany przez naszych techników.
              </Editable>
              <ul className="service-list">
                <Editable id="home.svc.uzywane.li1" as="li">Sprawdzone pojazdy z historią serwisową</Editable>
                <Editable id="home.svc.uzywane.li2" as="li">Weryfikacja techniczna przed zakupem</Editable>
                <Editable id="home.svc.uzywane.li3" as="li">Pomoc w formalnościach</Editable>
                <Editable id="home.svc.uzywane.li4" as="li">Skup motocykli</Editable>
              </ul>
            </a>

            <a
              href="/transport-i-wynajem"
              className="service-card"
              id="svc-transport"
            >
              <div className="service-icon-wrap service-photo">
                <EditableImage id="home.img.svc.transport" src="/pics/glowna/transport.jpg" alt="Transport motocykli i wynajem przyczepy" />
              </div>
              <Editable id="home.svc.transport.title" as="h3">Transport i wynajem przyczepy</Editable>
              <Editable id="home.svc.transport.desc" as="p" multiline>
                Profesjonalny transport motocykli na terenie całej Polski oraz wynajem przyczepy do samodzielnego przewozu.
              </Editable>
              <ul className="service-list">
                <Editable id="home.svc.transport.li1" as="li">Transport motocykli – cała Polska</Editable>
                <Editable id="home.svc.transport.li2" as="li">Wynajem przyczepy motocyklowej</Editable>
                <Editable id="home.svc.transport.li3" as="li">Specjalistyczne mocowania</Editable>
                <Editable id="home.svc.transport.li4" as="li">Ubezpieczenie ładunku</Editable>
              </ul>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FACEBOOK FEED ===== */}
      <FacebookSection />

      {/* ===== CONTACT ===== */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Dojazd i kontakt</span>
            <EditableHTML id="home.contact.heading" as="h2" className="section-title" defaultHtml='Znajdź nas <span class="gradient-text">w Opolu</span>' />
          </div>
          <div className="contact-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="contact-card">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <Editable id="home.contact.label.address" as="strong">Adres</Editable>
                    <Editable id="home.contact.address" as="p" multiline>
                      ul. Partyzancka 85, 45-801 Opole
                    </Editable>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <Editable id="home.contact.label.phone" as="strong">Telefon</Editable>
                    <Editable id="home.contact.phone" as="a" className="contact-link">
                      601 48 42 42
                    </Editable>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <Editable id="home.contact.label.email" as="strong">E-mail</Editable>
                    <Editable id="home.contact.email" as="a" className="contact-link">
                      motofan@vp.pl
                    </Editable>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="#1877f2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <Editable id="home.contact.label.facebook" as="strong">Facebook</Editable>
                    <a
                      href="https://www.facebook.com/tomko.koko.9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      <Editable id="home.contact.facebook" as="span">Motofan Tomasz Kokoszka</Editable>
                    </a>
                  </div>
                </div>
              </div>
              <div className="hours-card">
                <Editable id="home.hours.title" as="h3">Godziny otwarcia</Editable>
                <div className="hours-grid">
                  <Editable id="home.hours.label1" as="span">Poniedziałek – Piątek</Editable>
                  <Editable id="home.hours.weekdays" as="span" className="hours-time">9:00 – 18:00</Editable>
                  <Editable id="home.hours.label2" as="span">Sobota</Editable>
                  <Editable id="home.hours.saturday" as="span" className="hours-time">9:00 – 14:00</Editable>
                  <Editable id="home.hours.label3" as="span">Niedziela</Editable>
                  <Editable id="home.hours.sunday" as="span" className="hours-time closed">Zamknięte</Editable>
                </div>
              </div>
            </div>
            <div className="contact-map">
              <iframe
                title="MotoFan Opole na mapie"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.177604432097!2d17.932745076929643!3d50.64931777159756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711173f891d099b%3A0x9abbc4453888e0f0!2sPartyzancka%2085%2C%2045-801%20Opole!5e0!3m2!1spl!2spl!4v1712000000000!5m2!1spl!2spl"
                style={{ border: 0, width: "100%", height: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <HomeFooter />
      <CookieBanner />
    </>
  );
}
