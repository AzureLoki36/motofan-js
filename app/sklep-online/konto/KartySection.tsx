"use client";

import { useEffect, useState, useRef } from "react";
import type { SavedCard } from "@/lib/shop-types";

const BRAND_ICONS: Record<string, string> = {
  visa: "💳",
  mastercard: "💳",
  amex: "💳",
  discover: "💳",
  jcb: "💳",
  unionpay: "💳",
};

const BRAND_LABELS: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  jcb: "JCB",
  unionpay: "UnionPay",
};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Stripe?: (pk: string) => any;
  }
}

export default function KartySection() {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [stripeReady, setStripeReady] = useState(false);
  const [stripeConfigured, setStripeConfigured] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stripeRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cardElementRef = useRef<any>(null);
  const mountRef = useRef<HTMLDivElement>(null);

  // Load saved cards
  useEffect(() => {
    fetch("/api/shop/payment/saved-cards")
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d) setCards(d.cards ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Load Stripe.js from CDN when form is opened
  useEffect(() => {
    if (!showForm) return;

    const initStripe = async () => {
      // Fetch publishable key from backend
      const res = await fetch("/api/shop/payment/stripe-config");
      if (!res.ok) { setStripeConfigured(false); return; }
      const { publishableKey } = await res.json();
      if (!publishableKey) { setStripeConfigured(false); return; }

      if (!window.Stripe) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://js.stripe.com/v3/";
          script.onload = () => resolve();
          script.onerror = () => reject();
          document.head.appendChild(script);
        });
      }

      stripeRef.current = window.Stripe!(publishableKey);
      const elements = stripeRef.current.elements();
      cardElementRef.current = elements.create("card", {
        style: {
          base: {
            color: "#eee",
            fontFamily: "Outfit, sans-serif",
            fontSize: "16px",
            "::placeholder": { color: "#555" },
          },
          invalid: { color: "#f66" },
        },
      });
      if (mountRef.current) {
        cardElementRef.current.mount(mountRef.current);
        setStripeReady(true);
      }
    };

    initStripe().catch(() => setStripeConfigured(false));

    return () => {
      if (cardElementRef.current) {
        cardElementRef.current.destroy();
        cardElementRef.current = null;
      }
      setStripeReady(false);
    };
  }, [showForm]);

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripeRef.current || !cardElementRef.current) return;
    setFormLoading(true);
    setMsg(null);

    // 1. Create SetupIntent on backend
    const siRes = await fetch("/api/shop/payment/saved-cards", { method: "POST" });
    const siData = await siRes.json();
    if (!siRes.ok) {
      setMsg({ text: siData.error ?? "Błąd inicjalizacji", ok: false });
      setFormLoading(false);
      return;
    }

    // 2. Confirm SetupIntent with Stripe.js
    const { setupIntent, error } = await stripeRef.current.confirmCardSetup(
      siData.clientSecret,
      { payment_method: { card: cardElementRef.current } }
    );
    if (error) {
      setMsg({ text: error.message ?? "Błąd karty", ok: false });
      setFormLoading(false);
      return;
    }

    // 3. Save confirmed PaymentMethod to user profile
    const saveRes = await fetch("/api/shop/payment/saved-cards", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId: setupIntent.payment_method, setDefault: cards.length === 0 }),
    });
    const saveData = await saveRes.json();
    if (saveRes.ok) {
      setCards(saveData.cards ?? []);
      setShowForm(false);
      setMsg({ text: "Karta została zapisana!", ok: true });
      setTimeout(() => setMsg(null), 4000);
    } else {
      setMsg({ text: saveData.error ?? "Błąd zapisu karty", ok: false });
    }
    setFormLoading(false);
  };

  const handleDelete = async (pmId: string) => {
    const res = await fetch(`/api/shop/payment/saved-cards?pmId=${encodeURIComponent(pmId)}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) setCards(data.cards ?? []);
  };

  const handleSetDefault = async (pmId: string) => {
    const updated = cards.map((c) => ({ ...c, isDefault: c.stripePaymentMethodId === pmId }));
    const res = await fetch("/api/shop/auth/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedCards: updated }),
    });
    if (res.ok) setCards(updated);
  };

  return (
    <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem" }}>
      <h2 style={{ fontSize: "1rem", fontWeight: 700, marginTop: 0, marginBottom: "0.5rem", color: "#f60" }}>
        💳 Karty płatnicze
      </h2>
      <p style={{ color: "#666", fontSize: "0.85rem", margin: "0 0 1.25rem" }}>
        Zapisz kartę, żeby płacić szybciej przy kolejnych zamówieniach.
      </p>

      {msg && (
        <div style={{ marginBottom: "1rem", padding: "0.75rem 1rem", background: msg.ok ? "#0d2a0d" : "#3a1010", border: `1px solid ${msg.ok ? "#4caf50" : "#f44336"}`, borderRadius: 8, fontSize: "0.9rem", color: msg.ok ? "#6f6" : "#f66" }}>
          {msg.text}
        </div>
      )}

      {loading ? (
        <div style={{ color: "#555", fontSize: "0.9rem" }}>Ładowanie…</div>
      ) : (
        <>
          {/* Saved cards list */}
          {cards.length > 0 && (
            <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {cards.map((card) => (
                <div key={card.stripePaymentMethodId} style={{
                  background: "#141414",
                  border: `1px solid ${card.isDefault ? "#f60" : "#2a2a2a"}`,
                  borderRadius: 10, padding: "1rem 1.25rem",
                  display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap",
                }}>
                  <span style={{ fontSize: "1.5rem" }}>{BRAND_ICONS[card.brand] ?? "💳"}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                      {BRAND_LABELS[card.brand] ?? card.brand} •••• {card.last4}
                    </div>
                    <div style={{ color: "#666", fontSize: "0.8rem" }}>
                      Ważna do {String(card.expMonth).padStart(2, "0")}/{card.expYear}
                    </div>
                  </div>
                  {card.isDefault && (
                    <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.6rem", color: "#f60", border: "1px solid #f60", borderRadius: 12 }}>✓ Domyślna</span>
                  )}
                  {!card.isDefault && (
                    <button onClick={() => handleSetDefault(card.stripePaymentMethodId)} style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem", background: "transparent", border: "1px solid #444", color: "#aaa", borderRadius: 6, cursor: "pointer" }}>
                      Ustaw domyślną
                    </button>
                  )}
                  <button onClick={() => handleDelete(card.stripePaymentMethodId)} style={{ fontSize: "0.78rem", padding: "0.3rem 0.6rem", background: "transparent", border: "1px solid #444", color: "#f66", borderRadius: 6, cursor: "pointer" }}>
                    Usuń
                  </button>
                </div>
              ))}
            </div>
          )}

          {cards.length === 0 && !showForm && (
            <div style={{ background: "#141414", border: "1px dashed #333", borderRadius: 8, padding: "1.5rem", textAlign: "center", color: "#555", marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💳</div>
              <div style={{ fontSize: "0.9rem" }}>Brak zapisanych kart</div>
            </div>
          )}

          {/* Add card button */}
          {!showForm && (
            <button onClick={() => { setShowForm(true); setMsg(null); }} style={{
              background: "#f60", color: "#fff", border: "none",
              padding: "0.7rem 1.5rem", borderRadius: 8, fontWeight: 700,
              cursor: "pointer", fontFamily: "Outfit, sans-serif",
            }}>
              + Dodaj kartę
            </button>
          )}

          {/* Add card form */}
          {showForm && (
            <form onSubmit={handleAddCard} style={{ background: "#141414", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem", marginTop: "0.5rem" }}>
              <h3 style={{ margin: "0 0 1rem", fontSize: "1rem", fontWeight: 700, color: "#f60" }}>Dodaj nową kartę</h3>

              {!stripeConfigured ? (
                <div style={{ background: "#2a1a00", border: "1px solid #f60", borderRadius: 8, padding: "1rem", fontSize: "0.9rem", color: "#f90", marginBottom: "1rem" }}>
                  ⚠️ Płatności kartą nie są jeszcze skonfigurowane w tym sklepie.<br />
                  <span style={{ color: "#666", fontSize: "0.8rem" }}>Administrator musi dodać klucze Stripe (STRIPE_SECRET_KEY + NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).</span>
                </div>
              ) : (
                <>
                  {/* Stripe Card Element mount point */}
                  <div
                    ref={mountRef}
                    style={{
                      padding: "0.75rem 1rem",
                      background: "#1a1a1a",
                      border: "1px solid #333",
                      borderRadius: 8,
                      marginBottom: "1rem",
                      minHeight: 44,
                    }}
                  />
                  {!stripeReady && <div style={{ color: "#555", fontSize: "0.85rem", marginBottom: "0.75rem" }}>Ładowanie formularza karty…</div>}
                </>
              )}

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button type="submit" disabled={formLoading || !stripeReady || !stripeConfigured} style={{
                  background: (formLoading || !stripeReady || !stripeConfigured) ? "#555" : "#f60",
                  color: "#fff", border: "none", padding: "0.7rem 1.5rem",
                  borderRadius: 8, fontWeight: 700,
                  cursor: (formLoading || !stripeReady || !stripeConfigured) ? "not-allowed" : "pointer",
                }}>
                  {formLoading ? "Zapisuję…" : "Zapisz kartę"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{
                  background: "transparent", color: "#aaa", border: "1px solid #444",
                  padding: "0.7rem 1.5rem", borderRadius: 8, cursor: "pointer",
                }}>
                  Anuluj
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
