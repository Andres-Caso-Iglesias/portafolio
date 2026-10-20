export interface KeyDescriptor {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  alt?: boolean;
  shift?: boolean;
}

export interface KeyEventLike {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  targetEditable: boolean;
}

export interface KeySequenceOptions {
  sequence: KeyDescriptor[];
  timeoutMs?: number;
  ignoreEditable?: boolean;
}

export interface KeySequenceTracker {
  handle: (event: KeyEventLike, now?: number) => boolean;
  reset: () => void;
}

export const DEFAULT_SEQUENCE_TIMEOUT_MS = 1200;

export const KONAMI_SEQUENCE: KeyDescriptor[] = [
  { key: 'ArrowUp' },
  { key: 'ArrowUp' },
  { key: 'ArrowDown' },
  { key: 'ArrowDown' },
  { key: 'ArrowLeft' },
  { key: 'ArrowRight' },
  { key: 'ArrowLeft' },
  { key: 'ArrowRight' },
  { key: 'b' },
  { key: 'a' },
];

export const IDDQD_SEQUENCE: KeyDescriptor[] = [
  { key: 'i' },
  { key: 'd' },
  { key: 'd' },
  { key: 'q' },
  { key: 'd' },
];

export const TILDE_KEY: KeyDescriptor = { key: '~' };
export const BACKQUOTE_KEY: KeyDescriptor = { key: '`' };
export const CTRL_K_KEY: KeyDescriptor = { key: 'k', ctrl: true };

function normalizeKey(key: string): string {
  return key.length === 1 ? key.toLowerCase() : key;
}

function matchesDescriptor(event: KeyEventLike, descriptor: KeyDescriptor): boolean {
  if (normalizeKey(event.key) !== normalizeKey(descriptor.key)) return false;
  if (!!descriptor.ctrl !== event.ctrlKey) return false;
  if (!!descriptor.meta !== event.metaKey) return false;
  if (!!descriptor.alt !== event.altKey) return false;
  if (descriptor.shift !== undefined && descriptor.shift !== event.shiftKey) return false;
  return true;
}

export function createKeySequenceTracker(options: KeySequenceOptions): KeySequenceTracker {
  const { sequence, timeoutMs = DEFAULT_SEQUENCE_TIMEOUT_MS, ignoreEditable = true } = options;
  let progress = 0;
  let lastMatchAt = 0;

  function reset(): void {
    progress = 0;
    lastMatchAt = 0;
  }

  function handle(event: KeyEventLike, now: number = Date.now()): boolean {
    if (sequence.length === 0) return false;

    if (ignoreEditable && event.targetEditable) {
      reset();
      return false;
    }

    if (progress > 0 && now - lastMatchAt > timeoutMs) {
      reset();
    }

    const expected = sequence[progress];
    if (matchesDescriptor(event, expected)) {
      progress += 1;
      lastMatchAt = now;
      if (progress === sequence.length) {
        reset();
        return true;
      }
      return false;
    }

    if (progress > 0 && matchesDescriptor(event, sequence[0])) {
      progress = 1;
      lastMatchAt = now;
      return false;
    }

    reset();
    return false;
  }

  return { handle, reset };
}
