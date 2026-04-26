"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalProducts: number;
  activeProducts: number;
}

export default function AdmDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch("/api/shop/orders").then((r) => {
        if (r.status === 401 || r.status === 403) { setUnauthorized(true); return []; }
        return r.json();
      }),
      fetch("/api/shop/products?limit=1000").then((r) => r.json()),
    ]).then(([orders, productsData]) => {
      if (!Array.isArray(orders)) return;
      const revenue = orders.filter((o: { paymentStatus: string }) => o.paymentStatus === "paid")
        .reduce((s: number, o: { total: number }) => s + o.total, 0);
      const pending = orders.filter((o: { status: string }) => ["pending", "awaiting_payment", "paid", "processing"].includes(o.status)).length;
      setStats({
        totalOrders: orders.length,
        totalRevenue: revenue,
        pendingOrders: pending,
        totalProducts: productsData.total ?? 0,
        activeProducts: (productsData.items ?? []).filter((p: { status: string }) => p.status === "active").length,
      });
      setLoading(false);
    });
  }, []);

  if (unauthorized) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", fontFamily: "Outfit, sans-serif" }}>
        <p style={{ color: "#888" }}>Brak dostępu. <a href="/sklep-online/adm/login" style={{ color: "#f60" }}>Zaloguj się jako admin</a></p>
      </div>
    );
  }

  const tiles = [
    { label: "Zamówienia ogółem", value: stats?.totalOrders ?? "—", icon: "📦", href: "/sklep-online/adm/zamowienia" },
    { label: "Zamówienia w toku", value: stats?.pendingOrders ?? "—", icon: "⏳", href: "/sklep-online/adm/zamowienia" },
    { label: "Przychód (PLN)", value: stats ? `${(stats.totalRevenue / 100).toFixed(2).replace(".", ",")} zł` : "—", icon: "💰", href: "/sklep-online/adm/zamowienia" },
    { label: "Produkty aktywne", value: stats ? `${stats.activeProducts} / ${stats.totalProducts}` : "—", icon: "🔧", href: "/sklep-online/adm/produkty" },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "Outfit, sans-serif", color: "#eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>Panel <span style={{ color: "#f60" }}>administratora</span></h1>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/sklep-online/adm/produkty/nowy" style={{ background: "#f60", color: "#fff", padding: "0.5rem 1rem", borderRadius: 8, textDecoration: "none", fontWeight: 700, fontSize: "0.9rem" }}>
            + Dodaj produkt
          </Link>
        </div>
      </div>

      {/* Stats tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem", cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#f60")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{t.icon}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#f60", marginBottom: "0.25rem" }}>{loading ? "…" : t.value}</div>
              <div style={{ color: "#888", fontSize: "0.85rem" }}>{t.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        {[
          { href: "/sklep-online/adm/produkty", icon: "🔧", label: "Zarządzanie produktami", desc: "Dodaj, edytuj, usuń produkty" },
          { href: "/sklep-online/adm/zamowienia", icon: "📦", label: "Zamówienia", desc: "Przeglądaj i aktualizuj statusy" },
          { href: "/sklep-online/adm/marketplace", icon: "🌐", label: "Marketplace", desc: "Allegro, eBay, OLX, Amazon" },
        ].map((n) => (
          <Link key={n.href} href={n.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem", cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#f60")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{n.icon}</div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>{n.label}</div>
              <div style={{ color: "#666", fontSize: "0.85rem" }}>{n.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
