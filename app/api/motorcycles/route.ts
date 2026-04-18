import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readMotorcycles, writeMotorcycles, Motorcycle } from "@/lib/motorcycles";

export const dynamic = "force-dynamic";

export async function GET() {
  const motorcycles = await readMotorcycles();
  return NextResponse.json(motorcycles);
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const motorcycles = await readMotorcycles();

  const newMoto: Motorcycle = {
    id: crypto.randomUUID(),
    type: body.type || "nowe",
    brand: (body.brand || "").trim(),
    model: (body.model || "").trim(),
    year: Number(body.year) || new Date().getFullYear(),
    mileage: Math.max(0, Number(body.mileage) || 0),
    displacement: Math.max(0, Number(body.displacement) || 0),
    power: Math.max(0, Number(body.power) || 0),
    price: Math.max(0, Number(body.price) || 0),
    description: (body.description || "").trim(),
    status: body.status || "available",
    category: body.category || "inne",
    images: Array.isArray(body.images) ? body.images.filter((u: unknown) => typeof u === "string") : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  motorcycles.push(newMoto);
  await writeMotorcycles(motorcycles);

  return NextResponse.json(newMoto, { status: 201 });
}
