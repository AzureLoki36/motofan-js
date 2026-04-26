// ===================================================
//  MOTOFAN SKLEP ONLINE – marketplace integration stubs
//  Allegro, eBay, OLX, Amazon
// ===================================================
import type { Product, MarketplaceTokens } from "./shop-types";

// ── Shared result type ────────────────────────────────
export interface MarketplaceResult {
  ok: boolean;
  id?: string;
  error?: string;
}

// ── Allegro ───────────────────────────────────────────
export async function allegroListProduct(
  product: Product,
  tokens: MarketplaceTokens["allegro"]
): Promise<MarketplaceResult> {
  if (!tokens?.accessToken) return { ok: false, error: "Brak tokenu Allegro" };
  try {
    const body = {
      name: product.name,
      category: { id: "4029" }, // placeholder category
      description: { sections: [{ items: [{ type: "TEXT", content: product.description }] }] },
      parameters: [{ id: "11323", values: [product.brand] }],
      images: product.images.map((img) => ({ url: img.url })),
      selling: {
        price: { amount: (product.price / 100).toFixed(2), currency: "PLN" },
        startingPrice: product.comparePrice
          ? { amount: (product.comparePrice / 100).toFixed(2), currency: "PLN" }
          : undefined,
        quantity: { available: product.stock },
      },
      condition: product.condition === "new" ? "NEW" : "USED",
    };

    const res = await fetch("https://api.allegro.pl/sale/product-offers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        "Content-Type": "application/vnd.allegro.public.v1+json",
        Accept: "application/vnd.allegro.public.v1+json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: `Allegro API: ${res.status} ${err}` };
    }
    const data = await res.json();
    return { ok: true, id: data.id };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function allegroDelistProduct(
  allegroId: string,
  tokens: MarketplaceTokens["allegro"]
): Promise<MarketplaceResult> {
  if (!tokens?.accessToken) return { ok: false, error: "Brak tokenu Allegro" };
  try {
    const res = await fetch(`https://api.allegro.pl/sale/product-offers/${allegroId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokens.accessToken}` },
    });
    return { ok: res.ok, error: res.ok ? undefined : `Allegro: ${res.status}` };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function allegroRefreshToken(
  tokens: NonNullable<MarketplaceTokens["allegro"]>
): Promise<{ accessToken: string; refreshToken: string; expiresAt: string } | null> {
  if (!tokens.refreshToken) return null;
  try {
    const creds = Buffer.from(`${tokens.clientId}:${tokens.clientSecret}`).toString("base64");
    const res = await fetch("https://allegro.pl/auth/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${creds}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(tokens.refreshToken)}`,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: new Date(Date.now() + data.expires_in * 1000).toISOString(),
    };
  } catch {
    return null;
  }
}

// ── eBay ──────────────────────────────────────────────
export async function ebayListProduct(
  product: Product,
  tokens: MarketplaceTokens["ebay"]
): Promise<MarketplaceResult> {
  if (!tokens?.authToken) return { ok: false, error: "Brak tokenu eBay" };
  const sandbox = tokens.sandbox;
  const endpoint = sandbox
    ? "https://api.sandbox.ebay.com/ws/api.dll"
    : "https://api.ebay.com/ws/api.dll";

  try {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<AddFixedPriceItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials><eBayAuthToken>${tokens.authToken}</eBayAuthToken></RequesterCredentials>
  <Item>
    <Title>${product.name.slice(0, 80)}</Title>
    <Description><![CDATA[${product.description}]]></Description>
    <PrimaryCategory><CategoryID>6030</CategoryID></PrimaryCategory>
    <StartPrice>${(product.price / 100).toFixed(2)}</StartPrice>
    <Quantity>${product.stock}</Quantity>
    <ListingType>FixedPriceItem</ListingType>
    <ListingDuration>GTC</ListingDuration>
    <Currency>PLN</Currency>
    <ConditionID>${product.condition === "new" ? "1000" : "3000"}</ConditionID>
    <Country>PL</Country>
    <PostalCode>45-000</PostalCode>
  </Item>
</AddFixedPriceItemRequest>`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
        "X-EBAY-API-CALL-NAME": "AddFixedPriceItem",
        "X-EBAY-API-APP-NAME": tokens.appId,
        "X-EBAY-API-CERT-NAME": tokens.certId,
        "X-EBAY-API-DEV-NAME": tokens.devId,
        "X-EBAY-API-SITEID": "212", // Poland
        "X-EBAY-API-COMPATIBILITY-LEVEL": "967",
      },
      body: xml,
    });

    const text = await res.text();
    const match = text.match(/<ItemID>(\d+)<\/ItemID>/);
    if (match) return { ok: true, id: match[1] };
    return { ok: false, error: `eBay: ${text.slice(0, 200)}` };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function ebayDelistProduct(
  ebayId: string,
  tokens: MarketplaceTokens["ebay"]
): Promise<MarketplaceResult> {
  if (!tokens?.authToken) return { ok: false, error: "Brak tokenu eBay" };
  const sandbox = tokens.sandbox;
  const endpoint = sandbox
    ? "https://api.sandbox.ebay.com/ws/api.dll"
    : "https://api.ebay.com/ws/api.dll";

  try {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<EndFixedPriceItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials><eBayAuthToken>${tokens.authToken}</eBayAuthToken></RequesterCredentials>
  <ItemID>${ebayId}</ItemID>
  <EndingReason>NotAvailable</EndingReason>
</EndFixedPriceItemRequest>`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/xml",
        "X-EBAY-API-CALL-NAME": "EndFixedPriceItem",
        "X-EBAY-API-APP-NAME": tokens.appId,
        "X-EBAY-API-CERT-NAME": tokens.certId,
        "X-EBAY-API-DEV-NAME": tokens.devId,
        "X-EBAY-API-SITEID": "212",
        "X-EBAY-API-COMPATIBILITY-LEVEL": "967",
      },
      body: xml,
    });

    const text = await res.text();
    return { ok: res.ok && text.includes("Success"), error: res.ok ? undefined : text.slice(0, 200) };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// ── OLX ──────────────────────────────────────────────
export async function olxListProduct(
  product: Product,
  tokens: MarketplaceTokens["olx"]
): Promise<MarketplaceResult> {
  if (!tokens?.accessToken) return { ok: false, error: "Brak tokenu OLX" };
  try {
    const body = {
      title: product.name.slice(0, 70),
      description: product.description,
      category_id: 84, // Moto > Części (placeholder)
      advertiser_type: "business",
      price: { value: (product.price / 100).toFixed(2), currency: "PLN", negotiable: false },
      contact: { name: "Motofan Opole" },
      location: { city_id: 10400 }, // Opole
      images: product.images.slice(0, 15).map((img) => ({ url: img.url })),
      attributes: [
        { code: "state", value: product.condition === "new" ? "new" : "used" },
      ],
    };

    const res = await fetch("https://www.olx.pl/api/partner/adverts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        "Content-Type": "application/json",
        Version: "2",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) return { ok: false, error: `OLX: ${res.status}` };
    const data = await res.json();
    return { ok: true, id: String(data.id) };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function olxDelistProduct(
  olxId: string,
  tokens: MarketplaceTokens["olx"]
): Promise<MarketplaceResult> {
  if (!tokens?.accessToken) return { ok: false, error: "Brak tokenu OLX" };
  try {
    const res = await fetch(`https://www.olx.pl/api/partner/adverts/${olxId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${tokens.accessToken}`, Version: "2" },
    });
    return { ok: res.ok };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// ── Amazon ────────────────────────────────────────────
// Amazon SP-API requires signature (SigV4) – stub only
export async function amazonListProduct(
  product: Product,
  tokens: MarketplaceTokens["amazon"]
): Promise<MarketplaceResult> {
  if (!tokens) return { ok: false, error: "Brak tokenów Amazon" };
  // Full Amazon SP-API integration requires AWS SigV4 signing.
  // Implement using the amazon-sp-api npm package if needed.
  console.log("Amazon listing stub for product:", product.id, "seller:", tokens.sellerId);
  return { ok: false, error: "Amazon SP-API nie zaimplementowane – wymaga konfiguracji SP-API credentials" };
}
