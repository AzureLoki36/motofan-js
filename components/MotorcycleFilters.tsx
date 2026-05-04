"use client";

import { useMemo } from "react";
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
  mileageFrom: string;
  mileageTo: string;
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
  mileageFrom: "",
  mileageTo: "",
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
    if (f.mileageFrom && m.mileage < Number(f.mileageFrom)) return false;
    if (f.mileageTo && m.mileage > Number(f.mileageTo)) return false;
    return true;
  });
}

interface Props {
  motorcycles: Motorcycle[];
  filters: Filters;
  onChange: (f: Filters) => void;
  t: (key: string) => string;
  showMileage?: boolean;
}

export default function MotorcycleFilters({ motorcycles, filters, onChange, showMileage }: Props) {
  const brands = useMemo(
    () => [...new Set(motorcycles.map((m) => m.brand))].sort(),
    [motorcycles]
  );
  const categories = useMemo(
    () => [...new Set(motorcycles.map((m) => m.category))].sort() as MotorcycleCategory[],
    [motorcycles]
  );

  const set = (key: keyof Filters, val: string) => onChange({ ...filters, [key]: val });
  const hasAny = Object.values(filters).some(Boolean);

  return (
    <div className="mf-wrap">
      {/* ── Category tabs ── */}
      {categories.length > 0 && (
        <div className="mf-cats">
          <span className="mf-cat-label">Typ:</span>
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
      )}

      {/* ── Filter grid ── */}
      <div className="mf-grid">
        {/* Marka */}
        {brands.length > 0 && (
          <div className="mf-group">
            <span className="mf-lbl">Marka</span>
            <select
              className="mf-select"
              value={filters.brand}
              onChange={(e) => set("brand", e.target.value)}
            >
              <option value="">Wszystkie marki</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        )}

        {/* Rok */}
        <div className="mf-group">
          <span className="mf-lbl">Rok produkcji</span>
          <div className="mf-dbl">
            <input className="mf-inp" type="number" placeholder="Od" value={filters.yearFrom} onChange={(e) => set("yearFrom", e.target.value)} />
            <span className="mf-sep" />
            <input className="mf-inp" type="number" placeholder="Do" value={filters.yearTo} onChange={(e) => set("yearTo", e.target.value)} />
          </div>
        </div>

        {/* Cena */}
        <div className="mf-group">
          <span className="mf-lbl">Cena (zł)</span>
          <div className="mf-dbl">
            <input className="mf-inp" type="number" placeholder="Od" value={filters.priceFrom} onChange={(e) => set("priceFrom", e.target.value)} step={1000} />
            <span className="mf-sep" />
            <input className="mf-inp" type="number" placeholder="Do" value={filters.priceTo} onChange={(e) => set("priceTo", e.target.value)} step={1000} />
          </div>
        </div>

        {/* Pojemność */}
        <div className="mf-group">
          <span className="mf-lbl">Pojemność (ccm)</span>
          <div className="mf-dbl">
            <input className="mf-inp" type="number" placeholder="Od" value={filters.displacementFrom} onChange={(e) => set("displacementFrom", e.target.value)} step={50} />
            <span className="mf-sep" />
            <input className="mf-inp" type="number" placeholder="Do" value={filters.displacementTo} onChange={(e) => set("displacementTo", e.target.value)} step={50} />
          </div>
        </div>

        {/* Moc */}
        <div className="mf-group">
          <span className="mf-lbl">Moc (KM)</span>
          <div className="mf-dbl">
            <input className="mf-inp" type="number" placeholder="Od" value={filters.powerFrom} onChange={(e) => set("powerFrom", e.target.value)} />
            <span className="mf-sep" />
            <input className="mf-inp" type="number" placeholder="Do" value={filters.powerTo} onChange={(e) => set("powerTo", e.target.value)} />
          </div>
        </div>

        {/* Przebieg – tylko dla używanych */}
        {showMileage && (
          <div className="mf-group">
            <span className="mf-lbl">Przebieg (km)</span>
            <div className="mf-dbl">
              <input className="mf-inp" type="number" placeholder="Od" value={filters.mileageFrom} onChange={(e) => set("mileageFrom", e.target.value)} step={1000} />
              <span className="mf-sep" />
              <input className="mf-inp" type="number" placeholder="Do" value={filters.mileageTo} onChange={(e) => set("mileageTo", e.target.value)} step={1000} />
            </div>
          </div>
        )}
      </div>

      {/* ── Clear button ── */}
      {hasAny && (
        <div className="mf-footer">
          <button className="mf-clear" onClick={() => onChange(emptyFilters)}>
            Wyczyść filtry
          </button>
        </div>
      )}
    </div>
  );
}
