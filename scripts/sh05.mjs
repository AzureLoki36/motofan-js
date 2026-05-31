import { chromium } from "playwright";
import path from "path";
const SITE = "https://motofan-js.vercel.app";
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(SITE + "/login", { waitUntil: "networkidle" });
  await page.fill('input[id="username"]', "admin");
  await page.fill('input[id="password"]', "motofan2026");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3500);
  // dismiss cookies
  try { await page.locator('button:has-text("Akceptuj")').first().click({ timeout: 2000 }); } catch {}
  await page.waitForTimeout(500);
  // tryb edycji
  const btn = page.locator(".admin-toolbar-left .admin-toolbar-btn").first();
  const t = (await btn.textContent()) || "";
  if (!t.toLowerCase().includes("edycji")) await btn.click();
  await page.waitForTimeout(800);
  // przejdz na /czesci - ma duzo prostych editable
  await page.goto(SITE + "/czesci", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  // editable na hero
  const ed = page.locator(".editable-active").first();
  const cnt = await ed.count();
  console.log("editable count:", cnt);
  if (cnt > 0) {
    await ed.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const box = await ed.boundingBox();
    if (box) {
      const pad = 60;
      await page.screenshot({
        path: "docs/zrzuty/05-editable-obwodka.png",
        clip: {
          x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad),
          width: Math.min(1440 - Math.max(0, box.x - pad), box.width + pad * 2),
          height: Math.min(900 - Math.max(0, box.y - pad), box.height + pad * 2),
        },
      });
      console.log("  → 05-editable-obwodka.png");
    }
  }
  await browser.close();
})();
