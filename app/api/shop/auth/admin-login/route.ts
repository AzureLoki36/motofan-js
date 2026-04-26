// POST /api/shop/auth/admin-login  – admin panel for /sklep-online/adm
import { NextRequest, NextResponse } from "next/server";
import { createShopAdminToken, SHOP_ADMIN_COOKIE } from "@/lib/shop-auth";
import { safeCompare } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const expectedUser = (process.env.ADMIN_USERNAME ?? "").trim();
    const expectedPass = (process.env.SHOP_ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD ?? "").trim();
    if (!expectedPass) return NextResponse.json({ error: "Not configured" }, { status: 500 });

    const userOk = !expectedUser || safeCompare((username ?? "").trim(), expectedUser);
    const passOk = safeCompare((password ?? "").trim(), expectedPass);
    if (!userOk || !passOk) {
      return NextResponse.json({ error: "Nieprawidłowy login lub hasło" }, { status: 401 });
    }

    const token = await createShopAdminToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SHOP_ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 12,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
