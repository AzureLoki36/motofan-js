"use client";

import { useState, useRef, useCallback } from "react";
import type { Motorcycle, MotorcycleType, MotorcycleStatus, MotorcycleCategory } from "@/lib/motorcycles";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/lib/motorcycles";

interface Props {
  motoType: MotorcycleType;
  motorcycles: Motorcycle[];
  onSaved: () => void;
}

const emptyForm = (type: MotorcycleType) => ({
  type,
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  mileage: type === "nowe" ? 0 : 0,
  displacement: 0,
  power: 0,
  price: 0,
  description: "",
  status: "available" as MotorcycleStatus,
  category: "naked" as MotorcycleCategory,
  images: [] as string[],
});

export default function MotorcycleAdmin({ motoType, motorcycles, onSaved }: Props) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"list" | "form">("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm(motoType));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = motorcycles.filter((m) => m.type === motoType);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm(motoType));
    setView("form");
  };

  const openEdit = (m: Motorcycle) => {
    setEditId(m.id);
    setForm({
      type: m.type,
      brand: m.brand,
      model: m.model,
      year: m.year,
      mileage: m.mileage,
      displacement: m.displacement,
      power: m.power,
      price: m.price,
      description: m.description,
      status: m.status,
      category: m.category,
      images: [...m.images],
    });
    setView("form");
  };

  const handleSave = async () => {
    if (!form.brand || !form.model) return;
    setSaving(true);
    try {
      const url = editId ? `/api/motorcycles/${editId}` : "/api/motorcycles";
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
        setForm(emptyForm(motoType));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/motorcycles/${id}`, { method: "DELETE" });
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
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData();
        fd.append("file", files[i]);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (res.ok) {
          const { url } = await res.json();
          setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
        }
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }, []);

  const removeImage = (idx: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  if (!open) {
    return (
      <button className="btn btn-primary moto-admin-trigger" onClick={() => setOpen(true)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        Zarządzaj motocyklami
      </button>
    );
  }

  return (
    <div className="moto-admin-overlay">
      <div className="moto-admin-panel">
        <div className="moto-admin-header">
          <h2>
            {view === "list"
              ? `Motocykle ${motoType === "nowe" ? "nowe" : "używane"} (${filtered.length})`
              : editId
                ? "Edytuj motocykl"
                : "Dodaj motocykl"}
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
              + Dodaj motocykl
            </button>
            {filtered.length === 0 && (
              <p style={{ color: "var(--text-m)", textAlign: "center", padding: "40px 0" }}>
                Brak motocykli. Kliknij &quot;Dodaj motocykl&quot; aby dodać pierwszy.
              </p>
            )}
            <div className="moto-admin-list">
              {filtered.map((m) => (
                <div className="moto-admin-item" key={m.id}>
                  <div className="moto-admin-item-img">
                    {m.images[0] ? (
                      <img src={m.images[0]} alt={`${m.brand} ${m.model}`} />
                    ) : (
                      <div className="moto-admin-no-img">Brak zdjęcia</div>
                    )}
                  </div>
                  <div className="moto-admin-item-info">
                    <strong>{m.brand} {m.model}</strong>
                    <span>{m.year} • {m.displacement} cm³ • {m.power} KM • {m.price.toLocaleString("pl-PL")} zł</span>
                    <span className={`moto-admin-status moto-admin-status--${m.status}`}>
                      {STATUS_LABELS[m.status]}
                    </span>
                  </div>
                  <div className="moto-admin-item-actions">
                    <button className="btn btn-secondary" onClick={() => openEdit(m)}>✏️ Edytuj</button>
                    {deleteConfirm === m.id ? (
                      <div style={{ display: "flex", gap: 4 }}>
                        <button className="btn btn-danger" onClick={() => handleDelete(m.id)} disabled={saving}>
                          Potwierdź
                        </button>
                        <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                          Anuluj
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-danger" onClick={() => setDeleteConfirm(m.id)}>🗑️ Usuń</button>
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
                <span>Marka *</span>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))}
                  placeholder="np. Kawasaki"
                  list="brand-suggestions"
                />
                <datalist id="brand-suggestions">
                  {["Kawasaki", "Benelli", "Kymco", "Yamaha", "Honda", "Suzuki", "BMW", "KTM", "Ducati", "Harley-Davidson"].map((b) => (
                    <option key={b} value={b} />
                  ))}
                </datalist>
              </label>
              <label className="moto-form-field">
                <span>Model *</span>
                <input
                  type="text"
                  value={form.model}
                  onChange={(e) => setForm((p) => ({ ...p, model: e.target.value }))}
                  placeholder="np. Z650"
                />
              </label>
              <label className="moto-form-field">
                <span>Typ</span>
                <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as MotorcycleType }))}>
                  <option value="nowe">Nowy</option>
                  <option value="uzywane">Używany</option>
                </select>
              </label>
              <label className="moto-form-field">
                <span>Kategoria</span>
                <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as MotorcycleCategory }))}>
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </label>
              <label className="moto-form-field">
                <span>Status</span>
                <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as MotorcycleStatus }))}>
                  {Object.entries(STATUS_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </label>
              <label className="moto-form-field">
                <span>Rok produkcji</span>
                <input type="number" value={form.year} onChange={(e) => setForm((p) => ({ ...p, year: Number(e.target.value) }))} min={1990} max={2030} />
              </label>
              <label className="moto-form-field">
                <span>Przebieg (km)</span>
                <input type="number" value={form.mileage} onChange={(e) => setForm((p) => ({ ...p, mileage: Number(e.target.value) }))} min={0} />
              </label>
              <label className="moto-form-field">
                <span>Pojemność (cm³)</span>
                <input type="number" value={form.displacement} onChange={(e) => setForm((p) => ({ ...p, displacement: Number(e.target.value) }))} min={0} />
              </label>
              <label className="moto-form-field">
                <span>Moc (KM)</span>
                <input type="number" value={form.power} onChange={(e) => setForm((p) => ({ ...p, power: Number(e.target.value) }))} min={0} step="0.5" />
              </label>
              <label className="moto-form-field">
                <span>Cena (zł)</span>
                <input type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))} min={0} step={100} />
              </label>
            </div>

            <label className="moto-form-field" style={{ marginTop: 16 }}>
              <span>Opis</span>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={3}
                placeholder="Opis motocykla..."
              />
            </label>

            <div className="moto-form-images">
              <span>Zdjęcia ({form.images.length})</span>
              <div className="moto-form-images-grid">
                {form.images.map((url, i) => (
                  <div key={i} className="moto-form-img-preview">
                    <img src={url} alt={`Zdjęcie ${i + 1}`} />
                    <button type="button" onClick={() => removeImage(i)} className="moto-form-img-remove">✕</button>
                  </div>
                ))}
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
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload(e.target.files)}
              />
            </div>

            <div className="moto-form-actions">
              <button className="btn btn-secondary" onClick={() => { setView("list"); setEditId(null); }}>
                Anuluj
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving || !form.brand || !form.model}
              >
                {saving ? "Zapisywanie..." : editId ? "Zapisz zmiany" : "Dodaj motocykl"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
