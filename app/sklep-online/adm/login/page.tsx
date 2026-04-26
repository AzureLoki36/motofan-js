"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdmLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
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
      body: JSON.stringify({ username: username.trim(), password: password.trim() }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Błąd logowania"); setLoading(false); return; }
    router.push("/sklep-online/adm");
    router.refresh();
  };

  const inputSt = { padding: "0.75rem 1rem", borderRadius: 8, border: "1px solid #333", background: "#141414", color: "#eee", fontSize: "0.95rem", outline: "none", width: "100%", boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0d0d", fontFamily: "Outfit, sans-serif" }}>
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "2rem", width: "100%", maxWidth: 400 }}>
        <h1 style={{ color: "#f60", fontWeight: 800, marginTop: 0, marginBottom: "0.25rem" }}>MotoFan Sklep</h1>
        <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Panel administratora — zaloguj się</p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input
            type="text"
            required
            autoComplete="username"
            placeholder="Login administratora"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputSt}
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="Hasło administratora"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputSt}
          />
          {error && <div style={{ background: "#3a1010", border: "1px solid #f44336", color: "#f66", padding: "0.65rem 0.9rem", borderRadius: 8, fontSize: "0.85rem" }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ background: loading ? "#555" : "#f60", color: "#fff", border: "none", padding: "0.85rem", borderRadius: 8, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: "0.25rem" }}>
            {loading ? "Logowanie…" : "Zaloguj się"}
          </button>
        </form>
      </div>
    </div>
  );
}
