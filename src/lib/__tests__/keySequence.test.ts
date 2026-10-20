import { describe, it, expect } from 'vitest';
import {
  createKeySequenceTracker,
  KONAMI_SEQUENCE,
  IDDQD_SEQUENCE,
  CTRL_K_KEY,
  TILDE_KEY,
  type KeyEventLike,
} from '@/lib/keySequence';

function keyEvent(overrides: Partial<KeyEventLike> & { key: string }): KeyEventLike {
  return {
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    shiftKey: false,
    targetEditable: false,
    ...overrides,
  };
}

describe('createKeySequenceTracker', () => {
  describe('correct sequences', () => {
    it('matches a single-key sequence', () => {
      const tracker = createKeySequenceTracker({ sequence: [TILDE_KEY] });
      expect(tracker.handle(keyEvent({ key: '~' }))).toBe(true);
    });

    it('matches a chord sequence (Ctrl+K)', () => {
      const tracker = createKeySequenceTracker({ sequence: [CTRL_K_KEY] });
      expect(tracker.handle(keyEvent({ key: 'k', ctrlKey: true }))).toBe(true);
    });

    it('matches the full konami sequence', () => {
      const tracker = createKeySequenceTracker({ sequence: KONAMI_SEQUENCE });
      let matched = false;
      for (const descriptor of KONAMI_SEQUENCE) {
        matched = tracker.handle(keyEvent({ key: descriptor.key }));
      }
      expect(matched).toBe(true);
    });

    it('matches iddqd typed as characters', () => {
      const tracker = createKeySequenceTracker({ sequence: IDDQD_SEQUENCE });
      let matched = false;
      for (const char of 'iddqd') {
        matched = tracker.handle(keyEvent({ key: char }));
      }
      expect(matched).toBe(true);
    });

    it('matches uppercase letters for single-char descriptors', () => {
      const tracker = createKeySequenceTracker({ sequence: IDDQD_SEQUENCE });
      let matched = false;
      for (const char of 'IDDQD') {
        matched = tracker.handle(keyEvent({ key: char }));
      }
      expect(matched).toBe(true);
    });

    it('resets after a successful match so it can fire again', () => {
      const tracker = createKeySequenceTracker({ sequence: [TILDE_KEY] });
      expect(tracker.handle(keyEvent({ key: '~' }))).toBe(true);
      expect(tracker.handle(keyEvent({ key: '~' }))).toBe(true);
    });
  });

  describe('incorrect sequences', () => {
    it('does not match a wrong sequence', () => {
      const tracker = createKeySequenceTracker({ sequence: IDDQD_SEQUENCE });
      let matched = false;
      for (const char of 'hello') {
        matched = tracker.handle(keyEvent({ key: char }));
      }
      expect(matched).toBe(false);
    });

    it('does not match Ctrl+K without the ctrl modifier', () => {
      const tracker = createKeySequenceTracker({ sequence: [CTRL_K_KEY] });
      expect(tracker.handle(keyEvent({ key: 'k' }))).toBe(false);
    });

    it('does not match a chord when extra modifiers are present', () => {
      const tracker = createKeySequenceTracker({ sequence: [CTRL_K_KEY] });
      expect(tracker.handle(keyEvent({ key: 'k', ctrlKey: true, altKey: true }))).toBe(false);
    });

    it('restarts from the first key when the middle of the sequence breaks', () => {
      const tracker = createKeySequenceTracker({ sequence: IDDQD_SEQUENCE });
      tracker.handle(keyEvent({ key: 'i' }));
      tracker.handle(keyEvent({ key: 'x' }));
      let matched = false;
      for (const char of 'iddqd') {
        matched = tracker.handle(keyEvent({ key: char }));
      }
      expect(matched).toBe(true);
    });

    it('continues correctly when a partial restart overlaps the start', () => {
      const tracker = createKeySequenceTracker({ sequence: IDDQD_SEQUENCE });
      tracker.handle(keyEvent({ key: 'i' }));
      tracker.handle(keyEvent({ key: 'i' }));
      let matched = false;
      for (const char of 'ddqd') {
        matched = tracker.handle(keyEvent({ key: char }));
      }
      expect(matched).toBe(true);
    });
  });

  describe('timeout reset', () => {
    it('restarts the sequence when the timeout elapses', () => {
      const tracker = createKeySequenceTracker({ sequence: IDDQD_SEQUENCE, timeoutMs: 1000 });
      const start = 1_000_000;
      tracker.handle(keyEvent({ key: 'i' }), start);
      tracker.handle(keyEvent({ key: 'd' }), start + 500);
      let matched = false;
      for (const [index, char] of 'ddqd'.split('').entries()) {
        matched = tracker.handle(keyEvent({ key: char }), start + 5000 + index * 100);
      }
      expect(matched).toBe(false);
    });

    it('still matches when keys arrive within the timeout window', () => {
      const tracker = createKeySequenceTracker({ sequence: IDDQD_SEQUENCE, timeoutMs: 1000 });
      const start = 1_000_000;
      let matched = false;
      for (const [index, char] of 'iddqd'.split('').entries()) {
        matched = tracker.handle(keyEvent({ key: char }), start + index * 300);
      }
      expect(matched).toBe(true);
    });
  });

  describe('editable target handling', () => {
    it('ignores keys when the target is editable', () => {
      const tracker = createKeySequenceTracker({ sequence: [TILDE_KEY] });
      expect(tracker.handle(keyEvent({ key: '~', targetEditable: true }))).toBe(false);
    });

    it('resets partial progress when an editable key is pressed', () => {
      const tracker = createKeySequenceTracker({ sequence: IDDQD_SEQUENCE });
      tracker.handle(keyEvent({ key: 'i' }));
      tracker.handle(keyEvent({ key: 'd', targetEditable: true }));
      let matched = false;
      for (const char of 'ddqd') {
        matched = tracker.handle(keyEvent({ key: char }));
      }
      expect(matched).toBe(false);
    });

    it('does not ignore editable targets when ignoreEditable is false', () => {
      const tracker = createKeySequenceTracker({
        sequence: [TILDE_KEY],
        ignoreEditable: false,
      });
      expect(tracker.handle(keyEvent({ key: '~', targetEditable: true }))).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('never matches an empty sequence', () => {
      const tracker = createKeySequenceTracker({ sequence: [] });
      expect(tracker.handle(keyEvent({ key: 'a' }))).toBe(false);
    });

    it('reset clears partial progress', () => {
      const tracker = createKeySequenceTracker({ sequence: IDDQD_SEQUENCE });
      tracker.handle(keyEvent({ key: 'i' }));
      tracker.reset();
      let matched = false;
      for (const char of 'ddqd') {
        matched = tracker.handle(keyEvent({ key: char }));
      }
      expect(matched).toBe(false);
    });
  });
});
