import { test, expect } from "@playwright/test";
import routes from "../../src/content/routes.json";

for (const width of [390, 768, 1440]) {
  test(`all routes render without overflow or script errors at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), route).toBeLessThanOrEqual(1);
      expect(await page.locator('a,button,summary').evaluateAll(nodes => nodes.filter(node => {
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.height < 24 && !node.closest('p,li.inline-sentence') && node.textContent?.trim() !== 'Skip to main content';
      }).map(node => node.textContent?.trim())), route).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("mobile dialog contains focus, restores it, closes on routes and resize", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  const dialog = page.getByRole('dialog', { name: 'Site navigation' });
  await menu.click();
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 13; i++) {
    await page.keyboard.press(i % 2 ? 'Shift+Tab' : 'Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(menu).toBeFocused();
  await menu.click();
  await dialog.getByRole('link', { name: 'Experience' }).click();
  await expect(page).toHaveURL(/\/experience$/);
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test("PDF download exists and unsafe repository action is absent", async ({ page }) => {
  await page.goto('/resume');
  const download = page.getByRole('link', { name: 'Download résumé (PDF)' });
  const [file] = await Promise.all([page.waitForEvent('download'), download.click()]);
  expect(file.suggestedFilename()).toBe('Vidit_Pujara_Oracle_Fusion_Technical_Consultant_OIC.pdf');
  expect(await file.failure()).toBeNull();
  await page.goto('/projects/triptogether');
  await expect(page.locator('a[href*="triptogether-planner"]')).toHaveCount(0);
});

test("reduced motion and keyboard focus remain usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('[data-reveal]').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).opacity === '0').length)).toBe(0);
  expect(await page.locator('.rise,.route-in').evaluateAll(nodes => nodes.filter(node => {
    const style = getComputedStyle(node);
    return style.opacity !== '1' || style.animationName !== 'none';
  }).length)).toBe(0);
  expect(await page.locator('[data-packet]').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).display !== 'none').length)).toBe(0);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle)).not.toBe('none');
});

test("mobile navigation and visible content work without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(process.env.BASE_URL || 'http://127.0.0.1:3100');
  const nav = page.getByRole('navigation', { name: 'Navigation without JavaScript' });
  await nav.locator('summary').click();
  await nav.getByRole('link', { name: 'Experience' }).click();
  await expect(page).toHaveURL(/\/experience$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await context.close();
});
