// POST /api/shop/payment/create-intent
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { readProducts } from "@/lib/shop-db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-05-28.basil" });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, currency = "pln", orderId } = body;

    if (!items?.length) return NextResponse.json({ error: "Brak produktów" }, { status: 400 });

    const allProducts = await readProducts();
    let amount = 0;
    for (const item of items) {
      const product = allProducts.find((p) => p.id === item.productId);
      if (!product || product.status !== "active") {
        return NextResponse.json({ error: `Produkt ${item.productId} niedostępny` }, { status: 400 });
      }
      amount += product.price * item.quantity;
    }

    // Shipping: free over 500 PLN
    if (amount < 50000) amount += 1499;

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { orderId: orderId ?? "" },
    });

    return NextResponse.json({ clientSecret: intent.client_secret, amount });
  } catch (e) {
    console.error("stripe intent error", e);
    return NextResponse.json({ error: "Błąd płatności" }, { status: 500 });
  }
}
