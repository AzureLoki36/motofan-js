import { list, put, del } from "@vercel/blob";

export type MotorcycleType = "nowe" | "uzywane";
export type MotorcycleStatus = "available" | "reserved" | "sold";
export type MotorcycleCategory =
  | "naked"
  | "sport"
  | "touring"
  | "cruiser"
  | "skuter"
  | "enduro"
  | "inne";

export interface Motorcycle {
  id: string;
  type: MotorcycleType;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  displacement: number;
  power: number;
  price: number;
  description: string;
  status: MotorcycleStatus;
  category: MotorcycleCategory;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const BLOB_PREFIX = "motorcycles.json";

export async function readMotorcycles(): Promise<Motorcycle[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    if (!blobs.length) return [];
    const res = await fetch(blobs[0].url, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function writeMotorcycles(data: Motorcycle[]): Promise<void> {
  const { blobs } = await list({ prefix: BLOB_PREFIX });
  for (const b of blobs) await del(b.url);
  await put(BLOB_PREFIX, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export const CATEGORY_LABELS: Record<MotorcycleCategory, string> = {
  naked: "Naked / Street",
  sport: "Sport",
  touring: "Touring / Adventure",
  cruiser: "Cruiser",
  skuter: "Skuter",
  enduro: "Enduro / Cross",
  inne: "Inne",
};

export const STATUS_LABELS: Record<MotorcycleStatus, string> = {
  available: "Dostępny",
  reserved: "Rezerwacja",
  sold: "Sprzedany",
};
