"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SukcesPageInner() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const payment = searchParams.get("payment");

  return (
    <div style={{ maxWidth: 600, margin: "4rem auto", textAlign: "center", color: "#eee", fontFamily: "Outfit, sans-serif", padding: "0 1.5rem" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>Dziękujemy za zamówienie!</h1>
      {orderNumber && (
        <p style={{ color: "#888", marginBottom: "1.5rem" }}>
          Numer zamówienia: <span style={{ color: "#f60", fontWeight: 700 }}>{orderNumber}</span>
        </p>
      )}
      {payment === "bank_transfer" && (
        <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem", textAlign: "left" }}>
          <h3 style={{ color: "#f60", marginTop: 0 }}>Dane do przelewu</h3>
          <p style={{ color: "#bbb", fontSize: "0.9rem", margin: "0.4rem 0" }}>Odbiorca: <strong>MotoFan Sp. z o.o.</strong></p>
          <p style={{ color: "#bbb", fontSize: "0.9rem", margin: "0.4rem 0" }}>Bank: mBank</p>
          <p style={{ color: "#bbb", fontSize: "0.9rem", margin: "0.4rem 0" }}>Nr konta: <strong>00 0000 0000 0000 0000 0000 0000</strong></p>
          <p style={{ color: "#bbb", fontSize: "0.9rem", margin: "0.4rem 0" }}>Tytuł: <strong>{orderNumber ?? "zamówienie"}</strong></p>
          <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "1rem" }}>Zamówienie zostanie zrealizowane po zaksięgowaniu płatności.</p>
        </div>
      )}
      <p style={{ color: "#888", marginBottom: "2rem" }}>
        Potwierdzenie zamówienia zostanie wysłane na podany adres e-mail.
        <br />W razie pytań zadzwoń: <strong style={{ color: "#f60" }}>601 48 42 42</strong>
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/sklep-online/konto" style={{ background: "#222", color: "#ccc", padding: "0.75rem 1.5rem", borderRadius: 8, textDecoration: "none", border: "1px solid #333" }}>
          Moje zamówienia
        </Link>
        <Link href="/sklep-online" style={{ background: "#f60", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>
          Kontynuuj zakupy
        </Link>
      </div>
    </div>
  );
}

export default function SukcesPage() {
  return (
    <Suspense fallback={null}>
      <SukcesPageInner />
    </Suspense>
  );
}
