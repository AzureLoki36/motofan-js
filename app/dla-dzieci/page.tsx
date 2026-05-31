"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import { Editable, EditableHTML } from "@/components/Editable";
import { useLocale } from "@/components/LocaleProvider";

/* =========================================================================
   STRONA DLA DZIECI - "Komiksowa plansza"
   - Hero: wideo banner.mp4 + tytul (bez jadacego motocyklisty, bez niebieskiego paska)
   - Panele: produkty / RXF / quiz / strefa rodzica / marki / CTA
   - Paleta wg teorii barw (kolo barw): pastelowe tla + nasycone akcenty tego
     samego odcienia. Dwie pary dopelniajace: pomarancz<->niebieski,
     roz<->zielen, plus fiolet; CTA domyka kolo akcentem koralowym.
========================================================================= */

/* ===== DANE ===== */
type Q = { q: string; emoji?: string; img?: string; answers: string[]; correct: number; tip: string };
const QUESTIONS: Q[] = [
  { q: "Co oznacza znak STOP?", emoji: "🛑", answers: ["Jedź dalej", "Zatrzymaj się całkowicie", "Skręć w prawo"], correct: 1, tip: "Znak STOP zawsze oznacza, że trzeba się zatrzymać i upewnić, że droga jest wolna!" },
  { q: "Co musisz mieć na głowie jadąc motocyklem?", img: "/pics/dzieci/doodle-helmet.svg", answers: ["Czapkę", "Kapelusz", "Kask motocyklowy"], correct: 2, tip: "Kask chroni głowę. Bez kasku nigdy nie wsiadaj na motocykl!" },
  { q: "Co oznacza zielone światło na sygnalizatorze?", emoji: "🚦", answers: ["Stój!", "Możesz jechać", "Uważaj, zaraz zmieni"], correct: 1, tip: "Zielone = jedź, ale zawsze rozejrzyj się najpierw!" },
  { q: "Jakiego koloru jest znak ostrzegawczy?", emoji: "⚠️", answers: ["Niebieski", "Żółty trójkąt", "Zielony okrąg"], correct: 1, tip: "Żółty trójkąt ostrzega przed niebezpieczeństwem na drodze." },
  { q: "Co robisz przed wjazdem na skrzyżowanie?", emoji: "🚸", answers: ["Przyspieszam", "Patrzę w lewo i prawo", "Zamykam oczy"], correct: 1, tip: "Zawsze rozglądaj się na boki – bezpieczeństwo jest najważniejsze!" },
  { q: "Czy dziecko może jeździć motocyklem RXF samo po drodze publicznej?", emoji: "🏍️", answers: ["Tak, zawsze", "Tylko z dorosłym, na specjalnych torach", "Nigdy"], correct: 1, tip: "Pitbike RXF jeździ tylko na zamkniętych torach i pod okiem rodzica." },
  { q: "Co to jest zbroja motocyklowa?", emoji: "🦺", answers: ["Ozdoba", "Ochrona pleców i klatki", "Plecak"], correct: 1, tip: "Zbroja chroni najważniejsze części ciała w razie upadku." },
  { q: "Po jakiej stronie drogi jeździmy w Polsce?", emoji: "🛣️", answers: ["Po prawej", "Po lewej", "Po środku"], correct: 0, tip: "W Polsce zawsze jeździmy prawą stroną jezdni." },
];

const PRODUCTS: { img: string; name: string; brand: string; cat: string; bg?: string }[] = [
  { img: "/pics/dzieci/produkty/blexx-kask-crossowy.jpg", name: "Kask crossowy", brand: "Blexx", cat: "MD-911 Junior" },
  { img: "/pics/dzieci/produkty/blexx-kask-zamkniety.jpg", name: "Kask zamknięty", brand: "Blexx", cat: "YA-201 Junior" },
  { img: "/pics/dzieci/produkty/zbroja-ochraniacze.webp", name: "Zbroja / ochraniacze", brand: "Junior", cat: "Plecy i klatka" },
  { img: "/pics/dzieci/produkty/alpinestars-spodnie.jpg", name: "Spodnie crossowe", brand: "Alpinestars", cat: "Rozmiar junior" },
  { img: "/pics/dzieci/produkty/kenny-buty-track-t2.jpg", name: "Buty crossowe", brand: "Kenny", cat: "Track T2 Junior" },
  { img: "/pics/dzieci/produkty/citybike-rekawice-2.webp", name: "Rękawice", brand: "City Bike", cat: "Motocyklowe", bg: "#f8f8f8" },
];

/* Piec modeli RXF (prawdziwe zdjecia); odcienie z kola barw */
const RXF_MOTOS = [
  { img: "/pics/dzieci/rxf/rxf-mini-50.jpg", name: "RXF Mini 50", cc: "50 cm³", age: "4–7 lat", color: "#ff6f91" },
  { img: "/pics/dzieci/rxf/rxf-junior-100.jpg", name: "RXF Junior 100", cc: "100 cm³", age: "7–10 lat", color: "#ffb02e" },
  { img: "/pics/dzieci/rxf/rxf-open-125.jpg", name: "RXF Open 125", cc: "125 cm³", age: "10–13 lat", color: "#2bbf6f" },
  { img: "/pics/dzieci/rxf/rxf-open-140.jpg", name: "RXF Open 140", cc: "140 cm³", age: "12–15 lat", color: "#4d9bf0" },
  { img: "/pics/dzieci/rxf/rxf-freeride-140.jpg", name: "RXF Freeride 140", cc: "140 cm³", age: "14+ lat", color: "#9b7af0" },
];

const PARENT_TIPS = [
  { icon: "🛡️", title: "Bezpieczeństwo przede wszystkim", text: "Kask i zbroja to absolutna podstawa – także podczas jazdy na podwórku. Dobrze dopasowany sprzęt chroni najważniejsze części ciała." },
  { icon: "📏", title: "Jak dobrać kask", text: "Zmierz obwód główki tuż nad brwiami. Kask powinien dobrze przylegać i nie przesuwać się. W salonie chętnie pomożemy w doborze rozmiaru." },
  { icon: "🎂", title: "Od jakiego wieku?", text: "Modele RXF dobieramy do wieku i wzrostu. Maluchy jeżdżą wyłącznie na zamkniętych torach, zawsze pod okiem dorosłego." },
  { icon: "🏪", title: "Doradzimy w salonie", text: "Zapraszamy do salonu w Opolu – pomożemy dobrać kask, zbroję i motocykl idealny dla Twojej pociechy." },
];

/* Marki faktycznie dodane na stronie (z kafelkow produktow i RXF), pastele */
const BRAND_LOGOS = [
  { name: "Blexx", color: "#ffb3b3" },
  { name: "Alpinestars", color: "#ffd2a6" },
  { name: "Kenny", color: "#b8e8c6" },
  { name: "City Bike", color: "#bcd8f7" },
  { name: "RXF", color: "#d6c6f5" },
];

/* ===== Gradient + lekka linia graniczna miedzy panelami ===== */
function Sep({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="kids-sep"
      aria-hidden
      style={{ background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
    />
  );
}

/* ===== Ksztalty moto w tle paneli (z folderu latajace) =====
   Tylko motocykle i kaski, jako maski CSS wypelnione kolorem sekcji
   (var(--spot)). Kazda sekcja ma inny uklad (variant) i inne sylwetki,
   pozycjonowane od krawedzi (inset), zeby nie byly dziwnie obciete. */
type SpotShape = { src: string; size: number; rot: number; pos: React.CSSProperties };
const SHAPE_LAYOUTS: SpotShape[][] = [
  [ /* 0 produkty */
    { src: "/pics/latajace/motorcycle3.svg",    size: 150, rot: -8, pos: { left: "3%", top: "8%" } },
    { src: "/pics/latajace/motorcycle.svg",     size: 160, rot: 5,  pos: { right: "3%", bottom: "10%" } },
    { src: "/pics/latajace/motorbike-moto.svg", size: 100, rot: 10, pos: { right: "8%", top: "10%" } },
    { src: "/pics/latajace/motorbike.svg",      size: 128, rot: -6, pos: { left: "5%", bottom: "12%" } },
    { src: "/pics/latajace/motorcycle2.svg",    size: 96,  rot: 8,  pos: { left: "43%", bottom: "5%" } },
  ],
  [ /* 1 rxf */
    { src: "/pics/latajace/motorcycle2.svg",    size: 150, rot: -6, pos: { right: "3%", top: "9%" } },
    { src: "/pics/latajace/motorcycle.svg",     size: 104, rot: 8,  pos: { left: "4%", bottom: "14%" } },
    { src: "/pics/latajace/motorcycle3.svg",    size: 118, rot: 6,  pos: { left: "4%", top: "10%" } },
    { src: "/pics/latajace/motorbike-moto.svg", size: 100, rot: -8, pos: { right: "6%", bottom: "12%" } },
    { src: "/pics/latajace/motorbike.svg",      size: 110, rot: 4,  pos: { left: "44%", top: "5%" } },
  ],
  [ /* 2 quiz */
    { src: "/pics/latajace/motorbike-moto.svg", size: 120, rot: -10, pos: { left: "4%", top: "10%" } },
    { src: "/pics/latajace/motorbike.svg",      size: 150, rot: 6,  pos: { right: "3%", bottom: "10%" } },
    { src: "/pics/latajace/motorcycle.svg",     size: 116, rot: -5, pos: { right: "6%", top: "8%" } },
    { src: "/pics/latajace/motorcycle2.svg",    size: 96,  rot: 9,  pos: { left: "5%", bottom: "12%" } },
    { src: "/pics/latajace/motorcycle3.svg",    size: 96,  rot: 4,  pos: { left: "44%", bottom: "5%" } },
  ],
  [ /* 3 strefa rodzica */
    { src: "/pics/latajace/motorcycle3.svg",    size: 140, rot: 7,  pos: { right: "4%", top: "12%" } },
    { src: "/pics/latajace/motorcycle2.svg",    size: 120, rot: -8, pos: { left: "4%", bottom: "14%" } },
    { src: "/pics/latajace/motorbike-moto.svg", size: 120, rot: 5,  pos: { left: "5%", top: "10%" } },
    { src: "/pics/latajace/motorbike.svg",      size: 100, rot: -6, pos: { right: "7%", bottom: "12%" } },
    { src: "/pics/latajace/motorcycle.svg",     size: 104, rot: 4,  pos: { left: "44%", top: "5%" } },
  ],
  [ /* 4 marki */
    { src: "/pics/latajace/motorbike-moto.svg", size: 140, rot: -6, pos: { left: "3%", top: "10%" } },
    { src: "/pics/latajace/motorbike.svg",      size: 116, rot: 9,  pos: { right: "4%", bottom: "12%" } },
    { src: "/pics/latajace/motorcycle2.svg",    size: 120, rot: -5, pos: { right: "4%", top: "10%" } },
    { src: "/pics/latajace/motorcycle3.svg",    size: 96,  rot: 8,  pos: { left: "6%", bottom: "12%" } },
    { src: "/pics/latajace/motorcycle.svg",     size: 100, rot: 4,  pos: { left: "44%", bottom: "5%" } },
  ],
  [ /* 5 cta */
    { src: "/pics/latajace/motorcycle.svg",     size: 120, rot: -8, pos: { left: "3%", top: "10%" } },
    { src: "/pics/latajace/motorcycle2.svg",    size: 140, rot: 6,  pos: { right: "3%", bottom: "14%" } },
    { src: "/pics/latajace/motorbike-moto.svg", size: 96,  rot: 9,  pos: { right: "7%", top: "10%" } },
    { src: "/pics/latajace/motorbike.svg",      size: 116, rot: -5, pos: { left: "5%", bottom: "14%" } },
  ],
];

function SpotShapes({ variant = 0 }: { variant?: number }) {
  const shapes = SHAPE_LAYOUTS[variant] ?? SHAPE_LAYOUTS[0];
  return (
    <div className="spot-uv" aria-hidden>
      {shapes.map((s, i) => (
        <span
          key={i}
          className="spot-shape"
          style={{
            ...s.pos,
            width: s.size,
            height: s.size,
            transform: `rotate(${s.rot}deg)`,
            WebkitMaskImage: `url(${s.src})`,
            maskImage: `url(${s.src})`,
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================================
   GLOWNA STRONA
========================================================================= */
export default function DlaDzieci() {
  const { t } = useLocale();
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === QUESTIONS[qIdx].correct) setScore(score + 1);
  };
  const next = () => {
    setPicked(null);
    if (qIdx + 1 >= QUESTIONS.length) setDone(true);
    else setQIdx(qIdx + 1);
  };
  const restart = () => {
    setQIdx(0); setScore(0); setPicked(null); setDone(false); setCode(null);
  };

  // Kod nagrody tylko przy KOMPLECIE poprawnych odpowiedzi; serwer wysle go mailem do salonu.
  useEffect(() => {
    if (!done || code || score !== QUESTIONS.length) return;
    let active = true;
    fetch("/api/kids-code", { method: "POST" })
      .then((r) => r.json())
      .then((d) => { if (active && d?.code) setCode(d.code); })
      .catch(() => { if (active) setCode("MOTO-" + Math.random().toString(36).slice(2, 8).toUpperCase()); });
    return () => { active = false; };
  }, [done, code, score]);

  const q = QUESTIONS[qIdx];

  return (
    <>
      <Navbar activeSection="Usługi" />

      <style>{`
        :root {
          --k-ink: #1b2748;
          --cream: #fff3e3;        /* cieply neutralny pod hero/quicknav */
          --k-sun: #ffd166;        /* poprawiony, lagodniejszy zolty */

          /* Pastelowe tla paneli (kolo barw) */
          --bg-gear:   #ffe8cc;    /* pomarancz */
          --bg-rxf:    #ffd9e6;    /* roz / magenta */
          --bg-quiz:   #d3f2dd;    /* zielen */
          --bg-parent: #dbe9fc;    /* niebieski */
          --bg-marki:  #e9defb;    /* fiolet */

          /* Akcenty: ten sam odcien co tlo, ciemniejszy i nasycony */
          --ac-gear:   #ef6c1a;
          --ac-rxf:    #e83e74;
          --ac-quiz:   #1f9d5c;
          --ac-parent: #2f6fb0;
          --ac-marki:  #7c4ddb;
          --ac-coral:  #ff6f91;    /* domyka kolo barw na CTA */
        }

        .kids-page-bg { position: relative; isolation: isolate; background: var(--bg-gear); --hero-fade: var(--cream); }
        :global([data-theme="dark"]) .kids-page-bg { background: #0e1322; --hero-fade: #0e1322; }

        /* ===== HERO ===== */
        .kids-hero {
          position: relative;
          overflow: hidden;
          height: clamp(360px, 54vw, 1000px);
          background: linear-gradient(180deg, #8fc1f2 0%, #d3e8ff 100%);
          z-index: 2;
        }
        /* Wygaszenie dolu wideo w neutralny krem - duze i plynne, wiec dol
           wideo rozplywa sie w tlo (brak ostrego "uciecia") i kryje watermark,
           takze na duzych monitorach (wysokosc proporcjonalna do hero) */
        .kids-hero::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: clamp(150px, 24%, 300px);
          /* osiaga pelna nieprzezroczystosc juz w ~55% wysokosci, wiec lity dol
             zakrywa watermark w prawym dolnym rogu wideo */
          background: linear-gradient(to bottom, rgba(255,243,227,0) 0%, var(--hero-fade) 55%, var(--hero-fade) 100%);
          z-index: 3;
          pointer-events: none;
        }
        .hero-video {
          display: block;
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 20%;
          pointer-events: none;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 16px;
          z-index: 4;
        }
        .kids-title {
          font-family: 'Outfit',sans-serif;
          font-size: clamp(2.2rem, 7vw, 4.6rem);
          font-weight: 900;
          color: #fff;
          background: linear-gradient(120deg, #ffe9a8 0%, #ffc6d4 50%, #cfe1ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow:
            4px 4px 0 var(--k-ink),
            -1px -1px 0 var(--k-ink),
            1px -1px 0 var(--k-ink),
            -1px 1px 0 var(--k-ink),
            1px 1px 0 var(--k-ink);
          text-align: center; line-height: 1.05; margin: 0;
          letter-spacing: -.01em;
        }
        .kids-sub {
          text-align: center;
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--k-ink);
          font-weight: 700;
          margin: 18px auto 0;
          max-width: 720px;
          background: rgba(255,255,255,.88);
          padding: 14px 22px;
          border-radius: 100px;
          border: 3px solid var(--k-ink);
          box-shadow: 0 6px 0 var(--k-ink);
        }

        /* ===== QUICK NAV (5 kafelkow) ===== */
        .kids-quicknav-band { background: var(--cream); padding: 40px 0 44px; position: relative; z-index: 2; }
        :global([data-theme="dark"]) .kids-quicknav-band { background: #15233b; }
        .kids-quicknav {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .qnav-tile {
          background: #fff;
          border: 4px solid var(--k-ink);
          border-radius: 22px;
          padding: 20px 12px 16px;
          text-align: center;
          text-decoration: none;
          color: var(--k-ink);
          box-shadow: 0 8px 0 var(--k-ink);
        }
        .qnav-tile:focus-visible { outline: 3px solid var(--ac-parent); outline-offset: 3px; }
        .qnav-emoji { font-size: 2.4rem; display: block; line-height: 1; margin-bottom: 8px; }
        .qnav-icon { display: block; width: 50px; height: 50px; margin: 0 auto 8px; object-fit: contain; }
        .qnav-label { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: .95rem; }
        .qnav-tile.t1 { background: #ffd9b0; } /* -> produkty */
        .qnav-tile.t2 { background: #ffc2d6; } /* -> RXF */
        .qnav-tile.t3 { background: #b9ead0; } /* -> quiz */
        .qnav-tile.t4 { background: #c4dbf7; } /* -> strefa rodzica */
        .qnav-tile.t5 { background: #d8c7f6; } /* -> marki */

        /* ===== GRADIENT MIEDZY PANELAMI ===== */
        .kids-sep { display: block; width: 100%; height: 70px; position: relative; z-index: 1; }
        :global([data-theme="dark"]) .kids-sep { display: none; }

        /* ===== KSZTALTY MOTO W TLE (dopasowane kolorem do sekcji) ===== */
        .spot-uv { position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; opacity: .3; }
        .spot-shape {
          position: absolute;
          background: var(--spot, #1b2748);
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
          -webkit-mask-size: contain; mask-size: contain;
          -webkit-mask-position: center; mask-position: center;
        }

        /* ===== SEKCJE ===== */
        .kids-section { position: relative; padding: 76px 0 80px; overflow: hidden; z-index: 2; }
        .kids-section .container { position: relative; z-index: 2; }
        .kids-section--products { background: var(--bg-gear);   --spot: var(--ac-gear); }
        .kids-section--rxf      { background: var(--bg-rxf);    --spot: var(--ac-rxf); }
        .kids-section--game     { background: var(--bg-quiz);   --spot: var(--ac-quiz); }
        .kids-section--parent   { background: var(--bg-parent); --spot: var(--ac-parent); }
        .kids-section--alt      { background: var(--bg-marki);  --spot: var(--ac-marki); }
        .kids-section--cta      { background: linear-gradient(180deg, #ff9eb3 0%, #ff6f91 100%); --spot: #d83f63; }
        :global([data-theme="dark"]) .kids-section--products { background: #2e2616; }
        :global([data-theme="dark"]) .kids-section--rxf      { background: #2e1a1a; }
        :global([data-theme="dark"]) .kids-section--game     { background: #122e1e; }
        :global([data-theme="dark"]) .kids-section--parent   { background: #161d2c; }
        :global([data-theme="dark"]) .kids-section--alt      { background: #1f1a2f; }
        :global([data-theme="dark"]) .kids-section--cta      { background: #3a2030; }

        .kids-h2 {
          font-family: 'Outfit',sans-serif;
          font-size: clamp(1.6rem, 3.8vw, 2.4rem);
          font-weight: 900;
          text-align: center;
          margin: 0 0 28px;
          color: var(--k-ink);
          letter-spacing: -.01em;
        }
        :global([data-theme="dark"]) .kids-h2 { color: #fff; }
        .kids-h2 .h2-helmet { height: 1.1em; width: auto; display: inline-block; vertical-align: -.22em; margin-right: 8px; }
        /* Sygnatura: CALY naglowek w przekrzywionym prostokacie (komiksowy baner) */
        .h2-banner {
          display: inline-block;
          background: var(--ac-rxf);
          color: #fff;
          padding: 10px 26px;
          border-radius: 18px;
          border: 4px solid var(--k-ink);
          box-shadow: 6px 6px 0 var(--k-ink);
          transform: rotate(-2deg);
          max-width: 94%;
          text-align: center;
          line-height: 1.18;
        }
        .h2-banner.alt      { transform: rotate(2deg); }
        .h2-banner.c-gear   { background: var(--ac-gear); }
        .h2-banner.c-rxf    { background: var(--ac-rxf); }
        .h2-banner.c-quiz   { background: var(--ac-quiz); }
        .h2-banner.c-parent { background: var(--ac-parent); }
        .h2-banner.c-marki  { background: var(--ac-marki); }
        .kids-lead {
          text-align: center; color: var(--k-ink); font-size: 1.05rem;
          max-width: 720px; margin: 0 auto 44px; line-height: 1.6; font-weight: 600;
        }
        :global([data-theme="dark"]) .kids-lead { color: #d8dcea; }

        /* ===== KARTY PRODUKTOW ===== */
        .kids-grid {
          display: grid; grid-template-columns: repeat(3, minmax(220px, 1fr));
          gap: 26px; max-width: 1100px; margin: 0 auto;
        }
        .kids-card {
          background: #fff;
          border: 4px solid var(--k-ink);
          border-radius: 28px;
          padding: 28px 20px 22px;
          text-align: center;
          box-shadow: 0 8px 0 var(--k-ink);
          position: relative;
        }
        .kids-card-img-wrap {
          width: 100%; height: 175px; margin: 0 0 16px;
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          border: 3px solid var(--k-ink);
          overflow: hidden;
          background: #fff;
        }
        .kids-card-img-wrap img { width: 100%; height: 100%; object-fit: contain; padding: 10px; }
        .kids-card-name { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.1rem; color: var(--k-ink); margin: 0 0 8px; }
        .kids-card-brand { display: inline-block; background: var(--k-ink); color: #fff;
          padding: 4px 12px; border-radius: 100px; font-size: .7rem; font-weight: 900;
          letter-spacing: .08em; text-transform: uppercase; margin: 4px 0 8px;
        }
        .kids-card-cat { font-size: .85rem; color: var(--k-ink); opacity: .8; font-weight: 700; margin: 0; }

        /* ===== RXF ===== */
        .rxf-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 22px; max-width: 1150px; margin: 0 auto; justify-content: center;
        }
        .rxf-card {
          background: #fff;
          border: 4px solid var(--k-ink);
          border-radius: 24px;
          padding: 26px 18px 22px;
          text-align: center;
          box-shadow: 0 8px 0 var(--k-ink);
          position: relative;
        }
        .rxf-card-img-wrap {
          width: 100%; height: 150px; margin: 0 0 14px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          border: 3px solid var(--k-ink);
          overflow: hidden;
          background: #fff;
        }
        .rxf-card-img-wrap img { width: 100%; height: 100%; object-fit: contain; padding: 8px; }
        .rxf-card-name { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.25rem; color: var(--k-ink); margin: 8px 0 10px; }
        .rxf-card-spec { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
        .rxf-card-spec span { padding: 5px 12px; border-radius: 100px; font-size: .8rem;
          font-weight: 800; color: #fff; border: 2px solid var(--k-ink);
        }

        /* ===== STREFA RODZICA (spokojniejszy panel) ===== */
        .parent-grid {
          display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr));
          gap: 20px; max-width: 920px; margin: 0 auto;
        }
        .parent-card {
          background: #fff;
          border: 2px solid #c7d6ee;
          border-radius: 18px;
          padding: 26px 24px;
          box-shadow: 0 6px 18px rgba(27,39,72,.08);
          display: flex; gap: 16px; align-items: flex-start;
        }
        :global([data-theme="dark"]) .parent-card { background: #1f283c; border-color: #2c3a55; }
        .parent-card-icon {
          font-size: 1.9rem; line-height: 1; flex-shrink: 0;
          width: 52px; height: 52px; border-radius: 14px;
          background: var(--bg-parent); display: flex; align-items: center; justify-content: center;
        }
        :global([data-theme="dark"]) .parent-card-icon { background: #161d2c; }
        .parent-card-title { font-family: 'Outfit',sans-serif; font-weight: 800; font-size: 1.1rem; color: var(--k-ink); margin: 0 0 6px; }
        :global([data-theme="dark"]) .parent-card-title { color: #fff; }
        .parent-card-text { font-size: .92rem; color: #4a5575; line-height: 1.6; margin: 0; }
        :global([data-theme="dark"]) .parent-card-text { color: #b6bfd6; }

        /* ===== MARKI ===== */
        .brand-bubbles {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;
          max-width: 1080px; margin: 20px auto 0;
        }
        .brand-bubble {
          flex: 0 1 196px;
          padding: 28px 16px; border-radius: 22px; color: var(--k-ink);
          font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.35rem;
          border: 4px solid var(--k-ink);
          box-shadow: 0 7px 0 var(--k-ink);
          letter-spacing: .03em; text-align: center;
        }

        /* ===== QUIZ ===== */
        .quiz-wrap {
          max-width: 680px; margin: 0 auto;
          background: #fff;
          border: 4px solid var(--k-ink);
          border-radius: 28px; padding: 40px 30px;
          box-shadow: 0 12px 0 var(--k-ink);
          position: relative;
        }
        .quiz-progress { text-align: center; font-family: 'Outfit',sans-serif; font-weight: 900;
          color: var(--k-ink); letter-spacing: .08em; text-transform: uppercase; font-size: .85rem;
        }
        .quiz-progress-bar {
          height: 14px; background: #f1f1f1; border-radius: 100px;
          margin: 12px auto 26px; max-width: 320px; overflow: hidden;
          border: 3px solid var(--k-ink);
        }
        .quiz-progress-fill { height: 100%; background: var(--ac-quiz); transition: width .4s; }
        .quiz-emoji { font-size: 5rem; text-align: center; display: block; }
        .quiz-img-wrap {
          width: 150px; height: 150px; margin: 0 auto 10px;
          border-radius: 50%;
          background: var(--bg-quiz);
          border: 4px solid var(--k-ink);
          box-shadow: 0 6px 0 var(--k-ink);
          display: flex; align-items: center; justify-content: center;
        }
        .quiz-img-wrap img { width: 88px; height: 88px; object-fit: contain; display: block; }
        .quiz-q { text-align: center; font-family: 'Outfit',sans-serif; font-weight: 900;
          font-size: 1.4rem; color: var(--k-ink); margin: 16px 0 24px; line-height: 1.3;
        }
        .quiz-answers { display: flex; flex-direction: column; gap: 12px; }
        .quiz-ans {
          background: #fff; border: 3px solid var(--k-ink); border-radius: 16px;
          padding: 16px 20px; font-family: 'Outfit',sans-serif; font-weight: 800;
          font-size: 1.05rem; color: var(--k-ink); cursor: pointer;
          box-shadow: 0 5px 0 var(--k-ink);
          text-align: left;
        }
        .quiz-ans:focus-visible { outline: 3px solid var(--ac-parent); outline-offset: 2px; }
        .quiz-ans:disabled { cursor: default; }
        .quiz-ans--correct { background: var(--ac-quiz); color: #fff; }
        .quiz-ans--wrong { background: var(--ac-rxf); color: #fff; }
        .quiz-tip {
          margin-top: 22px; padding: 16px 18px; border-radius: 14px;
          background: var(--k-sun);
          border: 3px solid var(--k-ink);
          color: var(--k-ink); font-size: .95rem; line-height: 1.5; font-weight: 600;
        }
        .quiz-tip strong { color: var(--ac-rxf); font-weight: 900; }
        .quiz-next-btn {
          margin-top: 20px; width: 100%; padding: 16px;
          background: var(--ac-rxf);
          color: #fff; border: 3px solid var(--k-ink); border-radius: 16px;
          font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.1rem;
          cursor: pointer; box-shadow: 0 6px 0 var(--k-ink);
        }
        .quiz-next-btn:active { transform: translateY(3px); box-shadow: 0 3px 0 var(--k-ink); }
        .quiz-final { text-align: center; }
        .quiz-final-emoji { font-size: 6rem; }
        .quiz-final-score {
          font-family: 'Outfit',sans-serif; font-weight: 900;
          font-size: 2.4rem; color: var(--ac-rxf); margin: 12px 0;
          -webkit-text-stroke: 2px var(--k-ink);
        }
        .quiz-final-msg { color: var(--k-ink); font-size: 1.05rem; max-width: 480px; margin: 0 auto 24px; font-weight: 600; }
        .quiz-code {
          margin: 6px auto 22px; max-width: 360px;
          background: var(--k-sun); border: 3px solid var(--k-ink);
          border-radius: 16px; padding: 16px; box-shadow: 0 6px 0 var(--k-ink);
        }
        .quiz-code-label { display: block; font-family: 'Outfit',sans-serif; font-weight: 800;
          font-size: .8rem; text-transform: uppercase; letter-spacing: .08em; color: var(--k-ink); }
        .quiz-code-value { display: block; font-family: 'Outfit',sans-serif; font-weight: 900;
          font-size: 1.9rem; letter-spacing: .14em; color: var(--ac-rxf);
          -webkit-text-stroke: 1px var(--k-ink); margin: 4px 0; }
        .quiz-code-note { display: block; font-size: .8rem; color: var(--k-ink); font-weight: 600; }

        /* ===== CTA (komiksowa chmurka) ===== */
        .kids-cta-card {
          max-width: 660px; margin: 0 auto;
          background: #d8ecff;
          border: 4px solid var(--k-ink);
          border-radius: 32px;
          padding: 46px 36px;
          text-align: center;
          box-shadow: 0 12px 0 rgba(27,39,72,.22);
          position: relative;
        }
        .cta-emoji-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 76px; height: 76px; border-radius: 50%;
          background: var(--k-sun); border: 4px solid var(--k-ink);
          font-size: 2.4rem; margin-bottom: 8px;
          box-shadow: 0 6px 0 var(--k-ink);
        }
        .kids-cta-card .kids-h2 { color: var(--k-ink); }
        .kids-cta-card .kids-lead { color: var(--k-ink); margin-bottom: 24px; }
        .cta-phone-btn {
          display: inline-block;
          background: var(--ac-quiz);
          color: #fff;
          border: 3px solid var(--k-ink);
          border-radius: 100px;
          padding: 16px 36px;
          font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.15rem;
          text-decoration: none;
          box-shadow: 0 7px 0 var(--k-ink);
        }
        .cta-phone-btn:active { transform: translateY(3px); box-shadow: 0 4px 0 var(--k-ink); }
        .cta-map {
          margin-top: 24px; height: 240px;
          border-radius: 18px; overflow: hidden;
          border: 4px solid var(--k-ink);
          box-shadow: 0 6px 0 var(--k-ink);
        }
        .cta-map iframe { display: block; width: 100%; height: 100%; }
        .cta-address { margin-top: 18px; font-family: 'Outfit',sans-serif; font-weight: 800; color: var(--k-ink); font-size: .95rem; }

        /* ===== EFEKTY HOVER NA KAFELKACH ===== */
        .qnav-tile, .kids-card, .rxf-card, .brand-bubble, .parent-card, .quiz-ans {
          transition: transform .16s ease, box-shadow .16s ease;
        }
        .kids-card-img-wrap img, .rxf-card-img-wrap img { transition: transform .3s ease; }
        .qnav-tile:hover { transform: translate(-2px, -6px); box-shadow: 0 14px 0 var(--k-ink); }
        .kids-card:hover { transform: translate(-2px, -6px) rotate(-.6deg); box-shadow: 0 16px 0 var(--k-ink); }
        .kids-card:hover .kids-card-img-wrap img { transform: scale(1.06); }
        .rxf-card:hover { transform: translate(-2px, -6px) rotate(.6deg); box-shadow: 0 16px 0 var(--k-ink); }
        .rxf-card:hover .rxf-card-img-wrap img { transform: scale(1.06); }
        .brand-bubble:hover { transform: translate(-2px, -5px) rotate(-1.5deg); box-shadow: 0 12px 0 var(--k-ink); }
        .parent-card:hover { transform: translateY(-4px); box-shadow: 0 12px 26px rgba(27,39,72,.16); }
        .quiz-ans:hover:not(:disabled) { transform: translate(-1px, -2px); box-shadow: 0 7px 0 var(--k-ink); }
        @media (hover: none) {
          .qnav-tile:hover, .kids-card:hover, .rxf-card:hover, .brand-bubble:hover, .parent-card:hover,
          .quiz-ans:hover:not(:disabled) { transform: none; }
          .kids-card:hover .kids-card-img-wrap img, .rxf-card:hover .rxf-card-img-wrap img { transform: none; }
        }

        @media (max-width: 900px) {
          .kids-grid { grid-template-columns: repeat(2, 1fr); }
          .rxf-grid  { grid-template-columns: repeat(2, 1fr); }
          .kids-quicknav { grid-template-columns: repeat(3, 1fr); }
          .brand-bubbles { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .kids-section { padding: 60px 0 56px; }
          .kids-grid { grid-template-columns: 1fr; }
          .rxf-grid  { grid-template-columns: 1fr; }
          .parent-grid { grid-template-columns: 1fr; }
          .kids-quicknav { grid-template-columns: repeat(2, 1fr); }
          .quiz-wrap { padding: 30px 20px; }
        }
      `}</style>

      <div className="kids-page-bg">
        {/* ===== HERO ===== */}
        <section className="kids-hero">
          <video
            className="hero-video"
            src="/pics/dzieci/banner.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
          />
          <div className="hero-overlay">
            <div className="container" style={{ position: "relative", zIndex: 4 }}>
              <div className="breadcrumb" style={{ display: "flex", gap: 8, color: "#fff", justifyContent: "center", marginBottom: 30, fontWeight: 700 }}>
                <Link href="/" style={{ color: "#fff" }}>{t("bc.home")}</Link>
                <span>/</span>
                <span style={{ color: "#fff" }}>{t("bc.kids")}</span>
              </div>
              <EditableHTML id="kids.title" as="h1" className="kids-title" defaultHtml='Strefa Małego<br/>Motocyklisty! 🏍️' />
              <Editable id="kids.sub" as="p" className="kids-sub" multiline>
                Wszystko dla najmłodszych motocyklistów: kaski, zbroje, motocykle RXF i kolorowa gra o przepisach drogowych!
              </Editable>
            </div>
          </div>
        </section>

        {/* ===== QUICK NAV ===== */}
        <div className="kids-quicknav-band">
          <div className="kids-quicknav">
            <a href="#strefa-produkty" className="qnav-tile t1">
              <img className="qnav-icon" src="/pics/dzieci/helmet-motorcycle.svg" alt="" aria-hidden />
              <span className="qnav-label">Kaski i zbroje</span>
            </a>
            <a href="#strefa-rxf" className="qnav-tile t2">
              <span className="qnav-emoji">🏍️</span>
              <span className="qnav-label">Motocykle RXF</span>
            </a>
            <a href="#strefa-gra" className="qnav-tile t3">
              <span className="qnav-emoji">🎮</span>
              <span className="qnav-label">Mini-gra</span>
            </a>
            <a href="#strefa-rodzica" className="qnav-tile t4">
              <span className="qnav-emoji">👨‍👩‍👧</span>
              <span className="qnav-label">Strefa rodzica</span>
            </a>
            <a href="#strefa-marki" className="qnav-tile t5">
              <span className="qnav-emoji">⭐</span>
              <span className="qnav-label">Marki</span>
            </a>
          </div>
        </div>

        <Sep from="#fff3e3" to="#ffe8cc" />

        {/* ===== 1. PRODUKTY ===== */}
        <section id="strefa-produkty" className="kids-section kids-section--products">
          <SpotShapes variant={0} />
          <div className="container">
            <EditableHTML id="kids.gear.h2" as="h2" className="kids-h2" defaultHtml='<span class="h2-banner c-gear"><img src="/pics/dzieci/helmet-motorcycle.svg" alt="" class="h2-helmet" /> Kaski, zbroje i kurtki</span>' />
            <Editable id="kids.gear.lead" as="p" className="kids-lead" multiline>
              Wszystko, co potrzebne małemu motocykliście – bezpiecznie, kolorowo i z najlepszych marek.
            </Editable>
            <div className="kids-grid">
              {PRODUCTS.map((p, i) => (
                <div className="kids-card" key={i}>
                  <div className="kids-card-img-wrap" style={p.bg ? { background: p.bg } : undefined}>
                    <img src={p.img} alt={p.name} />
                  </div>
                  <h3 className="kids-card-name">{p.name}</h3>
                  <span className="kids-card-brand">{p.brand}</span>
                  <p className="kids-card-cat">{p.cat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Sep from="#ffe8cc" to="#ffd9e6" />

        {/* ===== 2. RXF ===== */}
        <section id="strefa-rxf" className="kids-section kids-section--rxf">
          <SpotShapes variant={1} />
          <div className="container">
            <EditableHTML id="kids.rxf.h2" as="h2" className="kids-h2" defaultHtml='<span class="h2-banner c-rxf alt">🏍️ Motocykle RXF</span>' />
            <Editable id="kids.rxf.lead" as="p" className="kids-lead" multiline>
              Cztery modele dla różnych grup wiekowych – od juniora aż do nastolatka. Bezpieczne, niezawodne i sprawdzone na torach!
            </Editable>
            <div className="rxf-grid">
              {RXF_MOTOS.map((m, i) => (
                <div className="rxf-card" key={i}>
                  <div className="rxf-card-img-wrap">
                    <img src={m.img} alt={m.name} />
                  </div>
                  <h3 className="rxf-card-name">{m.name}</h3>
                  <div className="rxf-card-spec">
                    <span style={{ background: m.color }}>{m.cc}</span>
                    <span style={{ background: "var(--k-ink)" }}>{m.age}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Sep from="#ffd9e6" to="#d3f2dd" />

        {/* ===== 3. QUIZ ===== */}
        <section id="strefa-gra" className="kids-section kids-section--game">
          <SpotShapes variant={2} />
          <div className="container">
            <EditableHTML id="kids.quiz.h2" as="h2" className="kids-h2" defaultHtml='<span class="h2-banner c-quiz">🎮 Mini-gra: Bezpieczna jazda</span>' />
            <Editable id="kids.quiz.lead" as="p" className="kids-lead" multiline>
              Sprawdź swoją wiedzę o przepisach i bezpieczeństwie. Każda dobra odpowiedź to punkt!
            </Editable>
            <div className="quiz-wrap">
              {!done ? (
                <>
                  <div className="quiz-progress">
                    Pytanie {qIdx + 1} / {QUESTIONS.length} • Wynik: {score}
                  </div>
                  <div className="quiz-progress-bar">
                    <div className="quiz-progress-fill" style={{ width: `${((qIdx) / QUESTIONS.length) * 100}%` }} />
                  </div>
                  {q.img ? (
                    <div className="quiz-img-wrap"><img src={q.img} alt="" aria-hidden /></div>
                  ) : (
                    <span className="quiz-emoji">{q.emoji}</span>
                  )}
                  <p className="quiz-q">{q.q}</p>
                  <div className="quiz-answers">
                    {q.answers.map((a, i) => {
                      let cls = "quiz-ans";
                      if (picked !== null) {
                        if (i === q.correct) cls += " quiz-ans--correct";
                        else if (i === picked) cls += " quiz-ans--wrong";
                      }
                      return (
                        <button key={i} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
                          {String.fromCharCode(65 + i)}. {a}
                        </button>
                      );
                    })}
                  </div>
                  {picked !== null && (
                    <>
                      <div className="quiz-tip">
                        <strong>{picked === q.correct ? "🎉 Brawo!" : "💡 Pamiętaj:"}</strong>{" "}{q.tip}
                      </div>
                      <button className="quiz-next-btn" onClick={next}>
                        {qIdx + 1 >= QUESTIONS.length ? "Zobacz wynik 🏆" : "Następne pytanie →"}
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="quiz-final">
                  <span className="quiz-final-emoji">
                    {score === QUESTIONS.length ? "🏆" : score >= QUESTIONS.length / 2 ? "🎉" : "💪"}
                  </span>
                  <div className="quiz-final-score">{score} / {QUESTIONS.length}</div>
                  <p className="quiz-final-msg">
                    {score === QUESTIONS.length
                      ? "Super! Jesteś prawdziwym ekspertem przepisów drogowych! 🚦"
                      : score >= QUESTIONS.length / 2
                      ? "Bardzo dobrze! Już sporo wiesz o bezpiecznej jeździe. 🏍️"
                      : "Brawo, że spróbowałeś! Spróbuj jeszcze raz i ucz się przepisów! 📖"}
                  </p>
                  {code && (
                    <div className="quiz-code">
                      <span className="quiz-code-label">Twój kod nagrody 🎁</span>
                      <span className="quiz-code-value">{code}</span>
                      <span className="quiz-code-note">Pokaż ten kod w salonie MotoFun!</span>
                    </div>
                  )}
                  <button className="quiz-next-btn" onClick={restart}>🔁 Zagraj jeszcze raz!</button>
                </div>
              )}
            </div>
          </div>
        </section>

        <Sep from="#d3f2dd" to="#dbe9fc" />

        {/* ===== 4. STREFA RODZICA ===== */}
        <section id="strefa-rodzica" className="kids-section kids-section--parent">
          <SpotShapes variant={3} />
          <div className="container">
            <EditableHTML id="kids.parent.h2" as="h2" className="kids-h2" defaultHtml='<span class="h2-banner c-parent alt">👨‍👩‍👧 Strefa rodzica</span>' />
            <Editable id="kids.parent.lead" as="p" className="kids-lead" multiline>
              Kilka praktycznych wskazówek dla rodziców – jak bezpiecznie wprowadzić pociechę w świat dwóch kółek.
            </Editable>
            <div className="parent-grid">
              {PARENT_TIPS.map((p, i) => (
                <div className="parent-card" key={i}>
                  <span className="parent-card-icon" aria-hidden>{p.icon}</span>
                  <div>
                    <h3 className="parent-card-title">{p.title}</h3>
                    <p className="parent-card-text">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Sep from="#dbe9fc" to="#e9defb" />

        {/* ===== 5. MARKI ===== */}
        <section id="strefa-marki" className="kids-section kids-section--alt">
          <SpotShapes variant={4} />
          <div className="container">
            <EditableHTML id="kids.brands.h2" as="h2" className="kids-h2" defaultHtml='<span class="h2-banner c-marki">⭐ Współpracujemy z najlepszymi</span>' />
            <Editable id="kids.brands.lead" as="p" className="kids-lead" multiline>
              Wszystkie produkty pochodzą od sprawdzonych, światowych producentów odzieży i motocykli.
            </Editable>
            <div className="brand-bubbles">
              {BRAND_LOGOS.map((b, i) => (
                <div key={i} className="brand-bubble" style={{ background: b.color }}>{b.name}</div>
              ))}
            </div>
          </div>
        </section>

        <Sep from="#e9defb" to="#ff9eb3" />

        {/* ===== 6. CTA ===== */}
        <section className="kids-section kids-section--cta">
          <SpotShapes variant={5} />
          <div className="container">
            <div className="kids-cta-card">
              <span className="cta-emoji-badge" aria-hidden>📞</span>
              <Editable id="kids.cta.title" as="h3" className="kids-h2">Chcesz zobaczyć całą ofertę?</Editable>
              <Editable id="kids.cta.desc" as="p" className="kids-lead" multiline>
                Zapraszamy do naszego salonu w Opolu! Mamy dla Was wszystko: kaski, zbroje, motocykle RXF i sporo dobrej zabawy.
              </Editable>
              <a href="tel:601484242" className="cta-phone-btn">
                📞 Zadzwoń: 601 48 42 42
              </a>
              <div className="cta-map">
                <iframe
                  title="MotoFun Opole na mapie"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.177604432097!2d17.932745076929643!3d50.64931777159756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711173f891d099b%3A0x9abbc4453888e0f0!2sPartyzancka%2085%2C%2045-801%20Opole!5e0!3m2!1spl!2spl!4v1712000000000!5m2!1spl!2spl"
                  style={{ border: 0, width: "100%", height: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="cta-address">📍 ul. Partyzancka 85, 45-801 Opole</p>
            </div>
          </div>
        </section>
      </div>

      <SubpageFooter />
    </>
  );
}
