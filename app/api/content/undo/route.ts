import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  readContent,
  writeContent,
  readHistory,
  writeHistory,
  applyOverride,
} from "@/lib/content";

/**
 * POST /api/content/undo
 * Body: { prefixes?: string[] }   (puste lub brak = cofnij wszystko)
 *
 * Wyjmuje najnowszy wpis z historii i przywraca z niego klucze. Dla wybranych
 * prefiksow cofa tylko fragment strony, reszta tresci zostaje bez zmian.
 * Wpis historii jest konsumowany (pop) - kolejne kliknienia cofaja kolejne zmiany.
 */
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const prefixes: string[] | undefined = Array.isArray(body?.prefixes) ? body.prefixes : undefined;

  const history = await readHistory();
  if (history.length === 0) {
    return NextResponse.json({ ok: false, error: "Brak historii do cofniecia" }, { status: 404 });
  }
  const [latest, ...rest] = history;
  await writeHistory(rest);

  const current = await readContent();
  const next = applyOverride(current, latest.content, prefixes);
  await writeContent(next);

  return NextResponse.json({
    ok: true,
    scope: prefixes && prefixes.length ? prefixes : "all",
    remainingHistory: rest.length,
  });
}
