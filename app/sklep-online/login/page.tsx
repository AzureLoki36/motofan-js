"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/shop/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Błąd logowania"); setLoading(false); return; }
    router.push("/sklep-online/konto");
  };

  return (
    <div style={{ maxWidth: 420, margin: "4rem auto", padding: "0 1.5rem", fontFamily: "Outfit, sans-serif" }}>
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginTop: 0, marginBottom: "0.25rem" }}>Zaloguj się</h1>
        <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          Nie masz konta? <Link href="/sklep-online/rejestracja" style={{ color: "#f60" }}>Zarejestruj się</Link>
        </p>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <input
            type="email"
            required
            placeholder="Adres e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            required
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          {error && <div style={{ background: "#3a1010", border: "1px solid #f44336", color: "#f66", padding: "0.75rem", borderRadius: 8, fontSize: "0.85rem" }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{ background: loading ? "#555" : "#f60", color: "#fff", border: "none", padding: "0.85rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", marginTop: "0.5rem" }}
          >
            {loading ? "Logowanie…" : "Zaloguj się"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.7rem 1rem",
  borderRadius: 8,
  border: "1px solid #333",
  background: "#141414",
  color: "#eee",
  fontSize: "0.95rem",
  outline: "none",
};
