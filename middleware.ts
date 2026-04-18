import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/upload/:path*", "/api/content/:path*", "/api/banner/:path*", "/api/motorcycles/:path*"],
};
