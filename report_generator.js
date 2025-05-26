// report_generator.js

function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return String(unsafe)
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function formatDateForReport(dateString) {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
        let date;
        if (dateString.includes('/')) { // dd/mm/yyyy
             date = new Date(dateString.split('/').reverse().join('-'));
        } else { // Intenta parsear directamente si es yyyy-mm-dd o formato ISO
            date = new Date(dateString);
        }
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric'});
    } catch (e) {
        return dateString;
    }
}

function formatDateTimeForReport(date) {
    if (!date) return 'N/A';
    if (!(date instanceof Date)) { // Si no es un objeto Date, intenta crearlo
        date = new Date(date);
        if (isNaN(date.getTime())) return 'N/A';
    }
    return date.toLocaleString('es-ES', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

function formatDurationForReport(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds < 0) return 'N/A';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes} min ${seconds} seg`;
}

function generateReportContainer(title, filtersSummary, reportContentHtml) {
    const escapedTitle = escapeHtml(title);
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>${escapedTitle}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                h1, h2, h3 { color: #111; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                h1 { font-size: 1.8em; text-align: center; margin-bottom: 20px; }
                h2 { font-size: 1.5em; margin-top: 30px; }
                h3 { font-size: 1.2em; margin-top: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 0.9em; }
                th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; vertical-align: top; word-break: break-word; }
                th { background-color: #f0f0f0; font-weight: bold; }
                ul { padding-left: 20px; list-style-type: none;}
                ul li { margin-bottom: 5px; }
                ul li strong { min-width: 180px; display: inline-block; }
                .filters-summary { margin-bottom: 25px; padding: 10px 15px; border: 1px solid #eee; background-color: #f9f9f9; font-size: 0.9em; border-radius: 4px; }
                .filters-summary h3 { margin-top: 0; border-bottom: none;}
                .report-section { margin-bottom: 30px; }
                .no-data { color: #777; font-style: italic; padding: 10px; }
                .print-button-container { text-align: right; margin-bottom: 20px; }
                .print-button-container button { padding: 8px 15px; margin-left: 10px; background-color: #0d6efd; color: white; border: none; border-radius: 4px; cursor: pointer; }
                .print-button-container button:hover { background-color: #0b5ed7; }
                @media print {
                    body { margin: 0.5cm; font-size: 10pt; -webkit-print-color-adjust: exact; print-color-adjust: exact;}
                    .print-button-container { display: none !important; }
                    table { font-size: 8pt; page-break-inside: auto; }
                    tr { page-break-inside: avoid; page-break-after: auto; }
                    thead { display: table-header-group; }
                    h1, h2, h3 { page-break-after: avoid; }
                    .report-section { page-break-inside: avoid; }
                    a { text-decoration: none; color: inherit; }
                    th { background-color: #f0f0f0 !important; } /* Ensure background for headers in print */
                }
            </style>
        </head>
        <body>
            <div class="print-button-container">
                <button onclick="window.print()">Imprimir</button>
                <button onclick="window.close()">Cerrar</button>
            </div>
            <h1>${escapedTitle}</h1>
            <div class="filters-summary">
                <h3>Filtros Aplicados:</h3>
                ${filtersSummary}
            </div>
            <div id="reportContent">
                ${reportContentHtml}
            </div>
        </body>
        </html>
    `;
}

function generateFiltersSummaryHTML(filters) {
    let summary = '<ul>';
    summary += `<li><strong>Rango de Fechas:</strong> ${escapeHtml(filters.startDate)} - ${escapeHtml(filters.endDate)}</li>`;
    summary += `<li><strong>Rango Horario:</strong> ${escapeHtml(filters.startTime)} - ${escapeHtml(filters.endTime)}</li>`;
    summary += `<li><strong>Alumno:</strong> ${escapeHtml(filters.user)}</li>`;
    summary += `<li><strong>Nombre Evento:</strong> ${escapeHtml(filters.event)}</li>`;
    summary += `<li><strong>Componente:</strong> ${escapeHtml(filters.component)}</li>`;
    summary += `<li><strong>Contexto Evento:</strong> ${escapeHtml(filters.context)}</li>`;
    summary += `<li><strong>Dirección IP:</strong> ${filters.ips.length === 0 ? 'Todas' : escapeHtml(filters.ips.join(', '))}</li>`;
    summary += `<li><strong>Incluir ítems con 0 actividad:</strong> ${filters.includeZeroActivity ? 'Sí' : 'No'}</li>`;
    summary += '</ul>';
    return summary;
}

function generateTableHTML(title, headers, dataRows, noDataMessage = "No hay datos para esta tabla.") {
    const escapedTitle = escapeHtml(title);
    if (!dataRows || dataRows.length === 0) {
        return `<div class="report-section"><h3>${escapedTitle}</h3><p class="no-data">${escapeHtml(noDataMessage)}</p></div>`;
    }
    let table = `<div class="report-section"><h3>${escapedTitle}</h3><table><thead><tr>`;
    headers.forEach(header => table += `<th>${escapeHtml(header)}</th>`);
    table += '</tr></thead><tbody>';
    dataRows.forEach(row => {
        table += '<tr>';
        row.forEach(cell => table += `<td>${escapeHtml(cell)}</td>`);
        table += '</tr>';
    });
    table += '</tbody></table></div>';
    return table;
}

function generateGeneralReportContent(appData) {
    let content = '<div class="report-section"><h2>Estadísticas Generales del Periodo Filtrado</h2>';
    content += '<ul>';
    content += `<li><strong>Total Eventos Filtrados:</strong> ${escapeHtml(appData.generalStats.totalEvents)}</li>`;
    content += `<li><strong>Usuarios Únicos:</strong> ${escapeHtml(appData.generalStats.uniqueUsers)}</li>`;
    content += `<li><strong>Días con Actividad:</strong> ${escapeHtml(appData.generalStats.activeDays)}</li>`;
    content += `<li><strong>Promedio Eventos/Día:</strong> ${escapeHtml(appData.generalStats.avgEventsPerDay)}</li>`;
    content += `<li><strong>Evento Más Frecuente:</strong> ${escapeHtml(appData.generalStats.mostFrequentEventName)}</li>`;
    content += `<li><strong>Componente Más Accedido:</strong> ${escapeHtml(appData.generalStats.mostFrequentComponent)}</li>`;
    content += `<li><strong>Usuario Más Activo:</strong> ${escapeHtml(appData.generalStats.mostActiveUser)}</li>`;
    content += '</ul></div>';

    // Top 10 Alumnos (ya estaba)
    const userActivityData = calculateUserActivityData(
        appData.filteredData, 10, appData.filters.includeZeroActivity,
        appData.filters.includeZeroActivity ? appData.baseDataForZeroInclusion : []
    );
    const userTableRows = userActivityData.labels.map((label, index) => [label, userActivityData.dataValues[index]]);
    content += generateTableHTML("Top 10 Alumnos por Actividad", ["Alumno", "Nº Eventos"], userTableRows, "No hay datos de actividad de alumnos para el top.");

    // Top 10 Componentes (ya estaba)
    const componentActivityData = calculateComponentActivityData(
        appData.filteredData, 10, appData.filters.includeZeroActivity,
        appData.filters.includeZeroActivity ? appData.baseDataForZeroInclusion : []
    );
    const componentTableRows = componentActivityData.labels.map((label, index) => [label, componentActivityData.dataValues[index]]);
    content += generateTableHTML("Top 10 Componentes por Actividad", ["Componente", "Nº Eventos"], componentTableRows, "No hay datos de actividad de componentes para el top.");
    
    return content;
}

function generateStudentActivityReportContent(appData) { // Global
    const userActivityData = calculateUserActivityData(
        appData.filteredData, 0, appData.filters.includeZeroActivity,
        appData.filters.includeZeroActivity ? appData.baseDataForZeroInclusion : []
    );
    const userTableRows = userActivityData.labels.map((label, index) => [label, userActivityData.dataValues[index]]);
    return generateTableHTML("Actividad Detallada por Alumno (Global)", ["Alumno", "Nº Eventos"], userTableRows, "No hay datos de actividad de alumnos con los filtros aplicados.");
}

function generateComponentActivityReportContent(appData) { // Global
     const componentActivityData = calculateComponentActivityData(
        appData.filteredData, 0, appData.filters.includeZeroActivity,
        appData.filters.includeZeroActivity ? appData.baseDataForZeroInclusion : []
    );
    const componentTableRows = componentActivityData.labels.map((label, index) => [label, componentActivityData.dataValues[index]]);
    return generateTableHTML("Actividad Detallada por Componente (Global)", ["Componente", "Nº Eventos"], componentTableRows, "No hay datos de actividad de componentes con los filtros aplicados.");
}

function generateContextActivityReportContent(appData) { // Global
    const contextActivityData = calculateActivityByContextData(
        appData.filteredData, 0, appData.filters.includeZeroActivity,
        appData.filters.includeZeroActivity ? appData.baseDataForZeroInclusion : []
    );
    const contextTableRows = contextActivityData.labels.map((label, index) => [label, contextActivityData.dataValues[index]]);
    return generateTableHTML("Actividad Detallada por Contexto (Global)", ["Contexto de Evento", "Nº Eventos"], contextTableRows, "No hay datos de actividad por contexto con los filtros aplicados.");
}

function generateEventsOverTimeReportContent(appData) { // Global
    const sDate = new Date(appData.filters.startDate.split('/').reverse().join('-'));
    const eDate = new Date(appData.filters.endDate.split('/').reverse().join('-'));
    sDate.setHours(0,0,0,0);
    eDate.setHours(23,59,59,999);

    const eventsOverTimeData = calculateEventsOverTimeData(appData.filteredData, sDate, eDate);
    const eventsTableRows = eventsOverTimeData.labels.map((label, index) => [formatDateForReport(label), eventsOverTimeData.dataValues[index]]);
    return generateTableHTML("Eventos por Día (Global)", ["Fecha", "Nº Eventos"], eventsTableRows, "No hay datos de eventos por día con los filtros aplicados.");
}

function generateIPsPerUserReportContent(appData) { // Global
    if (!appData.ipColumnAvailable) {
        return `<div class="report-section"><h3>IPs por Alumno (Global)</h3><p class="no-data">La columna 'Dirección IP' no está disponible en los datos cargados.</p></div>`;
    }
    // Se usa filteredData para el reporte, no baseData
    const ipsPerUserData = calculateIPsPerUserData(appData.filteredData, 0, false, []); // includeZero es false y no base list, porque queremos IPs de usuarios con actividad filtrada
    
    const ipsTableRows = ipsPerUserData.labels.map((label, index) => {
        const userLogs = appData.filteredData.filter(log => (log.FULL_NAME || "Usuario Desconocido") === label && log.IP_ADDRESS);
        const uniqueIPsForUser = [...new Set(userLogs.map(log => log.IP_ADDRESS))].join(', ');
        return [label, ipsPerUserData.dataValues[index], uniqueIPsForUser || 'N/A'];
    });
    return generateTableHTML("IPs por Alumno (Global)", ["Alumno", "Nº IPs Únicas", "IPs Utilizadas"], ipsTableRows, "No hay datos de IPs por alumno con los filtros aplicados.");
}


function generateSingleStudentReportContent(appData) {
    const studentName = appData.selectedStudentName;
    if (!studentName || studentName === "ALL_USERS") {
        return '<div class="report-section"><h2>Informe Detallado de Alumno</h2><p class="no-data">No se ha seleccionado un alumno específico.</p></div>';
    }

    const studentData = appData.filteredData.filter(row => (row.FULL_NAME || "Usuario Desconocido") === studentName);
    if (studentData.length === 0) {
        return `<div class="report-section"><h2>Informe Detallado de: ${escapeHtml(studentName)}</h2><p class="no-data">No hay datos de actividad para este alumno con los filtros aplicados.</p></div>`;
    }

    let content = `<div class="report-section"><h2>Informe Detallado de: ${escapeHtml(studentName)}</h2>`;
    content += `<h3>Resumen de Actividad (Periodo Filtrado)</h3><ul>`;
    content += `<li><strong>Total Eventos:</strong> ${studentData.length}</li>`;
    
    const studentComponentActivity = calculateComponentActivityData(studentData, 0, false, []);
    const studentTopComponent = studentComponentActivity.labels.length > 0 ? `${studentComponentActivity.labels[0]} (${studentComponentActivity.dataValues[0]} eventos)` : "N/A";
    content += `<li><strong>Componente Más Utilizado:</strong> ${escapeHtml(studentTopComponent)}</li>`;

    const studentContextActivity = calculateActivityByContextData(studentData, 0, false, []);
    const studentTopContext = studentContextActivity.labels.length > 0 ? `${studentContextActivity.labels[0]} (${studentContextActivity.dataValues[0]} eventos)` : "N/A";
    content += `<li><strong>Contexto Más Frecuente:</strong> ${escapeHtml(studentTopContext)}</li>`;

    const eventNameActivity = {};
    studentData.forEach(row => { eventNameActivity[row.EVENT_NAME || "Evento Desconocido"] = (eventNameActivity[row.EVENT_NAME || "Evento Desconocido"] || 0) + 1; });
    const studentTopEventName = Object.keys(eventNameActivity).length > 0 ? Object.entries(eventNameActivity).reduce((max, current) => current[1] > max[1] ? current : max, ["N/A", 0])[0] : "N/A";
    content += `<li><strong>Nombre de Evento Más Frecuente:</strong> ${escapeHtml(studentTopEventName)}</li>`;
    content += `</ul>`;

    // Top Componentes para este alumno
    const topNStudentComponents = 5;
    const studentCompRows = studentComponentActivity.labels.slice(0, topNStudentComponents).map((label, index) => [label, studentComponentActivity.dataValues[index]]);
    content += generateTableHTML(`Top ${topNStudentComponents} Componentes Utilizados por ${escapeHtml(studentName)}`, ["Componente", "Nº Eventos"], studentCompRows);
    
    // Top Contextos para este alumno
    const topNStudentContexts = 5;
    const studentContextRows = studentContextActivity.labels.slice(0, topNStudentContexts).map((label, index) => [label, studentContextActivity.dataValues[index]]);
    content += generateTableHTML(`Top ${topNStudentContexts} Contextos de Evento para ${escapeHtml(studentName)}`, ["Contexto", "Nº Eventos"], studentContextRows);

    // IPs utilizadas por el alumno
    if (appData.ipColumnAvailable) {
        const studentIPs = [...new Set(studentData.map(row => row.IP_ADDRESS).filter(ip => ip))];
        const studentIPRows = studentIPs.map(ip => [ip]);
        content += generateTableHTML(`Direcciones IP Utilizadas por ${escapeHtml(studentName)}`, ["Dirección IP"], studentIPRows, "No se registraron IPs para este alumno.");
    }

    // Intentos de Cuestionario del Alumno
    const studentQuizAttempts = appData.allQuizAttempts.filter(attempt => attempt.user === studentName);
    if (studentQuizAttempts.length > 0) {
        const studentQuizRows = studentQuizAttempts.map(attempt => [
            attempt.context.replace('Cuestionario: ',''),
            formatDurationForReport(attempt.durationSeconds),
            attempt.pagesVisited.size,
            formatDateTimeForReport(attempt.startTime),
            formatDateTimeForReport(attempt.endTime)
        ]);
        content += generateTableHTML(`Intentos de Cuestionario de ${escapeHtml(studentName)}`, 
            ["Cuestionario", "Duración", "Págs. Vistas", "Inicio", "Fin"], studentQuizRows);
    } else {
        content += `<p class="no-data">No se encontraron intentos de cuestionario para ${escapeHtml(studentName)} con los filtros aplicados.</p>`;
    }

    // Logs del alumno (últimos X)
    const maxLogsToShow = appData.itemsPerPageForStudentLogs || 50;
    const studentLogsForTable = studentData.slice(0, maxLogsToShow).map(log => [
        log.TIME || '',
        log.EVENT_CONTEXT || '',
        log.COMPONENT || '',
        log.EVENT_NAME || '',
        log.DESCRIPTION || '',
        log.IP_ADDRESS || ''
    ]);
    content += generateTableHTML(`Últimos ${studentLogsForTable.length} Logs de ${escapeHtml(studentName)}`, 
        [
            appData.csvColumnMapping.TIME, 
            appData.csvColumnMapping.EVENT_CONTEXT, 
            appData.csvColumnMapping.COMPONENT, 
            appData.csvColumnMapping.EVENT_NAME, 
            appData.csvColumnMapping.DESCRIPTION, 
            appData.csvColumnMapping.IP_ADDRESS
        ], 
        studentLogsForTable, `No hay logs para ${escapeHtml(studentName)} con los filtros aplicados.`);
    
    content += '</div>';
    return content;
}


function generateQuizReportContent(appData) {
    if (!appData.allQuizAttempts || appData.allQuizAttempts.length === 0) {
        return '<div class="report-section"><h2>Informe de Tiempos de Cuestionarios</h2><p class="no-data">No se encontraron intentos de cuestionarios con los filtros actuales.</p></div>';
    }
    let content = '<div class="report-section"><h2>Informe de Tiempos de Cuestionarios</h2>';
    
    const quizAttemptsRows = appData.allQuizAttempts.map(attempt => [
        attempt.user,
        attempt.context.replace('Cuestionario: ',''),
        formatDurationForReport(attempt.durationSeconds),
        attempt.pagesVisited.size,
        formatDateTimeForReport(attempt.startTime),
        formatDateTimeForReport(attempt.endTime)
    ]);
    content += generateTableHTML(
        "Detalle de Intentos de Cuestionario", 
        ["Alumno", "Cuestionario", "Duración", "Páginas Vistas", "Inicio", "Fin"], 
        quizAttemptsRows
    );

    const totalDurationSeconds = appData.allQuizAttempts.reduce((sum, a) => sum + a.durationSeconds, 0);
    const avgDurationFormatted = appData.allQuizAttempts.length > 0 ? formatDurationForReport(totalDurationSeconds / appData.allQuizAttempts.length) : 'N/A';
    content += '<h3>Resumen de Cuestionarios:</h3><ul>';
    content += `<li><strong>Total Intentos Registrados:</strong> ${appData.allQuizAttempts.length}</li>`;
    content += `<li><strong>Duración Promedio por Intento:</strong> ${avgDurationFormatted}</li>`;
    content += '</ul>';
    content += '</div>';
    return content;
}

function openPrintableReport(reportType, appData) {
    if (typeof calculateUserActivityData !== 'function' || 
        typeof calculateComponentActivityData !== 'function' ||
        typeof calculateActivityByContextData !== 'function' ||
        typeof calculateEventsOverTimeData !== 'function' ||
        typeof calculateIPsPerUserData !== 'function' ) {
        alert("Error: Las funciones de cálculo necesarias no están disponibles. Revisa la consola.");
        console.error("Alguna función de cálculo como calculateUserActivityData no está definida globalmente o no se pasó correctamente.");
        return;
    }

    let reportContentHtml = "";
    let reportTitle = "";
    const filtersSummaryHtml = generateFiltersSummaryHTML(appData.filters);

    switch (reportType) {
        case 'general':
            reportTitle = "Informe General de Actividad";
            reportContentHtml = generateGeneralReportContent(appData);
            break;
        case 'studentActivity':
            reportTitle = "Informe de Actividad de Alumnos (Global)";
            reportContentHtml = generateStudentActivityReportContent(appData);
            break;
        case 'componentActivity':
            reportTitle = "Informe de Actividad por Componentes (Global)";
            reportContentHtml = generateComponentActivityReportContent(appData);
            break;
        case 'contextActivity':
            reportTitle = "Informe de Actividad por Contexto (Global)";
            reportContentHtml = generateContextActivityReportContent(appData);
            break;
        case 'eventsOverTime':
            reportTitle = "Informe de Eventos por Día (Global)";
            reportContentHtml = generateEventsOverTimeReportContent(appData);
            break;
        case 'ipsPerUser':
            reportTitle = "Informe de IPs por Alumno (Global)";
            reportContentHtml = generateIPsPerUserReportContent(appData);
            break;
        case 'singleStudent':
            reportTitle = `Informe Detallado del Alumno: ${escapeHtml(appData.selectedStudentName)}`;
            reportContentHtml = generateSingleStudentReportContent(appData);
            break;
        case 'quizAttempts':
            reportTitle = "Informe de Tiempos de Cuestionarios";
            reportContentHtml = generateQuizReportContent(appData);
            break;
        default:
            console.error("Tipo de informe desconocido:", reportType);
            alert("Tipo de informe no válido.");
            return;
    }

    const fullHtml = generateReportContainer(reportTitle, filtersSummaryHtml, reportContentHtml);
    const reportWindow = window.open('', '_blank');
    if (reportWindow) {
        // Esperar un poco para que el DOM de la nueva ventana esté listo
        setTimeout(() => {
            reportWindow.document.open();
            reportWindow.document.write(fullHtml);
            reportWindow.document.close();
        }, 100); // 100ms de espera
    } else {
        alert("No se pudo abrir la ventana para el informe. Revisa la configuración de bloqueo de pop-ups de tu navegador.");
    }
}
