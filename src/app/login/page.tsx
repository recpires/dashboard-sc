"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/auth/login?from=${encodeURIComponent(from)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      router.push(data.redirect);
    } catch {
      setError("Erro de conexão");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100dvh", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative", overflow: "hidden" }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,70,239,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}>
        {/* Card */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "40px 36px", backdropFilter: "blur(20px)" }}>
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #06b6d4, #d946ef)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 32px rgba(6,182,212,0.35), 0 0 60px rgba(217,70,239,0.15)", marginBottom: 14 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", background: "linear-gradient(90deg, #06b6d4, #d946ef)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              SynapseCode
            </span>
            <span style={{ fontSize: 12, color: "rgba(156,163,175,0.6)", marginTop: 4 }}>Dashboard — Acesso restrito</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "rgba(156,163,175,0.7)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                Senha de acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                autoFocus
                required
                style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: `1px solid ${error ? "rgba(248,113,113,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, color: "#ffffff", fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color 300ms" }}
                onFocus={(e) => { if (!error) e.target.style.borderColor = "rgba(6,182,212,0.5)"; }}
                onBlur={(e) => { if (!error) e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
              {error && <p style={{ fontSize: 11, color: "#f87171", marginTop: 6 }}>{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              style={{ padding: "13px", borderRadius: 10, border: "none", cursor: loading || !password ? "not-allowed" : "pointer", background: "linear-gradient(135deg, #06b6d4, #d946ef)", color: "#ffffff", fontSize: 13, fontWeight: 700, letterSpacing: "0.02em", opacity: loading || !password ? 0.6 : 1, transition: "all 300ms cubic-bezier(0.32,0.72,0,1)", marginTop: 4 }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(156,163,175,0.3)", marginTop: 20 }}>
          © 2026 SynapseCode · Uso interno
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
