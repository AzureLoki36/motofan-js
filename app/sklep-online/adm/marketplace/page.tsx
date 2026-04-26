"use client";

import { useEffect, useState } from "react";
import type { MarketplaceTokens } from "@/lib/shop-types";
import Link from "next/link";

const PLATFORMS = [
  { key: "allegro" as const, name: "Allegro", icon: "🛒", color: "#ff6b00" },
  { key: "ebay" as const, name: "eBay", icon: "🔨", color: "#e53238" },
  { key: "olx" as const, name: "OLX", icon: "📋", color: "#3cb371" },
  { key: "amazon" as const, name: "Amazon", icon: "📦", color: "#ff9900" },
];

export default function MarketplacePage() {
  const [tokens, setTokens] = useState<MarketplaceTokens>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [syncResults, setSyncResults] = useState<Record<string, unknown>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/shop/marketplace/tokens")
      .then((r) => r.ok ? r.json() : {})
      .then((d) => { setTokens(d); setLoading(false); });
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/shop/marketplace/tokens", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tokens),
    });
    const d = await res.json();
    setSaving(false);
    if (res.ok) setTokens(d);
    else setError(d.error ?? "Błąd zapisu");
  };

  const syncAll = async (platform: string) => {
    setSyncing(platform);
    setSyncResults((r) => ({ ...r, [platform]: null }));
    const res = await fetch(`/api/shop/marketplace/sync/${platform}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const d = await res.json();
    setSyncResults((r) => ({ ...r, [platform]: d }));
    setSyncing(null);
  };

  const upd = (platform: string, k: string, v: string) => {
    setTokens((t) => ({
      ...t,
      [platform]: { ...(t[platform as keyof MarketplaceTokens] ?? {}), [k]: v },
    }));
  };

  if (loading) return <div style={{ textAlign: "center", padding: "4rem", color: "#666", fontFamily: "Outfit, sans-serif" }}>Ładowanie…</div>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "Outfit, sans-serif", color: "#eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>Integracje Marketplace</h1>
        <Link href="/sklep-online/adm" style={{ color: "#888", textDecoration: "none", fontSize: "0.85rem" }}>← Panel główny</Link>
      </div>

      {PLATFORMS.map((p) => {
        const t = tokens[p.key] as Record<string, string> | undefined;
        const result = syncResults[p.key] as { results?: Array<{ name: string; ok: boolean; error?: string }> } | null;

        return (
          <div key={p.key} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "1.5rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>{p.icon}</span>
                <span style={{ color: p.color }}>{p.name}</span>
              </h2>
              <button
                onClick={() => syncAll(p.key)}
                disabled={syncing === p.key}
                style={{ background: p.color, color: "#fff", border: "none", padding: "0.4rem 1rem", borderRadius: 8, fontWeight: 700, cursor: syncing === p.key ? "not-allowed" : "pointer", fontSize: "0.85rem", opacity: syncing === p.key ? 0.7 : 1 }}
              >
                {syncing === p.key ? "Synchronizacja…" : "Synchronizuj wszystkie"}
              </button>
            </div>

            {/* Token fields */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.75rem" }}>
              {p.key === "allegro" && <>
                <input placeholder="Client ID" value={(t?.clientId ?? "")} onChange={(e) => upd("allegro", "clientId", e.target.value)} style={inputStyle} />
                <input placeholder="Client Secret" type="password" value={(t?.clientSecret ?? "")} onChange={(e) => upd("allegro", "clientSecret", e.target.value)} style={inputStyle} />
                <input placeholder="Access Token (opcjonalnie)" value={(t?.accessToken ?? "")} onChange={(e) => upd("allegro", "accessToken", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} />
                <input placeholder="Refresh Token (opcjonalnie)" value={(t?.refreshToken ?? "")} onChange={(e) => upd("allegro", "refreshToken", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} />
              </>}
              {p.key === "ebay" && <>
                <input placeholder="App ID" value={(t?.appId ?? "")} onChange={(e) => upd("ebay", "appId", e.target.value)} style={inputStyle} />
                <input placeholder="Cert ID" type="password" value={(t?.certId ?? "")} onChange={(e) => upd("ebay", "certId", e.target.value)} style={inputStyle} />
                <input placeholder="Dev ID" value={(t?.devId ?? "")} onChange={(e) => upd("ebay", "devId", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} />
                <input placeholder="Auth Token" type="password" value={(t?.authToken ?? "")} onChange={(e) => upd("ebay", "authToken", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} />
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#888", fontSize: "0.85rem" }}>
                  <input type="checkbox" checked={t?.sandbox === "true" || (t as { sandbox?: boolean })?.sandbox === true} onChange={(e) => upd("ebay", "sandbox", String(e.target.checked))} />
                  Sandbox mode
                </label>
              </>}
              {p.key === "olx" && <>
                <input placeholder="Client ID" value={(t?.clientId ?? "")} onChange={(e) => upd("olx", "clientId", e.target.value)} style={inputStyle} />
                <input placeholder="Client Secret" type="password" value={(t?.clientSecret ?? "")} onChange={(e) => upd("olx", "clientSecret", e.target.value)} style={inputStyle} />
                <input placeholder="Access Token (opcjonalnie)" value={(t?.accessToken ?? "")} onChange={(e) => upd("olx", "accessToken", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} />
              </>}
              {p.key === "amazon" && <>
                <input placeholder="Seller ID" value={(t?.sellerId ?? "")} onChange={(e) => upd("amazon", "sellerId", e.target.value)} style={inputStyle} />
                <input placeholder="Marketplace ID" value={(t?.marketplaceId ?? "")} onChange={(e) => upd("amazon", "marketplaceId", e.target.value)} style={inputStyle} />
                <input placeholder="Access Key" value={(t?.accessKey ?? "")} onChange={(e) => upd("amazon", "accessKey", e.target.value)} style={inputStyle} />
                <input placeholder="Secret Key" type="password" value={(t?.secretKey ?? "")} onChange={(e) => upd("amazon", "secretKey", e.target.value)} style={inputStyle} />
                <input placeholder="Region (np. eu-west-1)" value={(t?.region ?? "")} onChange={(e) => upd("amazon", "region", e.target.value)} style={inputStyle} />
              </>}
            </div>

            {/* Sync results */}
            {result?.results && (
              <div style={{ background: "#111", borderRadius: 8, padding: "0.75rem", marginTop: "0.5rem", maxHeight: 200, overflowY: "auto" }}>
                {result.results.map((r, i) => (
                  <div key={i} style={{ fontSize: "0.8rem", color: r.ok ? "#4caf50" : "#f66", marginBottom: "0.3rem" }}>
                    {r.ok ? "✓" : "✗"} {r.name} {r.error ? `— ${r.error}` : ""}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {error && <div style={{ background: "#3a1010", border: "1px solid #f44336", color: "#f66", padding: "0.75rem", borderRadius: 8, fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</div>}

      <button
        onClick={save}
        disabled={saving}
        style={{ background: saving ? "#555" : "#f60", color: "#fff", border: "none", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", cursor: saving ? "not-allowed" : "pointer" }}
      >
        {saving ? "Zapisywanie…" : "Zapisz dane integracji"}
      </button>
    </div>
  );
}

const inputStyle: React.CSSProperties = { padding: "0.6rem 0.9rem", borderRadius: 8, border: "1px solid #333", background: "#141414", color: "#eee", fontSize: "0.85rem", outline: "none", width: "100%", boxSizing: "border-box" };
