import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  readContent,
  writeContent,
  ensureDefaultsCaptured,
  pushHistory,
} from "@/lib/content";

export async function GET() {
  const data = await readContent();
  // Pierwszy GET (po deploy'u) lapi obecny stan jako "domyslny" snapshot,
  // do ktorego admin moze pozniej cofnac przyciskiem.
  await ensureDefaultsCaptured(data);
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  // Najpierw zapis starej wersji do historii (do cofania)
  const previous = await readContent();
  await pushHistory(previous);
  await writeContent(body);
  return NextResponse.json({ ok: true });
}
