"use client";

import { useMemo, useState } from "react";
import type { Motorcycle, MotorcycleCategory } from "@/lib/motorcycles";
import { CATEGORY_LABELS } from "@/lib/motorcycles";

export interface Filters {
  brand: string;
  category: string;
  yearFrom: string;
  yearTo: string;
  priceFrom: string;
  priceTo: string;
  displacementFrom: string;
  displacementTo: string;
  powerFrom: string;
  powerTo: string;
}

export const emptyFilters: Filters = {
  brand: "",
  category: "",
  yearFrom: "",
  yearTo: "",
  priceFrom: "",
  priceTo: "",
  displacementFrom: "",
  displacementTo: "",
  powerFrom: "",
  powerTo: "",
};

export function applyFilters(motorcycles: Motorcycle[], f: Filters): Motorcycle[] {
  return motorcycles.filter((m) => {
    if (f.brand && m.brand !== f.brand) return false;
    if (f.category && m.category !== f.category) return false;
    if (f.yearFrom && m.year < Number(f.yearFrom)) return false;
    if (f.yearTo && m.year > Number(f.yearTo)) return false;
    if (f.priceFrom && m.price < Number(f.priceFrom)) return false;
    if (f.priceTo && m.price > Number(f.priceTo)) return false;
    if (f.displacementFrom && m.displacement < Number(f.displacementFrom)) return false;
    if (f.displacementTo && m.displacement > Number(f.displacementTo)) return false;
    if (f.powerFrom && m.power < Number(f.powerFrom)) return false;
    if (f.powerTo && m.power > Number(f.powerTo)) return false;
    return true;
  });
}

interface Props {
  motorcycles: Motorcycle[];
  filters: Filters;
  onChange: (f: Filters) => void;
  t: (key: string) => string;
}

export default function MotorcycleFilters({ motorcycles, filters, onChange }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const brands = useMemo(
    () => [...new Set(motorcycles.map((m) => m.brand))].sort(),
    [motorcycles]
  );
  const categories = useMemo(
    () => [...new Set(motorcycles.map((m) => m.category))].sort() as MotorcycleCategory[],
    [motorcycles]
  );

  const set = (key: keyof Filters, val: string) =>
    onChange({ ...filters, [key]: val });

  const advancedKeys: (keyof Filters)[] = [
    "yearFrom", "yearTo", "priceFrom", "priceTo",
    "displacementFrom", "displacementTo", "powerFrom", "powerTo",
  ];
  const advancedCount = advancedKeys.filter((k) => filters[k]).length;
  const totalActive = Object.values(filters).filter(Boolean).length;

  return (
    <div className="mf-wrap">
      {/* ── Category tabs ── */}
      {categories.length > 0 && (
        <div className="mf-tabs-wrap">
          <div className="mf-tabs">
            <button
              className={`mf-tab${!filters.category ? " mf-tab--active" : ""}`}
              onClick={() => set("category", "")}
            >
              Wszystkie
            </button>
            {categories.map((c) => (
              <button
                key={c}
                className={`mf-tab${filters.category === c ? " mf-tab--active" : ""}`}
                onClick={() => set("category", filters.category === c ? "" : c)}
              >
                {CATEGORY_LABELS[c] || c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom bar: brand + actions ── */}
      <div className="mf-bar">
        {/* Brand pills */}
        {brands.length > 0 && (
          <div className="mf-brands">
            <span className="mf-bar-label">Marka:</span>
            <button
              className={`mf-brand${!filters.brand ? " mf-brand--active" : ""}`}
              onClick={() => set("brand", "")}
            >
              Wszystkie
            </button>
            {brands.map((b) => (
              <button
                key={b}
                className={`mf-brand${filters.brand === b ? " mf-brand--active" : ""}`}
                onClick={() => set("brand", filters.brand === b ? "" : b)}
              >
                {b}
              </button>
            ))}
          </div>
        )}

        {/* Right actions */}
        <div className="mf-actions">
          <button
            className={`mf-adv-btn${showAdvanced ? " mf-adv-btn--open" : ""}${advancedCount > 0 ? " mf-adv-btn--has" : ""}`}
            onClick={() => setShowAdvanced((v) => !v)}
          >
            Filtry
            {advancedCount > 0 && <span className="mf-badge">{advancedCount}</span>}
            <svg
              width="13" height="13"
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              style={{ transform: showAdvanced ? "rotate(180deg)" : "none", transition: "transform .25s" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {totalActive > 0 && (
            <button className="mf-reset" onClick={() => onChange(emptyFilters)}>
              Wyczyść wszystko
            </button>
          )}
        </div>
      </div>

      {/* ── Advanced panel ── */}
      {showAdvanced && (
        <div className="mf-advanced">
          <div className="mf-adv-grid">
            <div className="mf-field">
              <label className="mf-lbl">Rok produkcji</label>
              <div className="mf-range">
                <input className="mf-input" type="number" placeholder="Od" value={filters.yearFrom} onChange={(e) => set("yearFrom", e.target.value)} />
                <span className="mf-sep" />
                <input className="mf-input" type="number" placeholder="Do" value={filters.yearTo} onChange={(e) => set("yearTo", e.target.value)} />
              </div>
            </div>
            <div className="mf-field">
              <label className="mf-lbl">Cena (zł)</label>
              <div className="mf-range">
                <input className="mf-input" type="number" placeholder="Od" value={filters.priceFrom} onChange={(e) => set("priceFrom", e.target.value)} step={1000} />
                <span className="mf-sep" />
                <input className="mf-input" type="number" placeholder="Do" value={filters.priceTo} onChange={(e) => set("priceTo", e.target.value)} step={1000} />
              </div>
            </div>
            <div className="mf-field">
              <label className="mf-lbl">Pojemność (ccm)</label>
              <div className="mf-range">
                <input className="mf-input" type="number" placeholder="Od" value={filters.displacementFrom} onChange={(e) => set("displacementFrom", e.target.value)} step={50} />
                <span className="mf-sep" />
                <input className="mf-input" type="number" placeholder="Do" value={filters.displacementTo} onChange={(e) => set("displacementTo", e.target.value)} step={50} />
              </div>
            </div>
            <div className="mf-field">
              <label className="mf-lbl">Moc (KM)</label>
              <div className="mf-range">
                <input className="mf-input" type="number" placeholder="Od" value={filters.powerFrom} onChange={(e) => set("powerFrom", e.target.value)} />
                <span className="mf-sep" />
                <input className="mf-input" type="number" placeholder="Do" value={filters.powerTo} onChange={(e) => set("powerTo", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
