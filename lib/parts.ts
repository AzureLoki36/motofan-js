import { list, put, del } from "@vercel/blob";

export type PartCondition = "nowa" | "stan-bdb" | "stan-db" | "stan-uzywany";

export type PartCategory =
  | "silnik"
  | "zawieszenie"
  | "hamulce"
  | "oswietlenie"
  | "kola-opony"
  | "elektryka"
  | "owiewki"
  | "akcesoria"
  | "inne";

export interface Part {
  id: string;
  name: string;
  brand: string;
  category: PartCategory;
  condition: PartCondition;
  price: number;
  description: string;
  fits: string;
  images: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

const BLOB_PREFIX = "parts.json";

export async function readParts(): Promise<Part[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    if (!blobs.length) return [];
    // Bierz najnowszy + cache-bust na URL, zeby pominac CDN cache
    const newest = [...blobs].sort((a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    const url = newest.url + (newest.url.includes("?") ? "&" : "?") + "_t=" + Date.now();
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        "Cache-Control": "no-cache",
      },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function writeParts(data: Part[]): Promise<void> {
  const { blobs } = await list({ prefix: BLOB_PREFIX });
  for (const b of blobs) await del(b.url);
  await put(BLOB_PREFIX, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 0, // wymus aby CDN nie trzymal starej wersji
  });
}

export const CATEGORY_LABELS: Record<PartCategory, string> = {
  silnik: "Silnik / napęd",
  zawieszenie: "Zawieszenie",
  hamulce: "Hamulce",
  oswietlenie: "Oświetlenie",
  "kola-opony": "Koła / opony",
  elektryka: "Elektryka",
  owiewki: "Owiewki / nadwozie",
  akcesoria: "Akcesoria / drobne",
  inne: "Inne",
};

export const CONDITION_LABELS: Record<PartCondition, string> = {
  nowa: "Nowa",
  "stan-bdb": "Stan bardzo dobry",
  "stan-db": "Stan dobry",
  "stan-uzywany": "Stan używany",
};
