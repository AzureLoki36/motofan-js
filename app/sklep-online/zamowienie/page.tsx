"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartProvider";
import type { PaymentMethod, Address, PublicUser } from "@/lib/shop-types";

const PAYMENT_METHODS: Array<{ value: PaymentMethod; label: string; icon: string }> = [
  { value: "stripe", label: "Karta płatnicza (Visa/Mastercard)", icon: "💳" },
  { value: "przelewy24", label: "Przelewy24", icon: "🏦" },
  { value: "bank_transfer", label: "Przelew bankowy", icon: "🏛️" },
  { value: "cash_on_delivery", label: "Pobranie (płatność przy odbiorze)", icon: "📦" },
];

const emptyAddr = { id: "ship-1", label: "Adres dostawy", firstName: "", lastName: "", street: "", city: "", postalCode: "", country: "PL", isDefault: true };

export default function ZamowieniePage() {
  const { items, total, clear } = useCart();
  const router = useRouter();
  const [addr, setAddr] = useState<Address>(emptyAddr);
  const [guestEmail, setGuestEmail] = useState("");
  const [loggedUser, setLoggedUser] = useState<PublicUser | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-fill from logged-in user
  useEffect(() => {
    fetch("/api/shop/auth/me").then(async (r) => {
      if (!r.ok) return;
      const u: PublicUser = await r.json();
      setLoggedUser(u);
      const def = u.addresses?.find((a) => a.isDefault) ?? u.addresses?.[0];
      if (def) {
        setAddr(def);
      } else {
        // At least fill name from profile
        setAddr((a) => ({ ...a, firstName: u.firstName, lastName: u.lastName }));
      }
    });
  }, []);

  const shipping = total >= 50000 ? 0 : 1499;
  const orderTotal = total + shipping;

  const update = (k: keyof Address, v: string) => setAddr((a) => ({ ...a, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/shop/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          shippingAddress: addr,
          paymentMethod,
          notes,
          guestEmail: guestEmail || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Błąd"); setLoading(false); return; }

      // If Stripe, create payment intent and redirect
      if (paymentMethod === "stripe") {
        const piRes = await fetch("/api/shop/payment/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, orderId: data.id }),
        });
        const piData = await piRes.json();
        if (piRes.ok) {
          clear();
          router.push(`/sklep-online/zamowienie/sukces?order=${data.orderNumber}&payment=stripe&cs=${piData.clientSecret}`);
          return;
        } else {
          setError(piData.error ?? "Błąd inicjalizacji płatności Stripe. Spróbuj wybrać inną metodę płatności.");
          setLoading(false);
          return;
        }
      }

      clear();
      router.push(`/sklep-online/zamowienie/sukces?order=${data.orderNumber}`);
    } catch {
      setError("Błąd połączenia z serwerem");
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#888", fontFamily: "Outfit, sans-serif" }}>
        <p>Koszyk jest pusty. <a href="/sklep-online" style={{ color: "#f60" }}>Wróć do sklepu</a></p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem", color: "#eee", fontFamily: "Outfit, sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem" }}>Złóż zamówienie</h1>

      <form onSubmit={submit} style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem" }} className="checkout-grid">
        {/* Left: forms */}
        <div>
          {/* Guest email — only shown when not logged in */}
          {!loggedUser && (
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f60" }}>Kontakt</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                type="email"
                required
                placeholder="Adres e-mail *"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                style={inputStyle}
              />
              <div style={{ fontSize: "0.8rem", color: "#666" }}>
                Masz konto? <a href="/sklep-online/login" style={{ color: "#f60" }}>Zaloguj się</a>
              </div>
            </div>
          </section>
          )}
          {loggedUser && (
          <section style={{ marginBottom: "2rem" }}>
            <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.9rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Zalogowany jako <strong style={{ color: "#f60" }}>{loggedUser.email}</strong></span>
              <a href="/sklep-online/konto" style={{ color: "#666", fontSize: "0.8rem" }}>Konto →</a>
            </div>
          </section>
          )}

          {/* Shipping address */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f60" }}>Adres dostawy</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <input required placeholder="Imię *" value={addr.firstName} onChange={(e) => update("firstName", e.target.value)} style={inputStyle} />
              <input required placeholder="Nazwisko *" value={addr.lastName} onChange={(e) => update("lastName", e.target.value)} style={inputStyle} />
              <input required placeholder="Ulica i numer *" value={addr.street} onChange={(e) => update("street", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} />
              <input required placeholder="Kod pocztowy *" value={addr.postalCode} onChange={(e) => update("postalCode", e.target.value)} style={inputStyle} maxLength={6} />
              <input required placeholder="Miasto *" value={addr.city} onChange={(e) => update("city", e.target.value)} style={inputStyle} />
              <select value={addr.country} onChange={(e) => update("country", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }}>
                <option value="PL">Polska</option>
                <option value="DE">Niemcy</option>
                <option value="CZ">Czechy</option>
                <option value="SK">Słowacja</option>
                <option value="AT">Austria</option>
              </select>
            </div>
          </section>

          {/* Payment */}
          <section style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "#f60" }}>Metoda płatności</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {PAYMENT_METHODS.map((m) => (
                <label key={m.value} style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.75rem 1rem", background: paymentMethod === m.value ? "#1e1e1e" : "#141414",
                  border: `1px solid ${paymentMethod === m.value ? "#f60" : "#2a2a2a"}`,
                  borderRadius: 8, cursor: "pointer",
                }}>
                  <input type="radio" name="payment" value={m.value} checked={paymentMethod === m.value} onChange={() => setPaymentMethod(m.value)} style={{ accentColor: "#f60" }} />
                  <span style={{ fontSize: "1.1rem" }}>{m.icon}</span>
                  <span style={{ fontSize: "0.9rem" }}>{m.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <textarea
              placeholder="Uwagi do zamówienia (opcjonalnie)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{ ...inputStyle, width: "100%", resize: "vertical" }}
            />
          </section>
        </div>

        {/* Right: summary */}
        <div>
          <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem", position: "sticky", top: 90 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>Twoje zamówienie</h2>
            {items.map((item) => (
              <div key={item.productId} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.85rem" }}>
                <span style={{ color: "#ccc", flex: 1, paddingRight: "0.5rem" }}>{item.name} × {item.quantity}</span>
                <span>{((item.price * item.quantity) / 100).toFixed(2).replace(".", ",")} zł</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #2a2a2a", marginTop: "0.75rem", paddingTop: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                <span style={{ color: "#888" }}>Dostawa</span>
                <span>{shipping === 0 ? <span style={{ color: "#4caf50" }}>GRATIS</span> : `${(shipping / 100).toFixed(2).replace(".", ",")} zł`}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.1rem" }}>
                <span>Razem</span>
                <span style={{ color: "#f60" }}>{(orderTotal / 100).toFixed(2).replace(".", ",")} zł</span>
              </div>
            </div>

            {error && <div style={{ background: "#3a1010", border: "1px solid #f44336", color: "#f66", padding: "0.75rem", borderRadius: 8, marginTop: "1rem", fontSize: "0.85rem" }}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              style={{ display: "block", width: "100%", background: loading ? "#555" : "#f60", color: "#fff", border: "none", padding: "0.9rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", marginTop: "1.25rem" }}
            >
              {loading ? "Przetwarzanie…" : "Zamawiam i płacę"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.7rem 1rem",
  borderRadius: 8,
  border: "1px solid #333",
  background: "#1a1a1a",
  color: "#eee",
  fontSize: "0.9rem",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
