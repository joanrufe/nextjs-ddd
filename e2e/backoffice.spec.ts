import { test, expect } from "@playwright/test";
import { testAdmin, testUser } from "../testData";

test("admin pages not accesible by unauthenticated user", async ({ page }) => {
  await page.goto("http://localhost:3000/backoffice");

  const text = page.getByText("You are not authorized to access this page");

  await expect(text).toBeVisible();
});

test("admin pages not accessible by normal user", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  const emailField = page.getByLabel("Email address");
  const passwordField = page.getByLabel("Password");
  const submitButton = page.getByText("Sign in");

  await emailField.fill(testUser.email);
  await passwordField.fill(testUser.password);

  await submitButton.click();

  await page.goto("http://localhost:3000/backoffice");

  const text = page.getByText("You are not authorized to access this page");

  await expect(text).toBeVisible();
});

test("admin pages accessible by admin user", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  const emailField = page.getByLabel("Email address");
  const passwordField = page.getByLabel("Password");
  const submitButton = page.getByText("Sign in");

  await emailField.fill(testAdmin.email);
  await passwordField.fill(testAdmin.password);

  await submitButton.click();

  await page.waitForURL("http://localhost:3000/profile/update");

  await page.goto("http://localhost:3000/backoffice");

  const text = page.getByText("This is the admin dashboard");

  await expect(text).toBeVisible();
});
