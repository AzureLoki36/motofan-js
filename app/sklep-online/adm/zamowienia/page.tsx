"use client";

import { useEffect, useState } from "react";
import type { Order } from "@/lib/shop-types";
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
  pending: "#888", awaiting_payment: "#ff9900", paid: "#4caf50",
  processing: "#2196f3", shipped: "#9c27b0", delivered: "#4caf50",
  cancelled: "#f44336", refunded: "#f44336",
};

export default function AdmZamowieniaPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const load = () => {
    setLoading(true);
    fetch("/api/shop/orders")
      .then((r) => r.ok ? r.json() : [])
      .then((d) => {
        setOrders(Array.isArray(d) ? d.sort((a: Order, b: Order) => b.createdAt.localeCompare(a.createdAt)) : []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await fetch(`/api/shop/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    load();
  };

  const updateTracking = async (id: string, trackingNumber: string) => {
    await fetch(`/api/shop/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackingNumber, status: "shipped" }),
    });
    load();
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "Outfit, sans-serif", color: "#eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Zamówienia</h1>
        <Link href="/sklep-online/adm" style={{ color: "#888", textDecoration: "none", fontSize: "0.85rem" }}>← Panel główny</Link>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {["all", "pending", "awaiting_payment", "paid", "processing", "shipped", "delivered", "cancelled"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: "0.35rem 0.9rem", borderRadius: 20, border: "1px solid",
            borderColor: filter === s ? "#f60" : "#444",
            background: filter === s ? "#f60" : "transparent",
            color: filter === s ? "#fff" : "#aaa",
            cursor: "pointer", fontSize: "0.82rem",
          }}>
            {s === "all" ? "Wszystkie" : STATUS_LABELS[s] ?? s}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Ładowanie…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#666" }}>Brak zamówień</div>
      ) : (
        filtered.map((order) => (
          <div key={order.id} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.25rem", marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div>
                <span style={{ fontWeight: 700, color: "#f60", fontSize: "1rem" }}>{order.orderNumber}</span>
                <span style={{ color: "#666", fontSize: "0.85rem", marginLeft: "1rem" }}>
                  {new Date(order.createdAt).toLocaleString("pl-PL")}
                </span>
              </div>
              <span style={{ background: STATUS_COLORS[order.status] + "22", color: STATUS_COLORS[order.status], padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>
                {STATUS_LABELS[order.status] ?? order.status}
              </span>
            </div>

            <div style={{ fontSize: "0.85rem", color: "#bbb", marginBottom: "0.6rem" }}>
              {order.guestEmail ?? order.userId ?? "—"} · {order.paymentMethod} ·{" "}
              <span style={{ color: order.paymentStatus === "paid" ? "#4caf50" : "#888" }}>
                {order.paymentStatus === "paid" ? "Opłacone" : order.paymentStatus}
              </span>
            </div>

            <div style={{ fontSize: "0.85rem", color: "#aaa", marginBottom: "0.75rem" }}>
              {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
              <span style={{ fontWeight: 700, color: "#f60" }}>{(order.total / 100).toFixed(2).replace(".", ",")} zł</span>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                {/* Status changer */}
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  disabled={updating === order.id}
                  style={{ padding: "0.3rem 0.6rem", borderRadius: 6, border: "1px solid #444", background: "#222", color: "#ccc", fontSize: "0.82rem", cursor: "pointer" }}
                >
                  {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>

                {/* Tracking */}
                <TrackingInput orderId={order.id} current={order.trackingNumber} onSave={updateTracking} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function TrackingInput({ orderId, current, onSave }: { orderId: string; current?: string; onSave: (id: string, t: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(current ?? "");

  if (!editing) {
    return (
      <button onClick={() => setEditing(true)} style={{ background: "#222", color: "#aaa", border: "1px solid #444", padding: "0.3rem 0.6rem", borderRadius: 6, cursor: "pointer", fontSize: "0.82rem" }}>
        {current ? `📦 ${current}` : "+ Numer śledzenia"}
      </button>
    );
  }

  return (
    <div style={{ display: "flex", gap: "0.4rem" }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Numer śledzenia" style={{ padding: "0.3rem 0.6rem", borderRadius: 6, border: "1px solid #555", background: "#1a1a1a", color: "#eee", fontSize: "0.82rem", outline: "none" }} />
      <button onClick={() => { onSave(orderId, value); setEditing(false); }} style={{ background: "#f60", color: "#fff", border: "none", padding: "0.3rem 0.6rem", borderRadius: 6, cursor: "pointer", fontSize: "0.82rem" }}>OK</button>
      <button onClick={() => setEditing(false)} style={{ background: "#333", color: "#aaa", border: "none", padding: "0.3rem 0.6rem", borderRadius: 6, cursor: "pointer", fontSize: "0.82rem" }}>✕</button>
    </div>
  );
}
