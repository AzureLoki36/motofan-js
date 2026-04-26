// GET    /api/shop/products/[id]
// PUT    /api/shop/products/[id]  – admin
// DELETE /api/shop/products/[id]  – admin
import { NextRequest, NextResponse } from "next/server";
import { readProducts, writeProducts } from "@/lib/shop-db";
import { isShopAdmin } from "@/lib/shop-auth";
import { slugify } from "@/lib/shop-db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await readProducts();
  const product = products.find((p) => p.id === id || p.slug === id);
  if (!product) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  const { allegroId: _, ebayId: __, olxId: ___, ...pub } = product;
  return NextResponse.json(pub);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isShopAdmin())) return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });

  const { id } = await params;
  const products = await readProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  try {
    const body = await req.json();
    const updated = {
      ...products[idx],
      ...body,
      id: products[idx].id,              // immutable
      createdAt: products[idx].createdAt, // immutable
      updatedAt: new Date().toISOString(),
    };

    if (body.price !== undefined) updated.price = Math.round(Number(body.price) * 100);
    if (body.comparePrice !== undefined) updated.comparePrice = Math.round(Number(body.comparePrice) * 100);
    if (body.name && body.name !== products[idx].name) updated.slug = slugify(body.name);

    products[idx] = updated;
    await writeProducts(products);
    return NextResponse.json(updated);
  } catch (e) {
    console.error("update product error", e);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isShopAdmin())) return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });

  const { id } = await params;
  const products = await readProducts();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  await writeProducts(next);
  return NextResponse.json({ ok: true });
}
