/* Ejecutar: node tests/learning_analytics.test.js */
'use strict';
const Analytics = require('../learning_analytics.js');
const eq = (actual, expected, label) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw Error(label + ': esperado ' + JSON.stringify(expected) + ', recibido ' + JSON.stringify(actual));
  }
};
const yes = (value, label) => { if (!value) throw Error(label); };
const row = (name, stamp, event = 'resource viewed', component = 'Recurso') => ({
  FULL_NAME:name, PARSED_TIME:new Date(stamp), EVENT_NAME:event, COMPONENT:component, EVENT_CONTEXT:'Curso', IP_ADDRESS:'10.0.0.1'
});
const options = extra => Object.assign({
  start:'2026-10-05',end:'2026-10-11',asOf:'2026-10-11',
  selection:{user:'ALL_USERS',event:'ALL_EVENTS',component:'ALL_COMPONENTS',context:'ALL_CONTEXTS',ips:[],startTime:'00:00',endTime:'23:59'},
  viewPatterns:['viewed'],participationPatterns:['submitted'],
  quality:{raw:5,processed:4,missingColumns:[],unknownUsers:0}
},extra);
function test(label, fn) { fn(); console.log('OK',label); }

test('continuidad semanal, fechas locales e inactividad relativas al CSV',()=>{
  const all=[row('Ana','2026-10-05T09:00:00'),row('Ana','2026-10-06T09:00:00'),row('Beto','2026-10-05T10:00:00')];
  const result=Analytics.compute(all,all,options({start:'2026-10-05',end:'2026-10-18',asOf:'2026-10-18'}));
  eq(result.weeks.length,2,'semanas');
  eq(result.users.find(u=>u.name==='Ana').weekly,[2,0],'semanas Ana');
  eq(result.users.find(u=>u.name==='Ana').inactiveDays,12,'inactividad');
  eq(result.users.find(u=>u.name==='Ana').activeDays,2,'días activos');
  eq(result.heatmap[0][9],1,'lunes 09');
});
test('dos eventos cercanos forman una sesión, hueco largo abre otra',()=>{
  const current=[row('Ana','2026-10-05T09:00:00'),row('Ana','2026-10-05T09:25:00'),row('Ana','2026-10-05T10:20:00')];
  const a=Analytics.compute(current,current,options());
  eq(a.sessions.total,2,'número sesiones');
  eq(a.sessions.avgMinutes,12.5,'duración estimada');
  eq(a.users[0].sessions,2,'sesiones de alumna');
});
test('periodos equivalentes y comparación cuando existe cobertura',()=>{
  const all=[row('Ana','2026-09-28T08:00:00'),row('Ana','2026-10-01T08:00:00'),row('Ana','2026-10-05T08:00:00'),row('Ana','2026-10-06T08:00:00'),row('Ana','2026-10-11T08:00:00')];
  const current=all.slice(-3);
  const r=Analytics.compute(current,all,options());
  yes(r.comparison.available,'comparación disponible con cobertura');
  eq(r.comparison.previousEvents,1,'eventos previos');
  eq(r.comparison.currentEvents,3,'eventos actuales');
  eq(r.comparison.percentChange,200,'porcentaje');
});
test('periodo anterior no cubierto no se presenta como descenso',()=>{
  const a=[row('Ana','2026-10-05T08:00:00')];
  const r=Analytics.compute(a,a,options());
  eq(r.comparison.available,false,'comparabilidad');
});
test('tipología configurable, nunca equivale a rendimiento',()=>{
  const a=[row('Ana','2026-10-05T08:00:00'),row('Ana','2026-10-05T09:00:00','assignment submitted','Tarea'),row('Ana','2026-10-05T10:00:00','user loggedin','Sistema')];
  const r=Analytics.compute(a,a,options());
  eq([r.composition.view,r.composition.participation,r.composition.other],[1,1,1],'tipologías');
});
test('cohorte basada en histórico: alumnos sin actividad en filtro aparecen',()=>{
  const all=[row('Ana','2026-10-04T10:00:00'),row('Beto','2026-10-07T10:00:00')];
  const r=Analytics.compute([all[1]],all,options());
  yes(r.users.some(u=>u.name==='Ana' && u.events===0),'visibilidad sin eventos');
});
test('filtro de alumno, hora y componente se aplica también al periodo anterior',()=>{
  const all=[row('Ana','2026-09-28T20:00:00'),row('Ana','2026-10-01T10:00:00'),row('Beto','2026-10-01T10:00:00'),row('Ana','2026-10-05T10:00:00')];
  const r=Analytics.compute([all[3]],all,options({selection:{user:'Ana',event:'ALL_EVENTS',component:'Recurso',context:'ALL_CONTEXTS',ips:[],startTime:'09:00',endTime:'11:00'}}));
  eq(r.comparison.previousEvents,1,'previos con mismos filtros');
  eq(r.users.length,1,'solo alumna');
});
test('calidad de datos con descartes y filas sin identificar',()=>{
  const a=[row('Ana','2026-10-05T10:00:00')];
  const r=Analytics.compute(a,a,options({quality:{raw:7,processed:5,missingColumns:['Descripción'],unknownUsers:2}}));
  eq(r.quality.discarded,2,'descartados');
  eq(r.quality.unknownUsers,2,'sin identificar');
});
test('ráfagas se identifican como revisión y no como fraude',()=>{
  const a=[row('Ana','2026-10-05T07:00:00'),row('Ana','2026-10-05T08:00:00'),...Array.from({length:30},(_,i)=>row('Ana','2026-10-05T09:'+String(i).padStart(2,'0')+':00'))];
  const r=Analytics.compute(a,a,options());
  yes(r.anomalies.length>=1,'ráfaga');
  yes(r.anomalies[0].label.includes('Revisar'),'mensaje no acusatorio');
});
test('archivo vacío: sin divisiones por cero ni fechas inválidas',()=>{
  const r=Analytics.compute([],[],options());
  eq(r.sessions.avgMinutes,0,'sesiones vacías');
  eq(r.comparison.available,false,'sin comparación');
  eq(r.users.length,0,'sin estudiantes');
});
console.log('10 pruebas correctas');
