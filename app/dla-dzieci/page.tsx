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
        /* ===== GLOBAL DOODLE BACKGROUND =====
           Plik doodle-pattern.png to 640x640 szachownica: doodle1+doodle2 obok siebie,
           uzywany jako prosty CSS repeat -> pokrywa cale tlo naprzemiennie. */
        .kids-page-bg {
          position: relative;
          isolation: isolate;
        }
        .kids-page-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('/pics/dzieci/doodle-pattern.png');
          background-repeat: repeat;
          background-size: 540px 540px;
          background-position: 0 0;
          opacity: .18;
          filter: saturate(.85);
          pointer-events: none;
          z-index: 0;
        }
        :global([data-theme="dark"]) .kids-page-bg::before {
          opacity: .12;
          filter: invert(.92) hue-rotate(180deg) saturate(.8);
        }
        .kids-page-bg > * { position: relative; z-index: 1; }

        @media (max-width: 720px) {
          .kids-page-bg::before { background-size: 380px 380px; }
        }

        .kids-hero { position: relative; padding: 80px 0 60px;
          background: linear-gradient(135deg,#ffe066 0%,#ff8fab 35%,#a0e7e5 70%,#c9b6ff 100%);
          overflow: hidden; }
        .kids-title { font-family: 'Outfit',sans-serif; font-size: clamp(2rem,6vw,3.6rem); font-weight: 900;
          color: #fff; text-shadow: 3px 3px 0 #ff6b6b, 6px 6px 0 rgba(0,0,0,.15);
          text-align: center; line-height: 1.1; margin: 0; }
        .kids-sub { text-align: center; font-size: 1.2rem; color: #fff; font-weight: 600; margin-top: 16px;
          text-shadow: 1px 1px 0 rgba(0,0,0,.3); max-width: 720px; margin-left: auto; margin-right: auto; }

        .doodle-layer { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
        .doodle { position: absolute; animation: kfloat 7s ease-in-out infinite; }
        @keyframes kfloat { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-18px) rotate(15deg); } }

        .kids-section { position: relative; padding: 80px 0; overflow: hidden; }
        .kids-section .container { position: relative; z-index: 2; }
        /* Kazda sekcja = STREFA z mocnym pelnym kolorem.
           Doodle z tla prosi sie tylko w hero i w cienkich przerwach miedzy strefami. */
        .kids-section--products {
          background:
            radial-gradient(900px 480px at 12% 0%, #ffd6e0 0%, transparent 70%),
            radial-gradient(700px 420px at 90% 100%, #ffe3f1 0%, transparent 70%),
            #fff5fa;
        }
        .kids-section--rxf {
          background:
            radial-gradient(900px 480px at 88% 0%, #cdeefc 0%, transparent 72%),
            radial-gradient(700px 420px at 10% 100%, #d4f7ec 0%, transparent 72%),
            #eaf7fb;
        }
        .kids-section--game {
          background:
            radial-gradient(900px 480px at 50% 0%, #fff1c2 0%, transparent 70%),
            radial-gradient(700px 420px at 50% 100%, #ffe1d6 0%, transparent 70%),
            #fff7e6;
        }
        .kids-section--alt {
          background:
            radial-gradient(900px 460px at 50% 0%, #ede0ff 0%, transparent 72%),
            #f6f1ff;
        }
        :global([data-theme="dark"]) .kids-section--products { background: #2a1a22; }
        :global([data-theme="dark"]) .kids-section--rxf { background: #112428; }
        :global([data-theme="dark"]) .kids-section--game { background: #2a2418; }
        :global([data-theme="dark"]) .kids-section--alt { background: #1f1a2c; }

        /* SEPARATORY MIEDZY STREFAMI — falowane SVG */
        .zone-sep { display: block; width: 100%; height: 60px; position: relative; z-index: 1; margin-top: -1px; margin-bottom: -1px; }
        .zone-sep svg { display: block; width: 100%; height: 100%; }
        /* w przerwach miedzy strefami doodle JEST widoczny -> separator jest przezroczysty */

        .kids-h2 { font-family: 'Outfit',sans-serif; font-size: clamp(1.8rem,4vw,2.6rem); font-weight: 900;
          text-align: center; margin: 0 0 14px; color: var(--text); }
        .kids-h2 .rainbow { background: linear-gradient(90deg,#ff6b6b,#ffe66d,#4ecdc4,#c9b6ff);
          -webkit-background-clip: text; background-clip: text; color: transparent; }
        .kids-lead { text-align: center; color: var(--text-m); font-size: 1.05rem;
          max-width: 720px; margin: 0 auto 44px; line-height: 1.6; }

        .kids-grid { display: grid; grid-template-columns: repeat(3, minmax(220px, 1fr));
          gap: 22px; max-width: 1100px; margin: 0 auto; }
        .kids-card { border-radius: 24px; padding: 30px 20px 24px; text-align: center;
          box-shadow: 0 14px 32px rgba(0,0,0,.10); transition: transform .25s, box-shadow .25s;
          position: relative; overflow: hidden; }
        .kids-card::after { content: ''; position: absolute; top: -30px; right: -30px;
          width: 90px; height: 90px; background: rgba(255,255,255,.35); border-radius: 50%; }
        .kids-card:hover { transform: translateY(-8px) rotate(-1deg); box-shadow: 0 22px 44px rgba(0,0,0,.18); }
        .kids-card-img-wrap { width: 110px; height: 110px; margin: 0 auto 14px;
          background: rgba(255,255,255,.55); border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: inset 0 -4px 12px rgba(0,0,0,.06); position: relative; z-index: 2; }
        .kids-card-img-wrap img { width: 72px; height: 72px; }
        .kids-card-name { font-family: 'Outfit',sans-serif; font-weight: 800; font-size: 1.1rem;
          color: #1a1a2e; margin: 0 0 6px; position: relative; z-index: 2; }
        .kids-card-brand { display: inline-block; background: rgba(255,255,255,.75);
          padding: 4px 12px; border-radius: 100px; font-size: .7rem; font-weight: 800;
          color: #1a1a2e; letter-spacing: .08em; text-transform: uppercase;
          margin: 6px 0; position: relative; z-index: 2; }
        .kids-card-cat { font-size: .85rem; color: #1a1a2e; opacity: .82; font-weight: 600;
          margin: 0; position: relative; z-index: 2; }

        .rxf-grid { display: grid; grid-template-columns: repeat(4, minmax(220px, 1fr));
          gap: 22px; max-width: 1100px; margin: 0 auto; justify-content: center; }
        .rxf-card { background: var(--surface); border-radius: 24px; padding: 28px 18px 22px;
          text-align: center; border: 3px solid; box-shadow: 0 10px 26px rgba(0,0,0,.10);
          transition: var(--tr); position: relative; overflow: hidden; }
        .rxf-card:hover { transform: scale(1.04) rotate(-.5deg); }
        .rxf-card-img-wrap { width: 130px; height: 130px; margin: 0 auto 12px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; }
        .rxf-card-img-wrap img { width: 92px; height: 92px; }
        .rxf-card-name { font-family: 'Outfit',sans-serif; font-weight: 900; font-size: 1.25rem;
          color: var(--text); margin: 8px 0 10px; }
        .rxf-card-spec { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .rxf-card-spec span { padding: 5px 12px; border-radius: 100px; font-size: .8rem; font-weight: 700; }

        .brand-bubbles { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 10px; }
        .brand-bubble { padding: 12px 22px; border-radius: 100px; color: #1a1a2e;
          font-family: 'Outfit',sans-serif; font-weight: 800; font-size: 1rem;
          box-shadow: 0 6px 14px rgba(0,0,0,.12); transition: transform .2s; letter-spacing: .03em; }
        .brand-bubble:hover { transform: translateY(-4px) scale(1.05); }

        .quiz-wrap { max-width: 680px; margin: 0 auto;
          background: linear-gradient(135deg,#fff8e7 0%,#ffe3e3 100%);
          border-radius: 28px; padding: 40px 30px;
          box-shadow: 0 22px 50px rgba(255,107,107,.18);
          position: relative; overflow: hidden; }
        .quiz-wrap::before, .quiz-wrap::after { content: ''; position: absolute;
          width: 140px; height: 140px; border-radius: 50%; }
        .quiz-wrap::before { top: -50px; right: -50px; background: rgba(255,224,102,.45); }
        .quiz-wrap::after { bottom: -50px; left: -50px; background: rgba(78,205,196,.35); }

        .quiz-progress { position: relative; z-index: 2; text-align: center; font-family: 'Outfit',sans-serif;
          font-weight: 700; color: #ff6b6b; letter-spacing: .1em; text-transform: uppercase; font-size: .85rem; }
        .quiz-progress-bar { height: 10px; background: rgba(255,107,107,.18); border-radius: 100px;
          margin: 12px auto 26px; max-width: 320px; overflow: hidden; }
        .quiz-progress-fill { height: 100%;
          background: linear-gradient(90deg,#ff6b6b,#ffe66d); transition: width .4s; }
        .quiz-emoji { font-size: 5rem; text-align: center; display: block; position: relative; z-index: 2; }
        .quiz-q { text-align: center; font-family: 'Outfit',sans-serif; font-weight: 800;
          font-size: 1.4rem; color: var(--text); margin: 16px 0 24px;
          position: relative; z-index: 2; line-height: 1.3; }
        .quiz-answers { display: flex; flex-direction: column; gap: 12px; position: relative; z-index: 2; }
        .quiz-ans { background: #fff; border: 3px solid #ffd6e0; border-radius: 16px;
          padding: 16px 20px; font-family: 'Outfit',sans-serif; font-weight: 700;
          font-size: 1.05rem; color: #1a1a2e; cursor: pointer; transition: var(--tr); text-align: left; }
        .quiz-ans:hover:not(:disabled) { border-color: #ff6b6b; transform: translateX(4px); }
        .quiz-ans:disabled { cursor: default; }
        .quiz-ans--correct { background: #b4f8c8; border-color: #4ecdc4; color: #0d5c3f; }
        .quiz-ans--wrong { background: #ffd6d6; border-color: #ff6b6b; color: #8b1a1a; }

        .quiz-tip { margin-top: 22px; padding: 16px 18px; border-radius: 14px;
          background: rgba(78,205,196,.18); border-left: 5px solid #4ecdc4;
          color: var(--text); font-size: .95rem; line-height: 1.5; position: relative; z-index: 2; }
        .quiz-tip strong { color: #ff6b6b; }
        .quiz-next-btn { margin-top: 20px; width: 100%; padding: 14px;
          background: linear-gradient(90deg,#ff6b6b,#ffe66d);
          color: #fff; border: none; border-radius: 14px;
          font-family: 'Outfit',sans-serif; font-weight: 800; font-size: 1.1rem;
          cursor: pointer; box-shadow: 0 8px 20px rgba(255,107,107,.35);
          transition: transform .2s; position: relative; z-index: 2; }
        .quiz-next-btn:hover { transform: translateY(-2px); }
        .quiz-final { text-align: center; position: relative; z-index: 2; }
        .quiz-final-emoji { font-size: 6rem; }
        .quiz-final-score { font-family: 'Outfit',sans-serif; font-weight: 900;
          font-size: 2.2rem; color: #ff6b6b; margin: 12px 0; }
        .quiz-final-msg { color: var(--text); font-size: 1.05rem;
          max-width: 480px; margin: 0 auto 24px; }

        @media (max-width: 900px) {
          .kids-grid { grid-template-columns: repeat(2, 1fr); }
          .rxf-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .kids-hero { padding: 60px 0 40px; }
          .kids-section { padding: 50px 0; }
          .kids-grid { grid-template-columns: 1fr; }
          .rxf-grid { grid-template-columns: 1fr; }
          .quiz-wrap { padding: 30px 20px; }
        }
      `}</style>

      <div className="kids-page-bg">
      {/* ===== HERO ===== */}
      <section className="kids-hero">
        <DoodleLayer count={14} opacity={0.45} />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="breadcrumb" style={{ color: "rgba(255,255,255,.85)", justifyContent: "center", marginBottom: 30 }}>
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

      {/* ===== 1. PRODUKTY ===== */}
      <ZoneSep from="transparent" to="#fff5fa" />
      <section className="kids-section kids-section--products">
        <div className="container">
          <EditableHTML id="kids.gear.h2" as="h2" className="kids-h2" defaultHtml='🪖 Kaski, zbroje i <span class="rainbow">kurtki dla dzieci</span>' />
          <Editable id="kids.gear.lead" as="p" className="kids-lead" multiline>
            Wszystko, co potrzebne małemu motocykliście – bezpiecznie, kolorowo i z najlepszych marek.
          </Editable>
          <div className="kids-grid">
            {PRODUCTS.map((p, i) => (
              <div className="kids-card" key={i} style={{ background: p.color }}>
                <div className="kids-card-img-wrap"><img src={p.img} alt={p.name} /></div>
                <h3 className="kids-card-name">{p.name}</h3>
                <span className="kids-card-brand">{p.brand}</span>
                <p className="kids-card-cat">{p.cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2. MOTOCYKLE RXF ===== */}
      <ZoneSep from="#fff5fa" to="#eaf7fb" />
      <section className="kids-section kids-section--rxf">
        <div className="container">
          <EditableHTML id="kids.rxf.h2" as="h2" className="kids-h2" defaultHtml='🏍️ Motocykle <span class="rainbow">RXF</span> dla dzieci' />
          <Editable id="kids.rxf.lead" as="p" className="kids-lead" multiline>
            Pitbike RXF to legendarne motocykle dla najmłodszych. Solidna konstrukcja, niezawodny silnik i wytrzymała rama – idealne na pierwszą jazdę pod okiem rodzica na zamkniętym torze.
          </Editable>
          <div className="rxf-grid">
            {RXF_MOTOS.map((m, i) => (
              <div className="rxf-card" key={i} style={{ borderColor: m.color }}>
                <div className="rxf-card-img-wrap" style={{ background: m.color + "22" }}>
                  <img src={m.img} alt={m.name} />
                </div>
                <h3 className="rxf-card-name">{m.name}</h3>
                <div className="rxf-card-spec">
                  <span style={{ background: m.color + "22", color: m.color }}>💨 {m.cc}</span>
                  <span style={{ background: m.color + "22", color: m.color }}>👦 {m.age}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. MINI GAME ===== */}
      <ZoneSep from="#eaf7fb" to="#fff7e6" />
      <section className="kids-section kids-section--game">
        <DoodleLayer count={6} opacity={0.10} />
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
      <ZoneSep from="#fff7e6" to="#f6f1ff" />
      <section className="kids-section kids-section--alt">
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
      <ZoneSep from="#f6f1ff" to="transparent" />
      <section className="kids-section">
        <div className="container">
          <div className="quiz-wrap" style={{ background: "linear-gradient(135deg,#a0e7e5 0%,#b4f8c8 100%)", textAlign: "center" }}>
            <span style={{ fontSize: "4rem", display: "block", position: "relative", zIndex: 2 }}>📞</span>
            <Editable id="kids.cta.title" as="h3" className="kids-h2">Chcesz zobaczyć ofertę dla dzieci?</Editable>
            <Editable id="kids.cta.desc" as="p" className="kids-lead" multiline>
              Zapraszamy do naszego salonu w Opolu! Mamy dla Was wszystko: kaski, zbroje, motocykle RXF i sporo dobrej zabawy.
            </Editable>
            <a href="tel:601484242" className="quiz-next-btn" style={{ display: "inline-block", width: "auto", padding: "14px 32px", textDecoration: "none", marginTop: 12 }}>
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
