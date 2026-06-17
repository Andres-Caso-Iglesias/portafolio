import { test, expect } from "@playwright/test";

test.describe("Projects", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Projects section renders project cards", async ({ page }) => {
    const projectsHeading = page.getByRole("heading", {
      level: 2,
      name: /Proyectos|Projects/i,
    });
    await expect(projectsHeading).toBeVisible();

    const firstProjectCard = page.getByRole("heading", {
      level: 3,
      name: /Security Header Scanner/i,
    });
    await expect(firstProjectCard).toBeVisible();
  });

  test("Each project card shows tech stack tags", async ({ page }) => {
    const techTag = page.locator("span").filter({ hasText: "NestJS 11" }).first();
    await expect(techTag).toBeVisible();
  });

  test("Each project card has a GitHub link", async ({ page }) => {
    const githubLink = page.getByRole("link", { name: /Ver en GitHub|View on GitHub/i }).first();
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("target", "_blank");
  });

  test("Click on a project opens the modal", async ({ page }) => {
    const projectCard = page.getByRole("heading", {
      level: 3,
      name: /Security Header Scanner/i,
    });
    await projectCard.click();

    const modalTitle = page.locator("h2").filter({ hasText: /Security Header Scanner/i });
    await expect(modalTitle).toBeVisible();
  });

  test("Modal has all four tabs", async ({ page }) => {
    const projectCard = page.getByRole("heading", {
      level: 3,
      name: /Security Header Scanner/i,
    });
    await projectCard.click();

    const challengeTab = page.getByRole("button", { name: /Reto|Challenge/i }).first();
    const solutionTab = page.getByRole("button", { name: /Solución|Solution/i }).first();
    const architectureTab = page.getByRole("button", { name: /Arquitectura|Architecture/i }).first();
    const snippetsTab = page.getByRole("button", { name: /Snippets de Código|Code Snippets/i }).first();

    await expect(challengeTab).toBeVisible();
    await expect(solutionTab).toBeVisible();
    await expect(architectureTab).toBeVisible();
    await expect(snippetsTab).toBeVisible();
  });

  test("Challenge tab shows content by default", async ({ page }) => {
    const projectCard = page.getByRole("heading", {
      level: 3,
      name: /Security Header Scanner/i,
    });
    await projectCard.click();

    const challengeContent = page.locator(".prose").first();
    await expect(challengeContent).not.toBeEmpty();
  });

  test("Clicking Solution tab shows solution content", async ({ page }) => {
    const projectCard = page.getByRole("heading", {
      level: 3,
      name: /Security Header Scanner/i,
    });
    await projectCard.click();

    const solutionTab = page.getByRole("button", { name: /Solución|Solution/i }).first();
    await solutionTab.click();

    const solutionContent = page.locator(".prose").first();
    await expect(solutionContent).not.toBeEmpty();
  });

  test("Clicking Architecture tab shows architecture content", async ({ page }) => {
    const projectCard = page.getByRole("heading", {
      level: 3,
      name: /Security Header Scanner/i,
    });
    await projectCard.click();

    const architectureTab = page.getByRole("button", { name: /Arquitectura|Architecture/i }).first();
    await architectureTab.click();

    const architectureContent = page.locator(".prose").first();
    await expect(architectureContent).not.toBeEmpty();
  });

  test("Close modal with X button", async ({ page }) => {
    const projectCard = page.getByRole("heading", {
      level: 3,
      name: /Security Header Scanner/i,
    });
    await projectCard.click();

    const modalTitle = page.locator("h2").filter({ hasText: /Security Header Scanner/i });
    await expect(modalTitle).toBeVisible();

    const closeButton = page.locator("button").filter({ hasText: "\u00d7" });
    await closeButton.click();

    await expect(modalTitle).not.toBeVisible();
  });

  test("Close modal with Escape key", async ({ page }) => {
    const projectCard = page.getByRole("heading", {
      level: 3,
      name: /Security Header Scanner/i,
    });
    await projectCard.click();

    const modalTitle = page.locator("h2").filter({ hasText: /Security Header Scanner/i });
    await expect(modalTitle).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(modalTitle).not.toBeVisible();
  });

  test("Navigate to project detail page loads correctly", async ({ page }) => {
    await page.goto("/projects/auditoria-web");
    await page.waitForLoadState("networkidle");

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText("Security Header Scanner");

    const erdSection = page.getByRole("heading", {
      level: 2,
      name: /Entity Relationship Diagram/,
    });
    await expect(erdSection).toBeVisible();
  });

  test("Project detail page shows GitHub link", async ({ page }) => {
    await page.goto("/projects/auditoria-web");
    await page.waitForLoadState("networkidle");

    const githubLink = page.getByRole("link", { name: /GitHub Repository/i });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("target", "_blank");
  });
});
