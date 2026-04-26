"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RejestrPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", confirm: "", firstName: "", lastName: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Hasła się nie zgadzają"); return; }
    setLoading(true);
    setError("");
    const res = await fetch("/api/shop/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName, phone: form.phone || undefined }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Błąd rejestracji"); setLoading(false); return; }
    router.push("/sklep-online/konto");
  };

  return (
    <div style={{ maxWidth: 460, margin: "4rem auto", padding: "0 1.5rem", fontFamily: "Outfit, sans-serif" }}>
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginTop: 0, marginBottom: "0.25rem" }}>Utwórz konto</h1>
        <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          Masz już konto? <Link href="/sklep-online/login" style={{ color: "#f60" }}>Zaloguj się</Link>
        </p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <input required placeholder="Imię *" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} style={inputStyle} />
            <input required placeholder="Nazwisko *" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} style={inputStyle} />
          </div>
          <input type="email" required placeholder="Adres e-mail *" value={form.email} onChange={(e) => update("email", e.target.value)} style={inputStyle} />
          <input type="tel" placeholder="Telefon (opcjonalnie)" value={form.phone} onChange={(e) => update("phone", e.target.value)} style={inputStyle} />
          <input type="password" required placeholder="Hasło *" value={form.password} onChange={(e) => update("password", e.target.value)} style={inputStyle} />
          <input type="password" required placeholder="Powtórz hasło *" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} style={inputStyle} />
          <div style={{ fontSize: "0.78rem", color: "#666" }}>Hasło: min. 8 znaków, wielka litera, cyfra</div>
          {error && <div style={{ background: "#3a1010", border: "1px solid #f44336", color: "#f66", padding: "0.75rem", borderRadius: 8, fontSize: "0.85rem" }}>{error}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{ background: loading ? "#555" : "#f60", color: "#fff", border: "none", padding: "0.85rem", borderRadius: 8, fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", marginTop: "0.5rem" }}
          >
            {loading ? "Rejestracja…" : "Zarejestruj się"}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.7rem 1rem", borderRadius: 8, border: "1px solid #333",
  background: "#141414", color: "#eee", fontSize: "0.95rem", outline: "none",
};
