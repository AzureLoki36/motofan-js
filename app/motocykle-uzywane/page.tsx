"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import { Editable, EditableHTML } from "@/components/Editable";
import Lightbox from "@/components/Lightbox";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { useAdmin } from "@/components/AdminProvider";
import MotorcycleAdmin from "@/components/MotorcycleAdmin";
import MotorcycleFilters, { Filters, emptyFilters, applyFilters } from "@/components/MotorcycleFilters";
import type { Motorcycle } from "@/lib/motorcycles";

export default function MotocykleUzywane() {
  const { t } = useLocale();
  const { isAdmin, editMode } = useAdmin();
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [mainImages, setMainImages] = useState<Record<string, number>>({});
  const [lightbox, setLightbox] = useState<{ id: string; index: number } | null>(null);

  const fetchMotorcycles = useCallback(async () => {
    try {
      const res = await fetch("/api/motorcycles");
      if (res.ok) {
        const all: Motorcycle[] = await res.json();
        setMotorcycles(all.filter((m) => m.type === "uzywane"));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMotorcycles(); }, [fetchMotorcycles]);

  const filtered = applyFilters(motorcycles, filters);

  const changeMainImage = (id: string, index: number) => {
    setMainImages((prev) => ({ ...prev, [id]: index }));
  };

  const lbMoto = lightbox ? motorcycles.find((m) => m.id === lightbox.id) : null;
  const lightboxImages = lbMoto ? lbMoto.images : [];

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
            <span>{t("bc.uzywane")}</span>
          </div>
          <EditableHTML id="uzywane.title" as="h1" className="page-title" defaultHtml='Motocykle <span class="gradient-text">Używane</span>' />
          <Editable id="uzywane.desc" as="p" className="page-desc">Sprawdzone motocykle z historią serwisową. Każdy pojazd przed sprzedażą przechodzi szczegółowy przegląd techniczny w naszym warsztacie.</Editable>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="info-cards" style={{ marginBottom: "50px" }}>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
              </div>
              <Editable id="uzywane.info1.title" as="h3">Przegląd przed sprzedażą</Editable>
              <Editable id="uzywane.info1.desc" as="p" multiline>Każdy motocykl przechodzi szczegółową kontrolę techniczną w naszym serwisie.</Editable>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
              <Editable id="uzywane.info2.title" as="h3">Znana historia</Editable>
              <Editable id="uzywane.info2.desc" as="p" multiline>Pełna dokumentacja serwisowa. Wiemy wszystko o motocyklu.</Editable>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </div>
              <Editable id="uzywane.info3.title" as="h3">Finansowanie</Editable>
              <Editable id="uzywane.info3.desc" as="p" multiline>Możliwość kredytu lub leasingu. Pomożemy załatwić formalności.</Editable>
            </div>
          </div>

          <EditableHTML id="uzywane.h2.oferta" as="h2" defaultHtml='Aktualna <span class="gradient-text">oferta</span>' />
          <Editable id="uzywane.lead" as="p" className="lead" multiline>Kliknij na zdjęcie aby powiększyć. Oferta zmienia się dynamicznie – zadzwoń i zapytaj o dostępność.</Editable>

          {isAdmin && editMode && (
            <MotorcycleAdmin motoType="uzywane" motorcycles={motorcycles} onSaved={fetchMotorcycles} />
          )}

          {motorcycles.length > 0 && (
            <MotorcycleFilters motorcycles={motorcycles} filters={filters} onChange={setFilters} t={t} />
          )}

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-m)" }}>
              <div className="moto-spinner" />
              <p>Ładowanie...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-m)" }}>
              <p>{motorcycles.length === 0 ? "Brak motocykli w ofercie." : t("filter.noResults")}</p>
            </div>
          ) : (
            <div className="moto-gallery-v2">
              {filtered.map((moto) => {
                const activeIdx = mainImages[moto.id] || 0;
                const images = moto.images.length > 0 ? moto.images : ["/pics/placeholder.jpg"];
                const badgeLabel = moto.status === "reserved" ? t("badge.reserved") : moto.status === "sold" ? t("badge.sold") : t("badge.available");
                const badgeClass = moto.status === "reserved" || moto.status === "sold" ? " sold" : "";
                return (
                  <article className="moto-card-v2" key={moto.id}>
                    <div className="moto-images-container">
                      <div className="moto-main-img" onClick={() => images.length > 0 && setLightbox({ id: moto.id, index: activeIdx })}>
                        <img src={images[activeIdx] || images[0]} alt={`${moto.brand} ${moto.model}`} />
                        <span className={`moto-badge${badgeClass}`}>{badgeLabel}</span>
                        <div className="moto-zoom-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                        </div>
                      </div>
                      <div className="moto-thumbs-scroll">
                        {images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`${moto.brand} ${moto.model} ${i + 1}`}
                            className={i === activeIdx ? "active" : ""}
                            onClick={() => changeMainImage(moto.id, i)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="moto-details">
                      <span className="moto-brand">{moto.brand}</span>
                      <h3>{moto.model}</h3>
                      <div className="moto-specs">
                        <div className="spec"><strong>{t("spec.year")}:</strong> {moto.year}</div>
                        <div className="spec"><strong>{t("spec.mileage")}:</strong> {moto.mileage.toLocaleString("pl-PL")} km</div>
                        <div className="spec"><strong>{t("spec.displacement")}:</strong> {moto.displacement} cm³</div>
                        <div className="spec"><strong>{t("spec.power")}:</strong> {moto.power} KM</div>
                      </div>
                      <p className="moto-desc">{moto.description}</p>
                      <div className="moto-price">{moto.price.toLocaleString("pl-PL")} zł</div>
                      <a href="tel:601484242" className="btn btn-primary btn-full">{t("moto.askAbout")}</a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="sidebar-card cta-card" style={{ maxWidth: "600px", margin: "50px auto" }}>
            <Editable id="uzywane.cta.title" as="h3">Szukasz czegoś konkretnego?</Editable>
            <Editable id="uzywane.cta.desc" as="p" multiline>Jeśli nie znalazłeś motocykla, który Cię interesuje – zadzwoń! Oferta zmienia się często, a my możemy pomóc w poszukiwaniach.</Editable>
            <a href="tel:601484242" className="btn btn-primary btn-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              601 48 42 42
            </a>
          </div>
        </div>
      </section>

      {lightbox && lbMoto && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightbox.index}
          open={true}
          onClose={() => setLightbox(null)}
          onIndexChange={(i) => setLightbox((prev) => prev ? { ...prev, index: i } : null)}
        />
      )}

      <SubpageFooter />
    </>
  );
}
