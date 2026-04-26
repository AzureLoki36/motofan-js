"use client";

import { useEffect, useState } from "react";
import type { PublicUser, Order } from "@/lib/shop-types";
import Link from "next/link";

const STATUS_LABELS: Record<string, string> = {
  pending: "Oczekuje",
  awaiting_payment: "Czeka na płatność",
  paid: "Opłacone",
  processing: "W realizacji",
  shipped: "Wysłane",
  delivered: "Dostarczone",
  cancelled: "Anulowane",
  refunded: "Zwrócone",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#888",
  awaiting_payment: "#ff9900",
  paid: "#4caf50",
  processing: "#2196f3",
  shipped: "#9c27b0",
  delivered: "#4caf50",
  cancelled: "#f44336",
  refunded: "#f44336",
};

export default function KontoPage() {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/shop/auth/me").then((r) => r.ok ? r.json() : null),
      fetch("/api/shop/orders").then((r) => r.ok ? r.json() : []),
    ]).then(([u, o]) => {
      setUser(u);
      setOrders(Array.isArray(o) ? o.sort((a: Order, b: Order) => b.createdAt.localeCompare(a.createdAt)) : []);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div style={{ textAlign: "center", padding: "4rem", color: "#666", fontFamily: "Outfit, sans-serif" }}>Ładowanie…</div>
  );

  if (!user) return (
    <div style={{ textAlign: "center", padding: "4rem", color: "#888", fontFamily: "Outfit, sans-serif" }}>
      <p>Musisz być zalogowany. <a href="/sklep-online/login" style={{ color: "#f60" }}>Zaloguj się</a></p>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem", color: "#eee", fontFamily: "Outfit, sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem" }}>Moje konto</h1>

      {/* Profile card */}
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: 56, height: 56, background: "#f60", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{user.firstName} {user.lastName}</div>
            <div style={{ color: "#888", fontSize: "0.9rem" }}>{user.email}</div>
            {user.phone && <div style={{ color: "#888", fontSize: "0.9rem" }}>{user.phone}</div>}
          </div>
          <div style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#555", background: "#222", padding: "0.3rem 0.75rem", borderRadius: 20, border: "1px solid #333" }}>
            {user.role === "admin" ? "Administrator" : "Klient"}
          </div>
        </div>
      </div>

      {/* Orders */}
      <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>Historia zamówień</h2>
      {orders.length === 0 ? (
        <div style={{ color: "#666", textAlign: "center", padding: "2rem" }}>
          Brak zamówień. <Link href="/sklep-online" style={{ color: "#f60" }}>Zacznij zakupy</Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.25rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <span style={{ fontWeight: 700, color: "#f60" }}>{order.orderNumber}</span>
                  <span style={{ color: "#666", fontSize: "0.85rem", marginLeft: "1rem" }}>
                    {new Date(order.createdAt).toLocaleDateString("pl-PL")}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span style={{ background: STATUS_COLORS[order.status] + "22", color: STATUS_COLORS[order.status], padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                {order.items.map((item) => (
                  <div key={item.productId} style={{ fontSize: "0.85rem", color: "#bbb" }}>
                    {item.name} × {item.quantity}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#888", fontSize: "0.85rem" }}>
                  {order.items.reduce((s, i) => s + i.quantity, 0)} szt. · {order.paymentMethod}
                </span>
                <span style={{ fontWeight: 700, color: "#f60" }}>{(order.total / 100).toFixed(2).replace(".", ",")} zł</span>
              </div>
              {order.trackingNumber && (
                <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#888" }}>
                  Numer śledzenia: <strong style={{ color: "#ccc" }}>{order.trackingNumber}</strong>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
