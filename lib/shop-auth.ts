// ===================================================
//  MOTOFAN SKLEP ONLINE – auth helpers (shop users)
// ===================================================
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import type { ShopUser, PublicUser } from "./shop-types";

const SHOP_COOKIE = "motofan-shop-user";
const SHOP_ADMIN_COOKIE = "motofan-shop-admin";
const BCRYPT_ROUNDS = 12;

function getSecret(): Uint8Array {
  const s = process.env.SHOP_JWT_SECRET ?? process.env.ADMIN_SECRET;
  if (!s) throw new Error("SHOP_JWT_SECRET env variable is required");
  return new TextEncoder().encode(s);
}

// ── Password helpers ──────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ── JWT helpers ───────────────────────────────────────
export async function createShopToken(user: ShopUser): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function createShopAdminToken(): Promise<string> {
  return new SignJWT({ role: "shop_admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSecret());
}

export async function verifyShopToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

// ── Cookie helpers ────────────────────────────────────
export async function getShopSession(): Promise<{ id: string; email: string; role: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SHOP_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifyShopToken(token);
  if (!payload?.sub) return null;
  return {
    id: payload.sub as string,
    email: payload.email as string,
    role: payload.role as string,
  };
}

export async function isShopAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SHOP_ADMIN_COOKIE)?.value;
  if (!token) return false;
  const payload = await verifyShopToken(token);
  return payload?.role === "shop_admin";
}

export { SHOP_COOKIE, SHOP_ADMIN_COOKIE };

// ── Validation ────────────────────────────────────────
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return "Hasło musi mieć co najmniej 8 znaków";
  if (!/[A-Z]/.test(password)) return "Hasło musi zawierać wielką literę";
  if (!/[0-9]/.test(password)) return "Hasło musi zawierać cyfrę";
  return null;
}

// ── Sanitize for public response ─────────────────────
export function toPublicUser(user: ShopUser): PublicUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...pub } = user;
  return pub;
}
