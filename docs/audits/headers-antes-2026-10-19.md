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

## Observaciones

- `unsafe-inline` en `script-src`: sustituir por nonce requiere render dinámico (ver §4 del plan v3.2: decidir tras estas mediciones si compensa).
- `X-Powered-By` no aparece en la respuesta (Next.js lo omite por defecto en App Router). Correcto.
- Ficheros de texto (`robots.txt`, `security.txt`) no se midieron aquí; se añadirán al escaneo completo con el Security Header Scanner (pendiente: requiere el proyecto del scanner en local).

## Pendiente de medir

- Lighthouse (performance/a11y/SEO/best practices) — requiere Chrome o Lighthouse CLI; Node.js no disponible en esta máquina.
- axe — requiere ejecución en navegador.
- Security Header Scanner — requiere el proyecto del scanner desplegado o en local.
