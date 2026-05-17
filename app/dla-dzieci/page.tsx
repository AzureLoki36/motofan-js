"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import { Editable, EditableHTML } from "@/components/Editable";
import { useLocale } from "@/components/LocaleProvider";

/* ===== MINI GAME: Quiz przepisy drogowe ===== */
type Q = { q: string; emoji: string; answers: string[]; correct: number; tip: string };
const QUESTIONS: Q[] = [
  { q: "Co oznacza znak STOP?", emoji: "🛑", answers: ["Jedź dalej", "Zatrzymaj się całkowicie", "Skręć w prawo"], correct: 1, tip: "Znak STOP zawsze oznacza, że trzeba się zatrzymać i upewnić, że droga jest wolna!" },
  { q: "Co musisz mieć na głowie jadąc motocyklem?", emoji: "🪖", answers: ["Czapkę", "Kapelusz", "Kask motocyklowy"], correct: 2, tip: "Kask chroni głowę. Bez kasku nigdy nie wsiadaj na motocykl!" },
  { q: "Co oznacza zielone światło na sygnalizatorze?", emoji: "🚦", answers: ["Stój!", "Możesz jechać", "Uważaj, zaraz zmieni"], correct: 1, tip: "Zielone = jedź, ale zawsze rozejrzyj się najpierw!" },
  { q: "Jakiego koloru jest znak ostrzegawczy?", emoji: "⚠️", answers: ["Niebieski", "Żółty trójkąt", "Zielony okrąg"], correct: 1, tip: "Żółty trójkąt ostrzega przed niebezpieczeństwem na drodze." },
  { q: "Co robisz przed wjazdem na skrzyżowanie?", emoji: "🚸", answers: ["Przyspieszam", "Patrzę w lewo i prawo", "Zamykam oczy"], correct: 1, tip: "Zawsze rozglądaj się na boki – bezpieczeństwo jest najważniejsze!" },
  { q: "Czy dziecko może jeździć motocyklem RXF samo po drodze publicznej?", emoji: "🏍️", answers: ["Tak, zawsze", "Tylko z dorosłym, na specjalnych torach", "Nigdy"], correct: 1, tip: "Pitbike RXF dla dzieci jeździ tylko na zamkniętych torach i pod okiem rodzica." },
  { q: "Co to jest zbroja motocyklowa?", emoji: "🦺", answers: ["Ozdoba", "Ochrona pleców i klatki", "Plecak"], correct: 1, tip: "Zbroja chroni najważniejsze części ciała w razie upadku." },
  { q: "Po jakiej stronie drogi jeździmy w Polsce?", emoji: "🛣️", answers: ["Po prawej", "Po lewej", "Po środku"], correct: 0, tip: "W Polsce zawsze jeździmy prawą stroną jezdni." },
];

const PRODUCTS = [
  { img: "/pics/dzieci/product-helmet1.svg", name: "Kask LS2 Storm Junior", brand: "LS2", cat: "Kask integralny", color: "linear-gradient(135deg,#ffd6e0 0%,#ffb3c6 100%)" },
  { img: "/pics/dzieci/product-helmet2.svg", name: "Kask HJC C10 Kids", brand: "HJC", cat: "Kask sportowy", color: "linear-gradient(135deg,#caffbf 0%,#a0e7e5 100%)" },
  { img: "/pics/dzieci/product-armor.svg", name: "Zbroja Pro Junior", brand: "SECA", cat: "Ochraniacze pleców i klatki", color: "linear-gradient(135deg,#ffd3b6 0%,#ffaaa5 100%)" },
  { img: "/pics/dzieci/product-jacket.svg", name: "Kurtka MX Mini", brand: "Acerbis", cat: "Kurtka enduro/cross", color: "linear-gradient(135deg,#fff5e1 0%,#fbc4ab 100%)" },
  { img: "/pics/dzieci/product-boots.svg", name: "Buty MX Junior", brand: "Alpinestars", cat: "Buty crossowe", color: "linear-gradient(135deg,#b4f8c8 0%,#a8e6cf 100%)" },
  { img: "/pics/dzieci/product-gloves.svg", name: "Rękawice Kids Touch", brand: "Five", cat: "Rękawice motocyklowe", color: "linear-gradient(135deg,#ffeaa7 0%,#ffd166 100%)" },
];

const RXF_MOTOS = [
  { img: "/pics/dzieci/rxf-mini.svg", name: "RXF Mini 60", cc: "60 cm³", age: "4–7 lat", color: "#ff6b6b" },
  { img: "/pics/dzieci/rxf-open.svg", name: "RXF Open 90", cc: "90 cm³", age: "7–10 lat", color: "#4ecdc4" },
  { img: "/pics/dzieci/rxf-freeride.svg", name: "RXF Freeride 125", cc: "125 cm³", age: "10–14 lat", color: "#f59e0b" },
  { img: "/pics/dzieci/rxf-racing.svg", name: "RXF Racing 150", cc: "150 cm³", age: "14+ lat", color: "#10b981" },
];

const BRAND_LOGOS = [
  { name: "LS2", color: "#ff6b6b" },
  { name: "HJC", color: "#4ecdc4" },
  { name: "Givi", color: "#ffe66d" },
  { name: "SECA", color: "#a8e6cf" },
  { name: "Acerbis", color: "#c9b6ff" },
  { name: "Alpinestars", color: "#ffaaa5" },
  { name: "Five", color: "#9bf6ff" },
  { name: "RXF", color: "#ff8fab" },
];

const DOODLES = [
  "/pics/dzieci/doodle-traffic-light.svg",
  "/pics/dzieci/doodle-road-sign.svg",
  "/pics/dzieci/doodle-stop.svg",
  "/pics/dzieci/doodle-helmet.svg",
  "/pics/dzieci/doodle-cone.svg",
  "/pics/dzieci/doodle-flag.svg",
  "/pics/dzieci/doodle-star.svg",
  "/pics/dzieci/doodle-trophy.svg",
  "/pics/dzieci/doodle-rainbow.svg",
  "/pics/dzieci/doodle-tools.svg",
  "/pics/dzieci/doodle-speed.svg",
  "/pics/dzieci/doodle-route.svg",
];

/* Doodle TYLKO o tematyce motocyklowej - uzywane jako boczne floatery */
const MOTO_DOODLES = [
  "/pics/dzieci/rxf-mini.svg",
  "/pics/dzieci/rxf-open.svg",
  "/pics/dzieci/rxf-freeride.svg",
  "/pics/dzieci/rxf-racing.svg",
  "/pics/dzieci/doodle-helmet.svg",
  "/pics/dzieci/doodle-tools.svg",
  "/pics/dzieci/doodle-speed.svg",
  "/pics/dzieci/doodle-route.svg",
  "/pics/dzieci/doodle-flag.svg",
  "/pics/dzieci/doodle-trophy.svg",
  "/pics/dzieci/doodle-cone.svg",
  "/pics/dzieci/product-helmet1.svg",
  "/pics/dzieci/product-helmet2.svg",
  "/pics/dzieci/product-boots.svg",
  "/pics/dzieci/product-gloves.svg",
];

/* Boczne floatery - latajace ikony motocyklowe w lewym i prawym pasie,
   wzdluz calej dlugosci strony. Ukryte na waskich ekranach. */
function SideFloaters({ count = 22 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => {
    const side = i % 2 === 0 ? "left" : "right";
    // rownomiernie rozlozyc po calej dlugosci strony (0..100%) z lekkim jitterem
    const topPct = Math.min(98, Math.max(2, (i / count) * 100 + (((i * 7) % 10) - 5)));
    const lane = (i * 29) % 5; // 0..4 - subtle pozycja w pasie
    const size = 38 + ((i * 11) % 36);
    const rot = (i * 53) % 360;
    const delay = ((i * 7) % 18) / 2;
    const dur = 6 + ((i * 3) % 6);
    const src = MOTO_DOODLES[i % MOTO_DOODLES.length];
    return { side, topPct, lane, size, rot, delay, dur, src };
  });
  return (
    <div className="side-floaters" aria-hidden>
      {items.map((d, i) => (
        <img
          key={i}
          src={d.src}
          alt=""
          className="side-doodle"
          style={{
            top: `${d.topPct}%`,
            [d.side]: `${d.lane * 1.2}%`,
            width: d.size,
            height: d.size,
            transform: `rotate(${d.rot}deg)`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* Pelnostronicowe polprzezroczyste floatery - rozsiane po calej powierzchni
   strony (rowniez nad srodkiem). Wieksza opacity transparentnosci niz Side. */
function FullPageFloaters({ count = 28 }: { count?: number }) {
  // wstepnie obliczone pozycje (deterministyczne, by uniknac rerendera)
  const items = Array.from({ length: count }, (_, i) => {
    const topPct = ((i * 37 + 5) % 9700) / 100; // 0..97
    const leftPct = ((i * 73 + 13) % 9400) / 100; // 0..94
    const size = 32 + ((i * 13) % 44);
    const rot = (i * 41) % 360;
    const delay = ((i * 11) % 20) / 2;
    const dur = 7 + ((i * 5) % 8);
    const opacity = 0.10 + ((i * 7) % 12) / 100; // 0.10 .. 0.21
    const src = MOTO_DOODLES[(i + 3) % MOTO_DOODLES.length];
    return { topPct, leftPct, size, rot, delay, dur, opacity, src };
  });
  return (
    <div className="page-floaters" aria-hidden>
      {items.map((d, i) => (
        <img
          key={i}
          src={d.src}
          alt=""
          className="page-doodle"
          style={{
            top: `${d.topPct}%`,
            left: `${d.leftPct}%`,
            width: d.size,
            height: d.size,
            transform: `rotate(${d.rot}deg)`,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function DoodleLayer({ count = 8, opacity = 0.18 }: { count?: number; opacity?: number }) {
  const items = Array.from({ length: count }, (_, i) => {
    const top = (i * 13 + 7) % 90;
    const left = (i * 23 + 11) % 92;
    const size = 36 + ((i * 7) % 30);
    const rot = (i * 47) % 360;
    const delay = ((i * 3) % 10) / 2;
    const src = DOODLES[i % DOODLES.length];
    return { top, left, size, rot, delay, src };
  });
  return (
    <div aria-hidden className="doodle-layer">
      {items.map((d, i) => (
        <img
          key={i}
          src={d.src}
          alt=""
          className="doodle"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            transform: `rotate(${d.rot}deg)`,
            opacity,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* Falowany separator miedzy strefami.
   `from` = kolor sekcji ponad separatorem (oddanej w gore), `to` = kolor pod.
   "transparent" pokazuje doodle tlo. */
function ZoneSep({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <div className="zone-sep" aria-hidden style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 L1440,0 L1440,18 C1200,55 960,5 720,30 C480,55 240,5 0,30 Z" fill={from} />
        <path d="M0,60 L1440,60 L1440,42 C1200,5 960,55 720,30 C480,5 240,55 0,30 Z" fill={to} />
      </svg>
    </div>
  );
}

export default function DlaDzieci() {
  const { t } = useLocale();
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

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
    setQIdx(0); setScore(0); setPicked(null); setDone(false);
  };

  const q = QUESTIONS[qIdx];

  return (
    <>
      <Navbar activeSection="Usługi" />

      <style>{`
        /* ===== KIDS SITE - prawdziwy pattern stron dla dzieci =====
           Mocne kolory blokowe (nie pastele), plaskie cienie z offsetem,
           naklejki, "comic" obramowania. Kazda sekcja = jedna strefa
           z wlasnym kolorem przewodnim. */

        :root {
          --k-sky: #4ec3ff;
          --k-sun: #ffd23f;
          --k-tomato: #ff5d5d;
          --k-mint: #3ddc97;
          --k-plum: #9b5de5;
          --k-ink: #0d1b3d;
        }

        .kids-page-bg { position: relative; isolation: isolate; background: #fffaf0; }
        :global([data-theme="dark"]) .kids-page-bg { background: #0e1322; }

        /* ===== BOCZNE FLOATERY - latajace ikony motocyklowe wzdluz calej strony ===== */
        .side-floaters {
          position: absolute; inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .side-doodle {
          position: absolute;
          opacity: .55;
          filter: drop-shadow(2px 3px 0 rgba(13,27,61,.18));
          animation: kfloat 7s ease-in-out infinite;
        }
        :global([data-theme="dark"]) .side-doodle { opacity: .35; }
        @media (max-width: 1240px) { .side-floaters { display: none; } }

        /* ===== PELNOSTRONICOWE FLOATERY - polprzezroczyste, rozsiane po calej stronie ===== */
        .page-floaters {
          position: absolute; inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .page-doodle {
          position: absolute;
          animation: kfloat 8s ease-in-out infinite;
          filter: drop-shadow(1px 2px 0 rgba(13,27,61,.08));
        }
        :global([data-theme="dark"]) .page-doodle { filter: invert(.85) brightness(1.1); }

        /* ===== HERO ===== */
        .kids-hero {
          position: relative;
          padding: 90px 0 220px;
          overflow: hidden;
          background: linear-gradient(180deg, #6cc9ff 0%, #bfe7ff 100%);
          min-height: 540px;
        }
        .kids-hero::before { content: none; }
        /* Animowana scena - motocyklista jadacy w prawo za tytulem */
        .hero-biker {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center bottom;
          pointer-events: none;
          z-index: 0;
        }
        @media (max-width: 900px) {
          .kids-hero { padding: 70px 0 180px; min-height: 480px; }
        }
        .kids-title {
          font-family: 'Outfit',sans-serif;
          font-size: clamp(2.2rem, 7vw, 4.6rem);
          font-weight: 900;
          color: #fff;
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
          background: rgba(255,255,255,.85);
          padding: 14px 22px;
          border-radius: 100px;
          border: 3px solid var(--k-ink);
          box-shadow: 0 6px 0 var(--k-ink);
        }
        .doodle-layer { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
        .doodle { position: absolute; animation: kfloat 7s ease-in-out infinite; }
        @keyframes kfloat { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-18px) rotate(15deg); } }

        /* ===== QUICK NAV TILES - "wybierz strefe" ===== */
        .kids-quicknav {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          max-width: 1100px;
          margin: 50px auto -60px;
          padding: 0 16px;
          position: relative; z-index: 3;
        }
        .qnav-tile {
          background: #fff;
          border: 4px solid var(--k-ink);
          border-radius: 24px;
          padding: 22px 16px 18px;
          text-align: center;
          text-decoration: none;
          color: var(--k-ink);
          box-shadow: 0 8px 0 var(--k-ink);
          transition: transform .2s, box-shadow .2s;
          cursor: pointer;
        }
        .qnav-tile:hover { transform: translate(-2px,-4px); box-shadow: 0 12px 0 var(--k-ink); }
        .qnav-tile:active { transform: translate(2px,4px); box-shadow: 0 2px 0 var(--k-ink); }
        .qnav-emoji { font-size: 2.6rem; display: block; line-height: 1; margin-bottom: 8px; }
        .qnav-label { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1rem; }
        .qnav-tile.t1 { background: #ffe27a; }
        .qnav-tile.t2 { background: #ff8b8b; color: #fff; }
        .qnav-tile.t2 .qnav-label { color: #fff; }
        .qnav-tile.t3 { background: #6be5b0; }
        .qnav-tile.t4 { background: #c7a8f7; }

        /* ===== SEKCJE - kazda jedna mocna strefa ===== */
        .kids-section { position: relative; padding: 110px 0 90px; overflow: hidden; }
        .kids-section .container { position: relative; z-index: 2; }

        .kids-section--products { background: #fff3b0; }
        .kids-section--rxf      { background: #ffe1e1; }
        .kids-section--game     { background: #dcffe4; }
        .kids-section--alt      { background: #e9defc; }
        .kids-section--cta      { background: var(--k-ink); }

        :global([data-theme="dark"]) .kids-section--products { background: #2e2616; }
        :global([data-theme="dark"]) .kids-section--rxf      { background: #2e1a1a; }
        :global([data-theme="dark"]) .kids-section--game     { background: #122e1e; }
        :global([data-theme="dark"]) .kids-section--alt      { background: #1f1a2f; }

        /* dekoracyjne blobki w rogach sekcji */
        .blob {
          position: absolute; pointer-events: none; z-index: 1;
          width: 280px; height: 280px; border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
          opacity: .55; filter: blur(2px);
        }
        .blob.tr { top: -90px; right: -90px; }
        .blob.bl { bottom: -90px; left: -90px; }

        /* falowy separator miedzy strefami */
        .zone-sep { display: block; width: 100%; height: 70px; position: relative; z-index: 1; margin-top: -1px; margin-bottom: -1px; line-height: 0; }
        .zone-sep svg { display: block; width: 100%; height: 100%; }

        /* tytuly sekcji w stylu naklejki */
        .kids-h2 {
          font-family: 'Outfit',sans-serif;
          font-size: clamp(1.9rem, 4.5vw, 2.8rem);
          font-weight: 900;
          text-align: center;
          margin: 0 0 14px;
          color: var(--k-ink);
          letter-spacing: -.01em;
        }
        :global([data-theme="dark"]) .kids-h2 { color: #fff; }
        .kids-h2 .rainbow {
          display: inline-block;
          background: var(--k-tomato);
          color: #fff;
          padding: 2px 14px;
          border-radius: 14px;
          border: 3px solid var(--k-ink);
          box-shadow: 4px 4px 0 var(--k-ink);
          transform: rotate(-2deg);
        }
        .kids-lead { text-align: center; color: var(--k-ink); font-size: 1.05rem;
          max-width: 720px; margin: 0 auto 44px; line-height: 1.6; font-weight: 600; }
        :global([data-theme="dark"]) .kids-lead { color: #d8dcea; }

        /* sticker badge - "NOWOSC!", "TOP!" itp. */
        .sticker {
          position: absolute; top: -14px; right: -10px;
          background: var(--k-tomato);
          color: #fff;
          font-family: 'Outfit',sans-serif;
          font-weight: 900;
          font-size: .75rem;
          letter-spacing: .08em;
          padding: 6px 12px;
          border-radius: 100px;
          border: 3px solid var(--k-ink);
          box-shadow: 3px 3px 0 var(--k-ink);
          transform: rotate(8deg);
          z-index: 3;
        }
        .sticker.s2 { background: var(--k-sun); color: var(--k-ink); transform: rotate(-6deg); }
        .sticker.s3 { background: var(--k-mint); color: var(--k-ink); transform: rotate(4deg); }

        /* ===== PRODUKTY - karty comic style ===== */
        .kids-grid { display: grid; grid-template-columns: repeat(3, minmax(220px, 1fr));
          gap: 26px; max-width: 1100px; margin: 0 auto; }
        .kids-card {
          background: #fff;
          border: 4px solid var(--k-ink);
          border-radius: 28px;
          padding: 28px 20px 22px;
          text-align: center;
          box-shadow: 0 8px 0 var(--k-ink);
          transition: transform .2s, box-shadow .2s;
          position: relative;
          overflow: visible;
        }
        .kids-card:hover { transform: translate(-2px,-6px) rotate(-1deg); box-shadow: 0 14px 0 var(--k-ink); }
        .kids-card-img-wrap { width: 120px; height: 120px; margin: 0 auto 14px;
          border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          border: 3px solid var(--k-ink);
        }
        .kids-card-img-wrap img { width: 78px; height: 78px; }
        .kids-card-name { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.1rem;
          color: var(--k-ink); margin: 0 0 8px; }
        .kids-card-brand { display: inline-block; background: var(--k-ink); color: #fff;
          padding: 4px 12px; border-radius: 100px; font-size: .7rem; font-weight: 900;
          letter-spacing: .08em; text-transform: uppercase; margin: 4px 0 8px; }
        .kids-card-cat { font-size: .85rem; color: var(--k-ink); opacity: .8; font-weight: 700;
          margin: 0; }

        /* ===== RXF ===== */
        .rxf-grid { display: grid; grid-template-columns: repeat(4, minmax(220px, 1fr));
          gap: 22px; max-width: 1100px; margin: 0 auto; justify-content: center; }
        .rxf-card {
          background: #fff;
          border: 4px solid var(--k-ink);
          border-radius: 24px;
          padding: 26px 18px 22px;
          text-align: center;
          box-shadow: 0 8px 0 var(--k-ink);
          transition: transform .2s, box-shadow .2s;
          position: relative;
        }
        .rxf-card:hover { transform: translate(-2px,-6px); box-shadow: 0 14px 0 var(--k-ink); }
        .rxf-card-img-wrap { width: 130px; height: 130px; margin: 0 auto 12px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 3px solid var(--k-ink); }
        .rxf-card-img-wrap img { width: 92px; height: 92px; }
        .rxf-card-name { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.25rem;
          color: var(--k-ink); margin: 8px 0 10px; }
        .rxf-card-spec { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
        .rxf-card-spec span { padding: 5px 12px; border-radius: 100px; font-size: .8rem;
          font-weight: 800; color: #fff; border: 2px solid var(--k-ink); }

        /* ===== MARKI ===== */
        .brand-bubbles { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 10px; }
        .brand-bubble { padding: 12px 22px; border-radius: 100px; color: var(--k-ink);
          font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1rem;
          border: 3px solid var(--k-ink);
          box-shadow: 4px 4px 0 var(--k-ink);
          transition: transform .15s, box-shadow .15s;
          letter-spacing: .03em; }
        .brand-bubble:hover { transform: translate(-2px,-3px); box-shadow: 6px 7px 0 var(--k-ink); }

        /* ===== QUIZ - comic card ===== */
        .quiz-wrap { max-width: 680px; margin: 0 auto;
          background: #fff;
          border: 4px solid var(--k-ink);
          border-radius: 28px; padding: 40px 30px;
          box-shadow: 0 12px 0 var(--k-ink);
          position: relative; }
        .quiz-progress { text-align: center; font-family: 'Outfit',sans-serif;
          font-weight: 900; color: var(--k-ink); letter-spacing: .08em; text-transform: uppercase; font-size: .85rem; }
        .quiz-progress-bar { height: 14px; background: #f1f1f1; border-radius: 100px;
          margin: 12px auto 26px; max-width: 320px; overflow: hidden;
          border: 3px solid var(--k-ink); }
        .quiz-progress-fill { height: 100%;
          background: var(--k-mint); transition: width .4s; }
        .quiz-emoji { font-size: 5rem; text-align: center; display: block; }
        .quiz-q { text-align: center; font-family: 'Outfit',sans-serif; font-weight: 900;
          font-size: 1.4rem; color: var(--k-ink); margin: 16px 0 24px; line-height: 1.3; }
        .quiz-answers { display: flex; flex-direction: column; gap: 12px; }
        .quiz-ans { background: #fff; border: 3px solid var(--k-ink); border-radius: 16px;
          padding: 16px 20px; font-family: 'Outfit',sans-serif; font-weight: 800;
          font-size: 1.05rem; color: var(--k-ink); cursor: pointer;
          box-shadow: 0 5px 0 var(--k-ink);
          transition: transform .15s, box-shadow .15s;
          text-align: left; }
        .quiz-ans:hover:not(:disabled) { transform: translate(-1px,-2px); box-shadow: 0 7px 0 var(--k-ink); }
        .quiz-ans:disabled { cursor: default; }
        .quiz-ans--correct { background: var(--k-mint); color: var(--k-ink); }
        .quiz-ans--wrong { background: var(--k-tomato); color: #fff; }

        .quiz-tip { margin-top: 22px; padding: 16px 18px; border-radius: 14px;
          background: var(--k-sun);
          border: 3px solid var(--k-ink);
          color: var(--k-ink); font-size: .95rem; line-height: 1.5; font-weight: 600; }
        .quiz-tip strong { color: var(--k-tomato); font-weight: 900; }
        .quiz-next-btn { margin-top: 20px; width: 100%; padding: 16px;
          background: var(--k-tomato);
          color: #fff; border: 3px solid var(--k-ink); border-radius: 16px;
          font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.1rem;
          cursor: pointer; box-shadow: 0 6px 0 var(--k-ink);
          transition: transform .15s, box-shadow .15s; }
        .quiz-next-btn:hover { transform: translate(-1px,-3px); box-shadow: 0 9px 0 var(--k-ink); }
        .quiz-final { text-align: center; }
        .quiz-final-emoji { font-size: 6rem; }
        .quiz-final-score { font-family: 'Outfit',sans-serif; font-weight: 900;
          font-size: 2.4rem; color: var(--k-tomato); margin: 12px 0;
          -webkit-text-stroke: 2px var(--k-ink); }
        .quiz-final-msg { color: var(--k-ink); font-size: 1.05rem;
          max-width: 480px; margin: 0 auto 24px; font-weight: 600; }

        /* ===== CTA - mocna ciemna strefa ===== */
        .kids-cta-card {
          max-width: 720px; margin: 0 auto;
          background: var(--k-sun);
          border: 4px solid #fff;
          border-radius: 32px;
          padding: 50px 36px;
          text-align: center;
          box-shadow: 0 14px 0 rgba(255,255,255,.18);
          position: relative;
        }
        .kids-cta-card .kids-h2 { color: var(--k-ink); }
        .kids-cta-card .kids-lead { color: var(--k-ink); }
        .cta-phone-btn {
          display: inline-block;
          background: var(--k-tomato);
          color: #fff;
          border: 3px solid var(--k-ink);
          border-radius: 100px;
          padding: 16px 36px;
          font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.15rem;
          text-decoration: none;
          box-shadow: 0 7px 0 var(--k-ink);
          transition: transform .15s, box-shadow .15s;
          margin-top: 12px;
        }
        .cta-phone-btn:hover { transform: translate(-2px,-4px); box-shadow: 0 11px 0 var(--k-ink); }

        @media (max-width: 900px) {
          .kids-grid { grid-template-columns: repeat(2, 1fr); }
          .rxf-grid { grid-template-columns: repeat(2, 1fr); }
          .kids-quicknav { grid-template-columns: repeat(2, 1fr); margin-bottom: -40px; }
        }
        @media (max-width: 560px) {
          .kids-hero { padding: 60px 0 80px; }
          .kids-section { padding: 80px 0 60px; }
          .kids-grid { grid-template-columns: 1fr; }
          .rxf-grid { grid-template-columns: 1fr; }
          .quiz-wrap { padding: 30px 20px; }
          .kids-quicknav { gap: 12px; }
          .qnav-emoji { font-size: 2rem; }
          .qnav-label { font-size: .85rem; }
        }
      `}</style>

      <div className="kids-page-bg">
      <SideFloaters count={26} />
      {/* ===== HERO ===== */}
      <section className="kids-hero">
        <DoodleLayer count={10} opacity={0.35} />
        <img src="/pics/dzieci/hero-biker.svg" alt="" className="hero-biker" />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: "#fff", justifyContent: "center", marginBottom: 30, fontWeight: 700 }}>
            <Link href="/" style={{ color: "#fff" }}>{t("bc.home")}</Link>
            <span>/</span>
            <span style={{ color: "#fff" }}>{t("bc.kids")}</span>
          </div>
          <EditableHTML id="kids.title" as="h1" className="kids-title" defaultHtml='Strefa Małego<br/>Motocyklisty! 🏍️' />
          <Editable id="kids.sub" as="p" className="kids-sub" multiline>
            Wszystko dla najmłodszych motocyklistów: kaski, zbroje, motocykle RXF i kolorowa gra o przepisach drogowych!
          </Editable>
        </div>
      </section>

      {/* ===== QUICK NAV ===== */}
      <div className="kids-quicknav">
        <a href="#strefa-produkty" className="qnav-tile t1">
          <span className="qnav-emoji">🪖</span>
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
        <a href="#strefa-marki" className="qnav-tile t4">
          <span className="qnav-emoji">⭐</span>
          <span className="qnav-label">Marki</span>
        </a>
      </div>

      {/* ===== 1. PRODUKTY ===== */}
      <section id="strefa-produkty" className="kids-section kids-section--products">
        <span className="blob tr" style={{ background: "#ff8b8b" }} aria-hidden />
        <span className="blob bl" style={{ background: "#6be5b0" }} aria-hidden />
        <div className="container">
          <EditableHTML id="kids.gear.h2" as="h2" className="kids-h2" defaultHtml='🪖 Kaski, zbroje i <span class="rainbow">kurtki dla dzieci</span>' />
          <Editable id="kids.gear.lead" as="p" className="kids-lead" multiline>
            Wszystko, co potrzebne małemu motocykliście – bezpiecznie, kolorowo i z najlepszych marek.
          </Editable>
          <div className="kids-grid">
            {PRODUCTS.map((p, i) => (
              <div className="kids-card" key={i}>
                {i === 0 && <span className="sticker">NOWOŚĆ!</span>}
                {i === 3 && <span className="sticker s2">TOP!</span>}
                {i === 5 && <span className="sticker s3">HIT!</span>}
                <div className="kids-card-img-wrap" style={{ background: p.color }}><img src={p.img} alt={p.name} /></div>
                <h3 className="kids-card-name">{p.name}</h3>
                <span className="kids-card-brand">{p.brand}</span>
                <p className="kids-card-cat">{p.cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. MOTOCYKLE RXF ===== */}
      <ZoneSep from="#fff3b0" to="#ffe1e1" />
      <section id="strefa-rxf" className="kids-section kids-section--rxf">
        <span className="blob tr" style={{ background: "#ffd23f" }} aria-hidden />
        <span className="blob bl" style={{ background: "#4ec3ff" }} aria-hidden />
        <div className="container">
          <EditableHTML id="kids.rxf.h2" as="h2" className="kids-h2" defaultHtml='🏍️ Motocykle <span class="rainbow">RXF</span> dla dzieci' />
          <Editable id="kids.rxf.lead" as="p" className="kids-lead" multiline>
            Pitbike RXF to legendarne motocykle dla najmłodszych. Solidna konstrukcja, niezawodny silnik i wytrzymała rama – idealne na pierwszą jazdę pod okiem rodzica na zamkniętym torze.
          </Editable>
          <div className="rxf-grid">
            {RXF_MOTOS.map((m, i) => (
              <div className="rxf-card" key={i}>
                <div className="rxf-card-img-wrap" style={{ background: m.color + "33" }}>
                  <img src={m.img} alt={m.name} />
                </div>
                <h3 className="rxf-card-name">{m.name}</h3>
                <div className="rxf-card-spec">
                  <span style={{ background: m.color }}>💨 {m.cc}</span>
                  <span style={{ background: m.color }}>👦 {m.age}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. MINI GAME ===== */}
      <ZoneSep from="#ffe1e1" to="#dcffe4" />
      <section id="strefa-gra" className="kids-section kids-section--game">
        <span className="blob tr" style={{ background: "#9b5de5" }} aria-hidden />
        <span className="blob bl" style={{ background: "#ffd23f" }} aria-hidden />
        <div className="container">
          <EditableHTML id="kids.game.h2" as="h2" className="kids-h2" defaultHtml='🎮 Mini-gra: <span class="rainbow">Znaki Drogowe</span>' />
          <Editable id="kids.game.lead" as="p" className="kids-lead" multiline>
            Sprawdź ile wiesz o przepisach drogowych i jeździe motocyklem! Odpowiedz na 8 pytań.
          </Editable>
          <div className="quiz-wrap">
            {!done ? (
              <>
                <div className="quiz-progress">
                  Pytanie {qIdx + 1} z {QUESTIONS.length} · Wynik: {score}
                </div>
                <div className="quiz-progress-bar">
                  <div className="quiz-progress-fill" style={{ width: `${((qIdx + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100}%` }} />
                </div>
                <span className="quiz-emoji">{q.emoji}</span>
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
                <button className="quiz-next-btn" onClick={restart}>🔁 Zagraj jeszcze raz!</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== 4. MARKI ===== */}
      <ZoneSep from="#dcffe4" to="#e9defc" />
      <section id="strefa-marki" className="kids-section kids-section--alt">
        <span className="blob tr" style={{ background: "#ff8b8b" }} aria-hidden />
        <span className="blob bl" style={{ background: "#4ec3ff" }} aria-hidden />
        <div className="container">
          <EditableHTML id="kids.brands.h2" as="h2" className="kids-h2" defaultHtml='⭐ Współpracujemy <span class="rainbow">z najlepszymi</span>' />
          <Editable id="kids.brands.lead" as="p" className="kids-lead" multiline>
            Wszystkie produkty pochodzą od sprawdzonych światowych producentów odzieży i motocykli dla dzieci.
          </Editable>
          <div className="brand-bubbles">
            {BRAND_LOGOS.map((b, i) => (
              <div key={i} className="brand-bubble" style={{ background: b.color }}>{b.name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. CTA ===== */}
      <ZoneSep from="#e9defc" to="#0d1b3d" />
      <section className="kids-section kids-section--cta">
        <div className="container">
          <div className="kids-cta-card">
            <span style={{ fontSize: "4rem", display: "block" }}>📞</span>
            <Editable id="kids.cta.title" as="h3" className="kids-h2">Chcesz zobaczyć ofertę dla dzieci?</Editable>
            <Editable id="kids.cta.desc" as="p" className="kids-lead" multiline>
              Zapraszamy do naszego salonu w Opolu! Mamy dla Was wszystko: kaski, zbroje, motocykle RXF i sporo dobrej zabawy.
            </Editable>
            <a href="tel:601484242" className="cta-phone-btn">
              📞 Zadzwoń: 601 48 42 42
            </a>
          </div>
        </div>
      </section>
      </div>

      <SubpageFooter />
    </>
  );
}
