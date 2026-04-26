"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PublicProduct } from "@/lib/shop-types";

const STATUS_LABELS: Record<string, string> = { active: "Aktywny", draft: "Szkic", sold_out: "Wyprzedany" };
const STATUS_COLORS: Record<string, string> = { active: "#4caf50", draft: "#888", sold_out: "#f44336" };

export default function AdmProduktyPage() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/shop/products?limit=1000")
      .then((r) => r.json())
      .then((d) => { setProducts(d.items ?? []); setLoading(false); });
  };

  useEffect(load, []);

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Usunąć produkt "${name}"?`)) return;
    setDeleting(id);
    await fetch(`/api/shop/products/${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  };

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "Outfit, sans-serif", color: "#eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Produkty</h1>
        <Link href="/sklep-online/adm/produkty/nowy" style={{ background: "#f60", color: "#fff", padding: "0.5rem 1.2rem", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>
          + Nowy produkt
        </Link>
      </div>

      <input
        placeholder="Szukaj produktów…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "0.6rem 1rem", borderRadius: 8, border: "1px solid #333", background: "#1a1a1a", color: "#eee", fontSize: "0.9rem", marginBottom: "1.5rem", width: "100%", boxSizing: "border-box", outline: "none" }}
      />

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Ładowanie…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Brak produktów</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2a2a2a", color: "#888" }}>
                <th style={{ textAlign: "left", padding: "0.6rem 0.75rem", fontWeight: 600 }}>Produkt</th>
                <th style={{ textAlign: "left", padding: "0.6rem 0.75rem", fontWeight: 600 }}>Marka</th>
                <th style={{ textAlign: "left", padding: "0.6rem 0.75rem", fontWeight: 600 }}>Kategoria</th>
                <th style={{ textAlign: "right", padding: "0.6rem 0.75rem", fontWeight: 600 }}>Cena</th>
                <th style={{ textAlign: "right", padding: "0.6rem 0.75rem", fontWeight: 600 }}>Stan</th>
                <th style={{ textAlign: "center", padding: "0.6rem 0.75rem", fontWeight: 600 }}>Status</th>
                <th style={{ textAlign: "center", padding: "0.6rem 0.75rem", fontWeight: 600 }}>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <td style={{ padding: "0.75rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    {p.images[0] && (
                      <img src={p.images[0].url} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover", background: "#222" }} />
                    )}
                    <span style={{ color: "#eee" }}>{p.name}</span>
                  </td>
                  <td style={{ padding: "0.75rem", color: "#aaa" }}>{p.brand}</td>
                  <td style={{ padding: "0.75rem", color: "#aaa" }}>{p.category}</td>
                  <td style={{ padding: "0.75rem", textAlign: "right", color: "#f60", fontWeight: 600 }}>
                    {(p.price / 100).toFixed(2).replace(".", ",")} zł
                  </td>
                  <td style={{ padding: "0.75rem", textAlign: "right", color: p.stock === 0 ? "#f44336" : "#eee" }}>{p.stock}</td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>
                    <span style={{ background: STATUS_COLORS[p.status] + "22", color: STATUS_COLORS[p.status], padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600 }}>
                      {STATUS_LABELS[p.status] ?? p.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>
                    <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center" }}>
                      <Link href={`/sklep-online/adm/produkty/${p.id}`} style={{ background: "#2a2a2a", color: "#ccc", padding: "0.3rem 0.6rem", borderRadius: 6, textDecoration: "none", fontSize: "0.8rem" }}>Edytuj</Link>
                      <button
                        onClick={() => deleteProduct(p.id, p.name)}
                        disabled={deleting === p.id}
                        style={{ background: "#3a1010", color: "#f66", border: "none", padding: "0.3rem 0.6rem", borderRadius: 6, cursor: "pointer", fontSize: "0.8rem" }}
                      >
                        {deleting === p.id ? "…" : "Usuń"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <Link href="/sklep-online/adm" style={{ color: "#888", textDecoration: "none", fontSize: "0.85rem" }}>← Panel główny</Link>
      </div>
    </div>
  );
}
