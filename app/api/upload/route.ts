import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const safeName = `upload-${Date.now()}.${ext.replace(/[^a-zA-Z0-9]/g, "")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(uploadDir, safeName), buffer);

  return NextResponse.json({ url: `/uploads/${safeName}` });
}
