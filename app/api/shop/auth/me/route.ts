// POST /api/shop/auth/logout
// GET  /api/shop/auth/me
// PATCH /api/shop/auth/me  (update profile & addresses)
import { NextRequest, NextResponse } from "next/server";
import { getShopSession } from "@/lib/shop-auth";
import { getUserById, readUsers, writeUsers } from "@/lib/shop-db";
import { toPublicUser } from "@/lib/shop-auth";
import type { Address } from "@/lib/shop-types";

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

export async function PATCH(req: NextRequest) {
  const session = await getShopSession();
  if (!session) {
    return NextResponse.json({ error: "Nie zalogowany" }, { status: 401 });
  }
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === session.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Użytkownik nie istnieje" }, { status: 404 });
  }
  const body = await req.json();
  const user = { ...users[idx] };

  if (body.addresses !== undefined) {
    // Ensure exactly one default
    const addrs: Address[] = body.addresses;
    const hasDefault = addrs.some((a) => a.isDefault);
    if (addrs.length > 0 && !hasDefault) addrs[0].isDefault = true;
    user.addresses = addrs;
  }
  if (typeof body.phone === "string") user.phone = body.phone.trim() || undefined;
  if (typeof body.firstName === "string" && body.firstName.trim()) user.firstName = body.firstName.trim();
  if (typeof body.lastName === "string" && body.lastName.trim()) user.lastName = body.lastName.trim();

  user.updatedAt = new Date().toISOString();
  users[idx] = user;
  await writeUsers(users);
  return NextResponse.json(toPublicUser(user));
}

