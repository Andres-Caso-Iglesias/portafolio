'use client';

import { useEffect, useRef } from 'react';
import { createKeySequenceTracker, type KeyDescriptor } from '@/lib/keySequence';

export interface UseKeySequenceOptions {
  sequence: KeyDescriptor[];
  onMatch: () => void;
  timeoutMs?: number;
  ignoreEditable?: boolean;
  enabled?: boolean;
}

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const contentEditable = target.getAttribute('contenteditable');
  const hasContentEditable =
    target.isContentEditable || (contentEditable !== null && contentEditable !== 'false');
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    hasContentEditable
  );
}

export function useKeySequence({
  sequence,
  onMatch,
  timeoutMs,
  ignoreEditable = true,
  enabled = true,
}: UseKeySequenceOptions): void {
  const onMatchRef = useRef(onMatch);
  const sequenceRef = useRef(sequence);

  useEffect(() => {
    onMatchRef.current = onMatch;
    sequenceRef.current = sequence;
  });

  useEffect(() => {
    if (!enabled) return;

    const tracker = createKeySequenceTracker({
      sequence: sequenceRef.current,
      timeoutMs,
      ignoreEditable,
    });

    const onKeyDown = (event: KeyboardEvent) => {
      const matched = tracker.handle({
        key: event.key,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        targetEditable: isEditableElement(event.target),
      });
      if (matched) onMatchRef.current();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled, timeoutMs, ignoreEditable]);
}
