const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Load translations from the JSON payload we added for testing
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

try {
  // ES checks
  assert.strictEqual(t('es', 'home.title'), 'Andrés Caso Iglesias');
  assert.strictEqual(t('es', 'home.subtitle'), 'Desarrollador');
  assert.ok(t('es', 'home.seoTitle').length > 0);
  // EN checks
  assert.strictEqual(t('en', 'home.title'), 'Andrés Caso Iglesias');
  assert.strictEqual(t('en', 'home.subtitle'), 'Developer');
  assert.ok(t('en', 'home.seoTitle').length > 0);
  console.log('i18n_smoke: OK');
} catch (e) {
  console.error('i18n_smoke: FAIL', e);
  process.exit(1);
}
