import { test, expect } from "@playwright/test";

test.describe("Internationalization (i18n)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Default language is Spanish", async ({ page }) => {
    const skillsHeading = page.getByRole("heading", {
      level: 2,
      name: /Habilidades Técnicas/i,
    });
    await skillsHeading.scrollIntoViewIfNeeded();
    await expect(skillsHeading).toBeVisible();

    const contactHeading = page.getByRole("heading", {
      level: 2,
      name: "Contacto",
    });
    await expect(contactHeading).toBeVisible();
  });

  test("LanguageSwitch toggles to English", async ({ page }) => {
    const langButton = page.getByRole("button", { name: "Toggle language" });
    await langButton.click();

    const skillsHeading = page.getByRole("heading", {
      level: 2,
      name: /Technical Skills/i,
    });
    await skillsHeading.scrollIntoViewIfNeeded();
    await expect(skillsHeading).toBeVisible();

    const contactHeading = page.getByRole("heading", {
      level: 2,
      name: "Contact",
    });
    await expect(contactHeading).toBeVisible();
  });

  test("Language persists after page reload", async ({ page }) => {
    const langButton = page.getByRole("button", { name: "Toggle language" });
    await langButton.click();

    const contactEn = page.getByRole("heading", {
      level: 2,
      name: "Contact",
    });
    await expect(contactEn).toBeVisible();

    await page.reload();
    await page.waitForLoadState("networkidle");

    const contactStillEn = page.getByRole("heading", {
      level: 2,
      name: "Contact",
    });
    await expect(contactStillEn).toBeVisible();
  });

  test("Switch back to Spanish works", async ({ page }) => {
    const langButton = page.getByRole("button", { name: "Toggle language" });

    await langButton.click();
    const contactEn = page.getByRole("heading", {
      level: 2,
      name: "Contact",
    });
    await expect(contactEn).toBeVisible();

    await langButton.click();
    const contactEs = page.getByRole("heading", {
      level: 2,
      name: "Contacto",
    });
    await expect(contactEs).toBeVisible();
  });

  test("English shows translated section headings", async ({ page }) => {
    const langButton = page.getByRole("button", { name: "Toggle language" });
    await langButton.click();

    const contactHeading = page.getByRole("heading", {
      level: 2,
      name: "Contact",
    });
    await expect(contactHeading).toBeVisible();

    const aboutHeading = page.getByRole("heading", {
      level: 2,
      name: "Professional Profile",
    });
    await expect(aboutHeading).toBeVisible();
  });
});
