"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import { Editable, EditableHTML } from "@/components/Editable";
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
          <EditableHTML id="transport.title" as="h1" className="page-title" defaultHtml='Transport <span class="gradient-text">i Wynajem Przyczepy</span>' />
          <Editable id="transport.desc" as="p" className="page-desc">Profesjonalny transport motocykli na terenie całej Polski oraz wynajem przyczepy – wybierz opcję, która Ci odpowiada.</Editable>
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
                <EditableHTML id="transport.h2.transport" as="h2" defaultHtml='Transport <span class="gradient-text">motocykli</span>' />
                <Editable id="transport.transport.lead" as="p" className="lead" multiline>Bezpiecznie przewieziemy Twój motocykl na terenie całej Polski – na tor, do serwisu lub z miejsca zakupu.</Editable>

                <div className="tw-specs">
                  <div className="tw-spec"><Editable id="transport.spec1.label" as="span">Długość ładowni</Editable><Editable id="transport.spec1.value" as="strong">3,30 m</Editable></div>
                  <div className="tw-spec"><Editable id="transport.spec2.label" as="span">Szerokość</Editable><Editable id="transport.spec2.value" as="strong">1,70 m</Editable></div>
                  <div className="tw-spec"><Editable id="transport.spec3.label" as="span">Wysokość</Editable><Editable id="transport.spec3.value" as="strong">1,80 – 1,86 m</Editable></div>
                  <div className="tw-spec"><Editable id="transport.spec4.label" as="span">Pomiędzy nadkolami</Editable><Editable id="transport.spec4.value" as="strong">1,25 m</Editable></div>
                </div>

                <div className="tw-features">
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
                    <Editable id="transport.tf1" as="span">Profesjonalne pasy i mocowania – motocykl dojedzie bez zarysowania</Editable>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                    <Editable id="transport.tf2" as="span">Odbiór z dowolnego miejsca – zakup, awaria, tor, przeprowadzka</Editable>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <Editable id="transport.tf3" as="span">Elastyczne terminy, również w weekendy</Editable>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    <Editable id="transport.tf4" as="span">Ubezpieczenie OC przewoźnika – Twój motocykl jest zabezpieczony</Editable>
                  </div>
                </div>

                <div className="tw-prices">
                  <Editable id="transport.price.title" as="h3">Cennik transportu</Editable>
                  <div className="tw-price-row"><Editable id="transport.tp1.label" as="span">Opole i okolice (do 30 km)</Editable><Editable id="transport.tp1.price" as="strong">od 100 zł</Editable></div>
                  <div className="tw-price-row"><Editable id="transport.tp2.label" as="span">Do 100 km</Editable><Editable id="transport.tp2.price" as="strong">od 200 zł</Editable></div>
                  <div className="tw-price-row"><Editable id="transport.tp3.label" as="span">Do 200 km</Editable><Editable id="transport.tp3.price" as="strong">od 350 zł</Editable></div>
                  <div className="tw-price-row"><Editable id="transport.tp4.label" as="span">Powyżej 200 km</Editable><Editable id="transport.tp4.price" as="strong">wycena indywidualna</Editable></div>
                  <Editable id="transport.tp.note" as="p" className="tw-price-note" multiline>Ceny mogą się różnić w zależności od terminu i dostępności.</Editable>
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
                <EditableHTML id="transport.h2.wynajem" as="h2" defaultHtml='Wynajem <span class="gradient-text">przyczepy</span>' />
                <Editable id="transport.wynajem.lead" as="p" className="lead" multiline>Wolisz sam przewieźć motocykl? Wynajmij profesjonalną przyczepę z pełnym wyposażeniem.</Editable>

                <div className="tw-specs">
                  <div className="tw-spec"><Editable id="transport.rspec1.label" as="span">Ładowność</Editable><Editable id="transport.rspec1.value" as="strong">do 350 kg</Editable></div>
                  <div className="tw-spec"><Editable id="transport.rspec2.label" as="span">Platforma</Editable><Editable id="transport.rspec2.value" as="strong">220 × 130 cm</Editable></div>
                  <div className="tw-spec"><Editable id="transport.rspec3.label" as="span">Zaczep</Editable><Editable id="transport.rspec3.value" as="strong">Kula 50 mm</Editable></div>
                  <div className="tw-spec"><Editable id="transport.rspec4.label" as="span">Oświetlenie</Editable><Editable id="transport.rspec4.value" as="strong">LED, 7-pin</Editable></div>
                </div>

                <div className="tw-features">
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                    <Editable id="transport.rf1" as="span">Aluminiowe prowadnice na koła – łatwy załadunek motocykla</Editable>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    <Editable id="transport.rf2" as="span">Komplet pasów mocujących + najazd aluminiowy w zestawie</Editable>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                    <Editable id="transport.rf3" as="span">Regularnie serwisowana, aktualny przegląd techniczny</Editable>
                  </div>
                  <div className="tw-feat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                    <Editable id="transport.rf4" as="span">Prawo jazdy kat. B (kod 96 lub BE) · kaucja 500 zł · umowa najmu</Editable>
                  </div>
                </div>

                <div className="tw-prices">
                  <Editable id="transport.rprice.title" as="h3">Cennik wynajmu</Editable>
                  <div className="tw-price-row"><Editable id="transport.rp1.label" as="span">1 doba</Editable><Editable id="transport.rp1.price" as="strong">80 zł</Editable></div>
                  <div className="tw-price-row"><Editable id="transport.rp2.label" as="span">Weekend (pt – nd)</Editable><Editable id="transport.rp2.price" as="strong">180 zł</Editable></div>
                  <div className="tw-price-row"><Editable id="transport.rp3.label" as="span">Tydzień (7 dni)</Editable><Editable id="transport.rp3.price" as="strong">400 zł</Editable></div>
                  <Editable id="transport.rp.note" as="p" className="tw-price-note" multiline>Kaucja zwrotna: 500 zł (gotówka lub przelew).</Editable>
                </div>
              </div>
            </div>
          </div>

          {/* WSPÓLNY BLOK KONTAKTOWY */}
          <div className="tw-contact">
            <div className="tw-contact-text">
              <EditableHTML id="transport.h2.contact" as="h2" defaultHtml='Zamów transport lub <span class="gradient-text">wynajmij przyczepę</span>' />
              <Editable id="transport.contact.desc" as="p" multiline>Zadzwoń, podaj termin i trasę – wycenimy usługę telefonicznie. Działamy na terenie Opola i całej Polski, również w weekendy.</Editable>
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
              <Editable id="transport.extra1.title" as="h4">Ubezpieczenie OC</Editable>
              <Editable id="transport.extra1.desc" as="p" multiline>Transport na ubezpieczeniu OC przewoźnika. Twój motocykl jest w pełni zabezpieczony.</Editable>
            </div>
            <div className="tw-extra">
              <div className="tw-extra-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <Editable id="transport.extra2.title" as="h4">Godziny otwarcia</Editable>
              <Editable id="transport.extra2.desc" as="p" multiline>Pon – Pt: 9:00 – 17:00
Sobota: 9:00 – 13:00
Niedziela: zamknięte</Editable>
            </div>
            <div className="tw-extra">
              <div className="tw-extra-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <Editable id="transport.extra3.title" as="h4">Odbiór i zwrot</Editable>
              <Editable id="transport.extra3.desc" as="p" multiline>ul. Partyzancka 85, 45-801 Opole. Odbiór i zwrot przyczepy w godzinach pracy salonu.</Editable>
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
