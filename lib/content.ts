import { put, list, del } from "@vercel/blob";

export type ContentData = Record<string, unknown>;

const CONTENT_BLOB = "content.json";
const DEFAULTS_BLOB = "content-defaults.json";
const HISTORY_BLOB = "content-history.json";
const HISTORY_LIMIT = 30;

const KNOWN_LOCALES = ["en", "uk"];

function isObj(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

async function readJsonBlob<T>(name: string, fallback: T): Promise<T> {
  try {
    const { blobs } = await list({ prefix: name });
    if (blobs.length > 0) {
      // wybierz najnowszy (gdy zostal jakis stary nieuduskuniety)
      const newest = [...blobs].sort((a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )[0];
      // cache-bust + Authorization, zeby ominac CDN
      const url = newest.url + (newest.url.includes("?") ? "&" : "?") + "_t=" + Date.now();
      const res = await fetch(url, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
          "Cache-Control": "no-cache",
        },
      });
      if (res.ok) return (await res.json()) as T;
    }
  } catch { /* ignore */ }
  return fallback;
}

async function writeJsonBlob(name: string, data: unknown): Promise<void> {
  try {
    const { blobs } = await list({ prefix: name });
    if (blobs.length > 0) await del(blobs.map((b) => b.url));
  } catch { /* ignore */ }
  await put(name, JSON.stringify(data, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    cacheControlMaxAge: 0, // nie cachuj na CDN — admin musi widziec swiezy stan
  });
}

async function blobExists(name: string): Promise<boolean> {
  try {
    const { blobs } = await list({ prefix: name });
    return blobs.length > 0;
  } catch { return false; }
}

export async function readContent(): Promise<ContentData> {
  return readJsonBlob<ContentData>(CONTENT_BLOB, {});
}

export async function writeContent(data: ContentData): Promise<void> {
  await writeJsonBlob(CONTENT_BLOB, data);
}

/* ===== Defaults snapshot (auto-zlapywany przy pierwszym GET) ===== */
export async function readDefaults(): Promise<ContentData> {
  return readJsonBlob<ContentData>(DEFAULTS_BLOB, {});
}
export async function writeDefaults(data: ContentData): Promise<void> {
  await writeJsonBlob(DEFAULTS_BLOB, data);
}
export async function ensureDefaultsCaptured(current: ContentData): Promise<void> {
  if (!(await blobExists(DEFAULTS_BLOB))) {
    await writeDefaults(current);
  }
}

/* ===== Historia (do cofania) ===== */
export interface HistoryEntry { ts: string; content: ContentData; }
export async function readHistory(): Promise<HistoryEntry[]> {
  return readJsonBlob<HistoryEntry[]>(HISTORY_BLOB, []);
}
export async function writeHistory(entries: HistoryEntry[]): Promise<void> {
  await writeJsonBlob(HISTORY_BLOB, entries);
}
export async function pushHistory(prev: ContentData): Promise<void> {
  const hist = await readHistory();
  hist.unshift({ ts: new Date().toISOString(), content: prev });
  if (hist.length > HISTORY_LIMIT) hist.length = HISTORY_LIMIT;
  await writeHistory(hist);
}

/* ===== Flatten / unflatten dla operacji na prefiksach ===== */
function flatten(obj: ContentData, prefix = ""): Map<string, unknown> {
  const result = new Map<string, unknown>();
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (isObj(v)) {
      for (const [ik, iv] of flatten(v as ContentData, path)) result.set(ik, iv);
    } else {
      result.set(path, v);
    }
  }
  return result;
}
function unflatten(map: Map<string, unknown>): ContentData {
  const result: Record<string, unknown> = {};
  for (const [path, val] of map) {
    const keys = path.split(".");
    let cur: Record<string, unknown> = result;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!isObj(cur[keys[i]])) cur[keys[i]] = {};
      cur = cur[keys[i]] as Record<string, unknown>;
    }
    cur[keys[keys.length - 1]] = val;
  }
  return result;
}

/* Rozszerza prefiksy o warianty per-locale (en.<p>, uk.<p>) - bo Editable dla
   nie-pl zapisuje pod kluczem "<locale>.<id>". */
function expandWithLocales(prefixes: string[]): string[] {
  const out = new Set<string>(prefixes);
  for (const p of prefixes) {
    for (const l of KNOWN_LOCALES) out.add(`${l}.${p}`);
  }
  return [...out];
}
function matchesAny(key: string, prefixes: string[]): boolean {
  return prefixes.some((p) => key === p || key.startsWith(p + "."));
}

/**
 * Nakłada wartości z `source` na `target` dla kluczy pasujących do prefiksów.
 * Bez prefiksów (lub pusta lista) = pełna zamiana (target := source).
 */
export function applyOverride(
  target: ContentData,
  source: ContentData,
  prefixes?: string[] | null
): ContentData {
  if (!prefixes || prefixes.length === 0) {
    return structuredClone(source);
  }
  const expanded = expandWithLocales(prefixes);
  const tgt = flatten(target);
  const src = flatten(source);
  // Usun lub nadpisz klucze pasujace do prefiksow na podstawie source
  for (const key of [...tgt.keys()]) {
    if (matchesAny(key, expanded)) {
      if (src.has(key)) tgt.set(key, src.get(key));
      else tgt.delete(key);
    }
  }
  // Dolozenia z source ktorych w target nie bylo
  for (const [key, val] of src) {
    if (matchesAny(key, expanded) && !tgt.has(key)) {
      tgt.set(key, val);
    }
  }
  return unflatten(tgt);
}

export function getNestedValue(obj: Record<string, unknown>, keyPath: string): unknown {
  return keyPath.split(".").reduce<unknown>((o, k) => {
    if (o && typeof o === "object" && k in (o as Record<string, unknown>)) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

export function setNestedValue(obj: Record<string, unknown>, keyPath: string, value: unknown): Record<string, unknown> {
  const keys = keyPath.split(".");
  const result = structuredClone(obj);
  let current: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current) || typeof current[keys[i]] !== "object") {
      current[keys[i]] = {};
    }
    current = current[keys[i]] as Record<string, unknown>;
  }
  current[keys[keys.length - 1]] = value;
  return result;
}
