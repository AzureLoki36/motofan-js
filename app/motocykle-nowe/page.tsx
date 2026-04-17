"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SubpageFooter from "@/components/SubpageFooter";
import { Editable, EditableHTML } from "@/components/Editable";
import Lightbox from "@/components/Lightbox";
import Link from "next/link";

interface MotoImage {
  thumb: string;
  full: string;
  hires: string;
}

interface Motorcycle {
  id: string;
  brand: string;
  name: string;
  badge: string;
  badgeClass?: string;
  specs: { label: string; value: string }[];
  desc: string;
  price: string;
  btnText: string;
  btnClass: string;
  images: MotoImage[];
}

const motorcycles: Motorcycle[] = [
  {
    id: "new1",
    brand: "Kawasaki",
    name: "Z650",
    badge: "Nowy",
    specs: [
      { label: "Rok", value: "2025" },
      { label: "Przebieg", value: "0 km" },
      { label: "Pojemność", value: "649 cm³" },
      { label: "Moc", value: "68 KM" },
    ],
    desc: "Bestsellerowy naked bike. Doskonały zarówno dla początkujących, jak i doświadczonych motocyklistów.",
    price: "od 34 900 zł",
    btnText: "Zapytaj o ten motocykl",
    btnClass: "btn btn-primary btn-full",
    images: [
      { thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop" },
    ],
  },
  {
    id: "new2",
    brand: "Kawasaki",
    name: "Ninja 650",
    badge: "Nowy",
    specs: [
      { label: "Rok", value: "2025" },
      { label: "Przebieg", value: "0 km" },
      { label: "Pojemność", value: "649 cm³" },
      { label: "Moc", value: "68 KM" },
    ],
    desc: "Sportowy charakter w przystępnej formie. Ikoniczny design Ninja z komfortową pozycją jazdy.",
    price: "od 37 900 zł",
    btnText: "Zapytaj o ten motocykl",
    btnClass: "btn btn-primary btn-full",
    images: [
      { thumb: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop" },
    ],
  },
  {
    id: "new3",
    brand: "Benelli",
    name: "TRK 502 X",
    badge: "Nowy",
    specs: [
      { label: "Rok", value: "2025" },
      { label: "Przebieg", value: "0 km" },
      { label: "Pojemność", value: "500 cm³" },
      { label: "Moc", value: "47,5 KM" },
    ],
    desc: "Wszechstronny adventure z włoskim sznytem. Idealny na asfalt i lekki teren. Bestseller marki.",
    price: "od 27 990 zł",
    btnText: "Zapytaj o ten motocykl",
    btnClass: "btn btn-primary btn-full",
    images: [
      { thumb: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&h=800&fit=crop" },
    ],
  },
  {
    id: "new4",
    brand: "Kymco",
    name: "X-Town 300i ABS",
    badge: "Nowy",
    specs: [
      { label: "Rok", value: "2025" },
      { label: "Przebieg", value: "0 km" },
      { label: "Pojemność", value: "276 cm³" },
      { label: "Moc", value: "25 KM" },
    ],
    desc: "Komfortowy maxiskuter miejski z ABS. Pojemny schowek pod siedzeniem, niskie spalanie.",
    price: "od 21 900 zł",
    btnText: "Zapytaj o ten motocykl",
    btnClass: "btn btn-primary btn-full",
    images: [
      { thumb: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=1200&h=800&fit=crop" },
    ],
  },
];

export default function MotocykleNowe() {
  const [mainImages, setMainImages] = useState<Record<string, number>>(
    Object.fromEntries(motorcycles.map((m) => [m.id, 0]))
  );
  const [lightbox, setLightbox] = useState<{ galleryId: string; index: number } | null>(null);

  const changeMainImage = (galleryId: string, index: number) => {
    setMainImages((prev) => ({ ...prev, [galleryId]: index }));
  };

  const lightboxImages = lightbox ? motorcycles.find((m) => m.id === lightbox.galleryId)!.images.map((img) => img.hires) : [];

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
            <span>Motocykle nowe</span>
          </div>
          <EditableHTML id="nowe.title" as="h1" className="page-title" defaultHtml='Nowe <span class="gradient-text">Motocykle</span>' />
          <Editable id="nowe.desc" as="p" className="page-desc">Autoryzowany salon Kawasaki, Benelli i Kymco w Opolu. Pełna gama nowych motocykli, skuterów i quadów z gwarancją producenta.</Editable>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="info-cards" style={{ marginBottom: "50px" }}>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>
              </div>
              <Editable id="nowe.info1.title" as="h3">Gwarancja producenta</Editable>
              <Editable id="nowe.info1.desc" as="p" multiline>Każdy nowy motocykl objęty jest oficjalną gwarancją. Serwis gwarancyjny na miejscu.</Editable>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </div>
              <Editable id="nowe.info2.title" as="h3">Kredyt i leasing</Editable>
              <Editable id="nowe.info2.desc" as="p" multiline>Finansowanie na raty, leasing dla firm. Pomożemy z formalnościami.</Editable>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
              </div>
              <Editable id="nowe.info3.title" as="h3">Rejestracja na miejscu</Editable>
              <Editable id="nowe.info3.desc" as="p" multiline>Pomoc w rejestracji, ubezpieczeniu OC/AC i formalnościach.</Editable>
            </div>
          </div>

          <EditableHTML id="nowe.h2.oferta" as="h2" defaultHtml='Aktualna <span class="gradient-text">oferta</span>' />
          <Editable id="nowe.lead" as="p" className="lead" multiline>Kliknij na zdjęcie aby powiększyć. Dostępność modeli zmienia się – zadzwoń i zapytaj o aktualny stan.</Editable>

          <div className="moto-gallery-v2">
            {motorcycles.map((moto) => {
              const activeIdx = mainImages[moto.id];
              return (
                <article className="moto-card-v2" key={moto.id}>
                  <div className="moto-images-container">
                    <div className="moto-main-img" onClick={() => setLightbox({ galleryId: moto.id, index: activeIdx })}>
                      <img src={moto.images[activeIdx].full} alt={`${moto.brand} ${moto.name}`} />
                      <span className={`moto-badge${moto.badgeClass ? " " + moto.badgeClass : ""}`}>{moto.badge}</span>
                      <div className="moto-zoom-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                      </div>
                    </div>
                    <div className="moto-thumbs-scroll">
                      {moto.images.map((img, i) => (
                        <img
                          key={i}
                          src={img.thumb}
                          alt={`Widok ${i + 1}`}
                          className={i === activeIdx ? "active" : ""}
                          onClick={() => changeMainImage(moto.id, i)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="moto-details">
                    <span className="moto-brand">{moto.brand}</span>
                    <h3>{moto.name}</h3>
                    <div className="moto-specs">
                      {moto.specs.map((s) => (
                        <div className="spec" key={s.label}><strong>{s.label}:</strong> {s.value}</div>
                      ))}
                    </div>
                    <p className="moto-desc">{moto.desc}</p>
                    <div className="moto-price">{moto.price}</div>
                    <a href="tel:601484242" className={moto.btnClass}>{moto.btnText}</a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="sidebar-card cta-card" style={{ maxWidth: "600px", margin: "50px auto" }}>
            <Editable id="nowe.cta.title" as="h3">Nie widzisz swojego modelu?</Editable>
            <Editable id="nowe.cta.desc" as="p" multiline>Nasza oferta obejmuje pełną gamę Kawasaki, Benelli i Kymco. Zadzwoń – zamówimy dowolny model z katalogu producenta.</Editable>
            <a href="tel:601484242" className="btn btn-primary btn-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              601 48 42 42
            </a>
          </div>
        </div>
      </section>

      {lightbox && (
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
