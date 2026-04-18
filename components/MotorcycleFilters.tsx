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

export default function MotorcycleFilters({ motorcycles, filters, onChange, t }: Props) {
  const brands = useMemo(
    () => [...new Set(motorcycles.map((m) => m.brand))].sort(),
    [motorcycles]
  );
  const categories = useMemo(
    () => [...new Set(motorcycles.map((m) => m.category))].sort(),
    [motorcycles]
  );
  const years = useMemo(() => {
    const yrs = motorcycles.map((m) => m.year);
    return { min: Math.min(...yrs, new Date().getFullYear()), max: Math.max(...yrs, new Date().getFullYear()) };
  }, [motorcycles]);

  const set = (key: keyof Filters, val: string) => onChange({ ...filters, [key]: val });

  const hasAny = Object.values(filters).some(Boolean);

  return (
    <div className="moto-filters">
      <div className="moto-filters-bar">
        <select value={filters.brand} onChange={(e) => set("brand", e.target.value)}>
          <option value="">{t("filter.brand")}</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select value={filters.category} onChange={(e) => set("category", e.target.value)}>
          <option value="">{t("filter.category")}</option>
          {categories.map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c as MotorcycleCategory] || c}</option>
          ))}
        </select>

        <div className="moto-filter-range">
          <input
            type="number"
            placeholder={t("filter.yearFrom")}
            value={filters.yearFrom}
            onChange={(e) => set("yearFrom", e.target.value)}
            min={years.min}
            max={years.max}
          />
          <span>–</span>
          <input
            type="number"
            placeholder={t("filter.yearTo")}
            value={filters.yearTo}
            onChange={(e) => set("yearTo", e.target.value)}
            min={years.min}
            max={years.max}
          />
        </div>

        <div className="moto-filter-range">
          <input
            type="number"
            placeholder={t("filter.displacementFrom")}
            value={filters.displacementFrom}
            onChange={(e) => set("displacementFrom", e.target.value)}
            min={0}
            step={50}
          />
          <span>–</span>
          <input
            type="number"
            placeholder={t("filter.displacementTo")}
            value={filters.displacementTo}
            onChange={(e) => set("displacementTo", e.target.value)}
            min={0}
            step={50}
          />
        </div>

        <div className="moto-filter-range">
          <input
            type="number"
            placeholder={t("filter.powerFrom")}
            value={filters.powerFrom}
            onChange={(e) => set("powerFrom", e.target.value)}
            min={0}
          />
          <span>–</span>
          <input
            type="number"
            placeholder={t("filter.powerTo")}
            value={filters.powerTo}
            onChange={(e) => set("powerTo", e.target.value)}
            min={0}
          />
        </div>

        <div className="moto-filter-range">
          <input
            type="number"
            placeholder={t("filter.priceFrom")}
            value={filters.priceFrom}
            onChange={(e) => set("priceFrom", e.target.value)}
            min={0}
            step={1000}
          />
          <span>–</span>
          <input
            type="number"
            placeholder={t("filter.priceTo")}
            value={filters.priceTo}
            onChange={(e) => set("priceTo", e.target.value)}
            min={0}
            step={1000}
          />
        </div>

        {hasAny && (
          <button className="btn btn-secondary moto-filter-clear" onClick={() => onChange(emptyFilters)}>
            {t("filter.clear")}
          </button>
        )}
      </div>
    </div>
  );
}
