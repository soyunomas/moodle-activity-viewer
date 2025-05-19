# Guía de Uso: Visor de Actividad Moodle

## 1. Introducción

### 1.1. Propósito de la Herramienta

El **Visor de Actividad Moodle** es una aplicación web interactiva diseñada para facilitar el análisis y la visualización de los logs de actividad generados por la plataforma de e-learning Moodle. Su principal objetivo es transformar los datos crudos de los logs (generalmente exportados en formato CSV) en información visualmente comprensible y accionable.

Mediante una serie de gráficos dinámicos, filtros personalizables y estadísticas resumidas, la herramienta busca:

*   **Ofrecer una visión clara** del comportamiento de los usuarios dentro de un curso o plataforma Moodle.
*   **Identificar patrones de acceso** y participación de los alumnos.
*   **Evaluar la utilización** de los diferentes recursos y actividades del curso.
*   **Detectar posibles problemas** o áreas de mejora tanto a nivel individual de alumnos como del diseño instruccional del curso.
*   **Facilitar la toma de decisiones informada** para tutores, administradores y diseñadores de cursos, permitiéndoles optimizar la experiencia de aprendizaje.
*   **Explorar la actividad desde la perspectiva de la red**, analizando el uso de Direcciones IP para comprender mejor los contextos de acceso.

En esencia, el Visor de Actividad Moodle pretende ser un aliado para extraer conocimiento valioso de los datos que Moodle registra, yendo más allá de simples tablas para ofrecer insights intuitivos.

### 1.2. ¿A quién va dirigido?

Esta herramienta está principalmente dirigida a:

*   **Profesores y Tutores:** Para monitorizar la actividad de sus alumnos, identificar a aquellos que puedan necesitar apoyo adicional, entender qué recursos son más utilizados o cuáles están siendo ignorados, y obtener una visión general del pulso de la clase.
*   **Administradores de Moodle:** Para supervisar el uso general de la plataforma, identificar picos de carga, analizar patrones de acceso a nivel de red (uso de IPs), y obtener datos para la optimización de recursos.
*   **Diseñadores Instruccionales y Coordinadores Académicos:** Para evaluar la efectividad del diseño de los cursos, ver cómo los alumnos interactúan con los materiales y actividades propuestas, y tomar decisiones basadas en datos para futuras mejoras curriculares.
*   **Investigadores en Educación y Learning Analytics:** Como una herramienta para la recolección y visualización preliminar de datos de interacción en entornos Moodle, pudiendo servir de base para estudios más profundos.
*   **Analistas de Datos (con foco en educación):** Que necesiten una forma rápida y visual de explorar logs de Moodle antes de aplicar técnicas de análisis más complejas.

Aunque la herramienta proporciona información técnica (como Direcciones IP), su diseño busca ser accesible para usuarios con distintos niveles de conocimiento técnico, priorizando la claridad visual y la facilidad de uso.

### 1.3. Resumen de Funcionalidades Clave

El Visor de Actividad Moodle ofrece un conjunto robusto de características para el análisis de logs:

*   **Carga de Datos Simplificada:** Permite cargar archivos CSV exportados directamente desde Moodle.
*   **Panel de Control Interactivo:**
    *   **Filtrado Múltiple:** Capacidad para filtrar datos por rango de fechas, alumno específico, nombre del evento, componente, contexto del evento y Dirección(es) IP.
    *   **Actualización Dinámica:** Los gráficos y estadísticas se actualizan automáticamente al aplicar o cambiar los filtros.
*   **Dashboard Visual Integral:**
    *   **Estadísticas Generales:** Resumen cuantitativo de la actividad (total de eventos, usuarios únicos, días activos, etc.).
    *   **Variedad de Gráficos:**
        *   **Análisis de Usuario:** Actividad por alumno.
        *   **Análisis Temporal:** Eventos por día, por hora, por día de la semana.
        *   **Análisis de Contenido:** Actividad por componente, por contexto, desglose de eventos en componentes.
        *   **Análisis Relacional (Scatter Plots):** Usuarios vs. Eventos, Componentes vs. Eventos, Visualización vs. Participación.
        *   **Análisis Multidimensional (Bubble Charts):** Perfiles de alumnos, componentes y contextos basados en múltiples métricas.
        *   **Análisis de IP:** Top IPs por eventos, Top IPs por alumnos, Top Alumnos por IPs.
    *   **Interactividad:** Posibilidad de hacer clic en los gráficos del dashboard para ver una versión ampliada y más detallada en una ventana modal.
*   **Tabla de Logs Detallada:** Muestra las entradas de log individuales que coinciden con los filtros aplicados, permitiendo una inspección granular.
*   **Configuración Personalizable:**
    *   **Exclusión de Usuarios:** Permite omitir ciertos usuarios de los análisis (ej. administradores, usuarios de prueba).
    *   **Definición de Patrones:** Configuración de palabras clave para categorizar eventos como "visualización" o "participación", crucial para ciertos análisis específicos (ej. gráfico de Visualización vs. Participación).
*   **Compatibilidad y Responsividad:** Diseñada para funcionar en navegadores modernos y adaptarse a diferentes tamaños de pantalla.
*   **Enfoque en la Usabilidad:** Interfaz clara, mensajes de estado y una estructura que guía al usuario a través del proceso de análisis.

## 2. Requisitos y Preparación de Datos

Para que el Visor de Actividad Moodle funcione correctamente y pueda ofrecer todos sus análisis, es crucial que los datos de entrada, provenientes de un archivo CSV generado por Moodle, cumplan ciertas características.

### 2.1. Formato del Archivo CSV

La herramienta está diseñada para interpretar archivos de valores separados por comas (CSV, por sus siglas en inglés: *Comma-Separated Values*). Generalmente, estos archivos se pueden exportar directamente desde la sección de "Informes" o "Logs" de Moodle.

#### 2.1.1. Columnas Esperadas (y su mapeo)

El visor espera encontrar una cabecera en la primera línea del archivo CSV que contenga los nombres de las columnas. Aunque Moodle puede generar logs con diversas columnas, la herramienta está específicamente configurada para buscar y mapear las siguientes columnas (el nombre exacto en el CSV puede variar ligeramente según la versión de Moodle o el idioma, pero estos son los nombres comunes que la herramienta intenta reconocer):

1.  **`Hora`**
    *   **Descripción:** Fecha y hora exactas en que ocurrió el evento.
    *   **Formato Esperado:** Generalmente `DD/MM/AA, HH:MM:SS` (Ej: `25/12/23, 14:35:01`). La herramienta internamente parsea este formato.
    *   **Mapeo Interno:** `TIME`
    *   **Importancia:** Crítica para todos los análisis temporales y la secuenciación de eventos.

2.  **`Nombre completo del usuario`**
    *   **Descripción:** El nombre y apellidos del usuario que generó el evento.
    *   **Mapeo Interno:** `FULL_NAME`
    *   **Importancia:** Crítica para los análisis centrados en el alumno y para los filtros de usuario.

3.  **`Usuario afectado`**
    *   **Descripción:** En algunos eventos, indica sobre qué otro usuario recae la acción (ej. un profesor calificando a un alumno).
    *   **Mapeo Interno:** `AFFECTED_USER`
    *   **Importancia:** Informativa, aunque no es utilizada activamente en la mayoría de los gráficos actuales del visor. Puede ser útil para análisis manuales de la tabla de logs.

4.  **`Contexto del evento`**
    *   **Descripción:** Identifica el lugar específico dentro de Moodle donde ocurrió el evento. Suele ser el nombre del curso, una actividad, un recurso, o una sección.
    *   **Mapeo Interno:** `EVENT_CONTEXT`
    *   **Importancia:** Crítica para los gráficos de "Actividad por Contexto" y para entender dónde se concentra la actividad.

5.  **`Componente`**
    *   **Descripción:** El tipo de módulo o herramienta de Moodle involucrada en el evento (ej. Foro, Tarea, Cuestionario, Sistema, Archivo).
    *   **Mapeo Interno:** `COMPONENT`
    *   **Importancia:** Crítica para los gráficos de "Actividad por Componente", "Desglose de Eventos", y para los filtros de componente.

6.  **`Nombre evento`**
    *   **Descripción:** Una descripción textual del tipo de acción realizada (ej. "Vista de curso", "Usuario calificó la tarea", "Mensaje de foro creado").
    *   **Mapeo Interno:** `EVENT_NAME`
    *   **Importancia:** Crítica para el filtrado por eventos y para la identificación de patrones de visualización/participación.

7.  **`Descripción`**
    *   **Descripción:** Información adicional o más detallada sobre el evento. Puede variar mucho en contenido.
    *   **Mapeo Interno:** `DESCRIPTION`
    *   **Importancia:** Principalmente informativa, se muestra en la tabla de logs detallados.

8.  **`Origen`**
    *   **Descripción:** Indica el origen del log (ej. 'web', 'cli').
    *   **Mapeo Interno:** `ORIGIN`
    *   **Importancia:** Informativa, no se usa directamente en los gráficos actuales pero puede ser útil para análisis avanzados.

9.  **`Dirección IP`** (Columna Clave para Nuevas Funcionalidades)
    *   **Descripción:** La dirección IP desde la cual el usuario accedió para generar el evento.
    *   **Mapeo Interno:** `IP_ADDRESS`
    *   **Importancia:** **Crítica y Obligatoria** para utilizar el filtro de IP y los gráficos relacionados con el análisis de IPs ("Top IPs por Eventos", "Alumnos por IP", "IPs por Alumno"). Si esta columna no está presente o está vacía, dichas funcionalidades no estarán disponibles o no mostrarán datos.

**Nota Importante sobre el Mapeo:** La herramienta intenta ser flexible con pequeñas variaciones en los nombres de las cabeceras (ej. espacios, mayúsculas/minúsculas). Sin embargo, para asegurar la correcta interpretación, es ideal que los nombres de las columnas en el CSV se asemejen lo más posible a los indicados. Las columnas marcadas como **Críticas** son esenciales para la mayoría de las funcionalidades del visor.

#### 2.1.2. Consideraciones sobre la Calidad de los Datos

La calidad de los análisis generados por el visor depende directamente de la calidad de los datos en el archivo CSV. Algunos puntos a considerar:

*   **Completitud:** Asegurarse de que el log exportado cubra el periodo de tiempo deseado y contenga todos los eventos relevantes. Logs incompletos llevarán a conclusiones parciales.
*   **Consistencia:** Los nombres de usuario, componentes, contextos y eventos deben ser consistentes. Inconsistencias (ej. "Foro A" vs "Foro_A") pueden ser tratados como elementos diferentes por la herramienta.
*   **Información de IP:** Para los análisis basados en IP, es fundamental que Moodle esté configurado para registrar esta información y que se incluya en la exportación del log. IPs anonimizadas o ausentes limitarán estas funcionalidades.
*   **Volumen de Datos:** Archivos CSV extremadamente grandes (muchos millones de registros) pueden tardar en procesarse en el navegador y, en casos extremos, causar problemas de rendimiento. La herramienta está optimizada, pero existe un límite práctico.
*   **Caracteres Especiales y Codificación:** Aunque la herramienta intenta manejar la codificación UTF-8, problemas con caracteres especiales en los nombres de usuario, contextos, etc., podrían ocasionalmente causar problemas de visualización o filtrado si el CSV no está correctamente codificado.
*   **Limpieza Previa:** En algunos casos, puede ser beneficioso realizar una limpieza o pre-procesamiento básico del CSV si se conocen inconsistencias notorias antes de cargarlo en el visor.

### 2.2. Carga del Archivo CSV

Cargar los datos en el Visor de Actividad Moodle es un proceso sencillo:

1.  **Localizar el Control de Carga:** En el panel superior de "Configuración de Análisis y Filtros", encontrarás la sección "1. Selecciona el archivo CSV:".
2.  **Hacer Clic en "Seleccionar archivo" / "Choose File":** Esto abrirá el diálogo de selección de archivos de tu sistema operativo.
3.  **Navegar y Seleccionar el Archivo:** Busca en tu ordenador el archivo CSV que has exportado de Moodle y selecciónalo.
    *   La herramienta está configurada para aceptar únicamente archivos con la extensión `.csv`.
4.  **Confirmación de Selección:** Una vez seleccionado, el nombre del archivo aparecerá junto al botón, y un mensaje de estado indicará que el archivo está listo para ser analizado (ej. "Archivo seleccionado: `nombre_del_archivo.csv`. Listo para analizar.").

**Tras la selección del archivo (pero antes de pulsar "Analizar Logs"):**

*   La herramienta **NO procesa inmediatamente** el contenido completo del archivo. Solo registra la selección.
*   Si se selecciona un nuevo archivo, cualquier caché de datos previamente cargada se descarta, y los filtros se reinician a sus valores por defecto.
*   Es el momento ideal para ajustar los filtros de fecha, usuario, etc., si ya tienes una idea de qué quieres analizar específicamente.

El análisis real del contenido del archivo y la generación de visualizaciones ocurren después de pulsar el botón **"Analizar Logs"** (ver sección 3.2.3).
## 3. Interfaz de Usuario: Un Vistazo General

La interfaz del Visor de Actividad Moodle está diseñada para ser intuitiva y funcional, permitiendo al usuario cargar datos, aplicar filtros y visualizar los resultados de manera eficiente. A continuación, se describen sus componentes principales:

### 3.1. Barra de Navegación Superior

Situada en la parte más alta de la página, esta barra es fija y permanece visible incluso al hacer scroll.

*   **Título de la Aplicación:** Muestra "Visor Moodle" como identificador principal.
*   **Botón de Menú Hamburguesa (en vistas móviles):** Permite colapsar/expandir las opciones de la barra en pantallas pequeñas.

#### 3.1.1. Icono de Configuración (`<i class="bi bi-gear-fill"></i>`)

*   **Ubicación:** Generalmente a la derecha de la barra de navegación.
*   **Funcionalidad:** Al hacer clic en este icono, se abre el **Modal de Configuración** (descrito en la sección 3.6). Este modal permite al usuario definir exclusiones de alumnos y patrones para categorizar eventos, afectando cómo se procesan y visualizan los datos.

### 3.2. Panel de Controles de Análisis y Filtros (Acordeón)

Este panel es el centro neurálgico para configurar el análisis. Está implementado como un acordeón de Bootstrap ("Configuración de Análisis y Filtros") que puede expandirse o colapsarse para ahorrar espacio. Por defecto, se muestra expandido. Es "sticky", lo que significa que se mantiene visible en la parte superior de la ventana (debajo de la barra de navegación) al hacer scroll, facilitando el acceso rápido a los filtros.

#### 3.2.1. Selección de Archivo CSV

*   **Etiqueta:** "1. Selecciona el archivo CSV:"
*   **Control:** Un campo de entrada de tipo `file` (`<input class="form-control" type="file" id="csvFile" accept=".csv">`).
*   **Funcionalidad:** Permite al usuario seleccionar un archivo con extensión `.csv` desde su sistema local. Al seleccionar un archivo, su nombre aparece junto al control y se actualiza un mensaje de estado.
*   **Impacto:** Seleccionar un archivo nuevo borra los datos previamente cargados y resetea los filtros. El procesamiento real del archivo ocurre al pulsar "Analizar Logs".

#### 3.2.2. Filtros de Análisis

Ubicados dentro de un área con scroll ("filters-scroll-area") para manejar múltiples opciones de forma compacta.
*   **Etiqueta General:** "2. Filtros de Análisis:"

    *   **Fecha de Inicio / Fin:**
        *   **Controles:** Dos campos de entrada de tipo `date` (`<input type="date">`).
        *   **Funcionalidad:** Permiten seleccionar un rango de fechas para acotar el análisis. Por defecto, suelen mostrar el primer y último día del mes actual.
        *   **Impacto:** Solo los eventos dentro del rango seleccionado (inclusive) serán considerados en los análisis y gráficos.

    *   **Filtrar por Alumno:**
        *   **Control:** Un desplegable (`<select>`).
        *   **Opciones:** La primera opción es "Todos los Alumnos". Las siguientes opciones se rellenan dinámicamente con los nombres únicos de los alumnos presentes en el archivo CSV cargado (después del primer análisis o si se procesa un archivo nuevo).
        *   **Funcionalidad:** Permite centrar el análisis en la actividad de un alumno específico o ver la de todos.

    *   **Filtrar por Nombre Evento:**
        *   **Control:** Un desplegable (`<select>`).
        *   **Opciones:** La primera opción es "Todos los Eventos". Las siguientes opciones se rellenan dinámicamente con los nombres únicos de los eventos presentes en los datos cargados.
        *   **Funcionalidad:** Permite analizar ocurrencias de un tipo de evento específico.

    *   **Filtrar por Componente:**
        *   **Control:** Un desplegable (`<select>`).
        *   **Opciones:** La primera opción es "Todos los Componentes". Las siguientes opciones se rellenan dinámicamente con los componentes únicos de Moodle detectados en los datos.
        *   **Funcionalidad:** Útil para investigar el uso de herramientas específicas (Foro, Tarea, Cuestionario, etc.).

    *   **Filtrar por Contexto del Evento:**
        *   **Control:** Un desplegable (`<select>`).
        *   **Opciones:** La primera opción es "Todos los Contextos". Las siguientes opciones se rellenan dinámicamente con los contextos únicos (cursos, actividades específicas, secciones) de los datos.
        *   **Funcionalidad:** Permite enfocar el análisis en una parte específica del curso o actividad.

    *   **Filtrar por Dirección IP (Selección Múltiple):**
        *   **Control:** Un desplegable (`<select multiple>`) que permite seleccionar una o varias IPs.
        *   **Opciones:** Se rellena dinámicamente con las Direcciones IP únicas encontradas en la columna "Dirección IP" del archivo CSV (si está presente y contiene datos).
        *   **Funcionalidad:** Permite restringir el análisis a los eventos originados desde las IPs seleccionadas. Si no se selecciona ninguna IP (y el filtro está activo), se consideran todas las IPs. Inicialmente está deshabilitado hasta que se carga un archivo con la columna de IP.
        *   **Ayuda Visual:** Un texto (`<div class="form-text" id="ipFilterHelp">`) indica el estado del filtro o cómo usarlo.

    *   **Aplicación de Filtros:** Cambiar el valor de cualquier filtro (después de que los datos iniciales hayan sido procesados con "Analizar Logs") dispara automáticamente un re-análisis y actualización de los gráficos y la tabla de logs, sin necesidad de volver a pulsar "Analizar Logs".

#### 3.2.3. Botón "Analizar Logs"

*   **Control:** Un botón grande y prominente (`<button id="analyzeButton" class="btn btn-primary btn-lg">Analizar Logs</button>`).
*   **Funcionalidad:** Es el disparador principal para procesar el archivo CSV seleccionado (si es la primera vez o si se cambió el archivo) y aplicar todos los filtros seleccionados. Muestra un indicador de carga mientras procesa.
*   **Impacto:** Una vez completado, la sección de "Resultados" (Dashboard y Tabla de Logs) se actualiza o se muestra si estaba oculta.

#### 3.2.4. Mensajes de Estado y Progreso

*   **Ubicación:** Debajo de los controles de filtrado (`<div id="statusMessage" class="mt-3 pt-2 border-top"></div>`).
*   **Funcionalidad:** Proporciona feedback al usuario sobre el estado de la aplicación:
    *   Confirmación de archivo seleccionado.
    *   Inicio del proceso de análisis.
    *   Finalización del análisis (con el número de eventos mostrados).
    *   Advertencias (ej. no hay datos con los filtros actuales, archivo vacío).
    *   Errores (ej. problema al leer el archivo, formato incorrecto).
*   **Indicador de Carga Global:** Un spinner (`<div id="loadingIndicator">`) se muestra prominentemente en el centro de la página mientras se realizan operaciones intensivas (como el parseo inicial del CSV).

### 3.3. Dashboard Principal (Sección de Resultados)

Esta es la sección principal (`<main id="resultsSection">`) donde se visualizan los datos analizados. Permanece oculta hasta que se completa un análisis exitoso.

#### 3.3.1. Estadísticas Generales

*   **Ubicación:** Una tarjeta en la parte superior izquierda del dashboard.
*   **Contenido:** Muestra métricas clave calculadas a partir de los datos filtrados:
    *   Rango de Fechas analizado.
    *   Total de Eventos.
    *   Usuarios Únicos.
    *   Días con Actividad.
    *   Promedio de Eventos/Día.
    *   Evento Más Frecuente.
    *   Componente Más Accedido.
    *   Usuario Más Activo.
*   **Formato:** Las métricas numéricas suelen presentarse como "badges" de Bootstrap para destacar.

#### 3.3.2. Tarjetas de Gráficos Resumidos (Dashboard)

*   **Disposición:** Una serie de tarjetas (`<div class="card chart-card">`) organizadas en filas y columnas (layout responsivo de Bootstrap). Cada tarjeta contiene un gráfico.
*   **Contenido:** Cada tarjeta presenta una visualización específica de los datos filtrados:
    *   Actividad por Alumno (Top 15)
    *   Eventos por Día
    *   Actividad por Componente (Top 10)
    *   Eventos por Hora del Día
    *   Eventos por Día de Semana
    *   Desglose Eventos en Componentes
    *   Actividad por Contexto (Top 10)
    *   Scatter: Usuarios Únicos vs Eventos (por Día)
    *   Scatter: Componentes Únicos vs Eventos (por Alumno)
    *   Scatter: Visualización vs Participación (por Alumno)
    *   Bubble: Análisis Alumnos
    *   Bubble: Análisis Componentes
    *   Bubble: Análisis Contextos
    *   IP: Top IPs por N° Eventos (Top 10)
    *   IP: Top IPs por N° Alumnos (Top 10)
    *   IP: Top Alumnos por N° IPs (Top 10)
*   **Canvas:** Dentro de cada tarjeta, un elemento `<canvas>` se utiliza para renderizar el gráfico usando Chart.js.
*   **Interactividad: Clic para ampliar en modal:**
    *   Cada tarjeta de gráfico tiene un atributo `data-modal-target` que apunta al ID del modal correspondiente y `data-chart-type` que indica el tipo de gráfico.
    *   Al hacer clic en cualquier parte de la tarjeta, se abre un modal (ver sección 3.5) que muestra una versión ampliada y más detallada del mismo gráfico, utilizando los mismos datos filtrados.

#### 3.3.3. Disposición y Responsividad

*   El dashboard utiliza el sistema de grid de Bootstrap (`row`, `col-xl-3`, `col-md-6`, etc.) para asegurar que los gráficos se organicen adecuadamente en diferentes tamaños de pantalla, desde escritorios grandes hasta dispositivos móviles.
*   Los gráficos dentro de las tarjetas están configurados para ser responsivos y mantener su aspect ratio tanto como sea posible.

### 3.4. Tabla de Detalle de Logs Filtrados

Situada debajo de la sección de gráficos del dashboard, dentro de una tarjeta (`<section id="logTableSection">`).

*   **Título:** "Detalle de Logs Filtrados".
*   **Contenido:** Una tabla HTML (`<table>`) que muestra las filas individuales del log que coinciden con todos los filtros aplicados actualmente.

#### 3.4.1. Columnas Mostradas

La tabla típicamente muestra las siguientes columnas para cada entrada de log:
*   Hora
*   Nombre completo del usuario
*   Contexto del evento
*   Componente
*   Nombre evento
*   Descripción

#### 3.4.2. Contador de Filas

*   Debajo de la tabla (`<p id="tableRowCount">`), se muestra un texto indicando el número total de filas (eventos) que se están mostrando en la tabla (ej. "Mostrando 150 fila(s).").

### 3.5. Modales de Gráficos Ampliados

Para cada tipo de gráfico del dashboard, existe un modal de Bootstrap correspondiente que se activa al hacer clic en la tarjeta del gráfico respectivo.

*   **Estructura del Modal:** Típicamente `modal-fullscreen` para ocupar toda la pantalla y ofrecer el máximo espacio para el gráfico.
    *   **Encabezado del Modal:** Contiene un título descriptivo del gráfico ampliado y un botón de cierre (`btn-close`).
    *   **Cuerpo del Modal:** Contiene un `div` con la clase `chart-container-modal` y dentro, un elemento `<canvas>` con un ID único para renderizar la versión ampliada del gráfico.

#### 3.5.1. Visualización Detallada

*   Los gráficos en los modales suelen mostrar más datos que sus contrapartes del dashboard (ej. Top 150 alumnos en lugar de Top 15).
*   Permiten una inspección más cómoda de gráficos con muchas etiquetas o puntos de datos.

#### 3.5.2. Títulos y Leyendas

*   Los gráficos modales siempre incluyen un título claro.
*   Las leyendas se muestran si son relevantes y ayudan a la interpretación (ej. en gráficos de dona, o barras agrupadas/apiladas con múltiples datasets).

### 3.6. Modal de Configuración (Exclusiones y Patrones)

Se accede a través del icono de engranaje en la barra de navegación superior.

*   **Título del Modal:** "Configuración de Exclusiones" (o similar).
*   **Cuerpo del Modal:** Contiene campos de formulario para:

    #### 3.6.1. Excluir Alumnos
    *   **Control:** Un área de texto (`<textarea id="excludedUsernamesTextarea">`).
    *   **Funcionalidad:** Permite al usuario ingresar una lista de subcadenas de nombres de usuario, separadas por comas. Cualquier alumno cuyo nombre completo (insensible a mayúsculas/minúsculas) contenga alguna de estas subcadenas será excluido de todos los análisis y gráficos.
    *   **Ejemplo:** "Fernández, Jose, Admin User".

    #### 3.6.2. Patrones Eventos de Visualización
    *   **Control:** Un área de texto (`<textarea id="viewEventPatternsTextarea">`).
    *   **Funcionalidad:** Permite definir una lista de subcadenas (separadas por comas, insensibles a mayúsculas/minúsculas al procesar) que identifican eventos como de "visualización" o "consulta".
    *   **Uso:** Principalmente para el gráfico "Scatter: Visualización vs Participación".
    *   **Ejemplo:** "viewed, consultado, vista".

    #### 3.6.3. Patrones Eventos de Participación
    *   **Control:** Un área de texto (`<textarea id="participationEventPatternsTextarea">`).
    *   **Funcionalidad:** Permite definir una lista de subcadenas (separadas por comas, insensibles a mayúsculas/minúsculas al procesar) que identifican eventos como de "participación" o "interacción activa".
    *   **Uso:** Para el gráfico "Scatter: Visualización vs Participación". Un evento se cuenta como participación si coincide aquí Y NO en la lista de visualización (para evitar doble conteo).
    *   **Ejemplo:** "submitted, posted, answered, participado".

*   **Pie del Modal:**
    *   **Botón "Cerrar":** Cierra el modal sin guardar cambios.
    *   **Botón "Guardar Cambios y Reanalizar":**
        *   Guarda las configuraciones de exclusiones y patrones en el `localStorage` del navegador para que persistan entre sesiones.
        *   Si hay datos cargados (`parsedDataCache`), dispara un re-análisis completo utilizando las nuevas configuraciones.
        *   Muestra un mensaje de confirmación.

Esta descripción detallada debería proporcionar una comprensión clara de cómo navegar e interactuar con el Visor de Actividad Moodle.

## 4. Análisis de Datos: Interpretando los Gráficos

Una vez que los datos han sido cargados y filtrados, el Visor de Actividad Moodle presenta una rica variedad de visualizaciones y estadísticas. Entender qué representa cada una y cómo interpretarlas es clave para extraer insights valiosos.

### 4.1. Estadísticas Generales del Dashboard

Ubicadas en la tarjeta superior izquierda del dashboard, estas métricas ofrecen un resumen cuantitativo de alto nivel de los datos que cumplen con los criterios de filtrado actuales.

*   **Rango Fechas:**
    *   **Muestra:** El periodo exacto (desde fecha de inicio hasta fecha de fin) que se está analizando actualmente, según lo definido en los filtros de fecha.
    *   **Interpretación:** Contextualiza temporalmente todos los demás datos y gráficos. Es fundamental para entender si se está viendo la actividad de una semana, un mes, un semestre, etc.

*   **Total Eventos:**
    *   **Muestra:** El número absoluto de entradas de log (eventos) que coinciden con todos los filtros aplicados (fechas, usuario, evento, componente, contexto, IP).
    *   **Interpretación:** Es una medida del volumen bruto de actividad. Un número alto indica mucha interacción; un número bajo, poca. Su significado depende mucho de la duración del rango de fechas y el número de usuarios.

*   **Usuarios Únicos:**
    *   **Muestra:** El número de distintos "Nombre completo del usuario" que han generado al menos un evento dentro de los datos filtrados.
    *   **Interpretación:** Indica cuántos individuos diferentes estuvieron activos. Comparado con el número total de alumnos esperados, puede mostrar el alcance de la participación.

*   **Días con Actividad:**
    *   **Muestra:** El número de días únicos dentro del "Rango Fechas" en los que se registró al menos un evento.
    *   **Interpretación:** Mide la dispersión temporal de la actividad. Si es bajo en un rango largo, sugiere actividad concentrada en pocos días.

*   **Promedio Eventos/Día:**
    *   **Muestra:** Calculado como `Total Eventos` / `Días con Actividad`.
    *   **Interpretación:** Ofrece una idea de la intensidad de la actividad en los días que hubo movimiento. Un promedio alto sugiere días muy ocupados.

*   **Evento Más Frecuente:**
    *   **Muestra:** El "Nombre evento" que más veces aparece en los datos filtrados.
    *   **Interpretación:** Señala la acción más común realizada por los usuarios. Podría ser "Vista de curso", "Mensaje de foro visto", etc. Ayuda a entender el tipo de interacción predominante.

*   **Componente Más Accedido:**
    *   **Muestra:** El "Componente" (tipo de módulo de Moodle) con el mayor número de eventos asociados.
    *   **Interpretación:** Indica qué herramienta o tipo de recurso de Moodle es el más utilizado dentro del contexto filtrado.

*   **Usuario Más Activo:**
    *   **Muestra:** El "Nombre completo del usuario" que ha generado el mayor número de eventos. Se muestra el nombre y, entre paréntesis, su total de eventos.
    *   **Interpretación:** Identifica al individuo con mayor volumen de interacciones.

**Cómo interpretar en conjunto:** Estas estadísticas deben leerse como un todo. Por ejemplo, un "Total Eventos" alto con "Usuarios Únicos" bajo podría indicar que unos pocos usuarios son extremadamente activos. Un "Promedio Eventos/Día" bajo pero con muchos "Días con Actividad" sugiere actividad constante pero no muy intensa.

### 4.2. Gráficos del Dashboard y sus Modales Detallados

Cada tarjeta de gráfico en el dashboard ofrece una vista resumida. Al hacer clic en ella, se abre un modal con una versión más detallada y espaciosa del mismo gráfico, utilizando los mismos datos filtrados.

#### 4.2.1. Actividad por Alumno (Top N)

*   **¿Qué muestra?** Un gráfico de barras (generalmente horizontal) que lista los alumnos ordenados por la cantidad total de eventos que han generado. El dashboard muestra un "Top N" (ej. Top 15), mientras que el modal puede mostrar un número mayor.
*   **¿Para qué sirve?**
    *   Identificar rápidamente a los alumnos más activos (barras más largas).
    *   Detectar a los alumnos con menor actividad, lo que podría ser una señal de alerta temprana para posible desconexión o dificultades.
    *   Comparar la actividad relativa entre diferentes alumnos.

#### 4.2.2. Eventos por Día

*   **¿Qué muestra?** Un gráfico de líneas que traza el número total de eventos ocurridos en cada día dentro del rango de fechas seleccionado.
*   **¿Para qué sirve?**
    *   Visualizar la distribución temporal de la actividad general.
    *   Identificar picos de actividad (ej. cerca de fechas de entrega, antes de exámenes).
    *   Detectar periodos de inactividad o baja actividad (ej. fines de semana, vacaciones, o posible desinterés).
    *   Observar tendencias generales (¿la actividad aumenta o disminuye con el tiempo?).

#### 4.2.3. Actividad por Componente (Top N)

*   **¿Qué muestra?** Un gráfico de dona (o pastel/barras en el modal) que muestra la proporción de eventos asociados a cada componente de Moodle (ej. Foro, Tarea, Cuestionario, Sistema). El dashboard muestra los N componentes principales.
*   **¿Para qué sirve?**
    *   Evaluar qué tipos de herramientas o recursos de Moodle son los más (o menos) utilizados.
    *   Identificar si los componentes clave del diseño del curso están siendo accedidos como se esperaba.
    *   Detectar si hay un uso excesivo de ciertos componentes o si otros están siendo infrautilizados.

#### 4.2.4. Eventos por Hora del Día

*   **¿Qué muestra?** Un gráfico de barras que muestra el número total de eventos agrupados por cada una de las 24 horas del día.
*   **¿Para qué sirve?**
    *   Entender los patrones de actividad de los alumnos según la hora.
    *   Identificar las "horas pico" de estudio o acceso al curso.
    *   Observar si hay actividad significativa en horarios nocturnos o muy tempranos.
    *   Informar sobre posibles horarios para sesiones de tutoría en vivo o mantenimiento de la plataforma.

#### 4.2.5. Eventos por Día de Semana

*   **¿Qué muestra?** Un gráfico de barras que muestra el número total de eventos agrupados por cada día de la semana (Lunes a Domingo).
*   **¿Para qué sirve?**
    *   Visualizar cómo se distribuye la actividad a lo largo de una semana típica.
    *   Identificar los días de la semana con mayor carga de trabajo o interacción.
    *   Observar si los fines de semana son periodos de alta o baja actividad.

#### 4.2.6. Desglose Eventos en Componentes Principales

*   **¿Qué muestra?** Un gráfico de barras agrupadas o apiladas. Muestra los componentes más utilizados (ej. Top 3-5) y, para cada uno, desglosa los tipos de eventos más frecuentes que ocurren dentro de ellos (ej. en "Foro", los eventos podrían ser "vista de discusión", "mensaje creado", "suscripción").
*   **¿Para qué sirve?**
    *   Entender no solo *cuánto* se usa un componente, sino *cómo* se usa.
    *   Por ejemplo, ¿el componente "Tarea" tiene muchos eventos de "vista de la tarea" pero pocos de "entrega realizada"?
    *   Ayuda a refinar la comprensión del uso de las herramientas más populares.

#### 4.2.7. Actividad por Contexto (Top N)

*   **¿Qué muestra?** Un gráfico de barras (generalmente horizontal) que lista los contextos específicos del evento (ej. nombres de cursos, actividades específicas como "Tarea: Ensayo Final", secciones del curso como "Tema 3: Fotosíntesis") ordenados por el número de eventos asociados.
*   **¿Para qué sirve?**
    *   Identificar las "zonas calientes" o las partes más activas del curso o plataforma.
    *   Ver qué actividades o recursos específicos generan más interacción.
    *   Si se filtra por un componente (ej. "Foro"), este gráfico mostrará cuáles foros específicos son los más activos.

#### 4.2.8. Scatter: Usuarios Únicos vs Eventos (por Día)

*   **¿Qué muestra?** Un diagrama de dispersión donde cada punto representa un día. El eje X es el número de usuarios únicos activos ese día, y el eje Y es el número total de eventos ese día. El tooltip del punto muestra la fecha.
*   **¿Para qué sirve?**
    *   Identificar la naturaleza de la actividad diaria:
        *   **Puntos arriba a la derecha:** Muchos usuarios activos generando muchos eventos (día de alta participación general).
        *   **Puntos arriba a la izquierda:** Pocos usuarios activos pero generando muchos eventos (posiblemente unos pocos usuarios muy intensivos o tareas administrativas).
        *   **Puntos abajo a la derecha:** Muchos usuarios activos pero con pocos eventos cada uno (actividad ligera pero extendida).
        *   **Puntos abajo a la izquierda:** Poca actividad general.
    *   Observar si hay una correlación entre el número de personas activas y el volumen de interacciones.

#### 4.2.9. Scatter: Componentes Únicos vs Eventos (por Alumno)

*   **¿Qué muestra?** Un diagrama de dispersión donde cada punto representa un alumno. El eje X es el número de componentes únicos de Moodle con los que el alumno ha interactuado, y el eje Y es el número total de eventos generados por ese alumno. El tooltip del punto muestra el nombre del alumno.
*   **¿Para qué sirve?**
    *   Clasificar a los alumnos según su patrón de exploración y actividad:
        *   **Puntos arriba a la derecha:** Alumnos que usan muchos componentes diferentes y además son muy activos (exploradores activos).
        *   **Puntos arriba a la izquierda:** Alumnos que se enfocan en pocos componentes pero son muy activos en ellos (enfocados activos).
        *   **Puntos abajo a la derecha:** Alumnos que prueban muchos componentes pero con poca interacción en cada uno (exploradores superficiales).
        *   **Puntos abajo a la izquierda:** Alumnos con poca actividad y poca variedad de uso.

#### 4.2.10. Scatter: Visualización vs Participación (por Alumno)

*   **¿Qué muestra?** Un diagrama de dispersión donde cada punto representa un alumno. El eje X es el número de eventos categorizados como "visualización" (según patrones definidos en Configuración), y el eje Y es el número de eventos categorizados como "participación". El tooltip del punto muestra el nombre del alumno.
*   **¿Para qué sirve?** (La efectividad de este gráfico depende mucho de la correcta definición de los patrones de visualización/participación)
    *   Identificar diferentes perfiles de interacción:
        *   **Puntos arriba a la izquierda (alto Y, bajo X):** Alumnos muy participativos pero que consumen relativamente poco contenido ("Creadores").
        *   **Puntos abajo a la derecha (bajo Y, alto X):** Alumnos que visualizan mucho contenido pero participan poco ("Consumidores" o "Lurkers").
        *   **Puntos arriba a la derecha:** Alumnos activos tanto en visualización como en participación ("Comprometidos").
        *   **Puntos abajo a la izquierda:** Alumnos con baja actividad en general.
    *   Ayuda a detectar desequilibrios en los estilos de aprendizaje o participación.

#### 4.2.11. Bubble: Análisis Alumnos (Días Act./ØEvtDia/TotalEvt)

*   **¿Qué muestra?** Un diagrama de burbujas donde cada burbuja representa un alumno.
    *   **Eje X:** Número de días distintos en los que el alumno estuvo activo.
    *   **Eje Y:** Promedio de eventos generados por el alumno en sus días activos.
    *   **Tamaño de la Burbuja (R):** Proporcional al número total de eventos del alumno.
    *   **Tooltip:** Nombre del alumno y los valores exactos de X, Y, y R (total eventos).
*   **¿Para qué sirve?**
    *   Ofrece una visión multidimensional de la actividad del alumno, combinando constancia (días activos), intensidad (eventos/día) y volumen total.
    *   **Burbujas grandes arriba a la derecha:** Alumnos consistentemente activos e intensos.
    *   **Burbujas pequeñas abajo a la izquierda:** Alumnos con poca actividad general.
    *   **Burbujas grandes pero a la izquierda:** Alumnos con mucho volumen pero concentrado en pocos días (posible "atracón").
    *   Permite segmentar alumnos de formas más complejas que con una sola métrica.

#### 4.2.12. Bubble: Análisis Componentes (UsrUnicos/TotalEvt/ØEvtUsr)

*   **¿Qué muestra?** Un diagrama de burbujas donde cada burbuja representa un componente de Moodle.
    *   **Eje X:** Número de usuarios únicos que interactuaron con el componente.
    *   **Eje Y:** Número total de eventos asociados al componente.
    *   **Tamaño de la Burbuja (R):** Proporcional al promedio de eventos por usuario en ese componente (intensidad de uso individual).
    *   **Tooltip:** Nombre del componente y los valores exactos.
*   **¿Para qué sirve?**
    *   Clasificar componentes por su alcance y profundidad de uso:
        *   **Burbujas grandes arriba a la derecha:** Componentes masivos y muy utilizados por cada usuario.
        *   **Burbujas pequeñas arriba a la derecha (R pequeña):** Componentes usados por muchos, pero superficialmente.
        *   **Burbujas arriba a la izquierda (R grande):** Componentes de nicho pero usados intensamente por quienes acceden.
    *   Ayuda a entender qué componentes son centrales para muchos y cuáles son más especializados.

#### 4.2.13. Bubble: Análisis Contextos (AluAct/ØEvtAlu/TotalEvt)

*   **¿Qué muestra?** Un diagrama de burbujas donde cada burbuja representa un contexto del evento (ej. una actividad específica, un tema del curso).
    *   **Eje X:** Número de alumnos únicos activos en ese contexto.
    *   **Eje Y:** Promedio de eventos por alumno en ese contexto.
    *   **Tamaño de la Burbuja (R):** Proporcional al número total de eventos en ese contexto.
    *   **Tooltip:** Nombre del contexto y los valores exactos.
*   **¿Para qué sirve?**
    *   Evaluar el alcance y la intensidad de la interacción con diferentes partes del curso:
        *   **Burbujas grandes arriba a la derecha:** Contextos (actividades/recursos) populares y que generan mucha interacción por alumno.
        *   **Burbujas grandes pero con Y bajo:** Contextos accedidos por muchos pero con poca interacción por alumno.
        *   **Burbujas pequeñas pero con Y alto:** Contextos accedidos por pocos alumnos, pero que interactúan mucho con ellos.
    *   Identificar qué actividades específicas son más atractivas o generan más trabajo.

#### 4.2.14. IP: Top IPs por N° Eventos

*   **¿Qué muestra?** Un gráfico de barras (generalmente horizontal) que lista las Direcciones IP desde las cuales se generó el mayor número de eventos. El dashboard muestra un "Top N" (ej. Top 10).
*   **¿Para qué sirve?**
    *   Identificar las fuentes de red con mayor volumen de actividad.
    *   Detectar posibles IPs compartidas (ej. laboratorios de informática, bibliotecas, IPs institucionales generales) si muestran una cantidad desproporcionada de eventos.
    *   En algunos casos, podría ayudar a identificar actividad anómala o automatizada si una IP desconocida muestra una actividad excesiva (requiere más investigación).

#### 4.2.15. IP: Top IPs por N° Alumnos Únicos

*   **¿Qué muestra?** Un gráfico de barras (generalmente horizontal) que lista las Direcciones IP utilizadas por el mayor número de alumnos únicos diferentes. El dashboard muestra un "Top N".
*   **¿Para qué sirve?**
    *   Confirmar o identificar IPs que son puntos de acceso comunes para múltiples estudiantes (ej. Wi-Fi del campus, laboratorios).
    *   Si una IP residencial aparece con muchos usuarios únicos, podría ser una señal a investigar (aunque también podría ser una familia numerosa o un error en los datos de IP).
    *   Ayuda a entender la naturaleza de las IPs más activas: ¿son individuales o compartidas?

#### 4.2.16. IP: Top Alumnos por N° IPs Únicas

*   **¿Qué muestra?** Un gráfico de barras (generalmente horizontal) que lista los alumnos que han accedido a Moodle desde el mayor número de Direcciones IP únicas diferentes. El dashboard muestra un "Top N".
*   **¿Para qué sirve?**
    *   Identificar alumnos con alta movilidad geográfica o que utilizan múltiples dispositivos y redes (ej. PC de casa, portátil en la universidad, móvil con datos, VPN).
    *   En algunos contextos, un número extremadamente alto de IPs para un solo alumno en un corto periodo podría ser inusual, pero generalmente indica flexibilidad de acceso.
    *   No necesariamente indica algo negativo, pero sí un patrón de acceso diverso.

Recordar que la interpretación siempre debe hacerse en el contexto del curso, los alumnos y los objetivos pedagógicos. Los filtros son esenciales para refinar estas vistas y responder preguntas más específicas.
## 5. Preguntas y Respuestas Avanzadas: Deducciones a partir de los Datos

*(Esta sección se enfoca en cómo combinar filtros y gráficos para obtener insights más profundos que no son obvios a primera vista. La clave está en la formulación de preguntas específicas y el uso iterativo de los filtros y las distintas visualizaciones que ofrece la herramienta.)*

### 5.1. Sobre el Comportamiento de los Alumnos:

*   **¿Cómo identificar alumnos en riesgo de desconexión o bajo rendimiento?**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: Seleccionar un periodo reciente relevante (ej. últimas 2-3 semanas).
        *   `Alumno`: "Todos los Alumnos" inicialmente.
    *   **Gráficos a Observar:**
        *   `Actividad por Alumno`: Buscar alumnos en la parte inferior de la lista (bajos totales de eventos).
        *   `Eventos por Día`: Si se identifica un alumno con baja actividad general, filtrar por ese `Alumno` específico y observar este gráfico. ¿Hay actividad reciente o largos periodos de inactividad?
        *   `Scatter: Visualización vs Participación`: Buscar alumnos en el cuadrante inferior izquierdo (baja visualización Y baja participación).
    *   **Deducción:** Poca o nula actividad reciente, especialmente si se combina con baja interacción en componentes clave del curso (requeriría aplicar filtros adicionales de `Componente` o `Contexto`), puede ser una señal de alerta temprana. Estos alumnos podrían necesitar apoyo o un recordatorio.

*   **¿Qué alumnos muestran un patrón de "atracón" de estudio (cramming)?**
    *   **Filtros Clave:**
        *   `Componente` o `Contexto`: Seleccionar componentes evaluables importantes (ej. "Cuestionario Final", "Tarea: Proyecto Trimestral") o el contexto de un examen.
        *   `Rango de Fechas`: Un periodo que incluya los días previos y la fecha límite/examen.
    *   **Gráficos a Observar:**
        *   `Eventos por Día`: Filtrar por `Alumno` individual (para los más activos en el componente) y buscar picos de actividad muy pronunciados justo antes de la fecha límite.
        *   `Eventos por Hora del Día`: Para esos mismos alumnos y en esos días pico, ¿la actividad se concentra en horas intempestivas (ej. madrugada)?
    *   **Deducción:** Una alta concentración de eventos de un alumno en un componente evaluable justo antes de su vencimiento, especialmente si se combina con actividad en horarios inusuales, sugiere un patrón de estudio de última hora.

*   **¿Hay alumnos que solo consumen contenido pero no participan activamente ("lurkers")?**
    *   **Filtros Clave:**
        *   `Alumno`: "Todos los Alumnos".
        *   Asegurarse de que los patrones de "Visualización" y "Participación" estén bien definidos en el `Modal de Configuración`.
    *   **Gráficos a Observar:**
        *   `Scatter: Visualización vs Participación`: Buscar puntos (alumnos) situados significativamente hacia la derecha en el eje X (alta visualización) pero bajos en el eje Y (baja participación).
    *   **Deducción:** Estos alumnos están accediendo y viendo materiales, pero no contribuyen activamente en foros, entregas, etc. Podrían necesitar un estímulo para involucrarse más.

*   **¿Cómo puedo saber si un alumno específico está progresando en un módulo particular?**
    *   **Filtros Clave:**
        *   `Alumno`: Seleccionar el alumno de interés.
        *   `Contexto`: Seleccionar el módulo o tema específico.
        *   `Rango de Fechas`: Un periodo que cubra la duración esperada del trabajo en ese módulo.
    *   **Gráficos a Observar:**
        *   `Eventos por Día`: ¿Muestra una actividad sostenida o creciente a lo largo del periodo en ese contexto?
        *   `Actividad por Componente`: Dentro de ese contexto, ¿está interactuando con los componentes esperados (ej. viendo recursos, luego entregando tareas, participando en foros del módulo)?
        *   `Tabla de Logs Detallados`: Puede ofrecer una vista secuencial de sus acciones específicas.
    *   **Deducción:** Un incremento en la cantidad y variedad de interacciones relevantes dentro del módulo a lo largo del tiempo sugiere progreso. La falta de actividad o actividad solo en componentes superficiales podría indicar estancamiento.

*   **¿Desde cuántos lugares/dispositivos diferentes suele acceder un alumno?**
    *   **Filtros Clave:**
        *   `Alumno`: Seleccionar el alumno de interés.
        *   Asegurar que la columna `Dirección IP` esté presente en los datos.
    *   **Gráficos a Observar:**
        *   `Top Alumnos por N° IPs Únicas`: Localizar al alumno en este gráfico. El valor asociado es el número de IPs distintas desde las que ha accedido.
    *   **Deducción:** Un número alto de IPs (ej. >3-4) puede indicar que el alumno accede desde múltiples ubicaciones (casa, universidad, trabajo) o dispositivos (PC, portátil, móvil), o usa VPNs. No es inherentemente bueno o malo, pero describe su patrón de acceso.

*   **¿Qué alumnos muestran un comportamiento de "exploración inicial" pero luego abandonan un módulo o recurso?**
    *   **Filtros Clave:**
        *   `Contexto`: Seleccionar el módulo o recurso específico de interés.
        *   `Rango de Fechas`: Cubrir desde el momento en que el recurso estuvo disponible hasta un periodo posterior.
    *   **Gráficos a Observar:**
        *   `Eventos por Día`: Filtrar secuencialmente por diferentes `Alumnos` (o los que muestren baja actividad general en el contexto) y observar si hay picos de actividad iniciales que luego desaparecen por completo, mientras otros alumnos mantienen actividad.
        *   `Actividad por Alumno` (para el contexto específico): Ver quiénes tienen pocos eventos en total en ese contexto a pesar de un inicio.
    *   **Deducción:** Alumnos que muestran una ráfaga inicial de actividad en un recurso pero luego ninguna interacción más podrían haber encontrado el recurso no útil, demasiado difícil, o simplemente haber perdido el interés.

*   **¿Existen "líderes de opinión" o alumnos que inician muchas discusiones en los foros?**
    *   **Filtros Clave:**
        *   `Componente`: "Foro" (o el nombre exacto usado en Moodle).
        *   `Nombre Evento`: Filtrar por eventos que indiquen creación de contenido (ej. "debate creado", "mensaje de foro creado"). Esto puede requerir conocer los nombres exactos de los eventos en los logs de Moodle o usar los patrones de participación del `Modal de Configuración` de forma inteligente.
    *   **Gráficos a Observar:**
        *   `Actividad por Alumno` (con los filtros anteriores aplicados): Los alumnos en la parte superior de esta lista son los que más han realizado la acción de "crear" en los foros.
    *   **Deducción:** Identifica a los alumnos que proactivamente inician conversaciones, lo cual puede ser valioso para la dinámica del curso.

*   **¿Hay alumnos que acceden a los materiales justo en el último momento antes de una clase o sesión síncrona?**
    *   **Filtros Clave:**
        *   `Rango de Fechas` y `Hora`: Seleccionar el día de la clase y las horas inmediatamente anteriores (ej. si la clase es a las 10:00, filtrar de 08:00 a 09:59 de ese día). *Nota: el filtro de hora no es directo en la UI, pero se puede inferir de los gráficos horarios y la tabla de logs.*
        *   `Contexto`: Seleccionar los materiales o recursos que se espera que revisen antes de esa clase.
    *   **Gráficos a Observar:**
        *   `Eventos por Hora del Día` (con los filtros de fecha y contexto): Buscar un pico de actividad en esas horas previas.
        *   `Tabla de Logs Detallados`: Examinar las marcas de tiempo de los accesos a esos contextos.
    *   **Deducción:** Indica un patrón de preparación de última hora para las sesiones síncronas.

### 5.2. Sobre la Efectividad de los Contenidos y Actividades:

*   **¿Qué recursos son los más populares justo antes de un examen o entrega importante?**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: La semana o los días previos al evento evaluable.
        *   `Contexto`: El curso completo, o si el examen cubre temas específicos, esos contextos.
    *   **Gráficos a Observar:**
        *   `Actividad por Componente`: ¿Qué tipos de recursos (Archivos, Páginas, Enlaces URL, Cuestionarios de práctica) tienen más actividad?
        *   `Actividad por Contexto`: ¿Qué temas, actividades o archivos específicos son los más accedidos?
    *   **Deducción:** Los componentes y contextos con picos de actividad en este periodo son probablemente los que los alumnos perciben como más valiosos para su preparación.

*   **¿Hay algún foro que esté "muerto" o uno que sea excepcionalmente activo?**
    *   **Filtros Clave:**
        *   `Componente`: "Foro".
    *   **Gráficos a Observar:**
        *   `Actividad por Contexto`: Cada nombre de foro específico aparecerá como un contexto. Comparar el número de eventos entre ellos.
        *   `Eventos por Día`: Filtrar por el `Contexto` de un foro específico para ver si la actividad es constante, esporádica o inexistente.
    *   **Deducción:** Foros con muy pocos eventos o actividad concentrada solo al inicio y luego nula, están siendo infrautilizados. Aquellos con alta y constante actividad son exitosos.

*   **¿Los alumnos utilizan los materiales de "lectura" antes de intentar las "actividades" relacionadas?**
    *   **Filtros Clave:**
        *   `Alumno`: Puede ser un alumno específico o "Todos los Alumnos" (más complejo de analizar visualmente para todos).
        *   `Contexto`: Un módulo o sección que contenga tanto los materiales de lectura (ej. un PDF, una página Moodle) como la actividad (ej. un cuestionario, una tarea).
        *   `Rango de Fechas`: El periodo en que se espera que trabajen en ello.
    *   **Gráficos a Observar:**
        *   `Tabla de Logs Detallados`: Ordenar por `Hora`. Para un alumno, buscar si los eventos de visualización del material de lectura preceden a los eventos de interacción con la actividad.
        *   Si se pueden definir patrones claros para "leer" vs. "hacer actividad" en el `Modal de Configuración`, el gráfico `Scatter: Visualización vs Participación` podría dar una idea general si se filtra por el contexto del módulo.
    *   **Deducción:** Permite inferir si los alumnos siguen la secuencia instruccional diseñada o si saltan directamente a las actividades.

*   **¿Qué tipo de eventos son más comunes en el componente "Tarea"? ¿Más visualizaciones o más entregas?**
    *   **Filtros Clave:**
        *   `Componente`: "Tarea" (o el nombre exacto, ej. "assign").
    *   **Gráficos a Observar:**
        *   `Desglose Eventos en Componentes Principales`: Si "Tarea" está entre los componentes principales, este gráfico mostrará los eventos más comunes dentro de él (ej. "Vista de la tarea", "Una entrega ha sido realizada", "El estado de la entrega ha sido visto").
        *   Si no, filtrar por `Nombre Evento` para cada tipo de evento relevante de Tarea y comparar el `Total Eventos` en las Estadísticas Generales.
    *   **Deducción:** Una alta proporción de visualizaciones frente a entregas podría indicar que los alumnos revisan mucho las instrucciones, o que muchos la ven pero pocos la completan (si el número de entregas es bajo en relación con los alumnos).

*   **¿Qué tan rápido los alumnos completan una actividad después de que se publica o se abre?**
    *   **Filtros Clave:**
        *   `Contexto`: La actividad específica (ej. "Cuestionario Semana 3").
        *   `Rango de Fechas`: Desde la fecha/hora de apertura de la actividad en adelante.
        *   `Nombre Evento`: Eventos que indiquen finalización o entrega (ej. "Intento de cuestionario enviado", "Una entrega ha sido realizada").
    *   **Gráficos a Observar:**
        *   `Eventos por Día` (y observar las primeras horas/días del gráfico): ¿Hay un pico grande de entregas justo después de la apertura? ¿O se distribuyen más gradualmente?
    *   **Deducción:** Una ráfaga de finalizaciones tempranas puede indicar que la actividad es percibida como fácil o que los alumnos están muy comprometidos. Una dispersión mayor puede indicar mayor dificultad, necesidad de más tiempo, o procastinación.

*   **¿Hay recursos o actividades que son consistentemente ignorados por la mayoría de los alumnos a lo largo del curso?**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: Un periodo largo, idealmente todo el curso o un bloque temático completo.
    *   **Gráficos a Observar:**
        *   `Actividad por Componente`: Buscar componentes con recuentos de eventos muy bajos.
        *   `Actividad por Contexto`: Buscar contextos (recursos o actividades específicas) con recuentos de eventos muy bajos o nulos. Es importante comparar con el número total de alumnos para ver si es una minoría o la mayoría quien los ignora.
    *   **Deducción:** Recursos con interacción persistentemente baja pueden necesitar revisión: ¿son necesarios? ¿están bien publicitados/enlazados? ¿son demasiado difíciles o irrelevantes?

*   **¿Los cambios en el diseño de un módulo (si se conocen las fechas de los cambios) impactaron la interacción de los alumnos?**
    *   **Filtros Clave:**
        *   `Contexto`: El módulo o sección que fue modificado.
        *   `Rango de Fechas`: Seleccionar dos periodos comparables, uno antes del cambio y otro después del cambio.
    *   **Gráficos a Observar (analizar para cada periodo y comparar):**
        *   `Eventos por Día` (dentro del contexto): ¿Cambió el nivel general de actividad?
        *   `Actividad por Componente` (dentro del contexto): ¿Cambió el uso de los componentes dentro de ese módulo?
        *   `Total Eventos` y `Usuarios Únicos` (en Estadísticas Generales, para ese contexto): ¿Hubo más o menos interacción y participación?
    *   **Deducción:** Permite evaluar el impacto de intervenciones en el diseño del curso.

*   **¿Existe una correlación entre la visualización de un recurso de ayuda/FAQ y la interacción con una actividad compleja?**
    *   **Filtros Clave:** Se requiere un análisis en dos etapas o una inspección detallada de logs.
        *   **Etapa 1 (Identificar usuarios de la actividad):** Filtrar por `Contexto` (la actividad compleja) y `Rango de Fechas` relevante. Observar `Actividad por Alumno` para ver quiénes interactuaron.
        *   **Etapa 2 (Analizar su uso de la ayuda):** Mantener el filtro de `Rango de Fechas`. Cambiar el `Contexto` al recurso de ayuda/FAQ. Filtrar por `Alumno` (seleccionando los identificados en Etapa 1, o un subconjunto). Ver `Actividad por Alumno` en el recurso de ayuda.
        *   Alternativamente, para un `Alumno` específico, filtrar por él y el `Rango de Fechas`, luego examinar la `Tabla de Logs Detallados` buscando la secuencia de acceso al recurso de ayuda y a la actividad compleja.
    *   **Deducción:** ¿Los alumnos que utilizan el recurso de ayuda muestran patrones diferentes en la actividad compleja (ej. menos intentos fallidos, si los logs lo muestran, o finalización más rápida)? ¿Acceden a la ayuda antes o después de interactuar con la actividad?

### 5.3. Sobre Patrones Temporales y de Acceso:

*   **¿Existe un "prime time" para la actividad en el curso?**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: Un periodo representativo (ej. varias semanas, un mes).
    *   **Gráficos a Observar:**
        *   `Eventos por Hora del Día`: Las barras más altas indican las horas con mayor concentración de eventos.
        *   `Eventos por Día de Semana`: Las barras más altas indican los días preferidos.
    *   **Deducción:** Ayuda a entender cuándo los alumnos están más activos, lo que puede informar la programación de anuncios, tutorías o mantenimiento.

*   **¿La actividad decae significativamente los fines de semana o en ciertos días?**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: Similar al anterior.
    *   **Gráficos a Observar:**
        *   `Eventos por Día de Semana`: Comparar la altura de las barras. ¿Hay valles pronunciados los sábados y domingos, o en algún día particular?
    *   **Deducción:** Revela si el curso se trabaja principalmente entre semana o si hay actividad distribuida.

*   **¿Cómo se distribuye la carga de trabajo de los alumnos a lo largo de una semana típica?**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: Varias semanas que se consideren "normales" (sin periodos de exámenes o vacaciones que alteren el patrón).
    *   **Gráficos a Observar:**
        *   `Eventos por Día de Semana`: Similar al anterior, pero con el enfoque en un periodo "estándar" para ver si emerge un patrón semanal recurrente.
    *   **Deducción:** ¿Hay días consistentemente más cargados? ¿Se observa un "efecto lunes" o un "apresuramiento de viernes"?

*   **¿Hay actividad sospechosa desde IPs desconocidas o en horarios inusuales?**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: Periodo de interés.
        *   `Dirección IP`: Si se conocen IPs institucionales, se pueden seleccionar IPs que NO estén en esa lista (requiere seleccionar múltiples IPs o analizar la lista completa de "Top IPs").
    *   **Gráficos a Observar:**
        *   `Top IPs por N° Eventos`: Buscar IPs desconocidas con una cantidad desproporcionada de eventos.
        *   `Eventos por Hora del Día`: Filtrar por una `Dirección IP` específica sospechosa. ¿La actividad se concentra en horarios muy extraños (ej. consistentemente a las 3 AM) para la mayoría de los alumnos?
        *   `Tabla de Logs Detallados`: Inspeccionar los eventos de esas IPs sospechosas. ¿Qué están haciendo? ¿Los nombres de usuario asociados son válidos?
    *   **Deducción:** Podría indicar accesos no autorizados, bots (aunque Moodle suele tener eventos específicos para ello), o simplemente alumnos con horarios atípicos. Requiere cautela en la interpretación.

*   **¿Hay "oleadas" de actividad que coincidan con anuncios del profesor o recordatorios?**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: Días inmediatamente posteriores a un anuncio o recordatorio importante.
    *   **Gráficos a Observar:**
        *   `Eventos por Día`: ¿Se observa un pico en el día del anuncio o el día siguiente?
        *   `Eventos por Hora del Día` (para el día del anuncio/siguiente): ¿Hay un aumento de actividad poco después de la hora habitual de envío de comunicaciones?
    *   **Deducción:** Puede ayudar a medir la efectividad de las comunicaciones para movilizar a los alumnos.

*   **¿Cómo varía la actividad en el mismo día de la semana a lo largo de diferentes semanas? (Ej. ¿Todos los lunes son igual de activos?)**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: Un periodo que abarque varias semanas (ej. un mes).
    *   **Gráficos a Observar:**
        *   `Eventos por Día`: Visualmente inspeccionar los niveles de actividad para el mismo día de la semana en semanas sucesivas (ej. comparar el pico del primer lunes con el del segundo, tercero, etc.).
    *   **Deducción:** ¿Existe una rutina semanal consistente en términos de volumen de actividad, o varía mucho de una semana a otra? Esto puede estar influenciado por el calendario de entregas y actividades del curso.

### 5.4. Sobre el Uso de Direcciones IP:

*   **¿Qué alumnos comparten IPs frecuentemente? (Posibles casos de colaboración indebida o uso de equipos comunes)**
    *   **Filtros Clave:**
        *   `Rango de Fechas`: Periodo de interés, especialmente alrededor de evaluaciones.
    *   **Gráficos a Observar:**
        *   `Top IPs por N° Alumnos Únicos`: Identificar IPs usadas por un número significativo de alumnos.
        *   Para una IP compartida identificada, filtrar el análisis global por esa `Dirección IP` específica. Luego, observar `Actividad por Alumno` para ver qué alumnos la usan y con qué intensidad.
        *   `Tabla de Logs Detallados` (filtrada por esa IP): Ordenar por `Hora`. Examinar si múltiples alumnos realizan acciones (especialmente en tareas evaluables) desde esa IP en momentos muy cercanos o solapados.
    *   **Deducción:** IPs compartidas son comunes en laboratorios o bibliotecas. Sin embargo, si la actividad de múltiples alumnos en tareas individuales desde la misma IP es muy concurrente, podría justificar una investigación más profunda, siempre con cautela y considerando el contexto.

*   **¿Un alumno accede consistentemente desde una IP institucional y de repente cambia a una residencial desconocida (o viceversa)?**
    *   **Filtros Clave:**
        *   `Alumno`: El alumno específico.
        *   `Rango de Fechas`: Un periodo amplio para observar patrones.
    *   **Gráficos a Observar:**
        *   `Tabla de Logs Detallados`: Filtrar por el alumno y ordenar por `Hora`. Observar la columna `Dirección IP` a lo largo del tiempo. ¿Hay cambios abruptos y sostenidos en el tipo de IP utilizada?
    *   **Deducción:** Puede indicar un cambio en el lugar habitual de estudio del alumno (ej. empezó a ir al campus, o dejó de ir), uso de VPNs, o simplemente acceso desde una nueva ubicación.

*   **¿Se puede inferir si la mayoría de los accesos son desde dentro o fuera del campus (si se conocen los rangos de IP del campus)?**
    *   **Filtros Clave:**
        *   `Dirección IP`: Seleccionar múltiples IPs que correspondan a los rangos conocidos del campus. O, si la lista es muy larga, podría ser más fácil analizar primero "Todas las IPs" y luego intentar identificar y *deseleccionar* las IPs del campus para ver la actividad externa (esto es menos directo con un `select multiple` si hay muchas IPs).
    *   **Gráficos a Observar:**
        *   `Total Eventos` y `Usuarios Únicos` (en Estadísticas Generales): Comparar estos valores cuando se filtra por IPs del campus vs. cuando se intenta aislar IPs externas.
        *   `Eventos por Día`: Observar cómo cambia el patrón general de actividad.
    *   **Deducción:** Permite estimar la proporción de actividad que se origina desde la red institucional frente a accesos remotos.

*   **¿Hay IPs específicas desde las que solo se realizan acciones de "visualización" y muy poca "participación"? (Posibles IPs de solo monitoreo o bots benignos si no son alumnos)**
    *   **Filtros Clave:**
        *   `Dirección IP`: Seleccionar la IP de interés (previamente identificada quizás por ser desconocida pero con actividad).
        *   Asegurar que los patrones de "Visualización" y "Participación" estén bien definidos.
    *   **Gráficos a Observar:**
        *   `Scatter: Visualización vs Participación`: Si se filtra por los alumnos que usan esa IP, ¿dónde se sitúan?
        *   `Desglose Eventos en Componentes Principales` o `Actividad por Nombre Evento` (con la IP específica filtrada globalmente): Ver la proporción de eventos de visualización frente a otros tipos.
    *   **Deducción:** Un perfil de actividad extremadamente pasivo desde una IP particular (especialmente si no corresponde a un alumno conocido o si el "nombre de usuario" es genérico) podría indicar un acceso de solo lectura o un bot simple.

*   **Si se sospecha de una cuenta compartida, ¿la actividad de los "diferentes usuarios" desde esa IP se solapa en el tiempo o es secuencial?**
    *   **Filtros Clave:**
        *   `Dirección IP`: La IP compartida bajo sospecha.
    *   **Gráficos a Observar:**
        *   `Tabla de Logs Detallados`: Ordenar por `Hora`. Observar si diferentes `Nombre completo del usuario` realizan acciones, especialmente en actividades individuales (como un cuestionario), en momentos muy cercanos o idénticos.
        *   `Eventos por Hora del Día`: Aunque menos granular, puede mostrar si la actividad desde esa IP es continua con diferentes usuarios o si hay bloques de tiempo distintos para cada uno.
    *   **Deducción:** El solapamiento temporal de actividad individual de diferentes cuentas desde la misma IP es una fuerte señal de alerta para investigar el uso de cuentas. La actividad secuencial es menos concluyente por sí misma.

*   **¿La actividad desde IPs móviles (si se pudieran identificar por rangos o ISP) muestra patrones diferentes a las IPs fijas (ej. más consultas rápidas vs. trabajo extenso)?**
    *   **Filtros Clave:** *Esto es un análisis avanzado que depende de la capacidad de clasificar IPs como móviles o fijas, lo cual no es una función directa de la herramienta pero podría hacerse si se tiene información externa sobre los rangos de IPs.*
        *   Asumiendo que se pueden seleccionar grupos de IPs: `Dirección IP` (seleccionar IPs móviles) y luego `Dirección IP` (seleccionar IPs fijas).
    *   **Gráficos a Observar (comparar entre los dos grupos de IPs):**
        *   `Eventos por Hora del Día`: ¿Los patrones de acceso difieren?
        *   `Promedio Eventos/Día` y `Duración promedio de sesión` (este último no es directo, pero se puede inferir si los eventos están muy agrupados o dispersos en la `Tabla de Logs` para usuarios individuales).
        *   `Actividad por Componente`: ¿Se accede a diferentes tipos de componentes (ej. foros desde el móvil, tareas más largas desde IPs fijas)?
    *   **Deducción:** Podría revelar si el tipo de conexión/dispositivo influye en el comportamiento de los alumnos, como realizar tareas más cortas o de consulta desde móviles y trabajo más profundo desde conexiones fijas.

### 5.5. Combinando Filtros para Descubrimientos Específicos:

*   **Ejemplo 1: "¿Cuál fue la actividad de los alumnos del 'Grupo A' en el 'Foro de Dudas del Tema 3' durante la última semana, y desde qué IPs accedieron principalmente?"**
    *   **Filtros Clave:**
        *   `Alumno`: Seleccionar los alumnos pertenecientes al 'Grupo A'. (Si los nombres no permiten una selección directa, se podrían excluir a todos los demás si son identificables).
        *   `Contexto`: "Foro de Dudas del Tema 3" (o el nombre exacto).
        *   `Rango de Fechas`: "Última semana".
    *   **Gráficos a Observar:**
        *   `Actividad por Alumno`: Mostrará la actividad específica de los alumnos del Grupo A en ese foro y periodo.
        *   `Top IPs por N° Eventos` y `Top IPs por N° Alumnos Únicos`: Mostrarán las IPs más usadas por este grupo para acceder a ese foro.
        *   `Tabla de Logs Detallados`: Ofrecerá el detalle de cada interacción.
    *   **Deducción:** Se obtiene un perfil muy granular de la interacción de un subconjunto específico de alumnos con un recurso particular, incluyendo desde dónde acceden.

*   **Ejemplo 2: "Comparar la actividad en el componente 'Cuestionario' entre los alumnos que acceden principalmente por la mañana vs. por la tarde."**
    *   **Análisis en Múltiples Pasos (la herramienta actual no permite crear grupos dinámicos basados en hora de acceso para comparación directa en un solo gráfico):**
        *   **Paso 1 (Identificar patrones horarios generales):**
            *   `Filtros`: `Componente` ("Cuestionario"), `Rango de Fechas` (periodo de interés).
            *   `Gráfico`: `Eventos por Hora del Día`. Identificar visualmente los picos matutinos y vespertinos.
        *   **Paso 2 (Listar alumnos del grupo matutino):**
            *   Mantener filtros anteriores. Examinar `Tabla de Logs Detallados`, filtrando mentalmente o exportando los logs de las horas matutinas identificadas. Anotar los `Nombre completo del usuario` activos en ese periodo en el cuestionario.
        *   **Paso 3 (Listar alumnos del grupo vespertino):**
            *   Similar al Paso 2, pero para las horas vespertinas.
        *   **Paso 4 (Analizar cada grupo por separado):**
            *   Para el grupo de alumnos "matutinos" (seleccionándolos en el filtro `Alumno`): Analizar su `Total Eventos` en el cuestionario, quizás su `Actividad por Nombre Evento` dentro del cuestionario (ej. "intento iniciado", "intento enviado").
            *   Repetir para el grupo de alumnos "vespertinos".
    *   **Deducción:** Al comparar las métricas (ej. número de intentos, tipos de eventos) entre los dos grupos, se podría inferir si el momento del día afecta el tipo o volumen de interacción con los cuestionarios. Este es un ejemplo de cómo la herramienta puede proporcionar los datos brutos para análisis más dirigidos, aunque la comparación directa requiera pasos manuales.

*   **Ejemplo 3: "¿Qué porcentaje de alumnos que visualizaron el 'Video Tutorial X' completaron la 'Tarea Y' asociada, en comparación con los que no lo visualizaron?"**
    *   **Análisis de Cohorte (requiere varios pasos y posible trabajo manual con listas de alumnos):**
        *   **Paso 1 (Identificar quiénes vieron el video):**
            *   `Filtros`: `Contexto` ("Video Tutorial X" o su nombre exacto), `Nombre Evento` (un evento que indique visualización, ej. "recurso visto", "módulo de curso visto"). `Rango de Fechas` apropiado.
            *   `Gráfico/Dato`: `Actividad por Alumno`. Anotar la lista de alumnos que aparecen (los que vieron el video). Contar cuántos son (N_vio_video).
        *   **Paso 2 (Identificar quiénes completaron la tarea de ese grupo):**
            *   `Filtros`: `Contexto` ("Tarea Y"), `Nombre Evento` (evento de entrega, ej. "tarea enviada"). `Alumno` (seleccionar la lista de alumnos del Paso 1). `Rango de Fechas` apropiado.
            *   `Gráfico/Dato`: `Actividad por Alumno`. Contar cuántos de este grupo completaron la tarea (N_vio_video_y_completo).
            *   *Cálculo 1:* (N_vio_video_y_completo / N_vio_video) * 100 = % de completitud para los que vieron el video.
        *   **Paso 3 (Identificar quiénes NO vieron el video y completaron la tarea):**
            *   Obtener la lista total de alumnos del curso (N_total_alumnos).
            *   Alumnos que NO vieron el video: (N_total_alumnos - N_vio_video) = N_no_vio_video.
            *   `Filtros`: `Contexto` ("Tarea Y"), `Nombre Evento` (evento de entrega). `Alumno` (seleccionar todos los alumnos EXCEPTO los de la lista del Paso 1). `Rango de Fechas` apropiado.
            *   `Gráfico/Dato`: `Actividad por Alumno`. Contar cuántos de este grupo completaron la tarea (N_no_vio_video_y_completo).
            *   *Cálculo 2:* (N_no_vio_video_y_completo / N_no_vio_video) * 100 = % de completitud para los que NO vieron el video.
    *   **Deducción:** Comparar el Cálculo 1 y el Cálculo 2. Una diferencia significativa podría sugerir el impacto (o la falta de él) del video tutorial en la finalización de la tarea.

*   **Ejemplo 4: "Identificar si hay correlación entre el número de veces que un alumno revisa sus calificaciones y su actividad general en el curso."**
    *   **Análisis en dos etapas:**
        *   **Paso 1 (Identificar frecuencia de revisión de calificaciones):**
            *   `Filtros`: `Nombre Evento` (eventos como "calificaciones vistas", "informe de usuario visto", "vista de libro de calificaciones"). `Rango de Fechas` (ej. todo el semestre).
            *   `Gráfico`: `Actividad por Alumno`. Esto mostrará cuántas veces cada alumno realizó esos eventos. Se pueden identificar los "altos revisores" y los "bajos revisores".
        *   **Paso 2 (Analizar actividad general de esos grupos):**
            *   **Grupo "Altos Revisores":** Quitar el filtro de `Nombre Evento`. Filtrar por `Alumno` (seleccionando los identificados como altos revisores). Observar sus métricas en `Estadísticas Generales` (ej. Total Eventos, Promedio Eventos/Día) y sus perfiles en gráficos como `Actividad por Alumno` (general), `Scatter: Visualización vs Participación`.
            *   **Grupo "Bajos Revisores":** Repetir el proceso para los alumnos identificados como bajos revisores.
    *   **Deducción:** Al comparar la actividad general de los dos grupos, se puede observar si existe una tendencia. Por ejemplo, ¿los alumnos que revisan frecuentemente sus calificaciones también tienden a ser más activos en general, o viceversa? Esto podría estar relacionado con la motivación, la auto-regulación o la ansiedad.
## 6. Consejos y Buenas Prácticas

Para aprovechar al máximo el Visor de Actividad Moodle y obtener insights significativos, considera las siguientes recomendaciones:

### 6.1. Empezar con Vistas Generales y Luego Profundizar

*   **Visión Panorámica Inicial:** Antes de aplicar filtros muy específicos, carga tus datos y observa el dashboard con la configuración predeterminada (o un rango de fechas amplio como todo el curso). Esto te dará una idea general de la actividad:
    *   ¿Cuáles son los picos de actividad más obvios?
    *   ¿Qué alumnos o componentes destacan inicialmente?
    *   ¿Cómo se ven las estadísticas generales?
*   **De lo General a lo Específico:** Una vez que tengas esta visión global, comienza a formular preguntas más concretas. Utiliza esta primera impresión para guiar tus siguientes pasos de filtrado. Por ejemplo, si ves un componente con muy poca actividad general, podrías querer filtrar por ese componente para entender mejor qué sucede (o no sucede) allí.

### 6.2. Utilizar Filtros de Forma Iterativa

El verdadero poder de la herramienta reside en la combinación y aplicación secuencial de filtros.

*   **No tengas miedo de experimentar:** Prueba diferentes combinaciones de filtros. ¿Qué pasa si filtras por un alumno específico y luego por un componente? ¿Y si cambias el rango de fechas?
*   **Un filtro a la vez (al principio):** Para entender el impacto de cada filtro, puede ser útil cambiar uno solo y observar cómo se modifican los gráficos y estadísticas. Una vez que te familiarices, podrás aplicar múltiples filtros simultáneamente con más confianza.
*   **Anota tus hallazgos:** Si encuentras un patrón interesante después de aplicar una serie de filtros, anótalo. Es fácil perderse en la exploración de datos. Documentar tus preguntas, los filtros usados y los resultados observados te ayudará a construir un análisis más coherente.
*   **Reinicia filtros si es necesario:** Si llegas a un punto donde los datos son muy escasos o la vista no es clara, no dudes en quitar algunos filtros o resetearlos para volver a una vista más amplia.

### 6.3. Prestar Atención a la Configuración de Exclusiones y Patrones

Estas configuraciones (accesibles desde el icono de engranaje) pueden tener un impacto significativo en los resultados.

*   **Excluir Usuarios No Relevantes:** Asegúrate de excluir a los usuarios que no son parte del grupo de estudio principal (ej. administradores, profesores con rol de prueba, usuarios de demostración). Sus actividades pueden distorsionar las métricas de los alumnos reales. Actualiza esta lista si es necesario.
*   **Definir Patrones de Visualización/Participación con Cuidado:** La efectividad del gráfico "Scatter: Visualización vs Participación" y cualquier otro análisis que dependa de esta categorización depende críticamente de cuán bien definas estas subcadenas.
    *   Revisa los nombres de eventos comunes en tus logs de Moodle.
    *   Ajusta los patrones para que reflejen con precisión lo que consideras "ver contenido" vs. "participar activamente" en tu contexto.
    *   Recuerda que la herramienta buscará estas subcadenas de forma insensible a mayúsculas/minúsculas y que un evento se considera de "participación" si coincide con un patrón de participación Y NO con uno de visualización.
*   **Guardar y Reanalizar:** Después de cambiar estas configuraciones, siempre guarda y permite que la herramienta reanalice los datos para que los cambios surtan efecto.

### 6.4. Correlacionar con Otras Fuentes de Información (Calificaciones, Encuestas)

El Visor de Actividad Moodle proporciona datos sobre la *interacción* y el *comportamiento*. Para una comprensión más completa, es muy valioso cruzar estos hallazgos con otras fuentes de datos:

*   **Calificaciones:** ¿Los alumnos identificados como "muy activos" también obtienen buenas calificaciones? ¿Hay una correlación entre la baja actividad y el bajo rendimiento? (La herramienta no muestra calificaciones, pero puedes comparar sus listas de alumnos).
*   **Encuestas de Satisfacción o Feedback:** Si has realizado encuestas a los alumnos sobre su experiencia en el curso, ¿sus respuestas se alinean con los patrones de uso de recursos que observas en el visor? Por ejemplo, si los alumnos reportan que un recurso es confuso, ¿ves baja actividad en ese recurso?
*   **Observaciones Directas (si aplica):** En entornos de aprendizaje mixto, la información del visor puede complementar tus observaciones en clase.
*   **Contexto del Curso:** Siempre interpreta los datos teniendo en cuenta el diseño pedagógico del curso, el calendario de actividades, y cualquier evento externo que pudiera haber afectado la actividad de los alumnos.

### 6.5. Ser Consciente de la Privacidad de los Datos y la Ética

Al analizar datos de actividad de los alumnos, es fundamental actuar con responsabilidad y ética:

*   **Anonimización y Agregación cuando sea Posible:** Para informes generales o al compartir hallazgos, considera si es necesario mostrar nombres individuales o si los datos agregados son suficientes. La herramienta muestra nombres, por lo que su uso debe ser consciente.
*   **Propósito del Análisis:** Utiliza la información para mejorar la enseñanza y el aprendizaje, no para penalizar o estigmatizar a los alumnos basándose únicamente en su actividad en la plataforma.
*   **Transparencia (Opcional, según política institucional):** En algunos contextos, puede ser apropiado informar a los alumnos que su actividad en la plataforma se utiliza para mejorar el curso.
*   **Seguridad de los Datos:** Aunque el procesamiento se realiza en el navegador del cliente, el archivo CSV original contiene datos sensibles. Asegúrate de manejarlo y almacenarlo de forma segura.
*   **Interpretación Cautelosa:** Recuerda que los logs muestran *qué* hicieron los usuarios, pero no siempre el *por qué*. Evita sacar conclusiones precipitadas sin considerar múltiples factores o sin buscar información adicional si un patrón parece preocupante.

Siguiendo estos consejos, podrás utilizar el Visor de Actividad Moodle de manera más efectiva, ética y productiva para entender y mejorar la experiencia de aprendizaje en Moodle.

## 7. Limitaciones y Consideraciones Futuras

Si bien el Visor de Actividad Moodle es una herramienta poderosa para explorar los logs de la plataforma, es importante ser consciente de sus limitaciones actuales y considerar posibles mejoras para el futuro.

### 7.1. Dependencia de la Calidad y Completitud del CSV de Moodle

La utilidad y precisión de los análisis generados por el visor están intrínsecamente ligadas a la calidad de los datos de entrada.

*   **Calidad del Log de Moodle:**
    *   **Configuración de Moodle:** Si Moodle no está configurado para registrar ciertos eventos o detalles (como la Dirección IP), el visor no podrá mostrarlos ni analizarlos.
    *   **Exportación Incompleta:** Si el proceso de exportación del CSV desde Moodle es interrumpido, se seleccionan rangos de fechas incorrectos, o no se incluyen todas las columnas necesarias (especialmente las mencionadas en la sección 2.1.1), los análisis serán parciales o incorrectos.
    *   **Consistencia de Nombres:** Inconsistencias en los nombres de cursos, actividades, componentes o usuarios dentro de Moodle (ej. cambios de nombre a mitad de curso) pueden llevar a que la herramienta los trate como entidades separadas, fragmentando el análisis.
*   **Volumen de Datos:**
    *   **Rendimiento del Navegador:** Aunque la herramienta está diseñada para ser eficiente, archivos CSV extremadamente grandes (cientos de megabytes o millones de filas) pueden llevar a tiempos de procesamiento prolongados y, en casos extremos, a que el navegador se vuelva lento o deje de responder, ya que todo el procesamiento se realiza en el lado del cliente (en el navegador).
    *   **Límites de Memoria:** El navegador tiene límites en la cantidad de memoria que puede usar una pestaña, lo que podría afectar la capacidad de manejar archivos masivos.
*   **Interpretación de Eventos de Moodle:**
    *   **Ambigüedad de Eventos:** Algunos eventos de Moodle pueden ser ambiguos o no tener un significado claro e unívoco sin un conocimiento profundo del funcionamiento interno de Moodle o del diseño específico del curso. El visor los presenta tal como están en el log.

### 7.2. Interpretación vs. Causalidad (La herramienta muestra correlaciones, no necesariamente causas)

Este es un punto crucial en cualquier análisis de datos.

*   **Correlación no implica Causalidad:** El visor puede mostrar que dos variables están correlacionadas (ej. alumnos con alta actividad en foros también tienen buenas calificaciones). Sin embargo, esto no significa necesariamente que una cause la otra. Podría haber un tercer factor influyendo en ambas (ej. alta motivación del alumno).
*   **Hipótesis, no Conclusiones Definitivas:** Los patrones observados deben ser tratados como hipótesis que pueden requerir más investigación o validación a través de otros medios (cualitativos, experimentales, etc.). La herramienta es excelente para generar estas hipótesis.
*   **El "Porqué" queda fuera del Alcance:** Los logs registran *qué* acciones se realizaron, *cuándo* y por *quién*, pero raramente explican el *porqué* detrás de esas acciones. Las motivaciones, intenciones o dificultades de los alumnos no se capturan directamente en los logs.

### 7.3. Posibles Mejoras Futuras

El Visor de Actividad Moodle es una herramienta en evolución, y existen varias áreas donde podría expandirse y mejorarse en futuras versiones:

*   **Filtros Más Avanzados:**
    *   **Filtros por Grupo de Usuarios:** Permitir seleccionar o definir grupos de usuarios (ej. "Grupo A", "Grupo B") para comparar su actividad directamente.
    *   **Filtros por Rango Horario Específico:** Además de la fecha, poder filtrar por un rango de horas específico dentro de un día.
    *   **Filtros Negados:** Opción de "excluir" ciertos elementos de los filtros (ej. "todos los componentes EXCEPTO Sistema").
    *   **Filtros Combinados con Lógica (AND/OR):** Para consultas más complejas.
*   **Comparativas Directas:**
    *   **Comparación de Grupos en Gráficos:** Funcionalidad para seleccionar dos conjuntos de filtros (o grupos de alumnos) y ver sus datos representados lado a lado o superpuestos en los mismos gráficos.
    *   **Análisis de Cohortes Simplificado:** Herramientas que faciliten seguir a un grupo de alumnos a través de diferentes etapas o actividades.
*   **Nuevas Visualizaciones y Métricas:**
    *   **Análisis de Secuencias de Eventos:** Visualizaciones que muestren las rutas más comunes que siguen los alumnos a través del curso.
    *   **Mapas de Calor de Actividad:** Por ejemplo, un calendario con colores que indiquen la intensidad de la actividad en cada día/hora.
    *   **Métricas de Red Social (SNA):** Si los datos lo permiten (ej. interacciones en foros), calcular métricas básicas de centralidad o influencia.
    *   **Predicción (Muy Avanzado):** Modelos básicos para intentar predecir alumnos en riesgo basados en patrones de actividad temprana (esto requeriría mucho más desarrollo y datos de resultados).
*   **Mejoras de Usabilidad y Rendimiento:**
    *   **Procesamiento en Web Workers:** Para archivos muy grandes, mover parte del procesamiento a hilos secundarios para no bloquear la interfaz principal.
    *   **Paginación o Carga Diferida para la Tabla de Logs:** Mejorar el rendimiento al mostrar tablas con miles de filas.
    *   **Exportación de Gráficos y Datos Filtrados:** Opción para descargar los gráficos como imágenes o los datos filtrados como un nuevo CSV.
    *   **Personalización de Dashboard:** Permitir al usuario elegir qué gráficos mostrar en el dashboard principal.
*   **Integración (Avanzado):**
    *   Posibilidad de conectar directamente con una instancia de Moodle vía API para obtener logs (requeriría consideraciones de seguridad y autenticación significativas).
*   **Soporte Multi-idioma para la Interfaz:** Para facilitar su uso en diferentes contextos.

Estas son solo algunas ideas, y la dirección del desarrollo futuro dependerá de las necesidades y el feedback de los usuarios. La herramienta actual sienta una base sólida para análisis exploratorios valiosos.

## 8. Apéndice: Definición de Términos Clave

Para una comprensión clara de los datos y los análisis presentados por el Visor de Actividad Moodle, es útil familiarizarse con algunos términos clave que provienen de la propia plataforma Moodle y que son fundamentales en la interpretación de los logs.

*   **Log (Registro):**
    *   Una entrada individual en el archivo de actividad de Moodle. Cada log representa una acción específica realizada por un usuario o por el sistema en un momento determinado. El Visor de Actividad Moodle procesa colecciones de estos logs.

*   **Evento (Nombre evento):**
    *   **Definición:** Es la descripción textual de la acción específica que se registró. Indica *qué* sucedió.
    *   **Ejemplos Comunes:** "Vista de curso", "Usuario calificó la tarea", "Mensaje de foro creado", "Intento de cuestionario iniciado", "Recurso visto", "Módulo de curso visto".
    *   **En el Visor:** Se utiliza para filtrar por tipos de acciones específicas, para el gráfico de "Evento Más Frecuente", y es crucial para definir los patrones de "Visualización" y "Participación".

*   **Componente:**
    *   **Definición:** Se refiere al módulo, herramienta o subsistema de Moodle que está involucrado en el evento. Indica *dónde* (en términos de tipo de herramienta) ocurrió la acción.
    *   **Ejemplos Comunes:** "Sistema" (acciones generales de la plataforma), "Foro", "Tarea", "Cuestionario", "Archivo", "Página", "URL", "Libro", "Glosario", "Lección", "Wiki", "Taller", "Base de datos".
    *   **En el Visor:** Se utiliza para filtrar la actividad por tipo de herramienta, en los gráficos de "Actividad por Componente", "Desglose Eventos en Componentes", y en el análisis de burbujas de componentes.

*   **Contexto del evento (Contexto):**
    *   **Definición:** Especifica la instancia particular o el lugar exacto dentro de Moodle donde el evento tuvo lugar. Puede ser un curso, una sección dentro de un curso, una actividad específica, un recurso particular, o incluso un bloque. Proporciona el "lugar" más específico de la acción.
    *   **Ejemplos Comunes:** "Curso: Introducción a la Programación", "Tarea: Ensayo sobre la Célula (Entrega)", "Foro: Dudas Tema 3", "Cuestionario: Autoevaluación Capítulo 1", "Archivo: Guía de Prácticas PDF".
    *   **En el Visor:** Se utiliza para filtrar la actividad por secciones o ítems concretos del curso, y es la base del gráfico "Actividad por Contexto" y el análisis de burbujas de contextos.

*   **Nombre completo del usuario:**
    *   **Definición:** El identificador principal del usuario (generalmente nombre y apellidos) que realizó la acción registrada en el log.
    *   **En el Visor:** Esencial para el filtro de "Alumno", los gráficos de actividad por alumno, y para identificar al "Usuario Más Activo". Las exclusiones de usuarios se basan en este campo.

*   **Usuario afectado:**
    *   **Definición:** El usuario sobre el cual recae la acción del evento, si es diferente del usuario que la origina. No todos los eventos tienen un usuario afectado.
    *   **Ejemplos:** Si un profesor califica la tarea de un alumno, el profesor es el "Nombre completo del usuario" y el alumno es el "Usuario afectado".
    *   **En el Visor:** Se muestra en la tabla de logs detallados; actualmente no se utiliza de forma activa en los gráficos principales.

*   **Hora:**
    *   **Definición:** La marca de tiempo (fecha y hora) exacta en que se registró el evento.
    *   **En el Visor:** Fundamental para todos los análisis temporales (Eventos por Día, por Hora, por Día de Semana), el filtrado por rango de fechas, y para ordenar la tabla de logs.

*   **Descripción:**
    *   **Definición:** Un campo que puede contener información adicional o detalles específicos sobre el evento. Su contenido varía enormemente dependiendo del tipo de evento.
    *   **Ejemplos:** Para un evento de "calificación", podría incluir la nota. Para un "mensaje de foro", podría incluir el ID del mensaje.
    *   **En el Visor:** Se muestra en la tabla de logs detallados para ofrecer más contexto sobre cada acción individual.

*   **Origen:**
    *   **Definición:** Indica la fuente desde la que se generó el log. Comúnmente 'web' (a través de la interfaz del navegador) o 'cli' (interfaz de línea de comandos, para tareas programadas o scripts).
    *   **En el Visor:** Se muestra en la tabla de logs; no se usa activamente en los gráficos actuales.

*   **Dirección IP:**
    *   **Definición:** La dirección del Protocolo de Internet desde la cual el usuario (o el sistema, en algunos casos) realizó la conexión que generó el evento.
    *   **En el Visor:** Crítica para el filtro de "Dirección IP" y todos los gráficos relacionados con el análisis de IPs. Si esta columna no está presente o sus datos son inválidos en el CSV, estas funcionalidades se verán limitadas o no estarán disponibles.

*   **Dashboard:**
    *   **Definición (en el contexto del Visor):** La pantalla principal de resultados que muestra un resumen de las estadísticas generales y una colección de tarjetas con gráficos resumidos de la actividad.

*   **Modal:**
    *   **Definición (en el contexto del Visor):** Una ventana emergente (superpuesta a la interfaz principal) que se utiliza para mostrar versiones ampliadas y detalladas de los gráficos, o para presentar opciones de configuración.

*   **Patrones de Visualización / Participación:**
    *   **Definición (en el contexto del Visor):** Subcadenas de texto definidas por el usuario en el Modal de Configuración que ayudan a la herramienta a categorizar los "Nombres de evento" como acciones de "visualización" (consumo pasivo de contenido) o "participación" (interacción activa). Crucial para el gráfico "Scatter: Visualización vs Participación".

Comprender estos términos te permitirá interpretar con mayor precisión los datos presentados en el Visor de Actividad Moodle y aprovechar al máximo sus capacidades de análisis.
