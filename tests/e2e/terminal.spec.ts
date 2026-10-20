import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Terminal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
  });

  const openTerminal = async (page: import('@playwright/test').Page) => {
    const button = page.getByRole('button', { name: /Abrir terminal|Open terminal/i });
    await button.click();
  };

  test('Terminal toggle button is visible', async ({ page }) => {
    const button = page.getByRole('button', { name: /Abrir terminal|Open terminal/i });
    await expect(button).toBeVisible();
  });

  test('Clicking the toggle opens the terminal dialog with a welcome banner', async ({ page }) => {
    await openTerminal(page);

    const dialog = page.getByRole('dialog', {
      name: /Terminal de entrevista|Interview terminal/i,
    });
    await expect(dialog).toBeVisible();

    const log = page.getByRole('log');
    await expect(log).toContainText('Pinche CLI v1.0');
  });

  test('help command lists the available commands', async ({ page }) => {
    await openTerminal(page);

    const input = page.getByPlaceholder(/Escribe un comando|Type a command/i);
    await input.fill('help');
    await input.press('Enter');

    const log = page.getByRole('log');
    await expect(log).toContainText('Comandos disponibles');
    await expect(log).toContainText('whoami');
    await expect(log).toContainText('lang');
  });

  test('free text resolves through the rule-based matcher', async ({ page }) => {
    await openTerminal(page);

    const input = page.getByPlaceholder(/Escribe un comando|Type a command/i);
    await input.fill('experiencia laboral');
    await input.press('Enter');

    const log = page.getByRole('log');
    await expect(log).toContainText('hostelería', { timeout: 15_000 });
  });

  test('Esc closes the terminal', async ({ page }) => {
    await openTerminal(page);

    const dialog = page.getByRole('dialog', {
      name: /Terminal de entrevista|Interview terminal/i,
    });
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  test('Ctrl+K opens the terminal from anywhere', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Abrir terminal|Open terminal/i })).toBeVisible();
    await page.keyboard.press('Control+k');

    const dialog = page.getByRole('dialog', {
      name: /Terminal de entrevista|Interview terminal/i,
    });
    await expect(dialog).toBeVisible();
  });

  test('Typing ~ or iddqd inside the terminal input does not trigger secrets', async ({ page }) => {
    await openTerminal(page);

    const input = page.getByPlaceholder(/Escribe un comando|Type a command/i);
    await input.fill('iddqd');
    await input.fill('~');

    await expect(page.locator('html')).not.toHaveClass(/retro/);
    await expect(page.getByRole('status')).toHaveCount(0);
  });

  test('clear command wipes the screen', async ({ page }) => {
    await openTerminal(page);

    const input = page.getByPlaceholder(/Escribe un comando|Type a command/i);
    await input.fill('help');
    await input.press('Enter');

    const log = page.getByRole('log');
    await expect(log).toContainText('Comandos disponibles');

    await input.fill('clear');
    await input.press('Enter');
    await expect(log).not.toContainText('Comandos disponibles');
  });

  test('lang command switches the language', async ({ page }) => {
    await openTerminal(page);

    const input = page.getByPlaceholder(/Escribe un comando|Type a command/i);
    await input.fill('lang en');
    await input.press('Enter');

    const cookies = await page.context().cookies();
    const langCookie = cookies.find(cookie => cookie.name === 'lang');
    expect(langCookie?.value).toBe('en');

    const log = page.getByRole('log');
    await expect(log).toContainText('Idioma cambiado');

    await input.fill('help');
    await input.press('Enter');
    await expect(log).toContainText('Available commands');
  });

  test('English UI shows the terminal in English', async ({ page }) => {
    const langButton = page.getByRole('button', { name: /Switch to English|Cambiar a Español/i });
    await langButton.click();

    await openTerminal(page);

    const input = page.getByPlaceholder(/Escribe un comando|Type a command/i);
    await input.fill('help');
    await input.press('Enter');

    const log = page.getByRole('log');
    await expect(log).toContainText('Available commands');
  });

  test('Sending a message makes no request to /api/chat', async ({ page }) => {
    const apiRequests: string[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/chat')) {
        apiRequests.push(request.url());
      }
    });

    await openTerminal(page);

    const input = page.getByPlaceholder(/Escribe un comando|Type a command/i);
    await input.fill('experiencia laboral');
    await input.press('Enter');

    const log = page.getByRole('log');
    await expect(log).toContainText('hostelería', { timeout: 15_000 });
    expect(apiRequests).toHaveLength(0);
  });

  test('Terminal dialog has no axe violations when open', async ({ page }) => {
    await openTerminal(page);

    type AxePage = ConstructorParameters<typeof AxeBuilder>[0]['page'];
    const results = await new AxeBuilder({ page: page as unknown as AxePage })
      .include('[role="dialog"]')
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
