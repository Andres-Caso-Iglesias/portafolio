# Nota "después" — cabeceras de seguridad

Medida el 20 de octubre de 2026 contra el build local de producción (`npm run build && npm run start`) de la rama `rediseño` (commit `0c6f396`), al cierre de la Fase 3. Sirve de comparación con la nota "antes" (`headers-antes-2026-10-19.md`, medida contra producción).

## Cabeceras presentes (idénticas en `/` y `/admin-backup`)

| Cabecera | Valor | Estado vs "antes" |
|---|---|---|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` | **Mejorada**: `object-src 'none'` anadido en Fase 0b. En produccion (env `VERCEL` presente) se anade tambien `upgrade-insecure-requests`; local se omite a proposito (WebKit local subiria `http://localhost` a `https://localhost`). |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | Sin cambios. |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()` | Sin cambios. |
| Referrer-Policy | `strict-origin-when-cross-origin` | Sin cambios. |
| X-Content-Type-Options | `nosniff` | Sin cambios. |
| X-Frame-Options | `DENY` | Sin cambios. |
| Cross-Origin-Opener-Policy | `same-origin` | Sin cambios. |
| Cross-Origin-Resource-Policy | `same-origin` | Sin cambios. |
| X-Robots-Tag (solo `/admin-backup`) | `noindex, nofollow, noarchive` | **Nueva** (Fase 3, honeypot). `/` no la lleva. |

## Ausentes (igual que antes)

| Cabecera | Notas |
|---|---|
| Cross-Origin-Embeder-Policy | No presente. Anadir solo si no rompe recursos cross-origin. |
| X-XSS-Protection | Obsoleta; no recomendada por OWASP. No anadir. |

## Verificaciones del honeypot y easter eggs (Fase 3)

- `robots.txt`: contiene exactamente `Disallow: /admin-backup` (sin barra final) y `Sitemap: https://portafolio-livid-two-33.vercel.app/sitemap.xml`.
- `/admin-backup`: responde 200 con `X-Robots-Tag` y `meta robots noindex, noarchive` en el HTML; `FakeAdminLogin` no emite ninguna peticion de red (test E2E `secrets.spec.ts`).
- `/teapot`: responde **418 I'm a Teapot** con texto bilingue y las mismas cabeceras de seguridad.
- `/admin-backup` y `/teapot` no aparecen en el sitemap (6 URLs: home y proyectos/casos en ES/EN).

## Decisiones que se mantienen

- **CSP sin nonce** (decision de Fase 0b): `unsafe-inline` en `script-src` sigue presente; el unico XSS surface (links markdown del chat/terminal) esta mitigado en `parseLinks` (rechaza `javascript:`, `data:`, `vbscript:`, `file:`, `about:`). Revisar si aparece contenido generado por usuarios o mas script inline.
- `X-Powered-By` ausente (App Router lo omite por defecto).

## Pendiente de verificar en produccion (tras el merge a `main`)

1. Repetir `curl -sI` contra `https://portafolio-livid-two-33.vercel.app/` y confirmar `upgrade-insecure-requests` presente en la CSP.
2. Confirmar `/admin-backup` responde con `X-Robots-Tag` en el edge de Vercel.
3. Lighthouse y axe de produccion (los locales de Fase 3: 82/100/100/100 perf/a11y/bp/seo; axe solo marquee pre-existente) — fluctuacion localhost conocida, re-medir ahi.
