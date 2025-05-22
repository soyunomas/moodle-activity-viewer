// help_content.js
const helpContent = {
    generalStats: {
        title: "Ayuda: Estadísticas Generales",
        content: `<p>Este panel proporciona un resumen cuantitativo de los datos de logs Moodle una vez aplicados los filtros seleccionados y las exclusiones globales. Es el primer punto de contacto para entender la magnitud y características básicas de la actividad.</p>
                    <h4>Métricas Presentadas:</h4>
                    <ul>
                        <li><strong>Rango Fechas:</strong> El intervalo de fechas para el cual se están analizando los datos. Crucial para contextualizar todas las demás métricas.</li>
                        <li><strong>Total Eventos:</strong> El número bruto de interacciones registradas que coinciden con todos los filtros. Una medida del volumen total de actividad.</li>
                        <li><strong>Usuarios Únicos:</strong> El número de individuos distintos (alumnos) que han generado al menos un evento en el periodo y con los filtros aplicados. Mide el alcance de la participación.</li>
                        <li><strong>Días con Actividad:</strong> El número de días únicos dentro del rango seleccionado en los que se registró al menos un evento. Mide la dispersión o continuidad de la actividad.</li>
                        <li><strong>Promedio Eventos/Día:</strong> Calculado como "Total Eventos" / "Días con Actividad". Ofrece una idea de la intensidad media de uso en los días que hubo actividad.</li>
                        <li><strong>Evento Más Frecuente:</strong> El "Nombre evento" específico (ej. "Curso visto", "Tarea enviada") que aparece más veces. Indica la acción predominante.</li>
                        <li><strong>Componente Más Accedido:</strong> El "Componente" Moodle (ej. Foro, Tarea, Cuestionario) que acumula más eventos. Señala la herramienta o tipo de recurso más utilizado.</li>
                        <li><strong>Usuario Más Activo:</strong> El alumno con el mayor número de eventos registrados, mostrando su nombre y la cantidad de eventos.</li>
                    </ul>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Este panel es fundamental como diagnóstico inicial. Permite evaluar rápidamente si los filtros aplicados devuelven un conjunto de datos coherente o si es necesario ajustarlos antes de profundizar en gráficos específicos.</p>
                    <p><strong>Preguntas que este panel ayuda a responder (directa o indirectamente, guiando el filtrado posterior):</strong></p>
                    <ul>
                        <li><strong>Visión general:</strong> ¿Cuál es el volumen de actividad para el periodo/curso/alumno seleccionado? ¿Es el esperado?</li>
                        <li><strong>Participación:</strong> ¿Cuántos alumnos están realmente activos según los filtros? Si se filtra por un curso específico, ¿es un número saludable de participantes?</li>
                        <li><strong>Consistencia:</strong> ¿La actividad se distribuye a lo largo de muchos días o se concentra en pocos? Un bajo número de "Días con Actividad" podría indicar actividad esporádica.</li>
                        <li><strong>Intensidad:</strong> ¿El "Promedio Eventos/Día" es alto o bajo? Combinado con "Usuarios Únicos", ¿sugiere que muchos usuarios hacen poco, o pocos usuarios hacen mucho?</li>
                        <li><strong>Foco de actividad:</strong> ¿Cuál es la acción más común ("Evento Más Frecuente") y en qué parte de Moodle ocurre ("Componente Más Accedido")? Esto puede cambiar drásticamente según los filtros de fecha (ej. cerca de un examen vs. inicio de curso).</li>
                        <li><strong>Identificación temprana:</strong>
                            <ul>
                                <li><em>Alumnos en riesgo:</em> Si al filtrar por un rango de fechas reciente, el "Total Eventos" o "Usuarios Únicos" es inesperadamente bajo para un curso, podría ser una señal. El "Usuario Más Activo" puede ser un referente, pero se necesitan otros gráficos para ver la distribución.</li>
                                <li><em>Popularidad de recursos:</em> El "Componente Más Accedido" puede dar una pista inicial sobre qué áreas del curso son más visitadas, lo cual puede ser verificado con el gráfico de "Actividad por Componente" o "Actividad por Contexto".</li>
                            </ul>
                        </li>
                        <li><strong>Impacto de filtros:</strong> ¿Cómo cambia el "Total Eventos" y "Usuarios Únicos" al aplicar diferentes filtros de fecha, componente o contexto? Esto ayuda a aislar periodos o áreas de interés.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Estas son métricas agregadas. Un "Promedio Eventos/Día" alto no significa que todos los días tuvieran esa actividad, ni que todos los usuarios fueran igual de activos. Se deben usar los gráficos detallados para explorar la distribución y variabilidad.</p>`
    },
    userActivity: {
        title: "Ayuda: Actividad por Alumno (Top N)",
        content: `<p>Este gráfico de barras horizontales muestra el número total de eventos (interacciones) generados por cada alumno, ordenados de mayor a menor actividad. El dashboard muestra un "Top N" (ej. Top 15), mientras que el modal muestra todos los alumnos que cumplen con los filtros.</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Permite identificar rápidamente a los alumnos con mayor y menor volumen de interacciones dentro del conjunto de datos filtrado. Es clave para entender la distribución de la participación.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Ranking de actividad:</strong> ¿Quiénes son los alumnos más y menos activos en términos de volumen de interacciones?</li>
                        <li><strong>Identificación de outliers:</strong> ¿Hay alumnos con actividad desproporcionadamente alta o baja en comparación con el resto?</li>
                        <li><strong>Alumnos en riesgo:</strong>
                            <ul>
                                <li>Alumnos con actividad consistentemente baja (filtrando por diferentes periodos) podrían necesitar apoyo. La opción "Incluir ítems con 0 actividad" es crucial aquí para ver a quienes no registran eventos con los filtros actuales pero sí existen en el dataset original.</li>
                                <li>Filtrando por un componente o contexto específico (ej. una tarea importante), ¿qué alumnos tienen baja o nula actividad aquí?</li>
                            </ul>
                        </li>
                        <li><strong>Patrones de "atracón" (cramming):</strong> Si se filtra por un contexto evaluable (ej. un cuestionario) y un periodo corto justo antes de la fecha límite, ¿qué alumnos muestran picos súbitos y altos de actividad aquí, que no se veían antes?</li>
                        <li><strong>Líderes de opinión o iniciadores:</strong> Al filtrar por componente "Foro" y por "Nombre Evento" como "Debate creado" o "Mensaje enviado", ¿qué alumnos destacan?</li>
                        <li><strong>Comparación entre grupos:</strong> Si los nombres de los alumnos permiten identificar grupos (ej. "GrupoA_Nombre", "GrupoB_Nombre"), se puede evaluar visualmente la actividad general de diferentes cohortes (aunque requeriría un análisis más formal para conclusiones robustas).</li>
                        <li><strong>Impacto de intervenciones:</strong> Si se realiza una intervención pedagógica, ¿cambia el ranking de actividad de ciertos alumnos o del grupo general en periodos posteriores? (Comparando el gráfico antes y después).</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Barras más largas:</strong> Indican mayor número de eventos.</li>
                        <li><strong>Visualización en Modal:</strong> Al hacer clic, se muestra a todos los alumnos que cumplen filtros (o todos los de la base si "Incluir ítems con 0 actividad" está activo y se muestran ceros). Esto es útil para ver la "cola larga" de la distribución.</li>
                        <li><strong>Opción "Incluir ítems con 0 actividad":</strong> Si está activa, y se aplica un filtro que reduce la actividad de algunos alumnos a cero (ej. filtrar por un recurso que no usaron), estos alumnos seguirán apareciendo con una barra de cero. Esto es vital para no perder de vista a los inactivos en contextos específicos.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Un alto número de eventos no siempre equivale a aprendizaje efectivo o comprensión. Debe contextualizarse con el tipo de eventos (ver "Desglose Eventos en Componentes"), el rendimiento académico y otros factores cualitativos. Este gráfico mide cantidad, no necesariamente calidad de interacción.</p>`
    },
    eventsOverTime: {
        title: "Ayuda: Eventos por Día",
        content: `<p>Este gráfico de líneas muestra la evolución del número total de eventos registrados en la plataforma día a día, dentro del rango de fechas y con los filtros aplicados.</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Permite visualizar patrones temporales de actividad, identificar tendencias, picos y valles, y correlacionarlos con el calendario académico o intervenciones.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Tendencias generales:</strong> ¿La actividad aumenta, disminuye o se mantiene estable a lo largo del periodo seleccionado?</li>
                        <li><strong>Picos de actividad:</strong> ¿Se observan aumentos súbitos de actividad? ¿Coinciden con fechas de entrega de tareas, exámenes, inicio de nuevos temas o anuncios importantes?</li>
                        <li><strong>Valles de actividad:</strong> ¿Hay periodos de baja actividad o inactividad? ¿Coinciden con fines de semana, vacaciones, o periodos entre módulos? Una inactividad prolongada e inesperada podría ser una alerta.</li>
                        <li><strong>Impacto de eventos del curso:</strong>
                            <ul>
                                <li>Al filtrar por un "Contexto del evento" específico (ej. una nueva tarea anunciada), ¿se ve un aumento de actividad en los días siguientes?</li>
                                <li>Si el profesor hace un anuncio importante, ¿hay una "oleada" de actividad en los logs generales o en componentes específicos (ej. "Foro de anuncios")?</li>
                            </ul>
                        </li>
                        <li><strong>Análisis individual de alumnos:</strong> Al filtrar por un "Alumno" específico:
                            <ul>
                                <li>¿Cuál es su patrón de actividad a lo largo del tiempo? ¿Es constante, errático, con largos periodos de inactividad?</li>
                                <li>¿Muestra actividad creciente al acercarse una fecha límite (posible "atracón")?</li>
                                <li>¿Su actividad decayó recientemente? Podría ser un alumno en riesgo.</li>
                            </ul>
                        </li>
                        <li><strong>Comparación de periodos:</strong> ¿Cómo varía la actividad en el mismo día de la semana a lo largo de diferentes semanas? (Inspección visual o comparando gráficos de periodos diferentes).</li>
                        <li><strong>Procrastinación vs. planificación:</strong> ¿La actividad en un contexto evaluable se distribuye o se concentra justo antes de la fecha límite?</li>
                        <li><strong>Rapidez de adopción:</strong> Al publicar un nuevo recurso o actividad, ¿cuánto tardan los alumnos en empezar a interactuar con él? (Filtrar por ese contexto y ver cuándo empiezan a aparecer eventos).</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Eje Y (Vertical):</strong> Número de eventos.</li>
                        <li><strong>Eje X (Horizontal):</strong> Tiempo (días).</li>
                        <li><strong>Puntos altos:</strong> Días de mayor actividad.</li>
                        <li><strong>Puntos bajos/cero:</strong> Días de menor/nula actividad.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>La granularidad es diaria. Para análisis intra-día, usar "Eventos por Hora del Día". Este gráfico muestra el volumen agregado; para saber *quién* o *qué* generó la actividad en un pico, se necesitan filtros adicionales o cruzar con otros gráficos.</p>`
    },
    componentActivity: {
        title: "Ayuda: Actividad por Componente (Top N)",
        content: `<p>Este gráfico (generalmente dona, pastel o barras) muestra la proporción o el total de eventos asociados a cada componente de Moodle (ej. Foro, Tarea, Cuestionario, Sistema, URL, Recurso). El dashboard muestra los N componentes principales por defecto, y el modal todos los componentes con actividad (o todos los base si "Incluir ítems con 0 actividad" está activo).</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Ayuda a entender qué tipos de herramientas o categorías de recursos son los más (o menos) utilizados, reflejando dónde concentran su esfuerzo los alumnos o qué partes del diseño del curso generan más interacción.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Popularidad de herramientas:</strong> ¿Qué tipos de actividades o recursos (Foros, Tareas, Cuestionarios, Archivos) son los más utilizados en general o en un periodo específico?</li>
                        <li><strong>Alineación con diseño pedagógico:</strong> ¿Los componentes que se consideran clave en el diseño del curso (ej. foros para discusión, tareas para evaluación) muestran un uso significativo?</li>
                        <li><strong>Infrautilización o sobreutilización:</strong> ¿Hay componentes importantes que están siendo infrautilizados? ¿O algunos que generan un volumen de actividad inesperadamente alto (que podría ser ruido o actividad superficial)?</li>
                        <li><strong>Foco antes de evaluaciones:</strong> Al filtrar por fechas cercanas a un examen o entrega importante, ¿qué componentes muestran un pico de actividad? (Ej. ¿aumenta el uso de "Recurso" o "Cuestionario"?)</li>
                        <li><strong>Identificación de recursos ignorados:</strong> ¿Hay componentes con recuentos consistentemente bajos o nulos a lo largo de periodos largos? Esto podría indicar que no son útiles, no son visibles, o los alumnos no entienden su propósito.</li>
                        <li><strong>Perfil de uso de un alumno:</strong> Al filtrar por un alumno específico, ¿en qué componentes concentra su actividad? ¿Es un perfil de uso balanceado o se enfoca en pocos tipos de herramientas?</li>
                        <li><strong>Actividad administrativa vs. pedagógica:</strong> Un alto uso del componente "Sistema" puede indicar muchos inicios/cierres de sesión, cambios de configuración, etc., que no son directamente interacciones pedagógicas. Esto puede ser útil para "limpiar" la visión si se excluye este componente en un análisis posterior.</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Cada sector/barra:</strong> Representa un componente. Su tamaño es proporcional al número de eventos asociados a él.</li>
                        <li><strong>Opción "Incluir ítems con 0 actividad":</strong> Si está activa, puede mostrar componentes con 0 eventos si estos existen en el dataset original pero los filtros actuales han reducido su cuenta a cero. Es útil para ver qué componentes *no* se usaron en un contexto filtrado.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Este gráfico muestra el volumen de actividad por *tipo* de componente, no por instancia específica (para eso, ver "Actividad por Contexto"). Por ejemplo, "Foro" agrupa todos los eventos de todos los foros. Un alto uso de "Sistema" puede ser normal, pero es bueno tenerlo en cuenta al interpretar la actividad "pedagógica".</p>`
    },
    activityByHour: {
        title: "Ayuda: Eventos por Hora del Día",
        content: `<p>Este gráfico de barras muestra el número total de eventos agrupados por cada hora del día (formato 24 horas), acumulando todos los días del periodo seleccionado y con los filtros aplicados.</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Permite identificar los patrones de acceso y actividad a lo largo de un día típico, revelando las "horas pico" y los periodos de menor actividad.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Horas de mayor actividad ("Prime Time"):</strong> ¿En qué franjas horarias se concentra la mayor parte de la actividad de los alumnos?</li>
                        <li><strong>Actividad nocturna/temprana:</strong> ¿Hay una cantidad significativa de actividad en horarios nocturnos o muy temprano por la mañana? Esto podría indicar hábitos de estudio específicos o, en combinación con filtros de IP, actividad desde diferentes zonas horarias.</li>
                        <li><strong>Patrones de un alumno específico:</strong> Al filtrar por un alumno, ¿cuáles son sus horas de estudio preferidas o más productivas? ¿Muestra un patrón consistente o errático?</li>
                        <li><strong>"Atracones" de estudio (Cramming):</strong> Si se filtra por un alumno y un día específico (o un rango corto) justo antes de una entrega, ¿la actividad se concentra intensamente en ciertas horas, posiblemente intempestivas?</li>
                        <li><strong>Disponibilidad para soporte:</strong> Si se planea ofrecer tutorías en vivo o soporte técnico, conocer las horas pico de actividad puede ayudar a programarlas de manera más efectiva.</li>
                        <li><strong>Actividad sospechosa:</strong> Al filtrar por una IP específica o un alumno bajo sospecha, ¿se observa actividad en horarios completamente inusuales o patrones que no concuerdan con el comportamiento esperado (ej. actividad constante 24h)?</li>
                        <li><strong>Uso de recursos específicos por hora:</strong> Al filtrar por un "Componente" (ej. "Cuestionario") o "Contexto del evento" (ej. un foro específico), ¿en qué horas se accede más a ellos?</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Eje Y (Vertical):</strong> Número de eventos.</li>
                        <li><strong>Eje X (Horizontal):</strong> Horas del día (00:00 a 23:00).</li>
                        <li><strong>Barras altas:</strong> Horas con mayor concentración de eventos.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Este gráfico agrega la actividad de todos los días seleccionados. Un pico a las 10:00 no significa que todos los días hubo un pico a esa hora, sino que, en promedio, esa hora es muy activa. Para ver la evolución diaria, usar "Eventos por Día". La zona horaria de los logs es crucial para una interpretación correcta.</p>`
    },
     activityByDayOfWeek: {
        title: "Ayuda: Eventos por Día de Semana",
        content: `<p>Este gráfico de barras muestra el número total de eventos agrupados por cada día de la semana (Lunes a Domingo), acumulando la actividad de todas las semanas dentro del periodo seleccionado y con los filtros aplicados.</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Permite identificar si hay días de la semana con patrones de actividad consistentemente más altos o más bajos, reflejando los hábitos de estudio semanales.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Ritmo semanal:</strong> ¿Cómo se distribuye la actividad a lo largo de una semana típica? ¿Hay un "crescendo" hacia el final de la semana laboral o un pico durante el fin de semana?</li>
                        <li><strong>Días de mayor/menor carga:</strong> ¿Qué días de la semana concentran la mayor cantidad de interacciones? Esto podría influir en cuándo liberar nuevo material o programar recordatorios.</li>
                        <li><strong>Actividad en fines de semana:</strong> ¿Los fines de semana son periodos de alta o baja actividad? Esto varía mucho según el perfil del alumnado (ej. profesionales vs. estudiantes a tiempo completo).</li>
                        <li><strong>Patrón de un alumno:</strong> Al filtrar por un alumno específico, ¿tiene días preferidos para estudiar o su actividad es uniforme?</li>
                        <li><strong>Uso de componentes por día de semana:</strong> Al filtrar por un "Componente" (ej. "Foro"), ¿se usa más en ciertos días de la semana (ej. discusiones más activas los miércoles)?</li>
                        <li><strong>Planificación de entregas:</strong> Si las entregas suelen ser los viernes, ¿se observa un aumento de actividad los jueves y viernes en componentes como "Tarea" o "Recurso"?</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Eje Y (Vertical):</strong> Número de eventos.</li>
                        <li><strong>Eje X (Horizontal):</strong> Días de la semana.</li>
                        <li><strong>Barras altas:</strong> Días de la semana con, en promedio, más eventos.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Este gráfico promedia la actividad a lo largo de todas las semanas en el rango. Un lunes muy activo no significa que *todos* los lunes fueron así, sino que los lunes, en conjunto, tuvieron más actividad. Para variaciones semana a semana, observar "Eventos por Día" en un rango más largo.</p>`
    },
    componentBreakdown: {
        title: "Ayuda: Desglose Eventos en Componentes",
        content: `<p>Este gráfico de barras muestra los componentes más utilizados (eje X o Y según configuración) y, para cada uno, desglosa los tipos de "Nombre evento" más frecuentes dentro de ellos (barras apiladas o agrupadas).</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Ofrece una visión más granular de la interacción: no solo *cuánto* se usa un componente (volumen total), sino *cómo* se usa (qué acciones específicas se realizan dentro de él).</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Naturaleza de la interacción:</strong> Dentro de los componentes más populares, ¿cuáles son las acciones específicas más comunes?
                            <ul>
                                <li>Ejemplo: En el componente "Tarea", ¿hay más eventos de "Se ha visualizado la tarea" (consumo de información) o de "Se ha enviado una entrega" (acción productiva)?</li>
                                <li>Ejemplo: En "Foro", ¿predominan los eventos de "Discusión vista" o los de "Mensaje creado"?</li>
                            </ul>
                        </li>
                        <li><strong>Profundidad vs. superficialidad:</strong> ¿Un alto volumen en "Actividad por Componente" para "Recurso" se traduce en muchos eventos de "Recurso visto", o hay otros eventos (ej. relacionados con finalización de actividad si está configurado)?</li>
                        <li><strong>Análisis de comportamiento específico:</strong> Si se sospecha de un comportamiento anómalo por parte de un alumno (filtrando por él), ¿qué acciones específicas está realizando en los componentes que más utiliza?</li>
                        <li><strong>Diseño de actividades:</strong> ¿La forma en que los alumnos interactúan con un componente (los eventos predominantes) se alinea con el propósito pedagógico de ese componente/actividad?</li>
                        <li><strong>Identificación de "ruido":</strong> Ciertos eventos pueden ser muy frecuentes pero poco significativos (ej. "Módulo del curso visto" puede ocurrir muchas veces por navegación). Este gráfico ayuda a distinguirlos de acciones más deliberadas.</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Cada barra principal:</strong> Representa un componente.</li>
                        <li><strong>Segmentos dentro de la barra (o barras agrupadas):</strong> Representan los diferentes "Nombre evento" y su frecuencia relativa dentro de ese componente.</li>
                        <li>El modal suele mostrar un desglose más completo (más componentes y más eventos por componente).</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>La interpretación depende de conocer el significado de los "Nombre evento" específicos de Moodle. Algunos pueden ser muy técnicos. La utilidad aumenta al combinarlo con filtros por "Contexto del evento" para analizar un recurso o actividad específica.</p>`
    },
    activityByContext: {
        title: "Ayuda: Actividad por Contexto (Top N)",
        content: `<p>Este gráfico de barras lista los "Contexto del evento" específicos (ej. nombres de cursos, nombres de actividades como "Tarea: Ensayo Final", "Foro: Dudas Tema 1") ordenados por el número de eventos asociados. Muestra las instancias particulares de recursos o actividades que generan más interacción.</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Es muy útil para ver qué actividades, recursos o secciones específicas dentro de un curso están generando más (o menos) interacción, yendo más allá del tipo de componente general.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>"Puntos calientes" del curso:</strong> ¿Cuáles son las actividades, recursos o foros específicos que concentran la mayor actividad?</li>
                        <li><strong>Popularidad de materiales:</strong> ¿Qué "Recurso" o "URL" específico es el más visitado?</li>
                        <li><strong>Participación en actividades:</strong> ¿Qué "Tarea" o "Cuestionario" específico genera más eventos (intentos, visualizaciones, envíos)?</li>
                        <li><strong>Foros más dinámicos:</strong> Si se filtra por componente "Foro", este gráfico mostrará qué foros particulares tienen más actividad.</li>
                        <li><strong>Progreso en módulos/temas:</strong> Si los contextos reflejan la estructura del curso (ej. "Módulo 1: Introducción", "Tema 2.1: Conceptos Clave"), se puede ver qué partes están siendo más trabajadas. Filtrando por un alumno, se puede ver su actividad en contextos específicos de un módulo.</li>
                        <li><strong>Recursos ignorados o problemáticos:</strong> ¿Hay contextos de actividades o recursos importantes con muy baja actividad? Podría indicar que no son atractivos, son difíciles de encontrar, o los alumnos no perciben su valor.</li>
                        <li><strong>Foco pre-evaluación:</strong> Al filtrar por fechas cercanas a un examen, ¿qué contextos de recursos o actividades de repaso son los más accedidos?</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Cada barra:</strong> Representa un contexto de evento específico. Su longitud es proporcional al número de eventos ocurridos en ese contexto.</li>
                        <li><strong>Opción "Incluir ítems con 0 actividad":</strong> Puede mostrar contextos con 0 eventos si existen en el dataset original pero los filtros actuales (ej. un alumno que no accedió a esa actividad) han reducido su cuenta a cero.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Los nombres de los contextos pueden ser largos. El modal es útil para verlos completos. Este gráfico es poderoso cuando se combina con filtros de "Componente" (para ver instancias de un tipo de actividad) o "Alumno" (para ver el foco de un individuo).</p>`
    },
    scatterUsersEventsDay: {
        title: "Ayuda: Usuarios Únicos vs Eventos (por Día)",
        content: `<p>Diagrama de dispersión donde cada punto representa un día dentro del rango y filtros seleccionados.</p>
                    <ul>
                        <li><strong>Eje X (Horizontal):</strong> Número de usuarios únicos que estuvieron activos ese día.</li>
                        <li><strong>Eje Y (Vertical):</strong> Número total de eventos registrados ese día.</li>
                        <li><strong>Tooltip (al pasar el ratón sobre un punto):</strong> Muestra la fecha específica del día, el número de usuarios únicos y el total de eventos.</li>
                    </ul>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Permite identificar la naturaleza de la actividad diaria: si fue generalizada (muchos usuarios) o intensa (muchos eventos), o una combinación. Ayuda a clasificar los días según su perfil de actividad.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Días de alta participación general:</strong> Puntos en la esquina superior derecha (muchos usuarios, muchos eventos). ¿Coinciden con inicios de módulo, anuncios importantes, o actividades colaborativas?</li>
                        <li><strong>Días de actividad intensa por pocos:</strong> Puntos en la esquina superior izquierda (pocos usuarios, muchos eventos). ¿Podría indicar que unos pocos usuarios muy activos dominaron la actividad, o quizás actividad administrativa o de profesores (si no están filtrados)?</li>
                        <li><strong>Días de actividad ligera pero extendida:</strong> Puntos en la esquina inferior derecha (muchos usuarios, pocos eventos). ¿Sugiere que muchos alumnos hicieron pequeñas interacciones (ej. revisar algo rápido)?</li>
                        <li><strong>Días de baja actividad general:</strong> Puntos en la esquina inferior izquierda (pocos usuarios, pocos eventos). ¿Son fines de semana, vacaciones, o periodos de transición?</li>
                        <li><strong>Correlación:</strong> ¿Existe una tendencia general? ¿A medida que aumenta el número de usuarios activos, aumenta también el total de eventos (pendiente positiva)? ¿O es disperso?</li>
                        <li><strong>Identificación de días anómalos:</strong> ¿Hay días que se desvían significativamente del patrón general? Estos podrían merecer una investigación más profunda (ej. aplicando filtros de ese día específico y viendo otros gráficos).</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Puntos agrupados:</strong> Indican un patrón de actividad diaria común.</li>
                        <li><strong>Puntos aislados (outliers):</strong> Días con características de actividad inusuales.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Este gráfico no dice *qué* hicieron los usuarios o *en qué* componentes, solo cuántos fueron y cuánto hicieron en agregado. Se complementa bien con "Eventos por Día" para la secuencia temporal y otros gráficos para el detalle de la actividad en esos días específicos.</p>`
    },
    scatterComponentsEventsUser: {
        title: "Ayuda: Componentes Únicos vs Eventos (por Alumno)",
        content: `<p>Diagrama de dispersión donde cada punto representa un alumno que cumple con los filtros.</p>
                    <ul>
                        <li><strong>Eje X (Horizontal):</strong> Número de componentes Moodle únicos con los que el alumno interactuó.</li>
                        <li><strong>Eje Y (Vertical):</strong> Número total de eventos (interacciones) generados por ese alumno.</li>
                        <li><strong>Tooltip (al pasar el ratón sobre un punto):</strong> Muestra el nombre del alumno, su número de componentes únicos y su total de eventos.</li>
                    </ul>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Permite clasificar a los alumnos según su patrón de exploración (variedad de componentes usados) y su volumen de actividad total. Ayuda a identificar diferentes perfiles de comportamiento.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Perfil de Alumnos:</strong>
                            <ul>
                                <li><em>Exploradores Activos (Arriba-Derecha):</em> Alumnos que usan muchos componentes diferentes y además son muy activos en general.</li>
                                <li><em>Enfocados Activos (Arriba-Izquierda):</em> Alumnos que se concentran en pocos componentes pero son muy activos en ellos.</li>
                                <li><em>Exploradores Superficiales (Abajo-Derecha):</em> Alumnos que prueban muchos componentes diferentes pero con poca interacción total en cada uno o en general.</li>
                                <li><em>Poco Activos/Enfocados (Abajo-Izquierda):</em> Alumnos con baja actividad general y que usan pocos componentes. Podrían ser alumnos en riesgo.</li>
                            </ul>
                        </li>
                        <li><strong>Diversidad de uso:</strong> ¿La mayoría de los alumnos explora una amplia gama de las herramientas ofrecidas, o tienden a especializarse en unas pocas?</li>
                        <li><strong>Relación entre exploración y actividad:</strong> ¿Los alumnos que usan más tipos de componentes tienden también a tener más eventos totales, o no hay una correlación clara?</li>
                        <li><strong>Identificación para intervención:</strong> Alumnos en la zona inferior izquierda podrían necesitar un empujón o guía para explorar más el curso o interactuar más profundamente.</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li>La posición de un alumno en el gráfico da una idea de su "estilo" de interacción con la plataforma.</li>
                        <li>Agrupaciones de puntos pueden indicar perfiles comunes de alumnos.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>No considera *qué* componentes específicos se usaron, solo cuántos tipos diferentes. Se puede complementar filtrando por un alumno específico y luego viendo sus gráficos de "Actividad por Componente" o "Actividad por Contexto" para entender en qué se enfoca.</p>`
    },
    scatterContentViewParticipation: {
        title: "Ayuda: Visualización vs Participación (por Alumno)",
        content: `<p>Diagrama de dispersión donde cada punto representa un alumno.</p>
                    <ul>
                        <li><strong>Eje X (Horizontal):</strong> Número de eventos que coinciden con los "Patrones de Eventos de Visualización" definidos en Configuración (ej. "visto", "consultado").</li>
                        <li><strong>Eje Y (Vertical):</strong> Número de eventos que coinciden con los "Patrones de Eventos de Participación" (ej. "enviado", "respondido", "creado") Y que NO son también de visualización.</li>
                        <li><strong>Tooltip (al pasar el ratón sobre un punto):</strong> Muestra el nombre del alumno y sus conteos de eventos de visualización y participación.</li>
                    </ul>
                    <p><em>La efectividad de este gráfico depende crucialmente de la correcta configuración de los patrones de eventos en el modal de Configuración.</em></p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Permite identificar diferentes perfiles de interacción de los alumnos, distinguiendo entre quienes consumen contenido principalmente y quienes participan activamente creando o respondiendo.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Perfiles de Interacción:</strong>
                            <ul>
                                <li><em>Consumidores / "Lurkers" (Abajo-Derecha):</em> Alta visualización, baja participación. Leen mucho, pero aportan poco.</li>
                                <li><em>Creadores / Participantes Activos (Arriba-Izquierda):</em> Alta participación, baja visualización (relativamente). Quizás ya conocen el material o van directo a la acción.</li>
                                <li><em>Comprometidos (Arriba-Derecha):</em> Activos tanto en visualización como en participación.</li>
                                <li><em>Desconectados / Mínimamente Activos (Abajo-Izquierda):</em> Baja actividad en ambas dimensiones. Potenciales alumnos en riesgo.</li>
                            </ul>
                        </li>
                        <li><strong>Fomento de la participación:</strong> Si hay muchos alumnos en el perfil "Consumidor", ¿se podrían diseñar actividades que incentiven más la participación activa?</li>
                        <li><strong>Equilibrio en el curso:</strong> ¿El diseño del curso promueve un equilibrio entre consumo de información y participación, o sesga hacia uno de los dos?</li>
                        <li><strong>Validación de patrones:</strong> ¿Los alumnos que se perciben como más participativos en clase (si aplica) aparecen en las zonas esperadas del gráfico?</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li>La posición de un alumno indica su tendencia a consumir vs. crear/interactuar.</li>
                        <li>Es importante revisar y ajustar los patrones de eventos en Configuración para que reflejen adecuadamente lo que se considera "visualización" y "participación" en el contexto del curso.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>La clasificación de eventos es binaria (visualización o participación). Un evento no puede ser ambos para este gráfico (la participación tiene prioridad si un evento coincide con ambos patrones y así está definido). La calidad o relevancia de la participación no se mide aquí.</p>`
    },
    bubbleStudentAnalysis: {
        title: "Ayuda: Análisis Alumnos (Burbujas)",
        content: `<p>Diagrama de burbujas donde cada burbuja representa un alumno.</p>
                    <ul>
                        <li><strong>Eje X (Horizontal):</strong> Número de días distintos en los que el alumno tuvo actividad (Constancia).</li>
                        <li><strong>Eje Y (Vertical):</strong> Promedio de eventos del alumno por cada día que estuvo activo (Intensidad diaria promedio).</li>
                        <li><strong>Tamaño de la Burbuja (R):</strong> Número total de eventos del alumno (Volumen total de actividad). El valor numérico exacto del total de eventos se muestra en el tooltip.</li>
                        <li><strong>Tooltip:</strong> Muestra el nombre del alumno y los valores de los tres ejes.</li>
                    </ul>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Proporciona una visión multidimensional de la actividad de cada alumno, combinando su constancia, la intensidad de su trabajo cuando está activo, y su volumen total de interacciones. Permite una segmentación más rica de los perfiles de alumnos.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Perfiles de Alumnos Detallados:</strong>
                            <ul>
                                <li><em>Estrellas (Arriba-Derecha, Burbuja Grande):</em> Constantes, intensos en su actividad diaria, y con alto volumen total.</li>
                                <li><em>Trabajadores Constantes (Centro/Izquierda-Derecha, Y Media, Burbuja Mediana/Grande):</em> Activos muchos días, pero quizás con una intensidad diaria más moderada.</li>
                                <li><em>"Sprinters" / Intensivos Ocasionales (Arriba-Izquierda, Burbuja Mediana/Grande):</em> Activos pocos días, pero con mucha intensidad en esos días (posible "atracón").</li>
                                <li><em>Actividad Ligera y Esporádica (Abajo-Izquierda, Burbuja Pequeña):</em> Pocos días activos, baja intensidad diaria, bajo volumen total. Alumnos potencialmente en riesgo.</li>
                                <li><em>Constantes pero Superficiales (Abajo-Derecha, Burbuja Mediana):</em> Activos muchos días, pero con muy poca interacción cada vez.</li>
                            </ul>
                        </li>
                        <li><strong>Identificación de patrones de riesgo:</strong> Alumnos con burbujas pequeñas consistentemente en la zona inferior izquierda a lo largo de diferentes periodos del curso.</li>
                        <li><strong>Comparación relativa:</strong> ¿Cómo se compara el perfil de actividad de un alumno (constancia, intensidad, volumen) con el de sus compañeros?</li>
                        <li><strong>Efectividad de estrategias:</strong> ¿Una estrategia para fomentar la actividad regular (constancia) se refleja en un movimiento de las burbujas hacia la derecha?</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li>La combinación de posición y tamaño de la burbuja ofrece un perfil de actividad completo.</li>
                        <li>Es útil buscar agrupaciones de burbujas para identificar perfiles comunes.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Como otros gráficos de actividad, no mide la calidad del aprendizaje, solo patrones de interacción. Puede ser muy útil para iniciar conversaciones con alumnos sobre sus hábitos de estudio.</p>`
    },
    bubbleComponentAnalysis: {
        title: "Ayuda: Análisis Componentes (Burbujas)",
        content: `<p>Diagrama de burbujas donde cada burbuja representa un componente Moodle (ej. Foro, Tarea, URL).</p>
                    <ul>
                        <li><strong>Eje X (Horizontal):</strong> Número de usuarios únicos que interactuaron con ese componente (Alcance).</li>
                        <li><strong>Eje Y (Vertical):</strong> Número total de eventos registrados para ese componente (Volumen de uso).</li>
                        <li><strong>Tamaño de la Burbuja (R):</strong> Promedio de eventos por usuario para ese componente (Profundidad de uso por quien accede). El valor numérico exacto se muestra en el tooltip.</li>
                        <li><strong>Tooltip:</strong> Muestra el nombre del componente y los valores de los tres ejes.</li>
                    </ul>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Permite clasificar los componentes del curso según su alcance (cuántos los usan), volumen de interacción que generan, y la profundidad con la que son utilizados por aquellos que acceden. Ayuda a entender el rol de cada tipo de herramienta.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Perfiles de Componentes:</strong>
                            <ul>
                                <li><em>Populares y Profundos (Arriba-Derecha, Burbuja Grande):</em> Usados por muchos alumnos, generan muchos eventos, y cada alumno que los usa interactúa intensamente. Componentes centrales y muy utilizados.</li>
                                <li><em>Populares pero Superficiales (Abajo-Derecha, Burbuja Pequeña):</em> Usados por muchos, pero cada uno interactúa poco. Podrían ser para consulta rápida. El eje Y (Total Eventos) también será relevante aquí; si es alto, muchos hacen poco, si es bajo, la popularidad es solo nominal.</li>
                                <li><em>De Nicho e Intensivos (Arriba-Izquierda, Burbuja Grande):</em> Usados por pocos alumnos, pero quienes los usan lo hacen muy intensamente. Herramientas especializadas o para grupos específicos.</li>
                                <li><em>Poco Usados / Superficiales (Abajo-Izquierda, Burbuja Pequeña):</em> Bajo alcance, bajo volumen, y baja profundidad. Componentes posiblemente infrautilizados o de bajo impacto.</li>
                            </ul>
                        </li>
                        <li><strong>Optimización de recursos:</strong> ¿Componentes con alto volumen (Y alto) pero baja profundidad por usuario (R pequeña) podrían ser rediseñados para fomentar una interacción más significativa?</li>
                        <li><strong>Identificación de herramientas clave:</strong> Componentes en la zona superior derecha son probablemente cruciales para la mayoría.</li>
                        <li><strong>Recursos complementarios:</strong> ¿Hay componentes de nicho (izquierda) que son vitales para un pequeño grupo y deben mantenerse?</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li>La posición y tamaño de la burbuja revelan el patrón de uso agregado de cada tipo de componente.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Agrupa todos los eventos de todas las instancias de un tipo de componente (ej. todos los foros). Para análisis de instancias específicas, usar "Actividad por Contexto" o el gráfico de burbujas de contextos.</p>`
    },
    bubbleContextAnalysis: {
        title: "Ayuda: Análisis Contextos (Burbujas)",
        content: `<p>Diagrama de burbujas donde cada burbuja representa un contexto de evento específico (ej. un curso, una tarea específica, un foro particular).</p>
                    <ul>
                        <li><strong>Eje X (Horizontal):</strong> Número de alumnos únicos activos en ese contexto (Alcance del contexto).</li>
                        <li><strong>Eje Y (Vertical):</strong> Promedio de eventos por alumno en ese contexto (Intensidad de interacción por alumno).</li>
                        <li><strong>Tamaño de la Burbuja (R):</strong> Número total de eventos en ese contexto (Volumen total de actividad del contexto). El valor numérico exacto se muestra en el tooltip.</li>
                        <li><strong>Tooltip:</strong> Muestra el nombre del contexto y los valores de los tres ejes.</li>
                    </ul>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Evalúa el alcance y la intensidad de la interacción con diferentes partes específicas del curso (actividades, recursos individuales). Es más granular que el análisis de componentes.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Perfiles de Actividades/Recursos Específicos:</strong>
                            <ul>
                                <li><em>Estrellas del Curso (Arriba-Derecha, Burbuja Grande):</em> Contextos accedidos por muchos alumnos, cada uno interactúa intensamente, y generan un alto volumen de actividad total. Son probablemente las actividades/recursos más importantes y atractivos.</li>
                                <li><em>Amplio Alcance, Interacción Ligera (Abajo-Derecha, Burbuja Mediana/Grande, Y baja):</em> Contextos accedidos por muchos alumnos, pero cada uno interactúa poco. Podrían ser anuncios, instrucciones generales, o recursos de consulta rápida.</li>
                                <li><em>Foco Intensivo de Nicho (Arriba-Izquierda, Burbuja Mediana/Grande, X baja):</em> Contextos accedidos por pocos alumnos, pero estos interactúan mucho. Podrían ser actividades optativas, para grupos avanzados, o foros especializados.</li>
                                <li><em>Bajo Impacto (Abajo-Izquierda, Burbuja Pequeña):</em> Contextos con poco alcance, baja intensidad por alumno y bajo volumen. Podrían ser actividades/recursos ignorados, poco claros o de baja relevancia percibida.</li>
                            </ul>
                        </li>
                        <li><strong>Identificación de contenidos "gancho":</strong> ¿Qué actividades o recursos específicos (contextos) son más populares y generan más trabajo o interés por parte de los alumnos?</li>
                        <li><strong>Problemas de diseño o relevancia:</strong> Contextos en la zona inferior izquierda, especialmente si se esperaba que fueran importantes, podrían necesitar revisión en su diseño, visibilidad o instrucciones.</li>
                        <li><strong>Comparación entre actividades similares:</strong> Si hay varias tareas o foros, ¿cómo se comparan en este gráfico en términos de alcance, intensidad y volumen?</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li>Permite una comparación directa del "rendimiento" (en términos de interacción) de diferentes elementos del curso.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Los nombres de los contextos pueden ser largos. Un contexto muy general como el nombre del curso puede aparecer con mucho alcance y volumen pero baja intensidad promedio si muchas acciones son solo "ver el curso". Es útil filtrar por componentes para analizar contextos de un tipo específico (ej. todos los contextos de Tareas).</p>`
    },
    topIPsByEvents: {
        title: "Ayuda: Top IPs por Número de Eventos",
        content: `<p>Gráfico de barras que muestra las direcciones IP desde las cuales se ha originado el mayor número de eventos, dentro del periodo y filtros seleccionados. El dashboard muestra un Top N, el modal puede mostrar más.</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Identifica fuentes de red con alto volumen de actividad. Puede ayudar a detectar IPs compartidas (ej. laboratorios, bibliotecas), el uso de VPNs (si las IPs son geográficamente dispersas o de datacenters), o actividad anómala si una IP desconocida muestra un volumen desproporcionado.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Fuentes de alto tráfico:</strong> ¿Cuáles son las IPs que generan más interacciones/eventos?</li>
                        <li><strong>IPs compartidas:</strong> ¿Hay IPs que destacan significativamente, sugiriendo un uso por múltiples personas o sistemas (ej. IP de un campus, un proxy institucional)? Comparar con "Top IPs por N° Alumnos" para confirmar.</li>
                        <li><strong>Actividad anómala:</strong> ¿Aparece una IP inesperada (ej. no institucional, de otro país) con un volumen de eventos muy alto? Podría ser una señal de alerta si se combina con otros indicadores (ej. acceso a horas inusuales, actividad de un solo usuario desde esa IP).</li>
                        <li><strong>Uso de un alumno desde múltiples IPs:</strong> Si se filtra por un alumno específico, este gráfico mostrará las IPs desde las que ha accedido y el volumen de actividad desde cada una.</li>
                        <li><strong>Problemas de acceso:</strong> Si se sospecha que un alumno tiene problemas de conexión, ¿su actividad se concentra en una IP o se dispersa mucho con bajo volumen en cada una?</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Barras largas:</strong> IPs con mayor número de eventos asociados.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Una IP con muchos eventos no implica necesariamente algo negativo; puede ser la IP de un usuario muy activo o una IP compartida legítima. Este gráfico es más útil como herramienta exploratoria o de diagnóstico cuando se combina con otros filtros (usuario, fecha) o se investigan anomalías.</p>`
    },
    usersPerIP: {
        title: "Ayuda: Top IPs por Número de Alumnos Únicos",
        content: `<p>Gráfico de barras que muestra las direcciones IP que han sido utilizadas por el mayor número de alumnos únicos diferentes, dentro del periodo y filtros seleccionados. El dashboard muestra un Top N, el modal puede mostrar más.</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Es un fuerte indicador de puntos de acceso compartidos, como redes Wi-Fi de campus, laboratorios de computación, bibliotecas, o incluso cibercafés. También puede ayudar a identificar si varios alumnos están accediendo desde una misma red doméstica.</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Puntos de acceso comunes:</strong> ¿Qué IPs son utilizadas por la mayor cantidad de estudiantes distintos? Esto confirma la existencia de redes compartidas.</li>
                        <li><strong>Magnitud del uso compartido:</strong> ¿Cuántos alumnos diferentes suelen usar esas IPs compartidas principales?</li>
                        <li><strong>Identificación de alumnos por IP compartida:</strong> Si se identifica una IP compartida de interés (ej. la del laboratorio X), se puede luego filtrar por esa IP específica en los controles principales y ver el gráfico "Actividad por Alumno" para saber quiénes accedieron desde allí.</li>
                        <li><strong>Colaboración o suplantación (con cautela):</strong> Si una IP que no se espera sea compartida (ej. una IP residencial) es usada por múltiples alumnos en un corto periodo, especialmente durante una evaluación, podría ser una bandera amarilla para investigar más (pero NO es prueba concluyente de nada).</li>
                        <li><strong>Impacto de problemas de red local:</strong> Si una IP institucional importante (ej. Wi-Fi del campus) desaparece o muestra pocos usuarios, podría indicar un problema técnico en esa red.</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Barras largas:</strong> IPs utilizadas por un mayor número de alumnos únicos.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>Las IPs dinámicas pueden hacer que un mismo usuario aparezca con varias IPs o que varias IPs residenciales distintas sean usadas por el mismo hogar a lo largo del tiempo. Este gráfico es más fiable para identificar IPs institucionales o claramente compartidas.</p>`
    },
    ipsPerUser: {
        title: "Ayuda: Top Alumnos por Número de IPs Únicas",
        content: `<p>Gráfico de barras que muestra los alumnos que han accedido a la plataforma desde el mayor número de direcciones IP únicas diferentes, dentro del periodo y filtros seleccionados. El dashboard muestra un Top N, el modal puede mostrar más.</p>
                    <h4>Utilidad y Casos de Uso</h4>
                    <p>Identifica a los alumnos con mayor "movilidad" digital, es decir, que acceden desde múltiples dispositivos, redes o ubicaciones. También puede ser un indicador del uso de VPNs si el número de IPs es muy alto y geográficamente diverso (aunque la geolocalización no está en este visor).</p>
                    <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
                    <ul>
                        <li><strong>Movilidad del alumnado:</strong> ¿Qué alumnos acceden desde una mayor variedad de lugares o dispositivos?</li>
                        <li><strong>Patrones de acceso típicos:</strong> ¿Es normal que los alumnos usen 2-3 IPs (ej. casa, universidad, móvil) o hay algunos con un número mucho mayor?</li>
                        <li><strong>Uso de VPNs o proxies:</strong> Un número excepcionalmente alto de IPs para un solo alumno, especialmente si cambian rápidamente, podría sugerir el uso de servicios que enmascaran la IP.</li>
                        <li><strong>Problemas de identidad (con mucha cautela):</strong> Si un alumno tiene un número extremadamente alto de IPs y otros comportamientos sospechosos, podría ser un (débil) indicador a considerar en una investigación más amplia. NO es prueba de nada por sí solo.</li>
                        <li><strong>Consistencia de acceso:</strong> ¿Un alumno accede consistentemente desde un conjunto pequeño de IPs y de repente empieza a usar muchas más o IPs muy diferentes? Esto podría verse al filtrar por ese alumno y observar este gráfico en diferentes periodos.</li>
                    </ul>
                    <h4>Interpretación</h4>
                    <ul>
                        <li><strong>Barras largas:</strong> Alumnos que han utilizado un mayor número de IPs únicas.</li>
                    </ul>
                    <h4>Consideraciones</h4>
                    <p>El uso de múltiples IPs es común y generalmente benigno (múltiples dispositivos, redes Wi-Fi cambiantes). Este gráfico es más útil para identificar casos extremos o para entender la diversidad de acceso de los alumnos, más que para inferir comportamientos problemáticos sin más evidencia.</p>`
    },
    quizTimeDistribution: {
        title: "Ayuda: Distribución Tiempos de Intentos de Cuestionario", 
        content: `
            <h4>Descripción</h4>
            <p>Este gráfico es un histograma que muestra la distribución de los tiempos totales (en segundos) que los alumnos tardaron en completar cada uno de sus <strong>intentos individuales de cuestionario</strong>. La aplicación identifica cada vez que un intento es iniciado y luego enviado por un alumno; cada una de estas finalizaciones es un "intento individual". El gráfico luego agrupa estos intentos individuales en rangos de tiempo (bins) y muestra cuántos intentos caen en cada rango.</p>
            <p>Por ejemplo, si 20 alumnos realizan un cuestionario una vez, hay 20 intentos individuales. Si 1 alumno realiza un cuestionario 3 veces (si está permitido), eso cuenta como 3 intentos individuales. Sin filtros de contexto, el gráfico considera todos los intentos de todos los alumnos en todos los cuestionarios dentro del periodo analizado.</p>
            <h4>Utilidad y Casos de Uso</h4>
            <p>Permite identificar la "norma" o el tiempo típico de finalización para los intentos de cuestionario analizados, así como detectar valores atípicos (intentos inusualmente cortos o largos). Útil para entender la dificultad percibida o el tiempo real que demanda un cuestionario.</p>
            <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
            <ul>
                <li><strong>Tiempo de finalización típico:</strong> ¿Cuál es el rango de tiempo (bin) donde se concentra la mayoría de los intentos individuales? Esto da una idea del tiempo "esperado" para completar los cuestionarios.</li>
                <li><strong>Intentos muy rápidos:</strong> ¿Hay una cantidad significativa de intentos individuales en los bins de menor duración? Si se combina con un filtro por un cuestionario específico que se sabe es complejo, tiempos muy cortos podrían ser una señal para revisión.</li>
                <li><strong>Intentos muy largos:</strong> ¿Hay muchos intentos individuales que toman mucho más tiempo que el promedio? Esto podría indicar que los alumnos encuentran difícil el material, experimentan problemas técnicos, o son muy meticulosos.</li>
                <li><strong>Adecuación del tiempo asignado:</strong> Si se trata de un cuestionario con tiempo límite, ¿la mayoría de los intentos individuales finalizan cómodamente dentro del tiempo, o hay muchos agrupados cerca del límite?</li>
                <li><strong>Comparación entre cuestionarios (con filtros):</strong> Al filtrar por "Contexto del evento" para cuestionarios específicos, ¿cómo varía la distribución de tiempos de sus intentos individuales? ¿Un cuestionario es consistentemente más rápido/lento de completar que otro?</li>
            </ul>
            <h4>Interpretación</h4>
            <ul>
                <li><strong>Eje X (Horizontal):</strong> Rangos de duración de los intentos individuales (ej. 0-60s, 60-120s).</li>
                <li><strong>Eje Y (Vertical):</strong> El número de <strong>intentos individuales</strong> cuya duración cae dentro de ese rango específico.</li>
                <li><strong>Concentración de barras:</strong> Indica el rango de tiempo más común para un intento individual.</li>
                <li><strong>Barras en los extremos:</strong> Representan intentos individuales que se desvían significativamente de la media.</li>
            </ul>
            <h4>Consideraciones</h4>
            <p>Sin filtros adicionales por "Contexto del evento" (es decir, por un cuestionario específico), este gráfico agrega los tiempos de todos los intentos individuales de todos los cuestionarios que cumplen los filtros generales. La complejidad, longitud y tipo de preguntas de cada cuestionario afectan drásticamente los tiempos de finalización. Por ello, este gráfico es más potente al analizar cuestionarios específicos (filtrando por su contexto) o comparando tipos de cuestionarios.</p>`
    },
    avgQuizTimePerUser: {
        title: "Ayuda: Tiempo Promedio por Intento (Alumno)",
        content: `
            <h4>Descripción</h4>
            <p>Este gráfico de barras horizontales muestra el tiempo promedio (en segundos) que cada alumno tardó por cada intento de cuestionario realizado, considerando todos los intentos que cumplen con los filtros aplicados.</p>
            <h4>Utilidad y Casos de Uso</h4>
            <p>Permite comparar la rapidez o lentitud promedio con la que los alumnos completan los cuestionarios. Puede ayudar a identificar alumnos que son consistentemente más rápidos o más lentos que sus compañeros.</p>
            <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
            <ul>
                <li><strong>Ranking de velocidad promedio:</strong> ¿Qué alumnos tienden a completar los cuestionarios más rápidamente en promedio? ¿Y quiénes más lentamente?</li>
                <li><strong>Consistencia en la velocidad:</strong> Aunque es un promedio, puede dar una primera idea. Si un alumno tiene un promedio muy bajo, ¿es así en todos los cuestionarios o solo en algunos (requiere más filtros)?</li>
                <li><strong>Identificación de posibles problemas:</strong>
                    <ul>
                        <li><em>Promedios muy bajos:</em> ¿Podrían indicar que el alumno no está leyendo cuidadosamente, o que tiene un dominio excepcional, o (en el peor caso, con más evidencia) que no está trabajando honestamente?</li>
                        <li><em>Promedios muy altos:</em> ¿Podrían indicar dificultades de comprensión, problemas de lectura, ansiedad ante las pruebas, o problemas técnicos?</li>
                    </ul>
                </li>
                <li><strong>Comparación entre grupos (si los nombres lo permiten):</strong> ¿Hay diferencias sistemáticas en el tiempo promedio por intento entre diferentes grupos de alumnos?</li>
            </ul>
            <h4>Interpretación</h4>
            <ul>
                <li><strong>Barras cortas:</strong> Alumnos que, en promedio, tardan menos tiempo por intento.</li>
                <li><strong>Barras largas:</strong> Alumnos que, en promedio, tardan más tiempo por intento.</li>
                <li><strong>Opción "Incluir ítems con 0 actividad":</strong> En este contexto, si un alumno no tiene intentos de cuestionario que cumplan los filtros, no aparecerá. Si tuviera intentos pero con duración cero (improbable pero posible por error de log), se mostraría como cero.</li>
            </ul>
            <h4>Consideraciones</h4>
            <p>Este es un promedio de todos los intentos filtrados. Un solo intento muy rápido en un cuestionario fácil, o uno muy largo en uno difícil, puede sesgar el promedio de un alumno si tiene pocos intentos. Para un análisis más fino, es recomendable filtrar por contextos de cuestionarios específicos. No distingue entre el primer intento y reintentos, los cuales pueden tener diferentes duraciones promedio.</p>`
    },
    quizTimeVsPages: {
        title: "Ayuda: Tiempo Intento vs. Páginas Vistas",
        content: `
            <h4>Descripción</h4>
            <p>Este es un diagrama de dispersión donde cada punto representa un único intento de cuestionario.</p>
            <ul>
                <li><strong>Eje X (Horizontal):</strong> Número de páginas únicas del cuestionario que fueron visitadas durante ese intento específico.</li>
                <li><strong>Eje Y (Vertical):</strong> Tiempo total (en segundos) que duró ese intento.</li>
                <li><strong>Tooltip (al pasar el ratón sobre un punto):</strong> Muestra el nombre del alumno, el contexto del cuestionario, el número de páginas vistas y el tiempo del intento.</li>
            </ul>
            <h4>Utilidad y Casos de Uso</h4>
            <p>Contextualiza el tiempo de finalización de un intento con el "esfuerzo" aparente en términos de navegación dentro del cuestionario. Un tiempo corto es menos sospechoso si se vieron pocas páginas (ej. un cuestionario corto o donde el alumno avanzó rápido). Un tiempo corto combinado con la visualización de muchas páginas podría ser un indicador más fuerte para una revisión.</p>
            <p><strong>Preguntas que este gráfico ayuda a responder:</strong></p>
            <ul>
                <li><strong>Intentos anómalos (posible revisión):</strong> ¿Hay intentos que se ubican en la zona inferior derecha del gráfico (muchas páginas vistas, poco tiempo total)? Estos podrían ser los más interesantes para una investigación más detallada si se sospecha de comportamiento irregular.</li>
                <li><strong>Relación tiempo-navegación:</strong> ¿Los intentos más largos generalmente corresponden a cuestionarios con más páginas o a alumnos que navegaron más (posiblemente releyendo o dudando)? ¿O no hay una correlación clara?</li>
                <li><strong>Eficiencia vs. Dificultad:</strong>
                    <ul>
                        <li><em>Superior Izquierda (Pocas págs, mucho tiempo):</em> Podría indicar que el alumno se atascó en pocas preguntas o páginas, o que el cuestionario era corto pero denso.</li>
                        <li><em>Inferior Izquierda (Pocas págs, poco tiempo):</em> Podría ser un cuestionario corto y fácil, o un alumno muy rápido en ese material.</li>
                        <li><em>Superior Derecha (Muchas págs, mucho tiempo):</em> Podría ser un cuestionario largo y/o difícil, o un alumno meticuloso.</li>
                    </ul>
                </li>
                <li><strong>Agrupaciones de intentos:</strong> ¿Se observan clústeres de puntos? Podrían representar diferentes cuestionarios (si no se filtra por contexto) o diferentes aproximaciones de los alumnos (ej. un grupo rápido, otro más lento).</li>
            </ul>
            <h4>Interpretación</h4>
            <ul>
                <li>La posición de cada intento en el gráfico ofrece una perspectiva combinada de duración y navegación.</li>
                <li>Es crucial considerar la estructura del cuestionario: un cuestionario con una pregunta por página tendrá muchas "páginas vistas", mientras que uno con todas las preguntas en una sola página tendrá solo una, independientemente de su longitud.</li>
            </ul>
            <h4>Consideraciones</h4>
            <p>El "número de páginas vistas" es una aproximación del recorrido del alumno dentro del intento. No necesariamente equivale al número de preguntas vistas si un cuestionario tiene múltiples preguntas por página. Este gráfico es una herramienta exploratoria; cualquier sospecha debe ser corroborada con más información y juicio pedagógico.</p>
            <p class="text-muted small"><em>Recuerde: estos gráficos son herramientas de apoyo y no ofrecen pruebas definitivas de ningún comportamiento. La interpretación debe hacerse con cautela y complementarse con el juicio pedagógico y, si es necesario, una revisión directa de los intentos en Moodle.</em></p>`
    }
};
