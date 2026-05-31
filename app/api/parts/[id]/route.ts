import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readParts, writeParts } from "@/lib/parts";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const parts = await readParts();
  const idx = parts.findIndex((p) => p.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  parts[idx] = {
    ...parts[idx],
    name: typeof body.name === "string" ? body.name.trim() : parts[idx].name,
    brand: typeof body.brand === "string" ? body.brand.trim() : parts[idx].brand,
    category: body.category ?? parts[idx].category,
    condition: body.condition ?? parts[idx].condition,
    price: body.price != null ? Math.max(0, Number(body.price)) : parts[idx].price,
    description: typeof body.description === "string" ? body.description.trim() : parts[idx].description,
    fits: typeof body.fits === "string" ? body.fits.trim() : parts[idx].fits,
    images: Array.isArray(body.images)
      ? body.images.filter((u: unknown) => typeof u === "string")
      : parts[idx].images,
    available: typeof body.available === "boolean" ? body.available : parts[idx].available,
    id: parts[idx].id,
    createdAt: parts[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };

  await writeParts(parts);
  return NextResponse.json(parts[idx]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const parts = await readParts();
  const filtered = parts.filter((p) => p.id !== id);

  if (filtered.length === parts.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await writeParts(filtered);
  return NextResponse.json({ success: true });
}
