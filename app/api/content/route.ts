import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  readContent,
  writeContent,
  ensureDefaultsCaptured,
  pushHistory,
} from "@/lib/content";

// Bez tego Next/Vercel cache'uje GET na edge'u i admin nie widzi swiezej tresci
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  const data = await readContent();
  // Pierwszy GET (po deploy'u) lapi obecny stan jako "domyslny" snapshot,
  // do ktorego admin moze pozniej cofnac przyciskiem.
  await ensureDefaultsCaptured(data);
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  });
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
