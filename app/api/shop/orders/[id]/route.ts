// GET /api/shop/orders/[id]
// PUT /api/shop/orders/[id]  – admin: update status/tracking
import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders } from "@/lib/shop-db";
import { getShopSession, isShopAdmin } from "@/lib/shop-auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await isShopAdmin();
  const session = await getShopSession();
  if (!admin && !session) return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  const orders = await readOrders();
  const order = orders.find((o) => o.id === id || o.orderNumber === id);
  if (!order) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  // Non-admin can only view own orders
  if (!admin && order.userId !== session!.id) {
    return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
  }

  return NextResponse.json(order);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isShopAdmin())) return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });

  const { id } = await params;
  const orders = await readOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });

  try {
    const body = await req.json();
    const allowed = ["status", "paymentStatus", "trackingNumber", "notes"] as const;
    const updates: Partial<typeof orders[0]> = {};
    for (const k of allowed) {
      if (body[k] !== undefined) (updates as Record<string, unknown>)[k] = body[k];
    }
    orders[idx] = { ...orders[idx], ...updates, updatedAt: new Date().toISOString() };
    await writeOrders(orders);
    return NextResponse.json(orders[idx]);
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
