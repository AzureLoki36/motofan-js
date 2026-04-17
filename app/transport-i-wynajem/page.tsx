"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import Lightbox from "@/components/Lightbox";
import Link from "next/link";

const twImages = [
  { src: "/pics/glowna/bus1.jpg", label: "Bus – widok z boku" },
  { src: "/pics/glowna/bus2.jpg", label: "Bus – przestrzeń ładunkowa" },
  { src: "/pics/glowna/przyczepa1.jpg", label: "Przyczepa – widok z boku" },
  { src: "/pics/glowna/przyczepa2.jpg", label: "Przyczepa – prowadnice" },
];

export default function TransportIWynajem() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

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
            <span>Transport i wynajem przyczepy</span>
          </div>
          <h1 className="page-title">Transport <span className="gradient-text">i Wynajem Przyczepy</span></h1>
          <p className="page-desc">Profesjonalny transport motocykli na terenie całej Polski oraz wynajem przyczepy – wybierz opcję, która Ci odpowiada.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="tw-dual">

            {/* TRANSPORT */}
            <div className="tw-block" id="transport">
              <div className="tw-photos">
                <div className="tw-photo" onClick={() => setLightboxIdx(0)}>
                  <img src="/pics/glowna/bus1.jpg" alt="Bus transportowy MotoFan – widok z boku" />
                  <span className="tw-photo-label">Nasz bus</span>
                  <span className="tw-zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg></span>
                </div>
                <div className="tw-photo" onClick={() => setLightboxIdx(1)}>
                  <img src="/pics/glowna/bus2.jpg" alt="Wymiary przestrzeni ładunkowej busa" />
                  <span className="tw-photo-label">Przestrzeń ładunkowa</span>
                  <span className="tw-zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg></span>
                </div>
              </div>
              <div className="tw-body">
                <h2>Transport <span className="gradient-text">motocykli</span></h2>
                <p className="lead">Bezpiecznie przewieziemy Twój motocykl na terenie całej Polski – na tor, do serwisu lub z miejsca zakupu.</p>

                <div className="tw-specs">
                  <div className="tw-spec"><span>Długość ładowni</span><strong>3,30 m</strong></div>
                  <div className="tw-spec"><span>Szerokość</span><strong>1,70 m</strong></div>
                  <div className="tw-spec"><span>Wysokość</span><strong>1,80 – 1,86 m</strong></div>
                  <div className="tw-spec"><span>Pomiędzy nadkolami</span><strong>1,25 m</strong></div>
                </div>

                <div className="tw-features">
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
                    <span>Profesjonalne pasy i mocowania – motocykl dojedzie bez zarysowania</span>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    <span>Odbiór z dowolnego miejsca – zakup, awaria, tor, przeprowadzka</span>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <span>Elastyczne terminy, również w weekendy</span>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    <span>Ubezpieczenie OC przewoźnika – Twój motocykl jest zabezpieczony</span>
                  </div>
                </div>

                <div className="tw-prices">
                  <h3>Cennik transportu</h3>
                  <div className="tw-price-row"><span>Opole i okolice (do 30 km)</span><strong>od 100 zł</strong></div>
                  <div className="tw-price-row"><span>Do 100 km</span><strong>od 200 zł</strong></div>
                  <div className="tw-price-row"><span>Do 200 km</span><strong>od 350 zł</strong></div>
                  <div className="tw-price-row"><span>Powyżej 200 km</span><strong>wycena indywidualna</strong></div>
                  <p className="tw-price-note">Ceny mogą się różnić w zależności od terminu i dostępności.</p>
                </div>
              </div>
            </div>

            {/* WYNAJEM PRZYCZEPY */}
            <div className="tw-block" id="wynajem">
              <div className="tw-photos">
                <div className="tw-photo" onClick={() => setLightboxIdx(2)}>
                  <img src="/pics/glowna/przyczepa1.jpg" alt="Przyczepa do transportu motocykli – widok z boku" />
                  <span className="tw-photo-label">Nasza przyczepa</span>
                  <span className="tw-zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg></span>
                </div>
                <div className="tw-photo" onClick={() => setLightboxIdx(3)}>
                  <img src="/pics/glowna/przyczepa2.jpg" alt="Przyczepa – widok z tyłu, prowadnice" />
                  <span className="tw-photo-label">Prowadnice na koła</span>
                  <span className="tw-zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg></span>
                </div>
              </div>
              <div className="tw-body">
                <h2>Wynajem <span className="gradient-text">przyczepy</span></h2>
                <p className="lead">Wolisz sam przewieźć motocykl? Wynajmij profesjonalną przyczepę z pełnym wyposażeniem.</p>

                <div className="tw-specs">
                  <div className="tw-spec"><span>Ładowność</span><strong>do 350 kg</strong></div>
                  <div className="tw-spec"><span>Platforma</span><strong>220 × 130 cm</strong></div>
                  <div className="tw-spec"><span>Zaczep</span><strong>Kula 50 mm</strong></div>
                  <div className="tw-spec"><span>Oświetlenie</span><strong>LED, 7-pin</strong></div>
                </div>

                <div className="tw-features">
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                    <span>Aluminiowe prowadnice na koła – łatwy załadunek motocykla</span>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    <span>Komplet pasów mocujących + najazd aluminiowy w zestawie</span>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                    <span>Regularnie serwisowana, aktualny przegląd techniczny</span>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                    <span>Prawo jazdy kat. B (kod 96 lub BE) · kaucja 500 zł · umowa najmu</span>
                  </div>
                </div>

                <div className="tw-prices">
                  <h3>Cennik wynajmu</h3>
                  <div className="tw-price-row"><span>1 doba</span><strong>80 zł</strong></div>
                  <div className="tw-price-row"><span>Weekend (pt – nd)</span><strong>180 zł</strong></div>
                  <div className="tw-price-row"><span>Tydzień (7 dni)</span><strong>400 zł</strong></div>
                  <p className="tw-price-note">Kaucja zwrotna: 500 zł (gotówka lub przelew).</p>
                </div>
              </div>
            </div>
          </div>

          {/* WSPÓLNY BLOK KONTAKTOWY */}
          <div className="tw-contact">
            <div className="tw-contact-text">
              <h2>Zamów transport lub <span className="gradient-text">wynajmij przyczepę</span></h2>
              <p>Zadzwoń, podaj termin i trasę – wycenimy usługę telefonicznie. Działamy na terenie Opola i całej Polski, również w weekendy.</p>
            </div>
            <div className="tw-contact-actions">
              <a href="tel:601484242" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                601 48 42 42
              </a>
              <Link href="/#contact" className="btn btn-secondary">Formularz kontaktowy</Link>
            </div>
          </div>

          {/* DODATKOWE INFORMACJE */}
          <div className="tw-extras">
            <div className="tw-extra">
              <div className="tw-extra-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
              </div>
              <h4>Ubezpieczenie OC</h4>
              <p>Transport na ubezpieczeniu OC przewoźnika. Twój motocykl jest w pełni zabezpieczony.</p>
            </div>
            <div className="tw-extra">
              <div className="tw-extra-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <h4>Godziny otwarcia</h4>
              <p>Pon – Pt: 9:00 – 17:00<br />Sobota: 9:00 – 13:00<br />Niedziela: zamknięte</p>
            </div>
            <div className="tw-extra">
              <div className="tw-extra-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <h4>Odbiór i zwrot</h4>
              <p>ul. Partyzancka 85, 45-801 Opole. Odbiór i zwrot przyczepy w godzinach pracy salonu.</p>
            </div>
          </div>
        </div>
      </section>

      {lightboxIdx !== null && (
        <Lightbox
          images={twImages.map((i) => i.src)}
          currentIndex={lightboxIdx}
          open={true}
          onClose={() => setLightboxIdx(null)}
          onIndexChange={(i) => setLightboxIdx(i)}
        />
      )}

      <SubpageFooter />
    </>
  );
}
