// Zrzuty ekranów do dokumentacji admina.
// Loguje sie jako admin/motofan2026 na produkcji i robi serie screenshot-ow.
// Uzycie: node scripts/screenshots.mjs

import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "docs", "zrzuty");

const SITE = "https://motofan-js.vercel.app";
const LOGIN = "admin";
const PASS = "motofan2026";

async function shoot(page, name, opts = {}) {
  const file = path.join(OUT_DIR, name + ".png");
  await page.screenshot({ path: file, fullPage: opts.full ?? false, ...opts });
  console.log("  → " + name + ".png");
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "pl-PL",
  });
  const page = await ctx.newPage();

  console.log("== 01. Logowanie ==");
  await page.goto(SITE + "/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await shoot(page, "01-logowanie");

  console.log("== 02. Logowanie z wypelnionymi polami ==");
  await page.fill('input[id="username"]', LOGIN);
  await page.fill('input[id="password"]', "•••••••••");
  await shoot(page, "02-logowanie-wypelnione");

  // Rzeczywisty login
  await page.fill('input[id="password"]', PASS);
  await page.click('button[type="submit"]');
  await page.waitForURL(SITE + "/?**", { timeout: 15000 }).catch(() => {});
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(2000);

  console.log("== 03. Toolbar admina (strona glowna) ==");
  await page.locator(".admin-toolbar").waitFor({ state: "visible", timeout: 10000 });
  // Zrzut tylko dolnego paska
  const toolbar = page.locator(".admin-toolbar");
  await toolbar.scrollIntoViewIfNeeded();
  await shoot(page, "03-toolbar-podglad");
  // Pelna strona glowna
  await shoot(page, "03b-strona-glowna-zalogowany", { full: true });

  console.log("== 04. Tryb edycji ON ==");
  // Klik w pierwszy admin-toolbar-btn (Tryb edycji/Podglad)
  await page.locator(".admin-toolbar-left .admin-toolbar-btn").first().click();
  await page.waitForTimeout(800);
  await shoot(page, "04-toolbar-tryb-edycji");

  console.log("== 05. Editable z czerwona obwodka (close-up nagłówka) ==");
  // Znajdz pierwszy editable-active na home (po wlaczeniu trybu)
  const firstEditable = page.locator(".editable-active").first();
  if (await firstEditable.count() > 0) {
    await firstEditable.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await shoot(page, "05-editable-obwodka");
  }

  console.log("== 06. Menu Przywracanie ==");
  // Otworz dropdown Przywracanie w toolbarze
  await page.locator(".restore-trigger").click();
  await page.waitForTimeout(500);
  await shoot(page, "06-menu-przywracanie");
  // Zamknij menu (kliknij obok)
  await page.mouse.click(100, 100);
  await page.waitForTimeout(500);

  console.log("== 07. Modal Konto ==");
  await page.locator(".admin-toolbar-btn.account").click();
  await page.waitForTimeout(800);
  await shoot(page, "07-modal-konto");
  // Zamknij
  await page.locator(".acct-x").click();
  await page.waitForTimeout(500);

  console.log("== 08. /dla-dzieci - hero w trybie edycji ==");
  await page.goto(SITE + "/dla-dzieci", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  // Tryb edycji nadal aktywny? Sprawdz
  const editBtn = page.locator(".admin-toolbar-left .admin-toolbar-btn").first();
  const editBtnText = await editBtn.textContent();
  if (editBtnText && !editBtnText.toLowerCase().includes("edycji")) {
    await editBtn.click();
    await page.waitForTimeout(500);
  }
  await shoot(page, "08-dla-dzieci-hero");

  console.log("== 09. /dla-dzieci - panel admina mini-gry ==");
  // przewin do sekcji quizu
  await page.locator("#strefa-gra").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await shoot(page, "09-dla-dzieci-panel-mini-gry");

  console.log("== 10. /czesci - button do uzywanych ==");
  await page.goto(SITE + "/czesci", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await shoot(page, "10-czesci-button-uzywane");

  console.log("== 11. /czesci-uzywane - lista czesci i panel admina ==");
  await page.goto(SITE + "/czesci-uzywane", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await shoot(page, "11-czesci-uzywane");
  // Panel admina "Zarzadzaj czesciami"
  const partsAdminBtn = page.locator(".moto-admin-trigger").first();
  if (await partsAdminBtn.count() > 0) {
    await partsAdminBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await shoot(page, "11b-czesci-button-zarzadzaj");
    await partsAdminBtn.click();
    await page.waitForTimeout(1000);
    await shoot(page, "11c-czesci-panel-admina");
    // Zamknij
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
  }

  console.log("== 12. Edycja zdjecia produktu (hover) ==");
  await page.goto(SITE + "/dla-dzieci", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  // Najedz na pierwszy product image
  const firstProductImg = page.locator(".kids-card-img-wrap").first();
  if (await firstProductImg.count() > 0) {
    await firstProductImg.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await firstProductImg.hover();
    await page.waitForTimeout(800);
    await shoot(page, "12-edycja-zdjecia-hover");
  }

  console.log("Gotowe!");
  await browser.close();
}

main().catch((e) => {
  console.error("BLAD:", e);
  process.exit(1);
});
