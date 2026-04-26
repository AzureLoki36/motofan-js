// POST /api/shop/auth/logout
// GET  /api/shop/auth/me
import { NextResponse } from "next/server";
import { getShopSession } from "@/lib/shop-auth";
import { getUserById } from "@/lib/shop-db";
import { toPublicUser } from "@/lib/shop-auth";

export async function GET() {
  const session = await getShopSession();
  if (!session) {
    return NextResponse.json({ error: "Nie zalogowany" }, { status: 401 });
  }
  const user = await getUserById(session.id);
  if (!user) {
    return NextResponse.json({ error: "Użytkownik nie istnieje" }, { status: 404 });
  }
  return NextResponse.json(toPublicUser(user));
}

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("motofan-shop-user", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  return res;
}
