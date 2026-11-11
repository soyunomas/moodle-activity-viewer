# Implementación de seguimiento del alumnado

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:executing-plans.

**Goal:** incorporar una capa de seguimiento por alumno al visor, reordenar gráficos, recuperar ayudas y actualizar README+Pages.
**Architecture:** un módulo `learning_analytics.js` con cálculo puro, UI y documentación de ayudas; el HTML actual conserva el procesamiento existente.
**Tech Stack:** HTML, CSS, JavaScript, Bootstrap, Chart.js, Node test file.
**Spec:** docs/superpowers/specs/2026-11-11-seguimiento-docente-design.md

## Global Constraints
- Rango y fechas comparables en calendario local.
- Recálculo compatible con filtros existentes y exclusiones.
- Etiquetas de inactividad relativas al último dato incluido, no al reloj.
- No imputar calificaciones ni diagnosticar abandono.

## Review Focus
- CSV sin fechas válidas o alumnos sin nombre: comportamiento claro, sin excepción.
- Cambios de mes o año: continuidad semanal y comparación inclusiva.
- Periodo anterior no cubierto: indicar no comparable, no inventar descenso.
- Filtros de usuario, hora e IP: comparaciones aplican iguales criterios.
- Cambios repetidos de filtro: destruir gráfico previo y no duplicar tarjetas.

### Task 1 — Cálculo puro y pruebas
- [ ] Escribir test primero; comprobar RED; añadir módulo de cálculo; comprobar GREEN.
- [ ] Medir continuidad, sesiones, periodos, tipología, mapa de calor, anomalías y calidad.

### Task 2 — Interfaz de seguimiento docente
- [ ] Incorporar panel inicial, tabla semanal, perfil individual y visualizaciones.
- [ ] Integrar actualización con análisis y filtros sin perder las gráficas originales.
- [ ] Reordenar gráficos existentes por interés docente.

### Task 3 — Ayudas y accesibilidad
- [ ] Reparar la apertura del modal y enriquecer todas las ayudas con ejemplo/indicio/límite.
- [ ] Ayudas específicas de todas las nuevas visualizaciones y herramientas.

### Task 4 — README y acceso desde GitHub Pages
- [ ] Mantener las secciones principales del README y colocar un CTA directo al inicio.
- [ ] Crear index.html de entrada para usar la URL corta de Pages.

### Task 5 — Verificación y publicación
- [ ] Volver a comprobar tests, sintaxis, IDs, igualdad de las versiones HTML.
- [ ] Fusionar a main solo después de comprobar los resultados y el estado remoto.
