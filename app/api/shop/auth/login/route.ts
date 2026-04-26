// POST /api/shop/auth/login
import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/shop-db";
import { verifyPassword, createShopToken, validateEmail } from "@/lib/shop-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Podaj email i hasło" }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Nieprawidłowy adres e-mail" }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      // constant-time response to avoid user enumeration
      await new Promise((r) => setTimeout(r, 300));
      return NextResponse.json({ error: "Nieprawidłowy email lub hasło" }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Nieprawidłowy email lub hasło" }, { status: 401 });
    }

    const token = await createShopToken(user);
    const res = NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });

    res.cookies.set("motofan-shop-user", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (e) {
    console.error("login error", e);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
