"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      const data = await res.json();
      setError(data.error || "Błąd logowania");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo">
          <span className="logo-text">
            MOTO<span className="logo-accent">FAN</span>
          </span>
          <span className="logo-sub" style={{ display: "block", marginTop: 4 }}>
            Panel administracyjny
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="username">Nazwa użytkownika</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Wpisz nazwę użytkownika..."
            autoFocus
            autoComplete="username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Hasło</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Wpisz hasło..."
            autoComplete="current-password"
            required
          />
        </div>
        {error && (
          <div style={{ color: "var(--primary)", fontSize: ".88rem", fontWeight: 600, textAlign: "center" }}>
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
          {loading ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          padding: 24px;
        }
        .login-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 48px 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .login-logo {
          text-align: center;
          font-family: 'Outfit', sans-serif;
        }
        .login-logo .logo-text {
          font-size: 2.2rem;
          font-weight: 900;
        }
      `}</style>
    </div>
  );
}
