"use client";

import { useState, useRef, useCallback } from "react";
import type { BannerItem } from "@/lib/banner";

interface Props {
  items: BannerItem[];
  onSaved: () => void;
}

const emptyForm = (order: number) => ({
  img: "",
  alt: "",
  brand: "",
  cat: "",
  order,
});

export default function BannerAdmin({ items, onSaved }: Props) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"list" | "form">("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm(items.length));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const sorted = [...items].sort((a, b) => a.order - b.order);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm(items.length));
    setView("form");
  };

  const openEdit = (item: BannerItem) => {
    setEditId(item.id);
    setForm({
      img: item.img,
      alt: item.alt,
      brand: item.brand,
      cat: item.cat,
      order: item.order,
    });
    setView("form");
  };

  const handleSave = async () => {
    if (!form.brand || !form.cat) return;
    setSaving(true);
    try {
      const url = editId ? `/api/banner/${editId}` : "/api/banner";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        onSaved();
        setView("list");
        setEditId(null);
        setForm(emptyForm(items.length));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/banner/${id}`, { method: "DELETE" });
      if (res.ok) {
        onSaved();
        setDeleteConfirm(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", files[0]);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        setForm((prev) => ({ ...prev, img: url }));
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, []);

  const moveItem = async (id: string, direction: -1 | 1) => {
    const idx = sorted.findIndex((i) => i.id === id);
    if (idx === -1) return;
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    setSaving(true);
    try {
      const a = sorted[idx];
      const b = sorted[swapIdx];
      await fetch(`/api/banner/${a.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: b.order }),
      });
      await fetch(`/api/banner/${b.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: a.order }),
      });
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <button className="btn btn-primary moto-admin-trigger" onClick={() => setOpen(true)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        Zarządzaj banerem
      </button>
    );
  }

  return (
    <div className="moto-admin-overlay">
      <div className="moto-admin-panel">
        <div className="moto-admin-header">
          <h2>
            {view === "list"
              ? `Kategorie banera (${sorted.length})`
              : editId
                ? "Edytuj kategorię"
                : "Dodaj kategorię"}
          </h2>
          <div style={{ display: "flex", gap: 8 }}>
            {view === "form" && (
              <button className="btn btn-secondary" onClick={() => { setView("list"); setEditId(null); }}>
                ← Powrót
              </button>
            )}
            <button className="btn btn-secondary" onClick={() => { setOpen(false); setView("list"); }}>
              ✕ Zamknij
            </button>
          </div>
        </div>

        {view === "list" && (
          <>
            <button className="btn btn-primary" onClick={openAdd} style={{ marginBottom: 20 }}>
              + Dodaj kategorię
            </button>
            {sorted.length === 0 && (
              <p style={{ color: "var(--text-m)", textAlign: "center", padding: "40px 0" }}>
                Brak kategorii. Kliknij &quot;Dodaj kategorię&quot; aby dodać pierwszą.
              </p>
            )}
            <div className="moto-admin-list">
              {sorted.map((item, idx) => (
                <div className="moto-admin-item" key={item.id}>
                  <div className="moto-admin-item-img">
                    {item.img ? (
                      <img src={item.img} alt={item.alt} />
                    ) : (
                      <div className="moto-admin-no-img">Brak zdjęcia</div>
                    )}
                  </div>
                  <div className="moto-admin-item-info">
                    <strong>{item.brand}</strong>
                    <span>{item.cat}</span>
                  </div>
                  <div className="banner-admin-order">
                    <button
                      className="btn btn-secondary banner-order-btn"
                      onClick={() => moveItem(item.id, -1)}
                      disabled={idx === 0 || saving}
                      title="Przesuń w górę"
                    >▲</button>
                    <span className="banner-order-num">{idx + 1}</span>
                    <button
                      className="btn btn-secondary banner-order-btn"
                      onClick={() => moveItem(item.id, 1)}
                      disabled={idx === sorted.length - 1 || saving}
                      title="Przesuń w dół"
                    >▼</button>
                  </div>
                  <div className="moto-admin-item-actions">
                    <button className="btn btn-secondary" onClick={() => openEdit(item)}>✏️ Edytuj</button>
                    {deleteConfirm === item.id ? (
                      <div style={{ display: "flex", gap: 4 }}>
                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)} disabled={saving}>
                          Potwierdź
                        </button>
                        <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                          Anuluj
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-danger" onClick={() => setDeleteConfirm(item.id)}>🗑️ Usuń</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "form" && (
          <div className="moto-admin-form">
            <div className="moto-form-grid">
              <label className="moto-form-field">
                <span>Marka / Producent *</span>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                  placeholder="np. AGV, SECA, Nolan"
                  list="banner-brand-suggestions"
                />
                <datalist id="banner-brand-suggestions">
                  {["AGV", "SECA", "Nolan", "Motul", "Dainese", "Alpinestars", "Shoei", "HJC", "Rev'it", "Held"].map((b) => (
                    <option key={b} value={b} />
                  ))}
                </datalist>
              </label>
              <label className="moto-form-field">
                <span>Kategoria / Nazwa *</span>
                <input
                  type="text"
                  value={form.cat}
                  onChange={(e) => setForm((p) => ({ ...p, cat: e.target.value }))}
                  placeholder="np. Kaski sportowe"
                />
              </label>
              <label className="moto-form-field">
                <span>Tekst alternatywny (alt)</span>
                <input
                  type="text"
                  value={form.alt}
                  onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))}
                  placeholder="Opis zdjęcia dla czytelników ekranowych"
                />
              </label>
              <label className="moto-form-field">
                <span>Kolejność</span>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
                  min={0}
                />
              </label>
            </div>

            <div className="moto-form-images" style={{ marginTop: 16 }}>
              <span>Zdjęcie</span>
              <div className="moto-form-images-grid">
                {form.img && (
                  <div className="moto-form-img-preview">
                    <img src={form.img} alt={form.alt || "Podgląd"} />
                    <button type="button" onClick={() => setForm((p) => ({ ...p, img: "" }))} className="moto-form-img-remove">✕</button>
                  </div>
                )}
                {!form.img && (
                  <button
                    type="button"
                    className="moto-form-img-add"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <span className="moto-spinner" />
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        <span>Dodaj zdjęcie</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload(e.target.files)}
              />
              <label className="moto-form-field" style={{ marginTop: 8 }}>
                <span>lub wklej URL zdjęcia</span>
                <input
                  type="url"
                  value={form.img}
                  onChange={(e) => setForm((p) => ({ ...p, img: e.target.value }))}
                  placeholder="https://..."
                />
              </label>
            </div>

            <div className="moto-form-actions">
              <button className="btn btn-secondary" onClick={() => { setView("list"); setEditId(null); }}>
                Anuluj
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving || !form.brand || !form.cat}
              >
                {saving ? "Zapisywanie..." : editId ? "Zapisz zmiany" : "Dodaj kategorię"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
