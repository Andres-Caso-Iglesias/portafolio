const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Load translations from the unified locales.json (post-2A migration)
// This file is now the single source of truth for the running app.
const locales = require('../src/i18n/locales.json');

function t(lang, pathKey) {
  const parts = pathKey.split('.');
  let cur = locales[lang];
  for (const p of parts) {
    if (!cur) return '';
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : '';
}

// Walks a locales tree and returns a Set of all dot-paths present.
function collectKeys(node, prefix) {
  const keys = new Set();
  for (const k of Object.keys(node)) {
    const full = prefix ? `${prefix}.${k}` : k;
    const v = node[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const sub = collectKeys(v, full);
      for (const s of sub) keys.add(s);
    } else {
      keys.add(full);
    }
  }
  return keys;
}

try {
  // ─── ES basic keys ─────────────────────────────────────────────
  assert.strictEqual(t('es', 'home.title'), 'Andrés Caso Iglesias');
  assert.strictEqual(t('es', 'home.subtitle'), 'Desarrollador');
  assert.ok(t('es', 'home.seoTitle').length > 0);

  // ─── EN basic keys ─────────────────────────────────────────────
  assert.strictEqual(t('en', 'home.title'), 'Andrés Caso Iglesias');
  assert.strictEqual(t('en', 'home.subtitle'), 'Developer');
  assert.ok(t('en', 'home.seoTitle').length > 0);

  // ─── PINNED: "Seniority Hibrido" (decision #44, 2026-05-10) ─────
  // Regression guard: if a future edit drops the Seniority Hibrido
  // copy from the unified locales.json, this test must fail loudly.
  assert.ok(
    t('es', 'home.profileDifferTitle').includes('Seniority Híbrido'),
    'es home.profileDifferTitle must contain "Seniority Híbrido"'
  );
  assert.ok(
    t('en', 'home.profileDifferTitle').includes('Hybrid Seniority'),
    'en home.profileDifferTitle must contain "Hybrid Seniority"'
  );

  // ─── Key parity between es and en (no orphan keys) ──────────────
  const esKeys = collectKeys(locales.es, '');
  const enKeys = collectKeys(locales.en, '');
  assert.strictEqual(esKeys.size, enKeys.size, 'es and en have different key counts');
  for (const k of esKeys) {
    assert.ok(enKeys.has(k), `key "${k}" exists in es but missing in en`);
  }
  for (const k of enKeys) {
    assert.ok(esKeys.has(k), `key "${k}" exists in en but missing in es`);
  }

  // ─── Both locales have a meaningful number of keys ──────────────
  assert.ok(esKeys.size >= 20, `es locales should have >=20 keys, has ${esKeys.size}`);

  console.log('i18n_smoke: OK');
} catch (e) {
  console.error('i18n_smoke: FAIL', e);
  process.exit(1);
}
