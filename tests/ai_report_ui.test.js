/* node tests/ai_report_ui.test.js */
'use strict';
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const analytics=require('../learning_analytics.js');
const reports=require('../ai_report.js');

function fakeElement(id=''){
  return {
    id,value:'',textContent:'',disabled:false,hidden:false,open:false,children:[],listeners:{},scrolled:false,
    appendChild(child){if(child.fragment)this.children.push(...child.children);else this.children.push(child);if(this.id && this.id.startsWith('aiReport') && child.value && !this.value)this.value=child.value;return child;},
    replaceChildren(){this.children=[];this.value='';},
    addEventListener(event,handler){this.listeners[event]=handler;},
    focus(){this.focused=true;},select(){this.selected=true;},
    scrollIntoView(){this.scrolled=true;}
  };
}
const ids=[
  'aiReportPanel','aiReportMode','aiReportSingleControls','aiReportBatchControls',
  'aiReportStudent','aiReportBatch','aiReportFocus','aiReportPreview','aiReportCopy',
  'aiReportGenerate','aiReportAvailable','aiReportCharacters','aiReportMessage',
  'aiReportMappingDetails','aiReportMappingTable','aiReportMappingCount',
  'aiReportFromProfile','trackingStudentSelect'
];
const nodes=Object.fromEntries(ids.map(id=>[id,fakeElement(id)]));
nodes.aiReportMode.value='single';
nodes.aiReportFocus.value='general';
const doc={
  getElementById:id=>nodes[id]||null,
  createElement:tag=>fakeElement(tag),
  createDocumentFragment:()=>({...fakeElement('fragment'),fragment:true})
};
let copied='';
const context={
  window:{MoodleAiReport:reports},
  document:doc,
  navigator:{clipboard:{writeText:async text=>{copied=text;}}},
  console
};
vm.runInNewContext(fs.readFileSync('ai_report_ui.js','utf8'),context);
const ui=context.window.MoodleAiReportUI;
const name='María Gómez Fernández';
const row=(n,time)=>({FULL_NAME:n,PARSED_TIME:new Date(time),EVENT_NAME:'recurso viewed',COMPONENT:'Curso privado '+n,IP_ADDRESS:'198.51.100.17'});
const rows=[
  row(name,'2026-10-05T10:00:00'),
  row('Pedro Rodríguez Díaz','2026-10-06T10:30:00')
];
const opts={start:'2026-10-05',end:'2026-10-18',asOf:'2026-10-18',
 selection:{user:'ALL_USERS',event:'ALL_EVENTS',component:'ALL_COMPONENTS',context:'ALL_CONTEXTS',ips:[],startTime:'00:00',endTime:'23:59'},
 viewPatterns:['viewed'],participationPatterns:['submitted']};
(async()=>{
  ui.init();
  assert.equal(nodes.aiReportGenerate.disabled,true);
  ui.update(rows,rows,analytics.compute(rows,rows,opts),opts);
  assert.equal(nodes.aiReportGenerate.disabled,false);
  assert.equal(nodes.aiReportPreview.value,'','No copiar texto obsoleto antes de generar');
  assert.equal(nodes.aiReportMappingTable.children.length,2,'Dos equivalencias en memoria local');
  const mapped=nodes.aiReportMappingTable.children.flatMap(tr=>tr.children.map(td=>td.textContent));
  assert.ok(mapped.includes(name),'El profesor puede consultar el nombre localmente');
  ui.generate();
  assert.ok(nodes.aiReportPreview.value.includes('Alumno 001'));
  assert.ok(!nodes.aiReportPreview.value.includes(name));
  assert.ok(!nodes.aiReportPreview.value.includes('198.51.100.17'));
  assert.equal(nodes.aiReportCopy.disabled,false);
  await ui.copy();
  assert.equal(copied,nodes.aiReportPreview.value,'Portapapeles recibe exactamente la vista seudonimizada');
  nodes.aiReportFocus.value='tutoria';
  nodes.aiReportFocus.listeners.change();
  assert.equal(nodes.aiReportPreview.value,'','Cambiar el foco invalida el informe anterior');
  assert.equal(nodes.aiReportCopy.disabled,true);
  nodes.trackingStudentSelect.value=name;
  nodes.aiReportFromProfile.listeners.click();
  assert.equal(nodes.aiReportMode.value,'single');
  assert.ok(nodes.aiReportPanel.scrolled);
  assert.ok(nodes.aiReportPreview.value.includes('Alumno 001')||nodes.aiReportPreview.value.includes('Alumno 002'));
  ui.reset();
  assert.equal(nodes.aiReportPreview.value,'');
  assert.equal(nodes.aiReportMappingTable.children.length,0);
  assert.equal(nodes.aiReportCopy.disabled,true);
  console.log('UI IA: generación, tabla local, copia, cambio de filtros y reset correctos');
})().catch(e=>{console.error(e);process.exitCode=1});
