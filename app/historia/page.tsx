"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import { Editable, EditableHTML } from "@/components/Editable";
import Lightbox from "@/components/Lightbox";
import Link from "next/link";

const galleryImages = [
  { src: "/pics/historia/32.jpg", caption: "Karczowanie drzew - 4.10.2014" },
  { src: "/pics/historia/101.jpg", caption: "Prace ziemne - 29.10.2014" },
  { src: "/pics/historia/65.jpg", caption: "Ława fundamentowa - 13.12.2014" },
  { src: "/pics/historia/87.jpg", caption: "Szkielet hali - 12.10.2015" },
  { src: "/pics/historia/23456.jpg", caption: "Murowanie ścian - 25.05.2016" },
  { src: "/pics/historia/n.jpg", caption: "Pokrywanie dachu - 3.11.2017" },
  { src: "/pics/historia/678.jpg", caption: "Prace wykończeniowe - Maj 2018" },
  { src: "/pics/historia/567.jpg", caption: "Budynek gotowy - Koniec 2018" },
  { src: "/pics/historia/987.jpg", caption: "Otwarcie salonu MotoFan!" },
];

const timelineItems = [
  { date: "4.10.2014", title: "Karczowanie drzew", desc: "Rozpoczęliśmy przygotowanie terenu pod inwestycję – karczowanie i wycinanie drzew owocowych." },
  { date: "29.10.2014", title: "Prace ziemne", desc: "Wjechał ciężki sprzęt, zdzierał humus i kopał miejsce pod fundamenty." },
  { date: "13.12.2014", title: "Ława fundamentowa", desc: "Została wykonana ława fundamentowa i osadzone marki na słupy." },
  { date: "12.10.2015", title: "Szkielet hali", desc: "Został postawiony szkielet stalowy hali." },
  { date: "25.05.2016", title: "Murowanie ścian i strop", desc: "Wymurowano ściany, zalano strop nad pomieszczeniami: biuro, sklep, socjalne." },
  { date: "3.11.2017", title: "Pokrywanie dachu", desc: "Pokrywamy dach płytą warstwową." },
  { date: "Maj 2018", title: "Prace wykończeniowe", desc: "Budowa ostro przyspieszyła – montaż fasady szklanej, instalacje, wykończenie." },
  { date: "Koniec 2018", title: "Budynek gotowy", desc: "Zakończyliśmy prace budowlane i przygotowaliśmy budynek do odbiorów technicznych." },
  { date: "Otwarcie!", title: "Otwarcie nowego salonu", desc: "500 m² profesjonalnego salonu motocyklowego przy ul. Partyzanckiej 85 w Opolu. Zapraszamy!" },
];

const ZoomIcon = () => (
  <div className="zoom-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  </div>
);

export default function Historia() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <>
      <Navbar activeSection="O nas" />

      <style>{`
        .photo-timeline { margin: 50px 0 70px; }
        .photo-timeline-header { text-align: center; margin-bottom: 60px; }
        .photo-timeline-header h2 { margin-bottom: 10px; }
        .photo-timeline-header p { color: var(--text-m); }
        .vtl { position: relative; max-width: 900px; margin: 0 auto; padding: 0 20px; }
        .vtl::before {
          content: ''; position: absolute; left: 50%; top: 0; bottom: 0;
          width: 3px; background: var(--border); transform: translateX(-50%);
        }
        .vtl-item { position: relative; display: flex; align-items: flex-start; margin-bottom: 60px; }
        .vtl-item:last-child { margin-bottom: 0; }
        .vtl-item:nth-child(odd) { flex-direction: row; }
        .vtl-item:nth-child(even) { flex-direction: row-reverse; }
        .vtl-dot {
          position: absolute; left: 50%; top: 24px; width: 18px; height: 18px;
          background: var(--grad); border: 3px solid var(--bg); border-radius: 50%;
          transform: translateX(-50%); z-index: 2;
          box-shadow: 0 0 0 4px rgba(255,62,0,0.25);
        }
        .vtl-content { width: calc(50% - 40px); padding-top: 14px; }
        .vtl-item:nth-child(odd) .vtl-content { text-align: right; padding-right: 20px; }
        .vtl-item:nth-child(even) .vtl-content { text-align: left; padding-left: 20px; }
        .vtl-date {
          display: inline-block; background: var(--grad); color: #fff;
          padding: 5px 14px; border-radius: 30px; font-weight: 700;
          font-size: 0.82rem; margin-bottom: 10px;
          box-shadow: 0 4px 12px rgba(255,62,0,0.3);
        }
        .vtl-content h3 {
          font-family: 'Outfit', sans-serif; font-size: 1.15rem;
          font-weight: 700; margin-bottom: 6px;
        }
        .vtl-content p { color: var(--text-m); font-size: 0.9rem; line-height: 1.6; margin: 0; }
        .vtl-thumb {
          width: calc(50% - 40px); position: relative; cursor: pointer;
          border-radius: var(--radius-lg); overflow: hidden;
          border: 2px solid var(--border);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .vtl-item:nth-child(odd) .vtl-thumb { margin-left: auto; }
        .vtl-item:nth-child(even) .vtl-thumb { margin-right: auto; }
        .vtl-thumb img {
          display: block; width: 100%; aspect-ratio: 16/10;
          object-fit: cover; transition: transform 0.4s ease;
        }
        .vtl-thumb:hover {
          transform: scale(1.08);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35);
          border-color: var(--primary); z-index: 5;
        }
        .vtl-thumb:hover img { transform: scale(1.06); }
        .vtl-thumb .zoom-icon {
          position: absolute; inset: 0; display: flex;
          align-items: center; justify-content: center;
          background: rgba(0,0,0,0.3); opacity: 0;
          transition: opacity 0.3s ease;
        }
        .vtl-thumb:hover .zoom-icon { opacity: 1; }
        .vtl-thumb .zoom-icon svg {
          width: 32px; height: 32px; stroke: #fff;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
        }
        .vtl-step {
          position: absolute; top: 10px; left: 10px;
          width: 30px; height: 30px; background: var(--grad);
          color: #fff; border-radius: 50%; display: flex;
          align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.8rem;
          box-shadow: 0 3px 10px rgba(255,62,0,0.4); z-index: 3;
        }
        @media (max-width: 768px) {
          .vtl::before { left: 20px; }
          .vtl-dot { left: 20px; top: 0; }
          .vtl-item, .vtl-item:nth-child(odd), .vtl-item:nth-child(even) {
            flex-direction: column; padding-left: 50px; margin-bottom: 40px;
          }
          .vtl-content, .vtl-item:nth-child(odd) .vtl-content, .vtl-item:nth-child(even) .vtl-content {
            width: 100%; text-align: left; padding: 0 0 12px 0;
          }
          .vtl-thumb, .vtl-item:nth-child(odd) .vtl-thumb, .vtl-item:nth-child(even) .vtl-thumb {
            width: 100%; margin: 0;
          }
        }
      `}</style>

      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Strona główna</Link>
            <span>/</span>
            <Link href="/#about">O nas</Link>
            <span>/</span>
            <span>Historia</span>
          </div>
          <EditableHTML id="historia.title" as="h1" className="page-title" defaultHtml='Nasza <span class="gradient-text">Historia</span>' />
          <Editable id="historia.desc" as="p" className="page-desc">Od małej firmy do nowoczesnego salonu motocyklowego. Poznaj naszą drogę od 1999 roku.</Editable>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="content-text" style={{ maxWidth: "900px" }}>
            <EditableHTML id="historia.h2.firma" as="h2" defaultHtml='Firma <span class="gradient-text">MOTOFAN</span>' />
            <Editable id="historia.firma.lead" as="p" className="lead" multiline>Firma MOTOFAN powstała w 1999 roku w Opolu i od samego początku stawia na jakość, pasję i profesjonalną obsługę każdego motocyklisty.</Editable>
            <Editable id="historia.firma.p1" as="p" multiline>Początkowo zajmowaliśmy się współorganizowaniem imprez integracyjnych dla firm i osób prywatnych, dostarczając rozrywkę w formie quadów. Kolejnym etapem było rozszerzenie usług o wypożyczalnię skuterów. Od początku działalności firma opiera się na sprawdzonym sprzęcie firmy Yamaha.</Editable>
            <Editable id="historia.firma.p2" as="p">W chwili obecnej firma podzielona jest na kilka działów:</Editable>
            <ul style={{ margin: "20px 0 30px", paddingLeft: "24px", color: "var(--text-m)", lineHeight: 2 }}>
              <li>Serwis motocyklowy</li>
              <li>Transport motocykli</li>
              <li>Sprzedaż części i motocykli</li>
              <li>Sprzedaż części do skuterów i motocykli chińskich</li>
              <li>Sklep z odzieżą motocyklową (buty, kaski, kurtki, rękawice, spodnie)</li>
              <li>Wypożyczenie przyczepy motocyklowej</li>
            </ul>
            <Editable id="historia.firma.closing" as="p" multiline>Zakończyliśmy prace budowlane w pełni profesjonalnego salonu motocyklowego o powierzchni 500 m² przy ul. Partyzanckiej 85 w Opolu.</Editable>
          </div>

          <div className="photo-timeline">
            <div className="photo-timeline-header">
              <EditableHTML id="historia.h2.etapy" as="h2" defaultHtml='Etapy budowy <span class="gradient-text">salonu</span>' />
              <Editable id="historia.etapy.subtitle" as="p" multiline>Opole, ul. Partyzancka 85 — najeźdź na zdjęcie aby powiększyć, kliknij aby otworzyć na pełnym ekranie</Editable>
            </div>

            <div className="vtl">
              {timelineItems.map((item, i) => (
                <div className="vtl-item" key={i}>
                  <div className="vtl-content">
                    <span className="vtl-date">{item.date}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <span className="vtl-dot"></span>
                  <div className="vtl-thumb" onClick={() => setLightboxIdx(i)}>
                    <span className="vtl-step">{i + 1}</span>
                    <img src={galleryImages[i].src} alt={galleryImages[i].caption} />
                    <ZoomIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-card cta-card" style={{ maxWidth: "600px", margin: "50px auto" }}>
            <Editable id="historia.cta.title" as="h3">Odwiedź nas!</Editable>
            <Editable id="historia.cta.desc" as="p" multiline>Zapraszamy do naszego salonu przy ul. Partyzanckiej 85 w Opolu. Przekonaj się, ile pasji włożyliśmy w to miejsce.</Editable>
            <Link href="/#contact" className="btn btn-primary btn-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Zobacz dane kontaktowe
            </Link>
          </div>
        </div>
      </section>

      {lightboxIdx !== null && (
        <Lightbox
          images={galleryImages.map((g) => g.src)}
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
