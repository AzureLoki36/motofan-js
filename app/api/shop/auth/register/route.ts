// POST /api/shop/auth/register
import { NextRequest, NextResponse } from "next/server";
import { readUsers, writeUsers, generateId } from "@/lib/shop-db";
import { hashPassword, validateEmail, validatePassword, createShopToken, SHOP_COOKIE } from "@/lib/shop-auth";
import type { ShopUser } from "@/lib/shop-types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, phone } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "Wymagane pola: email, hasło, imię, nazwisko" }, { status: 400 });
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Nieprawidłowy adres e-mail" }, { status: 400 });
    }
    const pwdError = validatePassword(password);
    if (pwdError) return NextResponse.json({ error: pwdError }, { status: 400 });

    const users = await readUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: "Konto z tym adresem e-mail już istnieje" }, { status: 409 });
    }

    const now = new Date().toISOString();
    const newUser: ShopUser = {
      id: generateId(),
      email: email.trim().toLowerCase(),
      passwordHash: await hashPassword(password),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone?.trim(),
      role: "customer",
      addresses: [],
      createdAt: now,
      updatedAt: now,
    };

    await writeUsers([...users, newUser]);

    const token = await createShopToken(newUser);
    const res = NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
    }, { status: 201 });

    res.cookies.set("motofan-shop-user", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;
  } catch (e) {
    console.error("register error", e);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
