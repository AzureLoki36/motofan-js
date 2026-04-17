"use client";

import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import Link from "next/link";
import { Editable, EditableHTML } from "@/components/Editable";

export default function SerwisMotocyklowy() {
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
            <span>Serwis motocyklowy</span>
          </div>
          <EditableHTML id="serwis.title" as="h1" className="page-title" defaultHtml='Serwis <span class="gradient-text">Motocyklowy</span>' />
          <Editable id="serwis.desc" as="p" className="page-desc" multiline>Profesjonalna obsługa i naprawy motocykli, skuterów, quadów oraz pojazdów wodnych i śnieżnych. Ponad 25 lat doświadczenia.</Editable>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <EditableHTML id="serwis.h2.uslugi" as="h2" defaultHtml='Nasze <span class="gradient-text">usługi serwisowe</span>' />
              <Editable id="serwis.lead" as="p" className="lead" multiline>Nasz serwis motocyklowy oferuje kompleksową obsługę pojazdów jednośladowych. Dysponujemy nowoczesnym sprzętem diagnostycznym i doświadczoną kadrą mechaników.</Editable>

              <div className="service-features">
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/remonty_silnikow.png" alt="Rozłożony silnik motocyklowy" />
                  </div>
                  <Editable id="serwis.feat1.title" as="h3">Remonty silników</Editable>
                  <Editable id="serwis.feat1.desc" as="p" multiline>Kompleksowe remonty silników 2-suwowych i 4-suwowych. Wymiana tłoków, pierścieni, łożysk, wałów korbowych.</Editable>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/diagnostykakomputerowa.png" alt="Diagnostyka komputerowa motocykla" />
                  </div>
                  <Editable id="serwis.feat2.title" as="h3">Diagnostyka komputerowa</Editable>
                  <Editable id="serwis.feat2.desc" as="p" multiline>Profesjonalna diagnostyka przy użyciu Motorscan 5850. Odczyt błędów, kasowanie, programowanie.</Editable>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/gaznik.png" alt="Gaźnik motocyklowy" />
                  </div>
                  <Editable id="serwis.feat3.title" as="h3">Regulacja gaźników</Editable>
                  <Editable id="serwis.feat3.desc" as="p" multiline>Czyszczenie, synchronizacja i regulacja gaźników. Przywracamy płynną pracę silnika.</Editable>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/diagnostyka_laserowa.png" alt="Laserowa maszyna sprawdzająca osiowość motocykla" />
                  </div>
                  <Editable id="serwis.feat4.title" as="h3">Sprawdzenie osiowości</Editable>
                  <Editable id="serwis.feat4.desc" as="p" multiline>Precyzyjne ustawienie geometrii z użyciem Profi Laser S-BAT. Bezpieczeństwo i stabilność jazdy.</Editable>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/przeglady_okresowe.png" alt="Przegląd okresowy motocykla" />
                  </div>
                  <Editable id="serwis.feat5.title" as="h3">Przeglądy okresowe</Editable>
                  <Editable id="serwis.feat5.desc" as="p" multiline>Kompleksowe przeglądy zgodne z zaleceniami producenta. Przedłużamy żywotność Twojego pojazdu.</Editable>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/naprawa_zawiezenia.png" alt="Naprawa zawieszenia motocykla" />
                  </div>
                  <Editable id="serwis.feat6.title" as="h3">Naprawa zawieszenia</Editable>
                  <Editable id="serwis.feat6.desc" as="p" multiline>Regeneracja amortyzatorów, wymiana łożysk główki ramy, wahacza i kół.</Editable>
                </div>
              </div>

              <EditableHTML id="serwis.h2.naprawy" as="h2" defaultHtml='Przykładowe <span class="gradient-text">naprawy</span>' />
              <div className="repairs-list">
                <div className="repair-item">
                  <Editable id="serwis.rep1.name" as="span" className="repair-name">Wymiana oleju silnikowego + filtr</Editable>
                  <Editable id="serwis.rep1.desc" as="span" className="repair-desc">Olej syntetyczny, filtr oryginalny lub zamiennik</Editable>
                </div>
                <div className="repair-item">
                  <Editable id="serwis.rep2.name" as="span" className="repair-name">Wymiana klocków hamulcowych (przód/tył)</Editable>
                  <Editable id="serwis.rep2.desc" as="span" className="repair-desc">Klocki oryginalne lub zamienniki premium</Editable>
                </div>
                <div className="repair-item">
                  <Editable id="serwis.rep3.name" as="span" className="repair-name">Wymiana łańcucha i zębatek</Editable>
                  <Editable id="serwis.rep3.desc" as="span" className="repair-desc">Komplet napędowy + regulacja</Editable>
                </div>
                <div className="repair-item">
                  <Editable id="serwis.rep4.name" as="span" className="repair-name">Synchronizacja gaźników</Editable>
                  <Editable id="serwis.rep4.desc" as="span" className="repair-desc">Czyszczenie, regulacja, próba drogowa</Editable>
                </div>
                <div className="repair-item">
                  <Editable id="serwis.rep5.name" as="span" className="repair-name">Remont silnika 4T (kompletny)</Editable>
                  <Editable id="serwis.rep5.desc" as="span" className="repair-desc">Tłok, pierścienie, łożyska, uszczelki</Editable>
                </div>
                <div className="repair-item">
                  <Editable id="serwis.rep6.name" as="span" className="repair-name">Diagnostyka komputerowa</Editable>
                  <Editable id="serwis.rep6.desc" as="span" className="repair-desc">Odczyt błędów, raport stanu pojazdu</Editable>
                </div>
              </div>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <Editable id="serwis.price.title" as="h3">Cennik orientacyjny</Editable>
                <Editable id="serwis.price.note" as="p" className="sidebar-note" multiline>Ceny mogą się różnić w zależności od modelu i zakresu prac.</Editable>
                <ul className="price-list">
                  <li><Editable id="serwis.pr1.name" as="span">Wymiana oleju + filtr</Editable><Editable id="serwis.pr1.price" as="strong">od 80 zł</Editable></li>
                  <li><Editable id="serwis.pr2.name" as="span">Wymiana klocków hamulcowych</Editable><Editable id="serwis.pr2.price" as="strong">od 50 zł</Editable></li>
                  <li><Editable id="serwis.pr3.name" as="span">Wymiana łańcucha + zębatki</Editable><Editable id="serwis.pr3.price" as="strong">od 150 zł</Editable></li>
                  <li><Editable id="serwis.pr4.name" as="span">Synchronizacja gaźników</Editable><Editable id="serwis.pr4.price" as="strong">od 200 zł</Editable></li>
                  <li><Editable id="serwis.pr5.name" as="span">Diagnostyka komputerowa</Editable><Editable id="serwis.pr5.price" as="strong">od 100 zł</Editable></li>
                  <li><Editable id="serwis.pr6.name" as="span">Sprawdzenie osiowości</Editable><Editable id="serwis.pr6.price" as="strong">od 150 zł</Editable></li>
                  <li><Editable id="serwis.pr7.name" as="span">Przegląd sezonowy</Editable><Editable id="serwis.pr7.price" as="strong">od 200 zł</Editable></li>
                  <li><Editable id="serwis.pr8.name" as="span">Remont silnika 4T</Editable><Editable id="serwis.pr8.price" as="strong">od 1500 zł</Editable></li>
                  <li><Editable id="serwis.pr9.name" as="span">Remont silnika 2T</Editable><Editable id="serwis.pr9.price" as="strong">od 800 zł</Editable></li>
                  <li><Editable id="serwis.pr10.name" as="span">Roboczogodzina</Editable><Editable id="serwis.pr10.price" as="strong">100 zł</Editable></li>
                </ul>
              </div>

              <div className="sidebar-card">
                <h3>Pracujemy na sprzęcie</h3>
                <ul className="equipment-list">
                  <li>Bike-Lift</li>
                  <li>Mitutoyo</li>
                  <li>Jonnesway</li>
                  <li>Motorscan 5850</li>
                  <li>Profi Laser S-BAT</li>
                </ul>
              </div>

              <div className="sidebar-card cta-card">
                <Editable id="serwis.cta.title" as="h3">Umów się na serwis</Editable>
                <Editable id="serwis.cta.desc" as="p" multiline>Zadzwoń i umów termin wizyty w naszym serwisie.</Editable>
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
