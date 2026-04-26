// GET /api/shop/payment/stripe-config
// Returns the Stripe publishable key (safe to expose publicly)
import { NextResponse } from "next/server";

export async function GET() {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? null;
  return NextResponse.json({ publishableKey });
}
