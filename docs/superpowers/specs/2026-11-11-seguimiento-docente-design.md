# Seguimiento docente continuo — Diseño

**Objetivo:** pasar de un resumen de eventos a decisiones observables de seguimiento de alumnos durante el curso, sin inferir aprendizaje ni abandono.
**Diseño visual:** minimalismo editorial, prioridad a tablas legibles, divisores finos y paneles con ayudas accesibles.
**Paleta:** fondo #F4F3EF; texto #18181B; acento #1B4332.
**Fuentes:** Space Grotesk (titulares) y DM Sans (texto y controles).

## Orden según utilidad docente
1. Continuidad semanal por alumno e inactividad relativa a la última fecha presente en el CSV.
2. Perfil individual con evolución semanal.
3. Comparación de periodos equivalentes, si el CSV incluye el periodo anterior completo.
4. Mapa de calor de actividad por día y hora.
5. Tipología de interacción (consulta, participación y otras) basada en patrones personalizables.
6. Sesiones estimadas agrupando eventos separados hasta 30 minutos.
7. Actividad atípica por ráfagas de eventos/hora (revisión, no juicio).
8. Calidad e integridad del CSV.
9. Visualizaciones de volumen existentes: alumnos, tiempo, contexto, componentes, IP y cuestionarios.

## Condiciones
- Conservar todas las funciones y los 20 gráficos/ayudas originales.
- Mantener filtros, exclusiones, exportación y uso en GitHub Pages.
- Todos los cálculos funcionan en navegador, sin enviar el CSV al servidor.
- Ventanas de ayuda realmente accesibles y ejemplos de interpretación de cada gráfico.
- Los indicadores no son diagnósticos educativos, y la ausencia de eventos no demuestra desinterés.
- Periodos comparados de idéntica duración y con los mismos filtros; ocultar comparación si el CSV no cubre el anterior.
- Filtrar estudiantes por cohortes del dataset y no presentar estudiantes sin registros históricos como matriculados.
- Reordenar el resto de los gráficos por utilidad docente.
- Sin introducir framework ni backend.
