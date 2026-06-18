import { describe, it, expect } from 'vitest';
import {
  parseSpanishDate,
  computeDurationInMonths,
  computeDurationString,
  calculateTimelinePositions,
  expColors,
} from '@/lib/timelineUtils';
import { TimelineItem } from '@/data/timelineData';

describe('parseSpanishDate', () => {
  describe('full month names', () => {
    it("parses 'enero 2024' correctly", () => {
      expect(parseSpanishDate('enero 2024')).toEqual({ year: 2024, month: 1 });
    });

    it("parses 'febrero 2023' correctly", () => {
      expect(parseSpanishDate('febrero 2023')).toEqual({ year: 2023, month: 2 });
    });

    it("parses 'marzo 2022' correctly", () => {
      expect(parseSpanishDate('marzo 2022')).toEqual({ year: 2022, month: 3 });
    });

    it("parses 'abril 2021' correctly", () => {
      expect(parseSpanishDate('abril 2021')).toEqual({ year: 2021, month: 4 });
    });

    it("parses 'mayo 2020' correctly", () => {
      expect(parseSpanishDate('mayo 2020')).toEqual({ year: 2020, month: 5 });
    });

    it("parses 'junio 2019' correctly", () => {
      expect(parseSpanishDate('junio 2019')).toEqual({ year: 2019, month: 6 });
    });

    it("parses 'julio 2018' correctly", () => {
      expect(parseSpanishDate('julio 2018')).toEqual({ year: 2018, month: 7 });
    });

    it("parses 'agosto 2017' correctly", () => {
      expect(parseSpanishDate('agosto 2017')).toEqual({ year: 2017, month: 8 });
    });

    it("parses 'septiembre 2016' correctly", () => {
      expect(parseSpanishDate('septiembre 2016')).toEqual({ year: 2016, month: 9 });
    });

    it("parses 'octubre 2015' correctly", () => {
      expect(parseSpanishDate('octubre 2015')).toEqual({ year: 2015, month: 10 });
    });

    it("parses 'noviembre 2014' correctly", () => {
      expect(parseSpanishDate('noviembre 2014')).toEqual({ year: 2014, month: 11 });
    });

    it("parses 'diciembre 2013' correctly", () => {
      expect(parseSpanishDate('diciembre 2013')).toEqual({ year: 2013, month: 12 });
    });
  });

  describe('abbreviated month names', () => {
    it("parses 'ene. 2024' correctly", () => {
      expect(parseSpanishDate('ene. 2024')).toEqual({ year: 2024, month: 1 });
    });

    it("parses 'feb. 2023' correctly", () => {
      expect(parseSpanishDate('feb. 2023')).toEqual({ year: 2023, month: 2 });
    });

    it("parses 'mar. 2022' correctly", () => {
      expect(parseSpanishDate('mar. 2022')).toEqual({ year: 2022, month: 3 });
    });

    it("parses 'abr. 2021' correctly", () => {
      expect(parseSpanishDate('abr. 2021')).toEqual({ year: 2021, month: 4 });
    });

    it("parses 'may. 2020' correctly", () => {
      expect(parseSpanishDate('may. 2020')).toEqual({ year: 2020, month: 5 });
    });

    it("parses 'jun. 2019' correctly", () => {
      expect(parseSpanishDate('jun. 2019')).toEqual({ year: 2019, month: 6 });
    });

    it("parses 'jul. 2018' correctly", () => {
      expect(parseSpanishDate('jul. 2018')).toEqual({ year: 2018, month: 7 });
    });

    it("parses 'ago. 2017' correctly", () => {
      expect(parseSpanishDate('ago. 2017')).toEqual({ year: 2017, month: 8 });
    });

    it("parses 'sept. 2016' correctly", () => {
      expect(parseSpanishDate('sept. 2016')).toEqual({ year: 2016, month: 9 });
    });

    it("parses 'oct. 2015' correctly", () => {
      expect(parseSpanishDate('oct. 2015')).toEqual({ year: 2015, month: 10 });
    });

    it("parses 'nov. 2014' correctly", () => {
      expect(parseSpanishDate('nov. 2014')).toEqual({ year: 2014, month: 11 });
    });

    it("parses 'dic. 2013' correctly", () => {
      expect(parseSpanishDate('dic. 2013')).toEqual({ year: 2013, month: 12 });
    });
  });

  describe('case insensitivity', () => {
    it("parses 'ENERO 2024' as uppercase", () => {
      expect(parseSpanishDate('ENERO 2024')).toEqual({ year: 2024, month: 1 });
    });

    it("parses 'Marzo 2023' as mixed case", () => {
      expect(parseSpanishDate('Marzo 2023')).toEqual({ year: 2023, month: 3 });
    });

    it("parses 'DICIEMBRE 2022' as full uppercase", () => {
      expect(parseSpanishDate('DICIEMBRE 2022')).toEqual({ year: 2022, month: 12 });
    });
  });

  describe('punctuation handling', () => {
    it("strips trailing periods from 'enero. 2024'", () => {
      expect(parseSpanishDate('enero. 2024')).toEqual({ year: 2024, month: 1 });
    });

    it("strips commas from 'enero, 2024'", () => {
      expect(parseSpanishDate('enero, 2024')).toEqual({ year: 2024, month: 1 });
    });
  });

  describe('invalid inputs return null', () => {
    it('returns null for string with no month', () => {
      expect(parseSpanishDate('2024')).toBeNull();
    });

    it('returns null for string with no valid year', () => {
      expect(parseSpanishDate('enero')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(parseSpanishDate('')).toBeNull();
    });

    it('returns null for string with invalid year (too short)', () => {
      expect(parseSpanishDate('enero 99')).toBeNull();
    });

    it('returns null for string with non-numeric year', () => {
      expect(parseSpanishDate('enero abc')).toBeNull();
    });

    it('returns null for random text', () => {
      expect(parseSpanishDate('hello world')).toBeNull();
    });

    it('returns null for year below 1000', () => {
      expect(parseSpanishDate('enero 999')).toBeNull();
    });
  });
});

describe('computeDurationInMonths', () => {
  it('computes same month as 0 months', () => {
    expect(computeDurationInMonths('enero 2024', 'enero 2024')).toBe(0);
  });

  it('computes 3 months within same year', () => {
    expect(computeDurationInMonths('enero 2024', 'abril 2024')).toBe(3);
  });

  it('computes 12 months (exactly 1 year)', () => {
    expect(computeDurationInMonths('enero 2024', 'enero 2025')).toBe(12);
  });

  it('computes 15 months (1 year 3 months)', () => {
    expect(computeDurationInMonths('enero 2024', 'abril 2025')).toBe(15);
  });

  it('computes cross-year duration (oct 2008 to mar 2009)', () => {
    expect(computeDurationInMonths('oct. 2008', 'mar. 2009')).toBe(5);
  });

  it('computes long duration (abr 2010 to nov 2021)', () => {
    expect(computeDurationInMonths('abr. 2010', 'nov. 2021')).toBe(139);
  });

  it('returns 0 when start date is invalid', () => {
    expect(computeDurationInMonths('invalid', 'enero 2024')).toBe(0);
  });

  it('returns 0 when end date is invalid', () => {
    expect(computeDurationInMonths('enero 2024', 'invalid')).toBe(0);
  });

  it('returns 0 when both dates are invalid', () => {
    expect(computeDurationInMonths('invalid', 'also invalid')).toBe(0);
  });

  it('clamps negative duration to 0 (end before start)', () => {
    expect(computeDurationInMonths('abril 2024', 'enero 2024')).toBe(0);
  });
});

describe('computeDurationString', () => {
  it("returns '< 1 mes' for 0 months", () => {
    expect(computeDurationString('enero 2024', 'enero 2024')).toBe('< 1 mes');
  });

  it('returns singular month when less than 1 year', () => {
    expect(computeDurationString('enero 2024', 'marzo 2024')).toBe('2 meses');
  });

  it('returns 1 mes for exactly 1 month', () => {
    expect(computeDurationString('enero 2024', 'febrero 2024')).toBe('1 mes');
  });

  it('returns years only when exact', () => {
    expect(computeDurationString('enero 2024', 'enero 2025')).toBe('1 año');
  });

  it('returns years and months combined', () => {
    expect(computeDurationString('enero 2024', 'abril 2025')).toBe('1 año 3 meses');
  });

  it('returns plural years', () => {
    expect(computeDurationString('enero 2022', 'enero 2024')).toBe('2 años');
  });

  it("returns '< 1 mes' for invalid dates", () => {
    expect(computeDurationString('invalid', 'invalid')).toBe('< 1 mes');
  });

  it('handles 11 months (just under 1 year)', () => {
    expect(computeDurationString('enero 2024', 'diciembre 2024')).toBe('11 meses');
  });

  it('handles 1 year 1 mes', () => {
    expect(computeDurationString('enero 2024', 'febrero 2025')).toBe('1 año 1 mes');
  });
});

describe('calculateTimelinePositions', () => {
  const makeItem = (
    id: number,
    startDate: string,
    endDate: string,
    overrides?: Partial<TimelineItem>
  ): TimelineItem => ({
    id,
    startDateStr: startDate,
    endDateStr: endDate,
    year: String(startDate.split(' ')[1]),
    ...overrides,
  });

  it('returns empty array for empty input', () => {
    expect(calculateTimelinePositions([])).toEqual([]);
  });

  it('returns single item with startPos 0 and endPos 100', () => {
    const items = [makeItem(1, 'enero 2024', 'junio 2024')];
    const result = calculateTimelinePositions(items);
    expect(result).toHaveLength(1);
    expect(result[0].startPos).toBe(0);
    expect(result[0].endPos).toBe(100);
    expect(result[0].durationMonths).toBe(5);
  });

  it('sorts items chronologically by start date', () => {
    const items = [
      makeItem(2, 'marzo 2024', 'junio 2024'),
      makeItem(1, 'enero 2024', 'abril 2024'),
    ];
    const result = calculateTimelinePositions(items);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });

  it('sorts items across different years', () => {
    const items = [
      makeItem(2, 'enero 2025', 'junio 2025'),
      makeItem(1, 'enero 2024', 'junio 2024'),
    ];
    const result = calculateTimelinePositions(items);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });

  it('computes durationMonths and durationStr for each item', () => {
    const items = [
      makeItem(1, 'enero 2024', 'abril 2024'),
      makeItem(2, 'junio 2024', 'diciembre 2024'),
    ];
    const result = calculateTimelinePositions(items);
    expect(result[0].durationMonths).toBe(3);
    expect(result[0].durationStr).toBe('3 meses');
    expect(result[1].durationMonths).toBe(6);
    expect(result[1].durationStr).toBe('6 meses');
  });

  it('normalizes start position to 0 for earliest item', () => {
    const items = [
      makeItem(2, 'abril 2024', 'julio 2024'),
      makeItem(1, 'enero 2024', 'marzo 2024'),
    ];
    const result = calculateTimelinePositions(items);
    expect(result[0].startPos).toBe(0);
  });

  it('normalizes end position to 100 for latest item', () => {
    const items = [
      makeItem(1, 'enero 2024', 'marzo 2024'),
      makeItem(2, 'abril 2024', 'junio 2024'),
    ];
    const result = calculateTimelinePositions(items);
    expect(result[1].endPos).toBe(100);
  });

  it('computes correct proportional positions', () => {
    const items = [
      makeItem(1, 'enero 2024', 'enero 2025'),
      makeItem(2, 'enero 2025', 'enero 2026'),
    ];
    const result = calculateTimelinePositions(items);
    expect(result[0].startPos).toBe(0);
    expect(result[0].endPos).toBe(50);
    expect(result[1].startPos).toBe(50);
    expect(result[1].endPos).toBe(100);
  });

  it('preserves original item properties', () => {
    const items = [
      makeItem(1, 'enero 2024', 'junio 2024', {
        expTitle: 'Developer',
        expSubtitle: 'Company',
        expColor: 'green',
      }),
    ];
    const result = calculateTimelinePositions(items);
    expect(result[0].expTitle).toBe('Developer');
    expect(result[0].expSubtitle).toBe('Company');
    expect(result[0].expColor).toBe('green');
  });

  it('handles items with abbreviated dates from real data', () => {
    const items = [makeItem(7, 'sept. 2006', 'sept. 2007'), makeItem(12, 'abr. 2010', 'nov. 2021')];
    const result = calculateTimelinePositions(items);
    expect(result).toHaveLength(2);
    expect(result[0].durationMonths).toBe(12);
    expect(result[1].durationMonths).toBe(139);
  });

  it('computes correct positions for three items spanning 2 years', () => {
    const items = [
      makeItem(3, 'enero 2026', 'junio 2026'),
      makeItem(1, 'enero 2024', 'junio 2024'),
      makeItem(2, 'enero 2025', 'junio 2025'),
    ];
    const result = calculateTimelinePositions(items);
    // Should be sorted by start date
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
    // First item starts at 0
    expect(result[0].startPos).toBe(0);
    // Last item ends at 100
    expect(result[2].endPos).toBe(100);
  });
});

describe('expColors', () => {
  it('contains green, orange, and blue keys', () => {
    expect(expColors).toHaveProperty('green');
    expect(expColors).toHaveProperty('orange');
    expect(expColors).toHaveProperty('blue');
  });

  it('has correct structure for green', () => {
    expect(expColors.green).toEqual({
      border: 'border-green-500',
      text: 'text-green-400',
      bubble: 'bg-green-500',
      line: 'from-green-500 to-green-400',
    });
  });

  it('has correct structure for orange', () => {
    expect(expColors.orange).toEqual({
      border: 'border-amber-500',
      text: 'text-amber-400',
      bubble: 'bg-amber-400',
      line: 'from-amber-500 to-amber-400',
    });
  });

  it('has correct structure for blue', () => {
    expect(expColors.blue).toEqual({
      border: 'border-blue-500',
      text: 'text-blue-400',
      bubble: 'bg-blue-500',
      line: 'from-blue-500 to-blue-400',
    });
  });

  it('each color entry has border, text, bubble, and line properties', () => {
    for (const color of Object.values(expColors)) {
      expect(color).toHaveProperty('border');
      expect(color).toHaveProperty('text');
      expect(color).toHaveProperty('bubble');
      expect(color).toHaveProperty('line');
    }
  });
});
