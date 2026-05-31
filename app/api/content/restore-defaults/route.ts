import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  readContent,
  writeContent,
  readDefaults,
  pushHistory,
  applyOverride,
} from "@/lib/content";

/**
 * POST /api/content/restore-defaults
 * Body: { prefixes?: string[] }   (puste lub brak = pelne przywrocenie)
 *
 * Przywraca tresc do "domyslnego" snapshotu zlapanego po deployu.
 * Dla wybranych prefiksow (np. ["kids"]) przywraca tylko fragment strony,
 * reszta tresci pozostaje bez zmian.
 */
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const prefixes: string[] | undefined = Array.isArray(body?.prefixes) ? body.prefixes : undefined;

  const current = await readContent();
  const defaults = await readDefaults();

  // Zapisz aktualny stan do historii (zeby admin mogl COFNAC przywrocenie)
  await pushHistory(current);

  const next = applyOverride(current, defaults, prefixes);
  await writeContent(next);

  return NextResponse.json({ ok: true, scope: prefixes && prefixes.length ? prefixes : "all" });
}
