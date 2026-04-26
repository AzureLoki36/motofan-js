"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CATEGORIES = ["Silnik", "Hamulce", "Zawieszenie", "Elektryka", "Nadwozie", "Układ napędowy", "Układ wydechowy", "Opony i koła", "Akcesoria", "Inne"];

interface FormState {
  name: string;
  description: string;
  brand: string;
  category: string;
  subcategory: string;
  compatibility: string;
  condition: "new" | "used";
  price: string;
  comparePrice: string;
  stock: string;
  sku: string;
  status: "active" | "draft" | "sold_out";
  tags: string;
  weight: string;
  imageUrl: string;
}

const empty: FormState = {
  name: "", description: "", brand: "", category: "", subcategory: "",
  compatibility: "", condition: "new", price: "", comparePrice: "",
  stock: "", sku: "", status: "draft", tags: "", weight: "", imageUrl: "",
};

export function ProductForm({ initial = empty, onSave, saving, error, title }: {
  initial?: FormState;
  onSave: (data: FormState) => void;
  saving: boolean;
  error: string;
  title: string;
}) {
  const [form, setForm] = useState<FormState>(initial);
  const up = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "Outfit, sans-serif", color: "#eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>{title}</h1>
        <Link href="/sklep-online/adm/produkty" style={{ color: "#888", textDecoration: "none", fontSize: "0.85rem" }}>← Wróć do listy</Link>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <section>
          <h2 style={sectionHead}>Podstawowe informacje</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <input required placeholder="Nazwa produktu *" value={form.name} onChange={(e) => up("name", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} />
            <input required placeholder="Marka *" value={form.brand} onChange={(e) => up("brand", e.target.value)} style={inputStyle} />
            <select required value={form.category} onChange={(e) => up("category", e.target.value)} style={inputStyle}>
              <option value="">Kategoria *</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input placeholder="Podkategoria" value={form.subcategory} onChange={(e) => up("subcategory", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} />
            <textarea
              required
              placeholder="Opis produktu *"
              value={form.description}
              onChange={(e) => up("description", e.target.value)}
              rows={5}
              style={{ ...inputStyle, gridColumn: "1 / -1", resize: "vertical" }}
            />
          </div>
        </section>

        <section>
          <h2 style={sectionHead}>Cena i stan magazynowy</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
            <input required type="number" step="0.01" min="0" placeholder="Cena (PLN) *" value={form.price} onChange={(e) => up("price", e.target.value)} style={inputStyle} />
            <input type="number" step="0.01" min="0" placeholder="Cena porównawcza (PLN)" value={form.comparePrice} onChange={(e) => up("comparePrice", e.target.value)} style={inputStyle} />
            <input required type="number" min="0" placeholder="Stan magazynowy *" value={form.stock} onChange={(e) => up("stock", e.target.value)} style={inputStyle} />
            <input placeholder="SKU" value={form.sku} onChange={(e) => up("sku", e.target.value)} style={inputStyle} />
            <input type="number" min="0" placeholder="Waga (gramy)" value={form.weight} onChange={(e) => up("weight", e.target.value)} style={inputStyle} />
            <select value={form.condition} onChange={(e) => up("condition", e.target.value as "new" | "used")} style={inputStyle}>
              <option value="new">Nowe</option>
              <option value="used">Używane</option>
            </select>
          </div>
        </section>

        <section>
          <h2 style={sectionHead}>Kompatybilność i tagi</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input
              placeholder="Modele motocykli (oddziel przecinkami, np. Kawasaki Z900, Kawasaki Z650)"
              value={form.compatibility}
              onChange={(e) => up("compatibility", e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Tagi (oddziel przecinkami)"
              value={form.tags}
              onChange={(e) => up("tags", e.target.value)}
              style={inputStyle}
            />
          </div>
        </section>

        <section>
          <h2 style={sectionHead}>Zdjęcie produktu</h2>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <input
              placeholder="URL zdjęcia (np. https://…/image.jpg)"
              value={form.imageUrl}
              onChange={(e) => up("imageUrl", e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
            {form.imageUrl && (
              <img src={form.imageUrl} alt="" style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover", border: "1px solid #333", background: "#222" }} />
            )}
          </div>
          <div style={{ color: "#666", fontSize: "0.8rem", marginTop: "0.4rem" }}>
            Wgraj zdjęcie osobno przez panel uploadu, a następnie wklej URL tutaj.
          </div>
        </section>

        <section>
          <h2 style={sectionHead}>Status</h2>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {(["draft", "active", "sold_out"] as const).map((s) => (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => up("status", s)} style={{ accentColor: "#f60" }} />
                <span style={{ color: form.status === s ? "#f60" : "#aaa" }}>
                  {s === "active" ? "Aktywny" : s === "draft" ? "Szkic" : "Wyprzedany"}
                </span>
              </label>
            ))}
          </div>
        </section>

        {error && <div style={{ background: "#3a1010", border: "1px solid #f44336", color: "#f66", padding: "0.75rem", borderRadius: 8, fontSize: "0.85rem" }}>{error}</div>}

        <button
          type="submit"
          disabled={saving}
          style={{ background: saving ? "#555" : "#f60", color: "#fff", border: "none", padding: "0.9rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", cursor: saving ? "not-allowed" : "pointer" }}
        >
          {saving ? "Zapisywanie…" : "Zapisz produkt"}
        </button>
      </form>
    </div>
  );
}

export default function NowyProduktPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async (form: FormState) => {
    setSaving(true);
    setError("");
    const res = await fetch("/api/shop/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        brand: form.brand,
        category: form.category,
        subcategory: form.subcategory || undefined,
        compatibility: form.compatibility ? form.compatibility.split(",").map((s) => s.trim()).filter(Boolean) : [],
        condition: form.condition,
        price: parseFloat(form.price),
        comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : undefined,
        stock: parseInt(form.stock),
        sku: form.sku || undefined,
        images: form.imageUrl ? [{ url: form.imageUrl }] : [],
        status: form.status,
        tags: form.tags ? form.tags.split(",").map((s) => s.trim()).filter(Boolean) : [],
        weight: form.weight ? parseInt(form.weight) : undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Błąd"); setSaving(false); return; }
    router.push("/sklep-online/adm/produkty");
  };

  return <ProductForm title="Nowy produkt" onSave={save} saving={saving} error={error} />;
}

const sectionHead: React.CSSProperties = { fontSize: "0.95rem", fontWeight: 700, color: "#f60", marginBottom: "0.75rem", marginTop: 0 };
const inputStyle: React.CSSProperties = { padding: "0.7rem 1rem", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: "0.9rem", outline: "none", width: "100%", boxSizing: "border-box" };
