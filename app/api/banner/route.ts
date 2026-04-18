import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readBannerItems, writeBannerItems, BannerItem } from "@/lib/banner";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await readBannerItems();
  items.sort((a, b) => a.order - b.order);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const items = await readBannerItems();

  const newItem: BannerItem = {
    id: crypto.randomUUID(),
    img: (body.img || "").trim(),
    alt: (body.alt || "").trim(),
    brand: (body.brand || "").trim(),
    cat: (body.cat || "").trim(),
    order: body.order != null ? Number(body.order) : items.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  items.push(newItem);
  await writeBannerItems(items);

  return NextResponse.json(newItem, { status: 201 });
}
