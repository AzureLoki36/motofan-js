// POST /api/shop/marketplace/sync/[platform]
// Body: { productId?: string }  – sync one or all products
import { NextRequest, NextResponse } from "next/server";
import { readProducts, writeProducts, readMarketplaceTokens } from "@/lib/shop-db";
import { isShopAdmin } from "@/lib/shop-auth";
import {
  allegroListProduct, allegroDelistProduct,
  ebayListProduct, ebayDelistProduct,
  olxListProduct, olxDelistProduct,
  amazonListProduct,
} from "@/lib/marketplace";
import type { Product } from "@/lib/shop-types";

type Platform = "allegro" | "ebay" | "olx" | "amazon";

async function syncOne(product: Product, platform: Platform, tokens: Awaited<ReturnType<typeof readMarketplaceTokens>>) {
  switch (platform) {
    case "allegro": return allegroListProduct(product, tokens.allegro);
    case "ebay":    return ebayListProduct(product, tokens.ebay);
    case "olx":     return olxListProduct(product, tokens.olx);
    case "amazon":  return amazonListProduct(product, tokens.amazon);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ platform: string }> }
) {
  if (!(await isShopAdmin())) return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });

  const { platform } = await params;
  const validPlatforms: Platform[] = ["allegro", "ebay", "olx", "amazon"];
  if (!validPlatforms.includes(platform as Platform)) {
    return NextResponse.json({ error: "Nieznana platforma" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const { productId, action = "list" } = body;

  const tokens = await readMarketplaceTokens();
  let products = await readProducts();
  const targets = productId
    ? products.filter((p) => p.id === productId)
    : products.filter((p) => p.status === "active");

  if (!targets.length) return NextResponse.json({ error: "Brak produktów do synchronizacji" }, { status: 400 });

  const results = [];
  for (const product of targets) {
    let result;
    if (action === "delist") {
      const id = platform === "allegro" ? product.allegroId
               : platform === "ebay"    ? product.ebayId
               : platform === "olx"     ? product.olxId
               : undefined;
      if (!id) {
        results.push({ id: product.id, ok: false, error: "Produkt nie jest wystawiony na tej platformie" });
        continue;
      }
      switch (platform as Platform) {
        case "allegro": result = await allegroDelistProduct(id, tokens.allegro); break;
        case "ebay":    result = await ebayDelistProduct(id, tokens.ebay); break;
        case "olx":     result = await olxDelistProduct(id, tokens.olx); break;
        default:        result = { ok: false, error: "Delist not supported" };
      }
    } else {
      result = await syncOne(product, platform as Platform, tokens);
    }

    // Save marketplace ID back to product
    if (result?.ok && result.id && action !== "delist") {
      products = products.map((p) => {
        if (p.id !== product.id) return p;
        return {
          ...p,
          allegroId: platform === "allegro" ? result!.id : p.allegroId,
          ebayId:    platform === "ebay"    ? result!.id : p.ebayId,
          olxId:     platform === "olx"     ? result!.id : p.olxId,
          updatedAt: new Date().toISOString(),
        };
      });
    }
    results.push({ id: product.id, name: product.name, ...result });
  }

  await writeProducts(products);
  return NextResponse.json({ platform, results });
}
