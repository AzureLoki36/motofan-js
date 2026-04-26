// ===================================================
//  MOTOFAN SKLEP ONLINE – shared TypeScript types
// ===================================================

// ── Product ──────────────────────────────────────────
export type ProductCondition = "new" | "used";
export type ProductStatus = "active" | "draft" | "sold_out";

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  slug: string;                 // URL-friendly name
  name: string;
  description: string;
  brand: string;
  category: string;             // e.g. "Silnik", "Hamulce"
  subcategory?: string;
  compatibility: string[];      // e.g. ["Kawasaki Z900", "Kawasaki ZX-10R"]
  condition: ProductCondition;
  price: number;                // in grosze (1/100 PLN)
  comparePrice?: number;        // original / compare at price
  stock: number;
  sku?: string;
  images: ProductImage[];
  status: ProductStatus;
  tags: string[];
  weight?: number;              // grams, for shipping
  createdAt: string;
  updatedAt: string;
  // Marketplace cross-listing IDs
  allegroId?: string;
  ebayId?: string;
  olxId?: string;
}

// ── Cart ─────────────────────────────────────────────
export interface CartItem {
  productId: string;
  quantity: number;
  price: number;                // snapshot price at add time
  name: string;
  image?: string;
}

// ── User ─────────────────────────────────────────────
export type UserRole = "customer" | "admin";

export interface ShopUser {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  addresses: Address[];
  stripeCustomerId?: string;
  savedCards?: SavedCard[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  label?: string;               // "Dom", "Praca"
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// ── Saved payment card (Stripe) ───────────────────────
export interface SavedCard {
  stripePaymentMethodId: string;
  brand: string;           // "visa", "mastercard", etc.
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

// ── Order ─────────────────────────────────────────────
export type OrderStatus =
  | "pending"
  | "awaiting_payment"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentMethod = "stripe" | "przelewy24" | "bank_transfer" | "cash_on_delivery";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderItem {
  productId: string;
  name: string;
  sku?: string;
  quantity: number;
  unitPrice: number;            // grosze
  totalPrice: number;           // grosze
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;          // human-readable e.g. "MF-2026-00001"
  userId?: string;              // null for guest orders
  guestEmail?: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  subtotal: number;             // grosze
  shippingCost: number;         // grosze
  discount: number;             // grosze
  total: number;                // grosze
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  stripePaymentIntentId?: string;
  przelewy24Token?: string;
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Marketplace ─────────────────────────────────────
export interface MarketplaceTokens {
  allegro?: {
    clientId: string;
    clientSecret: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string;
  };
  ebay?: {
    appId: string;
    certId: string;
    devId: string;
    authToken?: string;
    refreshToken?: string;
    expiresAt?: string;
    sandbox: boolean;
  };
  olx?: {
    clientId: string;
    clientSecret: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string;
  };
  amazon?: {
    sellerId: string;
    accessKey: string;
    secretKey: string;
    region: string;
    marketplaceId: string;
  };
}

// ── Public types (no sensitive data) ─────────────────
export type PublicUser = Omit<ShopUser, "passwordHash">;
export type PublicProduct = Omit<Product, "allegroId" | "ebayId" | "olxId">;
