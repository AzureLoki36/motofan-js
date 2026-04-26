// GET  /api/shop/products        – public list with filters
// POST /api/shop/products        – admin: create product
import { NextRequest, NextResponse } from "next/server";
import { readProducts, writeProducts, generateId, slugify } from "@/lib/shop-db";
import { isShopAdmin } from "@/lib/shop-auth";
import type { Product } from "@/lib/shop-types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const compatibility = searchParams.get("compatibility");
  const condition = searchParams.get("condition");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort") ?? "newest";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(48, Math.max(1, parseInt(searchParams.get("limit") ?? "24", 10)));

  let products = (await readProducts()).filter((p) => p.status === "active");

  if (q) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.compatibility.some((c) => c.toLowerCase().includes(q))
    );
  }
  if (category) products = products.filter((p) => p.category === category);
  if (brand) products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  if (condition) products = products.filter((p) => p.condition === condition);
  if (compatibility) {
    const compat = compatibility.toLowerCase();
    products = products.filter((p) =>
      p.compatibility.some((c) => c.toLowerCase().includes(compat))
    );
  }
  if (minPrice) products = products.filter((p) => p.price >= parseInt(minPrice) * 100);
  if (maxPrice) products = products.filter((p) => p.price <= parseInt(maxPrice) * 100);

  // Sort
  switch (sort) {
    case "price_asc":  products.sort((a, b) => a.price - b.price); break;
    case "price_desc": products.sort((a, b) => b.price - a.price); break;
    case "name_asc":   products.sort((a, b) => a.name.localeCompare(b.name)); break;
    case "oldest":     products.sort((a, b) => a.createdAt.localeCompare(b.createdAt)); break;
    default:           products.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const items = products.slice((page - 1) * limit, page * limit);

  // Strip internal marketplace IDs from public response
  const publicItems = items.map(({ allegroId: _, ebayId: __, olxId: ___, ...p }) => p);

  return NextResponse.json({ items: publicItems, total, page, totalPages, limit });
}

export async function POST(req: NextRequest) {
  if (!(await isShopAdmin())) {
    return NextResponse.json({ error: "Brak dostępu" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, description, brand, category, subcategory, compatibility, condition,
            price, comparePrice, stock, sku, images, status, tags, weight } = body;

    if (!name || !description || !brand || !category || price === undefined || stock === undefined) {
      return NextResponse.json({ error: "Wymagane pola: name, description, brand, category, price, stock" }, { status: 400 });
    }

    const products = await readProducts();
    const now = new Date().toISOString();
    const newProduct: Product = {
      id: generateId(),
      slug: slugify(name),
      name: name.trim(),
      description: description.trim(),
      brand: brand.trim(),
      category: category.trim(),
      subcategory: subcategory?.trim(),
      compatibility: Array.isArray(compatibility) ? compatibility : [],
      condition: condition ?? "new",
      price: Math.round(Number(price) * 100),      // store in grosze
      comparePrice: comparePrice ? Math.round(Number(comparePrice) * 100) : undefined,
      stock: Number(stock),
      sku: sku?.trim(),
      images: Array.isArray(images) ? images : [],
      status: status ?? "draft",
      tags: Array.isArray(tags) ? tags : [],
      weight: weight ? Number(weight) : undefined,
      createdAt: now,
      updatedAt: now,
    };

    await writeProducts([...products, newProduct]);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (e) {
    console.error("create product error", e);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
