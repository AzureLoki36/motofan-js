// ===================================================
//  MOTOFAN SKLEP ONLINE – data layer (Vercel Blob)
// ===================================================
import { list, put, del } from "@vercel/blob";
import type { Product, ShopUser, Order, MarketplaceTokens } from "./shop-types";

// ── Generic blob helpers ──────────────────────────────

async function readBlob<T>(prefix: string, fallback: T): Promise<T> {
  try {
    const { blobs } = await list({ prefix });
    if (!blobs.length) return fallback;
    const res = await fetch(blobs[0].url, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    });
    if (!res.ok) return fallback;
    return res.json() as Promise<T>;
  } catch {
    return fallback;
  }
}

async function writeBlob(prefix: string, data: unknown): Promise<void> {
  const { blobs } = await list({ prefix });
  for (const b of blobs) await del(b.url);
  await put(prefix, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

// ── Products ──────────────────────────────────────────
const PRODUCTS_KEY = "shop/products.json";

export async function readProducts(): Promise<Product[]> {
  return readBlob<Product[]>(PRODUCTS_KEY, []);
}

export async function writeProducts(data: Product[]): Promise<void> {
  await writeBlob(PRODUCTS_KEY, data);
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find((p) => p.id === id) ?? null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await readProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

// ── Users ─────────────────────────────────────────────
const USERS_KEY = "shop/users.json";

export async function readUsers(): Promise<ShopUser[]> {
  return readBlob<ShopUser[]>(USERS_KEY, []);
}

export async function writeUsers(data: ShopUser[]): Promise<void> {
  await writeBlob(USERS_KEY, data);
}

export async function getUserByEmail(email: string): Promise<ShopUser | null> {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function getUserById(id: string): Promise<ShopUser | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) ?? null;
}

// ── Orders ────────────────────────────────────────────
const ORDERS_KEY = "shop/orders.json";

export async function readOrders(): Promise<Order[]> {
  return readBlob<Order[]>(ORDERS_KEY, []);
}

export async function writeOrders(data: Order[]): Promise<void> {
  await writeBlob(ORDERS_KEY, data);
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const orders = await readOrders();
  return orders.filter((o) => o.userId === userId);
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await readOrders();
  return orders.find((o) => o.id === id) ?? null;
}

// ── Marketplace tokens ────────────────────────────────
const MARKETPLACE_KEY = "shop/marketplace-tokens.json";

export async function readMarketplaceTokens(): Promise<MarketplaceTokens> {
  return readBlob<MarketplaceTokens>(MARKETPLACE_KEY, {});
}

export async function writeMarketplaceTokens(data: MarketplaceTokens): Promise<void> {
  await writeBlob(MARKETPLACE_KEY, data);
}

// ── ID generators ─────────────────────────────────────
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function generateOrderNumber(orders: Order[]): string {
  const year = new Date().getFullYear();
  const seq = String(orders.length + 1).padStart(5, "0");
  return `MF-${year}-${seq}`;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
