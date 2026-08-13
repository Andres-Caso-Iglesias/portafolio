# Security Hardening Proposal

## Intent

Harden the portfolio against web security threats and align applicable controls with OWASP Top 10 2021, NIS2, ENS, and ISO 27001. The site is a static portfolio with an interactive chat — no auth, no DB, no user data — but has XSS surface via chat markdown links, missing security headers, and vulnerable dependencies.

## Scope (IN)

1. **Security Headers** via `next.config.ts` + middleware:
   - Content-Security-Policy (nonce-based)
   - Strict-Transport-Security (verify Vercel sets it, add if not)
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: camera=(), microphone=(), geolocation=()
   - Cross-Origin-Opener-Policy: same-origin
   - Cross-Origin-Resource-Policy: same-origin

2. **CSP Strategy**: Nonce-based via middleware
   - Generate nonce per-request in middleware
   - Inject nonce into `<script nonce="...">` for JSON-LD in layout
   - Use `'strict-dynamic'` + `'nonce-...'` for script-src
   - `style-src 'self' 'unsafe-inline'` (Tailwind requires unsafe-inline)
   - `img-src 'self' data: https:` (ERD images, avatars)
   - `connect-src 'self'` (snippet fetches)
   - `frame-ancestors 'none'`

3. **Input Sanitization** - Fix `parseLinks` in `ChatMessage.tsx`:
   - Block `javascript:`, `data:`, `vbscript:`, `blob:` URLs
   - Allow only `http:`, `https:`, `mailto:`, `tel:` protocols
   - Keep `rel="noopener noreferrer"` on external links

4. **Dependency Updates**:
   - Update `next` to latest 16.x patch (test for breaking changes)
   - Update `postcss` to ≥8.5.10
   - Run `npm audit` after updates

5. **Path Validation** in `snippetLoaderClient.ts`:
   - Allowlist: `/snippets/*.ts`, `/snippets/*.tsx`, `/snippets/*.js`, `/snippets/*.sql`, `/erd/*.svg`
   - Reject paths with `..`, absolute URLs, non-allowlisted extensions

## Scope (OUT)

- Authentication/authorization (not needed)
- WAF/rate limiting (Vercel provides)
- Penetration testing
- ISO 27001 certification documentation
- SBOM generation (defer to CI/CD sprint)

## Acceptance Criteria

- [ ] All security headers present on all responses (verified via `curl -I`)
- [ ] CSP blocks inline script without nonce (test with devtools console)
- [ ] JSON-LD script executes with nonce (no CSP violation)
- [ ] `parseLinks` rejects `javascript:alert(1)` URLs (unit test)
- [ ] `snippetLoaderClient` rejects `../../etc/passwd` paths (unit test)
- [ ] `npm audit --audit-level=high` passes (0 high/critical)
- [ ] Build passes (`npm run build`)
- [ ] No console CSP violations in production

## Approach

1. **Phase 1**: Update dependencies, verify build
2. **Phase 2**: Add security headers via `next.config.ts` (static headers)
3. **Phase 3**: Create middleware for CSP nonce generation + dynamic headers
4. **Phase 4**: Update `layout.tsx` to use nonce for JSON-LD script
5. **Phase 5**: Fix `parseLinks` regex + add unit test
6. **Phase 6**: Add path validation to `snippetLoaderClient` + unit test
7. **Phase 7**: Verify CSP in production, adjust if needed

## Risks & Mitigations

| Risk                               | Likelihood | Impact | Mitigation                                      |
| ---------------------------------- | ---------- | ------ | ----------------------------------------------- |
| CSP breaks Next.js runtime scripts | Medium     | High   | Use `'strict-dynamic'` + nonce, test thoroughly |
| Next.js patch update breaks build  | Low        | Medium | Test in branch, pin if needed                   |
| Vercel duplicates HSTS header      | Medium     | Low    | Verify with `curl -I` before adding             |
| Nonce middleware adds latency      | Low        | Low    | Minimal overhead, cache nonce per request       |

## Effort Estimate

- Dependency updates + test: 1-2 hrs
- Security headers (config): 1 hr
- CSP middleware + nonce integration: 3-4 hrs
- parseLinks fix + test: 1 hr
- snippetLoaderClient validation + test: 1 hr
- Production verification: 1 hr
  **Total: ~8-10 hours**

## Dependencies

- None (self-contained)
