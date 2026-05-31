"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { Part, PartCategory, PartCondition } from "@/lib/parts";
import { CATEGORY_LABELS, CONDITION_LABELS } from "@/lib/parts";

interface Props {
  parts: Part[];
  onSaved: () => void;
}

const emptyForm = () => ({
  name: "",
  brand: "",
  category: "inne" as PartCategory,
  condition: "stan-db" as PartCondition,
  price: 0,
  description: "",
  fits: "",
  images: [] as string[],
  available: true,
});

export default function PartAdmin({ parts, onSaved }: Props) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"list" | "form">("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Lock body scroll & handle Escape
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeModal = () => { setOpen(false); setView("list"); setEditId(null); setDeleteConfirm(null); };

  const openAdd = () => { setEditId(null); setForm(emptyForm()); setView("form"); };

  const openEdit = (p: Part) => {
    setEditId(p.id);
    setForm({
      name: p.name, brand: p.brand, category: p.category, condition: p.condition,
      price: p.price, description: p.description, fits: p.fits,
      images: [...p.images], available: p.available,
    });
    setView("form");
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const url = editId ? `/api/parts/${editId}` : "/api/parts";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { onSaved(); setView("list"); setEditId(null); setForm(emptyForm()); }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/parts/${id}`, { method: "DELETE" });
      if (res.ok) { onSaved(); setDeleteConfirm(null); }
    } finally { setSaving(false); }
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
    } finally { setUploading(false); if (fileRef.current) fileRef.current.value = ""; }
  }, []);

  const removeImage = (idx: number) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  const onDragStart = (idx: number) => setDragIdx(idx);
  const onDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const imgs = [...form.images];
    const [moved] = imgs.splice(dragIdx, 1);
    imgs.splice(idx, 0, moved);
    setForm((prev) => ({ ...prev, images: imgs }));
    setDragIdx(idx);
  };
  const onDragEnd = () => setDragIdx(null);

  if (!open) {
    return (
      <button className="btn btn-primary moto-admin-trigger" onClick={() => setOpen(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        Zarządzaj częściami
      </button>
    );
  }

  return (
    <div className="moto-admin-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="moto-admin-panel">

        <div className="moto-admin-header">
          <h2>
            {view === "list"
              ? `Części używane (${parts.length})`
              : editId ? "Edytuj część" : "Dodaj część"}
          </h2>
          <div className="moto-admin-header-actions">
            {view === "form" && (
              <button className="btn btn-sm btn-secondary" onClick={() => { setView("list"); setEditId(null); }}>
                ← Wróć
              </button>
            )}
            <button className="btn btn-sm btn-secondary" onClick={closeModal}>✕</button>
          </div>
        </div>

        <div className="moto-admin-body">

          {view === "list" && (
            <>
              <button className="btn btn-primary moto-admin-add-btn" onClick={openAdd}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Dodaj część
              </button>

              {parts.length === 0 && (
                <p style={{ color: "var(--text-m)", textAlign: "center", padding: "40px 0" }}>
                  Brak części. Kliknij &quot;Dodaj część&quot; aby dodać pierwszą.
                </p>
              )}

              <div className="moto-admin-list">
                {parts.map((p) => (
                  <div className="moto-admin-item" key={p.id}>
                    <div className="moto-admin-item-img">
                      {p.images[0]
                        ? <img src={p.images[0]} alt={p.name} />
                        : <div className="moto-admin-no-img">Brak zdjęcia</div>}
                    </div>
                    <div className="moto-admin-item-info">
                      <strong>{p.name}</strong>
                      <span>
                        {p.brand && `${p.brand} · `}
                        {CATEGORY_LABELS[p.category]} · {CONDITION_LABELS[p.condition]} · {p.price.toLocaleString("pl-PL")} zł
                      </span>
                      <span className={`moto-admin-status moto-admin-status--${p.available ? "available" : "sold"}`}>
                        {p.available ? "Dostępna" : "Niedostępna"}
                      </span>
                    </div>
                    <div className="moto-admin-item-actions">
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(p)}>Edytuj</button>
                      {deleteConfirm === p.id ? (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)} disabled={saving}>Potwierdź</button>
                          <button className="btn btn-sm btn-secondary" onClick={() => setDeleteConfirm(null)}>Anuluj</button>
                        </div>
                      ) : (
                        <button className="btn btn-sm btn-danger" onClick={() => setDeleteConfirm(p.id)}>Usuń</button>
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
                <label className="moto-form-field moto-form-field--full">
                  <span>Nazwa części *</span>
                  <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="np. Gaźnik Mikuni VM26" />
                </label>
                <label className="moto-form-field">
                  <span>Marka</span>
                  <input type="text" value={form.brand} onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value }))} placeholder="np. Brembo / Mikuni" />
                </label>
                <label className="moto-form-field">
                  <span>Kategoria</span>
                  <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as PartCategory }))}>
                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </label>
                <label className="moto-form-field">
                  <span>Stan</span>
                  <select value={form.condition} onChange={(e) => setForm((p) => ({ ...p, condition: e.target.value as PartCondition }))}>
                    {Object.entries(CONDITION_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </label>
                <label className="moto-form-field">
                  <span>Cena (zł)</span>
                  <input type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))} min={0} step={5} />
                </label>
                <label className="moto-form-field">
                  <span>Dostępność</span>
                  <select value={form.available ? "1" : "0"} onChange={(e) => setForm((p) => ({ ...p, available: e.target.value === "1" }))}>
                    <option value="1">Dostępna</option>
                    <option value="0">Niedostępna</option>
                  </select>
                </label>
                <label className="moto-form-field moto-form-field--full">
                  <span>Pasuje do</span>
                  <input type="text" value={form.fits} onChange={(e) => setForm((p) => ({ ...p, fits: e.target.value }))} placeholder="np. Skutery 125–200 ccm" />
                </label>
                <label className="moto-form-field moto-form-field--full">
                  <span>Opis</span>
                  <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={3} placeholder="Krótki opis części, stan, zakres serwisu..." />
                </label>
              </div>

              <div>
                <div className="moto-form-images-label">
                  Zdjęcia ({form.images.length}) — przeciągnij aby zmienić kolejność
                </div>
                <div className="moto-form-images-grid">
                  {form.images.map((url, i) => (
                    <div
                      key={url + i}
                      className={`moto-form-img-preview${dragIdx === i ? " moto-form-img-preview--dragging" : ""}`}
                      draggable
                      onDragStart={() => onDragStart(i)}
                      onDragOver={(e) => onDragOver(e, i)}
                      onDragEnd={onDragEnd}
                    >
                      <img src={url} alt={`Zdjęcie ${i + 1}`} />
                      <button type="button" className="moto-form-img-remove" onClick={() => removeImage(i)}>✕</button>
                    </div>
                  ))}
                  <button type="button" className="moto-form-img-add" onClick={() => fileRef.current?.click()} disabled={uploading}>
                    {uploading ? <span className="moto-spinner" /> : (
                      <>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Dodaj
                      </>
                    )}
                  </button>
                </div>
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ display: "none" }} onChange={(e) => handleImageUpload(e.target.files)} />
              </div>

              <div className="moto-form-footer">
                <button className="btn btn-secondary" onClick={() => { setView("list"); setEditId(null); }}>Anuluj</button>
                <button className="btn btn-primary" onClick={handleSave} disabled={saving || !form.name.trim()}>
                  {saving ? <><span className="moto-spinner" /> Zapisywanie…</> : editId ? "Zapisz zmiany" : "Dodaj część"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
