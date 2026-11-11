/* Vistas docentes; mantiene los gráficos originales y sus contratos de datos. */
(function(root) {
  'use strict';
  const pad=n=>String(n).padStart(2,'0');
  const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dateLabel=iso=>iso?String(iso).split('-').reverse().join('/'):'—';
  const percentage=(n,total)=>total?Math.round(n*1000/total)/10:0;
  const byId=id=>document.getElementById(id);
  function put(id,value){const el=byId(id);if(el)el.textContent=value;}
  let result=null;
  let individualChart=null;
  const helpText={
    trackingContinuity:[
      'Continuidad semanal y última actividad',
      'Cada casilla indica los eventos del alumno durante esa semana. Incluye estudiantes presentes en el CSV aunque no registren eventos dentro del periodo filtrado.',
      'Si un alumno tiene tres semanas seguidas con registros y dos sin ellos, revisa si se han producido dificultades de acceso o cambios en las tareas.',
      'Las semanas sin eventos no demuestran que un alumno haya dejado de estudiar. La referencia es el último día observado en el CSV.'
    ],
    trackingProgress:[
      'Evolución individual',
      'La gráfica refleja los eventos de cada semana de la persona seleccionada; debajo aparecen días activos, sesiones aproximadas y último registro.',
      'Después de una tutoría, compara la regularidad semanal y pregunta al alumno por posibles obstáculos.',
      'Más registros no implican mejores calificaciones, comprensión ni más tiempo de estudio.'
    ],
    trackingComparison:[
      'Comparación entre periodos',
      'Compara los dos tramos consecutivos más recientes que caben dentro de las fechas del CSV y del filtro, con la misma duración (hasta 14 días por tramo) y los mismos filtros de alumno, evento, componente, contexto, hora e IP.',
      'Si el CSV llega del 1 al 30 de octubre, compara del 3 al 16 con el 17 al 30. Una subida puede indicar mayor uso, que conviene contrastar con las fechas de las actividades.',
      'Basta el CSV cargado, sin histórico anterior. Solo se necesitan al menos dos días de intervalo entre sus fechas extremas. Un cero indica que no hay eventos correspondientes en ese tramo del archivo, no que el alumno no haya trabajado. Si la primera ventana tiene cero eventos, no se calcula el porcentaje.'
    ],
    trackingHeatmap:[
      'Mapa de calor: día de la semana y hora',
      'Cada celda cuenta eventos ocurridos en esa hora y día de la semana durante el rango filtrado. Un tono más intenso significa más eventos.',
      'Comprueba si una tarea se consulta sobre todo la tarde anterior a su entrega, o a qué horas es útil publicar recordatorios.',
      'Cuenta eventos, no alumnos únicos. Una persona activa puede generar muchas celdas intensas.'
    ],
    trackingActivityMix:[
      'Consulta, participación y otras acciones',
      'Clasifica nombres de evento con los patrones editables de Ajustes: primero consulta, después participación y finalmente otras acciones.',
      'Si predominan las visualizaciones de recursos, revisa si el diseño ofrece oportunidades suficientes de respuesta, foro o entrega.',
      'La categoría “otras” no significa irrelevante. La clasificación depende del idioma de Moodle y de los patrones escritos.'
    ],
    trackingSessions:[
      'Sesiones estimadas',
      'Los eventos sucesivos se agrupan por estudiante mientras no pase más de media hora entre registros. La duración es la diferencia entre primer y último evento.',
      'Si aparecen muchos accesos muy breves cerca de una fecha límite, revisa la secuencia de actividades de ese periodo.',
      'No mide atención ni tiempo real de estudio. Una sesión de un único evento tiene 0 minutos estimados.'
    ],
    trackingAnomalies:[
      'Ráfagas para revisión',
      'Muestra horas con 25 o más eventos y al menos tres veces la mediana de las horas activas del estudiante, cuando existen tres o más horas observadas.',
      'Un pico de 35 eventos en una hora puede corresponder a cuestionarios, carga de una actividad o navegación repetida; inspecciona el detalle de logs.',
      'No indica fraude, automatización ni mal comportamiento. Es una observación descriptiva.'
    ],
    trackingQuality:[
      'Calidad del archivo CSV',
      'Informa del número de filas procesadas y descartadas, registros sin usuario conocido y columnas no presentes.',
      'Si hay muchas filas descartadas, revisa el formato de fecha del CSV antes de sacar conclusiones del mapa de calor o de la continuidad.',
      'Un CSV válido no garantiza que Moodle registre todo el trabajo que realiza el alumnado.'
    ]
  };
  const legacyExamples={
    generalStats:'Antes de interpretar una bajada, comprueba que el intervalo y las exclusiones siguen siendo los mismos.',
    userActivity:'Un alumno con pocos eventos puede estar trabajando fuera de Moodle. Comprueba las entregas.',
    eventsOverTime:'Una subida justo antes de la fecha de una tarea puede indicar muchas consultas de última hora.',
    componentActivity:'La actividad de “Sistema” puede reflejar navegación técnica, no interacción pedagógica.',
    activityByHour:'Si hay muchos eventos a última hora de la tarde, revisa si coinciden con plazos de entrega.',
    activityByDayOfWeek:'Un pico los lunes puede coincidir con la publicación de materiales semanales.',
    componentBreakdown:'En el foro distingue entre leer debates y publicar respuestas para valorar el tipo de actividad.',
    activityByContext:'Si una actividad apenas se visita, revisa las instrucciones y su visibilidad.',
    scatterUsersEventsDay:'Muchos eventos y pocos usuarios en un día pueden corresponder a una actividad optativa.',
    scatterComponentsEventsUser:'Pocos componentes utilizados no implican poca implicación: puede tratarse de una unidad intensiva.',
    scatterContentViewParticipation:'Si abundan las vistas, revisa oportunidades de participación y tareas evaluables.',
    bubbleStudentAnalysis:'Pocos días activos y muchos eventos pueden indicar trabajo concentrado en determinadas fechas.',
    bubbleComponentAnalysis:'Un componente con pocos usuarios y muchos eventos puede ser una actividad optativa.',
    bubbleContextAnalysis:'Un recurso usado por pocas personas puede requerir comprobar si el enlace funciona.',
    topIPsByEvents:'Una IP compartida puede ser la red del centro, no un usuario concreto.',
    usersPerIP:'Muchos usuarios en una IP pueden corresponder a un aula o red institucional.',
    ipsPerUser:'Un usuario con varias IP puede haberse conectado por móvil, casa o wifi del centro.',
    quizTimeDistribution:'Al interpretar intentos cortos, ten en cuenta si los alumnos abandonaron o reenviaron.',
    avgQuizTimePerUser:'Una media breve no determina que un cuestionario fuera fácil o se contestara sin atención.',
    quizTimeVsPages:'Muchas páginas consultadas no equivalen a más preguntas, depende del formato del cuestionario.'
  };
  function helpFor(type,existing){
    if(helpText[type]){
      const [title,definition,example,limit]=helpText[type];
      return {title,content:'<p>'+definition+'</p><h6>Ejemplo de uso docente</h6><p>'+example+'</p><h6>Qué conviene comprobar</h6><p>'+limit+'</p>'};
    }
    const item=existing&&existing[type];
    if(!item)return {title:'Ayuda de la visualización',content:'<p>Este gráfico muestra registros de actividad del CSV filtrado. Revisa su eje, rango y contexto antes de interpretarlo.</p>'};
    return {title:item.title,content:item.content+'<hr><h6>Ejemplo de seguimiento durante el curso</h6><p>'+esc(legacyExamples[type]||'Compara el resultado con las fechas de entrega y las evidencias educativas.')+'</p><p class="small text-muted">Ningún recuento de eventos permite diagnosticar abandono o calificar aprendizaje.</p>'};
  }
  function continuity(data){
    const table=byId('trackingContinuityTable');if(!table)return;
    const weeks=data.weeks.map(w=>'<th scope="col" title="Semana del '+esc(dateLabel(w))+'">'+esc(dateLabel(w).slice(0,5))+'</th>').join('');
    const heading='<thead><tr><th scope="col" class="tracking-person">Alumno/a</th>'+weeks+'<th scope="col">Último evento</th><th scope="col">Días sin eventos</th></tr></thead>';
    const rows=data.users.map(u=>{
      const cells=u.weekly.map(n=>'<td><span class="tracking-week '+(n?'is-active':'')+'" title="'+n+' eventos" aria-label="'+n+' eventos">'+(n||'·')+'</span></td>').join('');
      const stale=u.inactiveDays===null?'—':u.inactiveDays+' d';
      return '<tr><th class="tracking-person" scope="row"><button class="tracking-person-link" type="button" data-student="'+esc(u.name)+'">'+esc(u.name)+'</button></th>'+cells+'<td>'+esc(dateLabel(u.lastSeen))+'</td><td class="'+(u.needsReview?'tracking-review':'')+'">'+esc(stale)+'</td></tr>';
    }).join('');
    table.innerHTML=heading+'<tbody>'+(rows||'<tr><td colspan="'+(data.weeks.length+3)+'">Sin estudiantes para este conjunto de filtros.</td></tr>')+'</tbody>';
  }
  function chartIndividual(data,name){
    const canvas=byId('trackingProgressCanvas');
    if(individualChart){individualChart.destroy();individualChart=null;}
    if(!canvas)return;
    const profile=data.profileByUser[name];
    put('trackingStudentMeta',profile?profile.activeDays+' días activos · '+profile.activeWeeks+' semanas con eventos · '+profile.sessions+' sesiones estimadas · Último evento: '+dateLabel(profile.lastSeen):'No hay un alumno disponible.');
    if(!profile||typeof Chart==='undefined')return;
    individualChart=new Chart(canvas,{
      type:'line',
      data:{labels:data.weeks.map(dateLabel),datasets:[{label:'Eventos por semana',data:profile.weekly,borderColor:'#1B4332',backgroundColor:'rgba(27,67,50,.1)',fill:true,tension:.22,pointRadius:3}]},
      options:{responsive:true,maintainAspectRatio:false,scales:{y:{beginAtZero:true,ticks:{precision:0}}},plugins:{legend:{display:false},tooltip:{callbacks:{title:items=>'Semana del '+items[0].label}}}}
    });
  }
  function profile(data){
    const select=byId('trackingStudentSelect');if(!select)return;
    const previous=select.value;
    const names=data.users.map(u=>u.name).sort((a,b)=>a.localeCompare(b,'es'));
    select.innerHTML=names.map(n=>'<option value="'+esc(n)+'">'+esc(n)+'</option>').join('');
    if(names.includes(previous))select.value=previous;
    chartIndividual(data,select.value);
  }
  function heatmap(data){
    const el=byId('trackingHeatmap');if(!el)return;
    const names=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
    const maximum=Math.max(1,...data.heatmap.flat());
    let html='<div class="tracking-heat-grid"><span></span>';
    for(let h=0;h<24;h++)html+='<span class="tracking-heat-label">'+(h%3===0?pad(h):'')+'</span>';
    data.heatmap.forEach((line,i)=>{
      html+='<span class="tracking-heat-label">'+names[i]+'</span>';
      line.forEach((n,h)=>{
        const level=n===0?0:Math.max(1,Math.ceil(n/maximum*4));
        const readable=names[i]+' '+pad(h)+':00: '+n+' eventos';
        html+='<span class="tracking-heat-cell heat-'+level+'" title="'+esc(readable)+'" role="img" aria-label="'+esc(readable)+'"></span>';
      });
    });
    el.innerHTML=html+'</div><p class="tracking-note">Intensidad relativa al máximo del periodo · Hora local del registro</p>';
  }
  function mix(data){
    const el=byId('trackingComposition');if(!el)return;
    const types=[['Consulta','view'],['Participación','participation'],['Otras acciones','other']];
    const total=data.summary.events;
    const bar=types.map(([label,key])=>'<span class="tracking-stack-'+key+'" style="width:'+percentage(data.composition[key],total)+'%" title="'+esc(label)+': '+data.composition[key]+' eventos"></span>').join('');
    const legend=types.map(([label,key])=>'<span><i class="tracking-swatch tracking-stack-'+key+'"></i>'+esc(label)+': <strong>'+data.composition[key]+'</strong> ('+percentage(data.composition[key],total)+'%)</span>').join('');
    el.innerHTML='<div class="tracking-stacked" aria-label="Distribución porcentual de los tipos de evento" role="img">'+bar+'</div><div class="tracking-legend">'+legend+'</div>';
  }
  function comparison(data){
    const el=byId('trackingComparison');if(!el)return;
    const c=data.comparison;
    if(!c.available){
      el.innerHTML='';
      el.textContent=c.reason==='not_enough_days'
        ? 'Para comparar se necesitan registros que abarquen al menos dos días distintos dentro del intervalo seleccionado.'
        : c.reason==='invalid_dates'
          ? 'Revisa las fechas de inicio y fin del filtro.'
          : 'El CSV no contiene registros dentro del intervalo seleccionado para comparar dos tramos.';
      return;
    }
    const diff=c.percentChange===null?'No calculable: 0 eventos en el tramo anterior':(c.percentChange>0?'+':'')+c.percentChange+' %';
    const previousStart=c.previousStart||c.start,previousEnd=c.previousEnd||c.end;
    el.innerHTML='<p class="tracking-kpi"><strong>'+c.currentEvents+'</strong> eventos en el tramo reciente</p>'+
      '<p><strong>Tramo anterior:</strong> '+esc(dateLabel(previousStart))+' – '+esc(dateLabel(previousEnd))+' · '+c.previousEvents+' eventos</p>'+
      '<p><strong>Tramo reciente:</strong> '+esc(dateLabel(c.currentStart))+' – '+esc(dateLabel(c.currentEnd))+' · '+c.currentEvents+' eventos</p>'+
      '<p class="tracking-delta">Variación: '+esc(diff)+' · Alumnos con eventos: '+c.currentStudents+' frente a '+c.previousStudents+' · '+c.windowDays+' días por tramo</p>'+
      '<p class="tracking-note">Solo se utilizan registros del CSV seleccionado. Los días sin eventos en el archivo no prueban ausencia de actividad fuera de Moodle.</p>';
  }
  function anomalies(data){
    const el=byId('trackingAnomalies');if(!el)return;
    if(!data.anomalies.length){el.textContent='No hay concentraciones que cumplan el umbral descriptivo.';return;}
    el.innerHTML='<ul class="tracking-alert-list">'+data.anomalies.map(x=>'<li><strong>'+esc(x.name)+'</strong> · '+esc(dateLabel(x.day))+' '+esc(x.hour)+':00 · '+x.events+' eventos — '+esc(x.label)+'</li>').join('')+'</ul>';
  }
  function render(data){
    result=data;
    put('trackingKpiStudents',String(data.summary.trackedStudents));
    put('trackingKpiGaps',String(data.summary.recentNoEvents));
    put('trackingKpiMissing',String(data.summary.noActivity));
    put('trackingKpiSessions',String(data.sessions.total));
    put('trackingAsOf','Referencia: '+dateLabel(data.summary.asOf)+' · Últimas '+data.summary.weeksShown+' semanas del intervalo');
    put('trackingSessions',data.sessions.total+' sesiones · Duración media aproximada: '+data.sessions.avgMinutes+' minutos (separación de 30 min).');
    const q=data.quality;
    put('trackingQuality',q.processed+' de '+q.raw+' filas procesadas · '+q.discarded+' descartadas · '+q.unknownUsers+' sin usuario identificado'+(q.missingColumns.length?' · Columnas ausentes: '+q.missingColumns.join(', '):' · Columnas principales disponibles'));
    continuity(data);profile(data);heatmap(data);mix(data);comparison(data);anomalies(data);
  }
  function reorder(){
    const root=document.querySelector('#resultsSection > .container-fluid');
    if(!root||byId('legacyPriorityGrid'))return;
    const heading=document.createElement('h2');
    heading.className='tracking-section-heading';
    heading.textContent='Otras perspectivas del curso';
    const grid=document.createElement('div');
    grid.id='legacyPriorityGrid';grid.className='row g-3 mb-3';
    root.appendChild(heading);root.appendChild(grid);
    const stat=byId('dashboardGeneralStats')?.closest('[class*="col-"]');
    if(stat){stat.className='col-xl-4 col-md-6';grid.appendChild(stat);}
    const order=['userActivity','eventsOverTime','scatterContentViewParticipation','activityByContext','componentActivity','activityByHour','activityByDayOfWeek','componentBreakdown','scatterUsersEventsDay','scatterComponentsEventsUser','bubbleStudentAnalysis','bubbleComponentAnalysis','bubbleContextAnalysis','topIPsByEvents','usersPerIP','ipsPerUser'];
    order.forEach(type=>{
      const card=root.querySelector('.chart-card[data-chart-type="'+type+'"]');
      const col=card&&card.closest('[class*="col-"]');
      if(col){col.className='col-xl-4 col-md-6';grid.appendChild(col);}
    });
    root.querySelectorAll(':scope > .row').forEach(row=>{if(row!==grid&&row.id!=='quizAnalysisRow'&&!row.children.length)row.remove();});
    const quizzes=byId('quizAnalysisRow');if(quizzes)root.appendChild(quizzes);
  }
  function init(){
    if(!byId('trackingDashboard'))return;
    const select=byId('trackingStudentSelect');
    if(select)select.addEventListener('change',()=>{if(result)chartIndividual(result,select.value)});
    const table=byId('trackingContinuityTable');
    if(table)table.addEventListener('click',event=>{
      const btn=event.target.closest('[data-student]');
      if(!btn||!result)return;
      if(select)select.value=btn.dataset.student;
      chartIndividual(result,btn.dataset.student);
      byId('trackingProfile')?.scrollIntoView({behavior:'smooth',block:'center'});
    });
    reorder();
  }
  root.MoodleTrackingUI={init,render,helpFor,renderComparison:comparison};
})(typeof window!=='undefined'?window:globalThis);
