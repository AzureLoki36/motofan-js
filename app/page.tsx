import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import CookieBanner from "@/components/CookieBanner";
import ScrollEffects from "@/components/ScrollEffects";
import ContactForm from "@/components/ContactForm";
import FacebookSection from "@/components/FacebookSection";

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
          <h1 className="hero-title">
            Twoja pasja.
            <br />
            <span className="gradient-text">Nasze rzemiosło.</span>
          </h1>
          <p className="hero-sub">
            Autoryzowany dealer Kawasaki, Benelli &amp; Kymco.
            <br />
            Serwis, odzież, części i transport – wszystko pod jednym dachem.
          </p>
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
              <span className="stat-num">25+</span>
              <span className="stat-label">lat doświadczenia</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">500m²</span>
              <span className="stat-label">salon motocyklowy</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-num">3</span>
              <span className="stat-label">autoryzacje marek</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Przewiń w dół</span>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">O nas</span>
            <h2 className="section-title">
              Pasja do motocykli
              <br />
              <span className="gradient-text">od 1999 roku</span>
            </h2>
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
              <p className="about-lead">
                Firma MOTOFAN powstała w <strong>1999 roku</strong> w Opolu i od
                samego początku stawia na jakość, pasję i profesjonalną obsługę
                każdego motocyklisty.
              </p>
              <p>
                Dziś MotoFan to nowoczesny salon o powierzchni{" "}
                <strong>500 m²</strong> przy ul. Partyzanckiej 85, gdzie
                oferujemy sprzedaż nowych i używanych motocykli, kompletny
                serwis, sklep z odzieżą oraz transport i wynajem przyczep.
              </p>
              <div style={{ textAlign: "center", marginTop: 30 }}>
                <a href="/historia" className="btn btn-primary">
                  Historia firmy
                </a>
              </div>
              <div style={{ marginTop: 30, textAlign: "center" }}>
                <img
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
            <h2 className="section-title">
              Firmy, z którymi
              <br />
              <span className="gradient-text">współpracujemy</span>
            </h2>
            <p className="section-desc">
              Jesteśmy oficjalnym autoryzowanym dealerem i serwisem trzech
              wiodących marek motocyklowych. Gwarantujemy oryginalne części i
              profesjonalny serwis.
            </p>
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
                  <img
                    src="/pics/marki/kawsaki.png"
                    alt="Kawasaki"
                    className="brand-logo brand-logo-lg"
                  />
                </div>
                <div className="brand-badge">
                  Autoryzowany Dealer &amp; Serwis
                </div>
                <p>
                  Jesteśmy autoryzowanym salonem i centrum serwisowym marki
                  Kawasaki w Opolu. Pełna gama motocykli – od sportowych Ninja
                  po turystyczne Versys.
                </p>
                <ul className="brand-offers">
                  <li>Sprzedaż nowych motocykli Kawasaki</li>
                  <li>Autoryzowany serwis gwarancyjny i pogwarancyjny</li>
                  <li>Oryginalne części i akcesoria</li>
                  <li>Diagnostyka komputerowa</li>
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
                  <img
                    src="/pics/marki/benelli-logo.png"
                    alt="Benelli"
                    className="brand-logo"
                  />
                </div>
                <div className="brand-badge">
                  Autoryzowany Dealer &amp; Serwis
                </div>
                <p>
                  Włoska marka o 100-letniej tradycji. Nowoczesne motocykle
                  łączące europejski design z niezawodną technologią.
                </p>
                <ul className="brand-offers">
                  <li>Sprzedaż nowych motocykli Benelli</li>
                  <li>Autoryzowany serwis Benelli</li>
                  <li>Oryginalne części importowane</li>
                  <li>Wsparcie techniczne</li>
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
                  <img
                    src="/pics/marki/kymco.png"
                    alt="Kymco"
                    className="brand-logo brand-logo-lg"
                  />
                </div>
                <div className="brand-badge">
                  Autoryzowany Dealer &amp; Serwis
                </div>
                <p>
                  Tajwański producent o światowej renomie. Skutery i quady Kymco
                  – idealne dla miasta i terenu. Szeroki wybór modeli.
                </p>
                <ul className="brand-offers">
                  <li>Skutery 50 ccm i 125 ccm</li>
                  <li>Maxiskutery</li>
                  <li>Quady Kymco</li>
                  <li>Autoryzowany serwis</li>
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
            <h2 className="section-title">Co oferujemy?</h2>
            <p className="section-desc">
              Kompleksowa obsługa motocyklisty – od zakupu nowego pojazdu, przez
              serwis, aż po kompletne wyposażenie.
            </p>
          </div>
          <div className="services-grid">
            <a href="/serwis-motocyklowy" className="service-card" id="svc-service">
              <div className="service-icon-wrap service-photo">
                <img
                  src="https://images.unsplash.com/photo-1636761358760-101cabeeb699?w=600&h=300&fit=crop&crop=center"
                  alt="Mechanik pracujący przy motocyklu w warsztacie"
                />
              </div>
              <h3>Serwis motocyklowy</h3>
              <p>
                Naprawiamy wszelkiego rodzaju motocykle, quady, skutery, skutery
                wodne i śnieżne. Remonty silników, diagnostyka, regulacje.
              </p>
              <ul className="service-list">
                <li>Remonty silników (2T i 4T)</li>
                <li>Czyszczenie i synchronizacja gaźników</li>
                <li>Sprawdzenie osiowości (Profi Laser S-BAT)</li>
                <li>Diagnostyka komputerowa (Motorscan 5850)</li>
                <li>Gwarancja na wykonane usługi</li>
              </ul>
            </a>

            <a href="/sklep" className="service-card" id="svc-shop">
              <div className="service-icon-wrap service-photo">
                <img
                  src="/pics/glowna/odziez.jpg"
                  alt="Odzież motocyklowa w sklepie"
                />
              </div>
              <h3>Sklep z odzieżą i akcesoriami</h3>
              <p>
                Odzież motocyklowa SECA, kaski AGV i Nolan, oleje Motul,
                rękawice, buty i akcesoria.
              </p>
              <ul className="service-list">
                <li>Kaski (pełne, szczękowe, turystyczne)</li>
                <li>Kurtki motocyklowe</li>
                <li>Spodnie motocyklowe</li>
                <li>Rękawice (letnie, zimowe)</li>
                <li>Buty motocyklowe</li>
              </ul>
            </a>

            <a href="/czesci" className="service-card" id="svc-parts">
              <div className="service-icon-wrap service-photo">
                <img
                  src="https://images.unsplash.com/photo-1775141570840-7e9578242d24?w=600&h=300&fit=crop&crop=center"
                  alt="Silnik motocykla Kawasaki – części"
                />
              </div>
              <h3>Sprzedaż części</h3>
              <p>
                Szeroki wybór oryginalnych i zamiennikowych części do motocykli,
                skuterów i quadów.
              </p>
              <ul className="service-list">
                <li>Oryginalne części Kawasaki, Benelli, Kymco</li>
                <li>Części do chińskich skuterów i motocykli</li>
                <li>Akcesoria i tuning</li>
                <li>Oleje i płyny eksploatacyjne</li>
                <li>Opony motocyklowe</li>
              </ul>
            </a>

            <a href="/motocykle-nowe" className="service-card" id="svc-new">
              <div className="service-icon-wrap service-photo">
                <img
                  src="/pics/glowna/moto_nowe.jpg"
                  alt="Nowe motocykle w salonie MotoFan"
                />
              </div>
              <h3>Nowe motocykle</h3>
              <p>
                Autoryzowany salon Kawasaki, Benelli i Kymco. Pełna gama nowych
                motocykli, skuterów i quadów z gwarancją producenta.
              </p>
              <ul className="service-list">
                <li>Motocykle Kawasaki – cała gama modeli</li>
                <li>Motocykle i skutery Benelli</li>
                <li>Skutery i quady Kymco</li>
                <li>Kredyt, leasing, rejestracja na miejscu</li>
              </ul>
            </a>

            <a href="/motocykle-uzywane" className="service-card" id="svc-used">
              <div className="service-icon-wrap service-photo">
                <img
                  src="/pics/glowna/motorki.jpg"
                  alt="Motocykle używane w salonie"
                />
              </div>
              <h3>Motocykle używane</h3>
              <p>
                Skup i sprzedaż sprawdzonych motocykli używanych. Każdy pojazd
                dokładnie weryfikowany przez naszych techników.
              </p>
              <ul className="service-list">
                <li>Sprawdzone pojazdy z historią serwisową</li>
                <li>Weryfikacja techniczna przed zakupem</li>
                <li>Pomoc w formalnościach</li>
                <li>Skup motocykli</li>
              </ul>
            </a>

            <a
              href="/transport-i-wynajem"
              className="service-card"
              id="svc-transport"
            >
              <div className="service-icon-wrap service-photo">
                <img
                  src="/pics/glowna/transport.jpg"
                  alt="Transport motocykli i wynajem przyczepy"
                />
              </div>
              <h3>Transport i wynajem przyczepy</h3>
              <p>
                Profesjonalny transport motocykli na terenie całej Polski oraz
                wynajem przyczepy do samodzielnego przewozu.
              </p>
              <ul className="service-list">
                <li>Transport motocykli – cała Polska</li>
                <li>Wynajem przyczepy motocyklowej</li>
                <li>Specjalistyczne mocowania</li>
                <li>Ubezpieczenie ładunku</li>
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
            <h2 className="section-title">
              Znajdź nas <span className="gradient-text">w Opolu</span>
            </h2>
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
                    <strong>Adres</strong>
                    <p>
                      ul. Partyzancka 85
                      <br />
                      45-801 Opole
                    </p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <strong>Telefon</strong>
                    <a href="tel:601484242" className="contact-link">
                      601 48 42 42
                    </a>
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
                    <strong>E-mail</strong>
                    <a href="mailto:motofan@vp.pl" className="contact-link">
                      motofan@vp.pl
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg viewBox="0 0 24 24" fill="#1877f2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <strong>Facebook</strong>
                    <a
                      href="https://www.facebook.com/tomko.koko.9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      Motofan Tomasz Kokoszka
                    </a>
                  </div>
                </div>
              </div>
              <div className="hours-card">
                <h3>Godziny otwarcia</h3>
                <div className="hours-grid">
                  <span>Poniedziałek – Piątek</span>
                  <span className="hours-time">9:00 – 18:00</span>
                  <span>Sobota</span>
                  <span className="hours-time">9:00 – 14:00</span>
                  <span>Niedziela</span>
                  <span className="hours-time closed">Zamknięte</span>
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
