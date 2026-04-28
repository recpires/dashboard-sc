import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  if (!clientId) return NextResponse.json({ error: "GOOGLE_ADS_CLIENT_ID não configurado" }, { status: 500 });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: "http://localhost:3000/api/auth/callback",
    response_type: "code",
    scope: "https://www.googleapis.com/auth/adwords",
    access_type: "offline",
    prompt: "consent",
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  return new NextResponse(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Autorizar Google Ads</title>
    <style>body{font-family:system-ui;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
    .card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:40px;max-width:480px;text-align:center}
    h1{font-size:20px;margin-bottom:8px}p{color:rgba(156,163,175,0.8);font-size:14px;margin-bottom:28px}
    a{display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#06b6d4,#d946ef);color:#fff;text-decoration:none;border-radius:10px;font-weight:700;font-size:14px}</style>
    </head><body><div class="card">
    <h1>🔐 Autorizar Google Ads</h1>
    <p>Clique abaixo para autorizar o acesso à conta Google Ads.<br>Você será redirecionado de volta automaticamente.</p>
    <a href="${url}">Autorizar com Google</a>
    </div></body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
