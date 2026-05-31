"use client";

import { useMemo } from "react";
import type { Part, PartCategory, PartCondition } from "@/lib/parts";
import { CATEGORY_LABELS, CONDITION_LABELS } from "@/lib/parts";

export interface PartFiltersState {
  search: string;
  category: string;
  condition: string;
  brand: string;
  priceFrom: string;
  priceTo: string;
  onlyAvailable: boolean;
}

export const emptyPartFilters: PartFiltersState = {
  search: "",
  category: "",
  condition: "",
  brand: "",
  priceFrom: "",
  priceTo: "",
  onlyAvailable: false,
};

export function applyPartFilters(parts: Part[], f: PartFiltersState): Part[] {
  const q = f.search.trim().toLowerCase();
  return parts.filter((p) => {
    if (f.onlyAvailable && !p.available) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.condition && p.condition !== f.condition) return false;
    if (f.brand && p.brand !== f.brand) return false;
    if (f.priceFrom && p.price < Number(f.priceFrom)) return false;
    if (f.priceTo && p.price > Number(f.priceTo)) return false;
    if (q) {
      const hay = `${p.name} ${p.brand} ${p.description} ${p.fits}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

interface Props {
  parts: Part[];
  filters: PartFiltersState;
  onChange: (f: PartFiltersState) => void;
}

export default function PartFilters({ parts, filters, onChange }: Props) {
  const brands = useMemo(
    () => [...new Set(parts.map((p) => p.brand).filter((b) => b && b !== "—"))].sort(),
    [parts]
  );
  const categories = useMemo(
    () => [...new Set(parts.map((p) => p.category))].sort() as PartCategory[],
    [parts]
  );

  const set = <K extends keyof PartFiltersState>(key: K, val: PartFiltersState[K]) =>
    onChange({ ...filters, [key]: val });

  const hasAny =
    filters.search ||
    filters.category ||
    filters.condition ||
    filters.brand ||
    filters.priceFrom ||
    filters.priceTo ||
    filters.onlyAvailable;

  return (
    <div className="mf-wrap">
      {/* Wyszukiwarka */}
      <div className="mf-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          placeholder="Szukaj części: nazwa, marka, opis…"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
        />
      </div>

      {/* Tagi kategorii */}
      {categories.length > 0 && (
        <div className="mf-cats">
          <span className="mf-cat-label">Kategoria:</span>
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

      <div className="mf-grid">
        {brands.length > 0 && (
          <div className="mf-group">
            <span className="mf-lbl">Marka</span>
            <select className="mf-select" value={filters.brand} onChange={(e) => set("brand", e.target.value)}>
              <option value="">Wszystkie marki</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        )}

        <div className="mf-group">
          <span className="mf-lbl">Stan</span>
          <select className="mf-select" value={filters.condition} onChange={(e) => set("condition", e.target.value)}>
            <option value="">Każdy</option>
            {(Object.entries(CONDITION_LABELS) as [PartCondition, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        <div className="mf-group">
          <span className="mf-lbl">Cena (zł)</span>
          <div className="mf-dbl">
            <input className="mf-inp" type="number" placeholder="Od" value={filters.priceFrom} onChange={(e) => set("priceFrom", e.target.value)} step={10} />
            <span className="mf-sep" />
            <input className="mf-inp" type="number" placeholder="Do" value={filters.priceTo} onChange={(e) => set("priceTo", e.target.value)} step={10} />
          </div>
        </div>

        <div className="mf-group mf-group--check">
          <label className="mf-check">
            <input
              type="checkbox"
              checked={filters.onlyAvailable}
              onChange={(e) => set("onlyAvailable", e.target.checked)}
            />
            <span>Tylko dostępne</span>
          </label>
        </div>
      </div>

      {hasAny && (
        <div className="mf-footer">
          <button className="mf-clear" onClick={() => onChange(emptyPartFilters)}>
            Wyczyść filtry
          </button>
        </div>
      )}
    </div>
  );
}
