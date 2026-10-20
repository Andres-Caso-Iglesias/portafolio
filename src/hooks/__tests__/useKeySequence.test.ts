import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useKeySequence } from '@/hooks/useKeySequence';
import { IDDQD_SEQUENCE, CTRL_K_KEY } from '@/lib/keySequence';

function pressKey(target: EventTarget, init: KeyboardEventInit & { target?: EventTarget }): void {
  const { target: eventTarget, ...rest } = init;
  const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...rest });
  (eventTarget ?? target).dispatchEvent(event);
}

describe('useKeySequence', () => {
  it('fires onMatch when the sequence completes', () => {
    const onMatch = vi.fn();
    renderHook(() => useKeySequence({ sequence: IDDQD_SEQUENCE, onMatch }));

    act(() => {
      for (const char of 'iddqd') {
        pressKey(window, { key: char });
      }
    });

    expect(onMatch).toHaveBeenCalledTimes(1);
  });

  it('does not fire onMatch for an incomplete sequence', () => {
    const onMatch = vi.fn();
    renderHook(() => useKeySequence({ sequence: IDDQD_SEQUENCE, onMatch }));

    act(() => {
      for (const char of 'idd') {
        pressKey(window, { key: char });
      }
    });

    expect(onMatch).not.toHaveBeenCalled();
  });

  it('fires onMatch for the Ctrl+K chord', () => {
    const onMatch = vi.fn();
    renderHook(() => useKeySequence({ sequence: [CTRL_K_KEY], onMatch }));

    act(() => {
      pressKey(window, { key: 'k', ctrlKey: true });
    });

    expect(onMatch).toHaveBeenCalledTimes(1);
  });

  it('ignores the sequence when focus is on an input', () => {
    const onMatch = vi.fn();
    renderHook(() => useKeySequence({ sequence: IDDQD_SEQUENCE, onMatch }));

    const input = document.createElement('input');
    document.body.appendChild(input);

    act(() => {
      for (const char of 'iddqd') {
        pressKey(input, { key: char, target: input });
      }
    });

    expect(onMatch).not.toHaveBeenCalled();
    input.remove();
  });

  it('ignores the sequence when focus is on a textarea', () => {
    const onMatch = vi.fn();
    renderHook(() => useKeySequence({ sequence: IDDQD_SEQUENCE, onMatch }));

    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    act(() => {
      for (const char of 'iddqd') {
        pressKey(textarea, { key: char, target: textarea });
      }
    });

    expect(onMatch).not.toHaveBeenCalled();
    textarea.remove();
  });

  it('ignores the sequence when focus is on a contenteditable element', () => {
    const onMatch = vi.fn();
    renderHook(() => useKeySequence({ sequence: IDDQD_SEQUENCE, onMatch }));

    const editable = document.createElement('div');
    editable.setAttribute('contenteditable', '');
    document.body.appendChild(editable);

    act(() => {
      for (const char of 'iddqd') {
        pressKey(editable, { key: char, target: editable });
      }
    });

    expect(onMatch).not.toHaveBeenCalled();
    editable.remove();
  });

  it('does not fire when disabled', () => {
    const onMatch = vi.fn();
    renderHook(() => useKeySequence({ sequence: IDDQD_SEQUENCE, onMatch, enabled: false }));

    act(() => {
      for (const char of 'iddqd') {
        pressKey(window, { key: char });
      }
    });

    expect(onMatch).not.toHaveBeenCalled();
  });

  it('stops listening after unmount', () => {
    const onMatch = vi.fn();
    const { unmount } = renderHook(() => useKeySequence({ sequence: IDDQD_SEQUENCE, onMatch }));

    unmount();

    act(() => {
      for (const char of 'iddqd') {
        pressKey(window, { key: char });
      }
    });

    expect(onMatch).not.toHaveBeenCalled();
  });
});
