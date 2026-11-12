# Plan: informes para IA seudonimizados

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:executing-plans.

**Goal:** generar prompts por alumno o por lotes, reutilizando análisis Moodle sin filtrar datos personales.
**Architecture:** funciones puras en `ai_report.js`, controlador de panel en `ai_report_ui.js`, integración en el render existente y tests de privacidad.
**Tech Stack:** HTML, JavaScript sin build, Bootstrap, Node assert.
**Spec:** docs/superpowers/specs/2026-11-12-informe-ia-alumnado.md

## Global Constraints
- No enviar datos a IA automáticamente.
- Solo propiedades numéricas y IDs seudónimos en el payload; tabla local nunca se incrusta.
- No inferir esfuerzo, capacidad ni calificación.
- Mismo esquema de datos filtrados de `learning_analytics.js`.

## Review Focus
- CSV con nombres inesperados o caracteres HTML: escapar siempre UI y nunca copiar nombres.
- Cambios de filtro y de fichero: no dejar prompts obsoletos.
- Sesiones con un solo evento: duración 0 y etiqueta no equivale a tiempo de estudio.
- Más de 10 alumnos: lotes numerados y grupos sin duplicados.
- CSV de un alumno o sin eventos tras filtro: resultados válidos y advertencia.

### Task 1 — Test y módulo puro
- [ ] Test primero con casos de seudonimización/privacidad/estabilidad.
- [ ] Implementar `makeAliasMap`, `buildSnapshot`, `makePrompt` y lotes.
- [ ] Comprobar el test y pruebas previas.

### Task 2 — UI y enlace a análisis
- [ ] Panel, selección, previsualización, correspondencias locales, copia, reset.
- [ ] Conectar con `renderTrackingDashboard` y con el cambio del CSV.
- [ ] Test UI de estructura y ruta de script.

### Task 3 — Ayudas, README y entrega
- [ ] Añadir ayuda, precauciones y flujo de uso al README.
- [ ] Verificar todos los tests y que las copias HTML están sincronizadas.
- [ ] Fusionar a `main` por petición previa del usuario, sin afirmar prueba visual que no se haya hecho.
