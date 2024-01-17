import { test, expect } from "@playwright/test";

test("homepage is accessible", async ({ page }) => {
  // Navigate to the local application
  await page.goto("http://127.0.0.1:3000/");

  // Check if the page is loaded by looking for a specific element or text
  // This is an example, replace 'Some text or element' with something you expect on your page
  expect(page).toBeDefined();
});

test("specific element is present", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/");

  // Replace 'ElementSelector' with the actual selector of an element you expect to find
  await expect(
    page.locator('a[href="https://github.com/joanrufe/nextjs-ddda"]')
  ).toBeVisible();
});
