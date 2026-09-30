import { describe, it, expect } from 'vitest';
import { projects, featuredProjects, marqueeProjects } from '@/data/projectsData';
import { profileContextEN, profileContextES } from '@/data/chat/aiContext';
import { projectsResponse } from '@/data/chat/responses/projects';

function section(text: string, title: string): string {
  const start = text.indexOf(title);
  if (start === -1) return '';
  const rest = text.slice(start + title.length);
  const end = rest.indexOf('\n## ');
  return end === -1 ? rest : rest.slice(0, end);
}

const esFeatured = section(profileContextES, '## Proyectos Destacados');
const esOthers = section(profileContextES, '## Otros proyectos');
const enFeatured = section(profileContextEN, '## Featured Projects');
const enOthers = section(profileContextEN, '## Other Projects');

const displayName = (p: (typeof projects)[number]) => p.name;
const displayEnName = (p: (typeof projects)[number]) => p.enName ?? p.name;

describe('projectsData <-> chat featured projects sync', () => {
  it('exposes the chat sections used by the contract', () => {
    expect(esFeatured).not.toBe('');
    expect(esOthers).not.toBe('');
    expect(enFeatured).not.toBe('');
    expect(enOthers).not.toBe('');
  });

  it('partitions the projects array into 3 featured and 4 marquee projects', () => {
    expect(featuredProjects).toHaveLength(3);
    expect(marqueeProjects).toHaveLength(4);
    expect(featuredProjects.length + marqueeProjects.length).toBe(projects.length);
    expect(featuredProjects.every(p => p.featured === true)).toBe(true);
    expect(marqueeProjects.every(p => p.featured !== true)).toBe(true);
  });

  for (const p of featuredProjects) {
    it(`chat featured sections include "${p.name}" (data -> chat)`, () => {
      expect(esFeatured).toContain(displayName(p));
      expect(enFeatured).toContain(displayEnName(p));
      expect(projectsResponse.message.es).toContain(displayName(p));
      expect(projectsResponse.message.en).toContain(displayEnName(p));
    });

    it(`chat other-projects sections exclude "${p.name}" (data -> chat)`, () => {
      expect(esOthers).not.toContain(displayName(p));
      expect(enOthers).not.toContain(displayEnName(p));
    });
  }

  for (const p of marqueeProjects) {
    it(`chat featured sections exclude "${p.name}" (chat -> data)`, () => {
      expect(esFeatured).not.toContain(displayName(p));
      expect(enFeatured).not.toContain(displayEnName(p));
      expect(projectsResponse.message.es).not.toContain(displayName(p));
      expect(projectsResponse.message.en).not.toContain(displayEnName(p));
    });

    it(`chat other-projects sections include "${p.name}" (chat -> data)`, () => {
      expect(esOthers).toContain(displayName(p));
      expect(enOthers).toContain(displayEnName(p));
    });
  }
});
