import { test, expect } from "@playwright/test";

test("homepage is accessible", async ({ page }) => {
  const res = await page.goto("http://127.0.0.1:3000/");

  expect(res?.status()).toBe(200);
});

test("Link to my repo is present", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/");

  await expect(
    page.locator('a[href="https://github.com/joanrufe/nextjs-ddd"]')
  ).toBeVisible();
});
