import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import Link from "next/link";

export const metadata = {
  title: "Serwis Motocyklowy – MotoFan Opole",
  description: "Profesjonalny serwis motocyklowy w Opolu. Remonty silników, diagnostyka komputerowa, naprawa motocykli, skuterów i quadów. MotoFan Opole.",
};

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
          <h1 className="page-title">Serwis <span className="gradient-text">Motocyklowy</span></h1>
          <p className="page-desc">Profesjonalna obsługa i naprawy motocykli, skuterów, quadów oraz pojazdów wodnych i śnieżnych. Ponad 25 lat doświadczenia.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-main">
              <h2>Nasze <span className="gradient-text">usługi serwisowe</span></h2>
              <p className="lead">Nasz serwis motocyklowy oferuje kompleksową obsługę pojazdów jednośladowych. Dysponujemy nowoczesnym sprzętem diagnostycznym i doświadczoną kadrą mechaników.</p>

              <div className="service-features">
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/remonty_silnikow.png" alt="Rozłożony silnik motocyklowy" />
                  </div>
                  <h3>Remonty silników</h3>
                  <p>Kompleksowe remonty silników 2-suwowych i 4-suwowych. Wymiana tłoków, pierścieni, łożysk, wałów korbowych.</p>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/diagnostykakomputerowa.png" alt="Diagnostyka komputerowa motocykla" />
                  </div>
                  <h3>Diagnostyka komputerowa</h3>
                  <p>Profesjonalna diagnostyka przy użyciu Motorscan 5850. Odczyt błędów, kasowanie, programowanie.</p>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/gaznik.png" alt="Gaźnik motocyklowy" />
                  </div>
                  <h3>Regulacja gaźników</h3>
                  <p>Czyszczenie, synchronizacja i regulacja gaźników. Przywracamy płynną pracę silnika.</p>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/diagnostyka_laserowa.png" alt="Laserowa maszyna sprawdzająca osiowość motocykla" />
                  </div>
                  <h3>Sprawdzenie osiowości</h3>
                  <p>Precyzyjne ustawienie geometrii z użyciem Profi Laser S-BAT. Bezpieczeństwo i stabilność jazdy.</p>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/przeglady_okresowe.png" alt="Przegląd okresowy motocykla" />
                  </div>
                  <h3>Przeglądy okresowe</h3>
                  <p>Kompleksowe przeglądy zgodne z zaleceniami producenta. Przedłużamy żywotność Twojego pojazdu.</p>
                </div>
                <div className="feature-box">
                  <div className="feature-photo">
                    <img src="/pics/serwis/naprawa_zawiezenia.png" alt="Naprawa zawieszenia motocykla" />
                  </div>
                  <h3>Naprawa zawieszenia</h3>
                  <p>Regeneracja amortyzatorów, wymiana łożysk główki ramy, wahacza i kół.</p>
                </div>
              </div>

              <h2>Przykładowe <span className="gradient-text">naprawy</span></h2>
              <div className="repairs-list">
                <div className="repair-item">
                  <span className="repair-name">Wymiana oleju silnikowego + filtr</span>
                  <span className="repair-desc">Olej syntetyczny, filtr oryginalny lub zamiennik</span>
                </div>
                <div className="repair-item">
                  <span className="repair-name">Wymiana klocków hamulcowych (przód/tył)</span>
                  <span className="repair-desc">Klocki oryginalne lub zamienniki premium</span>
                </div>
                <div className="repair-item">
                  <span className="repair-name">Wymiana łańcucha i zębatek</span>
                  <span className="repair-desc">Komplet napędowy + regulacja</span>
                </div>
                <div className="repair-item">
                  <span className="repair-name">Synchronizacja gaźników</span>
                  <span className="repair-desc">Czyszczenie, regulacja, próba drogowa</span>
                </div>
                <div className="repair-item">
                  <span className="repair-name">Remont silnika 4T (kompletny)</span>
                  <span className="repair-desc">Tłok, pierścienie, łożyska, uszczelki</span>
                </div>
                <div className="repair-item">
                  <span className="repair-name">Diagnostyka komputerowa</span>
                  <span className="repair-desc">Odczyt błędów, raport stanu pojazdu</span>
                </div>
              </div>
            </div>

            <aside className="content-sidebar">
              <div className="sidebar-card">
                <h3>Cennik orientacyjny</h3>
                <p className="sidebar-note">Ceny mogą się różnić w zależności od modelu i zakresu prac.</p>
                <ul className="price-list">
                  <li><span>Wymiana oleju + filtr</span><strong>od 80 zł</strong></li>
                  <li><span>Wymiana klocków hamulcowych</span><strong>od 50 zł</strong></li>
                  <li><span>Wymiana łańcucha + zębatki</span><strong>od 150 zł</strong></li>
                  <li><span>Synchronizacja gaźników</span><strong>od 200 zł</strong></li>
                  <li><span>Diagnostyka komputerowa</span><strong>od 100 zł</strong></li>
                  <li><span>Sprawdzenie osiowości</span><strong>od 150 zł</strong></li>
                  <li><span>Przegląd sezonowy</span><strong>od 200 zł</strong></li>
                  <li><span>Remont silnika 4T</span><strong>od 1500 zł</strong></li>
                  <li><span>Remont silnika 2T</span><strong>od 800 zł</strong></li>
                  <li><span>Roboczogodzina</span><strong>100 zł</strong></li>
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
                <h3>Umów się na serwis</h3>
                <p>Zadzwoń i umów termin wizyty w naszym serwisie.</p>
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
