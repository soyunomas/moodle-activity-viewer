# Informes para IA: seguimiento seudonimizado de alumnos

## Objetivo
Preparar un informe listo para copiar y pegar en una IA externa, individual o por lotes de 10 alumnos, con evidencias cuantitativas de Moodle y un prompt que no atribuya esfuerzo, aprendizaje o conducta a partir de eventos.

## Dirección visual
- Estética: editorial técnico compacto, continuidad visual con la interfaz existente.
- Paleta: #F4F3EF (fondo), #18181B (texto), #1B4332 (acción).
- Fuentes: Space Grotesk (títulos), DM Sans (cuerpo).

## Contrato de privacidad
- Solo usar en el contenido para copiar IDs seudónimos `Alumno 001`, `Alumno 002` y métricas numéricas agregadas; jamás nombres, IP, textos de eventos, contextos, descripciones, timestamp exacto o nombres de archivo.
- Correspondencia `Alumno 001 → Nombre Apellidos` disponible en un desplegable del visor, no en el texto para IA y no en almacenamiento persistente.
- IDs estables durante los filtros de un mismo CSV: asignación por nombres ordenados de la cohorte del archivo, posterior a exclusiones globales.
- No llamar APIs ni enviar registros automáticamente. Copiar explícitamente; verificar políticas del centro antes de enviar el texto a terceros.
- Seudonimizar NO garantiza anonimato: combinaciones de actividad y la tabla local pueden permitir reidentificación.

## Contenido
- Cabecera con instrucciones de lectura, límites y petición de análisis por alumno, sin asignar calificaciones, carácter o “trabajador/perezoso”.
- Para cada ID: eventos, días activos, semanas activas, actividad semanal relativa; días sin eventos hasta última fecha del CSV; sesiones estimadas, sesiones de un solo evento y media de intervalos observados; consulta/participación/otras, franjas horarias agregadas; número de componentes y contextos distintos, no nombres; comparación referida a periodos del CSV cuando existe.
- Contexto de grupo: medianas de eventos y días activos, número de alumnos, no listado de terceros en un informe individual.
- Modos: alumno individual, lotes de hasta 10; cambiar lote sin perder etiquetas; previsualizar antes de copiar; mostrar número de caracteres y estado de copia.
- La selección actual de filtros se refleja en el análisis, sin exportar valores de filtros potencialmente identificativos.
- El texto de salida presenta limitaciones y ejemplos de cuestiones que el docente puede contrastar; no conclusiones educativas categóricas.

## Superficie
- Panel nuevo bajo Seguimiento docente, accesible tras analizar CSV.
- Conmutador individual/lote, selección de ID, selección del lote cuando corresponda, enfoque de tutoría y botón Generar + Copiar.
- Tabla de equivalencias local desplegable, con aviso explícito de no copiar a IA.
- Instrucciones y ayuda específica del panel.
- README con guía y límites de privacidad.

## Pruebas
- Determinismo y estabilidad de IDs con filtros.
- Copia sin nombres/IP/contextos/textos de evento/fechas exactas.
- Correcto cómputo de sesiones y porcentajes, inclusión de alumnos sin eventos.
- Truncamiento por lotes de 10 y orden estable.
- Integridad de la interfaz con dos HTML idénticos, IDs únicos y botón funcional.
