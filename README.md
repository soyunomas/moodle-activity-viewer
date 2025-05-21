# Visor de Actividad Moodle 📊

Un visor interactivo, del lado del cliente, para los registros de actividad de Moodle. ¡Analiza fácilmente las exportaciones de logs CSV de Moodle directamente en tu navegador sin necesidad de configuración en el servidor! 🚀

[![Licencia: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Desplegado-brightgreen)](https://soyunomas.github.io/moodle-activity-viewer/visor_actividad_moodle.html)

Esta herramienta permite a educadores, administradores y usuarios de Moodle visualizar y filtrar rápidamente la actividad de los alumnos. Es completamente **autocontenida** en un único archivo HTML, lo que significa que no hay instalaciones complejas ni dependencias de servidor. ¡Simplemente ábrelo y úsalo! 🎉

# Visor de Actividad Moodle Avanzado

Herramienta de análisis de logs de Moodle del lado del cliente, diseñada para ofrecer visualizaciones interactivas y detalladas sobre la actividad en la plataforma. Carga tus archivos CSV y explora los datos sin necesidad de subirlos a un servidor.

## ✨ Características Principales

*   **📁 Carga Directa de CSV:** Procesa archivos CSV de logs de Moodle estándar directamente desde tu ordenador.
*   **📊 Paneles de Visualización (Dashboards):** Un conjunto completo de gráficos para analizar la actividad desde múltiples perspectivas:
    *   **Resumen General:**
        *   Estadísticas Clave (Total Eventos, Usuarios Únicos, Días Activos, Promedios, etc.).
    *   **Análisis de Actividad Principal:**
        *   Actividad por Alumno (Top N en panel, todos en modal).
        *   Eventos a lo Largo del Tiempo (por Día).
        *   Actividad por Componente Moodle (Top N en panel, todos en modal).
        *   Actividad por Contexto del Evento (Top N en panel, todos en modal).
    *   **Patrones Temporales:**
        *   Eventos por Hora del Día.
        *   Eventos por Día de la Semana.
    *   **Análisis Detallado de Componentes:**
        *   Desglose de Eventos Específicos dentro de los Componentes Principales.
    *   **Gráficos de Dispersión (Scatter Plots):**
        *   Usuarios Únicos vs. Eventos Totales (por Día).
        *   Componentes Únicos Accedidos vs. Eventos Totales (por Alumno).
        *   Eventos de Visualización vs. Eventos de Participación (por Alumno).
    *   **Gráficos de Burbujas (Bubble Charts) para Análisis Multidimensional:**
        *   Análisis de Alumnos: Días Activos (eje X) vs. Promedio Eventos/Día (eje Y) vs. Total Eventos (tamaño burbuja).
        *   Análisis de Componentes: Usuarios Únicos (eje X) vs. Total Eventos (eje Y) vs. Promedio Eventos/Usuario (tamaño burbuja).
        *   Análisis de Contextos: Alumnos Activos (eje X) vs. Promedio Eventos/Alumno (eje Y) vs. Total Eventos (tamaño burbuja).
    *   **Análisis Basado en IP (si la columna está disponible en el CSV):**
        *   Top IPs por Número de Eventos.
        *   Top IPs por Número de Alumnos Únicos.
        *   Top Alumnos por Número de IPs Únicas.

*   **🔍 Filtrado Potente y Flexible:**
    *   📅 **Rango de Fechas:** Enfócate en periodos específicos.
    *   🕒 **Rango de Horas:** Precisa el análisis a franjas horarias específicas del día.
    *   👤 **Usuario:** Analiza la actividad de todos los usuarios o de un solo alumno.
    *   🏷️ **Nombre del Evento:** Aísla acciones particulares (ej: "Módulo del curso visto").
    *   🧩 **Componente:** Profundiza en áreas específicas de Moodle (ej: Foro, Tarea).
    *   🌍 **Contexto del Evento:** Filtra por el curso, actividad o recurso específico.
    *   🌐 **Dirección IP:** Filtra eventos originados desde IPs específicas (si la columna existe en el CSV).
    *   📊 **Opción "Incluir ítems con 0 actividad":** Controla si los rankings (alumnos, componentes, etc.) muestran entidades del dataset base aunque no tengan actividad según los filtros actuales.

*   **🛠️ Configuración Personalizada:**
    *   🚫 **Exclusiones Globales Avanzadas:** Define subcadenas (insensibles a mayúsculas/minúsculas, separadas por coma) para excluir automáticamente del análisis:
        *   Nombres de Alumnos (ej: "admin", "test user").
        *   Nombres de Componentes (ej: "Sistema", "Bloque X").
        *   Nombres de Evento (ej: "course viewed", "user loggedin").
        *   Contextos de Evento (ej: "Curso de Pruebas", "Actividad Ejemplo").
    *   🎨 **Patrones de Eventos para Gráfico "Visualización vs. Participación":**
        *   Define subcadenas para identificar eventos de "Visualización" (ej: "viewed", "consultado").
        *   Define subcadenas para identificar eventos de "Participación" (ej: "submitted", "posted").

## 📸 Capturas de Pantalla

<table align="center" style="width:100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="text-align:center; padding: 8px; border: 1px solid #ddd;">Panel de Filtros</th>
      <th style="text-align:center; padding: 8px; border: 1px solid #ddd;">Gráficas Disponibles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:center; padding: 8px; border: 1px solid #ddd;"><img src="images/screenshot.png" alt="Panel de Filtros" width="350"></td>
      <td style="text-align:center; padding: 8px; border: 1px solid #ddd;"><img src="images/screenshot1.png" alt="Gráficas Disponibles en el Dashboard" width="350"></td>
    </tr>
    <tr>
      <th style="text-align:center; padding: 8px; border: 1px solid #ddd;">Ejemplo Gráfica Ampliada 1</th>
      <th style="text-align:center; padding: 8px; border: 1px solid #ddd;">Ejemplo Gráfica Ampliada 2</th>
    </tr>
    <tr>
      <td style="text-align:center; padding: 8px; border: 1px solid #ddd;"><img src="images/screenshot2.png" alt="Ejemplo de una gráfica ampliada en modal" width="350"></td>
      <td style="text-align:center; padding: 8px; border: 1px solid #ddd;"><img src="images/screenshot3.png" alt="Otro ejemplo de gráfica ampliada" width="350"></td>
    </tr>
    <tr>
      <th style="text-align:center; padding: 8px; border: 1px solid #ddd;">Ejemplo Gráfica Ampliada 3</th>
      <th style="text-align:center; padding: 8px; border: 1px solid #ddd;">Ejemplo Gráfica Ampliada 4</th>
    </tr>
    <tr>
      <td style="text-align:center; padding: 8px; border: 1px solid #ddd;"><img src="images/screenshot4.png" alt="Tercer ejemplo de gráfica ampliada" width="350"></td>
      <td style="text-align:center; padding: 8px; border: 1px solid #ddd;"><img src="images/screenshot5.png" alt="Cuarto ejemplo de gráfica ampliada" width="350"></td>
    </tr>
  </tbody>
</table>

## 🚀 Demo en Vivo en GitHub Pages

Prueba el Visor de Actividad Moodle en vivo:
[https://soyunomas.github.io/moodle-activity-viewer/visor_actividad_moodle.html](https://soyunomas.github.io/moodle-activity-viewer/visor_actividad_moodle.html)

## 📋 Cómo Exportar Logs de Moodle como CSV

Para usar este visor, primero necesitarás exportar los logs relevantes desde tu instancia de Moodle. Los pasos exactos pueden variar ligeramente dependiendo de tu versión de Moodle y tema, pero aquí tienes una guía general:

1.  **Inicia sesión en Moodle:** Accede a tu sitio Moodle con una cuenta de administrador o un rol de usuario que tenga permiso para ver los logs del sitio (ej: gestor).
2.  **Navega a Administración del Sitio:**
    *   Normalmente se encuentra en el bloque de navegación principal o en el menú de usuario.
3.  **Encuentra los Logs:**
    *   Ve a **Administración del sitio** -> **Informes** -> **Registros** (o "Logs").
    *   Alternativamente, podrías encontrar "Registros activos" (o "Live logs") y luego una opción para ver "Registro estándar" (o "Standard log") o "Todos los registros".
4.  **Aplica Filtros Iniciales (Opcional pero Recomendado):**
    *   **Curso:** Selecciona "Todos los cursos" o un curso específico.
    *   **Participantes:** Selecciona "Todos los participantes" (puedes filtrar usuarios en este visor).
    *   **Días:** Selecciona "Todos los días" o un rango de fechas amplio (puedes refinar fechas en este visor).
    *   **Actividades:** Selecciona "Todas las actividades".
    *   **Acciones:** Selecciona "Todas las acciones".
    *   **Tipo de Registro:** Asegúrate de que "Registro estándar" (o similar, no "Registro heredado" si es una opción) esté seleccionado.
5.  **Obtén los Logs:** Haz clic en el botón "Conseguir estos registros" (o similar).
6.  **Descarga como CSV:**
    *   Desplázate hasta la parte inferior de la página del informe de logs.
    *   Busca una sección "Descargar datos de la tabla como" o "Exportar".
    *   Elige **"Valores separados por comas (.csv)"** y descarga el archivo.

**➡️ Columnas CSV Importantes:**
Este visor depende de encabezados de columna específicos de la exportación CSV de Moodle. Los encabezados esperados por defecto (en español, según tu HTML) son:
*   `Hora`
*   `Nombre completo del usuario`
*   `Contexto del evento`
*   `Componente`
*   `Nombre evento`
*   `Descripción`

Si tu exportación de Moodle usa nombres diferentes, necesitarás actualizar el objeto `CSV_COLUMN_MAPPING` dentro de la etiqueta `<script>` en el archivo `index.html`.

## 💻 Cómo Usar el Visor

1.  **Abre `index.html`:**
    *   Descarga el repositorio y abre `index.html` directamente en tu navegador web.
    *   O visita la [Demo en Vivo](#-demo-en-vivo-en-github-pages).
2.  **Selecciona el Archivo CSV:**
    *   Bajo "1. Selecciona el archivo CSV:", haz clic en "Seleccionar archivo" y elige el archivo de log CSV que descargaste de Moodle.
3.  **Aplica Filtros (Opcional):**
    *   El acordeón "Configuración de Análisis y Filtros" está abierto por defecto.
    *   Ajusta la **Fecha de Inicio** y **Fecha de Fin**.
    *   Usa los menús desplegables para filtrar por **Alumno**, **Nombre Evento**, **Componente** o **Contexto del Evento** específico.
4.  **Analiza:**
    *   Haz clic en el botón **"Analizar Logs"**.
5.  **Explora los Resultados:**
    *   Visualiza las estadísticas resumidas y los gráficos interactivos en el panel.
    *   Haz clic en cualquier tarjeta de gráfico pequeña para ver una versión ampliada en un modal.
    *   Desplázate por la tabla "Detalle de Logs Filtrados" en la parte inferior.
6.  **Configura Exclusiones (Opcional):**
    *   Haz clic en el icono de engranaje (⚙️) en la barra de navegación superior.
    *   Introduce subcadenas de nombres de usuario separadas por comas para excluir (ej: "usuario de prueba, admin, soporte").
    *   Haz clic en "Guardar Cambios y Reanalizar". Las exclusiones se guardan en el almacenamiento local de tu navegador.

## 🛠️ Construido Con

*   **HTML5:** Marcado semántico.
*   **CSS3:** Estilos personalizados y diseño responsivo.
*   **Bootstrap 5:** Para componentes de UI, maquetación y responsividad.
*   **JavaScript (ES6+):** Toda la lógica del lado del cliente, parseo de datos y manipulación del DOM.
*   **Chart.js:** Para crear gráficos interactivos y atractivos.
*   **date-fns:** Para un parseo y manipulación de fechas robusto.

## 📝 TO-DO / Mejoras Futuras

*   [ ] **Exportar Informe Completo:** Opción para descargar la vista actual del panel (quizás como PDF o una colección de imágenes y resúmenes de datos). 📥
*   [ ] **Selección Avanzada de Columnas:** Permitir a los usuarios mapear columnas CSV si su exportación tiene encabezados diferentes, directamente desde la UI.
*   [ ] **Filtrado de Tiempo Más Granular:** Añadir filtros por hora del día (ej: mostrar actividad solo entre las 9 AM y las 5 PM). ⏱️
*   [ ] **Guardar/Cargar Configuraciones de Filtro:** Permitir a los usuarios guardar un conjunto completo de filtros aplicados (fechas, usuario, evento, etc.) y recargarlos más tarde.
*   [ ] **Accesibilidad Mejorada (A11Y):** Revisar y mejorar aún más los atributos ARIA y la navegación por teclado para todos los componentes. ♿
*   [ ] **Temas/Personalización:** Opciones básicas para que los usuarios cambien los colores de los gráficos o un tema claro/oscuro para el visor. 🎨
*   [ ] **Análisis de Rendimiento:** Probar con archivos CSV extremadamente grandes y optimizar el parseo/renderizado si se encuentran cuellos de botella (ej: considerar Web Workers para el parseo).

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE.md](LICENSE.md) para más detalles.

---

¡Feliz análisis de logs de Moodle! Si encuentras útil esta herramienta, ¡considera marcar el repositorio con una estrella! ⭐
