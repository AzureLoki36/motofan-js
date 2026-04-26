import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { verifyShopToken } from "@/lib/shop-auth";

const SHOP_ADMIN_COOKIE = "motofan-shop-admin";

async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

async function requireShopAdmin(req: NextRequest): Promise<NextResponse | null> {
  const token = req.cookies.get(SHOP_ADMIN_COOKIE)?.value;
  if (!token) {
    // Redirect page requests, return 403 for API
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Brak dostępu – wymagane logowanie do panelu sklepu" }, { status: 403 });
    }
    const loginUrl = new URL("/sklep-online/adm/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  const payload = await verifyShopToken(token);
  if (!payload || payload.role !== "shop_admin") {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
    }
    const loginUrl = new URL("/sklep-online/adm/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // ── Existing admin routes ─────────────────────────────────

  // Protect upload (all methods)
  if (pathname.startsWith("/api/upload")) {
    const denied = await requireAdmin(req);
    if (denied) return denied;
  }

  // Protect content writes
  if (pathname.startsWith("/api/content") && method === "PUT") {
    const denied = await requireAdmin(req);
    if (denied) return denied;
  }

  // Protect banner writes
  if (pathname.startsWith("/api/banner") && (method === "POST" || method === "PUT" || method === "DELETE")) {
    const denied = await requireAdmin(req);
    if (denied) return denied;
  }

  // Protect motorcycle writes
  if (pathname.startsWith("/api/motorcycles") && (method === "POST" || method === "PUT" || method === "DELETE")) {
    const denied = await requireAdmin(req);
    if (denied) return denied;
  }

  // ── Shop admin routes ─────────────────────────────────────

  // Protect shop admin panel pages (except login page)
  if (pathname.startsWith("/sklep-online/adm") && !pathname.startsWith("/sklep-online/adm/login")) {
    const denied = await requireShopAdmin(req);
    if (denied) return denied;
  }

  // Protect shop product/order write APIs via shop admin cookie
  if (
    (pathname.startsWith("/api/shop/products") && (method === "POST" || method === "PUT" || method === "DELETE")) ||
    (pathname.startsWith("/api/shop/orders") && method === "PUT") ||
    pathname.startsWith("/api/shop/marketplace/tokens") ||
    pathname.startsWith("/api/shop/marketplace/sync")
  ) {
    // These routes handle their own auth via isShopAdmin() — no redirect needed here
    // Middleware just passes through; the route handler enforces admin check
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/upload/:path*",
    "/api/content/:path*",
    "/api/banner/:path*",
    "/api/motorcycles/:path*",
    "/sklep-online/adm",
    "/sklep-online/adm/:path*",
  ],
};
