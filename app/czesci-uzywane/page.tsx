"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import { Editable, EditableHTML } from "@/components/Editable";
import Lightbox from "@/components/Lightbox";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useAdmin } from "@/components/AdminProvider";
import PartAdmin from "@/components/PartAdmin";
import PartFilters, { PartFiltersState, emptyPartFilters, applyPartFilters } from "@/components/PartFilters";
import { CATEGORY_LABELS, CONDITION_LABELS, type Part } from "@/lib/parts";

export default function CzesciUzywane() {
  const { t } = useLocale();
  const { isAdmin, editMode } = useAdmin();
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PartFiltersState>(emptyPartFilters);
  const [mainImages, setMainImages] = useState<Record<string, number>>({});
  const [lightbox, setLightbox] = useState<{ id: string; index: number } | null>(null);

  const fetchParts = useCallback(async () => {
    try {
      const res = await fetch("/api/parts");
      if (res.ok) setParts(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchParts(); }, [fetchParts]);

  const filtered = applyPartFilters(parts, filters);

  const changeMainImage = (id: string, index: number) => {
    setMainImages((prev) => ({ ...prev, [id]: index }));
  };

  const lbPart = lightbox ? parts.find((p) => p.id === lightbox.id) : null;
  const lightboxImages = lbPart ? lbPart.images : [];

  return (
    <>
      <Navbar activeSection="Usługi" />

      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{t("bc.home")}</Link>
            <span>/</span>
            <Link href="/czesci">{t("bc.czesci")}</Link>
            <span>/</span>
            <span>{t("bc.czesci-uzywane")}</span>
          </div>
          <EditableHTML
            id="czesci-uzywane.title"
            as="h1"
            className="page-title"
            defaultHtml='Części <span class="gradient-text">używane</span>'
          />
          <Editable id="czesci-uzywane.desc" as="p" className="page-desc" multiline>
            Sprawdzone, używane części motocyklowe z naszego warsztatu. Zakup wyłącznie przez kontakt telefoniczny — pomożemy dobrać i potwierdzić dostępność.
          </Editable>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="info-cards" style={{ marginBottom: "50px" }}>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              </div>
              <Editable id="czesci-uzywane.info1.title" as="h3">Sprawdzone w warsztacie</Editable>
              <Editable id="czesci-uzywane.info1.desc" as="p" multiline>
                Każda część przed wystawieniem przechodzi sprawdzenie pod kątem sprawności i zużycia.
              </Editable>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              <Editable id="czesci-uzywane.info2.title" as="h3">Zakup tylko przez telefon</Editable>
              <Editable id="czesci-uzywane.info2.desc" as="p" multiline>
                Zadzwoń, potwierdzimy dopasowanie i dostępność. Magazyn zmienia się dynamicznie.
              </Editable>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
              </div>
              <Editable id="czesci-uzywane.info3.title" as="h3">Pomoc w doborze</Editable>
              <Editable id="czesci-uzywane.info3.desc" as="p" multiline>
                Nie wiesz, czy część pasuje? Mechanicy doradzą i sprawdzą zgodność.
              </Editable>
            </div>
          </div>

          <EditableHTML
            id="czesci-uzywane.h2.oferta"
            as="h2"
            defaultHtml='Aktualnie <span class="gradient-text">w magazynie</span>'
          />
          <Editable id="czesci-uzywane.lead" as="p" className="lead" multiline>
            Kliknij na zdjęcie aby powiększyć. Oferta zmienia się dynamicznie — zadzwoń i zapytaj o dostępność.
          </Editable>

          {isAdmin && editMode && (
            <PartAdmin parts={parts} onSaved={fetchParts} />
          )}

          {parts.length > 0 && (
            <PartFilters parts={parts} filters={filters} onChange={setFilters} />
          )}

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-m)" }}>
              <div className="moto-spinner" />
              <p>Ładowanie...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-m)" }}>
              <p>{parts.length === 0 ? "Brak części w magazynie." : "Brak wyników dla wybranych filtrów."}</p>
            </div>
          ) : (
            <div className="parts-grid">
              {filtered.map((p) => {
                const activeIdx = mainImages[p.id] || 0;
                const images = p.images.length > 0 ? p.images : ["/pics/latajace/cogwheel.svg"];
                return (
                  <article className={`part-card${!p.available ? " part-card--sold" : ""}`} key={p.id}>
                    <div className="part-img" onClick={() => images.length > 0 && setLightbox({ id: p.id, index: activeIdx })}>
                      <img src={images[activeIdx] || images[0]} alt={p.name} />
                      <span className={`part-badge part-badge--${p.condition}`}>{CONDITION_LABELS[p.condition]}</span>
                      {!p.available && <span className="part-unavailable">Niedostępna</span>}
                    </div>
                    {p.images.length > 1 && (
                      <div className="part-thumbs">
                        {p.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`${p.name} ${i + 1}`}
                            className={i === activeIdx ? "active" : ""}
                            onClick={() => changeMainImage(p.id, i)}
                          />
                        ))}
                      </div>
                    )}
                    <div className="part-info">
                      <span className="part-cat">{CATEGORY_LABELS[p.category]}</span>
                      <h3>{p.name}</h3>
                      {p.brand && p.brand !== "—" && <span className="part-brand">{p.brand}</span>}
                      {p.fits && <div className="part-fits"><strong>Pasuje do:</strong> {p.fits}</div>}
                      {p.description && <p className="part-desc">{p.description}</p>}
                      <div className="part-price">{p.price.toLocaleString("pl-PL")} zł</div>
                      <a href="tel:601484242" className="btn btn-primary btn-full">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        Zadzwoń: 601 48 42 42
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="sidebar-card cta-card" style={{ maxWidth: "600px", margin: "50px auto" }}>
            <Editable id="czesci-uzywane.cta.title" as="h3">Nie znalazłeś części?</Editable>
            <Editable id="czesci-uzywane.cta.desc" as="p" multiline>
              Magazyn części używanych zmienia się codziennie — zadzwoń, sprawdzimy czy mamy to, czego szukasz.
            </Editable>
            <a href="tel:601484242" className="btn btn-primary btn-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              601 48 42 42
            </a>
          </div>
        </div>
      </section>

      {lightbox && lbPart && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightbox.index}
          open={true}
          onClose={() => setLightbox(null)}
          onIndexChange={(i) => setLightbox((prev) => prev ? { ...prev, index: i } : null)}
        />
      )}

      <style>{`
        /* === Styl podstrony części używanych === */
        .parts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .part-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .part-card:hover {
          transform: translateY(-3px);
          border-color: var(--primary);
          box-shadow: var(--shadow-h);
        }
        .part-card--sold { opacity: .65; }
        .part-img {
          position: relative;
          aspect-ratio: 4/3;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: zoom-in;
          overflow: hidden;
        }
        .part-img img {
          max-width: 86%; max-height: 86%;
          width: auto; height: auto;
          object-fit: contain;
          transition: transform .35s ease;
        }
        .part-card:hover .part-img img { transform: scale(1.04); }
        .part-badge {
          position: absolute; top: 10px; left: 10px;
          padding: 4px 10px; border-radius: 100px;
          font-size: .72rem; font-weight: 700;
          letter-spacing: .04em; text-transform: uppercase;
          background: #fff; color: var(--text);
          border: 1px solid var(--border);
        }
        .part-badge--nowa { background: #d1fae5; color: #065f46; border-color: #6ee7b7; }
        .part-badge--stan-bdb { background: #dbeafe; color: #1e40af; border-color: #93c5fd; }
        .part-badge--stan-db { background: #fef3c7; color: #78350f; border-color: #fcd34d; }
        .part-badge--stan-uzywany { background: #fee2e2; color: #7f1d1d; border-color: #fca5a5; }
        .part-unavailable {
          position: absolute; top: 10px; right: 10px;
          padding: 4px 10px; border-radius: 100px;
          font-size: .72rem; font-weight: 700;
          background: #4b5563; color: #fff;
        }
        .part-thumbs {
          display: flex; gap: 6px;
          padding: 8px 12px;
          background: var(--bg);
          overflow-x: auto;
        }
        .part-thumbs img {
          width: 56px; height: 42px;
          object-fit: contain;
          background: #fff;
          border-radius: var(--radius-sm);
          cursor: pointer;
          border: 2px solid transparent;
          flex-shrink: 0;
        }
        .part-thumbs img.active {
          border-color: var(--primary);
        }
        .part-info {
          padding: 20px;
          display: flex; flex-direction: column;
          flex: 1;
        }
        .part-cat {
          display: inline-block;
          background: var(--grad-soft);
          color: var(--primary);
          padding: 3px 10px;
          border-radius: 100px;
          font-size: .72rem; font-weight: 700;
          letter-spacing: .04em; text-transform: uppercase;
          width: fit-content; margin-bottom: 8px;
        }
        .part-info h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem; font-weight: 700;
          margin: 0 0 6px;
          color: var(--text); line-height: 1.25;
        }
        .part-brand {
          font-size: .85rem; color: var(--text-m); font-weight: 600;
          margin-bottom: 10px;
        }
        .part-fits {
          font-size: .82rem; color: var(--text-m);
          margin: 6px 0 10px;
          padding: 8px 10px;
          background: var(--bg);
          border-radius: var(--radius-sm);
          line-height: 1.4;
        }
        .part-fits strong { color: var(--text); }
        .part-desc {
          font-size: .9rem; color: var(--text-m);
          line-height: 1.55;
          margin: 0 0 14px;
        }
        .part-price {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem; font-weight: 800;
          color: var(--primary);
          margin: auto 0 14px;
        }
        /* Doklejki do filtrów (wyszukiwarka + checkbox) */
        .mf-search {
          display: flex; align-items: center; gap: 10px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          margin-bottom: 14px;
          transition: border-color .15s;
        }
        .mf-search:focus-within { border-color: var(--primary); }
        .mf-search svg { color: var(--text-m); flex-shrink: 0; }
        .mf-search input {
          flex: 1; border: none; outline: none; background: transparent;
          font-size: 1rem; color: var(--text); font-family: inherit;
        }
        .mf-group--check { display: flex; align-items: flex-end; }
        .mf-check {
          display: flex; align-items: center; gap: 8px;
          font-size: .9rem; color: var(--text-m); cursor: pointer;
          padding-bottom: 4px;
        }
        .mf-check input { width: 18px; height: 18px; accent-color: var(--primary); }
      `}</style>

      <SubpageFooter />
    </>
  );
}
