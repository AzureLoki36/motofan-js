import { NextRequest, NextResponse } from "next/server";
import { createToken, getAdminPassword, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password } = body;

  if (!password || password !== getAdminPassword()) {
    return NextResponse.json({ error: "Nieprawidłowe hasło" }, { status: 401 });
  }

  const token = await createToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
