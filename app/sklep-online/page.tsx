"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { PublicProduct } from "@/lib/shop-types";

const CATEGORIES = ["Silnik", "Hamulce", "Zawieszenie", "Elektryka", "Nadwozie", "Układ napędowy", "Układ wydechowy", "Opony i koła", "Akcesoria"];

function ProductCard({ product }: { product: PublicProduct }) {
  const priceStr = (product.price / 100).toFixed(2).replace(".", ",");
  const comparePriceStr = product.comparePrice
    ? (product.comparePrice / 100).toFixed(2).replace(".", ",")
    : null;

  return (
    <Link href={`/sklep-online/produkt/${product.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{
        background: "#1a1a1a",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #2a2a2a",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "#f60";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2a2a";
          (e.currentTarget as HTMLDivElement).style.transform = "none";
        }}
      >
        <div style={{ aspectRatio: "1", background: "#222", position: "relative", overflow: "hidden" }}>
          {product.images[0] ? (
            <img
              src={product.images[0].url}
              alt={product.images[0].alt ?? product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: "2rem" }}>
              🔧
            </div>
          )}
          {product.condition === "used" && (
            <span style={{ position: "absolute", top: 8, left: 8, background: "#ff9900", color: "#000", padding: "0.2rem 0.5rem", borderRadius: 4, fontSize: "0.7rem", fontWeight: 700 }}>
              UŻYWANE
            </span>
          )}
          {product.stock === 0 && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
              BRAK W MAGAZYNIE
            </div>
          )}
        </div>
        <div style={{ padding: "0.9rem" }}>
          <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.3rem" }}>{product.brand} · {product.category}</div>
          <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#eee", lineHeight: 1.3, marginBottom: "0.5rem" }}>{product.name}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span style={{ fontWeight: 700, color: "#f60", fontSize: "1.1rem" }}>{priceStr} zł</span>
            {comparePriceStr && (
              <span style={{ color: "#666", fontSize: "0.85rem", textDecoration: "line-through" }}>{comparePriceStr} zł</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ShopPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "newest";
  const page = parseInt(searchParams.get("page") ?? "1");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category) params.set("category", category);
    params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", "24");

    const res = await fetch(`/api/shop/products?${params}`);
    if (res.ok) {
      const data = await res.json();
      setProducts(data.items);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    }
    setLoading(false);
  }, [search, category, sort, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const navigate = (overrides: Record<string, string>) => {
    const p = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(overrides)) {
      if (v) p.set(k, v); else p.delete(k);
    }
    router.push(`/sklep-online?${p}`);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem", color: "#eee", fontFamily: "Outfit, sans-serif" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", margin: 0 }}>
          Części <span style={{ color: "#f60" }}>Motocyklowe</span>
        </h1>
        <p style={{ color: "#888", marginTop: "0.5rem" }}>Nowe i używane części do motocykli – szybka wysyłka w całej Polsce</p>
      </div>

      {/* Search bar */}
      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ q: search, page: "1" }); }}
        style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Szukaj części, marki, modelu…"
          style={{
            flex: 1, padding: "0.75rem 1rem", borderRadius: 8,
            border: "1px solid #333", background: "#1a1a1a", color: "#eee",
            fontSize: "0.95rem", outline: "none",
          }}
        />
        <button
          type="submit"
          style={{ background: "#f60", color: "#fff", border: "none", padding: "0.75rem 1.5rem", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "0.95rem" }}
        >
          Szukaj
        </button>
      </form>

      {/* Filters row */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate({ category: "", page: "1" })}
            style={{ padding: "0.4rem 1rem", borderRadius: 20, border: "1px solid", borderColor: !category ? "#f60" : "#444", background: !category ? "#f60" : "transparent", color: !category ? "#fff" : "#aaa", cursor: "pointer", fontSize: "0.85rem" }}
          >
            Wszystkie
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => navigate({ category: cat, page: "1" })}
              style={{ padding: "0.4rem 1rem", borderRadius: 20, border: "1px solid", borderColor: category === cat ? "#f60" : "#444", background: category === cat ? "#f60" : "transparent", color: category === cat ? "#fff" : "#aaa", cursor: "pointer", fontSize: "0.85rem" }}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => navigate({ sort: e.target.value, page: "1" })}
          style={{ marginLeft: "auto", padding: "0.4rem 0.75rem", borderRadius: 8, border: "1px solid #444", background: "#1a1a1a", color: "#ccc", cursor: "pointer" }}
        >
          <option value="newest">Najnowsze</option>
          <option value="oldest">Najstarsze</option>
          <option value="price_asc">Cena: rosnąco</option>
          <option value="price_desc">Cena: malejąco</option>
          <option value="name_asc">Nazwa A-Z</option>
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#666" }}>Ładowanie…</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#666" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔧</div>
          <p>Nie znaleziono produktów</p>
        </div>
      ) : (
        <>
          <div style={{ color: "#888", marginBottom: "1rem", fontSize: "0.9rem" }}>
            Znaleziono {total} {total === 1 ? "produkt" : total < 5 ? "produkty" : "produktów"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2.5rem" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => navigate({ page: String(p) })}
                  style={{
                    width: 36, height: 36, borderRadius: 6, border: "1px solid",
                    borderColor: p === page ? "#f60" : "#444",
                    background: p === page ? "#f60" : "transparent",
                    color: p === page ? "#fff" : "#aaa",
                    cursor: "pointer", fontWeight: p === page ? 700 : 400,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "4rem", color: "#666", fontFamily: "Outfit, sans-serif" }}>Ładowanie…</div>}>
      <ShopPageInner />
    </Suspense>
  );
}