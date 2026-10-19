import { describe, it, expect } from 'vitest';
import { t } from '@/lib/i18n';
import locales from '@/i18n/locales.json';

function collectLeafKeys(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) {
    return [prefix];
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
    collectLeafKeys(value, prefix ? `${prefix}.${key}` : key)
  );
}

describe('t() function', () => {
  describe('simple key lookup', () => {
    it('returns the value for a top-level key', () => {
      expect(t('es', 'home.title')).toBe('Andrés Caso Iglesias');
    });

    it('returns the value for a nested key', () => {
      expect(t('es', 'home.subtitle')).toBe(
        'Backend developer bilingüe nativo con enfoque en ciberseguridad'
      );
    });

    it('returns the key itself when the key does not exist', () => {
      expect(t('es', 'nonexistent.key')).toBe('nonexistent.key');
    });

    it('returns the key itself for a completely missing path', () => {
      expect(t('en', 'foo.bar.baz')).toBe('foo.bar.baz');
    });
  });

  describe('bilingual lookup', () => {
    it("returns Spanish text for lang='es'", () => {
      expect(t('es', 'home.skillsTitle')).toBe('Habilidades Técnicas');
    });

    it("returns English text for lang='en'", () => {
      expect(t('en', 'home.skillsTitle')).toBe('Technical Skills');
    });

    it('returns different translations for the same key', () => {
      const esValue = t('es', 'home.contactTitle');
      const enValue = t('en', 'home.contactTitle');
      expect(esValue).toBe('Contacto');
      expect(enValue).toBe('Contact');
      expect(esValue).not.toBe(enValue);
    });
  });

  describe('interpolation with vars', () => {
    it('replaces a single placeholder', () => {
      expect(t('es', 'home.title', {})).toBe('Andrés Caso Iglesias');
    });

    it('preserves the value when no vars are passed', () => {
      expect(t('es', 'home.title')).toBe('Andrés Caso Iglesias');
    });

    it('leaves placeholder intact when var is not provided in vars', () => {
      const result = t('es', 'home.title');
      expect(result).not.toContain('{missing}');
    });
  });

  describe('edge cases', () => {
    it('returns the key for an empty string', () => {
      expect(t('es', '')).toBe('');
    });

    it('returns the key when key is a single segment not found', () => {
      expect(t('es', 'nonexistent')).toBe('nonexistent');
    });

    it('returns empty string for a deeply nested missing key', () => {
      const result = t('es', 'a.b.c.d');
      expect(result).toBe('a.b.c.d');
    });
  });
});

describe('i18n parity (ES/EN)', () => {
  const esKeys = collectLeafKeys(locales.es).sort();
  const enKeys = collectLeafKeys(locales.en).sort();

  it('has at least one key in each language', () => {
    expect(esKeys.length).toBeGreaterThan(0);
    expect(enKeys.length).toBeGreaterThan(0);
  });

  it('has no keys missing in EN that exist in ES', () => {
    const missingInEn = esKeys.filter(key => !enKeys.includes(key));
    expect(missingInEn).toEqual([]);
  });

  it('has no keys missing in ES that exist in EN', () => {
    const missingInEs = enKeys.filter(key => !esKeys.includes(key));
    expect(missingInEs).toEqual([]);
  });

  it('has identical key sets in both languages', () => {
    expect(enKeys).toEqual(esKeys);
  });

  it('has no empty values in either language', () => {
    const emptyEs = esKeys.filter(key => t('es', key).trim() === '');
    const emptyEn = enKeys.filter(key => t('en', key).trim() === '');
    expect(emptyEs).toEqual([]);
    expect(emptyEn).toEqual([]);
  });
});
