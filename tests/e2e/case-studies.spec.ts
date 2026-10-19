import { test, expect } from '@playwright/test';

test.describe('Case Studies', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
  });

  test('Project detail page links to its case study', async ({ page }) => {
    await page.goto('/projects/qreaper');
    await page.waitForLoadState('load');

    const caseStudyLink = page.getByRole('link', { name: /Leer caso de estudio|Read case study/i });
    await expect(caseStudyLink).toBeVisible();
    await expect(caseStudyLink).toHaveAttribute('href', '/case-studies/qreaper');
  });

  test('Clicking the case study link navigates to the case study page', async ({ page }) => {
    await page.goto('/projects/qreaper');
    await page.waitForLoadState('load');

    await page.getByRole('link', { name: /Leer caso de estudio|Read case study/i }).click();

    await expect(page).toHaveURL('/case-studies/qreaper', { timeout: 15000 });
    await expect(page.getByRole('heading', { level: 1 })).toContainText('QReaper');
  });

  test('Case study page shows all narrative sections', async ({ page }) => {
    await page.goto('/case-studies/qreaper');
    await page.waitForLoadState('load');

    await expect(page.getByRole('heading', { level: 2, name: 'Contexto' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Problema' })).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Decisiones técnicas' })
    ).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Arquitectura' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Resultados' })).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Qué haría distinto' })
    ).toBeVisible();
  });

  test('Technical decisions are numbered', async ({ page }) => {
    await page.goto('/case-studies/qreaper');
    await page.waitForLoadState('load');

    const decisionBadges = page.locator('ol li span[aria-hidden="true"]');
    await expect(decisionBadges.first()).toBeVisible();
    await expect(decisionBadges.first()).toHaveText('1');
  });

  test('Case study page links back to the project page', async ({ page }) => {
    await page.goto('/case-studies/vulnprio');
    await page.waitForLoadState('load');

    const backLink = page.getByRole('link', {
      name: /Ver ficha del proyecto|View project page/i,
    });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute('href', '/projects/vulnprio');

    await backLink.click();
    await expect(page).toHaveURL('/projects/vulnprio', { timeout: 15000 });
  });

  test('VulnPrio case study renders the ERD diagram', async ({ page }) => {
    await page.goto('/case-studies/vulnprio');
    await page.waitForLoadState('load');

    const diagram = page.getByRole('img', {
      name: /Modelo de datos de VulnPrio|VulnPrio data model/i,
    });
    await expect(diagram).toBeVisible();
    await expect(diagram).toHaveAttribute('src', '/erd/vulnprio.svg');
  });

  test('Security Header Scanner case study keeps the GitHub link', async ({ page }) => {
    await page.goto('/case-studies/auditoria-web');
    await page.waitForLoadState('load');

    const githubLink = page.getByRole('link', {
      name: /Repositorio en GitHub|GitHub repository/i,
    });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/Andres-Caso-Iglesias/Auditoria-web'
    );
  });

  test('Case study sections render in English after language switch', async ({ page }) => {
    const langButton = page.getByRole('button', { name: /Switch to English|Cambiar a Español/i });
    await langButton.click();

    await page.goto('/case-studies/qreaper');
    await page.waitForLoadState('load');

    await expect(page.getByRole('heading', { level: 2, name: 'Context' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Problem' })).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'Technical decisions' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 2, name: 'What I would do differently' })
    ).toBeVisible();
  });

  test('Unknown case study slug returns the 404 page', async ({ page }) => {
    const response = await page.goto('/case-studies/does-not-exist');
    expect(response?.status()).toBe(404);
  });
});
