"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdmLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/shop/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Błąd"); setLoading(false); return; }
    router.push("/sklep-online/adm");
    router.refresh();
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0d0d", fontFamily: "Outfit, sans-serif" }}>
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "2rem", width: "100%", maxWidth: 380 }}>
        <h1 style={{ color: "#f60", fontWeight: 800, marginTop: 0, marginBottom: "0.25rem" }}>MotoFan Sklep</h1>
        <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Panel administratora</p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input
            type="password"
            required
            placeholder="Hasło administratora"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "0.75rem 1rem", borderRadius: 8, border: "1px solid #333", background: "#141414", color: "#eee", fontSize: "0.95rem", outline: "none" }}
          />
          {error && <div style={{ color: "#f66", fontSize: "0.85rem" }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ background: loading ? "#555" : "#f60", color: "#fff", border: "none", padding: "0.85rem", borderRadius: 8, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Logowanie…" : "Zaloguj"}
          </button>
        </form>
      </div>
    </div>
  );
}
