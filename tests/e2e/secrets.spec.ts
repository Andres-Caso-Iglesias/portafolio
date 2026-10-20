import { test, expect } from '@playwright/test';

const KONAMI_KEYS = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

test.describe('Secrets and easter eggs', () => {
  test('/teapot returns 418 with a themed body', async ({ request }) => {
    const response = await request.get('/teapot');
    expect(response.status()).toBe(418);
    const body = await response.text();
    expect(body).toContain('418');
  });

  test('robots.txt disallows /admin-backup', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain('Disallow: /admin-backup');
  });

  test('/admin-backup returns 200 with X-Robots-Tag and is not in the sitemap', async ({
    request,
  }) => {
    const response = await request.get('/admin-backup');
    expect(response.status()).toBe(200);
    expect(response.headers()['x-robots-tag']).toBe('noindex, nofollow, noarchive');

    const sitemap = await request.get('/sitemap.xml');
    const sitemapBody = await sitemap.text();
    expect(sitemapBody).not.toContain('/admin-backup');
  });

  test('honeypot login never submits over the network', async ({ page }) => {
    await page.goto('/admin-backup');

    const postRequests: string[] = [];
    page.on('request', request => {
      if (request.method() === 'POST') {
        postRequests.push(request.url());
      }
    });

    await page.getByLabel('Usuario').fill('admin');
    await page.getByLabel('Contraseña').fill('password');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.getByRole('status')).toContainText('SQL injection detectada');
    await expect(page.getByRole('link', { name: 'Ir a contacto' })).toBeVisible();
    expect(postRequests).toHaveLength(0);
  });

  test('konami code toggles retro mode with a toast', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    for (const key of KONAMI_KEYS) {
      await page.keyboard.press(key);
    }
    await expect(page.locator('html')).toHaveClass(/retro/);
    await expect(page.getByRole('status')).toContainText('MODO RETRO ACTIVADO');

    for (const key of KONAMI_KEYS) {
      await page.keyboard.press(key);
    }
    await expect(page.locator('html')).not.toHaveClass(/retro/);
    await expect(page.getByRole('status')).toContainText('Modo retro desactivado');
  });

  test('iddqd shows the god mode toast without retro mode', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');

    await page.keyboard.type('iddqd');
    await expect(page.getByRole('status')).toContainText('God mode');
    await expect(page.locator('html')).not.toHaveClass(/retro/);
  });

  test('typing iddqd or ~ in an editable field triggers nothing', async ({ page }) => {
    await page.goto('/admin-backup');

    const userInput = page.getByLabel('Usuario');
    await userInput.type('iddqd');
    await userInput.type('~');

    await expect(page.locator('html')).not.toHaveClass(/retro/);
    await expect(page.getByRole('status')).toHaveCount(0);
  });

  test('unknown routes return a 404 page', async ({ page }) => {
    const response = await page.goto('/definitely-not-a-page-xyz');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
  });
});
