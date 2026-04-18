import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readBannerItems, writeBannerItems } from "@/lib/banner";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const items = await readBannerItems();
  const idx = items.findIndex((i) => i.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  items[idx] = {
    ...items[idx],
    img: typeof body.img === "string" ? body.img.trim() : items[idx].img,
    alt: typeof body.alt === "string" ? body.alt.trim() : items[idx].alt,
    brand: typeof body.brand === "string" ? body.brand.trim() : items[idx].brand,
    cat: typeof body.cat === "string" ? body.cat.trim() : items[idx].cat,
    order: body.order != null ? Number(body.order) : items[idx].order,
    id: items[idx].id,
    createdAt: items[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };

  await writeBannerItems(items);
  return NextResponse.json(items[idx]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const items = await readBannerItems();
  const filtered = items.filter((i) => i.id !== id);

  if (filtered.length === items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await writeBannerItems(filtered);
  return NextResponse.json({ success: true });
}
