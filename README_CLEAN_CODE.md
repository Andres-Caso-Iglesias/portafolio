# Refactorización Clean Code - Portfolio Andrés Caso Iglesias

## Resumen de Cambios

Este documento describe la refactorización realizada para pasar de una estructura monolítica a una arquitectura limpia y modular siguiendo principios de clean code.

### 🎯 Objetivo
Eliminar archivos monolíticos y mejorar la mantenibilidad mediante:
- Separación de datos, lógica y presentación
- Componentes especializados y reutilizables
- Nomenclatura consistente y autodescriptiva
- Responsabilidad única por archivo

## 📁 Nueva Estructura de Archivos

```
src/
├── app/
│   ├── layout.tsx          # Root layout (sin cambios estructurales)
│   └── page.tsx            # Página principal (usa componentes y datos separados)
├── components/
│   ├── Timeline.tsx        # Componente principal del timeline (orquestador)
│   └── timeline/           # Componentes especializados del timeline
│       ├── TimelineDesktop.tsx    # Versión escritorio con tracks duales
│       └── TimelineMobile.tsx     # Versión móvil (lista vertical)
├── data/                   # Todos los datos separados y tipados
│   ├── timelineData.ts     # Interfaz TimelineItem + rawTimelineData
│   ├── projectsData.ts     # Interfaz Project + projects array
│   └── skillsData.ts       # Interfaz SkillCategory + skills array
└── lib/                    # Utilidades y lógica pura
    ├── timelineUtils.ts    # Funciones puras para manejo de fechas y posiciones
    └── utils.ts            # cn() utility para Tailwind (sin cambios)
```

## 🔧 Principios Aplicados

### 1. Separación de Responsabilidades (SRP)
- **Datos**: `src/data/*` contiene exclusivamente estructuras de datos y arrays estáticos
- **Lógica**: `src/lib/timelineUtils.ts` contiene funciones puras sin efectos secundarios
- **Presentación**: `src/components/*` contiene exclusivamente JSX y estado de UI
- **Orquestación**: `src/components/Timeline.tsx` solo coordina sub-componentes

### 2. Componentes Especializados
Antes: `Timeline.tsx` (618 líneas) - Todo incluido
Después:
- `Timeline.tsx` (25 líneas) - Solo importa y coordina
- `TimelineDesktop.tsx` (220 líneas) - Lógica específica de escritorio
- `TimelineMobile.tsx` (102 líneas) - Lógica específica de móvil
- Archivos de datos: <100 líneas cada uno
- Archivos de utilidad: ~50 líneas

### 3. Tipado Estricto TypeScript
- Todas las interfaces definidas explícitamente (`TimelineItem`, `Project`, `SkillCategory`)
- Uso de `as const` para valores literales seguros
- Eliminación de tipos `any` donde era posible
- Props tipadas en todos los componentes

### 4. Lógica Pura y Testable
- Funciones en `timelineUtils.ts` son puras:
  - Mismos inputs → mismos outputs
  - Sin efectos secundarios
  - Fáciles de testear unitariamente
  - Reutilizables en cualquier parte de la app

### 5. Arquitectura del Timeline Refactorizada
**Antes**: Un componente monolítico con lógica mezclada
**Después**: 
- **Datos separados**: Los eventos viven en `src/data/timelineData.ts`
- **Cálculos separados**: Posiciones y duraciones en `src/lib/timelineUtils.ts`
- **Presentación especializada**:
  - Escritorio: Dos tracks paralelos con barra de duración al hover
  - Móvil: Lista vertical de eventos
- **Estado manejado localmente**: Solo `hoveredId` en el componente desktop

## 📈 Méritas de Mejora

### Antes de la Refactorización:
- 1 archivo TSX de 618 líneas (Timeline.tsx)
- Lógica de presentación, datos y cálculos mezclados
- Dificultad para localizar y modificar funcionalidades específicas
- Alto acoplamiento entre preocupaciones
- Difícil de testear unidades específicas

### Después de la Refactorización:
- 9 archivos con promedio de <100 líneas cada uno
- Responsabilidades claramente separadas
- Fácil de localizar: datos → data/, lógica → lib/, presentación → components/
- Baja acoplamiento: los componentes dependen de contratos claros (interfaces)
- Testabilidad: las funciones puras pueden testearse en aislamiento
- Escalabilidad: añadir nuevos tipos de eventos o modificar presentación es trivial

## 🧩 Detalles de Implementación

### Data Layer (`src/data/`)
```typescript
// timelineData.ts
export interface TimelineItem { /* ... */ }
export const rawTimelineData: TimelineItem[] = [ /* ... */ ];

// projectsData.ts  
export interface Project { /* ... */ }
export const projects: Project[] = [ /* ... */ ];

// skillsData.ts
export interface SkillCategory { /* ... */ }
export const skills: SkillCategory[] = [ /* ... */ ];
```

### Utility Layer (`src/lib/`)
```typescript
// timelineUtils.ts
export function parseSpanishDate(dateStr: string): { year: number; month: number } | null { /* ... */ }
export function computeDurationInMonths(startStr: string, endStr: string): number { /* ... */ }
export function computeDurationString(startStr: string, endStr: string): string { /* ... */ }
export function calculateTimelinePositions(items: TimelineItem[]): TimelineItem[] { /* ... */ }
export const expColors = { /* ... */ };
```

### Presentation Layer (`src/components/`)

#### Timeline.tsx (Orquestador)
```tsx
"use client";
import { TimelineItem } from "@/data/timelineData";
import TimelineDesktop from "@/components/timeline/TimelineDesktop";
import TimelineMobile from "@/components/timeline/TimelineMobile";
import { rawTimelineData } from "@/data/timelineData";

export default function Timeline() {
  return (
    <section className="py-20 bg-slate-900 overflow-hidden">
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-16 text-white text-center">
          Mi Trayectoria
        </h2>
        <TimelineDesktop items={rawTimelineData} />
        <TimelineMobile items={rawTimelineData} />
      </div>
    </section>
  );
}
```

#### TimelineDesktop.tsx (Lógica Específica)
- Dos tracks fijos: experiencia (top-[40%]) y educación (top-[60%])
- Puntos con años centrados (top-[50%])
- Burbujas de experiencia arriba (top-[10%]) y educación abajo (top-[80%])
- Barra de duración que aparece entre tracks al hover
- Uso de `useState` solo para el estado de hovered

#### TimelineMobile.tsx
- Layout vertical simple para móviles
- Secciones separadas de experiencia y educación
- Sin interactividad de hover (optimizado para touch)

## ✅ Verificación de Implementación

1. **TypeScript Compila**: `npx tsc --noEmit --skipLibCheck` → Éxito
2. **Separación Clara**: Cada capa tiene responsabilidad única
3. **Datos Reutilizables**: Los mismos datos alimentan desktop y mobile
4. **Lógica Testable**: Funciones puras en timelineUtils.ts
5. **Responsive**: Versiones especializadas para cada breakpoint
6. **Mantenible**: Cambios en datos no requieren tocar componentes UI

## 🚀 Próximos Pasos Sugeridos

1. **Test Unitarios**: Crear tests para funciones en timelineUtils.ts
2. **Historia de Componentes**: Agregar Storybook para documentar estados
3. **Optimizaciones**: Considerar memoización para cálculos costosos
4. **Documentación**: Agregar JSDoc a funciones complejas
5. **Accesibilidad**: Mejorar atributos ARIA para lectores de pantalla

## 💡 Conclusión

Esta refactorización transforma el portfolio de un prototipo funcional a una aplicación profesionalmente estructurada que:
- Es fácil de entender y modificar por nuevos desarrolladores
- Sigue estándares de la industria para aplicaciones React/TypeScript
- Facilita el testing y garantía de calidad
- Está preparada para escalar con nuevas funcionalidades
- Mantiene toda la funcionalidad original mientras mejora la calidad interna

El principio fundamental aplicado fue: **"Los datos deben ser datos, la lógica debe ser lógica, y la presentación debe ser presentación"** - nunca mezcladas en el mismo archivo.