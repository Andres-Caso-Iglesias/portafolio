# Nota "después" — Lighthouse y axe

Medida el 20 de octubre de 2026 contra el build local de produccion (`npm run build && npm run start`) de la rama `rediseño` (commit `0c6f396`), al cierre de la Fase 3. Baseline de comparacion: nota implicita de Fase 2 (medida en las mismas condiciones locales, `lighthouse2.json`: 85/100/100/100).

## Lighthouse (mediana de 5+ runs locales, Chrome headless, throttling default)

| Categoria | Fase 2 (baseline) | Fase 3 (despues) | Delta |
|---|---|---|---|
| Performance | 85 | **82** | -3 (ver analisis) |
| Accessibility | 100 | 100 | 0 |
| Best Practices | 100 | 100 | 0 |
| SEO | 100 | 100 | 0 |

Metricas clave:

| Metrica | Fase 2 | Fase 3 |
|---|---|---|
| FCP | 939 ms | ~940 ms |
| LCP | 4217 ms | ~4560-4740 ms |
| TBT | 121 ms | 111-223 ms (media ~150) |
| CLS | 0 | 0 |

### Analisis del delta de performance

- La medicion local es ruidosa (rango observado 75-85 a lo largo del dia; la baseline de Fase 2 fueron solo 2 runs: 84 y 85). Con 5 runs del build final, la mediana es 82.
- **Paridad estructural con la baseline**: mismo CSS de render-blocking (~170 ms), *menos* JS unused que en Fase 2 (25/70 KB vs 29/70 KB en el chunk principal: la UI del chat se elimino).
- El LCP ~4.6 s ya estaba en la baseline (~4.2 s): el elemento LCP es el parrafo del hero y su render real ocurre ~600 ms; la diferencia metrica no se atribuye a la terminal. Posible causa candidata (sin confirmar): `forced-reflow` de ~75 ms sin atribucion que no existia en Fase 2 (score 0 en forced-reflow-insight).
- La terminal se difirio a `requestIdleCallback` (`TerminalMount.tsx`); su logica vive en un chunk async que no esta en `rootMainFiles` (verificado en el build manifest).
- **Decision**: aceptar 82 local como ruido de entorno + micro-regresion menor, con la causa raiz anotada como gap BAJA. Re-medir en produccion tras el merge (throttling real, CDN); el gate de "sin regresion" se evaluara ahi.

## axe-core (Playwright + @axe-core/playwright, viewport desktop y 412 movil)

| Pagina | Violaciones | Notas |
|---|---|---|
| Home (desktop y movil) | Solo **marquee pre-existente** | `nested-interactive` + `aria-allowed-role` en el `<article>` con links anidados; markup exigido por `projects.spec.ts`. Se acepta. |
| Dialog de terminal abierto | Solo el marquee del fondo | Sin hallazgos propios de la terminal. |
| `/admin-backup` | **0** | Fase 3. |
| `/not-found` (404) | **0** | Fase 3. |
| `/projects/[slug]` | **0** | Fase 2 (tras anadir `id="contenido"`). |

Resultado estable en 2 pasadas consecutivas (la primera version con el flip de tema post-hidratacion daba carreras; se corrigio en `theme-context.tsx`).

## Security Header Scanner

- No ejecutado en esta nota (requiere el proyecto del scanner desplegado o en local). Las cabeceras se auditaron con `curl`/`Invoke-WebRequest`: ver `headers-despues-2026-10-20.md`.

## Pendiente de verificar en produccion (tras el merge a `main`)

1. Lighthouse 5 runs en la URL de Vercel; comparar mediana con 85 (Fase 2) y 82 (local Fase 3).
2. axe sobre produccion (home, terminal abierta, admin-backup, 404).
3. Actualizar esta nota con las cifras de produccion.
