/**
 * BEZPIECZNE PRZECHOWYWANIE LOGINU/HASLA ADMINA
 *
 * - Haslo NIGDY nie jest przechowywane jawnie - tylko hash bcrypt (cost 12,
 *   ~250 ms na werifikacje, milardy lat na brute-force dla 10+ znakow).
 * - Blob "admin-credentials.json" jest prywatny (access:private) - dostepny
 *   tylko serwerowi z tokenem BLOB_READ_WRITE_TOKEN.
 * - Brak cache CDN (cacheControlMaxAge:0).
 * - Jesli blob nie istnieje, system uzywa ADMIN_USERNAME/ADMIN_PASSWORD z env
 *   (czyli oryginalne dane "fabryczne"). Po pierwszej zmianie z UI, blob
 *   przejmuje pierwszenstwo i env staje sie nieuzywany.
 * - updatedAt jest porownywany z `iat` w JWT - stare cookie po zmianie hasla
 *   tracaja waznosc natychmiast.
 */

import { put, list, del } from "@vercel/blob";
import bcrypt from "bcryptjs";

const BLOB_NAME = "admin-credentials.json";
const SALT_ROUNDS = 12;

export interface StoredCredentials {
  username: string;
  passwordHash: string;
  updatedAt: string; // ISO 8601
}

async function blobList() {
  return list({ prefix: BLOB_NAME });
}

export async function readStoredCredentials(): Promise<StoredCredentials | null> {
  try {
    const { blobs } = await blobList();
    if (!blobs.length) return null;
    const newest = [...blobs].sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    const url = newest.url + (newest.url.includes("?") ? "&" : "?") + "_t=" + Date.now();
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        "Cache-Control": "no-cache",
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as StoredCredentials;
    if (!data?.username || !data?.passwordHash) return null;
    return data;
  } catch {
    return null;
  }
}

export async function writeStoredCredentials(data: StoredCredentials): Promise<void> {
  try {
    const { blobs } = await blobList();
    if (blobs.length > 0) await del(blobs.map((b) => b.url));
  } catch { /* ignore */ }
  await put(BLOB_NAME, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

/** Zwraca hash bcrypt dla danego hasla (SALT_ROUNDS=12). */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

/** Stalo-czasowo porownuje haslo z hashem. */
export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** Aktualizuje login/haslo. Jesli nie podasz nowego hasla, zachowuje stare. */
export async function updateCredentials(opts: {
  newUsername?: string;
  newPlainPassword?: string;
  currentForKeeping?: { username: string; passwordHash: string };
}): Promise<StoredCredentials> {
  const base = opts.currentForKeeping;
  const username = (opts.newUsername ?? base?.username ?? "").trim();
  if (!username) throw new Error("Login wymagany");
  let passwordHash: string;
  if (opts.newPlainPassword) {
    passwordHash = await hashPassword(opts.newPlainPassword);
  } else if (base?.passwordHash) {
    passwordHash = base.passwordHash;
  } else {
    throw new Error("Nie ma czego zachowac jako hasla");
  }
  const next: StoredCredentials = {
    username,
    passwordHash,
    updatedAt: new Date().toISOString(),
  };
  await writeStoredCredentials(next);
  return next;
}
