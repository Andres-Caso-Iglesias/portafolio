import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Home page loads successfully with status 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('Page title contains expected text', async ({ page }) => {
    await expect(page).toHaveTitle(/Andres Caso Iglesias/i);
  });

  test('Hero section displays the name', async ({ page }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Andrés Caso Iglesias');
  });

  test('Language switch button is visible in the header', async ({ page }) => {
    const langButton = page.getByRole('button', { name: 'Toggle language' });
    await expect(langButton).toBeVisible();
  });

  test('About section heading is visible', async ({ page }) => {
    const aboutHeading = page.getByRole('heading', {
      level: 2,
      name: /Perfil Profesional|Professional Profile/i,
    });
    await expect(aboutHeading).toBeVisible();
  });

  test('Skills section heading is visible', async ({ page }) => {
    const skillsHeading = page.getByRole('heading', {
      level: 2,
      name: /Habilidades Técnicas|Technical Skills/i,
    });
    await skillsHeading.scrollIntoViewIfNeeded();
    await expect(skillsHeading).toBeVisible();
  });

  test('Projects section heading is visible', async ({ page }) => {
    const projectsHeading = page.getByRole('heading', {
      level: 2,
      name: /Proyectos|Projects/i,
    });
    await expect(projectsHeading).toBeVisible();
  });

  test('Contact section heading is visible', async ({ page }) => {
    const contactHeading = page.getByRole('heading', {
      level: 2,
      name: /Contacto|Contact/i,
    });
    await expect(contactHeading).toBeVisible();
  });

  test('Footer displays copyright text', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toContainText(/Caso Iglesias/i);
  });
});
