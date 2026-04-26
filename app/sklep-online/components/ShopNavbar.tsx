"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { PublicUser } from "@/lib/shop-types";
import { useCart } from "./CartProvider";

export default function ShopNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<PublicUser | null>(null);
  const { items } = useCart();

  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/shop/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setUser)
      .catch(() => null);
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/shop/auth/me", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      background: scrolled ? "rgba(17,17,17,0.97)" : "#111",
      backdropFilter: "blur(8px)",
      transition: "background 0.3s",
      borderBottom: scrolled ? "1px solid #333" : "none",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 1.5rem",
        height: 64,
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
      }}>
        <Link href="/sklep-online" style={{ color: "#f60", fontWeight: 800, fontSize: "1.2rem", textDecoration: "none", fontFamily: "Outfit, sans-serif" }}>
          MOTO<span style={{ color: "#fff" }}>FAN</span>{" "}
          <span style={{ color: "#aaa", fontWeight: 400, fontSize: "0.9rem" }}>sklep</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "1.2rem", marginLeft: "1rem", flex: 1 }} className="shop-nav-links">
          <Link href="/sklep-online" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.9rem" }}>Strona główna</Link>
          <Link href="/sklep-online?category=Silnik" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.9rem" }}>Silnik</Link>
          <Link href="/sklep-online?category=Hamulce" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.9rem" }}>Hamulce</Link>
          <Link href="/sklep-online?category=Zawieszenie" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.9rem" }}>Zawieszenie</Link>
          <Link href="/sklep-online?category=Elektryka" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.9rem" }}>Elektryka</Link>
          <Link href="/sklep-online?category=Nadwozie" style={{ color: "#ccc", textDecoration: "none", fontSize: "0.9rem" }}>Nadwozie</Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "auto" }}>
          {/* Cart */}
          <Link href="/sklep-online/koszyk" style={{ color: "#fff", textDecoration: "none", position: "relative" }} title="Koszyk">
            <span style={{ fontSize: "1.3rem" }}>🛒</span>
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -8,
                background: "#f60", color: "#fff",
                borderRadius: "50%", width: 18, height: 18,
                fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700,
              }}>{cartCount}</span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Link href="/sklep-online/konto" style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                background: "#1a1a1a", border: "1px solid #333",
                color: "#eee", textDecoration: "none", fontSize: "0.85rem",
                padding: "0.35rem 0.85rem", borderRadius: 20, fontWeight: 600,
              }}>
                <span style={{ fontSize: "1rem" }}>👤</span> Moje konto
              </Link>
              <button
                onClick={logout}
                style={{ background: "none", border: "1px solid #444", color: "#888", padding: "0.35rem 0.7rem", borderRadius: 20, cursor: "pointer", fontSize: "0.8rem" }}
              >
                Wyloguj
              </button>
            </div>
          ) : (
            <Link href="/sklep-online/login" style={{
              background: "#f60", color: "#fff", padding: "0.4rem 1rem",
              borderRadius: 6, textDecoration: "none", fontSize: "0.85rem", fontWeight: 600,
            }}>
              Zaloguj
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
