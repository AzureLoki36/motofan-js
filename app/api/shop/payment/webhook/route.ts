// POST /api/shop/payment/webhook  – Stripe webhook
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { readOrders, writeOrders } from "@/lib/shop-db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-05-28.basil" });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const orderId = intent.metadata?.orderId;
    if (orderId) {
      const orders = await readOrders();
      const idx = orders.findIndex((o) => o.id === orderId);
      if (idx !== -1) {
        orders[idx] = {
          ...orders[idx],
          status: "paid",
          paymentStatus: "paid",
          stripePaymentIntentId: intent.id,
          updatedAt: new Date().toISOString(),
        };
        await writeOrders(orders);
      }
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const orderId = intent.metadata?.orderId;
    if (orderId) {
      const orders = await readOrders();
      const idx = orders.findIndex((o) => o.id === orderId);
      if (idx !== -1) {
        orders[idx] = { ...orders[idx], paymentStatus: "failed", updatedAt: new Date().toISOString() };
        await writeOrders(orders);
      }
    }
  }

  return NextResponse.json({ received: true });
}
