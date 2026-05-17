"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import { Editable, EditableHTML } from "@/components/Editable";
import { useLocale } from "@/components/LocaleProvider";

/* =========================================================================
   STRONA DLA DZIECI - rewrite od zera, dziala niezawodnie
   - Hero: droga (hero-biker.svg) + animowany motocyklista (inline SVG)
   - Floatery: position: fixed, ledwo widoczne motocykle/kaski w tle calej strony
   - Sekcje: produkty / RXF / quiz / marki / CTA - identyczna kolorystyka i czcionki
========================================================================= */

/* ===== DANE ===== */
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

/* Ikony motocyklowe wykorzystywane w tlowych floaterach */
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

/* ===== KOMPONENT: ledwo widoczne floatery na calej stronie =====
   position: fixed -> sa zawsze widoczne w viewport, nad sekcjami z tlem */
function BackgroundFloaters({ count = 30 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => {
    // Naprzemiennie lewa / prawa kolumna boczna (0..7vw lub 93..100vw)
    const onRight = i % 2 === 1;
    const sideOffset = ((i * 17 + 3) % 700) / 100; // 0..7
    const leftPct = onRight ? 93 + sideOffset : sideOffset;
    const topPct = ((i * 37 + 5) % 9500) / 100; // 0..95
    const size = 42 + ((i * 13) % 70); // 42..112
    const rot = (i * 41) % 360;
    const delay = ((i * 11) % 30) / 3; // 0..10s
    const dur = 9 + ((i * 5) % 10); // 9..19s
    const opacity = 0.10 + ((i * 7) % 10) / 100; // 0.10..0.19 ledwo widoczne
    const src = MOTO_DOODLES[i % MOTO_DOODLES.length];
    return { topPct, leftPct, size, rot, delay, dur, opacity, src };
  });
  return (
    <div className="bg-floaters" aria-hidden>
      {items.map((d, i) => (
        <img
          key={i}
          src={d.src}
          alt=""
          className="bg-floater"
          style={{
            top: `${d.topPct}vh`,
            left: `${d.leftPct}vw`,
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

/* ===== KOMPONENT: motocyklista (PNG/JPG) + animowane kola =====
   Obrazek-zrodlo jest skierowany w LEWO; scaleX(-1) odwraca w prawo.
   Dwie nakladki .wheel z conic-gradient symuluja krecace sie szprychy. */
function HeroRider() {
  return (
    <div className="hero-rider" aria-hidden>
      <img src="/pics/dzieci/rider.svg" alt="" className="hero-rider-img" />
      <span className="wheel wheel-back" />
      <span className="wheel wheel-front" />
    </div>
  );
}

/* ===== FALOWY SEPARATOR ===== */
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

/* =========================================================================
   GLOWNA STRONA
========================================================================= */
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
        :root {
          --k-sky: #4ec3ff;
          --k-sun: #ffd23f;
          --k-tomato: #ff5d5d;
          --k-mint: #3ddc97;
          --k-plum: #9b5de5;
          --k-ink: #0d1b3d;
        }

        .kids-page-bg {
          position: relative;
          isolation: isolate;
          background: linear-gradient(180deg, #bfe7ff 0%, #eaf4ff 18%, #fff3b0 32%, #ffe1e1 52%, #dcffe4 72%, #e9defc 90%, #0d1b3d 100%);
        }
        :global([data-theme="dark"]) .kids-page-bg { background: #0e1322; }

        /* ===== TLOWE FLOATERY - ledwo widoczne motocykle na calej stronie ===== */
        .bg-floaters {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 60;
        }
        .bg-floater {
          position: absolute;
          animation: floatBob 12s ease-in-out infinite;
          filter: drop-shadow(1px 2px 0 rgba(13,27,61,.2));
          will-change: transform;
        }
        :global([data-theme="dark"]) .bg-floater {
          filter: invert(.85) brightness(1.1);
        }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0) rotate(0); }
          50%      { transform: translateY(-22px) rotate(8deg); }
        }

        /* ===== HERO ===== */
        .kids-hero {
          position: relative;
          overflow: hidden;
          max-height: clamp(500px, 72vw, 880px);
          background: linear-gradient(180deg, #6cc9ff 0%, #bfe7ff 100%);
          z-index: 2;
        }
        .hero-video {
          display: block;
          width: 100%;
          height: auto;
          margin-top: clamp(-370px, -26vw, -105px);
          pointer-events: none;
          position: relative;
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
        .hero-biker {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center bottom;
          pointer-events: none;
          z-index: 0;
        }
        .hero-rider-track {
          position: absolute;
          left: 0; right: 0;
          bottom: 50px; /* nad droga z hero-biker.svg */
          height: 260px;
          pointer-events: none;
          z-index: 3;
        }
        .hero-rider {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 400px;
          height: 260px;
          transform: translateX(-100%);
          animation: heroRide 11s linear infinite;
          filter: drop-shadow(6px 8px 8px rgba(13,27,61,.3));
          will-change: transform;
        }
        .hero-rider-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
        }
        /* Krecace sie kola - nakladki z gradientem szprych */
        .wheel {
          position: absolute;
          width: 78px;
          height: 78px;
          border-radius: 50%;
          pointer-events: none;
          background:
            conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(255,255,255,0.65) 4deg,
              transparent 12deg,
              transparent 86deg,
              rgba(255,255,255,0.65) 94deg,
              transparent 102deg,
              transparent 176deg,
              rgba(255,255,255,0.65) 184deg,
              transparent 192deg,
              transparent 266deg,
              rgba(255,255,255,0.65) 274deg,
              transparent 282deg,
              transparent 360deg
            );
          mask: radial-gradient(circle, transparent 12%, #000 14%, #000 86%, transparent 88%);
          -webkit-mask: radial-gradient(circle, transparent 12%, #000 14%, #000 86%, transparent 88%);
          animation: wheelSpin .25s linear infinite;
          will-change: transform;
        }
        .wheel-back  { left: 56px;  bottom: 26px; }
        .wheel-front { left: 266px; bottom: 26px; }
        @keyframes wheelSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes heroRide {
          0%   { transform: translateX(-400px); }
          50%  { transform: translateX(50vw) translateY(-6px); }
          100% { transform: translateX(105vw); }
        }
        @media (max-width: 700px) {
          .hero-rider { width: 280px; height: 182px; }
          .hero-rider-track { bottom: 35px; height: 182px; }
          .wheel { width: 55px; height: 55px; }
          .wheel-back  { left: 39px;  bottom: 18px; }
          .wheel-front { left: 186px; bottom: 18px; }
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

        /* ===== QUICK NAV ===== */
        .kids-quicknav {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          max-width: 1100px;
          margin: 50px auto -60px;
          padding: 0 16px;
          position: relative; z-index: 5;
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

        /* ===== SEKCJE ===== */
        .kids-section { position: relative; padding: 110px 0 90px; overflow: hidden; z-index: 2; }
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

        .blob {
          position: absolute; pointer-events: none; z-index: 1;
          width: 280px; height: 280px; border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%;
          opacity: .55; filter: blur(2px);
        }
        .blob.tr { top: -90px; right: -90px; }
        .blob.bl { bottom: -90px; left: -90px; }

        .zone-sep { display: block; width: 100%; height: 70px; position: relative; z-index: 3; margin-top: -1px; margin-bottom: -1px; line-height: 0; }
        .zone-sep svg { display: block; width: 100%; height: 100%; }

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
          transition: transform .2s, box-shadow .2s;
          position: relative;
        }
        .kids-card:hover { transform: translate(-2px,-6px) rotate(-1deg); box-shadow: 0 14px 0 var(--k-ink); }
        .kids-card-img-wrap {
          width: 120px; height: 120px; margin: 0 auto 14px;
          border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          border: 3px solid var(--k-ink);
        }
        .kids-card-img-wrap img { width: 78px; height: 78px; }
        .kids-card-name { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.1rem; color: var(--k-ink); margin: 0 0 8px; }
        .kids-card-brand { display: inline-block; background: var(--k-ink); color: #fff;
          padding: 4px 12px; border-radius: 100px; font-size: .7rem; font-weight: 900;
          letter-spacing: .08em; text-transform: uppercase; margin: 4px 0 8px;
        }
        .kids-card-cat { font-size: .85rem; color: var(--k-ink); opacity: .8; font-weight: 700; margin: 0; }

        /* ===== RXF ===== */
        .rxf-grid {
          display: grid; grid-template-columns: repeat(4, minmax(220px, 1fr));
          gap: 22px; max-width: 1100px; margin: 0 auto; justify-content: center;
        }
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
        .rxf-card-img-wrap {
          width: 130px; height: 130px; margin: 0 auto 12px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 3px solid var(--k-ink);
        }
        .rxf-card-img-wrap img { width: 92px; height: 92px; }
        .rxf-card-name { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.25rem; color: var(--k-ink); margin: 8px 0 10px; }
        .rxf-card-spec { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
        .rxf-card-spec span { padding: 5px 12px; border-radius: 100px; font-size: .8rem;
          font-weight: 800; color: #fff; border: 2px solid var(--k-ink);
        }

        /* ===== MARKI ===== */
        .brand-bubbles { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 10px; }
        .brand-bubble {
          padding: 12px 22px; border-radius: 100px; color: var(--k-ink);
          font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1rem;
          border: 3px solid var(--k-ink);
          box-shadow: 4px 4px 0 var(--k-ink);
          transition: transform .15s, box-shadow .15s;
          letter-spacing: .03em;
        }
        .brand-bubble:hover { transform: translate(-2px,-3px); box-shadow: 6px 7px 0 var(--k-ink); }

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
        .quiz-progress-fill { height: 100%; background: var(--k-mint); transition: width .4s; }
        .quiz-emoji { font-size: 5rem; text-align: center; display: block; }
        .quiz-q { text-align: center; font-family: 'Outfit',sans-serif; font-weight: 900;
          font-size: 1.4rem; color: var(--k-ink); margin: 16px 0 24px; line-height: 1.3;
        }
        .quiz-answers { display: flex; flex-direction: column; gap: 12px; }
        .quiz-ans {
          background: #fff; border: 3px solid var(--k-ink); border-radius: 16px;
          padding: 16px 20px; font-family: 'Outfit',sans-serif; font-weight: 800;
          font-size: 1.05rem; color: var(--k-ink); cursor: pointer;
          box-shadow: 0 5px 0 var(--k-ink);
          transition: transform .15s, box-shadow .15s;
          text-align: left;
        }
        .quiz-ans:hover:not(:disabled) { transform: translate(-1px,-2px); box-shadow: 0 7px 0 var(--k-ink); }
        .quiz-ans:disabled { cursor: default; }
        .quiz-ans--correct { background: var(--k-mint); color: var(--k-ink); }
        .quiz-ans--wrong { background: var(--k-tomato); color: #fff; }
        .quiz-tip {
          margin-top: 22px; padding: 16px 18px; border-radius: 14px;
          background: var(--k-sun);
          border: 3px solid var(--k-ink);
          color: var(--k-ink); font-size: .95rem; line-height: 1.5; font-weight: 600;
        }
        .quiz-tip strong { color: var(--k-tomato); font-weight: 900; }
        .quiz-next-btn {
          margin-top: 20px; width: 100%; padding: 16px;
          background: var(--k-tomato);
          color: #fff; border: 3px solid var(--k-ink); border-radius: 16px;
          font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.1rem;
          cursor: pointer; box-shadow: 0 6px 0 var(--k-ink);
          transition: transform .15s, box-shadow .15s;
        }
        .quiz-next-btn:hover { transform: translate(-1px,-3px); box-shadow: 0 9px 0 var(--k-ink); }
        .quiz-final { text-align: center; }
        .quiz-final-emoji { font-size: 6rem; }
        .quiz-final-score {
          font-family: 'Outfit',sans-serif; font-weight: 900;
          font-size: 2.4rem; color: var(--k-tomato); margin: 12px 0;
          -webkit-text-stroke: 2px var(--k-ink);
        }
        .quiz-final-msg { color: var(--k-ink); font-size: 1.05rem; max-width: 480px; margin: 0 auto 24px; font-weight: 600; }

        /* ===== CTA ===== */
        .kids-cta-card {
          max-width: 720px; margin: 0 auto;
          background: var(--k-sun);
          border: 4px solid #fff;
          border-radius: 32px;
          padding: 50px 36px;
          text-align: center;
          box-shadow: 0 14px 0 rgba(255,255,255,.18);
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
          .rxf-grid  { grid-template-columns: repeat(2, 1fr); }
          .kids-quicknav { grid-template-columns: repeat(2, 1fr); margin-bottom: -40px; }
        }
        @media (max-width: 560px) {
          .kids-hero { padding: 60px 0 140px; }
          .kids-section { padding: 80px 0 60px; }
          .kids-grid { grid-template-columns: 1fr; }
          .rxf-grid  { grid-template-columns: 1fr; }
          .quiz-wrap { padding: 30px 20px; }
        }
      `}</style>

      <div className="kids-page-bg">
        {/* Ledwo widoczne motocyklowe ikony unoszace sie na calej stronie */}
        <BackgroundFloaters count={30} />

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
                  <div className="kids-card-img-wrap" style={{ background: p.color }}>
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

        <ZoneSep from="#fff3b0" to="#ffe1e1" />

        {/* ===== 2. RXF ===== */}
        <section id="strefa-rxf" className="kids-section kids-section--rxf">
          <span className="blob tr" style={{ background: "#ffd23f" }} aria-hidden />
          <span className="blob bl" style={{ background: "#c7a8f7" }} aria-hidden />
          <div className="container">
            <EditableHTML id="kids.rxf.h2" as="h2" className="kids-h2" defaultHtml='🏍️ Motocykle <span class="rainbow">RXF dla dzieci</span>' />
            <Editable id="kids.rxf.lead" as="p" className="kids-lead" multiline>
              Cztery modele dla różnych grup wiekowych – od juniora aż do nastolatka. Bezpieczne, niezawodne i sprawdzone na torach!
            </Editable>
            <div className="rxf-grid">
              {RXF_MOTOS.map((m, i) => (
                <div className="rxf-card" key={i}>
                  <div className="rxf-card-img-wrap" style={{ background: m.color + "33" }}>
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

        <ZoneSep from="#ffe1e1" to="#dcffe4" />

        {/* ===== 3. QUIZ ===== */}
        <section id="strefa-gra" className="kids-section kids-section--game">
          <span className="blob tr" style={{ background: "#6be5b0" }} aria-hidden />
          <span className="blob bl" style={{ background: "#ffd23f" }} aria-hidden />
          <div className="container">
            <EditableHTML id="kids.quiz.h2" as="h2" className="kids-h2" defaultHtml='🎮 Mini-gra: <span class="rainbow">Bezpieczna jazda</span>' />
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

        <ZoneSep from="#dcffe4" to="#e9defc" />

        {/* ===== 4. MARKI ===== */}
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

        <ZoneSep from="#e9defc" to="#0d1b3d" />

        {/* ===== 5. CTA ===== */}
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
