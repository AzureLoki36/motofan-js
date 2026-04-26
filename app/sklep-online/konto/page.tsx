"use client";

import { useEffect, useState } from "react";
import type { PublicUser, Order, Address } from "@/lib/shop-types";
import Link from "next/link";
import KartySection from "./KartySection";

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

const COUNTRIES: Record<string, string> = {
  PL: "Polska", DE: "Niemcy", CZ: "Czechy", SK: "Słowacja", AT: "Austria",
};

type Tab = "zamowienia" | "adresy" | "konto";

const newEmptyAddr = (): Omit<Address, "id"> => ({
  label: "", firstName: "", lastName: "", street: "",
  city: "", postalCode: "", country: "PL", isDefault: false,
});

const inputSt: React.CSSProperties = {
  padding: "0.65rem 1rem", borderRadius: 8, border: "1px solid #333",
  background: "#141414", color: "#eee", fontSize: "0.9rem", outline: "none",
  width: "100%", boxSizing: "border-box",
};

export default function KontoPage() {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("zamowienia");

  // address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addrForm, setAddrForm] = useState<(Omit<Address, "id"> & { id?: string }) | null>(null);
  const [addrSaving, setAddrSaving] = useState(false);
  const [addrMsg, setAddrMsg] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/shop/auth/me").then((r) => r.ok ? r.json() : null),
      fetch("/api/shop/orders").then((r) => r.ok ? r.json() : []),
    ]).then(([u, o]) => {
      setUser(u);
      if (u) setAddresses(u.addresses ?? []);
      setOrders(Array.isArray(o) ? o.sort((a: Order, b: Order) => b.createdAt.localeCompare(a.createdAt)) : []);
      setLoading(false);
    });
  }, []);

  const saveAddrs = async (newAddrs: Address[]) => {
    setAddrSaving(true); setAddrMsg("");
    try {
      const res = await fetch("/api/shop/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresses: newAddrs }),
      });
      if (res.ok) {
        const updated: PublicUser = await res.json();
        setAddresses(updated.addresses ?? []);
        setUser(updated);
        setAddrMsg("Zapisano!");
        setTimeout(() => setAddrMsg(""), 3000);
        setAddrForm(null);
      } else {
        setAddrMsg("Błąd zapisu adresu.");
      }
    } catch { setAddrMsg("Błąd połączenia."); }
    setAddrSaving(false);
  };

  const submitAddr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrForm) return;
    const isEdit = !!addrForm.id;
    let newAddrs: Address[];
    if (isEdit) {
      newAddrs = addresses.map((a) => a.id === addrForm.id ? { ...addrForm, id: a.id } as Address : a);
    } else {
      const newId = Date.now().toString(36) + Math.random().toString(36).slice(2);
      newAddrs = [...addresses, { ...addrForm, id: newId } as Address];
    }
    if (addrForm.isDefault) {
      const defaultId = isEdit ? addrForm.id : newAddrs[newAddrs.length - 1].id;
      newAddrs = newAddrs.map((a) => ({ ...a, isDefault: a.id === defaultId }));
    }
    saveAddrs(newAddrs);
  };

  if (loading) return (
    <div style={{ textAlign: "center", padding: "4rem", color: "#666", fontFamily: "Outfit, sans-serif" }}>Ładowanie…</div>
  );
  if (!user) return (
    <div style={{ textAlign: "center", padding: "4rem", color: "#888", fontFamily: "Outfit, sans-serif" }}>
      <p>Musisz być zalogowany. <a href="/sklep-online/login" style={{ color: "#f60" }}>Zaloguj się</a></p>
    </div>
  );

  const tabBtn = (t: Tab, label: string) => (
    <button key={t} onClick={() => setTab(t)} style={{
      padding: "0.65rem 1.25rem", background: tab === t ? "#f60" : "transparent",
      color: tab === t ? "#fff" : "#aaa", border: `1px solid ${tab === t ? "#f60" : "#333"}`,
      borderRadius: 8, fontWeight: tab === t ? 700 : 400, cursor: "pointer",
      fontSize: "0.9rem", fontFamily: "Outfit, sans-serif",
    }}>{label}</button>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem", color: "#eee", fontFamily: "Outfit, sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "1.5rem" }}>Moje konto</h1>

      {/* Profile bar */}
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ width: 52, height: 52, background: "#f60", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{user.firstName} {user.lastName}</div>
          <div style={{ color: "#888", fontSize: "0.9rem" }}>{user.email}</div>
          {user.phone && <div style={{ color: "#888", fontSize: "0.85rem" }}>{user.phone}</div>}
        </div>
        <div style={{ fontSize: "0.78rem", color: "#555", background: "#222", padding: "0.3rem 0.75rem", borderRadius: 20, border: "1px solid #333" }}>
          {user.role === "admin" ? "Administrator" : "Klient"}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {tabBtn("zamowienia", "📦 Zamówienia")}
        {tabBtn("adresy", "📍 Adresy")}
        {tabBtn("konto", "⚙️ Ustawienia")}
      </div>

      {/* ── Tab: Zamówienia ── */}
      {tab === "zamowienia" && (orders.length === 0 ? (
        <div style={{ color: "#666", textAlign: "center", padding: "3rem", background: "#1a1a1a", borderRadius: 10, border: "1px solid #2a2a2a" }}>
          Brak zamówień. <Link href="/sklep-online" style={{ color: "#f60" }}>Zacznij zakupy →</Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.25rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <span style={{ fontWeight: 700, color: "#f60" }}>{order.orderNumber}</span>
                  <span style={{ color: "#666", fontSize: "0.85rem", marginLeft: "1rem" }}>{new Date(order.createdAt).toLocaleDateString("pl-PL")}</span>
                </div>
                <span style={{ background: STATUS_COLORS[order.status] + "22", color: STATUS_COLORS[order.status], padding: "0.2rem 0.6rem", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>
                  {STATUS_LABELS[order.status] ?? order.status}
                </span>
              </div>
              <div style={{ marginBottom: "0.75rem" }}>
                {order.items.map((item) => (
                  <div key={item.productId} style={{ fontSize: "0.85rem", color: "#bbb" }}>{item.name} × {item.quantity}</div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#888", fontSize: "0.85rem" }}>{order.items.reduce((s, i) => s + i.quantity, 0)} szt. · {order.paymentMethod}</span>
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
      ))}

      {/* ── Tab: Adresy ── */}
      {tab === "adresy" && (
        <div>
          {addrMsg && (
            <div style={{ marginBottom: "1rem", padding: "0.75rem 1rem", background: addrMsg.startsWith("Błąd") ? "#3a1010" : "#0d2a0d", border: `1px solid ${addrMsg.startsWith("Błąd") ? "#f44336" : "#4caf50"}`, borderRadius: 8, fontSize: "0.9rem", color: addrMsg.startsWith("Błąd") ? "#f66" : "#6f6" }}>
              {addrMsg}
            </div>
          )}
          {addresses.length > 0 && (
            <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {addresses.map((addr) => (
                <div key={addr.id} style={{ background: "#1a1a1a", border: `1px solid ${addr.isDefault ? "#f60" : "#2a2a2a"}`, borderRadius: 10, padding: "1.1rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap" }}>
                    <div>
                      {addr.label && <div style={{ fontSize: "0.8rem", color: "#f60", fontWeight: 700, marginBottom: "0.25rem" }}>{addr.label}</div>}
                      <div style={{ fontWeight: 600 }}>{addr.firstName} {addr.lastName}</div>
                      <div style={{ color: "#aaa", fontSize: "0.9rem" }}>{addr.street}</div>
                      <div style={{ color: "#aaa", fontSize: "0.9rem" }}>{addr.postalCode} {addr.city}, {COUNTRIES[addr.country] ?? addr.country}</div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0, flexWrap: "wrap" }}>
                      {addr.isDefault ? (
                        <span style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem", color: "#f60", border: "1px solid #f60", borderRadius: 6 }}>✓ Domyślny</span>
                      ) : (
                        <button onClick={() => saveAddrs(addresses.map((a) => ({ ...a, isDefault: a.id === addr.id })))} style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem", background: "transparent", border: "1px solid #444", color: "#aaa", borderRadius: 6, cursor: "pointer" }}>
                          Ustaw domyślny
                        </button>
                      )}
                      <button onClick={() => setAddrForm({ ...addr })} style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem", background: "transparent", border: "1px solid #444", color: "#eee", borderRadius: 6, cursor: "pointer" }}>Edytuj</button>
                      <button onClick={() => saveAddrs(addresses.filter((a) => a.id !== addr.id))} style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem", background: "transparent", border: "1px solid #444", color: "#f66", borderRadius: 6, cursor: "pointer" }}>Usuń</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!addrForm && (
            <button onClick={() => setAddrForm(newEmptyAddr())} style={{ background: "#f60", color: "#fff", border: "none", padding: "0.75rem 1.5rem", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: "Outfit, sans-serif" }}>
              + Dodaj adres
            </button>
          )}
          {addrForm && (
            <form onSubmit={submitAddr} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem", marginTop: "1rem" }}>
              <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 700, color: "#f60" }}>{addrForm.id ? "Edytuj adres" : "Nowy adres"}</h3>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                <input placeholder="Etykieta (np. Dom, Praca)" value={addrForm.label ?? ""} onChange={(e) => setAddrForm((f) => f ? { ...f, label: e.target.value } : f)} style={inputSt} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <input required placeholder="Imię *" value={addrForm.firstName} onChange={(e) => setAddrForm((f) => f ? { ...f, firstName: e.target.value } : f)} style={inputSt} />
                  <input required placeholder="Nazwisko *" value={addrForm.lastName} onChange={(e) => setAddrForm((f) => f ? { ...f, lastName: e.target.value } : f)} style={inputSt} />
                </div>
                <input required placeholder="Ulica i numer *" value={addrForm.street} onChange={(e) => setAddrForm((f) => f ? { ...f, street: e.target.value } : f)} style={inputSt} />
                <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "0.75rem" }}>
                  <input required placeholder="Kod poczt. *" value={addrForm.postalCode} onChange={(e) => setAddrForm((f) => f ? { ...f, postalCode: e.target.value } : f)} style={inputSt} maxLength={6} />
                  <input required placeholder="Miasto *" value={addrForm.city} onChange={(e) => setAddrForm((f) => f ? { ...f, city: e.target.value } : f)} style={inputSt} />
                </div>
                <select value={addrForm.country} onChange={(e) => setAddrForm((f) => f ? { ...f, country: e.target.value } : f)} style={inputSt}>
                  {Object.entries(COUNTRIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={addrForm.isDefault} onChange={(e) => setAddrForm((f) => f ? { ...f, isDefault: e.target.checked } : f)} style={{ accentColor: "#f60" }} />
                  Ustaw jako adres domyślny
                </label>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="submit" disabled={addrSaving} style={{ background: addrSaving ? "#555" : "#f60", color: "#fff", border: "none", padding: "0.7rem 1.5rem", borderRadius: 8, fontWeight: 700, cursor: addrSaving ? "not-allowed" : "pointer" }}>
                  {addrSaving ? "Zapisuję…" : "Zapisz adres"}
                </button>
                <button type="button" onClick={() => setAddrForm(null)} style={{ background: "transparent", color: "#aaa", border: "1px solid #444", padding: "0.7rem 1.5rem", borderRadius: 8, cursor: "pointer" }}>
                  Anuluj
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ── Tab: Ustawienia ── */}
      {tab === "konto" && (
        <div style={{ display: "grid", gap: "1.25rem" }}>
          <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginTop: 0, marginBottom: "1rem", color: "#f60" }}>Dane konta</h2>
            <div style={{ display: "grid", gap: "0.6rem", fontSize: "0.9rem" }}>
              {[["Imię i nazwisko", `${user.firstName} ${user.lastName}`], ["E-mail", user.email], ...(user.phone ? [["Telefon", user.phone]] : []), ["Rola", user.role === "admin" ? "Administrator" : "Klient"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "1rem" }}>
                  <span style={{ color: "#666", minWidth: 130 }}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card section */}
          <KartySection />

          <div>
            <button
              onClick={async () => { await fetch("/api/shop/auth/me", { method: "POST" }); window.location.href = "/sklep-online"; }}
              style={{ background: "transparent", color: "#f44336", border: "1px solid #f44336", padding: "0.7rem 1.5rem", borderRadius: 8, cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 600 }}
            >
              Wyloguj się
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

