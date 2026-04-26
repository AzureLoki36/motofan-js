"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const CATEGORIES = ["Silnik", "Hamulce", "Zawieszenie", "Elektryka", "Nadwozie", "Układ napędowy", "Układ wydechowy", "Opony i koła", "Akcesoria", "Inne"];

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/shop/products/${id}`)
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { setProduct(d); setLoading(false); });
  }, [id]);

  if (loading) return <div style={{ textAlign: "center", padding: "4rem", color: "#666", fontFamily: "Outfit, sans-serif" }}>Ładowanie…</div>;
  if (!product) return <div style={{ textAlign: "center", padding: "4rem", color: "#888", fontFamily: "Outfit, sans-serif" }}>Produkt nie znaleziony</div>;

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {};
    fd.forEach((v, k) => { body[k] = v; });

    // Parse number fields
    body.price = parseFloat(body.price as string);
    body.comparePrice = body.comparePrice ? parseFloat(body.comparePrice as string) : undefined;
    body.stock = parseInt(body.stock as string);
    body.weight = body.weight ? parseInt(body.weight as string) : undefined;
    body.compatibility = (body.compatibility as string).split(",").map((s: string) => s.trim()).filter(Boolean);
    body.tags = (body.tags as string).split(",").map((s: string) => s.trim()).filter(Boolean);
    const imageUrl = body.imageUrl as string;
    body.images = imageUrl ? [{ url: imageUrl }] : product.images ?? [];
    delete body.imageUrl;

    const res = await fetch(`/api/shop/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Błąd"); setSaving(false); return; }
    router.push("/sklep-online/adm/produkty");
  };

  const p = product;
  const imgs = (p.images as Array<{ url: string }>) ?? [];
  const compat = Array.isArray(p.compatibility) ? (p.compatibility as string[]).join(", ") : "";
  const tags = Array.isArray(p.tags) ? (p.tags as string[]).join(", ") : "";

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "Outfit, sans-serif", color: "#eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Edytuj produkt</h1>
        <Link href="/sklep-online/adm/produkty" style={{ color: "#888", textDecoration: "none", fontSize: "0.85rem" }}>← Wróć do listy</Link>
      </div>

      <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input name="name" required defaultValue={p.name as string} placeholder="Nazwa *" style={inputStyle} />
        <input name="brand" required defaultValue={p.brand as string} placeholder="Marka *" style={inputStyle} />
        <select name="category" required defaultValue={p.category as string} style={inputStyle}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <textarea name="description" required defaultValue={p.description as string} placeholder="Opis *" rows={5} style={{ ...inputStyle, resize: "vertical" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
          <input name="price" type="number" step="0.01" min="0" required defaultValue={((p.price as number) / 100).toFixed(2)} placeholder="Cena (PLN) *" style={inputStyle} />
          <input name="comparePrice" type="number" step="0.01" min="0" defaultValue={p.comparePrice ? ((p.comparePrice as number) / 100).toFixed(2) : ""} placeholder="Cena porównawcza" style={inputStyle} />
          <input name="stock" type="number" min="0" required defaultValue={p.stock as number} placeholder="Stan magazynowy *" style={inputStyle} />
        </div>
        <input name="sku" defaultValue={p.sku as string ?? ""} placeholder="SKU" style={inputStyle} />
        <input name="compatibility" defaultValue={compat} placeholder="Modele (oddziel przecinkami)" style={inputStyle} />
        <input name="tags" defaultValue={tags} placeholder="Tagi (oddziel przecinkami)" style={inputStyle} />
        <input name="imageUrl" defaultValue={imgs[0]?.url ?? ""} placeholder="URL zdjęcia" style={inputStyle} />
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <select name="condition" defaultValue={p.condition as string} style={inputStyle}>
            <option value="new">Nowe</option>
            <option value="used">Używane</option>
          </select>
          <select name="status" defaultValue={p.status as string} style={inputStyle}>
            <option value="active">Aktywny</option>
            <option value="draft">Szkic</option>
            <option value="sold_out">Wyprzedany</option>
          </select>
        </div>

        {error && <div style={{ background: "#3a1010", border: "1px solid #f44336", color: "#f66", padding: "0.75rem", borderRadius: 8, fontSize: "0.85rem" }}>{error}</div>}

        <button type="submit" disabled={saving} style={{ background: saving ? "#555" : "#f60", color: "#fff", border: "none", padding: "0.9rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", cursor: saving ? "not-allowed" : "pointer" }}>
          {saving ? "Zapisywanie…" : "Zapisz zmiany"}
        </button>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = { padding: "0.7rem 1rem", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: "0.9rem", outline: "none", width: "100%", boxSizing: "border-box" };
