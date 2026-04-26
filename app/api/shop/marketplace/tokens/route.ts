// GET /api/shop/marketplace/tokens    – admin: get tokens (masked)
// PUT /api/shop/marketplace/tokens    – admin: save tokens
import { NextRequest, NextResponse } from "next/server";
import { readMarketplaceTokens, writeMarketplaceTokens } from "@/lib/shop-db";
import { isShopAdmin } from "@/lib/shop-auth";
import type { MarketplaceTokens } from "@/lib/shop-types";

function maskTokens(t: MarketplaceTokens): MarketplaceTokens {
  const mask = (s?: string) => s ? `${s.slice(0, 4)}***` : undefined;
  return {
    allegro: t.allegro ? {
      ...t.allegro,
      clientSecret: mask(t.allegro.clientSecret)!,
      accessToken: mask(t.allegro.accessToken),
      refreshToken: mask(t.allegro.refreshToken),
    } : undefined,
    ebay: t.ebay ? {
      ...t.ebay,
      certId: mask(t.ebay.certId)!,
      authToken: mask(t.ebay.authToken),
      refreshToken: mask(t.ebay.refreshToken),
    } : undefined,
    olx: t.olx ? {
      ...t.olx,
      clientSecret: mask(t.olx.clientSecret)!,
      accessToken: mask(t.olx.accessToken),
      refreshToken: mask(t.olx.refreshToken),
    } : undefined,
    amazon: t.amazon ? {
      ...t.amazon,
      secretKey: mask(t.amazon.secretKey)!,
    } : undefined,
  };
}

export async function GET() {
  if (!(await isShopAdmin())) return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
  const tokens = await readMarketplaceTokens();
  return NextResponse.json(maskTokens(tokens));
}

export async function PUT(req: NextRequest) {
  if (!(await isShopAdmin())) return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
  try {
    const body: MarketplaceTokens = await req.json();
    const current = await readMarketplaceTokens();

    // Deep merge – don't overwrite existing secrets if new value is masked
    const merge = <T extends Record<string, unknown>>(cur: T | undefined, upd: T | undefined): T | undefined => {
      if (!upd) return cur;
      if (!cur) return upd;
      const result: Record<string, unknown> = { ...cur };
      for (const [k, v] of Object.entries(upd)) {
        if (typeof v === "string" && v.includes("***")) continue; // skip masked
        if (v !== undefined && v !== null) result[k] = v;
      }
      return result as T;
    };

    const merged: MarketplaceTokens = {
      allegro: merge(current.allegro, body.allegro),
      ebay: merge(current.ebay, body.ebay),
      olx: merge(current.olx, body.olx),
      amazon: merge(current.amazon, body.amazon),
    };

    await writeMarketplaceTokens(merged);
    return NextResponse.json(maskTokens(merged));
  } catch {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
