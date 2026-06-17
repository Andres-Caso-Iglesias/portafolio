import { test, expect } from "@playwright/test";

test.describe("Chat", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Chat toggle button is visible", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: /Abrir chat|Cerrar chat/i });
    await expect(chatButton).toBeVisible();
  });

  test("Clicking chat toggle opens the chat window", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: "Abrir chat" });
    await chatButton.click();

    const chatHeader = page.getByRole("heading", { name: "Pinche de Andrés" });
    await expect(chatHeader).toBeVisible();
  });

  test("Chat window shows welcome message", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: "Abrir chat" });
    await chatButton.click();

    const messagesContainer = page.locator(".overflow-y-auto").first();
    await expect(messagesContainer).not.toBeEmpty();
  });

  test("Quick action buttons are visible when chat opens", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: "Abrir chat" });
    await chatButton.click();

    const quickActionsLabel = page.getByText(/Preguntas frecuentes|Quick questions/i);
    await expect(quickActionsLabel).toBeVisible();
  });

  test("Quick action buttons are clickable", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: "Abrir chat" });
    await chatButton.click();

    const firstQuickAction = page.getByRole("button", { name: "Experiencia" });
    await expect(firstQuickAction).toBeVisible();
    await firstQuickAction.click();

    const userMessage = page.locator(".bg-blue-600").first();
    await expect(userMessage).toBeVisible();
  });

  test("Chat input textarea is present", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: "Abrir chat" });
    await chatButton.click();

    const textarea = page.getByPlaceholder(/Escribe tu pregunta|Type your question/i);
    await expect(textarea).toBeVisible();
  });

  test("Send a message and receive a response", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: "Abrir chat" });
    await chatButton.click();

    const textarea = page.getByPlaceholder(/Escribe tu pregunta|Type your question/i);
    await textarea.fill("experiencia");

    const sendButton = page.getByRole("button", { name: "Enviar mensaje" });
    await sendButton.click();

    const userMessage = page.locator(".bg-blue-600").first();
    await expect(userMessage).toBeVisible();

    await page.waitForTimeout(1500);

    const assistantMessages = page.locator(".bg-slate-700");
    await expect(assistantMessages.first()).toBeVisible();
  });

  test("Chat handles English input", async ({ page }) => {
    const langButton = page.getByRole("button", { name: "Toggle language" });
    await langButton.click();

    const chatButton = page.getByRole("button", { name: "Abrir chat" });
    await chatButton.click();

    const textarea = page.getByPlaceholder(/Escribe tu pregunta|Type your question/i);
    await textarea.fill("experience");

    const sendButton = page.getByRole("button", { name: "Enviar mensaje" });
    await sendButton.click();

    const userMessage = page.locator(".bg-blue-600").first();
    await expect(userMessage).toBeVisible();

    await page.waitForTimeout(1500);

    const assistantMessages = page.locator(".bg-slate-700");
    await expect(assistantMessages.first()).toBeVisible();
  });

  test("Close chat window with close button", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: "Abrir chat" });
    await chatButton.click();

    const chatHeader = page.getByRole("heading", { name: "Pinche de Andrés" });
    await expect(chatHeader).toBeVisible();

    const closeButton = page.getByRole("button", { name: "Cerrar chat" }).last();
    await closeButton.click();

    await expect(chatHeader).not.toBeVisible();
  });

  test("Chat toggle button changes icon when chat is open", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: "Abrir chat" });
    await chatButton.click();

    const closeButton = page.getByRole("button", { name: "Cerrar chat" }).first();
    await expect(closeButton).toBeVisible();
  });
});
