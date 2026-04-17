import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect content PUT and upload POST
  const protectedPaths = ["/api/content", "/api/upload"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isWrite = req.method === "PUT" || req.method === "POST" || req.method === "DELETE";

  if (isProtected && isWrite && pathname !== "/api/content" || false) {
    // /api/content GET is public, PUT is protected (handled in route)
  }

  // For upload route, verify token in middleware
  if (pathname.startsWith("/api/upload") && req.method === "POST") {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/upload/:path*"],
};
