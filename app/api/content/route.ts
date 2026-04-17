import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readContent, writeContent } from "@/lib/content";

export async function GET() {
  const data = readContent();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  writeContent(body);
  return NextResponse.json({ ok: true });
}
