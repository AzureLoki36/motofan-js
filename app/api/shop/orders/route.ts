// GET  /api/shop/orders   – user: own orders; admin: all orders
// POST /api/shop/orders   – create order (authenticated or guest)
import { NextRequest, NextResponse } from "next/server";
import { readOrders, writeOrders, generateId, generateOrderNumber, getProductById, readProducts, writeProducts } from "@/lib/shop-db";
import { getShopSession, isShopAdmin } from "@/lib/shop-auth";
import type { Order, OrderItem } from "@/lib/shop-types";

export async function GET() {
  const admin = await isShopAdmin();
  const session = await getShopSession();
  if (!admin && !session) return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

  const orders = await readOrders();
  if (admin) return NextResponse.json(orders);

  // Return only this user's orders
  return NextResponse.json(orders.filter((o) => o.userId === session!.id));
}

export async function POST(req: NextRequest) {
  try {
    const session = await getShopSession();
    const body = await req.json();
    const { items, shippingAddress, billingAddress, paymentMethod, notes, guestEmail } = body;

    if (!items?.length) return NextResponse.json({ error: "Brak produktów w zamówieniu" }, { status: 400 });
    if (!shippingAddress) return NextResponse.json({ error: "Brak adresu dostawy" }, { status: 400 });
    if (!paymentMethod) return NextResponse.json({ error: "Brak metody płatności" }, { status: 400 });
    if (!session && !guestEmail) return NextResponse.json({ error: "Podaj email gościa" }, { status: 400 });

    // Validate and price each item from live DB
    const allProducts = await readProducts();
    const orderItems: OrderItem[] = [];
    const stockUpdates: Array<{ id: string; newStock: number }> = [];

    for (const item of items) {
      const product = allProducts.find((p) => p.id === item.productId);
      if (!product || product.status !== "active") {
        return NextResponse.json({ error: `Produkt ${item.productId} niedostępny` }, { status: 400 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Niewystarczający stan magazynowy: ${product.name}` }, { status: 400 });
      }
      orderItems.push({
        productId: product.id,
        name: product.name,
        sku: product.sku,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: product.price * item.quantity,
        image: product.images[0]?.url,
      });
      stockUpdates.push({ id: product.id, newStock: product.stock - item.quantity });
    }

    const subtotal = orderItems.reduce((s, i) => s + i.totalPrice, 0);
    const shippingCost = subtotal >= 50000 ? 0 : 1499; // free shipping over 500 PLN
    const discount = 0;
    const total = subtotal + shippingCost - discount;

    const orders = await readOrders();
    const now = new Date().toISOString();
    const newOrder: Order = {
      id: generateId(),
      orderNumber: generateOrderNumber(orders),
      userId: session?.id,
      guestEmail: session ? undefined : guestEmail,
      items: orderItems,
      shippingAddress,
      billingAddress,
      subtotal,
      shippingCost,
      discount,
      total,
      status: paymentMethod === "bank_transfer" ? "awaiting_payment" : "pending",
      paymentMethod,
      paymentStatus: "pending",
      notes: notes?.trim(),
      createdAt: now,
      updatedAt: now,
    };

    await writeOrders([...orders, newOrder]);

    // Decrement stock
    const updatedProducts = allProducts.map((p) => {
      const upd = stockUpdates.find((u) => u.id === p.id);
      return upd ? { ...p, stock: upd.newStock, updatedAt: now } : p;
    });
    await writeProducts(updatedProducts);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (e) {
    console.error("create order error", e);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
