import { put, list, del } from "@vercel/blob";

export type ContentData = Record<string, unknown>;

const CONTENT_BLOB = "content.json";

export async function readContent(): Promise<ContentData> {
  try {
    const { blobs } = await list({ prefix: CONTENT_BLOB });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      });
      if (res.ok) return await res.json();
    }
  } catch {
    /* ignore – return empty */
  }
  return {};
}

export async function writeContent(data: ContentData): Promise<void> {
  // Delete old blob(s) first
  try {
    const { blobs } = await list({ prefix: CONTENT_BLOB });
    if (blobs.length > 0) {
      await del(blobs.map((b) => b.url));
    }
  } catch {
    /* ignore */
  }
  await put(CONTENT_BLOB, JSON.stringify(data, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
  });
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
