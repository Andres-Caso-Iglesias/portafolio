import { test, expect } from '@playwright/test';

test.describe('Projects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
  });

  test('Projects section renders project cards', async ({ page }) => {
    const projectsHeading = page.getByRole('heading', {
      level: 2,
      name: /Proyectos|Projects/i,
    });
    await expect(projectsHeading).toBeVisible();

    const firstProjectCard = page.getByRole('heading', {
      level: 3,
      name: /Security Header Scanner/i,
    });
    await expect(firstProjectCard).toBeVisible();
  });

  test('Each project card shows tech stack tags', async ({ page }) => {
    const techTag = page.locator('span').filter({ hasText: 'NestJS 11' }).first();
    await expect(techTag).toBeVisible();
  });

  test('Each project card has a GitHub link', async ({ page }) => {
    const githubLink = page.getByRole('link', { name: /Ver en GitHub|View on GitHub/i }).first();
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('Click on a project opens the modal', async ({ page }) => {
    const projectCard = page.getByRole('heading', { level: 3, name: /FoodBites/i }).first();
    await projectCard.click({ force: true });

    const modalTitle = page.locator('h2').filter({ hasText: /FoodBites/i });
    await expect(modalTitle).toBeVisible();
  });

  test('Modal has all four tabs', async ({ page }) => {
    const projectCard = page.getByRole('heading', { level: 3, name: /FoodBites/i }).first();
    await projectCard.click({ force: true });

    const challengeTab = page.getByRole('dialog').getByRole('button', { name: /Reto|Challenge/i });
    const solutionTab = page
      .getByRole('dialog')
      .getByRole('button', { name: /Solución|Solution/i });
    const architectureTab = page
      .getByRole('dialog')
      .getByRole('button', { name: /Arquitectura|Architecture/i });
    const snippetsTab = page
      .getByRole('dialog')
      .getByRole('button', { name: /Snippets de Código|Code Snippets/i });

    await expect(challengeTab).toBeVisible();
    await expect(solutionTab).toBeVisible();
    await expect(architectureTab).toBeVisible();
    await expect(snippetsTab).toBeVisible();
  });

  test('Challenge tab shows content by default', async ({ page }) => {
    const projectCard = page.getByRole('heading', { level: 3, name: /FoodBites/i }).first();
    await projectCard.click({ force: true });

    const challengeContent = page.locator('.prose').first();
    await expect(challengeContent).not.toBeEmpty();
  });

  test('Clicking Solution tab shows solution content', async ({ page }) => {
    const projectCard = page.getByRole('heading', { level: 3, name: /FoodBites/i }).first();
    await projectCard.click({ force: true });

    const solutionTab = page
      .getByRole('dialog')
      .getByRole('button', { name: /Solución|Solution/i });
    await solutionTab.click();

    const solutionContent = page.locator('.prose').first();
    await expect(solutionContent).not.toBeEmpty();
  });

  test('Clicking Architecture tab shows architecture content', async ({ page }) => {
    const projectCard = page.getByRole('heading', { level: 3, name: /FoodBites/i }).first();
    await projectCard.click({ force: true });

    const architectureTab = page
      .getByRole('dialog')
      .getByRole('button', { name: /Arquitectura|Architecture/i });
    await architectureTab.click();

    const architectureContent = page.locator('.prose').first();
    await expect(architectureContent).not.toBeEmpty();
  });

  test('Close modal with X button', async ({ page }) => {
    const projectCard = page.getByRole('heading', { level: 3, name: /FoodBites/i }).first();
    await projectCard.click({ force: true });

    const modalTitle = page.locator('h2').filter({ hasText: /FoodBites/i });
    await expect(modalTitle).toBeVisible();

    const closeButton = page.locator('button').filter({ hasText: '\u00d7' });
    await closeButton.click();

    await expect(modalTitle).not.toBeVisible();
  });

  test('Close modal with Escape key', async ({ page }) => {
    const projectCard = page.getByRole('heading', { level: 3, name: /FoodBites/i }).first();
    await projectCard.click({ force: true });

    const modalTitle = page.locator('h2').filter({ hasText: /FoodBites/i });
    await expect(modalTitle).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(modalTitle).not.toBeVisible();
  });

  test('Clicking a featured project navigates to its detail page', async ({ page }) => {
    const featuredCard = page.getByRole('heading', { level: 3, name: /QReaper/i });
    await featuredCard.click();

    await expect(page).toHaveURL('/projects/qreaper', { timeout: 15000 });
    await expect(page.getByRole('heading', { level: 1 })).toContainText('QReaper');
  });

  test('Navigate to project detail page loads correctly', async ({ page }) => {
    await page.goto('/projects/auditoria-web');
    await page.waitForLoadState('load');

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toContainText('Security Header Scanner');

    const erdSection = page.getByRole('heading', {
      level: 2,
      name: /Entity Relationship Diagram|Diagrama Entidad-Relación/i,
    });
    await expect(erdSection).toBeVisible();
  });

  test('Project detail page shows GitHub link', async ({ page }) => {
    await page.goto('/projects/auditoria-web');
    await page.waitForLoadState('load');

    const githubLink = page.getByRole('link', {
      name: /GitHub Repository|Repositorio en GitHub/i,
    });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('QReaper detail page offers the PDF report and no GitHub link', async ({ page }) => {
    await page.goto('/projects/qreaper');
    await page.waitForLoadState('load');

    const pdfLink = page.getByRole('link', { name: /Informe de la práctica|Practice report/i });
    await expect(pdfLink).toBeVisible();
    await expect(pdfLink).toHaveAttribute('href', '/informe_proyecto.pdf');

    await expect(
      page.getByRole('link', { name: /Repositorio en GitHub|GitHub Repository/i })
    ).toHaveCount(0);
  });

  test('No dead GitHub link points at the removed QReaper repository', async ({ page }) => {
    await expect(page.locator('a[href*="bdjoseluis"]')).toHaveCount(0);
  });

  test('Marquee clone cards are excluded from keyboard and screen reader navigation', async ({
    page,
  }) => {
    const marqueeRegion = page.locator(
      'div[role="region"][aria-labelledby="projects-more-label"]'
    );
    const cards = marqueeRegion.locator('article[role="button"]');
    await expect(cards).toHaveCount(16);

    const clones = marqueeRegion.locator(
      'article[role="button"][aria-hidden="true"][tabindex="-1"]'
    );
    await expect(clones).toHaveCount(12);

    const originals = marqueeRegion.locator(
      'article[role="button"][tabindex="0"]:not([aria-hidden])'
    );
    await expect(originals).toHaveCount(4);

    await expect(clones.locator('a[tabindex="-1"]')).toHaveCount(12);
    await expect(originals.locator('a:not([tabindex])')).toHaveCount(4);

    await expect(page.locator('[inert]')).toHaveCount(0);
  });
});
