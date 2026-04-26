// GET  /api/shop/payment/saved-cards  – list user's saved cards
// POST /api/shop/payment/saved-cards  – create Stripe SetupIntent
// PUT  /api/shop/payment/saved-cards  – confirm & save card after SetupIntent
// DELETE /api/shop/payment/saved-cards?pmId=xxx – remove saved card

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getShopSession } from "@/lib/shop-auth";
import { getUserById, readUsers, writeUsers } from "@/lib/shop-db";
import type { SavedCard } from "@/lib/shop-types";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

// ── GET: return saved cards ───────────────────────────
export async function GET() {
  const session = await getShopSession();
  if (!session) return NextResponse.json({ error: "Nie zalogowany" }, { status: 401 });

  const user = await getUserById(session.id);
  if (!user) return NextResponse.json({ error: "Użytkownik nie istnieje" }, { status: 404 });

  return NextResponse.json({ cards: user.savedCards ?? [] });
}

// ── POST: create SetupIntent → return clientSecret ────
export async function POST() {
  const session = await getShopSession();
  if (!session) return NextResponse.json({ error: "Nie zalogowany" }, { status: 401 });

  let stripe: Stripe;
  try { stripe = getStripe(); } catch {
    return NextResponse.json({ error: "Płatności kartą nie są skonfigurowane. Skontaktuj się z obsługą sklepu." }, { status: 503 });
  }

  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === session.id);
  if (idx === -1) return NextResponse.json({ error: "Użytkownik nie istnieje" }, { status: 404 });

  let customerId = users[idx].stripeCustomerId;

  // Create Stripe customer if not exists
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: users[idx].email,
      name: `${users[idx].firstName} ${users[idx].lastName}`,
      metadata: { motofanUserId: users[idx].id },
    });
    customerId = customer.id;
    users[idx] = { ...users[idx], stripeCustomerId: customerId };
    await writeUsers(users);
  }

  const setupIntent = await stripe.setupIntents.create({
    customer: customerId,
    payment_method_types: ["card"],
  });

  return NextResponse.json({ clientSecret: setupIntent.client_secret });
}

// ── PUT: save confirmed PaymentMethod to user profile ─
export async function PUT(req: NextRequest) {
  const session = await getShopSession();
  if (!session) return NextResponse.json({ error: "Nie zalogowany" }, { status: 401 });

  let stripe: Stripe;
  try { stripe = getStripe(); } catch {
    return NextResponse.json({ error: "Stripe nie skonfigurowany" }, { status: 503 });
  }

  const { paymentMethodId, setDefault } = await req.json();
  if (!paymentMethodId) return NextResponse.json({ error: "Brak paymentMethodId" }, { status: 400 });

  // Fetch PM details from Stripe
  const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
  if (!pm.card) return NextResponse.json({ error: "Brak danych karty" }, { status: 400 });

  const newCard: SavedCard = {
    stripePaymentMethodId: pm.id,
    brand: pm.card.brand,
    last4: pm.card.last4,
    expMonth: pm.card.exp_month,
    expYear: pm.card.exp_year,
    isDefault: !!setDefault,
  };

  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === session.id);
  if (idx === -1) return NextResponse.json({ error: "Użytkownik nie istnieje" }, { status: 404 });

  let cards: SavedCard[] = users[idx].savedCards ?? [];
  // If already saved, skip duplicate
  if (cards.find((c) => c.stripePaymentMethodId === pm.id)) {
    return NextResponse.json({ cards });
  }
  if (setDefault) cards = cards.map((c) => ({ ...c, isDefault: false }));
  if (cards.length === 0) newCard.isDefault = true; // first card is default

  cards = [...cards, newCard];
  users[idx] = { ...users[idx], savedCards: cards, updatedAt: new Date().toISOString() };
  await writeUsers(users);

  return NextResponse.json({ cards });
}

// ── DELETE: remove saved card ─────────────────────────
export async function DELETE(req: NextRequest) {
  const session = await getShopSession();
  if (!session) return NextResponse.json({ error: "Nie zalogowany" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const pmId = searchParams.get("pmId");
  if (!pmId) return NextResponse.json({ error: "Brak pmId" }, { status: 400 });

  let stripe: Stripe;
  try {
    stripe = getStripe();
    await stripe.paymentMethods.detach(pmId);
  } catch { /* If Stripe not configured or detach fails, still remove from profile */ }

  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === session.id);
  if (idx === -1) return NextResponse.json({ error: "Użytkownik nie istnieje" }, { status: 404 });

  let cards = (users[idx].savedCards ?? []).filter((c) => c.stripePaymentMethodId !== pmId);
  // Ensure at least one default
  if (cards.length > 0 && !cards.find((c) => c.isDefault)) {
    cards[0] = { ...cards[0], isDefault: true };
  }
  users[idx] = { ...users[idx], savedCards: cards, updatedAt: new Date().toISOString() };
  await writeUsers(users);

  return NextResponse.json({ cards });
}
