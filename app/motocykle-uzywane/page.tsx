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
    id: "moto1",
    brand: "Kawasaki",
    name: "Z650",
    badge: "Dostępny",
    specs: [
      { label: "Rok", value: "2021" },
      { label: "Przebieg", value: "8 500 km" },
      { label: "Pojemność", value: "649 cm³" },
      { label: "Moc", value: "68 KM" },
    ],
    desc: "Świetny motocykl dla początkujących i zaawansowanych. Pierwszy właściciel, serwisowany w ASO.",
    price: "29 900 zł",
    btnText: "Zapytaj o ten motocykl",
    btnClass: "btn btn-primary btn-full",
    images: [
      { thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=1200&h=800&fit=crop" },
    ],
  },
  {
    id: "moto2",
    brand: "Benelli",
    name: "TRK 502 X",
    badge: "Dostępny",
    specs: [
      { label: "Rok", value: "2022" },
      { label: "Przebieg", value: "4 200 km" },
      { label: "Pojemność", value: "500 cm³" },
      { label: "Moc", value: "47,5 KM" },
    ],
    desc: "Adventure w wersji X z podniesionymi końcówkami. Idealny do jazdy po asfalcie i lekkim terenie.",
    price: "26 500 zł",
    btnText: "Zapytaj o ten motocykl",
    btnClass: "btn btn-primary btn-full",
    images: [
      { thumb: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&h=800&fit=crop" },
    ],
  },
  {
    id: "moto3",
    brand: "Kawasaki",
    name: "Ninja 650",
    badge: "Rezerwacja",
    badgeClass: "sold",
    specs: [
      { label: "Rok", value: "2020" },
      { label: "Przebieg", value: "12 800 km" },
      { label: "Pojemność", value: "649 cm³" },
      { label: "Moc", value: "68 KM" },
    ],
    desc: "Sportowy wygląd, komfortowa pozycja. Nowe opony, świeży przegląd. Kolor zielony Kawasaki.",
    price: "32 900 zł",
    btnText: "Rezerwacja",
    btnClass: "btn btn-secondary btn-full",
    images: [
      { thumb: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop" },
    ],
  },
  {
    id: "moto4",
    brand: "Kymco",
    name: "X-Town 300i ABS",
    badge: "Dostępny",
    specs: [
      { label: "Rok", value: "2023" },
      { label: "Przebieg", value: "2 100 km" },
      { label: "Pojemność", value: "276 cm³" },
      { label: "Moc", value: "25 KM" },
    ],
    desc: "Praktyczny skuter miejski z ABS. Pojemny bagażnik, niskie spalanie. Jak nowy!",
    price: "18 900 zł",
    btnText: "Zapytaj o ten motocykl",
    btnClass: "btn btn-primary btn-full",
    images: [
      { thumb: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop" },
      { thumb: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=150&h=100&fit=crop", full: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop", hires: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&h=800&fit=crop" },
    ],
  },
];

export default function MotocykleUzywane() {
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
            <span>Motocykle używane</span>
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
            <Editable id="uzywane.cta.title" as="h3">Szukasz czegoś konkretnego?</Editable>
            <Editable id="uzywane.cta.desc" as="p" multiline>Jeśli nie znalazłeś motocykla, który Cię interesuje – zadzwoń! Oferta zmienia się często, a my możemy pomóc w poszukiwaniach.</Editable>
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
