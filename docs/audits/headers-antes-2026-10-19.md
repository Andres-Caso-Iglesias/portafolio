# Nota "antes" — cabeceras de seguridad

Medida el 19 de octubre de 2026 contra `https://portafolio-livid-two-33.vercel.app/` (producción), antes de tocar cabeceras en la Fase 0b.

## Cabeceras presentes

| Cabecera | Valor | Estado |
|---|---|---|
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` | Presente. `unsafe-inline` en script-src y style-src es el hueco principal. |
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | Completa, con preload. |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()` | Presente y restrictiva. |
| Referrer-Policy | `strict-origin-when-cross-origin` | Correcta. |
| X-Content-Type-Options | `nosniff` | Presente. |
| X-Frame-Options | `DENY` | Presente (refuerza frame-ancestors). |
| Cross-Origin-Opener-Policy | `same-origin` | Presente. |
| Cross-Origin-Resource-Policy | `same-origin` | Presente. |

## Ausentes

| Cabecera | Notas |
|---|---|
| Cross-Origin-Embeder-Policy | No presente. Añadir solo si no rompe recursos cross-origin. |
| X-XSS-Protection | Obsoleta; no recomendada por OWASP. No añadir. |

## Decisión sobre CSP con nonce (Fase 0b, 2026-10-19)

**Decisión: no implementar CSP con nonce en el MVP.** Se cierran los huecos baratos (`object-src 'none'`, `upgrade-insecure-requests`) y se deja `unsafe-inline` en `script-src`.

Razones:

1. El único XSS surface real (enlaces markdown del chat) ya está mitigado: `parseLinks` en `ChatMessage.tsx` rechaza `javascript:`, `data:`, `vbscript:`, `file:` y `about:`.
2. El nonce exige middleware + render dinámic por petición; en la propuesta `security-hardening.md` el riesgo "CSP breaks Next.js runtime scripts" está clasificado Medium/High.
3. `style-src` exigiría `unsafe-inline` de todos modos por Tailwind, por lo que el nonce solo cubriría `script-src`.
4. El sitio no tiene datos de usuarios ni contenido generado por terceros: el beneficio marginal no compensa el riesgo de romper el runtime en el lanzamiento.

Revisar si el sitio incorpora contenido generado por usuarios o si se añade más script inline en el futuro.

### Cambios aplicados (Fase 0b)

- `object-src 'none'` añadido a la CSP.
- `upgrade-insecure-requests` añadido a la CSP.
- Flag `NEXT_PUBLIC_AI_ENABLED=false` por defecto: la terminal/chat no llama a `/api/chat` (verifica de que Gemini sigue dormant sin clave).

## Observaciones

- `unsafe-inline` en `script-src`: sustituir por nonce requiere render dinámico (ver §4 del plan v3.2: decidir tras estas mediciones si compensa).
- `X-Powered-By` no aparece en la respuesta (Next.js lo omite por defecto en App Router). Correcto.
- Ficheros de texto (`robots.txt`, `security.txt`) no se midieron aquí; se añadirán al escaneo completo con el Security Header Scanner (pendiente: requiere el proyecto del scanner en local).

## Pendiente de medir

- Lighthouse (performance/a11y/SEO/best practices) — requiere Chrome o Lighthouse CLI; Node.js no disponible en esta máquina.
- axe — requiere ejecución en navegador.
- Security Header Scanner — requiere el proyecto del scanner desplegado o en local.
