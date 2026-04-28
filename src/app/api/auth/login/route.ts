import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.DASHBOARD_PASSWORD;

  if (!correct || password !== correct) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }

  const from = req.nextUrl.searchParams.get("from") ?? "/";
  const res = NextResponse.json({ ok: true, redirect: from });
  res.cookies.set("sc_auth", correct, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: "/",
  });
  return res;
}
