const assert = require('assert');
const locales = require('../src/i18n/locales.json');

function t(lang, path) {
  const parts = path.split('.');
  let cur = locales[lang];
  for (const p of parts) {
    if (!cur) return '';
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : '';
}

try {
  // Title/Description exist for both locales
  ['es','en'].forEach(l => {
    const title = t(l, 'home.seoTitle');
    const desc = t(l, 'home.seoDescription');
    assert.ok(typeof title === 'string' && title.length > 0);
    assert.ok(typeof desc === 'string' && desc.length > 0);
  });
  console.log('seo_smoke: OK');
} catch (e) {
  console.error('seo_smoke: FAIL', e);
  process.exit(1);
}
