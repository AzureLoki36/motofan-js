"use client";

import { useCart } from "../components/CartProvider";
import Link from "next/link";

export default function KoszykPage() {
  const { items, remove, update, total, clear } = useCart();

  const shipping = total >= 50000 ? 0 : 1499;
  const orderTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: "4rem auto", textAlign: "center", color: "#888", fontFamily: "Outfit, sans-serif", padding: "0 1.5rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
        <h2 style={{ color: "#eee", fontWeight: 700 }}>Koszyk jest pusty</h2>
        <p style={{ marginBottom: "1.5rem" }}>Dodaj produkty, aby kontynuować zakupy</p>
        <Link href="/sklep-online" style={{ background: "#f60", color: "#fff", padding: "0.75rem 2rem", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>
          Przejdź do sklepu
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem", color: "#eee", fontFamily: "Outfit, sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem" }}>Koszyk</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem" }} className="cart-grid">
        {/* Items list */}
        <div>
          {items.map((item) => (
            <div key={item.productId} style={{ display: "flex", gap: "1rem", padding: "1.25rem", background: "#1a1a1a", borderRadius: 10, border: "1px solid #2a2a2a", marginBottom: "1rem", alignItems: "center" }}>
              <div style={{ width: 80, height: 80, background: "#222", borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                {item.image ? (
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>🔧</div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{item.name}</div>
                <div style={{ color: "#888", fontSize: "0.85rem" }}>{(item.price / 100).toFixed(2).replace(".", ",")} zł / szt.</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #333", borderRadius: 8, overflow: "hidden" }}>
                <button onClick={() => update(item.productId, item.quantity - 1)} style={{ width: 32, height: 36, background: "#222", color: "#fff", border: "none", cursor: "pointer" }}>−</button>
                <span style={{ width: 36, textAlign: "center", fontSize: "0.9rem" }}>{item.quantity}</span>
                <button onClick={() => update(item.productId, item.quantity + 1)} style={{ width: 32, height: 36, background: "#222", color: "#fff", border: "none", cursor: "pointer" }}>+</button>
              </div>
              <div style={{ fontWeight: 700, color: "#f60", minWidth: 80, textAlign: "right" }}>
                {((item.price * item.quantity) / 100).toFixed(2).replace(".", ",")} zł
              </div>
              <button onClick={() => remove(item.productId)} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1.1rem", padding: "0.25rem" }} title="Usuń">
                ✕
              </button>
            </div>
          ))}
          <button onClick={clear} style={{ background: "none", border: "1px solid #444", color: "#888", padding: "0.5rem 1rem", borderRadius: 6, cursor: "pointer", fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Wyczyść koszyk
          </button>
        </div>

        {/* Summary */}
        <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem", height: "fit-content" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem" }}>Podsumowanie</h2>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem", fontSize: "0.9rem" }}>
            <span style={{ color: "#aaa" }}>Produkty</span>
            <span>{(total / 100).toFixed(2).replace(".", ",")} zł</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontSize: "0.9rem" }}>
            <span style={{ color: "#aaa" }}>Dostawa</span>
            <span>{shipping === 0 ? <span style={{ color: "#4caf50" }}>GRATIS</span> : `${(shipping / 100).toFixed(2).replace(".", ",")} zł`}</span>
          </div>
          {shipping > 0 && (
            <div style={{ background: "#1e1e1e", border: "1px solid #333", borderRadius: 6, padding: "0.6rem", fontSize: "0.8rem", color: "#888", marginBottom: "1rem" }}>
              Brakuje {((50000 - total) / 100).toFixed(2).replace(".", ",")} zł do darmowej dostawy
            </div>
          )}
          <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.1rem" }}>
            <span>Razem</span>
            <span style={{ color: "#f60" }}>{(orderTotal / 100).toFixed(2).replace(".", ",")} zł</span>
          </div>
          <Link href="/sklep-online/zamowienie" style={{ display: "block", background: "#f60", color: "#fff", textAlign: "center", padding: "0.9rem", borderRadius: 8, textDecoration: "none", fontWeight: 700, marginTop: "1.25rem", fontSize: "1rem" }}>
            Złóż zamówienie →
          </Link>
          <Link href="/sklep-online" style={{ display: "block", textAlign: "center", color: "#888", textDecoration: "none", fontSize: "0.85rem", marginTop: "0.75rem" }}>
            ← Kontynuuj zakupy
          </Link>
        </div>
      </div>
    </div>
  );
}
