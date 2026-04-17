import fs from "fs";
import path from "path";

export type ContentData = Record<string, unknown>;

const DATA_FILE = path.join(process.cwd(), "data", "content.json");

export function readContent(): ContentData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    }
  } catch {
    /* ignore */
  }
  return {};
}

export function writeContent(data: ContentData): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
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
