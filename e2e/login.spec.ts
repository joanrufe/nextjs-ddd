import { test, expect } from "@playwright/test";
import { testUser } from "../testData";

test("login page is accessible", async ({ page }) => {
  const res = await page.goto("http://localhost:3000/login");

  expect(res?.status()).toBe(200);
});

test("login form makes successful login and redirects to /profile/update", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/login");

  const emailField = page.getByLabel("Email address");
  const passwordField = page.getByLabel("Password");
  const submitButton = page.getByText("Sign in");

  await expect(emailField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(submitButton).toBeVisible();

  await emailField.fill(testUser.email);
  await passwordField.fill(testUser.password);

  expect(await emailField.inputValue()).toBe(testUser.email);
  expect(await passwordField.inputValue()).toBe(testUser.password);

  await submitButton.click();

  await page.waitForURL("http://localhost:3000/profile/update");
});

test("Should fail login and show error message", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  const emailField = page.getByLabel("Email address");
  const passwordField = page.getByLabel("Password");
  const submitButton = page.getByText("Sign in");

  await expect(emailField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(submitButton).toBeVisible();

  await emailField.fill("wrong@email.com");
  await passwordField.fill("wrongpassword");

  await submitButton.click();

  const text = page.getByText("Invalid email or password");

  await expect(text).toBeVisible();
});
