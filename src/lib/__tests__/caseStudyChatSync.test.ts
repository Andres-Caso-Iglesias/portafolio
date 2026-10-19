import { describe, it, expect } from 'vitest';
import { caseStudies } from '@/data/caseStudiesData';
import { allResponses } from '@/data/chat/allResponses';

const RESPONSE_ID_PREFIX = 'project-';

describe('caseStudies <-> chat coverage', () => {
  it('has at least 3 case studies', () => {
    expect(caseStudies.length).toBeGreaterThanOrEqual(3);
  });

  for (const cs of caseStudies) {
    describe(`case study "${cs.slug}"`, () => {
      const response = allResponses.find(r => r.id === `${RESPONSE_ID_PREFIX}${cs.slug}`);

      it(`has a chat response with id "${RESPONSE_ID_PREFIX}${cs.slug}"`, () => {
        expect(response).toBeDefined();
      });

      it('has bilingual chat message content', () => {
        expect(response?.message.es.length).toBeGreaterThan(0);
        expect(response?.message.en.length).toBeGreaterThan(0);
      });

      it('has chat keywords', () => {
        expect(response?.keywords.length).toBeGreaterThan(0);
      });

      it('has bilingual title, subtitle, context, problem, and architecture', () => {
        for (const field of ['title', 'subtitle', 'context', 'problem', 'architecture'] as const) {
          expect(cs[field].es.length).toBeGreaterThan(0);
          expect(cs[field].en.length).toBeGreaterThan(0);
        }
      });

      it('has at least 2 technical decisions with bilingual content', () => {
        expect(cs.decisions.length).toBeGreaterThanOrEqual(2);
        for (const d of cs.decisions) {
          expect(d.title.es.length).toBeGreaterThan(0);
          expect(d.title.en.length).toBeGreaterThan(0);
          expect(d.body.es.length).toBeGreaterThan(0);
          expect(d.body.en.length).toBeGreaterThan(0);
        }
      });

      it('has bilingual results and lessons', () => {
        expect(cs.results.length).toBeGreaterThanOrEqual(2);
        expect(cs.lessons.length).toBeGreaterThanOrEqual(2);
        for (const r of cs.results) {
          expect(r.es.length).toBeGreaterThan(0);
          expect(r.en.length).toBeGreaterThan(0);
        }
        for (const l of cs.lessons) {
          expect(l.es.length).toBeGreaterThan(0);
          expect(l.en.length).toBeGreaterThan(0);
        }
      });

      it('has a chat keyword that is the slug', () => {
        expect(response?.keywords).toContain(cs.slug);
      });
    });
  }

  it('registers the case-study chat responses in allResponses', () => {
    const caseStudyIds = new Set(caseStudies.map(cs => `${RESPONSE_ID_PREFIX}${cs.slug}`));
    const projectResponses = allResponses
      .filter(r => r.id.startsWith(RESPONSE_ID_PREFIX))
      .map(r => r.id);
    // every case study must have a registered response (direction: data -> chat)
    for (const id of caseStudyIds) {
      expect(projectResponses).toContain(id);
    }
    // project responses without a case study are allowed (bolsa, foodbites, huertos, portfolio)
    expect(projectResponses.length).toBeGreaterThanOrEqual(caseStudyIds.size);
  });
});
