import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { readMotorcycles, writeMotorcycles } from "@/lib/motorcycles";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const motorcycles = await readMotorcycles();
  const idx = motorcycles.findIndex((m) => m.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  motorcycles[idx] = {
    ...motorcycles[idx],
    type: body.type ?? motorcycles[idx].type,
    brand: typeof body.brand === "string" ? body.brand.trim() : motorcycles[idx].brand,
    model: typeof body.model === "string" ? body.model.trim() : motorcycles[idx].model,
    year: body.year != null ? Number(body.year) : motorcycles[idx].year,
    mileage: body.mileage != null ? Math.max(0, Number(body.mileage)) : motorcycles[idx].mileage,
    displacement: body.displacement != null ? Math.max(0, Number(body.displacement)) : motorcycles[idx].displacement,
    power: body.power != null ? Math.max(0, Number(body.power)) : motorcycles[idx].power,
    price: body.price != null ? Math.max(0, Number(body.price)) : motorcycles[idx].price,
    description: typeof body.description === "string" ? body.description.trim() : motorcycles[idx].description,
    status: body.status ?? motorcycles[idx].status,
    category: body.category ?? motorcycles[idx].category,
    images: Array.isArray(body.images)
      ? body.images.filter((u: unknown) => typeof u === "string")
      : motorcycles[idx].images,
    id: motorcycles[idx].id,
    createdAt: motorcycles[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };

  await writeMotorcycles(motorcycles);
  return NextResponse.json(motorcycles[idx]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const motorcycles = await readMotorcycles();
  const filtered = motorcycles.filter((m) => m.id !== id);

  if (filtered.length === motorcycles.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await writeMotorcycles(filtered);
  return NextResponse.json({ success: true });
}
