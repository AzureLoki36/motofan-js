import { chromium } from "playwright";
const SITE = "https://motofan-js.vercel.app";
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  // Login z next=/czesci-uzywane (auto edit mode po loginie)
  await page.goto(SITE + "/login?next=%2Fczesci-uzywane", { waitUntil: "networkidle" });
  await page.fill('input[id="username"]', "admin");
  await page.fill('input[id="password"]', "motofan2026");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4500);
  // Dismiss cookies
  try { await page.locator('button:has-text("Akceptuj")').first().click({ timeout: 2000 }); } catch {}
  await page.waitForTimeout(800);
  // editable
  const ed = page.locator(".editable-active").first();
  const cnt = await ed.count();
  console.log("editable count po loginie z auto-edit:", cnt);
  if (cnt > 0) {
    await ed.scrollIntoViewIfNeeded({ timeout: 5000 });
    await page.waitForTimeout(800);
    const box = await ed.boundingBox();
    if (box) {
      const pad = 50;
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
