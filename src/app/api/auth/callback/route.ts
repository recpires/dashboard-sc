import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(html("❌ Acesso negado", `Erro: ${error}`, "red"), { headers: { "Content-Type": "text/html" } });
  }

  if (!code) {
    return new NextResponse(html("❌ Sem código", "Nenhum código de autorização recebido.", "red"), { headers: { "Content-Type": "text/html" } });
  }

  const clientId = process.env.GOOGLE_ADS_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET!;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: "http://localhost:3000/api/auth/callback",
      grant_type: "authorization_code",
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.refresh_token) {
    return new NextResponse(
      html("❌ Erro ao trocar token", `Resposta do Google: <pre>${JSON.stringify(data, null, 2)}</pre>`, "red"),
      { headers: { "Content-Type": "text/html" } }
    );
  }

  return new NextResponse(
    html(
      "✅ Refresh Token gerado!",
      `<p style="color:rgba(156,163,175,0.8);margin-bottom:16px">Copie o valor abaixo e cole no <code>.env.local</code> como <strong>GOOGLE_ADS_REFRESH_TOKEN</strong>:</p>
      <div style="background:rgba(0,0,0,0.4);border:1px solid rgba(6,182,212,0.4);border-radius:10px;padding:16px;word-break:break-all;font-family:monospace;font-size:13px;color:#06b6d4;text-align:left">${data.refresh_token}</div>
      <p style="color:rgba(156,163,175,0.5);font-size:12px;margin-top:16px">Após adicionar ao .env.local, reinicie o servidor com <code>npm run dev</code>.</p>`,
      "cyan"
    ),
    { headers: { "Content-Type": "text/html" } }
  );
}

function html(title: string, body: string, accent: "cyan" | "red") {
  const color = accent === "cyan" ? "#06b6d4" : "#f87171";
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
  <style>body{font-family:system-ui;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
  .card{background:rgba(255,255,255,0.05);border:1px solid ${color}40;border-radius:16px;padding:40px;max-width:560px;width:90%;text-align:center}
  h1{font-size:20px;color:${color};margin-bottom:16px}code{background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-size:12px}
  pre{text-align:left;font-size:11px;overflow:auto}</style>
  </head><body><div class="card"><h1>${title}</h1>${body}</div></body></html>`;
}
