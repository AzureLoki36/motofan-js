import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import {
  readStoredCredentials,
  comparePassword,
} from "./auth-credentials";

function getSecret() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET env variable is required");
  return new TextEncoder().encode(secret);
}

const COOKIE_NAME = "motofan-admin";

export async function createToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  if (payload?.role !== "admin") return false;
  // Uniewaznij token wystawiony PRZED zmiana danych logowania: jezeli admin
  // zmienil login/haslo, stare ciasteczko traci waznosc natychmiast.
  const stored = await readStoredCredentials();
  if (stored) {
    const iat = typeof payload.iat === "number" ? payload.iat : 0;
    const updatedAt = Math.floor(new Date(stored.updatedAt).getTime() / 1000);
    if (iat < updatedAt) return false;
  }
  return true;
}

/**
 * Zwraca aktualnego usera admina:
 * - jesli zapisany w blob -> z blob
 * - inaczej fallback na env ADMIN_USERNAME (oryginalne dane "fabryczne")
 */
export async function getCurrentAdminUsername(): Promise<string> {
  const stored = await readStoredCredentials();
  if (stored?.username) return stored.username;
  return getAdminUsername();
}

/**
 * Weryfikuje (username, password). Bcrypt na hashu z blob, w przeciwnym
 * razie safeCompare wobec env. Zawsze stalo-czasowo (bcrypt jest stalo-czasowy).
 */
export async function verifyCredentialsPlain(
  username: string,
  password: string
): Promise<boolean> {
  if (!username || !password) return false;
  const stored = await readStoredCredentials();
  if (stored) {
    const userOk = safeCompare(username, stored.username);
    // Zawsze wykonaj bcrypt zeby wyrownac czas i nie ujawniac istnienia loginu
    const passOk = await comparePassword(password, stored.passwordHash);
    return userOk && passOk;
  }
  return (
    safeCompare(username, getAdminUsername()) &&
    safeCompare(password, getAdminPassword())
  );
}

export function getAdminUsername(): string {
  const u = process.env.ADMIN_USERNAME;
  if (!u) throw new Error("ADMIN_USERNAME env variable is required");
  return u.trim();
}

export function getAdminPassword(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) throw new Error("ADMIN_PASSWORD env variable is required");
  return p.trim();
}

/** Constant-time string comparison to prevent timing attacks */
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const encoder = new TextEncoder();
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);
  let result = 0;
  for (let i = 0; i < bufA.length; i++) {
    result |= bufA[i] ^ bufB[i];
  }
  return result === 0;
}

export { COOKIE_NAME };
