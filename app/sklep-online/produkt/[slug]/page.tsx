"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import type { PublicProduct } from "@/lib/shop-types";
import { useCart } from "../../components/CartProvider";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<PublicProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    fetch(`/api/shop/products/${slug}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { setProduct(data); setLoading(false); });
  }, [slug]);

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "#666", fontFamily: "Outfit, sans-serif" }}>
      Ładowanie…
    </div>
  );
  if (!product) return (
    <div style={{ textAlign: "center", padding: "4rem", color: "#888", fontFamily: "Outfit, sans-serif" }}>
      <div style={{ fontSize: "3rem" }}>🔧</div>
      <p>Produkt nie znaleziony</p>
    </div>
  );

  const priceStr = (product.price / 100).toFixed(2).replace(".", ",");
  const comparePriceStr = product.comparePrice
    ? (product.comparePrice / 100).toFixed(2).replace(".", ",") : null;

  const handleAddToCart = () => {
    add({
      productId: product.id,
      quantity: qty,
      price: product.price,
      name: product.name,
      image: product.images[0]?.url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", color: "#eee", fontFamily: "Outfit, sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ color: "#666", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        <a href="/sklep-online" style={{ color: "#f60", textDecoration: "none" }}>Sklep</a>
        {" › "}{product.category}{" › "}<span style={{ color: "#ccc" }}>{product.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="product-detail-grid">
        {/* Images */}
        <div>
          <div style={{ aspectRatio: "1", background: "#1a1a1a", borderRadius: 12, overflow: "hidden", marginBottom: "0.75rem", border: "1px solid #2a2a2a" }}>
            {product.images[activeImage] ? (
              <img
                src={product.images[activeImage].url}
                alt={product.images[activeImage].alt ?? product.name}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: "4rem" }}>🔧</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  style={{
                    width: 64, height: 64, borderRadius: 8, overflow: "hidden",
                    border: `2px solid ${i === activeImage ? "#f60" : "#333"}`,
                    padding: 0, cursor: "pointer", background: "#1a1a1a",
                  }}
                >
                  <img src={img.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: 1 }}>
            {product.brand} · {product.category}
            {product.condition === "used" && <span style={{ background: "#ff9900", color: "#000", padding: "0.1rem 0.4rem", borderRadius: 4, marginLeft: "0.5rem", fontSize: "0.7rem", fontWeight: 700 }}>UŻYWANE</span>}
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", margin: "0 0 1rem" }}>{product.name}</h1>

          <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "2rem", fontWeight: 800, color: "#f60" }}>{priceStr} zł</span>
            {comparePriceStr && (
              <span style={{ color: "#666", fontSize: "1.1rem", textDecoration: "line-through" }}>{comparePriceStr} zł</span>
            )}
          </div>

          {product.compatibility.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ color: "#888", fontSize: "0.85rem", marginBottom: "0.4rem" }}>Pasuje do:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {product.compatibility.map((c) => (
                  <span key={c} style={{ background: "#222", color: "#ccc", padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.8rem", border: "1px solid #333" }}>{c}</span>
                ))}
              </div>
            </div>
          )}

          {product.sku && (
            <div style={{ color: "#666", fontSize: "0.8rem", marginBottom: "0.75rem" }}>SKU: {product.sku}</div>
          )}

          <div style={{ color: product.stock > 0 ? "#4caf50" : "#f44336", fontSize: "0.9rem", fontWeight: 600, marginBottom: "1.5rem" }}>
            {product.stock > 5 ? "✓ W magazynie" : product.stock > 0 ? `✓ Ostatnie ${product.stock} szt.` : "✗ Brak w magazynie"}
          </div>

          {/* Add to cart */}
          {product.stock > 0 && (
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #444", borderRadius: 8, overflow: "hidden" }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 36, height: 44, background: "#222", color: "#fff", border: "none", cursor: "pointer", fontSize: "1.1rem" }}>−</button>
                <span style={{ width: 44, textAlign: "center", fontSize: "0.95rem" }}>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} style={{ width: 36, height: 44, background: "#222", color: "#fff", border: "none", cursor: "pointer", fontSize: "1.1rem" }}>+</button>
              </div>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1, background: added ? "#4caf50" : "#f60", color: "#fff",
                  border: "none", borderRadius: 8, fontWeight: 700, fontSize: "0.95rem",
                  cursor: "pointer", transition: "background 0.3s",
                }}
              >
                {added ? "✓ Dodano do koszyka" : "Dodaj do koszyka"}
              </button>
            </div>
          )}

          <a href="/sklep-online/koszyk" style={{ display: "block", textAlign: "center", background: "#222", color: "#ccc", padding: "0.65rem", borderRadius: 8, textDecoration: "none", fontSize: "0.9rem", border: "1px solid #333" }}>
            🛒 Przejdź do koszyka
          </a>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div style={{ marginTop: "3rem", borderTop: "1px solid #2a2a2a", paddingTop: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>Opis produktu</h2>
          <div style={{ color: "#bbb", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{product.description}</div>
        </div>
      )}

      {product.tags.length > 0 && (
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {product.tags.map((tag) => (
            <span key={tag} style={{ background: "#1a1a1a", color: "#888", padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.8rem", border: "1px solid #2a2a2a" }}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
