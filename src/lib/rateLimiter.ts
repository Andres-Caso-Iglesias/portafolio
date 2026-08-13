// ──────────────────────────────────────────────────────────────
// In-Memory Rate Limiter for Chat API
// ──────────────────────────────────────────────────────────────

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface SessionEntry {
  count: number;
  resetAt: number;
}

const ipLimits = new Map<string, RateLimitEntry>();
const sessionLimits = new Map<string, SessionEntry>();

const IP_MAX_REQUESTS = 30;
const IP_WINDOW_MS = 60 * 1000; // 1 minute
const SESSION_MAX_REQUESTS = 50;
const SESSION_WINDOW_MS = 60 * 1000; // 1 minute
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

// ──────────────────────────────────────────────────────────────
// Cleanup expired entries periodically
// ──────────────────────────────────────────────────────────────
let lastCleanup = Date.now();

function cleanupIfNeeded(): void {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, entry] of ipLimits) {
    if (entry.resetAt <= now) ipLimits.delete(key);
  }
  for (const [key, entry] of sessionLimits) {
    if (entry.resetAt <= now) sessionLimits.delete(key);
  }
}

// ──────────────────────────────────────────────────────────────
// Check rate limit for IP + session
// ──────────────────────────────────────────────────────────────
export function checkRateLimit(
  ip: string,
  sessionId: string
): { allowed: boolean; remaining: number } {
  cleanupIfNeeded();

  const now = Date.now();

  // Check IP limit
  const ipEntry = ipLimits.get(ip);
  if (ipEntry && ipEntry.resetAt > now) {
    if (ipEntry.count >= IP_MAX_REQUESTS) {
      return { allowed: false, remaining: 0 };
    }
    ipEntry.count++;
  } else {
    ipLimits.set(ip, { count: 1, resetAt: now + IP_WINDOW_MS });
  }

  // Check session limit
  const sessionEntry = sessionLimits.get(sessionId);
  if (sessionEntry && sessionEntry.resetAt > now) {
    if (sessionEntry.count >= SESSION_MAX_REQUESTS) {
      return { allowed: false, remaining: 0 };
    }
    sessionEntry.count++;
  } else {
    sessionLimits.set(sessionId, { count: 1, resetAt: now + SESSION_WINDOW_MS });
  }

  const remaining = Math.min(
    IP_MAX_REQUESTS - (ipLimits.get(ip)?.count ?? 0),
    SESSION_MAX_REQUESTS - (sessionLimits.get(sessionId)?.count ?? 0)
  );

  return { allowed: true, remaining: Math.max(remaining, 0) };
}
