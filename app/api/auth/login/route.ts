import { NextRequest, NextResponse } from "next/server";
import { createToken, getAdminUsername, getAdminPassword, safeCompare, COOKIE_NAME } from "@/lib/auth";

/* ── In-memory rate limiter (per Vercel serverless instance) ── */
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut." },
      { status: 429 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { username, password } = body;

  if (
    !username ||
    !password ||
    !safeCompare(username, getAdminUsername()) ||
    !safeCompare(password, getAdminPassword())
  ) {
    return NextResponse.json(
      { error: "Nieprawidłowa nazwa użytkownika lub hasło" },
      { status: 401 }
    );
  }

  // Reset attempts on successful login
  attempts.delete(ip);

  const token = await createToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24h (matches token expiry)
    path: "/",
  });
  return res;
}
