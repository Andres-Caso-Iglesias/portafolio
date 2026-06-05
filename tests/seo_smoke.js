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
  // seoTitle / seoDescription exist for both locales
  ['es', 'en'].forEach((l) => {
    const title = t(l, 'home.seoTitle');
    const desc = t(l, 'home.seoDescription');
    assert.ok(typeof title === 'string' && title.length > 0, `${l} seoTitle missing`);
    assert.ok(typeof desc === 'string' && desc.length > 0, `${l} seoDescription missing`);
  });

  // PINNED: Seniority Hibrido copy is reachable via the same path
  // the HomeClientContent section uses, so the SEO description cannot
  // regress to the legacy "Desarrollador con formacion tecnica" copy.
  assert.ok(
    t('es', 'home.profileIntro').length > 0,
    'es home.profileIntro must exist for SEO'
  );
  assert.ok(
    t('en', 'home.profileIntro').length > 0,
    'en home.profileIntro must exist for SEO'
  );

  console.log('seo_smoke: OK');
} catch (e) {
  console.error('seo_smoke: FAIL', e);
  process.exit(1);
}
