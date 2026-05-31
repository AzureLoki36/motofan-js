import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readParts, writeParts, Part, PartCategory, PartCondition } from "@/lib/parts";
import { PARTS_SEED } from "@/lib/parts-seed";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  const parts = await readParts();
  // Jeśli magazyn pusty (np. pierwsze uruchomienie / brak konfiguracji blob)
  // serwujemy przykładowe dane, żeby strona była użyteczna od razu.
  const body = parts.length === 0 ? PARTS_SEED : parts;
  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parts = await readParts();

  const newPart: Part = {
    id: crypto.randomUUID(),
    name: (body.name || "").trim(),
    brand: (body.brand || "").trim(),
    category: (body.category || "inne") as PartCategory,
    condition: (body.condition || "stan-db") as PartCondition,
    price: Math.max(0, Number(body.price) || 0),
    description: (body.description || "").trim(),
    fits: (body.fits || "").trim(),
    images: Array.isArray(body.images) ? body.images.filter((u: unknown) => typeof u === "string") : [],
    available: body.available !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  parts.push(newPart);
  await writeParts(parts);

  return NextResponse.json(newPart, { status: 201 });
}
