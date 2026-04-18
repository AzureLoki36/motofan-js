import { list, put, del } from "@vercel/blob";

export interface BannerItem {
  id: string;
  img: string;
  alt: string;
  brand: string;
  cat: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const BLOB_PREFIX = "banner-items.json";

export async function readBannerItems(): Promise<BannerItem[]> {
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

export async function writeBannerItems(data: BannerItem[]): Promise<void> {
  const { blobs } = await list({ prefix: BLOB_PREFIX });
  for (const b of blobs) await del(b.url);
  await put(BLOB_PREFIX, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}
