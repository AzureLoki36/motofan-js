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

const CATEGORY_ICONS: Record<string, string> = {
  naked: "🏍️",
  sport: "🏁",
  touring: "🗺️",
  cruiser: "🛣️",
  skuter: "🛵",
  enduro: "🌲",
  inne: "⚙️",
};

interface Props {
  motorcycles: Motorcycle[];
  filters: Filters;
  onChange: (f: Filters) => void;
  t: (key: string) => string;
}

export default function MotorcycleFilters({ motorcycles, filters, onChange, t }: Props) {
  const [expanded, setExpanded] = useState(false);

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
  const activeCount = Object.values(filters).filter(Boolean).length;

  const inp: React.CSSProperties = {
    background: "var(--bg)",
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius-md)",
    padding: "10px 14px",
    color: "var(--text)",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.88rem",
    outline: "none",
    width: "100%",
    transition: "var(--tr)",
  };

  return (
    <div className="mf-filters">
      {/* ── Category chips ── */}
      {categories.length > 0 && (
        <div className="mf-categories">
          <button
            className={`mf-chip${!filters.category ? " mf-chip--active" : ""}`}
            onClick={() => set("category", "")}
          >
            Wszystkie
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`mf-chip${filters.category === c ? " mf-chip--active" : ""}`}
              onClick={() => set("category", filters.category === c ? "" : c)}
            >
              <span>{CATEGORY_ICONS[c] ?? "🏍️"}</span>
              {CATEGORY_LABELS[c] || c}
            </button>
          ))}
        </div>
      )}

      {/* ── Brand + advanced toggle bar ── */}
      <div className="mf-bar">
        {/* Brand pills */}
        {brands.length > 0 && (
          <div className="mf-brands">
            {brands.map((b) => (
              <button
                key={b}
                className={`mf-brand-pill${filters.brand === b ? " mf-brand-pill--active" : ""}`}
                onClick={() => set("brand", filters.brand === b ? "" : b)}
              >
                {b}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 10, marginLeft: "auto", alignItems: "center", flexShrink: 0 }}>
          {hasAny && (
            <button className="mf-clear-btn" onClick={() => onChange(emptyFilters)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Wyczyść{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
          )}
          <button
            className={`mf-advanced-btn${expanded ? " mf-advanced-btn--open" : ""}`}
            onClick={() => setExpanded(!expanded)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            Filtry zaawansowane
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "none" }}><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </div>

      {/* ── Advanced panel ── */}
      {expanded && (
        <div className="mf-advanced">
          <div className="mf-advanced-grid">
            <div className="mf-field">
              <label className="mf-label">Rok produkcji</label>
              <div className="mf-range">
                <input style={inp} type="number" placeholder="Od" value={filters.yearFrom} onChange={(e) => set("yearFrom", e.target.value)} />
                <span className="mf-dash">—</span>
                <input style={inp} type="number" placeholder="Do" value={filters.yearTo} onChange={(e) => set("yearTo", e.target.value)} />
              </div>
            </div>
            <div className="mf-field">
              <label className="mf-label">Cena (zł)</label>
              <div className="mf-range">
                <input style={inp} type="number" placeholder="Od" value={filters.priceFrom} onChange={(e) => set("priceFrom", e.target.value)} step={1000} />
                <span className="mf-dash">—</span>
                <input style={inp} type="number" placeholder="Do" value={filters.priceTo} onChange={(e) => set("priceTo", e.target.value)} step={1000} />
              </div>
            </div>
            <div className="mf-field">
              <label className="mf-label">Pojemność (ccm)</label>
              <div className="mf-range">
                <input style={inp} type="number" placeholder="Od" value={filters.displacementFrom} onChange={(e) => set("displacementFrom", e.target.value)} step={50} />
                <span className="mf-dash">—</span>
                <input style={inp} type="number" placeholder="Do" value={filters.displacementTo} onChange={(e) => set("displacementTo", e.target.value)} step={50} />
              </div>
            </div>
            <div className="mf-field">
              <label className="mf-label">Moc (KM)</label>
              <div className="mf-range">
                <input style={inp} type="number" placeholder="Od" value={filters.powerFrom} onChange={(e) => set("powerFrom", e.target.value)} />
                <span className="mf-dash">—</span>
                <input style={inp} type="number" placeholder="Do" value={filters.powerTo} onChange={(e) => set("powerTo", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
