"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import { Editable, EditableHTML } from "@/components/Editable";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useAdmin } from "@/components/AdminProvider";
import BannerAdmin from "@/components/BannerAdmin";
import type { BannerItem } from "@/lib/banner";

const defaultBannerItems = [
  { img: "https://dainese-cdn.thron.com/delivery/public/image/dainese/81086c27-e811-40f0-a04f-03c7368356cf/px6qct/std/450x450/2118399001_013_1.png", alt: "AGV K7 Super 46", brand: "AGV", cat: "Kaski sportowe" },
  { img: "https://secamoto.com/wp-content/uploads/2024/07/box-2-insidry.jpg", alt: "SECA InsiDry", brand: "SECA", cat: "Kurtki motocyklowe" },
  { img: "https://dainese-cdn.thron.com/delivery/public/image/dainese/d2ef76d4-abb3-41c1-9967-b35c530a86d5/px6qct/std/450x450/2118399001_003_1.png", alt: "Nolan N120-1", brand: "Nolan", cat: "Kaski turystyczne" },
  { img: "https://staging-cms.motul.com/images/carousel_lubrifiants_c9338e5dc6.jpg", alt: "Motul", brand: "Motul", cat: "Oleje silnikowe" },
  { img: "https://secamoto.com/wp-content/uploads/2026/01/X-ADV_Desktop.jpg", alt: "SECA X-ADV", brand: "SECA", cat: "Buty motocyklowe" },
  { img: "https://dainese-cdn.thron.com/delivery/public/image/dainese/8a9fd80f-3aed-4d88-84db-11f36f7fe9d3/px6qct/std/450x450/2118399001_010_1.png", alt: "AGV K7 Damascus", brand: "AGV", cat: "Kaski fullface" },
  { img: "https://secamoto.com/wp-content/uploads/2024/07/box-2-D3O.jpg", alt: "SECA D3O", brand: "SECA", cat: "Ochraniacze D3O" },
  { img: "https://dainese-cdn.thron.com/delivery/public/image/dainese/fdcdfec0-3869-4082-af2b-df19d1303887/px6qct/std/450x450/2118399001_001_1.png", alt: "Nolan", brand: "Nolan", cat: "Kaski szczękowe" },
  { img: "https://secamoto.com/wp-content/uploads/2023/05/UKEMI-PRO-blk-rotated.jpg", alt: "SECA Ukemi Pro", brand: "SECA", cat: "Rękawice" },
  { img: "https://secamoto.com/wp-content/uploads/2023/05/SRS-II-FLUO-RED_PANT_1.jpg", alt: "SECA SRS II", brand: "SECA", cat: "Spodnie" },
];

export default function Sklep() {
  const { t } = useLocale();
  const { isAdmin, editMode } = useAdmin();
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const manualBoostRef = useRef(0);
  const [isMobileBanner, setIsMobileBanner] = useState(false);

  const [bannerItemsDb, setBannerItemsDb] = useState<BannerItem[]>([]);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  const fetchBanner = useCallback(async () => {
    try {
      const res = await fetch("/api/banner", { cache: "no-store" });
      if (res.ok) {
        const data: BannerItem[] = await res.json();
        setBannerItemsDb(data);
      }
    } catch { /* use defaults */ }
    setBannerLoaded(true);
  }, []);

  useEffect(() => { fetchBanner(); }, [fetchBanner]);

  const bannerItems = bannerItemsDb.length > 0
    ? bannerItemsDb.map((b) => ({ img: b.img, alt: b.alt, brand: b.brand, cat: b.cat }))
    : defaultBannerItems;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobileBanner(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (isMobileBanner) {
      posRef.current = 0;
      manualBoostRef.current = 0;
      track.style.transform = "none";
      return;
    }

    const speed = 0.8;
    let animId: number;

    function getHalf() {
      return track!.scrollWidth / 2;
    }

    function wrap() {
      const half = getHalf();
      if (posRef.current <= -half) posRef.current += half;
      if (posRef.current > 0) posRef.current -= half;
    }

    function tick() {
      if (!pausedRef.current) {
        posRef.current -= speed;
      }
      if (manualBoostRef.current !== 0) {
        let step = manualBoostRef.current * 0.12;
        if (Math.abs(step) < 0.5) step = manualBoostRef.current > 0 ? 0.5 : -0.5;
        if (Math.abs(manualBoostRef.current) < 1) {
          step = manualBoostRef.current;
          manualBoostRef.current = 0;
        } else {
          manualBoostRef.current -= step;
        }
        posRef.current -= step;
      }
      wrap();
      track!.style.transform = `translateX(${posRef.current}px)`;
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isMobileBanner]);

  const scrollBanner = (dir: number) => {
    manualBoostRef.current += dir * 350;
  };

  // Duplicate items for infinite loop
  const allItems = isMobileBanner ? bannerItems : [...bannerItems, ...bannerItems];

  return (
    <>
      <Navbar activeSection="Usługi" />

      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{t("bc.home")}</Link>
            <span>/</span>
            <Link href="/#services">{t("bc.services")}</Link>
            <span>/</span>
            <span>{t("bc.sklep")}</span>
          </div>
          <EditableHTML id="sklep.title" as="h1" className="page-title" defaultHtml='Sklep z <span class="gradient-text">Odzieżą i Akcesoriami</span>' />
          <Editable id="sklep.desc" as="p" className="page-desc">Bogaty wybór odzieży motocyklowej, kasków, rękawic, butów oraz akcesoriów najlepszych światowych marek.</Editable>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <EditableHTML id="sklep.h2.marki" as="h2" defaultHtml='Marki, które <span class="gradient-text">oferujemy</span>' />
          <Editable id="sklep.lead" as="p" className="lead" multiline>Współpracujemy z najlepszymi producentami odzieży i akcesoriów motocyklowych. Gwarantujemy oryginalność i jakość produktów.</Editable>

          <div className="brands-showcase">
            <a href="#cta-sklep" className="brand-showcase-card" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/pics/marki/seca-logo.png" alt="SECA" style={{ background: "#1a1a2e", padding: "12px 18px", borderRadius: "10px" }} />
              <Editable id="sklep.brand1.name" as="h4">SECA</Editable>
              <Editable id="sklep.brand1.cat" as="p">Odzież motocyklowa</Editable>
            </a>
            <a href="#cta-sklep" className="brand-showcase-card" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/pics/marki/motul-logo.svg" alt="Motul" style={{ transform: "scale(1.3)" }} />
              <Editable id="sklep.brand2.name" as="h4">Motul</Editable>
              <Editable id="sklep.brand2.cat" as="p">Oleje i chemia</Editable>
            </a>
            <a href="#cta-sklep" className="brand-showcase-card" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/pics/marki/agv_logo.svg" alt="AGV" style={{ transform: "scale(1.3)" }} />
              <Editable id="sklep.brand3.name" as="h4">AGV</Editable>
              <Editable id="sklep.brand3.cat" as="p">Kaski premium</Editable>
            </a>
            <a href="#cta-sklep" className="brand-showcase-card" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/pics/marki/nolan-logo.png" alt="Nolan" />
              <Editable id="sklep.brand4.name" as="h4">Nolan</Editable>
              <Editable id="sklep.brand4.cat" as="p">Kaski włoskie</Editable>
            </a>
          </div>

          <EditableHTML id="sklep.h2.kategorie" as="h2" defaultHtml='Kategorie <span class="gradient-text">produktów</span>' />

          {isAdmin && editMode && (
            <BannerAdmin items={bannerItemsDb} onSaved={fetchBanner} />
          )}

          {/* Inline styles for brand banner */}
          <style>{`
            .brand-banner { overflow: hidden; padding: 30px 0; position: relative; }
            .brand-banner::before, .brand-banner::after {
              content: ''; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2; pointer-events: none;
            }
            .brand-banner::before { left: 0; background: linear-gradient(90deg, var(--bg, #0a0a1a), transparent); }
            .brand-banner::after { right: 0; background: linear-gradient(270deg, var(--bg, #0a0a1a), transparent); }
            .banner-track { display: flex; gap: 0; width: max-content; will-change: transform; }
            .banner-item {
              flex-shrink: 0; width: 280px; height: 360px; position: relative;
              clip-path: polygon(12% 0, 100% 0, 88% 100%, 0% 100%);
              margin-left: -30px; transition: transform .3s, filter .3s;
            }
            .banner-item:first-child { margin-left: 0; }
            .banner-item:hover { transform: scale(1.05); z-index: 3; filter: brightness(1.1); }
            .banner-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
            .banner-item .banner-overlay {
              position: absolute; inset: 0; display: flex; flex-direction: column;
              justify-content: flex-end; padding: 20px 30px;
              background: linear-gradient(0deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 40%, transparent 70%);
            }
            .banner-item .banner-brand {
              font-family: 'Outfit', sans-serif; font-size: .75rem; font-weight: 700;
              text-transform: uppercase; letter-spacing: .15em; color: var(--primary, #00d4ff);
              margin-bottom: 4px;
            }
            .banner-item .banner-cat {
              font-family: 'Outfit', sans-serif; font-size: 1.15rem; font-weight: 600;
              color: #fff; line-height: 1.2;
            }
            .banner-arrow {
              position: absolute; top: 50%; transform: translateY(-50%); z-index: 5;
              width: 48px; height: 48px; border: none; border-radius: 50%;
              background: rgba(0,0,0,.6); color: #fff; font-size: 1.4rem;
              cursor: pointer; display: flex; align-items: center; justify-content: center;
              backdrop-filter: blur(6px); transition: background .2s, transform .2s;
            }
            .banner-arrow:hover { background: var(--primary, #00d4ff); transform: translateY(-50%) scale(1.1); }
            .banner-arrow--left { left: 12px; }
            .banner-arrow--right { right: 12px; }
            @media (max-width: 768px) {
              .brand-banner {
                overflow-y: auto;
                overflow-x: hidden;
                max-height: 72vh;
                padding: 8px 4px 8px 0;
              }
              .brand-banner::before,
              .brand-banner::after { display: none; }
              .banner-track {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 12px;
                transform: none !important;
              }
              .banner-item {
                width: 100%;
                height: 200px;
                margin-left: 0;
                clip-path: none;
                border-radius: 12px;
                overflow: hidden;
              }
              .banner-item .banner-cat { font-size: 1rem; }
              .banner-arrow { display: none; }
            }
          `}</style>

          <div
            className="brand-banner"
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
          >
            <button className="banner-arrow banner-arrow--left" aria-label="Przewiń w lewo" onClick={() => scrollBanner(-1)}>&#10094;</button>
            <button className="banner-arrow banner-arrow--right" aria-label="Przewiń w prawo" onClick={() => scrollBanner(1)}>&#10095;</button>
            <div className="banner-track" ref={trackRef}>
              {allItems.map((item, i) => (
                <a href="#cta-sklep" className="banner-item" key={i}>
                  <img src={item.img} alt={item.alt} />
                  <div className="banner-overlay">
                    <span className="banner-brand">{item.brand}</span>
                    <span className="banner-cat">{item.cat}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="info-cards">
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              </div>
              <Editable id="sklep.info1.title" as="h3">Gwarancja oryginalności</Editable>
              <Editable id="sklep.info1.desc" as="p" multiline>Wszystkie produkty pochodzą od autoryzowanych dystrybutorów. Pełna gwarancja producenta.</Editable>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <Editable id="sklep.info2.title" as="h3">Profesjonalne doradztwo</Editable>
              <Editable id="sklep.info2.desc" as="p" multiline>Nasi sprzedawcy pomogą dobrać odpowiedni rozmiar i model do Twoich potrzeb.</Editable>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
              <Editable id="sklep.info3.title" as="h3">Możliwość zamówienia</Editable>
              <Editable id="sklep.info3.desc" as="p" multiline>Nie mamy Twojego rozmiaru? Zamówimy produkt specjalnie dla Ciebie.</Editable>
            </div>
          </div>

          <div className="sidebar-card cta-card" id="cta-sklep" style={{ maxWidth: "500px", margin: "40px auto" }}>
            <Editable id="sklep.cta.title" as="h3">Odwiedź nasz sklep</Editable>
            <Editable id="sklep.cta.desc" as="p" multiline>Zapraszamy do naszego salonu przy ul. Partyzanckiej 85 w Opolu. Przymierz odzież i sprawdź osprzęt na miejscu!</Editable>
            <a href="tel:601484242" className="btn btn-primary btn-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              601 48 42 42
            </a>
          </div>
        </div>
      </section>

      <SubpageFooter />
    </>
  );
}
