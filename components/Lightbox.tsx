"use client";

import { useCallback, useEffect, useState } from "react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, open, onClose, onIndexChange }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const prev = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const next = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose, prev, next]);

  if (!open) return null;

  return (
    <div className="lightbox active" onClick={(e) => { if ((e.target as HTMLElement).classList.contains("lightbox")) onClose(); }}>
      <button className="lightbox-close" onClick={onClose} aria-label="Zamknij">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
      </button>
      <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Poprzednie">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Następne">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
      <div className="lightbox-content">
        <img src={images[currentIndex]} alt="Powiększone zdjęcie" />
      </div>
      <div className="lightbox-thumbnails">
        {images.map((src, i) => (
          <img
            key={i}
            src={src.replace("1200&h=800", "150&h=100")}
            className={i === currentIndex ? "active" : ""}
            onClick={() => onIndexChange(i)}
            alt={`Miniatura ${i + 1}`}
          />
        ))}
      </div>
      <div className="lightbox-counter">{currentIndex + 1} / {images.length}</div>
    </div>
  );
}
