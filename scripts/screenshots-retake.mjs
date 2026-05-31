// Uzupelniajacy skrypt: brakujace zrzuty + lepsze wersje 06 (bez cookie banner).

import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "docs", "zrzuty");

const SITE = "https://motofan-js.vercel.app";
const LOGIN = "admin";
const PASS = "motofan2026";

async function dismissCookies(page) {
  try {
    const btn = page.locator('button:has-text("Akceptuję")').first();
    if (await btn.count() > 0 && await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(400);
    }
  } catch {}
}

async function shoot(page, name, opts = {}) {
  const file = path.join(OUT_DIR, name + ".png");
  await page.screenshot({ path: file, fullPage: opts.full ?? false, ...opts });
  console.log("  → " + name + ".png");
}

async function ensureEditMode(page) {
  // Sprawdz tekst przycisku przelacznika
  const btn = page.locator(".admin-toolbar-left .admin-toolbar-btn").first();
  const txt = (await btn.textContent()) || "";
  if (!txt.toLowerCase().includes("edycji")) {
    await btn.click();
    await page.waitForTimeout(800);
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "pl-PL" });
  const page = await ctx.newPage();

  // Login
  await page.goto(SITE + "/login", { waitUntil: "networkidle" });
  await page.fill('input[id="username"]', LOGIN);
  await page.fill('input[id="password"]', PASS);
  await page.click('button[type="submit"]');
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(2500);
  await dismissCookies(page);

  // === 06 retake bez cookies + lepsze framingu ===
  console.log("== 06b. Menu Przywracanie (bez cookies) ==");
  await page.locator(".admin-toolbar").waitFor({ state: "visible" });
  await page.locator(".restore-trigger").click();
  await page.waitForTimeout(500);
  await shoot(page, "06-menu-przywracanie");
  await page.mouse.click(50, 200);
  await page.waitForTimeout(300);

  // === 05 retake: editable obwodka ===
  console.log("== 05. Editable z czerwona obwodka ==");
  await ensureEditMode(page);
  await page.waitForTimeout(800);
  await dismissCookies(page);
  const ed = page.locator(".editable-active").first();
  if (await ed.count() > 0) {
    await ed.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    // Zrzut viewport (close-up)
    const box = await ed.boundingBox();
    if (box) {
      const pad = 80;
      await shoot(page, "05-editable-obwodka", {
        clip: {
          x: Math.max(0, box.x - pad),
          y: Math.max(0, box.y - pad),
          width: Math.min(1440 - Math.max(0, box.x - pad), box.width + pad * 2),
          height: Math.min(900 - Math.max(0, box.y - pad), box.height + pad * 2),
        },
      });
    } else {
      await shoot(page, "05-editable-obwodka");
    }
  }

  // === 11b/11c: panel admina czesci uzywane ===
  console.log("== /czesci-uzywane panel admina ==");
  await page.goto(SITE + "/czesci-uzywane", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await dismissCookies(page);
  await ensureEditMode(page);
  await page.waitForTimeout(1500);
  // Przewin do pozycji gdzie powinien byc przycisk "Zarzadzaj czesciami"
  const partsAdminBtn = page.locator("button.moto-admin-trigger").first();
  if (await partsAdminBtn.count() > 0) {
    await partsAdminBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await shoot(page, "11b-czesci-button-zarzadzaj");
    await partsAdminBtn.click();
    await page.waitForTimeout(1500);
    await shoot(page, "11c-czesci-panel-admina");
    // Add view
    const addBtn = page.locator("button.moto-admin-add-btn").first();
    if (await addBtn.count() > 0) {
      await addBtn.click();
      await page.waitForTimeout(800);
      await shoot(page, "11d-czesci-formularz");
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
  } else {
    console.log("    Brak buttona admin/edycja moze nie aktywna");
    await shoot(page, "11x-czesci-debug");
  }

  // === Bonus: lista zrzutow pre-cleanup ===
  console.log("Gotowe!");
  await browser.close();
}

main().catch((e) => { console.error("BLAD:", e); process.exit(1); });
